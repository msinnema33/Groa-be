require("dotenv").config();

const dbConnection = process.env.DATABASE_URL;

const dbObj = {
  client: "postgresql",
  connection: dbConnection,
  migrations: {
    directory: "./migrations"
  },
  seeds: {
    directory: "./seeds"
  },
  pool: {
    min: 2,
    max: 10
  }
};
// The different DB environment setups
module.exports = {
  development: {
    ...dbObj
  },
  testing: {
    ...dbObj,
    connection: process.env.TESTING_DB_URL
  },
  production: {
    ...dbObj
  }
};
