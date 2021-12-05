
exports.up = function(knex) {
    return knex.schema.createTable("pedidos", (table) =>{
        table.increments("id").primary();
        table.string ("idMesa").notNull();
        table.float ("valorTotal").notNull();
    })
};

exports.down = function(knex) {

  return knex.schema.dropTable("pedidos",);
  
};
