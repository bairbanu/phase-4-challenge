const db = require('../connection');

const queries = {

  getThreeNewestReviews: () => {
    return db.any(`SELECT reviews.content, reviews.album_id, reviews.user_id, reviews.date_created, albums.title AS album_title, users.name AS user_name
      FROM reviews
      INNER JOIN albums ON reviews.album_id = albums.id
      INNER JOIN users ON reviews.user_id = users.id
      ORDER BY reviews.date_created DESC
      LIMIT 3`)
  },

  createReview: () => {

  },

  getReviewsByUserId: (userID) => {
    return db.any('SELECT * FROM reviews WHERE user_id = $1 ORDER BY date_created DESC', [userID]);
  },

  getReviewsByAlbumId: (albumID) => {
    return db.any('SELECT * FROM reviews WHERE album_id = $1 ORDER BY date_created DESC', [albumID]);
  },

  deleteByReviewID: (reviewID) => {
    return db.none('DELETE FROM reviews WHERE id = $1', [reviewID]);
  }

};

module.exports = queries;
