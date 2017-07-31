<template>
    <div v-if="analysis">
        <NBA-rank :baseInfo='baseInfo' :nbarank='nbarank.all' v-if="isNBA && nbarank"></NBA-rank>
        <league-rank :baseInfo='baseInfo' :leaguerank='leaguerank' v-else-if='leaguerank'></league-rank>
        <jz-data :jzData='jzData' v-if="jzData"></jz-data>
        <recent-record :recentRecord='recentRecord' v-if="recentRecord"></recent-record>
        <future-match :futureMatch='futureMatch' v-if="futureMatch"></future-match>
        <macau-news :macauNews='macauNews' v-if="macauNews"></macau-news>
        <div class="item-loader" v-if="!(nbarank && nbarank.all && leaguerank && recentRecord && futureMatch && macauNews)">
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
import leagueRank from '~components/detail/basketball/analysis/zj/leagueRank.vue'
import NBARank from '~components/detail/basketball/analysis/zj/nbaRank.vue'
import jzData from '~components/detail/basketball/analysis/zj/jzData.vue'
import recentRecord from '~components/detail/basketball/analysis/zj/recentRecord.vue'
import futureMatch from '~components/detail/basketball/analysis/zj/futureMatch.vue'
import macauNews from '~components/detail/basketball/analysis/zj/macauNews.vue'

export default {
    async asyncData ({store, route: {params}}) {
        const {fid, homeid, awayid, seasonid, stageid, matchid, matchtime, group, stagemode} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
        const matchdate = matchtime && matchtime.substr(0, 10)
        await store.dispatch(aTypes.getAnalysisZj, {fid, homeid, awayid, seasonid, stageid, matchid, matchdate, group, stagemode})
    },
    components: {
        leagueRank,
        NBARank,
        jzData,
        recentRecord,
        futureMatch,
        macauNews
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
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {fid, homeid, awayid, seasonid, stageid, matchid, matchtime, group, stagemode} = this.baseInfo // baseInfo 保证有数据了
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
        },
        refreshTime () {
            this.fetchData()
        }
    }
}
</script>

