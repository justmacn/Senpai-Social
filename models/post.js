// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Post extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Post.init(
  //for sharing art and status
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      //ID of user who's posting
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      }
    },
    image_url: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    anime_title: {
      //title of related Anime, if applicable
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "anime",
        key: "id"
      }
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
