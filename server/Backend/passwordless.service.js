/**
 * Passwordless Authentication Service
 *
 * Handles OTP-based passwordless login for email and phone.
 * Users can sign in using just their email/phone + OTP code.
 */

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {
    SignUpCommand,
    InitiateAuthCommand,
    RespondToAuthChallengeCommand,
    AdminGetUserCommand,
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    GetUserCommand,
    ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "../utils/cognito.js";
import { getConfig } from "../utils/configLoader.js";
import { sendOtpEmail } from "../utils/emailService.js";
import { sendOtpSms } from "../utils/smsService.js";
import { createLogger } from "../utils/logger.js";
import axios from 'axios';

const logger = createLogger('passwordless-service');

// In-memory OTP store (use Redis in production for scalability)
const otpStore = new Map();

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of otpStore.entries()) {
        if (value.expiresAt < now) {
            otpStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

// Generate a 6-digit OTP
const generateOtpCode = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Generate a secure random password for Cognito (users won't use it)
const generateSecurePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 32; i++) {
        password += chars.charAt(crypto.randomInt(chars.length));
    }
    return password;
};

// Create session key for OTP storage
const createSessionKey = (identifier, type) => {
    return `passwordless_${type}_${identifier}`;
};

// Mask email for display
const maskEmail = (email) => {
    if (!email || typeof email !== 'string') return null;
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email.length <= 2 ? '*'.repeat(email.length) : email.substring(0, 2) + '***';
    const localPart = email.substring(0, atIndex);
    const domain = email.substring(atIndex + 1);
    const maskedLocal = localPart.length <= 2 ? '*'.repeat(Math.min(localPart.length, 3)) : localPart.substring(0, 2) + '***';
    return `${maskedLocal}@${domain}`;
};

// Mask phone for display
const maskPhone = (phone) => {
    if (!phone || typeof phone !== 'string') return null;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 4) return '*'.repeat(digits.length);
    return '*'.repeat(digits.length - 4) + digits.slice(-4);
};

// Generate secret hash for Cognito
const generateSecretHash = (username) => {
    const config = getConfig();
    const clientId = config.COGNITO_CLIENT_ID;
    const clientSecret = config.COGNITO_CLIENT_SECRET;

    if (!clientSecret) {
        return null;
    }

    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(username + clientId);
    return hmac.digest('base64');
};

// Sync user to Access Service
const syncUserToAccessService = async (userId, email, name, phone) => {
    try {
        const config = getConfig();
        const ACCESS_SERVICE_URL = config.USER_ACCESS_SERVICE_URL;

        logger.info("Syncing user to Access Service", { userId, accessServiceUrl: ACCESS_SERVICE_URL });

        // STRICT POLICY: Only sync if userId is clean
        if (!userId || userId.startsWith('google_') || userId.match(/^[0-9a-f-]{36}$/)) {
            logger.warn("Skipping passwordless user sync: ID is not clean", { userId });
            return;
        }

        await axios.post(`${ACCESS_SERVICE_URL}/users/sync`, {
            userId: userId,
            email: email,
            name: name,
            phoneNumber: phone,
            isPasswordless: true
        });

        logger.info("User sync successful", { userId });
    } catch (error) {
        logger.warn("Failed to sync user to Access Service", {
            userId,
            errorMessage: error.message
        });
        // Don't fail auth flow on sync errors
    }
};

/**
 * Send OTP for passwordless login
 * @param {string} identifier - Email or phone number
 * @param {string} type - 'email' or 'phone'
 * @returns {Promise<Object>} OTP delivery details
 */
