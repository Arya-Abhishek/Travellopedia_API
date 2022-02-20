const Company = require('../models/Company')

// @desc      Get all companies
// @route     GET /api/v1/companies
// @access    Public
exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find({});

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    })
  } catch (err) {
    console.log(err)
  }
};

// @desc      Get Single Company
// @route     GET /api/v1/companies/:id
// @access    Public
exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: company
    })
  } catch (err) {
    next(err)
  }
};

// @desc      Create Company
// @route     POST /api/v1/companies
// @access    Private
exports.addCompany = async (req, res, next) => {
  console.log(req.body)
  try {
    const company = await Company.create(req.body);

    res.status(200).json({
      success: true,
      data: company
    })
  } catch (err) {
    console.log(err)
  }
};

// @desc      Update Company
// @route     PUT /api/v1/companies/:id
// @access    Private
exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: company
    })
  } catch (err) {
    console.log(err)
  }
};

// @desc      Delete Company
// @route     DELETE /api/v1/companies/:id
// @access    Private
exports.deleteCompany = async (req, res, next) => {
  try {
    await Company.deleteOne({ "_id": req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (err) {
    console.log(err)
  }
};