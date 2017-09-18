const db = require('../connection');

const queries = {

  getAlbums: () => {
    return db.any('SELECT * FROM albums')
  },

  getAlbumByID: (id) => {
    return db.any('SELECT * FROM albums WHERE id = $1', [id]);
  }
}

module.exports = queries;
