<template>
    <div>
        <div class="zhedie-box" v-if="baseInfo.stagemode === '1'">
            <div class="zj-nav">
                联赛排名
            </div>
            <div class="zhedie" v-if="noEmptyFlag">
                <div v-for="hoa in ['away', 'home']">
                    <div class="pm-namel">
                        {{baseInfo[hoa + 'sxname']}} ({{baseInfo.simpleleague}})
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb">
                        <tbody>
                        <tr>
                            <th width="12%">
                                场次
                            </th>
                            <th width="10%">
                                比赛
                            </th>
                            <th width="10%">
                                胜
                            </th>
                            <th width="10%">
                                负
                            </th>
                            <th width="10%">
                                进
                            </th>
                            <th width="10%">
                                失
                            </th>
                            <th width="10%">
                                净
                            </th>
                            <th width="12%">
                                排名
                            </th>
                        </tr>
                        <tr v-for="(tname, tab) in tabs">
                            <td>
                                <span class="color9 f23">{{tname}}</span>
                            </td>
                            <td v-for="(lname, type) in LeagueRankTypeMode1">
                                {{leaguerankFmt[hoa][tab + type]}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <feed-back-no-data v-else></feed-back-no-data>
        </div>

        <div class="zhedie-box" v-else>
            <div class="zj-nav">
                {{baseInfo.seasongbname}}{{baseInfo.matchgroup}}组排名
            </div>
            <div class="zhedie" v-if="noEmptyFlag">
                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb-lq">
                    <tbody>
                    <tr>
                        <th width="12%">
                            排名
                        </th>
                        <th>
                            <div class="qiud">
                                球队
                            </div>
                        </th>
                        <th width="10%">
                            比赛
                        </th>
                        <th width="10%">
                            胜
                        </th>
                        <th width="10%">
                            负
                        </th>
                        <th width="10%">
                            得
                        </th>
                        <th width="10%">
                            失
                        </th>
                    </tr>
                    <tr v-for="(rank, idx) in leaguerank" :class="{'vs-ing': baseInfo.homeid === rank.tid || baseInfo.awayid === rank.tid}">
                        <td>
                            {{idx+1}}
                        </td>
                        <td v-for="(lname, type) in LeagueRankTypeMode2">
                            {{rank[type]}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <feed-back-no-data v-else></feed-back-no-data>
        </div>

    </div>
</template>

<script>
    import feedBackNoData from '~components/detail/feedBackNoData.vue'

    export default {
        props: {
            baseInfo: {
                type: Object,
                required: true
            },
            leaguerank: {
                type: Array,
                required: true
            }
        },
        components: {
            feedBackNoData
        },
        data () {
            return {
                LeagueRankTypeMode1: {
                    count: '比赛',
                    win: '胜',
                    lost: '负',
                    gain: '进',
                    miss: '失',
                    clean: '净',
                    standing: '排名'
                },
                LeagueRankTypeMode2: {
                    team: '球队',
                    count: '比赛',
                    win: '胜',
                    lost: '负',
                    gain: '进',
                    miss: '失'
                },
                tabs: {
                    '': '全部',
                    'h': '主场',
                    'a': '客场'
                }
            }
        },
        computed: {
            leaguerankFmt () {
                return {
                    home: this.leaguerank[1],
                    away: this.leaguerank[0]
                }
            },
            noEmptyFlag () {
                return this.noEmpty(this.leaguerank)
            }
        },
        methods: {
            noEmpty (obj) {
                if (obj) {
                    return !!Object.keys(obj).length
                }
                return false
            }
        }
    }
</script>

<style scoped>
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
    tr.vs-ing td {
        background: #f6fafe;
        border-bottom: 1px solid #f2f8fd;
        border-top: 1px solid #f2f8fd;
    }

</style>
