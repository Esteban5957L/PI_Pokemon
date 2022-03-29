const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
    try {
        const firstApiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const secondApiUrl = await axios.get(firstApiUrl.data.next); 

        const allPokemons = firstApiUrl.data.results.concat(secondApiUrl.data.results);

        const PokemonProps = await Promise.all(
            allPokemons.map(async ele=>{
                const poke = await axios.get(ele.url);
                return{
                    id: poke.data.id,
                    img: poke.data.sprites.other.home.front_default,
                    name: poke.data.name,
                    hp: poke.data.stats[0].base_stat,
                    attack: poke.data.stats[1].base_stat,
                    defense: poke.data.stats[2].base_stat,
                    speed: poke.data.stats[5].base_stat,
                    height: poke.data.height,
                    weight: poke.data.weight,
                    types: poke.data.types.map(ele=> ele.type.name)
                }
            }) 
        ) 
        return PokemonProps;
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
    return [...apiPokemonsInfo , ...dbPokemonsInfo];
    /* const infoTotal = apiPokemonsInfo.concat(dbPokemonsInfo);
    return infoTotal */
}

module.exports = {getApiInfo, getPokesDbInfo, getAllPokemons }