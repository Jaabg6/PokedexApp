<template>
    <div>
        <NavbarMain />
        <RandomPokemonCard />
        <Footer />
    </div>

</template>

<script>

export default {
    name: "IndexPage",
    head(){
        return {
            title: 'Pokedex App | Random',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: 'Search for Pokemon by name or by number and see their stats and abilities. Add Pokemon to your favorites list. '
                },
            ]
        }
    },
    data() {
        return {};
    },
    mounted() {
    },
}
</script>