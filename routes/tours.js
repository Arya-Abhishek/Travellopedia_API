const express = require("express");

const {
  getTours,
  getTour,
  deleteTour,
  updateTour,
  addTour
} = require("../controllers/tours");

const { protect, authorize } = require('../middleware/auth');

const router = express.Router({mergeParams: true});

router.route("/").get(getTours).post(protect, authorize('publisher', 'admin'), addTour);

router // Force break
  .route("/:id")
  .get(getTour)
  .put(protect, authorize('publisher', 'admin'), updateTour)
  .delete(protect, authorize('publisher', 'admin'), deleteTour);

module.exports = router;
