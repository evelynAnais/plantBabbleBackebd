const path = require('path');
require('dotenv').config();
const { DATABASE_URL } = process.env;

module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },

    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: {
      database: DATABASE_URL,
      user:     'username',
      password: 'password'
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations'),
    },
  },
};
