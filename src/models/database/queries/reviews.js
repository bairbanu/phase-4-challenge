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

  createReview: (content, album_id, user_id) => {
    return db.none('INSERT INTO reviews (content, album_id, user_id) VALUES ($1, $2, $3)', [content, album_id, user_id])
  },

  getReviewsByUserId: (userID) => {
    return db.any(`SELECT reviews.id, reviews.content, reviews.album_id, reviews.user_id, reviews.date_created, albums.title AS album_title, users.name AS user_name FROM reviews
      INNER JOIN users ON reviews.user_id = users.id
      INNER JOIN albums ON reviews.album_id = albums.id
      WHERE reviews.user_id = $1
      ORDER BY reviews.date_created DESC`, [userID]);
  },

  getReviewsByAlbumId: (albumID) => {
    return db.any(`SELECT reviews.id, reviews.content, reviews.album_id, reviews.user_id, reviews.date_created, albums.title AS album_title, users.name AS user_name FROM reviews
      INNER JOIN users ON reviews.user_id = users.id
      INNER JOIN albums ON reviews.album_id = albums.id
      WHERE reviews.album_id = $1
      ORDER BY reviews.date_created DESC`, [albumID]);
  },

  deleteByReviewID: (reviewID) => {
    return db.none('DELETE FROM reviews WHERE id = $1', [reviewID]);
  }

};

module.exports = queries;
