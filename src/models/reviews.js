const db = require('./database/queries/reviews');

function remove(reviewID, userID, req, next) {
  const { isLoggedIn } = req;

  let sessionID;
  if (req.session.user) {
    sessionID = req.session.user.id;
  }

  console.log('sessionID::', sessionID, 'userID::', userID);
  if (!isLoggedIn) next(new Error('Cannot delete review without logging in.'));
  if (sessionID != userID) next(new Error('Cannot delete review created by another user'));

  return db.deleteByReviewID(reviewID);
}

module.exports = {
  getThreeNewest: db.getThreeNewestReviews,
  create: db.createReview,
  getByUserId: db.getReviewsByUserId,
  getByAlbumId: db.getReviewsByAlbumId,
  remove
};
