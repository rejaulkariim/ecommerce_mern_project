const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const user = require("../models/userModel");

// get all users
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const limit = Number(req.query.limit) || 5;

    // search users 
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users) throw createError(404, "no users found");

    return successResponse(res, {
      statusCode: 200,
      message: "users were return successfully",
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// get single user 
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };

    const user = await user.findById(id, option)

    return successResponse(res, {
      statusCode: 200,
      message: "user were return successfully",
      payload: {user},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser };
