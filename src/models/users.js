const db = require('./database/queries/users');
const { encryptPassword, comparePassword, loginUser } = require('./helper-functions');

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

function loginByEmail(user, req) {
  const { email, password: plainPassword } = user;
  let verifiedUser;

  return db.getUserByEmail(email)
    .then((user) => {
      const { password: hash } = user;
      verifiedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        date_joined: user.date_joined
      };
      return comparePassword(plainPassword, hash);
    })
    .then((match) => {
      if (match) loginUser(verifiedUser, req);
      else throw Error('incorrect email and/or password');
    })
}

module.exports = {
  create,
  getById: db.getUserById,
  loginByEmail
};
