const bcrypt = require('bcrypt');

function isEmpty(name, email, password) {
  return ( name === '' || password === '' || email === '' );
}

function encryptPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

function loginUser(user, req) {
  req.session.user = user;
}

function signOutUser(req) {
  req.session = null;
}

function createUserObjectFromSession(session) {
  return {
    id: session.id,
    name: session.name,
    email: session.email,
    date_joined: session.date_joined
  }
}

module.exports = {
  isEmpty,
  encryptPassword,
  loginUser,
  comparePassword,
  signOutUser,
  createUserObjectFromSession
}
