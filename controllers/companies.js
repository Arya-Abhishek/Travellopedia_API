const Company = require('../models/Company')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocode')
const path = require('path')

// @desc      Get all companies
// @route     GET /api/v1/companies
// @access    Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
  // console.log req params
  console.log(req.query)
  let queryString = JSON.stringify(req.query)

  const regex = /\b(gt|gte|lt|lte|in)\b/g;

  queryString = queryString.replace(regex, match => `$${match}`)

  console.log(queryString);

  let query = Company.find(JSON.parse(queryString))

  const companies = await query;

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

// @desc      Upload Company photo
// @route     PUT /api/v1/companies/:id/photo
// @access    Private
exports.companyPhotoUpload = asyncHandler(async (req, res, next) => {
  
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(`Company Not Found with the id of ${req.params.id}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  //  Check the sent file is of image type
  const file = req.files.companyImage;

  console.log(file);

  if(!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`Please upload an image file either jpg, png, gif`, 400)
    )
  }

  // Check the file size before uploading
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
    )
  }

  // Create custom filename
  file.name = `Photo_${company._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async(err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Company.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  })
})