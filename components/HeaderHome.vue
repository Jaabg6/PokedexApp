<template>
    <div class="bg-gray-800 pb-4  backdrop-blur-sm min-h-screen">
      <div class="grid grid-cols-5 grid-flow-row gap-4 min-h-screen">
        <!-- 1 -->
        <div class="col-span-5 md:col-span-3    self-center  rounded-lg bg-gray-900 mx-5 mt-32">
          

            <div class="mx-8">
              <div class="flex items-center justify-center ">
                
                  <img class=" mt-auto h-8 sm:h-12 w-auto mr-2" src="../static/pokeball.png" alt="Logo">
                <h1 class=" mt-5 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 text-center "> <span class="hidden sm:inline">Search in</span> Pokedex</h1>
                  <img class=" mt-auto h-8 sm:h-12 w-auto ml-2" src="../static/pokeball.png" alt="Logo">

              </div>
              <form @submit.prevent="getPokemon(searchThisPokemon)">
                <input v-model="searchThisPokemon" type="text" class="mt-5 py-3 pl-5 rounded bg-gray-600 w-full text-slate-200" placeholder="Search pokemon by Name or Number">
              </form>



        <!-- Section: Design Block -->
          <section class="mb-5 mt-5 text-gray-800 text-center md:text-left relative">

            <button @click="addToFavorites(pokemon)" class="absolute top-5 right-5 z-10">
              <!-- svg heart -->
              <svg class="h-10 w-10 fill-red-500 hover:fill-red-600 bg" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </button>
            <!-- popup left when click button favorites -->
            <div :class="[ addingToFav ? '' : 'hidden']" class=" absolute top-0 left-0 bg-gray-900/75 w-full h-full z-50">
              <div class="grid items-center justify-center h-full">

                    <div>
                      
                        <img class="w-full min-w-100" :src="pokemon.sprite" alt="Logo">
                      
                      <span class="text-white text-center text-xl col-span-10">
                        <p class="text-center font-black text-2xl md:text-3xl" v-if="errorFavorites === false">Added to Fav's</p>
                        <p class="text-center font-black text-2xl md:text-3xl" v-else>Already in Fav's</p>

                      </span>

                    </div>
  
              </div>
            </div>


            

            <div class="block rounded-lg shadow-lg py-4 bg-slate-200">
              <div class="flex flex-wrap items-center">
                <div class="grow-0 relative shrink-0 basis-auto flex justify-center max-h-40 w-full  sm:w-4/12">
                  <img v-if="pokemon.sprite != undefined" :src="pokemon.sprite" alt="Pokemon Picture png "
                    class="w-1/2 md:w-full " />
                  <h2 class=" absolute top-5 sm:-top-5 left-2 sm:left-auto sm:right-2 text-2xl md:text-4xl  font-bold text-gray-800">#{{ pokemon.id }}</h2>
                </div>
                
                
                <div class="grow-0 shrink-0 basis-auto w-full sm:w-8/12">
                  <div class="  md:px-12">
                    <h2 class="text-xl sm:text-4xl font-black mb-3 md:mb-6 pb-2"> {{ pokemon.name }}</h2>
                    <p class="font-bold pb-2 text-xs sm:text-lg">
                      {{ pokemon.description }}
                    </p>
                    
                  </div>
                </div>

                <!-- body poke card -->
                <div class="mx-5 w-full">


                 <!-- abilities  -->
                 <div class="grid grid-cols-3 gap-2 text-leftgrid-rows-1">

                  <div class=" col-span-3 md:col-span-2 grid grid-cols-4 grid-rows-3 gap-y-2">
                    <h4 class="text-xl sm:text-2xl font-black  mb-1 col-span-4 row-span-1">Abilities</h4>
                    <span class="bg-gray-900 text-slate-50 text-xs text-center py-2 sm:p-2 rounded-lg sm:font-sans sm:mono sm:uppercase mx-0.5 sm:mx-2 col-span-2 sm:row-span-1 self-center" v-for="ability in pokemon.abilities" :key="ability">{{ ability }}</span>
                  </div>

                  <div class="grid grid-cols-6 col-span-3 sm:col-span-1 sm:grid-rows-3 gap-y-2 w-full">
                    <h4 class="text-xl sm:text-2xl font-black  mb-1 text-left md:text-center col-span-6 row-span-1">Types</h4>
                    <span class=" text-slate-50 text-xs text-center py-2 sm:p-2 rounded-lg font-sans mono uppercase mx-2 col-span-3 sm:col-span-6 sm:row-span-1 self-center" :class="pokeType" v-for="pokeType in pokemon.types" :key="pokeType">{{ pokeType }}</span>
                  </div>

                 </div>

                    <!-- stats -->
                    <div class="flex flex-wrap mb-2">
                      <h4 class="text-xl sm:text-2xl font-black">Stats</h4>
                    </div>
                    <div class="grid grid-cols-9 grid-flow-row gap-2">
                      
                      <div v-for="stat in pokemon.stats" :key="stat" class="col-span-3 h-24 sm:h-auto">
                        <div class="flex items-center justify-center flex-col rounded-md p-2 text-white text-center h-24 sm:h-auto" :class="stat.name">
                          <p class="text-xs font-sans mono uppercase" >{{ stat.name }}</p>
                          <h4 class="text-2xl font-medium">{{ stat.base }}</h4>
                        </div>
                      </div>


                    </div> 


                </div>
        
              </div>
            </div>
          </section>
        <!-- Section: Design Block -->
                      
            </div>

        </div>
        <!-- 2 -->
        <div class="col-span-5 md:col-span-2  self-center  rounded-lg bg-gray-900 mx-5 md:32">
            <div class="mx-8">
              <div class="flex items-center justify-center ">
                
                  <!-- <img class=" mt-auto h-12 w-auto mr-2" src="../static/pokeball.png" alt="Logo"> -->
                <h1 class=" mt-5 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 text-center ">Evolutions</h1>
                  <!-- <img class=" mt-auto h-12 w-auto ml-2" src="../static/pokeball.png" alt="Logo"> -->

              </div>
              <!-- <input type="text" class="mt-5 py-3 pl-5 rounded bg-gray-600 w-full text-slate-200" placeholder="Search pokemon by Name or Number"> -->

        <!-- Section: Design Block -->
          <section class="mb-5 mt-5 text-gray-800 text-center md:text-left">
            <div class="block rounded-lg shadow-lg py-4 bg-slate-200">
              <div class="md:grid  md: md:grid-flow-row">

                  <div @click="getPokemon(pokemonChain.ActualEvolution.id)" class="w-full h-full flex items-center hover:bg-slate-300 hover:cursor-pointer" v-if="pokemonChain.ActualEvolution != undefined">
                    <img :src="pokemonChain.ActualEvolution.sprite" alt="CHANGE IT LATER"
                      class="w-1/2" />
                    <h2 class=" text-center font-bold text-gray-800 uppercase w-full ">{{pokemonChain.ActualEvolution.name}} #{{ pokemonChain.ActualEvolution.id }} </h2>
                  </div>
                  <div @click="getPokemon(pokemonChain.FirstEvolution.id)" class="w-full h-full flex items-center hover:bg-slate-300 hover:cursor-pointer" v-if="pokemonChain.FirstEvolution != undefined">
                    <img :src="pokemonChain.FirstEvolution.sprite" alt="CHANGE IT LATER"
                      class="w-1/2" />
                    <h2  class=" text-center font-bold text-gray-800 uppercase w-full ">{{pokemonChain.FirstEvolution.name}} #{{ pokemonChain.FirstEvolution.id }}</h2>
                  </div>
                   <div @click="getPokemon(pokemonChain.SecondEvolution.id)" class="w-full h-full flex items-center hover:bg-slate-300 hover:cursor-pointer" v-if="pokemonChain.SecondEvolution != undefined">
                    <img  :src="pokemonChain.SecondEvolution.sprite" alt="CHANGE IT LATER"
                      class="w-1/2" />
                    <h2 class=" text-center font-bold text-gray-800 uppercase w-full ">{{pokemonChain.SecondEvolution.name}} #{{ pokemonChain.SecondEvolution.id }}</h2>
                  </div>
                  <div @click="getPokemon(pokemonChain.ThirdEvolution.id)" class="w-full h-full flex items-center hover:bg-slate-300 hover:cursor-pointer" v-if="pokemonChain.ThirdEvolution != undefined">
                    <img :src="pokemonChain.ThirdEvolution.sprite" alt="CHANGE IT LATER"
                      class="w-1/2" />
                    <h2 class=" text-center font-bold text-gray-800 uppercase w-full ">{{pokemonChain.ThirdEvolution.name}} #{{ pokemonChain.ThirdEvolution.id }}</h2>
                  </div>


                  
                
                
             
                  <!-- <button class="text-gray-200 bg-gray-900 hover:bg-gray-700 hover:text-white py-5 rounded-md text-sm font-medium w-full">SEARCH</button> -->

                
                
              </div>
            </div>
          </section>
        <!-- Section: Design Block -->
                      
            </div>

        </div>

      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
 name: 'HeaderHome',
     head(){
        return {
            title: 'Pokedex App | Home',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: 'You can see a list of random pokemon with their evolutions, maybe you know some new'
                },
            ]
        }
    },
 data(){
  return {
    searchThisPokemon: '',
    addingToFav: false,
    // pokemonFavorites: [],
  }
 },
 mounted(){
   
   //  this.pokemonFavorites = JSON.parse(localStorage.getItem('Favs')) || []

    // if(this.pokemonFavorites.length > 0){
      this.$store.commit('fetchPokemonsFavorites')
    // }
    if(this.$store.state.pokemonFavorites.length != undefined ){
      this.getPokemon(this.PokemonsFavorites[0].id ) // get the first pokemon
    }
    else{
      this.getPokemon(1)
    }

 },
 methods:{
    getPokemon(numberORname){
      this.$store.dispatch('getPokemon', numberORname);
      this.$store.dispatch('getPokemonChain', numberORname);
      this.searchThisPokemon = '';
    },
    addToFavorites(pokemon){

      // console.log(pokemon);
       this.$store.commit('setPokemonsFavorites', pokemon);

      this.addingToFav = true;
      setTimeout(() => {
        this.addingToFav = false;
      }, 1000);
    }
 },
 computed: mapState({
      pokemon: state => state.pokemon,
      pokemonChain: state => state.pokemonChain,
      randomPokemon: state => state.randomPokemon,
      errorFavorites: state => state.errorFavorites,
      PokemonsFavorites: state => state.PokemonsFavorites,
    }),
 watch: {
  // pokemonFavorites: {
  //   handler(){
  //     localStorage.setItem('Favs', JSON.stringify(this.pokemonFavorites))
  //   },
  //   deep: true
  // }
 }

}
</script>

