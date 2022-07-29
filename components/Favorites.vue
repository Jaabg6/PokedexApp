<template>
    <div class="bg-gradient-to-b from-gray-800 to-gray-500  shadow-gray-800/50 pb-4  backdrop-blur-sm min-h-screen">
        <h2 class="pt-50 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 text-center  py-24">Favorites</h2>

      
      
<div class=" relative shadow-md sm:rounded-lg mx-5 ">
    <div class="grid grid-flow-row w-full sm:grid-flow-col sm:justify-between items-center pb-4 mx-5 ">
        <div class="">
            <button @click="activeDropdownFilter()" id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="mb-2 sm:mb-0 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                
                By Types
                <svg class="ml-2 w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownRadio" :class="[showFilter ? '' : 'hidden']"  class=" z-50 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 46px);" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                    
                    <li class="rounded-md bg-gray-900 text-slate-200" @click="defaultType()">
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-0" type="radio" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="'filter-radio-example-0" class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">default</label>
                        </div>
                    </li>
                    
                    <li v-for="(pokeType, index) in this.types()" :key="pokeType" :class="pokeType" class="rounded-md" @click="filterPokemonType()">
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input v-model="pokeTypeSearched" :id="'filter-radio-example-'+index +1" type="radio" :value="pokeType" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label :for="'filter-radio-example-'+index +1" class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{ pokeType }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mr-10">
            <div class="flex absolute inset-y-0 left-2 items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>

            <form @submit.prevent="filterPokemon(favoriteSearched)">
                <input v-model="favoriteSearched" type="text" id="table-search" class="block p-2 pl-10 w-full sm:w-80 text-sm  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search in Favorites">
            </form>

        </div>
    </div>

</div>



      <div class="grid grid-cols-12 gap-y-4 w-full  place-items-center">
          <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 relative list" v-for="fav in this.filterPokemon() || filterPokemonType()" :key="fav">

                
    
    
                <!-- svg heart broke -->
                <button @click="removeFromFavorites(fav)" class="z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="z-20 absolute top-10 right-5 h-10 w-10 fill-red-500 hover:fill-red-600" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /> <path d="M12 7l-2 4l4 3l-2 4v3" /> </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="z-20 hover:invisible transition duration-150 ease-in-out absolute top-10 right-5  h-10 w-10  fill-red-500 " width="24" height="24" viewBox="0 0 24 24"  > <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /> <path d="M12 7l-2 4l4 3l-2 4v3" /> </svg>
    
                </button>
    
                <div class="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative">
                    
                        <img @click="ShowDetailFav(fav.id)" class=" focus:outline-none  hover:scale-125 overflow-hidden cursor-pointer p-8 rounded-t-lg h-64 mx-auto" :src="fav.sprite" alt="product image">
                        
                        <div @click="HiddeDetailFav()" v-if="modalDetailSelect === fav.id" class=" focus:outline-none  absolute top-0 left-0 bg-gray-900/75 w-full h-full z-50">
    
                            <button @click="getPokemon(fav.id)" class=" focus:outline-none  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-white text-slate-200 px-5 rounded-sm text-2xl font-black" >Details</button>
                        
                        </div>
    
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">#{{ fav.id }}</h5>
                        </a>
                        <div class="flex items-start w-full mt-2.5 mb-5">
                            <span :class="pokeType" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded" v-for="pokeType in fav.types" :key="pokeType">{{ pokeType }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ fav.name }}</span>
                            
                        </div>
                    </div>
                </div>
    
            </div>

    </div>

    



    </div>
</template>

<script>
export default {
    data() {
        return {
            modalDetail: false,
            modalDetailSelect: '',
            favoriteSearched: '',
            pokeTypeSearched: '',
            showFilter: false,
            
        };
    },
    methods: {
       removeFromFavorites(favSelected) {
            this.$store.commit('removeFromFavorites', favSelected);
        },
        getPokemon(id) {
            this.$store.dispatch('getPokemon', id);
            this.$store.dispatch('getPokemonChain', id);
        },
        ShowDetailFav(id){
            this.modalDetail = true;
            this.modalDetailSelect = id;
        },
        HiddeDetailFav(){
            this.modalDetail = false;
            this.modalDetailSelect = '';
        },
        activeDropdownFilter() {
            this.showFilter = !this.showFilter;
        },
        defaultType() {
            this.pokeTypeSearched = '';
        },
        filterPokemon(){

            if(this.favoriteSearched === '' && this.pokeTypeSearched === ''){
                return this.favorites;
            }
             if(this.favoriteSearched != ''){
                 return this.favorites.filter(fav => fav.id.toString().includes(this.favoriteSearched.toString()) || fav.name.toLowerCase().includes(this.favoriteSearched.toLowerCase()));
            }
        },
        filterPokemonType(){
            if(this.pokeTypeSearched === '' && this.favoriteSearched === ''){
                return this.favorites;
            }
            return this.favorites.filter(fav => fav.types.includes(this.pokeTypeSearched));
        },
        types(){
            //return all types of pokemon in favorites
            let types = [];
            this.favorites.forEach(fav => {
                fav.types.forEach(type => {
                    if(!types.includes(type)){
                        types.push(type);
                    }
                });
            });
            return types;
        }
    },
    mounted() {
    },
    computed: {
        favorites() {
                return this.$store.state.PokemonsFavorites;
        }
    },
    watch: {
        // favoriteSearched(newValue) {
        //     return this.favorites.filter((fruit) =>
        //     fruit.toLowerCase().includes(newValue)
        //     );
        // }
    }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

    
