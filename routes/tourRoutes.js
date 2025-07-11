const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

// This is only specified in the tour routes
router.param('id', tourController.checkID);

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
