import cognitoService from '../services/cognitoService.js';

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const tokens = await cognitoService.login(email, password);
      res.status(200).json({ message: 'Login successful', ...tokens });
    } catch (error) {
      res.status(401).json({ message: 'Login failed', error: error.message });
    }
  },

  signUp: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await cognitoService.signUp(email, password);
      res.status(201).json({
        message: 'Signup successful. Please check your email for the verification code.',
        userSub: result.UserSub,
      });
    } catch (error) {
      res.status(400).json({ message: 'Signup failed', error: error.message });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { email, code } = req.body;
      await cognitoService.verifyOTP(email, code);
      res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (error) {
      res.status(400).json({ message: 'Verification failed', error: error.message });
    }
  },
};

export default authController;
