import "@babel/polyfill";
import "./db";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Listening on: https:localhost:${PORT}`);

app.listen(PORT, handleListening);
