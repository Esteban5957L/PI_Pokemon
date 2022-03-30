const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
    try {
      //?limit=70 para que tenga un limite
      const arrPokemon = []; // me creo un array donde pushear data pokemon
      const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon"); // me guardo los primero 20
      const dataPokemon = pokemon.data.results.map(el => axios.get(el.url)); // accedo al url de cada pokemon
      const otrosPokemon = await axios.get(pokemon.data.next) // me guardo los otros 20 para el total de 40 (readme)
      const dataOtros = otrosPokemon.data.results.map(el => axios.get(el.url)) // accedo al url de cada pokemon
      const allPokemon = [...dataPokemon,...dataOtros] // concateno ambas info para tenerlos juntos
    
      const result = await Promise.all(allPokemon).then(el => { 
          el.map(poke => { // mapeo para solo traer la info que me interesa
              arrPokemon.push({ // pusheo la data al array creado
                  id: poke.data.id,
                  name: poke.data.name,
                  hp: poke.data.stats[0].base_stat,
                  attack: poke.data.stats[1].base_stat,
                  defense: poke.data.stats[2].base_stat,
                  speed: poke.data.stats[5].base_stat,
                  height: poke.data.height,
                  weight: poke.data.weight,
                  types: poke.data.types.map(el => el.type),
                  image: poke.data.sprites.front_default,
                  createdInDb : false
              })
          })
          return arrPokemon;
      })  
      return result;
    } catch(error) {
        console.log(error)
    }  
}
        

const getPokesDbInfo = async () => {
    try {
      const pokemons = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ['name'],
          //through te trae todos los atributos seleccionados
          through: {
            attributes: [],
          },
        },
      });
      
      return pokemons;

    } catch (error) {
      console.log(error);
    }
  };

const getAllPokemons = async ()=>{
    const apiPokemonsInfo = await getApiInfo();
    const dbPokemonsInfo = await getPokesDbInfo();
    //return apiPokemonsInfo.concat(dbPokemonsInfo);
    const infoTotal = [...apiPokemonsInfo,...dbPokemonsInfo];
    return infoTotal;
}

module.exports = {getApiInfo, getPokesDbInfo, getAllPokemons }