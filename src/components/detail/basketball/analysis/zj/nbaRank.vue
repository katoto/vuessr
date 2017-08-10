<template>
    <div class="zhedie-box">
        <div class="zhedie-box">
            <div class="zj-nav noborder">
                NBA排名
            </div>
            <div class="zhedie show" v-if="noEmptyFlag">
                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb-lq">
                    <tbody>
                    <tr>
                        <th width="14%">
                            排名
                        </th>
                        <th>
                            <div class="qiud">
                                球队
                            </div>
                        </th>
                        <th width="15%">
                            胜/负
                        </th>
                        <th width="15%">
                            胜率
                        </th>
                        <th width="15%">
                            胜差
                        </th>
                        <th width="15%">
                            状态
                        </th>
                    </tr>
                    <tr v-for="hoa in ['away', 'home']">
                        <td>
                            {{nbarank[hoa].order}}
                        </td>
                        <td>
                            <div class="lq-img">
                                <img class="simg" :src="nbarank[hoa].teamlogo">
                            </div>
                            {{nbarank[hoa].teamgbname}}
                        </td>
                        <td>
                            {{nbarank[hoa] | resultFmt}}
                        </td>
                        <td>
                            {{nbarank[hoa].winrate}}%
                        </td>
                        <td>
                            {{nbarank[hoa].windiff}}
                        </td>
                        <td :class="status[nbarank[hoa].winstatus].style">
                            {{nbarank[hoa].wintext}}{{status[nbarank[hoa].winstatus].text}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="inte-look zhedie" v-tap="{methods: () => {$router.push(`/center/basketballmatch/${baseInfo.seasonid}/rank`)}}">完整积分榜&gt;
                </div>
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
            nbarank: {
                type: Object,
                required: true
            }
        },
        components: {
            feedBackNoData
        },
        data () {
            return {
                status: {
                    '-1': {
                        style: '',
                        text: ''
                    },
                    '0': {
                        style: 'lose',
                        text: '连败'
                    },
                    '1': {
                        style: 'win',
                        text: '连胜'
                    }

                }
            }
        },
        computed: {
            noEmptyFlag () {
                return this.noEmpty(this.nbarank)
            }
        },
        methods: {
            noEmpty (obj) {
                if (obj) {
                    return !!Object.keys(obj).length
                }
                return false
            }
        },
        filters: {
            resultFmt (input) {
                return `${input.win}/${input.lost}`
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

    .lq-img {
        width: .6rem;
        position: relative;
        float: left
    }

    .lq-img {
        height: 1.06667rem
    }

    .simg, .t-img img {
        width: .506rem;
        height: .506rem;
        position: absolute;
        top: 50%;
        margin-top: -.253rem;
        left: 0
    }

    .inte-look {
        height: 1.066667rem;
        line-height: 1.066667rem;
        background: #fff;
        color: #515e6d;
        position: relative;
        text-align: right;
        border-top: 1px solid #ededed;
        padding-right: .4rem
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

    .fx-table tr td .color9, .fx-table tr td .colorc {
        color: #aab5bd
    }

    .fx-table tr td:first-child, .fx-table tr th:first-child {
        padding-left: .4rem;
        text-align: left;
        position: relative
    }

    .fx-table tr td:last-child, .fx-table tr th:last-child {
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


</style>
