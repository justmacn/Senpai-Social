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

// UPDLOADS MULTER (IMAGES)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
