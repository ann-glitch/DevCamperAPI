const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @description  Register User
// @route  /api/v1/auth/register
// @access  public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await User.create({ name, email, password, role });

  //create token
  const token = user.getSignedWebToken();

  res.status(200).json({ success: true, token });
});
