<template>
    <div class="">
        <strength :baseinfo='baseinfo' :strength='strength' :stats='stats' v-if="strength"></strength>
        <trend :baseinfo='baseinfo' :trend='trend' v-if="trend"></trend>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail/mchao'
import strength from '~components/detail/basketball/analysis/js/strength.vue'
import trend from '~components/detail/basketball/analysis/js/trend.vue'

export default {
    components: {
        strength,
        trend
    },
    computed: {
        loaded () {
            return this.$store.state.refreshing === 0
        },
        baseinfo () {
            return this.$store.state.mchao.baseinfo
        },
        analysis () {
            return this.$store.state.mchao.analysis
        },
        strength() {
            return this.analysis.js.strength
        },
        stats() {
            return this.analysis.js.stats
        },
        trend() {
            return this.analysis.js.trend
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {fid, seasonid, homeid, awayid, matchtime} = this.baseinfo // baseInfo 保证有数据了
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
        }
    }
}
</script>

<style lang="css">
</style>
