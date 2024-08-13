const router = require("express").Router();

// import any models you plan to use for this page's routes here
const { databyUser } = require("../models");

// protects routes from unauthorized access
const { withGuard } = require("../utils/authGuard");

router.get("/", withGuard, async (req, res) => {
  try {
    const data = await databyUser.findAll({
      // Reminder- this is how you filter data by user_id
      where: {
        user_id: req.session.user_id,
      },
    });

    const userExamples = data.map((example) =>
      example.get({ plain: true })
    );
    // Reminder- We're passing the userExamples data to the page-one handlebars template here!
    // Reminder- We're also passing the loggedIn status to the page-one handlebars template here so that we can conditionally render items if the user is logged in or not.
    res.render("page-one", {
      userExamples,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to edit user profile
router.put("/edit", withGuard, async (req, res) => {
  try {
    const { username, email } = req.body;
    const [updated] = await databyUser.update(
      { username, email }, 
      {where: { user_id: req.session.user_id } }
    );
    if (updated) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' }); 
    }
   } catch (err) {
     res.status(500).json(err);
   

  }
});


module.exports = router;
