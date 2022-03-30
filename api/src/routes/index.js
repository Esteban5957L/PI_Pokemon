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


// GET /pokemons:
router.get('/pokemons', async (req, res) =>{
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

/*router.post('/pokemons', async(req, res) => {
    const {id,img,name,hp,attack,defense,speed,height,weight,types} = req.body
    const pokemonCreate = await Pokemon.create({
        id,
        img,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types, 
    })
}) */




//GET /pokemons/{idPokemon}:
router.get('/pokemons/:idPokemon', async(req, res) => {
    const {id} = req.params;
    const TotalPoket = getAllPokemons();
    if(id){
        const pokemonId = await TotalPoket.filter(poke => poke.id == id);
        if(pokemonId.length){
            try{
                return res.status(200).send(pokemonId)
            } catch(error){
                res.send(error)
            }
        }
    }
})




module.exports = router;

