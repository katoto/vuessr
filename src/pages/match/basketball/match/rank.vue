<template>
    <section class="l-full">
        <div class="inte-main l-full l-scroll-y" v-if="rankList">
            <!--有东西部之分-->
            <template v-if="rankList.rettype == 'object'">
                <rank-object :rankList="rankList"></rank-object>
            </template>

            <template v-if="rankList.rettype == 'array'">
                <rank-array :rankList="rankList"></rank-array>
            </template>

        </div>

        <ViewEmpty v-else></ViewEmpty>
    </section>
</template>

<script>
    import ViewEmpty from '~components/match/view_empty.vue'
    import {aTypes} from '~store/center'

    import rankArray from '~components/match/basketball/rank_array.vue'
    import rankObject from '~components/match/basketball/rank_object.vue'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getBasketballMatchRank, {seasonid: params.seasonid})
        },
        components: {
            ViewEmpty, rankArray, rankObject
        },
        computed: {
            rankList () {
                return this.$store.state.center.basketballMatch.rank
            }
        },
        watch: {
            '$route' () {
                this.fetchData()
            }

        },
        methods: {
            fetchData () {
                this.$store.dispatch(aTypes.getBasketballMatchRank, {seasonid: this.$route.params.seasonid})
            }
        },
        mounted(){
            this.fetchData()
        }
    }
</script>

<style scoped>
    .inte-main{
        background-color: #fff;
    }
</style>
