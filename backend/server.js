const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for reset tokens. In a real application, you would use a database.
const passwordResetTokens = {};

// Middleware
app.use(cors()); // Allow requests from your Vue front-end
app.use(express.json()); // To parse JSON request bodies


// =================================================================
// == NEW: Add a GET route for the root to show the server is online
// =================================================================
// ... other code
app.use(express.json());

// Make sure this GET route exists
app.get('/', (req, res) => {
  res.status(200).send('<h1>ÉCLAT API Server is Running</h1>');
});

// ... rest of your API routes
// API Route for *requesting* a password reset
app.post('/api/password-reset-request', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email address is required.' });
  }

  // Setup the Nodemailer transporter using your App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 1. Generate a secure, random token
  const token = crypto.randomBytes(20).toString('hex');
  const expiration = Date.now() + 3600000; // Token expires in 1 hour

  // 2. Store the token and its expiration (associate it with the user's email)
  passwordResetTokens[token] = { email, expiration };
  console.log(`Generated token ${token} for ${email}`);

  // 3. Create the password reset link
  // This URL should point to your front-end page that handles the password reset form
  const resetLink = `http://localhost:8080/reset-password?token=${token}`; // Assuming your Vue app runs on 8080

  // 4. Configure the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Password Reset Link for ÉCLAT',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your ÉCLAT account.</p>
        <p>Please click the button below to set a new password. This link will expire in one hour.</p>
        <a href="${resetLink}" style="background-color: #0088FF; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Reset Password</a>
        <p style="margin-top: 30px; font-size: 0.9em; color: #777;">If you did not request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  };

  // 5. Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending reset email. Please try again later.' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: `Password reset link has been sent to ${email}.` });
  });
});


// Endpoint to handle the actual password reset
app.post('/api/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  // 1. Verify the token exists in our in-memory store
  const tokenData = passwordResetTokens[token];

  if (!tokenData) {
    return res.status(400).json({ message: 'Invalid token. Please request a new reset link.' });
  }

  // 2. Check if the token has expired
  if (Date.now() > tokenData.expiration) {
    // Clean up the expired token
    delete passwordResetTokens[token];
    return res.status(400).json({ message: 'Your password reset link has expired. Please request a new one.' });
  }

  // 3. Token is valid. "Update" the password.
  // In a real application, you would find the user by `tokenData.email` and update their password hash in the database.
  console.log(`Password successfully reset for user: ${tokenData.email}`);
  
  // 4. CRITICAL: Invalidate the token by deleting it so it cannot be used again.
  delete passwordResetTokens[token];

  res.status(200).json({ message: 'Password has been successfully reset.' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});