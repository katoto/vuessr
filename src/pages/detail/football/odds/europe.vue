<template>
    <div v-if="europe">
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tbody>
                <tr>
                    <th width="19%">公司</th>
                    <th width="7%"></th>
                    <th width="28%">欧赔</th>
                    <th width="28%">凯利</th>
                    <th width="">返还率</th>
                </tr>
                </tbody>
            </table>
        </div>

        <no-data v-if="!europe.odds || !europe.odds.length"></no-data>


        <div class="pl-box-bd" v-if="europe.odds && europe.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <colgroup>
                    <col width="19%">
                    <col width="7%">
                    <col width="28%">
                    <col width="28%">
                    <col width="">
                </colgroup>
                <tbody>
                <tr :class="{'noLink':idx==0, 'yebg': info.cid === $route.query.cid}" v-for="info,idx in europe.odds"
                    v-tap="{methods: viewOddsDetail, cid: info.cid}">
                    <td>
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td></td>
                    <td class="colorc">
                        <p class="pl-num"><span :class="{'red': info.first.w == 1, 'green': info.first.w == -1}">{{parseFloat(info.first.win).toFixed(2)|nullFormat}}</span>/<span
                        >{{parseFloat(info.first.draw).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.first.l == 1, 'green': info.first.l == -1}">{{parseFloat(info.first.lost).toFixed(2)|nullFormat}}</span>
                        </p>
                        <p class="pl-num"><span :class="{'red': info.end.w == 1, 'green': info.end.w == -1}">{{parseFloat(info.end.win).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.end.d == 1, 'green': info.end.d == -1}">{{parseFloat(info.end.draw).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.end.l == 1, 'green': info.end.l == -1}">{{parseFloat(info.end.lost).toFixed(2)|nullFormat}}</span>
                        </p>
                    </td>
                    <td>
                        <p class="pl-num"><span :class="{'red': info.first.wkl == 1, 'green': info.first.wkl == -1}">{{parseFloat(info.first.winkl).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.first.dkl == 1, 'green': info.first.dkl == -1}">{{parseFloat(info.first.drawkl).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.first.lkl == 1, 'green': info.first.lkl == -1}">{{parseFloat(info.first.lostkl).toFixed(2)|nullFormat}}</span>
                        </p>
                        <p class="pl-num"><span :class="{'red': info.end.wkl == 1, 'green': info.end.wkl == -1}">{{parseFloat(info.end.winkl).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.end.dkl == 1, 'green': info.end.dkl == -1}">{{parseFloat(info.end.drawkl).toFixed(2)|nullFormat}}</span>/<span
                                :class="{'red': info.end.lkl == 1, 'green': info.end.lkl == -1}">{{parseFloat(info.end.lostkl).toFixed(2)|nullFormat}}</span>
                        </p>

                    </td>
                    <td>
                        <span class="pl-return">{{info.first.pay|nullFormat}}%</span>
                        <span class="pl-return">{{info.end.pay|nullFormat}}%</span>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>

        <odds-skbtips :main="europe.main_num" :all="europe.all_num" v-if="europe && europe.odds && europe.odds.length"></odds-skbtips>
    </div>
    <item-loader v-else></item-loader>
</template>
<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import oddsInfo from '~components/detail/football/odds/oddsInfo.vue'
    import noData from '~components/no_data.vue'
    import itemLoader from '~components/detail/itemLoader.vue'
    import oddsSkbtips from '~components/detail/oddsSkbtips.vue'

    export default {
        async asyncData ({store, route: {params}}) {
            //            await store.dispatch(aTypes.getOddsEurope, params.fid)
        },
        components: {
            noData, itemLoader, oddsSkbtips
        },
        watch: {
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime)
                }
            },
            refreshTime () {
                this.fetchData()
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getOddsEurope, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                if (cid === '-1') return
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.europe.odds,
                        type: 'europe'
                    }
                })
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            europe () {
                return this.$store.state.zqdetail.odds.europe
            }
        },
        filters: {
            nullFormat: (value) => {
                return (value === '' || value === null) ? '--' : value
            }
        }

    }
</script>
<style scoped>

    .pl-box-bd {
        background: #fff;
        border-bottom: 1px solid #f1f1f1
    }

    .pl-box-left,
    .pl-box-right,
    .pl-table tr th {
        background: #fff;
        height: .733333rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .pl-box-left,
    [data-dpr="1"] .pl-box-right,
    [data-dpr="1"] .pl-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .pl-box-left,
    [data-dpr="2"] .pl-box-right,
    [data-dpr="2"] .pl-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .pl-box-left,
    [data-dpr="3"] .pl-box-right,
    [data-dpr="3"] .pl-table tr th {
        font-size: 33px
    }

    .pl-box-bd {
        background: #fff;
        border-bottom: 1px solid #f1f1f1
    }

    .pl-table tr th {
        background: #fff;
        height: .733333rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .pl-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .pl-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .pl-table tr th {
        font-size: 33px
    }

    .pl-table {
        background: #fff
    }

    .pl-table tr td {
        border-bottom: 1px solid #f4f4f4;
        text-align: center;
        height: 1.733333rem;
        line-height: .6rem;
        color: #242c35;
        word-break: break-all
    }

    [data-dpr="1"] .pl-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .pl-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .pl-table tr td {
        font-size: 36px
    }

    .pl-table tr:active {
        background-color: #f4f4f4
    }

    .pl-table tr.noLink:active {
        background-color: #fff
    }

    .yb-box .pl-table tr:active {
        background-color: #fff
    }

    .pl-table tr td:first-child,
    .pl-table tr th:first-child {
        line-height: normal;
        padding-left: .4rem
    }

    .pl-table tr td:first-child .color3 {
        color: #242c35
    }

    .pl-table tr td:last-child,
    .pl-table tr th:last-child {
        text-align: right;
        padding-right: .4rem
    }

    [data-dpr="1"] .pl-table .f24 {
        font-size: 12px
    }

    [data-dpr="2"] .pl-table .f24 {
        font-size: 24px
    }

    [data-dpr="3"] .pl-table .f24 {
        font-size: 36px
    }

    .pl-table tr td:first-child,
    .pl-table tr th:first-child {
        line-height: normal;
        padding-left: .4rem
    }

    .colorc {
        color: #ccc
    }

    .pl-table .green,
    .pl-table .pl-num .green {
        color: #36a171
    }

    .pl-table .pl-return {
        display: block;
        color: #242c35;
    }

    .pl-table .pl-num .red,
    .pl-table .red {
        color: #d3553d
    }

    .pl-cont .red {
        color: #d3553d
    }

    .pl-cont .green {
        color: #36a171
    }

</style>
