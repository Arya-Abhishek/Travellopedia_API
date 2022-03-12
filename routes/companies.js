const express = require('express')

const {
  getCompanies,
  getCompany,
  updateCompany,
  addCompany,
  deleteCompany,
  getCompaniesWithinRadius,
  companyPhotoUpload
} = require('../controllers/companies')

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getCompaniesWithinRadius);

router.route('/:id/photo').put(companyPhotoUpload);

router
  .route('/')
  .get(getCompanies)
  .post(addCompany);

router
  .route('/:id')
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;