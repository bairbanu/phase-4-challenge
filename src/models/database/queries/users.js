const db = require('../connection');

const queries = {

  createUser: (name, email, password) => {
    return db.one(`INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *`, [name, email, password]);
  },

  getUserById: (id) => {

  },

  getUserByEmail: (email) => {
    return db.one('SELECT * FROM users WHERE email = $1', [email]);
  }

};

module.exports = queries;
