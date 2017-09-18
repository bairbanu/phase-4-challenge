const db = require('./database/queries/users');
const { encryptPassword } = require('./helper-functions');

function create(user) {
  const { name, email , password } = user;

  return encryptPassword(password)
    .then((hash) => {
      return db.createUser(name, email, hash)
    })
    .then((user) => {
      const { id, name, email, date_joined } = user;

      return {
        id, name, email, date_joined
      };
    });
}

module.exports = {
  create,
  getById: db.getUserById,
  getByEmail: db.getUserByEmail
};
