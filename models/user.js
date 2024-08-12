// Third-party Modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Local Modules
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//Columns for the user
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, Infinity],
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1, 250],
      },
    },
    //Look up how to build this out? Multer?
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    favorite_anime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    clan_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "clan",
        key: "id",
      },
    },
    friends: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      references: {
        model: "friends",
        key: "id",
      }
    }
  },
  {
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(
        updatedUserData.password,
        10
      );
      return updatedUserData;
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  },
);

module.exports = User;
