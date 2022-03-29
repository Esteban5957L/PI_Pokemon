const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//importamos axios
const axios = require ('axios')

const {Pokemon, Type} = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {getApiInfo, getPokesDbInfo, getAllPokemons } = require('../components/utils')


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

module.exports = router;

