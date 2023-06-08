const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const findUserById = async (id) => {
  try {
    const option = { password: 0 };

    const user = await User.findById(id, option);

    if (!user) {
      throw createError(404, "user does not exist with this id");
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "invalid user id");
    }
    throw error;
  }
};

module.exports = {findUserById}