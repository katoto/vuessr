<template>
    <div v-if="daxiaopan">
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tr>
                    <th width="18%">公司</th>
                    <th width="15%"></th>
                    <th width="20%">大</th>
                    <th>盘口</th>
                    <th width="20%">小</th>
                </tr>
            </table>
        </div>
        <no-data v-if="!daxiaopan.odds || !daxiaopan.odds.length"></no-data>

        <div class="pl-box-bd" v-if="daxiaopan.odds && daxiaopan.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <colgroup>
                    <col width="18%">
                    <col width="15%">
                    <col width="20%">
                    <col width="">
                    <col width="20%">
                </colgroup>

                <tr v-for="info,idx in daxiaopan.odds" v-tap="{methods: viewOddsDetail, cid: info.cid}" >
                    <td>
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td></td>
                    <td >
                        <span class="f24" :class="{'red': info.first.b == 1, 'green': info.first.b == -1}">{{parseFloat(info.first.big).toFixed(2)|nullFormat}}</span><br>
                        <span class="f24" :class="{'red': info.end.b == 1, 'green': info.end.b == -1}">{{parseFloat(info.end.big).toFixed(2)|nullFormat}}</span>
                    </td>
                    <td >
                        <span class="f24" :class="{'sheng': info.first.pk == 1, 'jiang': info.first.pk == -1}">{{info.first.handi|nullFormat}}</span><br>
                        <span class="f24" :class="{'sheng': info.end.pk == 1, 'jiang': info.end.pk == -1}">{{info.end.handi|nullFormat}}</span>
                    </td>
                    <td>
                        <span class="f24" :class="{'red': info.first.s == 1, 'green': info.first.s == -1}">{{parseFloat(info.first.small).toFixed(2)|nullFormat}}</span><br>
                        <span class="f24" :class="{'red': info.end.s == 1, 'green': info.end.s == -1}">{{parseFloat(info.end.small).toFixed(2)|nullFormat}}</span>
                    </td>
                </tr>
            </table>
        </div>

        <odds-skbtips v-if="daxiaopan.odds && daxiaopan.odds.length" :main="daxiaopan.main_num" :all="daxiaopan.all_num"></odds-skbtips>

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
        //            await store.dispatch(aTypes.getOddsDxp, params.fid)
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
                await this.$store.dispatch(aTypes.getOddsDxp, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                if (cid === '-1') return
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.daxiaopan.odds,
                        type: 'daxiaopan'
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
            daxiaopan () {
                return this.$store.state.zqdetail.odds.daxiaopan
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
    .tContent {
        display: none;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    /*over*/
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
    /*over*/

    .pl-table .green,
    .pl-table .pl-num .green {
        color: #36a171
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


    .jiang,.sheng{position:relative}
    [data-dpr="1"] .jiang,[data-dpr="1"] .sheng{font-size:12px}
    [data-dpr="2"] .jiang,[data-dpr="2"] .sheng{font-size:24px}
    [data-dpr="3"] .jiang,[data-dpr="3"] .sheng{font-size:36px}
    .jiang:after,.sheng:after{position:absolute;right:-.466667rem;top:-.106667rem}
    [data-dpr="1"] .jiang:after,[data-dpr="1"] .sheng:after{font-size:12px}
    [data-dpr="2"] .jiang:after,[data-dpr="2"] .sheng:after{font-size:24px}
    [data-dpr="3"] .jiang:after,[data-dpr="3"] .sheng:after{font-size:36px}
    .sheng:after{content:'升';color:#d3553d}
    .jiang:after{content:'降';color:#36a171}

</style>
