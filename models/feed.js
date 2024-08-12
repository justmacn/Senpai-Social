const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Local Modules
const sequelize = require("../config/connection");

class Feed extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Feed.init(
  //columns for user posts
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      references: {
        model: "post",
        key: "id",
      }
    },
    market_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      references: {
        model: "market",
        key: "id",
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "feed",
  }
);

module.exports = Feed;

