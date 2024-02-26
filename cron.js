const { sendNotification } = require('./controllers/send_notification');

// Define the main function to be executed on schedule
async function main() {
    try {
        // Execute the main logic from index.js
        await sendNotification()
        console.log('Scheduled task completed successfully');
    } catch (error) {
        console.error('An error occurred during scheduled task:', error);
    }
}

// Execute the main function
main();