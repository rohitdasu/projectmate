import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express();
import { build } from "../database/models/User";
import * as admin from "firebase-admin";
import config from "config";

const firebase: string = config.get("app.dbConfig.firebase");

const main = () => {
  admin.initializeApp({
    credential: admin.credential.cert(firebase),
  });

  const verifyIdToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "token not passed" });

    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        // const uid = decodedToken.uid; // uid of user
        next();
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: "token invalid",
          systemMessage: error,
        });
      });
  };

  router.post("/", verifyIdToken, async (req: Request, res: Response) => {
    const { _id, username, password, name, phone, email } = req.body;
    const data = {
      _id,
      username,
      password,
      name,
      phone,
      email,
    };
    const result = build(data);
    result
      .save()
      .then((value) => {
        res.status(200).json(value);
      })
      .catch((e) => {
        res.status(400).json(e);
      });
  });
};

main();

export default router;
