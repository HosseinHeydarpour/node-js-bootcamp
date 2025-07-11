const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
// Get a tour, update it, and delete it
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
