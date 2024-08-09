const router = require("express").Router();

// Import any models you plan to use for data's routes here
const { ExampleData, User } = require("../models");

// add a get / (landing page) route here
router.get("/", async (req, res) => {
  // FEEDS BELOW
  try {
    const exampleData = await ExampleData.findAll({
      include: [User],
    });

    const examples = exampleData.map((example) => example.get({ plain: true }));

    // Reminder- We're passing the examples data to the home handlebars template here!
    // Reminder- We're also passing the loggedIn status to the home template here so that we can conditionally render items if the user is logged in or not (like we do with the navbar using `{{if loggedIn}}`).
    res.render("home", {
      examples,
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
