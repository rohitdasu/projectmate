import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express();

const main = () => {
  router.post("/", async (req: Request, res: Response) => {
    const { _id, username, password, name, phone, email } = req.body;
    const data = {
      _id,
      username,
      password,
      name,
      phone,
      email,
    };
    res.send(data);
  });
};

main();

export default router;
