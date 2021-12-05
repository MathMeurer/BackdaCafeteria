module.exports = (app) =>{

    const get = async (req, res) =>{
      const pedidos = await app.database("pedidos").select("*");
      return res.json(pedidos);
    }

    const getById = async (req, res) =>{
      const idPedido = req.params.id;
      const pedidoExists = await app.database("pedidos").where({id: idPedido}).first();
      
      if(!pedidoExists){
          return res.status(400).json({ error: "pedidoExists nao encontrado"});
      }

      const pedido = await app.database("pedido").where({ id: idPedido }).first();
  
      return res.json(pedido);
    }

    const open = async (req, res) =>{

      const mesa = req.body.mesa;

      if(!mesa){
        return res.status(400).json({error: 'mesa não informada'})
      }

      // verifica se há pedidos abertos na mesa
      const pedidoExists = await app
      .database("pedidos")
      .where({ idMesa: mesa, aberto: true})
      .first();

      if(pedidoExists) {
        return res.status(400).json({ error: "o último pedido ainda não foi fechado"})
      }

      const pedido = {
        idMesa: mesa,
        aberto: true,
        valorTotal: 0
      }

      await app
      .database("pedidos")
      .insert(pedido)
      .then ((_) => res.status(200).send())
      .catch((err) => res.status(500).send(err))
       
    }

    const close = async (req,res) => {

      const mesa = req.body.mesa

      if(!mesa){
        return res.status(400).json({error: 'mesa não informada'})
      }

      const pedido = {
        aberto: false
      }

      await app
      .database("pedidos")
      .update(pedido)
      .where({ idMesa: mesa , aberto: true})
      .then ((resumoPedido) => res.status(200).json({
          message: 'pedido fechado',
        }))
      .catch((err) => res.status(500).send(err))
    
    }

    

    

    return { get, open, close }
}