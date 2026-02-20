const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

reviewsSchema.pre(/^find/, function (next) {
  // Populate user and tour this creates 2 queries
  this.populate({
    path: 'user',
  }).populate({
    path: 'tour',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;
