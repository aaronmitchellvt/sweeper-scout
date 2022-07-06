import express from "express";
import passport from "passport";
import User from "../../../models/User.js";

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

usersRouter.patch("/:id", async (req, res) => {
  console.log("Hit the back end")
  const userObjToEdit = await User.query().findById(req.params.id)

  const userId = userObjToEdit.id
  console.log("User id to edit: ", userId)
  console.log("User to edit: ", userObjToEdit)

  const userData = {
    address: req.body.address,
    district: req.body.district,
    email: req.user.email
  }

  if (userId === req.user.id) {
    console.log("successful id match")
    const updatedUser = await userObjToEdit.$query().updateAndFetch(userData)
    res.status(201).json({ updatedUser })
  } else {
    console.log("Error in backend with Patch")
  }
})

export default usersRouter;