export const sendPasswordlessOtp = async (identifier, type) => {
    const config = getConfig();
    logger.info("Sending passwordless OTP", { type, identifier: type === 'email' ? maskEmail(identifier) : maskPhone(identifier) });

    try {
        // Validate identifier
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(identifier)) {
                throw new Error("Invalid email address format");
            }
        } else if (type === 'phone') {
            // Expect phone in E.164 format or with country code
            const phoneRegex = /^\+?[1-9]\d{6,14}$/;
            if (!phoneRegex.test(identifier.replace(/[\s\-\(\)]/g, ''))) {
                throw new Error("Invalid phone number format. Please include country code.");
            }
        } else {
            throw new Error("Invalid type. Must be 'email' or 'phone'");
        }

        // Generate OTP
        const otpCode = generateOtpCode();
        const sessionKey = createSessionKey(identifier.toLowerCase(), type);
        const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

        // Store OTP
        otpStore.set(sessionKey, {
            code: otpCode,
            identifier: identifier.toLowerCase(),
            type,
            expiresAt,
            attempts: 0,
            createdAt: Date.now()
        });

        logger.info("OTP stored", { sessionKey, expiresAt: new Date(expiresAt).toISOString() });

        // Send OTP
        if (type === 'email') {
            try {
                await sendOtpEmail(identifier, otpCode, 'login', null, null);
                logger.info("OTP email sent", { identifier: maskEmail(identifier) });
            } catch (emailError) {
                logger.warn("Email sending failed, OTP logged", {
                    identifier: maskEmail(identifier),
                    errorMessage: emailError.message
                });
                // Log OTP for debugging in dev mode
                logger.debug("OTP for debugging", { identifier, otpCode, expiresIn: "5 minutes" });
            }

            return {
                success: true,
                type: 'email',
                destination: maskEmail(identifier),
                message: "OTP sent to your email"
            };
        } else if (type === 'phone') {
            await sendOtpSms(identifier, otpCode);

            return {
                success: true,
                type: 'phone',
                destination: maskPhone(identifier),
                message: "OTP sent to your phone"
            };
        }
    } catch (error) {
        logger.error("Failed to send OTP", {
            type,
            identifier: type === 'email' ? maskEmail(identifier) : maskPhone(identifier),
            errorMessage: error.message
        });
        throw error;
    }
};

/**
 * Verify OTP and authenticate user
 * Creates user in Cognito if they don't exist (passwordless signup)
 * @param {string} identifier - Email or phone number
 * @param {string} type - 'email' or 'phone'
 * @param {string} code - OTP code
 * @returns {Promise<Object>} Authentication tokens and user info
 */
