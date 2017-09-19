const db = require('./database/queries/reviews');

function remove(reviewID, userID, req, next) {
  const { isLoggedIn } = req;

  let sessionID;
  if (req.session.user) {
    sessionID = req.session.user.id;
  }

  if (!isLoggedIn) throw Error('Cannot delete review without logging in.');
  else if (sessionID != userID) throw Error('Cannot delete review created by another user');
  else {
    return db.deleteByReviewID(reviewID);
  }
}

module.exports = {
  getThreeNewest: db.getThreeNewestReviews,
  create: db.createReview,
  getByUserId: db.getReviewsByUserId,
  getByAlbumId: db.getReviewsByAlbumId,
  remove
};
