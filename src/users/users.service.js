const knex = require('../db/connection');

function read(user_id) {
  return knex('users').select('*').where({ user_id }).first();
}

function create(user) {
  return knex('users')
    .insert(user)
    .returning('*')
    .then((createdUsers) => createdUsers[0]);
}

module.exports = {
  read,
  create,
}