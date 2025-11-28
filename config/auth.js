function ensureAuthenticated(req, res, next) {
  res.locals.isAuthenticated = req.session.userId;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = { ensureAuthenticated };
