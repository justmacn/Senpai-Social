// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Transactions extends Model {
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
   }
}

Transactions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
                key: "id",
             },
            },
        buyer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50],
            },
           },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50], 
            },
           },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "transactions" 
    },
);


module.exports = Transactions; 