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
