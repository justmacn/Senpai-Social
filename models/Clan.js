// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Clan extends Model {}

Clan.init(
    {
    clan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      },
    clan_name: {
      type:DataTypes.STRING,
      allowNull: false,
      max: 50, 
      isAlphanumeric: true,
     },
    
     anime_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      max: 300, 
      isAlphanumeric: true,
        },
    clan_members: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 50, 
      isAlphanumeric: true,
       }, 
    clan_member_id: 
    //holds ID of clan members
       {
        type: DataTypes.INTEGER,
        allowNull: false,
        //reference?
       },

    


    }
)