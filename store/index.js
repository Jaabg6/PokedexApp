const axios = require('axios');

export const state = () => ({
    pokemon : [],
    pokemonChain : [],
    randomPokemon : [],
    PokemonsFavorites : [],
    errorFavorites : false,
})

//mutations
export const mutations = {
    setPokemons(state, pokemons) {
        state.pokemon = pokemons;
    },
    setPokemonsChain(state, pokemons) {
        state.pokemonChain = pokemons;
    },
    setRandomPokemon(state, pokemons) {
        state.pokemon = pokemons;
    },
    setPokemonsFavorites(state, pokemons) {

        const AlreadyExist = state.PokemonsFavorites.find(pokemon => pokemon.id === pokemons.id);

        if(AlreadyExist) {
            state.errorFavorites = true;
            this.dispatch('setErrorSolvet'); //action
        }
        else{
            state.PokemonsFavorites.push(state.pokemon);
            localStorage.setItem('Favs', JSON.stringify(state.PokemonsFavorites))
        }

    },
    setErrorSolvet(state) {
        state.errorFavorites = false;
    },
    fetchPokemonsFavorites(state) {
        
        state.PokemonsFavorites = JSON.parse(localStorage.getItem('Favs')) || [];
    },
    removeFromFavorites(state, pokemon) {
        state.PokemonsFavorites = state.PokemonsFavorites.filter(p => p.name !== pokemon.name);
        localStorage.setItem('Favs', JSON.stringify(state.PokemonsFavorites))
    }
}

