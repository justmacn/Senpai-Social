// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Items extends Model {
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
}

Items.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      seller_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "user",
            key: "id",
         }
      },
      item_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            isAlphanumeric: true,
            len: [1, 100],
         },
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
         validate: {
            isAlphanumeric: true,
            len: [1, 500],
         },
      },
      price: {
         type: DataTypes.DECIMAL,
         allowNull: false,
      },
      category: {
         type: DataTypes.STRING,
         allowNull: true,
         validate: {
            len: [1, 50],
         },
      },
      image: {
         type: DataTypes.ARRAY(DataTypes.STRING),
      },
   },
   {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: "items",
   },
);

module.exports = Items;