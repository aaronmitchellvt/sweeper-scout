import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  let { email, address, district, password, passwordConfirmation } = req.body;
  console.log("req body: ", req.body)

  try {
    const persistedUser = await User.query().insertAndFetch({ email, address, district, password });
    console.log("Persisted User: ", persistedUser)
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
