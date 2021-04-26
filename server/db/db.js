const { Sequelize } = require("sequelize");
const config = { logging: false };

// Handles the error that prof discusses in this video: https://youtu.be/lwAJPU23kok?t=2477
if (process.env.SSL) {
    config.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const db = new Sequelize(
    process.env.DATABASE_URL || "postgres://localhost:5432/graceShopper",
    config,
);

module.exports = db;
