<template>
    <div v-if="analysis">
        <NBA-rank :baseinfo='baseinfo' :nbarank='nbarank.all' v-if="isNBA && nbarank"></NBA-rank>
        <league-rank :baseinfo='baseinfo' :leaguerank='leaguerank' v-else-if='leaguerank'></league-rank>
        <jz-data :jz_data='jz_data' v-if="jz_data"></jz-data>
        <recent-record :recent_record='recent_record' v-if="recent_record"></recent-record>
        <future-match :future_match='future_match' v-if="future_match"></future-match>
        <macau-news :macau_news='macau_news' v-if="macau_news"></macau-news>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail/mchao'
import leagueRank from '~components/detail/basketball/analysis/zj/league_rank.vue'
import NBARank from '~components/detail/basketball/analysis/zj/nba_rank.vue'
import jzData from '~components/detail/basketball/analysis/zj/jz_data.vue'
import recentRecord from '~components/detail/basketball/analysis/zj/recent_record.vue'
import futureMatch from '~components/detail/basketball/analysis/zj/future_match.vue'
import macauNews from '~components/detail/basketball/analysis/zj/macau_news.vue'

export default {
    components: {
        leagueRank,
        NBARank,
        jzData,
        recentRecord,
        futureMatch,
        macauNews
    },
    computed: {
        baseinfo () {
            return this.$store.state.mchao.baseinfo
        },
        analysis () {
            return this.$store.state.mchao.analysis
        },
        nbarank () {
            return this.analysis.zj.nbarank
        },
        leaguerank () {
            return this.analysis.zj.leaguerank
        },
        jz_data () {
            return this.analysis.zj.jz_data
        },
        recent_record () {
            return this.analysis.zj.recent_record
        },
        future_match() {
            return this.analysis.zj.future_match
        },
        macau_news() {
            return this.analysis.zj.macau_news
        },
        isNBA () {
            return this.baseinfo.simpleleague === 'NBA'
        },
        loaded () {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {fid, homeid, awayid, seasonid, stageid, matchid, matchtime, group, stagemode} = this.baseinfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            await this.$store.dispatch(aTypes.getAnalysisZj, {fid, homeid, awayid, seasonid, stageid, matchid, matchdate, group, stagemode})
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
