<template>
    <nav v-bind:class="[ this.scrollOnTop ? 'py-5 md:py-8' : 'py-4 md:py-5' ]" class="z-10 ease-in duration-100 py-5 md:py-8 fixed w-full bg-gradient-to-b from-gray-500 to-gray-800 shadow-lg shadow-gray-800/50">
        <div class="max-w-7xl container mx-auto px-3 md:px-6 lg:px:10">
            <div class="grid grid-cols-7"> 
                <!-- 1 -->
                <div class="flex items-center col-span-6">
                    <div class="flex-shrink-0 flex items-center">
                        <img class=" h-12 w-auto mr-2" src="@/static/pokeball.png" alt="Logo">
                        <h3 class="hidden md:block md:text-3xl font-extrabold text-white ">Pokedex</h3>
                    </div>
                    
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            
                            <router-link  exact to="/" active-class="bg-gray-900 text-white" class="text-gray-300 inline-block px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</router-link>
                            
                            <router-link exact  to="/Random" active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white inline-block px-3 py-2 rounded-md text-sm font-medium">Random</router-link>

                        </div>
                    </div>

                </div>
                <!-- 2 -->
                <div class="flex justify-end">
                    <button @click="this.toggleMenu" class="block sm:hidden bg-gray-900 p-3 rounded-sm">
                        <svg class="h-6 w-6 fill-white" viewBox="0 0 24 24">
                            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
                        </svg>
                    </button>
                             
                </div>

                <!-- dropDown Menu -->
                
            
            </div>
            <div @click="this.mobileMenu" v-if="menu === true" class="sm:hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gradient-to-b from-gray-800 to-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <router-link to="/" class="block px-4 py-5 text-sm text-white" role="menuitem" tabindex="0" id="user-menu-item-0">Home</router-link>
                
                <router-link to="/Random" class="block px-4 py-5 text-sm text-white" role="menuitem" tabindex="1" id="user-menu-item-1">Random</router-link>
               
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
            return {
                menu: false,
                mobileMenu: false,
                scrollOnTop: true,
            }
        },
        methods: {
            toggleMenu() {
                this.menu = !this.menu
            },
            toggleMobileMenu() {
                this.mobileMenu = !this.mobileMenu
            },
            isAtTop() {
                return window.scrollY === 0;
            },
            //function each time the window is scrolled
            scrollOnTopDetect() {
                if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                    this.scrollOnTop = false;
                    console.log('true');
                }

                else {
                    this.scrollOnTop = true;
                }
            },
            debounce(func, timeout = 100){
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
            }


        },
        beforeMount () {

            
            
            //function to improve performance when detect scrolling
            function debounce(func, timeout = 300){
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
            }

            window.onscroll = debounce(this.scrollOnTopDetect);

        },
        // beforeDestroyed () {
        //     window.removeEventListener('scroll', this.scrollOnTopDetect);
        // },
}
</script>

