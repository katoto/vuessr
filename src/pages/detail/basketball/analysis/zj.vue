<template>
    <div v-if="analysis">
        <NBA-rank :baseInfo='baseInfo' :nbarank='nbarank.all' v-if="isNBA && noEmptyFlagNBArank"></NBA-rank>
        <league-rank :baseInfo='baseInfo' :leaguerank='leaguerank' v-else-if='noEmptyFlagLeaguerank'></league-rank>
        <jz-data :jzData='jzData' v-if="jzData"></jz-data>
        <recent-record :recentRecord='recentRecord' v-if="recentRecord"></recent-record>
        <future-match :futureMatch='futureMatch' v-if="futureMatch"></future-match>
        <macau-news :macauNews='macauNews' v-if="macauNews"></macau-news>
        <skbtips v-if="nbarank"></skbtips>
        <item-loader v-if="!(nbarank)"></item-loader>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import leagueRank from '~components/detail/basketball/analysis/zj/leagueRank.vue'
import NBARank from '~components/detail/basketball/analysis/zj/nbaRank.vue'
import jzData from '~components/detail/basketball/analysis/zj/jzData.vue'
import recentRecord from '~components/detail/basketball/analysis/zj/recentRecord.vue'
import futureMatch from '~components/detail/basketball/analysis/zj/futureMatch.vue'
import macauNews from '~components/detail/basketball/analysis/zj/macauNews.vue'
import itemLoader from '~components/detail/itemLoader.vue'
import skbtips from '~components/detail/skbtips.vue'

export default {
    async asyncData ({store, route: {params}}) {
        const {fid, homeid, awayid, seasonid, stageid, matchid, matchtime, matchgroup, stagemode} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
        const matchdate = matchtime && matchtime.substr(0, 10)
        await store.dispatch(aTypes.getAnalysisZj, {fid, homeid, awayid, seasonid, stageid, matchid, matchdate, matchgroup, stagemode})
    },
    components: {
        skbtips,
        leagueRank,
        NBARank,
        jzData,
        recentRecord,
        futureMatch,
        macauNews,
        itemLoader
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        analysis () {
            return this.$store.state.lqdetail.analysis
        },
        nbarank () {
            return this.analysis.zj.nbarank
        },
        leaguerank () {
            return this.analysis.zj.leaguerank
        },
        jzData () {
            return this.analysis.zj.jzData
        },
        recentRecord () {
            return this.analysis.zj.recentRecord
        },
        futureMatch () {
            return this.analysis.zj.futureMatch
        },
        macauNews () {
            return this.analysis.zj.macauNews
        },
        isNBA () {
            return this.baseInfo.simpleleague === 'NBA'
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        refreshTime () { // 用户点击刷新按钮时间戳
            return this.$store.state.refreshTime
        },
        noEmptyFlagLeaguerank () {
            return this.noEmpty(this.leaguerank)
        },
        noEmptyFlagNBArank () {
            return this.noEmpty(this.nbarank && this.nbarank.all)
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {fid, homeid, awayid, seasonid, stageid, matchid, matchtime, matchgroup, stagemode} = this.baseInfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            await this.$store.dispatch(aTypes.getAnalysisZj, {fid, homeid, awayid, seasonid, stageid, matchid, matchdate, matchgroup, stagemode})
            this.$store.commit('endOneRefresh')
        },
        noEmpty (obj) {
            if (obj) {
                return !!Object.keys(obj).length
            }
            return false
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