<style>
    .zhedie-box {
        background: #fff
    }

    .zhedie-box:last-child {
        margin-bottom: 0
    }
    .pm-namel {
        background: #fff;
        line-height: 1.066667rem;
        padding: .213333rem .4rem 0;
        color: #333
    }

    [data-dpr="1"] .pm-namel {
        font-size: 14px
    }

    [data-dpr="2"] .pm-namel {
        font-size: 28px
    }

    [data-dpr="3"] .pm-namel {
        font-size: 42px
    }
    .lq-img,
    .pm-img,
    .ps-img {
        width: .6rem;
        position: relative;
        float: left
    }

    .pm-img {
        height: 1.066667rem
    }

    .ps-img {
        height: .8rem
    }

    .lq-img {
        height: 1.06667rem
    }
    .fx-table {
        margin-top: .053333rem
    }
    .fx-table tr th {
        background: #fff;
        border-bottom: 1px solid #f4f4f4;
        height: .8rem;
        line-height: .8rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .fx-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .fx-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .fx-table tr th {
        font-size: 33px
    }
    .fx-table tr td {
        line-height: 1.066667rem;
        color: #242c35;
        text-align: center
    }

    [data-dpr="1"] .fx-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .fx-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .fx-table tr td {
        font-size: 36px
    }
    .fx-table tr td .color9,
    .fx-table tr td .colorc {
        color: #aab5bd
    }

    .fx-table tr td:first-child,
    .fx-table tr th:first-child {
        padding-left: .4rem;
        text-align: left;
        position: relative
    }

    .fx-table tr td:last-child,
    .fx-table tr th:last-child {
        padding-right: .4rem;
        text-align: right
    }

    .fx-table tr:last-child td {
        padding-bottom: .25rem
    }

    .fx-table tr td:first-child span {
        display: block;
        height: .426667rem;
        line-height: .426667rem
    }

    [data-dpr="1"] .fx-table tr td:first-child span {
        font-size: 10px
    }

    [data-dpr="2"] .fx-table tr td:first-child span {
        font-size: 20px
    }

    [data-dpr="3"] .fx-table tr td:first-child span {
        font-size: 30px
    }

    [data-dpr="1"] .fx-table tr td:first-child span.f23 {
        font-size: 11.5px
    }

    [data-dpr="2"] .fx-table tr td:first-child span.f23 {
        font-size: 23px
    }

    [data-dpr="3"] .fx-table tr td:first-child span.f23 {
        font-size: 34.5px
    }
    .zd-detail {
        background: #fff;
        height: 1.84rem
    }
    .gaik {
        margin: 0 .4rem;
        height: .84rem;
        line-height: .84rem;
        padding: .293333rem 0 0
    }
    .gaik .fl {
        margin-right: .32rem
    }
    [data-dpr="1"] .gaik .f30 {
        font-size: 14px
    }

    [data-dpr="2"] .gaik .f30 {
        font-size: 28px
    }

    [data-dpr="3"] .gaik .f30 {
        font-size: 42px
    }
    .wins {
        color: #d3553d
    }
    .tie {
        color: #36a171
    }

    .lose {
        color: #437ba8
    }
    .tcell {
        display: table-cell
    }
    .gaik .fl {
        margin-right: .32rem
    }
    .total-tips {
        margin: 0 .4rem;
        color: #aab5bd
    }

    [data-dpr="1"] .total-tips {
        font-size: 11px
    }

    [data-dpr="2"] .total-tips {
        font-size: 22px
    }

    [data-dpr="3"] .total-tips {
        font-size: 33px
    }
    .fx-table {
        margin-top: .053333rem
    }
    .fx-table tr th {
        background: #fff;
        border-bottom: 1px solid #f4f4f4;
        height: .8rem;
        line-height: .8rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .fx-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .fx-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .fx-table tr th {
        font-size: 33px
    }

    .fx-table tr td {
        line-height: 1.066667rem;
        color: #242c35;
        text-align: center
    }

    [data-dpr="1"] .fx-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .fx-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .fx-table tr td {
        font-size: 36px
    }

    .fx-table tr .win {
        color: #d3553d
    }

    .fx-table tr .lose {
        color: #437ba8
    }

    .fx-table tr td .color9
    .fx-table tr td .colorc {
        color: #aab5bd
    }

    .fx-table tr td:first-child,
    .fx-table tr th:first-child {
        padding-left: .4rem;
        text-align: left;
        position: relative
    }

    .fx-table tr td:last-child,
    .fx-table tr th:last-child {
        padding-right: .4rem;
        text-align: right
    }

    .fx-table tr:last-child td {
        padding-bottom: .25rem
    }

    .fx-table tr td:first-child span {
        display: block;
        height: .426667rem;
        line-height: .426667rem
    }

    [data-dpr="1"] .fx-table tr td:first-child span {
        font-size: 10px
    }

    [data-dpr="2"] .fx-table tr td:first-child span {
        font-size: 20px
    }

    [data-dpr="3"] .fx-table tr td:first-child span {
        font-size: 30px
    }

    [data-dpr="1"] .fx-table tr td:first-child span.f23 {
        font-size: 11.5px
    }

    [data-dpr="2"] .fx-table tr td:first-child span.f23 {
        font-size: 23px
    }

    [data-dpr="3"] .fx-table tr td:first-child span.f23 {
        font-size: 34.5px
    }
    .blue-k,
    .gray-k,
    .green-k,
    .red-k {
        width: 1.28rem;
        height: .533333rem;
        line-height: .533333rem;
        padding-right: .106667rem;
        color: #fff;
        float: right
    }

    [data-dpr="1"] .blue-k,
    [data-dpr="1"] .gray-k,
    [data-dpr="1"] .green-k,
    [data-dpr="1"] .red-k {
        font-size: 11px
    }

    [data-dpr="2"] .blue-k,
    [data-dpr="2"] .gray-k,
    [data-dpr="2"] .green-k,
    [data-dpr="2"] .red-k {
        font-size: 22px
    }

    [data-dpr="3"] .blue-k,
    [data-dpr="3"] .gray-k,
    [data-dpr="3"] .green-k,
    [data-dpr="3"] .red-k {
        font-size: 33px
    }
    .green-k {
        background: #36a171
    }
    .red-k {
        background: #d25138
    }
    .blue-k {
        background: #437ba8
    }
    .gray-k {
        background: #c2c2c2
    }
    .zhedie-box-wl .fx-table tr th:first-child span {
        color: #5c788f
    }


</style>
