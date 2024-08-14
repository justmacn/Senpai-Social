const router = require("express").Router();
const { User, Post } = require("../models");
const { withGuard } = require("../utils/authGuard");

// Get profile page - protected route
router.get("/", withGuard, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);

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
    const user = userData.get({ plain: true });

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

// Get edit profile page - protected route
router.get("/edit-user", withGuard, async (req, res) => {
  try {
    // Fetch the current user's data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['username', 'bio', 'profile_picture', 'favorite_anime'], // Fetch the necessary attributes
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Convert the user data to a plain object
    const user = userData.get({ plain: true });

    // Render the edit page and pass the user data
    res.render("edit", {
      user, // Pass the user data to the template
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/edit', withGuard, async (req, res) => {
  const { username, password, bio, profile_picture, favorite_anime } = req.body;

  try {
      const user = await User.findByPk(req.session.user_id); // Adjust as needed

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update fields only if they have values
      if (username) user.username = username;
      if (bio) user.bio = bio;
      if (profile_picture) user.profile_picture = profile_picture;
      if (favorite_anime) user.favorite_anime = favorite_anime;
      if (password) user.password = password; // Hash the password if necessary

      await user.save();

      res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Failed to update profile' });
  }
});


// Delete profile - protected route
router.delete("/delete", withGuard, async (req, res) => {
  try {
    await Post.destroy({
      where: { author_id: req.session.user_id },
    });

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

// Delete individual post - protected route
router.delete("/post/:id", withGuard, async (req, res) => {
  try {
    const postId = req.params.id;
    const deleted = await Post.destroy({
      where: {
        id: postId,
        author_id: req.session.user_id,
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
