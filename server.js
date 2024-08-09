// Core Modules
const path = require("path");

// Third-party Modules
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

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
  // Express session will use cookies by default, but you can specify options for those cookies by adding a 'cookies' property to your session options
  cookie: {
    // Sets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after one day. The time should be given in milliseconds.
    // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    maxAge: 24 * 60 * 60 * 1000,
    // Only store session cookies when the protocol being used to connect to the server is HTTP
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // Only initialize session cookies when the referrer provided by the client matches the domain the server is hosted from
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  // sets up session store
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
