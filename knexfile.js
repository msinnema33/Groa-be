require("dotenv").config();

const dbConnection = process.env.DATABASE_URL;

const dbObj = {
  client: "pg",
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
    ...dbObj
  },
  production: {
    ...dbObj
  }
};
