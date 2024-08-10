// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class SocialConnection extends Model {}

contentSharing.init(
//for sharing anime fan art
    {
      artID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        //ID of user who uploaded art
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
     imageUrl: {
        type: DataTypes.STRING,
      }, 
     description: {
        type: DataTypes.TEXT,
        allowNull: false,
        isAlphanumeric: true, 
      },
     animeId: {
        //id of related Anime, if applicable
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
    },
    {
        
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: "conentSharing",
          
    }
);

module.exports = userPosts;