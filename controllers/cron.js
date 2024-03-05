import { sendNotification } from "./send_notification";

export const cron = async () => {
    
    //code for the automated task
    try {
        // Execute the main logic from index.js
        console.log("starting to call")
        await sendNotification()
        console.log('Scheduled task completed successfully');
    } catch (error) {
        console.error('An error occurred during scheduled task:', error);
    }

};