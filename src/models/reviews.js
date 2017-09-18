const db = require('./database/queries/reviews');

// middleware for database logic

module.exports = {
  getThreeNewest: db.getThreeNewestReviews,
  create: db.createReview,
  getByUserId: db.getReviewsByUserId,
  getByAlbumId: db.getReviewsByAlbumId
};
