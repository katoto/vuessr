<template>
    <cup :match="match"></cup>
</template>

<script>
    import {aTypes} from '~store/center'
    import Cup from '~components/match/basketball/cup.vue'
    export default{
        async asyncData ({store}) {
            await store.dispatch(aTypes.getBasketballAll, '{areaid:5}')
        },
        components: {
            Cup
        },
        computed: {
            match () {
                return this.$store.state.center.lqAll.cups
            }
        },
        methods: {
            async fetchData () {
                this.$store.dispatch(aTypes.getBasketballAll, {areaid: 5})
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>
