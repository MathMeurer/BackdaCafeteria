
exports.up = function(knex) {
    return knex.schema.createTable("pedidoItem", (table) =>{
        table.integer ("idPedido").notNull();
        table.integer ("idItem").notNull();
    })
};

exports.down = function(knex) {

  return knex.schema.dropTable("pedidoItem",);
  
};
