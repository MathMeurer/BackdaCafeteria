
exports.up = function(knex) {
    return knex.schema.createTable("pedidoItem", (table) =>{
        table.int ("idPedido").notNull();
        table.int ("idItem").notNull();
    })
};

exports.down = function(knex) {

  return knex.schema.dropTable("pedidoItem",);
  
};
