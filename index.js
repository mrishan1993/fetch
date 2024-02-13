const express = require('express');
const { sendNotification } = require('./controllers/send_notification');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  sendNotification()
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});