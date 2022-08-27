import express, { Router, Request, Response, NextFunction } from "express";
import { HomeSchema } from "../database/models/Home";
import { PostSchema } from "../database/models/Post";

const router: Router = express();

const main = () => {
  router.get("/", async (req: Request, res: Response) => {
    const data = await HomeSchema.find();
    res.send(data[0]);
  });

  router.get("/projects", async (req: Request, res: Response) => {
    const data = await PostSchema.find();
    res.send(data);
  });
};

main();

export default router;
