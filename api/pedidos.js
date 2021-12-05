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

      const idMesa = req.body.mesa

      if(!idMesa){
        return res.status(400).json({error: 'mesa não informada'})
      }

      

      //verifica se existe pedido aberto para a mesa

      const pedido = await app
      .database("pedidos")
      .where({ idMesa, aberto: true})
      .first();

      if(!pedido) {
        return res.status(400).json({ error: `Não há pedidos abertos na mesa ${idMesa}`})
      }

      // busca todos os itens do pedido

      const itens = await app
      .database("pedidoItem")
      .where({ idPedido: pedido.id});
      
      // faz um resumo dos itens pedidos na mesa
      const resumo = itens.reduce((total , item)=>{
        const itemExists = total.find((totalItem)=>totalItem.idItem === item.idItem);
        if(itemExists){
          itemExists.quantidade++;
          return [...total];
        }
        return [...total , {idItem: item.idItem, quantidade: 1}]
      },[])
      
      await app
      .database("pedidos")
      .update({aberto: false})
      .where({ idMesa , aberto: true})
      .then ((resumoPedido) => res.status(200).json({
          message: 'pedido fechado',
          idMesa, 
          valorTotal: pedido.valorTotal,
          resumo
        }))
      .catch((err) => res.status(500).send(err))
    
    }

    const addItem = async (req,res) => {

      const idMesa = req.body.mesa
      const idItem = req.body.item

      if(!idMesa){
        return res.status(400).json({error: 'mesa não informada'})
      }

      if(!idItem){
        return res.status(400).json({error: 'item não informado'})
      }

      // verifica se há pedidos abertos na mesa
      const pedido = await app
      .database("pedidos")
      .where({ idMesa, aberto: true})
      .first();

      if(!pedido) {
        return res.status(400).json({ error: `Não há pedidos abertos na mesa ${idMesa}`})
      }

      // verifica se o item existe no banco de dados
      const item = await app
      .database("categories")
      .where({ id:idItem})
      .first();

      if(!item) {
        return res.status(400).json({ error: `O item ${idItem} não existe na base dados.` })
      }

      //atualiza o valor total do pedido

      const pedidoAtualizado = {
        valorTotal: pedido.valorTotal + item.valor
      }

      await app
      .database("pedidos")
      .update(pedidoAtualizado)
      .where({ id: pedido.id })
      .catch((err) => res.status(500).send(err))


      // adiciona o item ao pedido

      const pedidoItem = {
        idPedido: pedido.id,
        idItem
      }

      await app
      .database("pedidoItem")
      .insert(pedidoItem)
      .then ((_) => res.status(200).json({message: "item adicionado ao pedido"}))
      .catch((err) => res.status(500).send(err))
      
    }


    return { get, open, close, addItem }
}