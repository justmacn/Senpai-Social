// Third-party Modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Local Modules
const sequelize = require("../config/connection");

class Comments extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Comments.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        user_id: {
            //user who made the comment
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlphanumeric: true,
            max: 250, 
        },
        
    },
    {
      
        
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: "comments",
       
    },   
)