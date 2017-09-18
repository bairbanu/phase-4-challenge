module.exports = (err, req, res, next) => {
  switch (err.message) {

    case 'user exists':
      res.render('sign-up', { error: 'user exists' });
      break;

    case 'empty sign-up field':
      res.render('sign-up', { error: 'empty sign-up field' });
      break;

  }
};
