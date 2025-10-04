const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send OTP SMS
const sendOTP = async (phone, otp) => {
  try {
    const message = `Your MedicDrop verification code is: ${otp}. Valid for 10 minutes. Do not share this code with anyone.`;
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    
    console.log('OTP sent successfully:', result.sid);
    return {
      success: true,
      messageId: result.sid
    };
    
  } catch (error) {
    console.error('SMS sending error:', error);
    throw new Error('Failed to send OTP. Please try again.');
  }
};

// Send order confirmation SMS
const sendOrderConfirmation = async (phone, orderNumber, totalAmount) => {
  try {
    const message = `Order confirmed! Order #${orderNumber} for ₹${totalAmount} has been placed. Track your order on MedicDrop app.`;
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    
    return {
      success: true,
      messageId: result.sid
    };
    
  } catch (error) {
    console.error('Order confirmation SMS error:', error);
    return { success: false };
  }
};

// Send delivery update SMS
const sendDeliveryUpdate = async (phone, orderNumber, status, estimatedTime) => {
  try {
    let message = '';
    
    switch (status) {
      case 'picked_up':
        message = `Your order #${orderNumber} has been picked up and is on the way. Expected delivery: ${estimatedTime}`;
        break;
      case 'out_for_delivery':
        message = `Your order #${orderNumber} is out for delivery. Our delivery partner will reach you soon.`;
        break;
      case 'delivered':
        message = `Your order #${orderNumber} has been delivered successfully. Thank you for choosing MedicDrop!`;
        break;
      default:
        message = `Update: Your order #${orderNumber} status has been updated to ${status}.`;
    }
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    
    return {
      success: true,
      messageId: result.sid
    };
    
  } catch (error) {
    console.error('Delivery update SMS error:', error);
    return { success: false };
  }
};

// Send prescription reminder SMS
const sendPrescriptionReminder = async (phone, medicineName, dosage) => {
  try {
    const message = `Reminder: Time to take your medicine ${medicineName} (${dosage}). Stay healthy with MedicDrop!`;
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    
    return {
      success: true,
      messageId: result.sid
    };
    
  } catch (error) {
    console.error('Prescription reminder SMS error:', error);
    return { success: false };
  }
};

// Send pharmacy notification SMS
const sendPharmacyNotification = async (phone, message) => {
  try {
    const result = await client.messages.create({
      body: `MedicDrop: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    
    return {
      success: true,
      messageId: result.sid
    };
    
  } catch (error) {
    console.error('Pharmacy notification SMS error:', error);
    return { success: false };
  }
};

// Send delivery partner notification SMS
const sendDeliveryNotification = async (phone, message) => {
  try {
    const result = await client.messages.create({
      body: `MedicDrop Delivery: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    
    return {
      success: true,
      messageId: result.sid
    };
    
  } catch (error) {
    console.error('Delivery notification SMS error:', error);
    return { success: false };
  }
};

// Validate phone number format
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Format phone number for international use
const formatPhoneNumber = (phone) => {
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If it starts with +91, remove it
  if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
    return cleanPhone.substring(2);
  }
  
  // If it's already 10 digits, return as is
  if (cleanPhone.length === 10) {
    return cleanPhone;
  }
  
  throw new Error('Invalid phone number format');
};

module.exports = {
  sendOTP,
  sendOrderConfirmation,
  sendDeliveryUpdate,
  sendPrescriptionReminder,
  sendPharmacyNotification,
  sendDeliveryNotification,
  validatePhoneNumber,
  formatPhoneNumber
};
