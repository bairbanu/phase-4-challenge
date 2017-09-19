function redirectAfterReviewDelete(req, res, next) {
  const { page, id } = req.query;
  req.direct = `/${page}/${id}`;
  next();
}

module.exports = {
  redirectAfterReviewDelete
}
