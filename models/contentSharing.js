// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class ContentSharing extends Model {
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
   }
}

ContentSharing.init(
//for sharing anime fan art
    {
      art_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        //ID of user who uploaded art
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     image_url: {
        type: DataTypes.STRING,
      }, 
     description: {
        type: DataTypes.TEXT,
        allowNull: false,
        isAlphanumeric: true, 
      },
     anime_id: {
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

module.exports = ContentSharing;