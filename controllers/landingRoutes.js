const router = require("express").Router();

// protects routes from unauthorized access
const { withGuard } = require("../utils/authGuard");

// landing page route to login
router.get("/", (req, res) => {
  try {
    // users still logged in will be redirected to home page instead of login page
    if (req.session.logged_in) {
      res.redirect("/home")
    } else {
      res.render("login"); 
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// wildcard route
router.get("*", (req, res) => {
  try {
      res.render("404");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;