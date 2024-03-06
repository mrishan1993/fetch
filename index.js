const express = require('express');
const { sendNotification } = require('./controllers/send_notification');


// Create an instance of Express app
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Define routes
// Define routes
app.get('/start', async (req, res) => {
  try {
    await sendNotification();
    res.send('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('An error occurred while sending the notification.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});