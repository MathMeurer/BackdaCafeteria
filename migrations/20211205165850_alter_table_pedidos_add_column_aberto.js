
exports.up = function(knex) {
  return knex.schema.table('pedidos', table => {
    table.boolean('aberto');
  })
};

exports.down = function(knex) {
  return knex.schema.table('pedidos', table => {
    table.dropColumn('aberto');
  })
};
