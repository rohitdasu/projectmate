import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbName: string = process.env.dbname || "";
const username: string = process.env.username || "";
const password: string = process.env.password || "";

const dbConnect = async () => {
  mongoose
    .connect(
      "mongodb+srv://" +
        username +
        ":" +
        encodeURIComponent(password) +
        "@cluster0-fdams.mongodb.net/" +
        dbName +
        "?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("DB Connected Successfully!");
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
};

export default dbConnect;
export * from "./models";
