// import all models here
const User = require("./User");
const ExampleData = require("./ExampleData");

// Reminder- create any additional associations here
ExampleData.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(ExampleData, {
  foreignKey: "userId",
});

// export all models here
module.exports = { User, ExampleData };
