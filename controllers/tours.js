const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Tour = require("../models/Tour");

// @desc      Get tours
// @route     GET /api/v1/tours
// @access    Public
exports.getTours = asyncHandler(async (req, res, next) => {
  const tours = await Tour.find({});

  res.status(200).json({
    success: true,
    count: tours.length,
    data: tours
  });
});

// @desc      Get single tours
// @route     GET /api/v1/tours/:id
// @access    Public
exports.getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: tour
  });
});

// @desc      Add tours
// @route     POST /api/v1/tours
// @access    Private
exports.addTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.create(req.body);

  res.status(200).json({
    success: true,
    data: tour
  });
});

// @desc      Update tours
// @route     PUT /api/v1/tours/:id
// @access    Private
exports.updateTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: tour
  });
});

// @desc      Delete tours
// @route     DELETE /api/v1/tours/:id
// @access    Private
exports.deleteTour = asyncHandler(async (req, res, next) => {
  await Tour.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: {}
  });
});
