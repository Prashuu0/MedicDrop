const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send welcome email
const sendWelcomeEmail = async (email, name, role) => {
  try {
    const transporter = createTransporter();
    
    let subject = '';
    let htmlContent = '';
    
    switch (role) {
      case 'doctor':
        subject = 'Welcome to MedicDrop - Doctor Panel';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to MedicDrop, Dr. ${name}!</h2>
            <p>Thank you for joining MedicDrop as a healthcare provider. Your account has been created successfully.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Next Steps:</h3>
              <ul>
                <li>Complete your profile verification</li>
                <li>Upload your medical license</li>
                <li>Set your availability schedule</li>
                <li>Start reviewing prescriptions</li>
              </ul>
            </div>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>MedicDrop Team</p>
          </div>
        `;
        break;
        
      case 'pharmacy':
        subject = 'Welcome to MedicDrop - Pharmacy Partner';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to MedicDrop, ${name}!</h2>
            <p>Thank you for partnering with MedicDrop. Your pharmacy account has been created successfully.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Next Steps:</h3>
              <ul>
                <li>Complete KYC verification</li>
                <li>Upload pharmacy license</li>
                <li>Add your medicine inventory</li>
                <li>Start receiving orders</li>
              </ul>
            </div>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>MedicDrop Team</p>
          </div>
        `;
        break;
        
      default:
        subject = 'Welcome to MedicDrop';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to MedicDrop, ${name}!</h2>
            <p>Thank you for joining MedicDrop. Your account has been created successfully.</p>
            <p>You can now order medicines, upload prescriptions, and track your orders easily.</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>MedicDrop Team</p>
          </div>
        `;
    }
    
    const mailOptions = {
      from: `"MedicDrop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Welcome email error:', error);
    return { success: false };
  }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (email, orderDetails) => {
  try {
    const transporter = createTransporter();
    
    const itemsHtml = orderDetails.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price}</td>
      </tr>
    `).join('');
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Order Confirmation</h2>
        <p>Dear ${orderDetails.customerName},</p>
        <p>Your order has been confirmed! Here are the details:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order #${orderDetails.orderNumber}</h3>
          <p><strong>Order Date:</strong> ${new Date(orderDetails.orderDate).toLocaleDateString()}</p>
          <p><strong>Estimated Delivery:</strong> ${orderDetails.estimatedDelivery}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #e5e7eb;">
              <th style="padding: 10px; text-align: left;">Medicine</th>
              <th style="padding: 10px; text-align: center;">Quantity</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #f9fafb; font-weight: bold;">
              <td colspan="2" style="padding: 10px;">Total Amount</td>
              <td style="padding: 10px; text-align: right;">₹${orderDetails.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>Delivery Address:</h4>
          <p>${orderDetails.deliveryAddress}</p>
        </div>
        
        <p>You can track your order status in the MedicDrop app.</p>
        <p>Thank you for choosing MedicDrop!</p>
        
        <p>Best regards,<br>MedicDrop Team</p>
      </div>
    `;
    
    const mailOptions = {
      from: `"MedicDrop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      html: htmlContent
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Order confirmation email error:', error);
    return { success: false };
  }
};

// Send prescription verification email
const sendPrescriptionVerificationEmail = async (email, prescriptionDetails) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Prescription Verification Update</h2>
        <p>Dear ${prescriptionDetails.patientName},</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Prescription #${prescriptionDetails.prescriptionNumber}</h3>
          <p><strong>Status:</strong> <span style="color: ${prescriptionDetails.status === 'verified' ? '#059669' : '#dc2626'};">${prescriptionDetails.status.toUpperCase()}</span></p>
          <p><strong>Verified by:</strong> Dr. ${prescriptionDetails.doctorName}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        ${prescriptionDetails.notes ? `
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Doctor's Notes:</h4>
            <p>${prescriptionDetails.notes}</p>
          </div>
        ` : ''}
        
        <p>You can now proceed to order your medicines through the MedicDrop app.</p>
        
        <p>Best regards,<br>MedicDrop Team</p>
      </div>
    `;
    
    const mailOptions = {
      from: `"MedicDrop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Prescription Verification - ${prescriptionDetails.prescriptionNumber}`,
      html: htmlContent
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Prescription verification email error:', error);
    return { success: false };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken, name) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>Dear ${name},</p>
        <p>You have requested to reset your password. Click the button below to reset it:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
        </div>
        
        <p>If the button doesn't work, copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
        
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #dc2626; margin: 0;"><strong>Important:</strong> This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.</p>
        </div>
        
        <p>Best regards,<br>MedicDrop Team</p>
      </div>
    `;
    
    const mailOptions = {
      from: `"MedicDrop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - MedicDrop',
      html: htmlContent
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Password reset email error:', error);
    return { success: false };
  }
};

// Send account verification email
const sendAccountVerificationEmail = async (email, verificationToken, name, role) => {
  try {
    const transporter = createTransporter();
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-account?token=${verificationToken}&role=${role}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Account Verification Required</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering with MedicDrop. Please verify your email address to activate your account:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Account</a>
        </div>
        
        <p>If the button doesn't work, copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #6b7280;">${verificationUrl}</p>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #92400e; margin: 0;"><strong>Note:</strong> This verification link will expire in 24 hours.</p>
        </div>
        
        <p>Best regards,<br>MedicDrop Team</p>
      </div>
    `;
    
    const mailOptions = {
      from: `"MedicDrop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your MedicDrop Account',
      html: htmlContent
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('Account verification email error:', error);
    return { success: false };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendPrescriptionVerificationEmail,
  sendPasswordResetEmail,
  sendAccountVerificationEmail
};
