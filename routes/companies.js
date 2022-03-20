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

const advancedResults = require('../middleware/advancedResults')
const {protect, authorize} = require('../middleware/auth')

const router = express.Router();

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const toursRouter = require('./tours');

const Company = require('../models/Company')

// you can nest routers by attaching them as middleware:
router.use('/:companyId/tours', toursRouter);

router.route('/radius/:zipcode/:distance').get(getCompaniesWithinRadius);

router.route('/:id/photo').put(companyPhotoUpload);

router
  .route('/')
  .get(advancedResults(Company), getCompanies)
  .post(protect, authorize('admin', 'publisher'), addCompany);

router
  .route('/:id')
  .get(getCompany)
  .put(protect, authorize('admin', 'publisher'), updateCompany)
  .delete(protect, authorize('admin', 'publisher'), deleteCompany);

module.exports = router;