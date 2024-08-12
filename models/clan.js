// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Clan extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Clan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    clan_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
    },
  },
    anime_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 300],
        isAlphanumeric: true,
     },
    }, 
    clan_members: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isAlphanumeric: true,
    },
  },
  //holds ID of clan members  
   clan_member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
     },

    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "clan",
  }
);



module.exports = Clan;