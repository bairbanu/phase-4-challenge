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

function create(req) {
  const { album_id, content } = req.body;
  const { user: { id: user_id }} = req.session;

  return db.createReview(content, album_id, user_id);
}

module.exports = {
  getThreeNewest: db.getThreeNewestReviews,
  create,
  getByUserId: db.getReviewsByUserId,
  getByAlbumId: db.getReviewsByAlbumId,
  remove
};
