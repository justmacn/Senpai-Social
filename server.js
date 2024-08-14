// Core Modules
const path = require("path");

// Third-party Modules
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// Handles UPLOADING Images
const multer = require('multer');

// Local Modules
const routes = require("./controllers");
const sequelize = require("./config/connection");

// Initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initializes an instance of Express.js
const app = express();
// Specifies which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Sets up Handlebars.js engine
const hbs = exphbs.create();

// Sets up session and connect to our Sequelize db
const sess = {
  secret: "Pandas are awesome",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Adds express-session and store as Express.js middleware
app.use(session(sess));

// Informs Express.js to use Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static middleware pointing to public folder to serve assets
app.use(express.static(path.join(__dirname, "public")));

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

// Example route to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.send('File uploaded successfully!');
  } catch (error) {
    res.status(400).send('Error uploading file.');
  }
});

// sets up routes
app.use(routes);

// connects database then starts express.js server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `Visit local site at http://localhost:${PORT}. Visit API with Insomnia at http://localhost:${PORT}/api/`
    )
  );
});
