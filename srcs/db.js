import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  "mongodb://<heroku_vczs2fpx>:<q5vvlgfq6icr33quljbnqa3mgn>@ds229609.mlab.com:29609/heroku_vczs2fpx",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = error => console.log(`Error on DB Connection ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
