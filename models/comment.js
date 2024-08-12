// Third-party Modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Local Modules
const sequelize = require("../config/connection");

class Comment extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        user_id: {
            //user who made the comment
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        }, 
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlphanumeric: true,
            max: 250, 
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "feed",
                key: "post_id",
            },

        }
        
    },
    {
      
        
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: "comment",
       
    },   
)


module.exports = Comment;