const router = require("express").Router();

// protects routes from unauthorized access
const { withGuard } = require("../utils/authGuard");

// add a get /login route here
router.get("/", (req, res) => {
  try {
    // users still logged in will be redirected to home page instead of login page
    // if (withGuard === true) {
    //   document.location.replace("/home")
    // } else {
      res.render("login");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", withGuard, (req, res) => {
//   try {
//     // users still logged in will be redirected to home page instead of login page
//     // if (withGuard === true) {
//     //   document.location.replace("/home")
//     // } else {
//       res.render("home");
//     // }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;