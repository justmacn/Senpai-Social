// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  //for sharing art and status
  {
    author_id: {
      //ID of user who's posting
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    anime_title: {
      //title of related Anime, if applicable
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",

  }
);

module.exports = Post;
