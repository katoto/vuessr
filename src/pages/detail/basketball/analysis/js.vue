<template>
    <div class="">
        <strength :baseInfo='baseInfo' :strength='strength' :stats='stats' v-if="strength"></strength>
        <trend :baseInfo='baseInfo' :trends='trend' v-if="trend"></trend>
        <div class="item-loader" v-if="!(strength && trend)">
            <div class="la-ball-pulse la-2x">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import strength from '~components/detail/basketball/analysis/js/strength.vue'
import trend from '~components/detail/basketball/analysis/js/trend.vue'

export default {
    async asyncData ({store, route: {params}}) {
        const {fid, seasonid, homeid, awayid, matchtime} = store.state.lqdetail.baseInfo// baseInfo 保证有数据了
        const matchdate = matchtime && matchtime.substr(0, 10)
        await store.dispatch(aTypes.getAnalysisJs, {fid, seasonid, homeid, awayid, matchdate})
    },
    components: {
        strength,
        trend
    },
    computed: {
        refreshTime () { // 用户点击刷新按钮时间戳
            return this.$store.state.refreshTime
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        analysis () {
            return this.$store.state.lqdetail.analysis
        },
        strength () {
            return this.analysis.js.strength
        },
        stats () {
            return this.analysis.js.stats
        },
        trend () {
            return this.analysis.js.trend['1']
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {fid, seasonid, homeid, awayid, matchtime} = this.baseInfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            await this.$store.dispatch(aTypes.getAnalysisJs, {fid, seasonid, homeid, awayid, matchdate})
            this.$store.commit('endOneRefresh')
        }
    },
    mounted () {
        this.fetchData()
    },
    watch: {
        loaded (loaded) {
            if (loaded) { this.$store.commit(mTypes.updateScTime) }
        },
        refreshTime () {
            this.fetchData()
        }
    }
}
</script>

<style scoped>
    .item-loader{text-align:center;height:1.733333rem;position:relative;background:#fff}
    .la-ball-pulse{position:absolute;width:1.44rem;height:.48rem;display:inline-block;font-size:0;left:50%;top:50%;margin-left:-.72rem;margin-top:-.24rem}
    .la-ball-pulse.la-dark{color:#333}
    .la-ball-pulse>span{display:inline-block;float:none;background-color:#515e6d;border:0}
    .la-ball-pulse>span:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}
    .la-ball-pulse>span:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}
    .la-ball-pulse>span:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}
    .la-ball-pulse>span{width:.133333rem;height:.133333rem;margin:.053333rem;border-radius:50% 50%;-webkit-animation:ball-pulse 1s ease infinite;animation:ball-pulse 1s ease infinite}
    .la-ball-pulse.la-2x{height:.293333rem;margin-top:-.146667rem}
    .la-ball-pulse.la-2x>span{width:.133333rem;height:.133333rem;margin:.08rem}
    @-webkit-keyframes ball-pulse{0%,100%,60%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}
        30%{opacity:.1;-webkit-transform:scale(.01);transform:scale(.01)}
    }
    @keyframes ball-pulse{0%,100%,60%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}
        30%{opacity:.1;-webkit-transform:scale(.01);transform:scale(.01)}
    }




</style>
