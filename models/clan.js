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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
      }, // Closed the validate object here
    },
    // anime_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "anime",
    //     key: "id",
    //   }
    // },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 300],
        isAlphanumeric: true,
      },
    }, 
    // Holds ID of clan members  
    members_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
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
  },
);

module.exports = Clan;
