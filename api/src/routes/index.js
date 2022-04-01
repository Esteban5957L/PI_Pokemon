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

router.post('/pokemons', async (req, res) => {
    try {
        let {
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            types,
            createdInDb
        } = req.body

        let newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types,
            image: image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png",
            createdInDb
        })

        let typesDb = await Type.findAll({
            where: {name: types}
        });

        newPokemon.addType(typesDb); // metodo sequelize

        res.status(200).send('¡Pokemon Created!');
        } catch(e) {
        console.log(e)
    }  
});

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


/* router.get('/types', async (req, res) => {
    try {
    let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    let types = typesApi.data.results.map(p => p.name);
    //console.log('ALL TYPES: ', types);
    types.forEach(t => {
        Type.findOrCreate({
            where: { name: t }
        })
    })
    let allTypes = await Type.findAll();
    res.status(200).send(allTypes);
} catch(e) {
    console.log(e)
}  
}); */
router.get("/types", async (req, res) => {
    try {
      const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
      const types = apiTypes.data.results.map((element) => element.name);
      types.map((element) => {
        Type.findOrCreate({
          where: { name: element },
        });
      });
      const allTypes = await Type.findAll();
      res.status(200).send(allTypes);
    } catch (error) {
        console.log('pepe')
      console.log(error);
    }
});




module.exports = router;

// GET /pokemons:
/* router.get('/pokemons', async (req, res) =>{
    const name = req.query.name;
    let pokeTotals = await getAllPokemons();
    if(name){
        let pokeName = await pokeTotals.filter( el => el.name.toLowerCase() === name.toLowerCase())
        pokeName.length ? 
        res.status(200).send(pokeName) : 
        res.status(404).send('No esta el personaje')
    }else{
        res.status(200).send(pokeTotals)
    }
})

router.get("/types", async (req, res) => {
    try {
      const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
      const types = apiTypes.data.results.map((element) => element.name);
      types.map((element) => {
        Type.findOrCreate({
          where: { name: element },
        });
      });
      const allTypes = await Type.findAll();
      res.status(200).send(allTypes);
    } catch (error) {
      console.log(error);
    }
});

router.post('/pokemons', async(req, res) => {
    try {
        const {id,img,name,hp,attack,defense,speed,height,weight,types} = req.body
        const pokemonCreate = await Pokemon.create({
            id,
            img: img ? img : "https://cdn.alfabetajuega.com/alfabetajuega/2020/02/egg.png?width=800",
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types, 
        })

        let typesDb = await Type.findAll({
            where: {name: types}
        });

        pokemonCreate.addType(typesDb); // metodo sequelize
        res.status(200).send('¡Pokemon Created!');
    } catch (error) {
        console.log(error);
      }
    
});


//GET /pokemons/{idPokemon}:
router.get('/pokemons/:idPokemon', async(req, res) => {
    try {
        const {id} = req.params;
        const TotalPoket = await getAllPokemons();
        if(id){
            const pokemonId = TotalPoket.filter(poke => poke.id == id);
            pokemonId.length?
            res.status(200).json(pokemonId) :
            res.status(404).send('Pokemon not found')
            }
    } catch (error) {
        console.log(error);
      }
});

module.exports = router; */

