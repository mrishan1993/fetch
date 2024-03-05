import express from "express";
import { cron } from "./controllers/cron";
import { sendNotification } from "./controllers/send_notification";

async function main () {
  console.log("starting cron")
  await sendNotification()
  console.log("cron ended")
}


main()
// app.use('/cron', cron);