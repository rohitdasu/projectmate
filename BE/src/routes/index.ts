import express, { Router, Request, Response, NextFunction } from "express";
import { HomeSchema } from "../database/models/Home"

const router: Router = express();

const main = () => {

  router.get("/", async (req: Request, res: Response) => {
      const data = await HomeSchema.find()
      res.send(data[0]);
  });

};

main();

export default router;