export const actions = {
    
    async getPokemon({commit} , data) {
        
        let pokemonDescription = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + data);  
        let pokemonResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/' + data);  
        let pokemonData = pokemonResponse.data
        let description = pokemonDescription.data.flavor_text_entries[1].flavor_text.replace(/[^a-zA-Z.é' ]/g, " ");

        // get all habilites of the pokemon
        let abilities = [];
        for (let i = 0; i < pokemonData.abilities.length; i++) {
            abilities.push(pokemonData.abilities[i].ability.name);
        }

        // get all types of the pokemon
        let types = [];
        for (let i = 0; i < pokemonData.types.length; i++) {
            types.push(pokemonData.types[i].type.name);
        }

        // get all stats of the pokemon
        let stats = [];
        for (let i = 0; i < pokemonData.stats.length; i++) {
            stats.push( {'name' : pokemonData.stats[i].stat.name, 'base' : pokemonData.stats[i].base_stat});
        }

        
        commit('setPokemons', { 'name' : pokemonData.name
                                , 'id' : pokemonData.id
                                , 'abilities' : abilities
                                , 'description' : description ? description : 'Shh! there are no words to describe it...'
                                , 'types' : types
                                , 'stats' : stats
                                , 'weight' : pokemonData.weight
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonData.id + '.png'
                                }
        );
    
    },
    async getPokemonChain({commit} , data) {

        const responseChain = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + data);

        const response = await axios.get(responseChain.data.evolution_chain.url);
        

        const actualEvolution = response.data.chain.species;
        // get previous evolution
        
        
        if(response.data.chain.evolves_to.length === 0){
            commit('setPokemonsChain', {
                'ActualEvolution' : {'name' : actualEvolution.name + ' (No Evolution)' 
                                , 'url' : actualEvolution.url
                                , 'id' : getNumbers(actualEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(actualEvolution.url) + '.png'
                                }
            });
            return
        }

        
        //if this is the last evolution of the chain then return the pokemon
        if (response.data.chain.evolves_to[0].evolves_to.length == 0) {
            let previousEvolution = response.data.chain.evolves_to[0].species;
            commit('setPokemonsChain', {
                'ActualEvolution' : {'name' : actualEvolution.name
                                , 'url' : actualEvolution.url
                                , 'id' : getNumbers(actualEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(actualEvolution.url) + '.png'
                                },
                'FirstEvolution' : {'name' : previousEvolution.name
                                , 'url' : previousEvolution.url
                                , 'id' : getNumbers(previousEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(previousEvolution.url) + '.png'
                                }
            });
        }
        //if this is not the last evolution of the chain then get the next evolution
        else {
            let nextEvolution = response.data.chain.evolves_to[0].evolves_to[0].species
            let previousEvolution = response.data.chain.evolves_to[0].species;

            commit('setPokemonsChain', {
                'ActualEvolution' : {'name' : actualEvolution.name
                                , 'url' : actualEvolution.url
                                , 'id' : getNumbers(actualEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(actualEvolution.url) + '.png'
                                },

                'FirstEvolution' : {'name' : previousEvolution.name
                                , 'url' : previousEvolution.url
                                , 'id' : getNumbers(previousEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(previousEvolution.url) + '.png'
                                },
                'SecondEvolution' : {'name' : nextEvolution.name ? nextEvolution.name : 'No Evolution'
                                , 'url' : nextEvolution.url ? nextEvolution.url : 'No Evolution'
                                , 'id' : getNumbers(nextEvolution.url) ? getNumbers(nextEvolution.url) : 'No Evolution'
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(nextEvolution.url) + '.png'
                                }
            });
        }

        if(response.data.chain.evolves_to.length > 2){
            let FirstEvolution = response.data.chain.evolves_to[0].species
            let secondEvolution = response.data.chain.evolves_to[1].species
            let thirdEvolution = response.data.chain.evolves_to[2].species

            commit('setPokemonsChain', {
                'ActualEvolution' : {'name' : actualEvolution.name
                                , 'url' : actualEvolution.url
                                , 'id' : getNumbers(actualEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(actualEvolution.url) + '.png'
                                },

                'FirstEvolution' : {'name' : FirstEvolution.name
                                , 'url' : FirstEvolution.url
                                , 'id' : getNumbers(FirstEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(FirstEvolution.url) + '.png'
                                },
                'SecondEvolution' : {'name' : secondEvolution.name
                                , 'url' : secondEvolution.url
                                , 'id' : getNumbers(secondEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(secondEvolution.url) + '.png'
                                },
                'ThirdEvolution' : {'name' : thirdEvolution.name
                                , 'url' : thirdEvolution.url
                                , 'id' : getNumbers(thirdEvolution.url)
                                , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + getNumbers(thirdEvolution.url) + '.png'
                                }
            });
        }
        

    },
    async getRandomPokemon({commit, dispatch} , data) {

        const nRandom = randomNumber();
        
        let pokemonDescription = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nRandom);  
        let pokemonResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/' + nRandom);  
        let pokemonData = pokemonResponse.data
        let description = pokemonDescription.data.flavor_text_entries[1].flavor_text.replace(/[^a-zA-Z.é' ]/g, " ");
        
        // get chain
        dispatch('getPokemonChain' , nRandom)
        
        // get all habilites of the pokemon
        let abilities = [];
        for (let i = 0; i < pokemonData.abilities.length; i++) {
            abilities.push(pokemonData.abilities[i].ability.name);
        }

        // get all types of the pokemon
        let types = [];
        for (let i = 0; i < pokemonData.types.length; i++) {
            types.push(pokemonData.types[i].type.name);
        }

        // get all stats of the pokemon
        let stats = [];
        for (let i = 0; i < pokemonData.stats.length; i++) {
            stats.push( {'name' : pokemonData.stats[i].stat.name, 'base' : pokemonData.stats[i].base_stat});
        }
        


        commit('setRandomPokemon', { 'name' : pokemonData.name
            , 'id' : pokemonData.id
            , 'abilities' : abilities
            , 'description' : description ? description : 'Shh! there are no words to describe it...'
            , 'types' : types
            , 'stats' : stats
            , 'weight' : pokemonData.weight
            , 'sprite' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonData.id + '.png'
            }
        );
    },
    async setErrorSolvet({commit} , data) {
        setTimeout(() => {
            commit('setErrorSolvet', data);
        }, 1000);
            
    }
    

}

function randomNumber() {
    return Math.floor(Math.random() * (800 - 1 + 1)) + 1
}

//return numbers in the string
function getNumbers(str) {
    return str.match(/\d+/g).map(Number).pop();
}










