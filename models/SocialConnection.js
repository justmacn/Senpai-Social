// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class ExampleData extends Model {}

SocialConnection.init(
  {
    friendshipId: //Uniqe identifier of each friendship
   {  
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId1: //The ID of the first user
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId2: //The ID of the second user
    {
      type: DataTypes.INTEGER,
      allowNull: false,

      // references: {
      //   model: "user",
      //   key: "id",
      // },
    },
    // Reminder- Add any new columns to the ExampleData model here
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "data one",
  }
);

module.exports = SocialConnection;
