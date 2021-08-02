
exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('post_id').primary();
    table.string('title', 40).notNullable();
    table.string('content', 400).notNullable();
    table.string('image');
    table.integer('user_id').unsigned().notNullable();
    table
      .foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamps(true, true);  
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};