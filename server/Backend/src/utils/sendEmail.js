// src/utils/sendEmail.js

// Simple stub for now – replace with SES / Nodemailer in production
export const sendEmail = async (to, body) => {
  console.log(`📧 [DEV] Sending email to ${to}: ${body}`);
  // TODO: integrate AWS SES or any SMTP provider here
  return true;
};
