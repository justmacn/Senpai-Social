// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Friends extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Friends.init(
  {
    id: //Uniqe identifier of each friendship
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id1: //The ID of the first user
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    user_id2: //The ID of the second user
        
    {  type: DataTypes.INTEGER,
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
    modelName: "friends",
  },
);

module.exports = Friends;
