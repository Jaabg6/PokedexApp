<template>
    <div>
        <NavbarMain />
        <Header-Home />
        <Favorites />
        <Footer />
    </div>

</template>

<script>
export default {
    name: "IndexPage",
    head(){
        return {
            title: 'Pokedex App | Home',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: 'Search for Pokemon by name or by number and see their stats and abilities. Add Pokemon to your favorites list. Look at the random page to see a random Pokemon.'
                },
            ]
        }
    },
    data() {
        return {
        };
    },
    mounted() {
    },
}
</script>