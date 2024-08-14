const router = require("express").Router();

// import any models you plan to use for this page's routes here
const { User, Post } = require("../models");

// protects routes from unauthorized access
const { withGuard } = require("../utils/authGuard");

// route to send user their profile page
router.get("/", withGuard, async (req, res) => {
  try {
    const userData = await User.findByPk(
      // Reminder- this is how you filter data by user_id
      req.session.user_id,
      
    );
    const postData = await Post.findAll({
      limit: 3,
      order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username', 'profile_picture'],
        }
      ],
      where: {
        author_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    
    const user = userData.get({ plain: true })

   res.render("profile", {
      user,
      posts,
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
 });

// route to edit user profile
router.put("/edit", withGuard, async (req, res) => {
  try {
    const { username, password, bio, profile_picture, favorite_anime } = req.body;
    const [updated] = await databyUser.update(
      { username, password, bio, profile_picture, favorite_anime }, 
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
//delete profile route
router.delete("/delete", withGuard, async (req, res) => {
  try {
    // Delete associated posts first if needed
    await Post.destroy({
      where: { author_id: req.session.user_id },
    });

    // Delete user profile
    const deleted = await User.destroy({
      where: { id: req.session.user_id },
    });

    if (deleted) {
      req.session.destroy(() => {
        res.status(200).json({ message: "User deleted successfully" });
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete individual posts 
router.delete("/post/:id", withGuard, async (req, res) => {
  try {
    const postId = req.params.id;
    const deleted = await Post.destroy({
      where: {
        id: postId,
        author_id: req.session.user_id, // Ensure the post belongs to the logged-in user
      },
    });

    if (deleted) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found or you do not have permission to delete it" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
