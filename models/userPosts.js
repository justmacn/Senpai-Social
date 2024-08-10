const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Local Modules
const sequelize = require("../config/connection");

class userPosts extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

userPosts.init(
    //columns for user posts
    {
       postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        }, 
       userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        },
       //user posts
       content: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlphanumeric: true,
        },
       likes: {
        type: DataTypes.ARRAY, //array of user ids who like the post
        allowNull: false,
        },
       comments: {
        type: DataTypes.ARRAY, //List of comment IDs associated with the post.
        allowNull: false,
       }, 
    },
    {
        
          sequelize,
          freezeTableName: true,
          underscored: true,
          modelName: "userPosts",
    }
      );
      
      module.exports = userPosts;  
    
