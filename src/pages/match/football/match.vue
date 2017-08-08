<template>
    <div class="wrapper l-full l-flex-column">
        <header class="header inte-header-b" v-if="match">
            <div class="info">
                <a class="back-icon" onClick="history.back()">返回</a>
                <div class="info-c">
                    <div class="info-pic">
                        <img :src="match.matchlogo">
                    </div>
                    <div class="info-itm">
                        <h1>{{match.simplegbname}}</h1>
                    </div>
                </div>
            </div>
            <nav class="sk-tab">
                <a :class="{'cur':~$route.path.indexOf('/schedule')}" :href=" '/center/footballmatch/' + match.seasonid + '/schedule' ">
                    赛程<i :class="{'sktab-arrow':~$route.path.indexOf('/schedule')}"></i>
                </a>
                <a :class="{'cur':~$route.path.indexOf('/integral')}" :href=" '/center/footballmatch/' + match.seasonid + '/integral' ">
                    积分榜<i :class="{'sktab-arrow':~$route.path.indexOf('/integral')}"></i>
                </a>
                <a :class="{'cur':~$route.path.indexOf('/statistics')}" :href=" '/center/footballmatch/' + match.seasonid + '/statistics' ">
                    统计<i :class="{'sktab-arrow':~$route.path.indexOf('/statistics')}"></i>
                </a>
            </nav>
        </header>
        <div class="l-flex-1 l-relative">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getFootHead, {seasonid: params.seasonid})
        },
        computed: {
            match () {
                return this.$store.state.center.footballMatch.head
            }
        },
        methods: {
            fetchData () {
                this.$store.dispatch(aTypes.getFootHead, {seasonid: this.$route.params.seasonid})
            }
        },
        mounted () {
            this.fetchData()
        },
        watch: {
            '$route' () {
                this.fetchData()
            }
        }
    }
</script>
