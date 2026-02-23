const mongoose = require('mongoose');

const Tour = require('./tourModel');

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
    user: {
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
  // this.populate({
  //   path: 'user',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  //  to stop populate chain
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewsSchema.statics.calcAverageRatings = async function (tourId) {
  console.log(tourId);
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  console.log(stats);

  // To persist the stats
  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};

reviewsSchema.post('save', function () {
  // This points to current review

  // Review.calcAverageRatings(this.tour);
  this.constructor.calcAverageRatings(this.tour);
});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;

// Nested routes
// POST /tour/234324sad/reviews
// GET /tour/234324sad/reviews
// GET /tour/234324sad/reviews/34098reviewid
