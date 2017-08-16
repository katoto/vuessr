<template>
    <div v-if="asian">
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tbody>
                <tr>
                    <th width="18%">公司</th>
                    <th width="15%"></th>
                    <th width="20%">水</th>
                    <th>盘口</th>
                    <th width="20%">水</th>
                </tr>
                </tbody>
            </table>
        </div>
        <no-data v-if="!asian.odds || !asian.odds.length"></no-data>

        <div class="pl-box-bd" v-if="asian.odds && asian.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">


                <colgroup>
                    <col width="18%">
                    <col width="15%">
                    <col width="20%">
                    <col width="">
                    <col width="20%">
                </colgroup>
                <tbody>

                <tr :class="{'yebg': info.cid === $route.query.cid}" v-for="info,idx in asian.odds"
                    v-tap="{methods: viewOddsDetail, cid: info.cid}">
                    <td>
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td></td>
                    <td class="carriage">
                        <span class="color6 f24"
                              :class="{'red': info.first.s1 == 1, 'green': info.first.s1 == -1}">{{info.first.home|nullFormat}}</span><br>

                        <span class="f24" :class="{'red': info.end.s1 == 1, 'green': info.end.s1 == -1}">{{info.end.home|nullFormat}}</span>
                    </td>
                    <td class="carriage">
                        <span class="color6 f24"
                              :class="{'sheng': info.first.pk == 1, 'jiang': info.first.pk == -1}">{{info.first.handi|nullFormat}}</span><br>

                        <span class="color6 f24" :class="{'sheng': info.end.pk == 1, 'jiang': info.end.pk == -1}">{{info.end.handi|nullFormat}}</span>
                    </td>
                    <td class="carriage">
                        <span class="color6 f24"
                              :class="{'red': info.first.s2 == 1, 'green': info.first.s2 == -1}">{{info.first.away|nullFormat}}</span><br>

                        <span class="f24" :class="{'red': info.end.s2 == 1, 'green': info.end.s2 == -1}">{{info.end.away|nullFormat}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <odds-skbtips v-if="asian.odds && asian.odds.length" :main="asian.main_num" :all="asian.all_num"></odds-skbtips>
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
        //            await store.dispatch(aTypes.getOddsAsian, params.fid)
        },
        components: {
            noData, itemLoader, oddsSkbtips
        },
        watch: {
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime) // 更新自定义滚动组件
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
                await this.$store.dispatch(aTypes.getOddsAsian, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.asian.odds,
                        type: 'asian'
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
            asian () {
                return this.$store.state.zqdetail.odds.asian
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
