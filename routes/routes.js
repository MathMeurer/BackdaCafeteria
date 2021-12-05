module.exports = (app) =>{

     
    app.route("/categories")
    .get(app.api.categories.get)
    .post(app.api.categories.save)

    app.route("/categories/:id")
    .delete(app.api.categories.remove)

    app.route("/categories/:id")
    .get(app.api.categories.getById)
    .put(app.api.categories.save)
    .delete(app.api.categories.remove)

    app.route("/mesas")
    .get(app.api.mesas.get)
    .post(app.api.mesas.save)

    app.route("/mesas/:id")
    .delete(app.api.mesas.remove)

    app.route("/mesas/:id")
    .get(app.api.mesas.getById)
    .put(app.api.mesas.save)
    .delete(app.api.mesas.remove)

    app.route("/pedidos/")
    .get(app.api.pedidos.get)

    app.route("/pedidos/abrir")
    .post(app.api.pedidos.open)

    app.route("/pedidos/fechar")
    .post(app.api.pedidos.close)

    app.route("/pedidos/adicionar")
    .post(app.api.pedidos.addItem)
    
}
