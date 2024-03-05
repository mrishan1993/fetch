import express from "express";
import { cron } from "./controllers/cron";
import { sendNotification } from "./controllers/send_notification";

const app = express();

// app.get('/trigger-cron', async (req, res) => {
//   try {
//     // Call the cron job controller function directly
//     // await cron();

//     console.log("log here")
//     await sendNotification()

//     // Respond with a success message
//     res.status(200).send("Cron job triggered successfully.");
//   } catch (error) {
//     // If an error occurs, respond with an error message
//     console.error("Error triggering cron job:", error);
//     res.status(500).send("An error occurred while triggering the cron job.");
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("log here")
  sendNotification()
  console.log(`Server is running on port ${PORT}`);
});

// app.use('/cron', cron);