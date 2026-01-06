require('dotenv').config();
const EmailService = require('../src/services/EmailService');

async function test() {
    console.log('Testing EmailService with random recipient...');

    if (!process.env.RESEND_API_KEY) {
        console.error('ERROR: RESEND_API_KEY is missing from env!');
        return;
    }

    try {
        const emailService = new EmailService();
        console.log('EmailService initialized.');

        // Test with a random email to trigger potential sandbox restriction
        const result = await emailService.send({
            to: 'unverified_test_user_12345@example.com',
            subject: 'Test Email from ApniSec',
            html: '<p>This is a test email.</p>'
        });

        console.log('Send attempt finished.');
        console.log('Result:', JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('Test script crashed:', error);
    }
}

test();
