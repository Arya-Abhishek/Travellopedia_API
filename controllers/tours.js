const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Tour = require("../models/Tour");
const Company = require("../models/Company");

// @desc      Get tours
// route      GET /api/v1/companies/:companyId/tours
// @route     GET /api/v1/tours
// @access    Public
exports.getTours = asyncHandler(async (req, res, next) => {
  let tours;
  if (req.params.companyId) {
    tours = await Tour.find({company: req.params.companyId})

    return res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } else {
    return res.status(200).json(res.advancedResults)
  }  
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
// @route     POST /api/v1/companies/:companyId/courses
// @access    Private
exports.addTour = asyncHandler(async (req, res, next) => {
  req.body.company = req.params.companyId
  req.body.user = req.user.id   // protect middleware attached user object decoded from jwt token

  const company = await Company.findById(req.params.companyId)

  if (!company) {
    return next(
      new ErrorResponse(
        `No company with the id of ${req.params.companyId}`, 404
      )
    )
  }

  // Make sure user is company owner
  if (company.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a couse to this bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

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
  let tour = await Tour.findById(req.params.id)

  if (!tour) {
    return next(
      new ErrorResponse(`No tour with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure the user is the owner of the tour or admin
  if (tour.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this tour ${tour._id}`, 401
      )
    )
  }

  tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: tour
  });
});

// @desc      Delete tours
// @route     DELETE /api/v1/tours/:id
// @access    Private
exports.deleteTour = asyncHandler(async (req, res, next) => {
  // Check the appropriate permissions before deleting the resource
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(
      new ErrorResponse(`No tour witht the id of ${req.params.id}`, 404)
    )
  }

  if (tour.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this course ${course._id}`,
        401
      )
    );
  }

  await tour.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
