const { Resend } = require('resend');

/**
 * Email Service Class
 * Handles all email operations using Resend
 */
class EmailService {
  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing');
    }
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  }

  /**
   * Send email
   * @param {Object} options - Email options
   * @returns {Promise<Object>} Send result
   */
  async send(options) {
    try {
      const { to, subject, html, text } = options;

      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text: text || ' ',
      });

      if (error) {
        console.error('Email send error:', error);
        return { success: false, error: error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Email send exception:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send welcome email
   * @param {Object} user - User object
   * @returns {Promise<Object>} Send result
   */
  async sendWelcome(user) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #0f0f0f; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; padding: 30px 0; }
          .logo { font-size: 32px; font-weight: bold; color: #00ff88; }
          .content { background: #1a1a2e; border-radius: 12px; padding: 40px; color: #ffffff; }
          .title { font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #ffffff; }
          .text { color: #a0a0a0; line-height: 1.6; font-size: 16px; }
          .highlight { color: #00ff88; font-weight: 600; }
          .button { display: inline-block; background: linear-gradient(135deg, #00ff88, #00cc6a); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; margin-top: 20px; }
          .footer { text-align: center; padding: 30px 0; color: #666666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ ApniSec</div>
          </div>
          <div class="content">
            <div class="title">Welcome to ApniSec, ${user.name}!</div>
            <p class="text">
              Thank you for joining <span class="highlight">ApniSec</span> - your trusted partner in cybersecurity.
            </p>
            <p class="text">
              Your account has been successfully created. You can now access our dashboard to:
            </p>
            <ul class="text">
              <li>Create and manage security issues</li>
              <li>Request Cloud Security assessments</li>
              <li>Schedule VAPT engagements</li>
              <li>Track Reteam assessments</li>
            </ul>
            <p class="text">
              If you have any questions, our security experts are here to help.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ApniSec. All rights reserved.<br>
            Securing your digital future.
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.send({
      to: user.email,
      subject: 'Welcome to ApniSec - Your Cybersecurity Partner',
      html
    });
  }

  /**
   * Send issue created notification
   * @param {Object} user - User object
   * @param {Object} issue - Issue object
   * @returns {Promise<Object>} Send result
   */
  async sendIssueCreated(user, issue) {
    const typeLabels = {
      'cloud-security': 'Cloud Security',
      'reteam-assessment': 'Reteam Assessment',
      'vapt': 'VAPT'
    };

    const priorityColors = {
      low: '#4caf50',
      medium: '#ff9800',
      high: '#ff5722',
      critical: '#f44336'
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #0f0f0f; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; padding: 30px 0; }
          .logo { font-size: 32px; font-weight: bold; color: #00ff88; }
          .content { background: #1a1a2e; border-radius: 12px; padding: 40px; color: #ffffff; }
          .title { font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #ffffff; }
          .text { color: #a0a0a0; line-height: 1.6; font-size: 16px; }
          .issue-box { background: #252545; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .issue-title { font-size: 18px; font-weight: 600; color: #ffffff; margin-bottom: 10px; }
          .issue-type { display: inline-block; background: #00ff88; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          .issue-priority { display: inline-block; background: ${priorityColors[issue.priority] || '#ff9800'}; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-left: 8px; }
          .issue-desc { color: #a0a0a0; margin-top: 15px; }
          .footer { text-align: center; padding: 30px 0; color: #666666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ ApniSec</div>
          </div>
          <div class="content">
            <div class="title">New Issue Created</div>
            <p class="text">Hi ${user.name}, a new issue has been created in your account.</p>
            
            <div class="issue-box">
              <div class="issue-title">${issue.title}</div>
              <span class="issue-type">${typeLabels[issue.type] || issue.type}</span>
              <span class="issue-priority">${issue.priority.toUpperCase()}</span>
              <div class="issue-desc">${issue.description}</div>
            </div>
            
            <p class="text">
              Our team will review your issue and get back to you shortly.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ApniSec. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.send({
      to: user.email,
      subject: `Issue Created: ${issue.title} - ApniSec`,
      html,
      text: `Welcome to ApniSec, ${user.name}`
    });
  }

  /**
   * Send profile updated notification
   * @param {Object} user - User object
   * @returns {Promise<Object>} Send result
   */
  async sendProfileUpdated(user) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #0f0f0f; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; padding: 30px 0; }
          .logo { font-size: 32px; font-weight: bold; color: #00ff88; }
          .content { background: #1a1a2e; border-radius: 12px; padding: 40px; color: #ffffff; }
          .title { font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #ffffff; }
          .text { color: #a0a0a0; line-height: 1.6; font-size: 16px; }
          .footer { text-align: center; padding: 30px 0; color: #666666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ ApniSec</div>
          </div>
          <div class="content">
            <div class="title">Profile Updated</div>
            <p class="text">
              Hi ${user.name}, your profile has been successfully updated.
            </p>
            <p class="text">
              If you did not make this change, please contact our support team immediately.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ApniSec. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.send({
      to: user.email,
      subject: 'Profile Updated - ApniSec',
      html
    });
  }

  /**
   * Send password reset email
   * @param {Object} user - User object
   * @param {String} resetToken - Password reset token
   * @returns {Promise<Object>} Send result
   */
  async sendPasswordReset(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #0f0f0f; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; padding: 30px 0; }
          .logo { font-size: 32px; font-weight: bold; color: #00ff88; }
          .content { background: #1a1a2e; border-radius: 12px; padding: 40px; color: #ffffff; }
          .title { font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #ffffff; }
          .text { color: #a0a0a0; line-height: 1.6; font-size: 16px; }
          .button { display: inline-block; background: linear-gradient(135deg, #00ff88, #00cc6a); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; margin-top: 20px; }
          .warning { color: #ff9800; font-size: 14px; margin-top: 20px; }
          .footer { text-align: center; padding: 30px 0; color: #666666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ ApniSec</div>
          </div>
          <div class="content">
            <div class="title">Password Reset Request</div>
            <p class="text">
              Hi ${user.name}, we received a request to reset your password.
            </p>
            <p class="text">
              Click the button below to reset your password:
            </p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p class="warning">
              This link will expire in 1 hour. If you didn't request this, please ignore this email.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ApniSec. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.send({
      to: user.email,
      subject: 'Password Reset Request - ApniSec',
      html
    });
  }
}

module.exports = EmailService;
