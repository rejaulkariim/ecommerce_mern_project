const express = require("express");
const {
  getUsers,
  deleteUserById,
  getUserById,
} = require("../controllers/userController");
const userRouter = express.Router();

// GET: /api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
