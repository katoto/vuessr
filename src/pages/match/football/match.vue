<template>
    <div class="wrapper l-full l-flex-column">
        <header class="header inte-header-b" v-if="match">
            <div class="info">
                <a class="back-icon" onClick="history.back()">返回</a>
                <div class="info-c">
                    <div class="info-pic">
                        <img :src="match.matchlogo || 'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png'">
                    </div>
                    <div class="info-itm">
                        <h1>{{match.simplegbname}}</h1>
                    </div>
                </div>
            </div>
            <nav class="sk-tab">
                <router-link :class="{'cur':~$route.path.indexOf('/schedule')}" :to="{path: '/center/footballmatch/' + match.seasonid + '/schedule',query:$route.query }" replace>
                    赛程<i :class="{'sktab-arrow':~$route.path.indexOf('/schedule')}"></i>
                </router-link>
                <router-link :class="{'cur':~$route.path.indexOf('/integral')}" :to=" {path:'/center/footballmatch/' + match.seasonid + '/integral',query:$route.query }" replace>
                    积分榜<i :class="{'sktab-arrow':~$route.path.indexOf('/integral')}"></i>
                </router-link>
                <router-link :class="{'cur':~$route.path.indexOf('/statistics')}" :to="{path: '/center/footballmatch/' + match.seasonid + '/statistics',query:$route.query} " replace>
                    统计<i :class="{'sktab-arrow':~$route.path.indexOf('/statistics')}"></i>
                </router-link>
            </nav>
        </header>
        <div class="l-flex-1 l-relative">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/center'
    import logo from '~directives/logo'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getFootHead, {seasonid: params.seasonid})
        },
        directives: {
            logo
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
        destroyed () {
            this.$store.commit(mTypes.reset)
        },
        watch: {
            '$route' () {
                this.fetchData()
            }
        }
    }
</script>

<style scoped>
    .wrapper{background:#f4f4f4;width:100%;height:100%}
    .l-flex-column{ display:-webkit-box; -webkit-box-orient: vertical; display:flex; flex-flow: column;height: 100% }
    .l-flex-1{ -webkit-box-flex: 1; flex:1;overflow: hidden}
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .l-relative{ position:relative;}
    .header{height:4.0rem;background:#242c35;position:relative;width:100%}
    .inte-header-b{width: 100%; background: #242c35;}
    .back-icon:before{background:url('~assets/images/match/detail-icon.png') no-repeat;background-size:.533333rem 13.333333rem}
    .back-icon{width:1.066667rem;height:1.173333rem;display:inline-block;text-indent:-999px;position:absolute;left:0;z-index:6}
    .back-icon:before{width:.32rem;height:.493333rem;content:'';position:absolute;left:.266667rem;top:0.24rem;background-position:center 0}
    .info-c{text-align:center;position:absolute;left:50%;top:40%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
    .info-pic{ width: 1.3333rem; height:1.3333rem; border-radius: 0.6667rem; background-color: #fff; position:relative;  left: 50%; margin-left: -0.6666rem; overflow: hidden;}
    .info-pic img{max-width: 100%; position: absolute; top: 50%; left: 50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
    .info-itm{ padding-top: 0.266667rem;}
    .info-itm h1{color:#fff;font-size:0.4rem;font-weight:400}
    .info-itm p{color:rgba(255,255,255,.5);font-size: 0.293333rem;}
    .sk-tab{height:.92rem;line-height:.92rem;color:#d1d4d0;font-size:.346667rem;text-align:center;width:100%;z-index:3;display:-webkit-box;  display:-webkit-flex;display:flex;position:absolute;left:0;bottom:0;}
    .sk-tab a{position:relative;color:rgba(255,255,255,0.3);-webkit-box-flex:1;-webkit-flex:1;flex:1;display:block}
    .sk-tab a.cur,.sk-tab a:active{font-size:0.346667rem;color:#fff}
    .sktab-arrow{border:.133333rem solid;border-color:rgba(255,255,255,0) rgba(255,255,255,0) rgba(230,230,230,1) rgba(255,255,255,0);position:absolute;bottom:0;left:50%;margin-left:-.133333rem;display:none}
    .sk-tab a.cur .sktab-arrow{display:block}
    .inte-header-b .sk-tab{background: none;}
    a{text-decoration:none}
</style>
