// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Anime extends Model {
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
   }
}

Anime.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
       title: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 50],
        },
       description: {
        type: DataTypes.TEXT,
        allowNull: false,
        max: 300, 
        },
       genre: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 20],
        validate: {
            isAlphanumeric: true,
        }, 
       },
       episodes: {
        type: DataTypes.INTEGER,
        //List of episode IDs of an anime
        allowNull: false,
        
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "anime", 
    }
);

module.exports = Anime;