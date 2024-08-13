const router = require("express").Router();

// Import any models you plan to use for data's routes here
const { Post, User } = require("../models");

// protects routes from unauthorized access
const { withGuard } = require("../utils/authGuard");

// homepage feed route for logged in users
router.get("/", withGuard, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'profile_picture'],
        }
      ]
    });

    const posts = postData.slice(-5);

    const feed = posts.map((post) => post.get({ plain: true }));

    res.render("home", {
      feed,
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
