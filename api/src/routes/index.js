const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//importamos axios
const axios = require ('axios')
const {Pokemon, Type} = require('../db.js')
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {getApiInfo, getPokesDbInfo, getAllPokemons } = require('../controllers/utils')

router.get('/pokemons', async (req, res) => {
    try {
    const name = req.query.name;
    let pokeTotal = await getAllPokemons();
    if (name) {
        let pokeName = await pokeTotal.filter(el => el.name.toLowerCase() === name.toLowerCase());
        pokeName.length ?
        res.status(200).send(pokeName) :
        res.status(404).send('Pokemon not found (try to write the exact name)')
    } else {
        //console.log('all pokemons: ', pokeTotal)
        res.status(200).send(pokeTotal)
    }
    } catch(e) {
        console.log(e)
    }  
});

router.get("/types", async (req, res) => {
    try {
      const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
      const types = apiTypes.data.results.map((e) => e.name);
      types.map((ele) => {
        Type.findOrCreate({
          where: { name: ele },
        });
      });
      const allTypes = await Type.findAll();
      res.status(200).send(allTypes);
    } catch (error) {
        console.log('pepe')
      console.log(error);
    }
});

router.post('/pokemons', async (req, res)=>{
    const {
        id, 
        name, 
        hp,   
        attack, 
        defense, 
        speed, 
        weight, 
        height,
        types, 
        img, 
        createdInDb
    } = req.body;
    //res.send(img, name, types, id, hp, attack, defense, speed, weight, height, createdInDb)
    try{
        const newPokemon = await Pokemon.create({
            id, 
            name, 
            hp,   
            attack, 
            defense, 
            speed, 
            weight, 
            height, 
            img, 
            createdInDb
        });
    
        const typeDb = await Type.findAll({
            where: {name: types}
        });
        
        await newPokemon.addType(typeDb);
        res.send('newPokemon');
    } catch (error){
        res.send(error);
    }
    
})
router.get('/pokemons/:id', async (req, res) => {
    try {
    const id = req.params.id;
    let pokeTotal = await getAllPokemons();
        if (id) {
            let pokeId = pokeTotal.filter(p => p.id == id)
            pokeId.length ?
            res.status(200).json(pokeId) :
            res.status(404).send('Pokemon not found')
        }
    }
    catch(e) {
        console.log(e)
    }
});

module.exports = router;