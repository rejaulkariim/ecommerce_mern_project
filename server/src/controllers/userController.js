const createError = require("http-errors");
const users = require("../models/usersModel");

const getUsers = (req, res, next) => {
  try {
    res.status(200).send({
      message: "users ware returned",
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
