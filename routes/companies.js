const express = require('express')

const {
  getCompanies,
  getCompany,
  updateCompany,
  addCompany,
  deleteCompany
} = require('../controllers/companies')

const router = express.Router();

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