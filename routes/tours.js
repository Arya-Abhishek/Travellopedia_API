const express = require("express");

const {
  getTours,
  getTour,
  deleteTour,
  updateTour,
  addTour
} = require("../controllers/tours");

const router = express.Router();

router.route("/").get(getTours).post(addTour);

router // Force break
  .route("/:id")
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour);

module.exports = router;
