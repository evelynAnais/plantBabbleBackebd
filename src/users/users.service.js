const knex = require('../db/connection');

function read(user_id) {
  return knex('users').select('*').where({ user_id }).first();
}

module.exports = {
  read,
}