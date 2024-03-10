const express = require('express');
const { sendNotification } = require('./controllers/send_notification');



// Create an instance of Express app
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Define routes
// Define routes
app.get('/start', async (req, res) => {
  try {
    console.log("Starting script")
    await sendNotification()
    res.send("OK")
  } catch (error) {
    // console.error('Error sending notification:', error);
    res.send('ER');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});