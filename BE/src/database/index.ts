import mongoose from "mongoose";
import config from "config";

const dbName: string = config.get("app.dbConfig.dbName");
const username: string = config.get("app.dbConfig.username");
const password: string = config.get("app.dbConfig.password");

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
