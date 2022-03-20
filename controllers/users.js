const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Get all User
// @route     GET /api/v1/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async(req, res, next) => {
  res.status(200).json(res.advancedResults)
})

