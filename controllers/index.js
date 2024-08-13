const router = require("express").Router();

// Import all of the routes from controllers here
const landingRoutes = require("./landingRoutes");
const apiRoutes = require("./api/");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");
// const marketRoutes = require("./marketRoutes");

// Connect the routes to the router here
router.use("/api", apiRoutes);
router.use("/home", homeRoutes);
router.use("/profile", profileRoutes);
router.use("/", landingRoutes);
// router.use("/marketplace", marketRoutes);

module.exports = router;
