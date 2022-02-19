const express = require('express')

const {
  getCompanies
} = require('../controllers/companies')

const router = express.Router();

router
  .route('/')
  .get(getCompanies)

module.exports = router;