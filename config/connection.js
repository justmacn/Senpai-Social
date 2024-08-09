// Third-party Modules
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// This connection looks a little different than you're used to! That's because Render will need a DB_URL environment variable to connect to the database. For more information, visit: https://coding-boot-camp.github.io/full-stack/render/deploy-with-render-and-postgresql
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
}

module.exports = sequelize;
