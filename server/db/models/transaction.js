const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
    type: {
        type: Sequelize.STRING,
    },
    ticker: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
        },
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    }
});

module.exports = Transaction;