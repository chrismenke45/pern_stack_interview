const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    database: process.env.DB_NAME,
    port: 5432
})

module.exports = pool;