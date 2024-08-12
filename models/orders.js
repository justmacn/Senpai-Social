// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Orders extends Model {
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
   }
}

Orders.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
           },
        buyer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
          },
          item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "items",
                key: "id",
            },
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          total_price: {
           type:DataTypes.DECIMAL,
           allowNull: false,
          },
          order_status: {
            type: DataTypes.STRING,
            allowNull: false, 
          },
          created_at: {
            type: DataTypes.DATE,
          },
         },
         {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: "orders", 
         },
);


module.exports = Orders;