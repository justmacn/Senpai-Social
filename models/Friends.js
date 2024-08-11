// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Friends extends Model {
  checkPassword(loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
 }
}

Friends.init(
  {
    friendship_id: //Uniqe identifier of each friendship
   {  
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id1: //The ID of the first user
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id2: //The ID of the second user
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
    modelName: "friends",
  }
);

module.exports = Friends;
