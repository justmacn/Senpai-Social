const router = require("express").Router();

// import any models you plan to use for this data's routes here
const { Post } = require("../../models");

// protects routes from non-logged in users
const { apiGuard } = require("../../utils/authGuard");


// Handles UPLOADING Images
const multer = require('multer');

// MULTER
// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  }
});

// Initialize Multer middleware
const upload = multer({ storage: storage });

// upload(req, res, (err) => {
//   if (err) {
//     res.render('index', {
//       msg: err
//     });
//   } else {
//     if (req.file == undefined) {
//       res.render('index', {
//         msg: 'No file selected!'
//       });
//     } else {
//       res.render('index', {
//         msg: 'File uploaded!',
//         file: `uploads/${req.file.filename}`
//       });
//     }

router.post("/", apiGuard, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", apiGuard, async (req, res) => {
  try {
    const [updatedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", apiGuard, async (req, res) => {
  try {
    const [destroyedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (destroyedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
