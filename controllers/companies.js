const Company = require('../models/Company')

// @desc      Get all companies
// @route     GET /api/v1/companies
// @access    Public
exports.getCompanies = async (req, res, next) => {
  const companies = await Company.find({});

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies
  })
};

// @desc      Get Single Company
// @route     GET /api/v1/companies/:id
// @access    Public
exports.getCompany = async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: company
  })
};

// @desc      Create Company
// @route     POST /api/v1/companies
// @access    Private
exports.addCompany = async (req, res, next) => {
  console.log(req.body)
  const company = await Company.create(req.body);

  res.status(200).json({
    success: true,
    data: company
  })
};

// @desc      Update Company
// @route     PUT /api/v1/companies/:id
// @access    Private
exports.updateCompany = async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: company
  })
};

// @desc      Delete Company
// @route     DELETE /api/v1/companies/:id
// @access    Private
exports.deleteCompany = async (req, res, next) => {
  await Company.deleteOne({ "_id": req.params.id });

  res.status(200).json({
    success: true,
    data: {}
  })
};