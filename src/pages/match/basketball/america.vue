<template>
    <list :match="match"></list>
</template>

<script>
    import {aTypes} from '~store/center'
    import List from '~components/match/basketball/list.vue'
    export default{
        async asyncData ({store}) {
            await store.dispatch(aTypes.getBasketballAll, '{areaid:3}')
        },
        components: {
            List
        },
        computed: {
            match () {
                return this.$store.state.center.lqAll.america
            }
        },
        methods: {
            async fetchData () {
                this.$store.dispatch(aTypes.getBasketballAll, {areaid: 3})
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>
