import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import secureRoutes from "./routes";
import dbConnect from "./database";

dotenv.config();

const main = async () => {
  const app: Application = express();
  const PORT = process.env.PORT || 3001;

  app.use(helmet()); // For data security purposes
  app.use(cors()); // for cors
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  await dbConnect();

  app.use("/api/v1", secureRoutes);

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("This is root API");
  });

  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
};

try {
  main();
} catch (e) {
  console.log(e);
}