export const verifyPasswordlessOtp = async (identifier, type, code) => {
    const config = getConfig();
    logger.info("Verifying passwordless OTP", { type, identifier: type === 'email' ? maskEmail(identifier) : maskPhone(identifier) });

    try {
        const sessionKey = createSessionKey(identifier.toLowerCase(), type);
        const session = otpStore.get(sessionKey);

        // Validate OTP session
        if (!session) {
            throw new Error("Invalid or expired OTP. Please request a new code.");
        }

        if (Date.now() > session.expiresAt) {
            otpStore.delete(sessionKey);
            throw new Error("OTP has expired. Please request a new code.");
        }

        if (session.attempts >= 5) {
            otpStore.delete(sessionKey);
            throw new Error("Too many invalid attempts. Please request a new code.");
        }

        if (session.code !== code) {
            session.attempts += 1;
            throw new Error("Invalid OTP code. Please try again.");
        }

        // OTP verified - delete session
        otpStore.delete(sessionKey);
        logger.info("OTP verified successfully", { sessionKey });

        // Check if user exists in Cognito by email or phone
        let userExists = false;
        let existingUser = null;

        // Normalize identifier
        const normalizedIdentifier = type === 'email' ? identifier.toLowerCase().trim() : identifier.replace(/[^\d+]/g, '');
        let finalUsername = normalizedIdentifier;

        try {
            // Search by attribute first (most reliable for finding existing identities)
            // Use normalized identifier for the search filter
            const filter = type === 'email' ? `email = "${normalizedIdentifier}"` : `phone_number = "${normalizedIdentifier}"`;
            const listResponse = await cognito.send(
                new ListUsersCommand({
                    UserPoolId: config.COGNITO_USER_POOL_ID,
                    Filter: filter,
                    Limit: 1
                })
            );

            if (listResponse.Users && listResponse.Users.length > 0) {
                existingUser = listResponse.Users[0];
                // ListUsers returns 'Attributes', AdminGetUser returns 'UserAttributes'
                const attrs = existingUser.Attributes || existingUser.UserAttributes || [];
                const preferredUsername = attrs.find(a => a.Name === 'preferred_username')?.Value;
                finalUsername = preferredUsername || existingUser.Username;
                userExists = true;
                logger.info("Existing user found in Cognito via attribute search", {
                    searchAttribute: type,
                    foundUsername: finalUsername,
                    isOriginalUsername: !preferredUsername
                });
            } else {
                // Fallback: Check by username directly just in case username is same as identifier
                try {
                    const userByUsername = await cognito.send(
                        new AdminGetUserCommand({
                            UserPoolId: config.COGNITO_USER_POOL_ID,
                            Username: finalUsername,
                        })
                    );
                    existingUser = userByUsername;
                    const attrs = existingUser.Attributes || existingUser.UserAttributes || [];
                    const preferredUsername = attrs.find(a => a.Name === 'preferred_username')?.Value;
                    finalUsername = preferredUsername || existingUser.Username;
                    userExists = true;
                    logger.info("User exists in Cognito via direct username check", { username: finalUsername });
                } catch (usernameError) {
                    if (usernameError.name === 'UserNotFoundException') {
                        userExists = false;
                        logger.info("User not found by attribute or username, will create", { identifier: normalizedIdentifier });
                    } else {
                        throw usernameError;
                    }
                }
            }
        } catch (error) {
            logger.error("Error searching for user in Cognito", { error: error.message });
            throw error;
        }

        // Create user if doesn't exist
        if (!userExists) {
            const tempPassword = generateSecurePassword();
            const userAttributes = [
                { Name: type === 'email' ? 'email' : 'phone_number', Value: identifier },
                { Name: type === 'email' ? 'email_verified' : 'phone_number_verified', Value: 'true' },
            ];

            try {
                await cognito.send(
                    new AdminCreateUserCommand({
                        UserPoolId: config.COGNITO_USER_POOL_ID,
                        Username: finalUsername,
                        UserAttributes: userAttributes,
                        MessageAction: 'SUPPRESS', // Don't send welcome email
                        TemporaryPassword: tempPassword,
                    })
                );

                // Set permanent password
                const permanentPassword = generateSecurePassword();
                await cognito.send(
                    new AdminSetUserPasswordCommand({
                        UserPoolId: config.COGNITO_USER_POOL_ID,
                        Username: finalUsername,
                        Password: permanentPassword,
                        Permanent: true,
                    })
                );

                logger.info("New user created in Cognito", { username: finalUsername });

                // Sync to access service
                syncUserToAccessService(finalUsername, type === 'email' ? identifier : null, null, type === 'phone' ? identifier : null);
            } catch (createError) {
                logger.error("Failed to create user", { username: finalUsername, errorMessage: createError.message });
                throw new Error("Failed to create account. Please try again.");
            }
        }

        // Generate our own JWT tokens for passwordless users
        const jwtSecret = config.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('CRITICAL: JWT_SECRET is not configured.');
        }

        const now = Math.floor(Date.now() / 1000);
        const expiresIn = 3600; // 1 hour

        // Get user attributes if user exists
        let email = type === 'email' ? identifier : null;
        let phone = type === 'phone' ? identifier : null;
        let name = null;

        if (existingUser) {
            const attrs = existingUser.Attributes || existingUser.UserAttributes || [];
            email = email || attrs.find(a => a.Name === 'email')?.Value;
            phone = phone || attrs.find(a => a.Name === 'phone_number')?.Value;
            name = attrs.find(a => a.Name === 'name')?.Value;
            const preferredUsername = attrs.find(a => a.Name === 'preferred_username')?.Value;
            if (preferredUsername) {
                finalUsername = preferredUsername;
            }
        }

        // Create tokens
        const accessToken = jwt.sign(
            {
                sub: finalUsername,
                username: finalUsername,
                email: email,
                phone_number: phone,
                auth_time: now,
                iat: now,
                exp: now + expiresIn,
                token_use: 'access',
                passwordless: true
            },
            jwtSecret
        );

        const idToken = jwt.sign(
            {
                sub: finalUsername,
                email: email,
                email_verified: type === 'email',
                phone_number: phone,
                phone_number_verified: type === 'phone',
                name: name,
                'cognito:username': finalUsername,
                auth_time: now,
                iat: now,
                exp: now + expiresIn,
                token_use: 'id',
                passwordless: true
            },
            jwtSecret
        );

        const refreshToken = jwt.sign(
            {
                sub: finalUsername,
                username: finalUsername,
                iat: now,
                exp: now + (30 * 24 * 60 * 60), // 30 days
                token_use: 'refresh',
                passwordless: true
            },
            jwtSecret
        );

        logger.info("Passwordless authentication successful", { username: finalUsername });

        // Fire-and-forget sync to access service
        if (userExists) {
            syncUserToAccessService(finalUsername, email, name, phone);
        }

        return {
            message: "Authentication successful",
            tokens: {
                accessToken,
                refreshToken,
                idToken,
                expiresIn
            },
            user: {
                username: finalUsername,
                email,
                phone_number: phone,
                name,
                isNewUser: !userExists
            },
            isNewUser: !userExists
        };
    } catch (error) {
        logger.error("Passwordless verification failed", {
            type,
            identifier: type === 'email' ? maskEmail(identifier) : maskPhone(identifier),
            errorMessage: error.message
        });
        throw error;
    }
};