<style>
    .grass {
      background: #78c850

      }

    .water {
      background: #6890f0
      }

    .fire {
      background: #f08030
      }

    .electric {
      background: #f8d030
      }

    .normal {
      background: #a8a878
      }

    .poison {
      background: #a040a0
      }

    .ground {
      background: #e0c068
      }

    .flying {
      background: #a890f0
      }

    .psychic {
      background: #f85888
      }

    .bug {
      background: #a8b820
      }

    .rock {
      background: #b8a038
      }

    .ghost {
      background: #705898
      }

    .dragon {
      background: #7038f8
      }

    .dark {
      background: #705848
      }

    .steel {
      background: #b8b8d0
      }

    .ice {
      background: #98d8d8
      }

    .fighting {
      background: #c03028
      }

      /* stats */

      .hp {
        background: rgb(17,24,39);
background: -moz-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(16,185,129,1) 92%, rgba(17,24,39,1) 100%);
background: -webkit-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(16,185,129,1) 92%, rgba(17,24,39,1) 100%);
background: radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(16,185,129,1) 92%, rgba(17,24,39,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#111827",endColorstr="#111827",GradientType=1);
      }
      .attack {
        background: rgb(17,24,39);
background: -moz-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(159,18,57,1) 92%, rgba(17,24,39,1) 100%);
background: -webkit-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(159,18,57,1) 92%, rgba(17,24,39,1) 100%);
background: radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(159,18,57,1) 92%, rgba(17,24,39,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#111827",endColorstr="#111827",GradientType=1);
      }
      .defense {
        background: rgb(17,24,39);
background: -moz-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(104,144,240,1) 92%, rgba(17,24,39,1) 100%);
background: -webkit-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(104,144,240,1) 92%, rgba(17,24,39,1) 100%);
background: radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(104,144,240,1) 92%, rgba(17,24,39,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#111827",endColorstr="#111827",GradientType=1);
      }
      .special-attack {
        background: rgb(17,24,39);
background: -moz-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(248,208,48,1) 92%, rgba(17,24,39,1) 100%);
background: -webkit-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(248,208,48,1) 92%, rgba(17,24,39,1) 100%);
background: radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(248,208,48,1) 92%, rgba(17,24,39,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#111827",endColorstr="#111827",GradientType=1);
      }
      .special-defense {
        background: rgb(17,24,39);
background: -moz-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(240,128,48,1) 92%, rgba(17,24,39,1) 100%);
background: -webkit-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(240,128,48,1) 92%, rgba(17,24,39,1) 100%);
background: radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(240,128,48,1) 92%, rgba(17,24,39,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#111827",endColorstr="#111827",GradientType=1);
      }
      .speed {
background: rgb(17,24,39);
background: -moz-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(6,182,212,1) 92%, rgba(17,24,39,1) 100%);
background: -webkit-radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(6,182,212,1) 92%, rgba(17,24,39,1) 100%);
background: radial-gradient(circle, rgba(17,24,39,1) 66%, rgba(6,182,212,1) 92%, rgba(17,24,39,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#111827",endColorstr="#111827",GradientType=1);
      }

</style>