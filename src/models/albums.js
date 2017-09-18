const db = require('./database/queries/albums');

// middleware for database logic

module.exports = {
  get: db.getAlbums,
  getById: db.getAlbumByID
};
