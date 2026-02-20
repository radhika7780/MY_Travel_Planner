// Mock Notification Utility

export const sendSMS = (phoneNumber, message) => {
    console.log(`[SMS Simulation] To: ${phoneNumber} | Message: ${message}`);
    return Promise.resolve(true); // Simulate success
};

export const sendEmail = (email, subject, body) => {
    console.log(`[Email Simulation] To: ${email} | Subject: ${subject} | Body: ${body}`);
    return Promise.resolve(true); // Simulate success
};

export const sendPushNotification = (userId, title, message) => {
    console.log(`[Push Notification Simulation] User: ${userId} | ${title}: ${message}`);
    return Promise.resolve(true); // Simulate success
};
