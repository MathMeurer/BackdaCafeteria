module.exports = (app) =>{

    const get = async (req, res) =>{
        
        const mesas = await app.database("mesas").select("*");
    
        return res.json(mesas);
    }

    const getById = async (req, res) =>{

        const idMesas = req.params.id;

        const mesasExists = await app.database("mesas").where({id: idMesas}).first();

        if(!mesasExists){
            return res.status(400).json({ error: "mesa nao encontrada"});
        }

        const mesas = await app.database("mesas").where({ id: idMesas }).first();
   
        return res.json(mesas);
    }

    const save = async (req, res) => {

     const mesas = { ... req.body };

      if(req.params.id) {
        mesas.id = req.params.id;
     }

      if (!mesas.name) {
        return res.status(400).json ({ error: "Nome da mesa nao informado" });
      }

     const mesasExists = await app
     .database("mesas")
     .where({ name: mesas.name})
     .first();

     if(mesasExists) {
        return res.status(400).json({ error: "mesa ja existe"})
      }


      if(req.params.id){
          
        await app
        .database("mesas")
        .update(mesas)
        .where({ id: mesas.id })
        .then ((_) => res.status(200).send())
        .catch((err) => res.status(500).send(err))
      } else {
      
   await app
     .database("mesas")
     .insert(mesas)
     .then ((_) => res.status(200).send())
     .catch((err) => res.status(500).send(err))
      }

    return res.json(mesas)
    }

    const remove = async (req, res) => {

        const idMesas = req.params.id;

        if(!idMesas){
            return res.status(400).json({ error: "id da mesa nao informado"});
        }

        const mesasExists = await app.database("mesas").where({id: idMesas}).first();

        if(!mesasExists){
            return res.status(400).json({ error: "mesa nao encontrada"});
        }

       await  app.database("mesas").where({id: idMesas }).del();

        res.status(204).send();
    }
    return { save, getById, get, remove }
}