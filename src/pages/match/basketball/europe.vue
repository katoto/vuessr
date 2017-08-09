<template>
   <list :match="match"></list>
</template>

<script>
    import {aTypes} from '~store/center'
    import List from '~components/match/basketball/list.vue'
    export default{
        async asyncData ({store}) {
            await store.dispatch(aTypes.getBasketballAll, '{areaid:1}')
        },
        components: {
            List
        },
        computed: {
            match () {
                return this.$store.state.center.lqAll.europe
            }
        },
        methods: {
            async fetchData () {
                this.$store.dispatch(aTypes.getBasketballAll, {areaid: 1})
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>
