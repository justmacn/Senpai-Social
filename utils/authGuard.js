// If the user is not logged in, redirect the request to the login route
const withGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};
// if the user is not logged in, send a 403 status code and a message
const apiGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: "you must login to perform this action" });
  } else {
    next();
  }
};

module.exports = { withGuard, apiGuard };
