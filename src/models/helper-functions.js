const bcrypt = require('bcrypt');

function isEmpty(name, email, password) {
  return ( name === '' || password === '' || email === '' );
}

function encryptPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

module.exports = {
  isEmpty,
  encryptPassword
}
