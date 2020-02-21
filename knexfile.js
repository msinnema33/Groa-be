// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      filename: './dev.pgsql'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: 'process.env.PGDB',
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds'
      },
    }
}