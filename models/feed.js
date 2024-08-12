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
        type: DataTypes.INTEGER,
        allowNull: false,
        }, 
       user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id", 
        }
        },
       //user posts
       content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
        },
      },
       likes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), //array of user ids who like the post
        allowNull: false,
        },
       comments: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), //List of comment IDs associated with the post.
        allowNull: false,
        references: {
          model: "comment",
          key: "id",
        },
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
    
