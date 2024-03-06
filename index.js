const express = require('express');
const { sendNotification } = require('./controllers/send_notification');


// Create an instance of Express app
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 3000

// Define routes
app.get('/start', (req, res) => {
  sendNotification()
  res.send('Hello, World!'); // Send a simple response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});