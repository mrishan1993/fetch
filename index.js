import express from "express";
import { cron } from "./controllers/cron";

const app = express();

app.use('/cron', cron);