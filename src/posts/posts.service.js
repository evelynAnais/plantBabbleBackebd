const knex = require('../db/connection');

function list() {
  return knex('posts').select('*')
}

function read(post_id) {
  return knex('posts').select('*').where({ post_id }).first();
}

function create(post) {
  return knex('posts')
    .insert(post)
    .returning('*')
    .then((createdPosts) => createdPosts[0]);
}

module.exports = {
  list,
  read,
  create,
}