<template>
<section class="l-full l-flex-column" v-if="teamInfo">
    <div class="l-full l-flex-column">
        <header class="header">
            <div class="info"><a class="back-icon" onclick="history.back()">返回</a>
                <div class="info-c">
                    <div class="info-pic"><img :src="teamInfo.teamlogo"></div>
                    <div class="info-itm">
                        <h1>{{teamInfo.teamsxname}}</h1>
                        <p>{{capTip}}</p>
                    </div>
                </div>
            </div>
            <nav class="sk-tab">
                <router-link :class="{'cur': ~$route.path.indexOf('/gl')}" :to="{name: 'team-football-gl', query: $route.query}" replace>概览<i class="sktab-arrow"></i></router-link>
                <router-link :class="{'cur': ~$route.path.indexOf('/sc')}" :to="{name: 'team-football-sc', query: $route.query}" replace>赛程<i class="sktab-arrow"></i></router-link>
                <router-link :class="{'cur': ~$route.path.indexOf('/zr')}" :to="{name: 'team-football-zr', query: $route.query}" replace>阵容<i class="sktab-arrow"></i></router-link>
            </nav>
        </header>
        <div class="l-flex-1 l-relative">
            <router-view></router-view>
        </div>
    </div>
</section>
</template>
<script>
import {
    mTypes, aTypes
} from '~store/team/zq'

export default {
    async asyncData ({store, route: {params}}) {
        await store.dispatch(aTypes.getTeamInfo, params.fid)
    },
    computed: {
        teamInfo () {
            return this.$store.state.teamZq.teamInfo
        },
        capTip () {
            if (this.teamInfo) {
                return this.teamInfo.homefieldcap ? (this.teamInfo.teamhomefield + '-容纳' + this.teamInfo.homefieldcap + '人') : this.teamInfo.teamhomefield
            }
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getTeamInfo, this.$route.params.tid)
    },
    destroyed () {
        this.$store.commit(mTypes.reset)
    }
}
</script>

<style scoped>
    .top_0 {
        margin-top: 0;
    }

    .back-icon:before {
        background: url("~assets/images/team/detail-icon.png") no-repeat;
        background-size: .533333rem 13.333333rem;
    }
    .back-icon{width:1.066667rem;height:1.173333rem;display:inline-block;text-indent:-999px;position:absolute;left:0;z-index:6}
    .matches .list-view-wrapper {
        background: #fff;
        margin-top: .266667rem;
    }
    .l-flex-column{ display:-webkit-box; -webkit-box-orient: vertical; display:flex; flex-flow: column;height: 100% }
    .l-flex-1{ -webkit-box-flex: 1; flex:1;overflow: hidden}
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .l-relative{ position:relative;}
    .sk-tab{height:.92rem;line-height:.92rem;color:#d1d4d0;font-size:.346667rem;text-align:center;width:100%;z-index:3;display:-webkit-box;
        display:-webkit-flex;display:flex;position:absolute;left:0;bottom:0;}
    .sk-tab a{position:relative;color:rgba(255,255,255,0.3);-webkit-box-flex:1;-webkit-flex:1;flex:1;display:block}
    .sk-tab a.cur,.sk-tab a:active{font-size:0.346667rem;color:#fff}
    .sktab-arrow{border:.133333rem solid;border-color:rgba(255,255,255,0) rgba(255,255,255,0) rgba(230,230,230,1) rgba(255,255,255,0);position:absolute;bottom:0;left:50%;margin-left:-.133333rem;display:none}
    .sk-tab a.cur .sktab-arrow{display:block}
    .header{height:4.0rem;background:#242c35;position:relative;width:100%}
    .info-c{text-align:center;position:absolute;left:50%;top:40%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
    .info-pic{ width: 1.3333rem; height:1.3333rem; border-radius: 0.6667rem; background-color: #fff; position:relative;
        left: 50%; margin-left: -0.6666rem; overflow: hidden;}
    .info-pic img{max-width: 100%; position: absolute; top: 50%; left: 50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
    .info-itm{ padding-top: 0.266667rem;}
    .info-itm h1{color:#fff;font-size:0.4rem;font-weight:400}
    .info-itm p{color:rgba(255,255,255,.5);font-size: 0.293333rem;}
    .back-icon:before {
        width: .32rem;
        height: .493333rem;
        content: '';
        position: absolute;
        left: .266667rem;
        top: 0.24rem;
        background-position: center 0;
        margin-top: auto;
    }
</style>
