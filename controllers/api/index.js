const router = require("express").Router();

// Import all of the routes from /api/ here
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

// Connect the routes to the router here
router.use("/users", userRoutes);
router.use("/post", postRoutes);

module.exports = router;
