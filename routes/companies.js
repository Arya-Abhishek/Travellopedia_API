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

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const tours = require('./tours');

// you can nest routers by attaching them as middleware:
router.use('/:companyId/tours', tours);

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