
exports.up = function(knex) {
  return knex.schema.createTable('reactions', (table) => {
    table.boolean('love').notNullable();
    table.boolean('adore').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table
      .foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('post_id').unsigned().notNullable();
    table
      .foreign('post_id')
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE');
    
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reactions');
};