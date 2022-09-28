const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @description  Get all users
// @route  GET /api/v1/users
// @access  private
exports.getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @description  Get Single user
// @route  GET /api/v1/users/:id
// @access  private
exports.getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    sucess: true,
    data: user,
  });
});

// @description  Create user
// @route  POST /api/v1/users
// @access  private
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json({
    sucess: true,
    data: user,
  });
});

// @description  Update User
// @route  PATCH /api/v1/users/:id
// @access  private
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    sucess: true,
    data: user,
  });
});

// @description  Delete user
// @route  DELETE /api/v1/users/:id
// @access  private
exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    sucess: true,
    data: {},
  });
});
