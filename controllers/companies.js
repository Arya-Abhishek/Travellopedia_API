const Company = require('../models/Company')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocode')

// @desc      Get all companies
// @route     GET /api/v1/companies
// @access    Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
  const companies = await Company.find({});

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies
  })
});

// @desc      Get Single Company
// @route     GET /api/v1/companies/:id
// @access    Public
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(new ErrorResponse(`Company not found with id ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: company
  })
});

// @desc      Create Company
// @route     POST /api/v1/companies
// @access    Private
exports.addCompany = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const company = await Company.create(req.body);

  res.status(200).json({
    success: true,
    data: company
  })
});

// @desc      Update Company
// @route     PUT /api/v1/companies/:id
// @access    Private
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: company
  })
});

// @desc      Delete Company
// @route     DELETE /api/v1/companies/:id
// @access    Private
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  await Company.deleteOne({ "_id": req.params.id });

  res.status(200).json({
    success: true,
    data: {}
  })
});


// @desc      Get Companies within a radius
// @route     GET /api/v1/companies/radius/:zipcode/:distance
// @access    Public
exports.getCompaniesWithinRadius = asyncHandler(async (req, res, next) => {
  let {zipcode, distance} = req.params;
  console.log(zipcode, distance);
  
  const loc = await geocoder.geocode({
    country: 'India',
    zipcode: zipcode
  });
  
  // Get lat/lng from the zipcode
  const lat = loc[0].latitude;
  const lng =  loc[0].longitude;

  // hence, have give distance in spherical geometry coordinate system
  const radius = distance / 3963;
  console.log(lat, lng, radius);

  const companies = await Company.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })

  res.status(200).json({
    success: true, 
    count: companies.length,
    data: companies
  })
});