// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Anime extends Model {}

Anime.init(
    {
       animeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
       title: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 50,
        isAlphanumeric: true,
        },
       description: {
        type: DataTypes.TEXT,
        allowNull: false,
        max: 300, 
        isAlphanumeric: true,
        },
       genre: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 20,
        isAlphanumeric: true,
        }, 
       episodes: {
        type: DataTypes.ARRAY,
        //List of episode IDs of an anime
        },
       reviews: {
        type: DataTypes.ARRAY,
        //List of review IDs related to Anime
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "anime", 
    }
);

module.exports = anime;