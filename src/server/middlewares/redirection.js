function redirectAfterReviewDelete(req, res, next) {
  const { page, id } = req.query;
  req.direct = `/${page}/${id}`;
  next();
}

function mayRedirectHome(req, res, next) {
  if (!req.isLoggedIn) res.redirect('/');
  else next();
}

module.exports = {
  redirectAfterReviewDelete,
  mayRedirectHome
}
