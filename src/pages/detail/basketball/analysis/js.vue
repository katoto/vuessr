<template>
    <div class="">
        <strength :baseInfo='baseInfo' :strength='strength' :stats='stats' v-if="strength"></strength>
        <trend :baseInfo='baseInfo' :trends='trend' v-if="trend"></trend>
        <div class="item-loader" v-if="$store.state.refreshing">
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
        strength() {
            return this.analysis.js.strength
        },
        stats() {
            return this.analysis.js.stats
        },
        trend() {
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

<style lang="css">
</style>