/**
 * Refresh passwordless tokens
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New tokens
 */
export const refreshPasswordlessToken = async (refreshToken) => {
    const config = getConfig();
    const jwtSecret = config.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('CRITICAL: JWT_SECRET is not configured.');
    }

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, jwtSecret);

        if (decoded.token_use !== 'refresh' || !decoded.passwordless) {
            throw new Error('Invalid refresh token');
        }

        const now = Math.floor(Date.now() / 1000);
        const expiresIn = 3600;

        // Get user info from Cognito
        let email = null, phone = null, name = null;
        try {
            const userInfo = await cognito.send(
                new AdminGetUserCommand({
                    UserPoolId: config.COGNITO_USER_POOL_ID,
                    Username: decoded.username,
                })
            );
            const attrs = userInfo.UserAttributes || [];
            email = attrs.find(a => a.Name === 'email')?.Value;
            phone = attrs.find(a => a.Name === 'phone_number')?.Value;
            name = attrs.find(a => a.Name === 'name')?.Value;
        } catch (e) {
            logger.warn("Could not fetch user info for refresh", { username: decoded.username });
        }

        // Create new tokens
        const newAccessToken = jwt.sign(
            {
                sub: decoded.sub,
                username: decoded.username,
                email,
                phone_number: phone,
                auth_time: decoded.auth_time || now,
                iat: now,
                exp: now + expiresIn,
                token_use: 'access',
                passwordless: true
            },
            jwtSecret
        );

        const newIdToken = jwt.sign(
            {
                sub: decoded.sub,
                email,
                email_verified: !!email,
                phone_number: phone,
                phone_number_verified: !!phone,
                name,
                'cognito:username': decoded.username,
                auth_time: decoded.auth_time || now,
                iat: now,
                exp: now + expiresIn,
                token_use: 'id',
                passwordless: true
            },
            jwtSecret
        );

        logger.info("Passwordless token refreshed", { username: decoded.username });

        return {
            message: "Token refreshed",
            tokens: {
                accessToken: newAccessToken,
                idToken: newIdToken,
                expiresIn
            },
            user: {
                username: decoded.username,
                email,
                phone_number: phone,
                name
            }
        };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Refresh token has expired. Please login again.');
        }
        logger.error("Token refresh failed", { errorMessage: error.message });
        throw new Error('Invalid refresh token');
    }
};
