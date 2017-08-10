
<template>
    <div v-if="daxiaofen">
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tbody><tr>
                    <th width="18%">公司</th>
                    <th width="10%"></th>
                    <th width="22%">大分</th>
                    <th width="22%">盘口</th>
                    <th width="26%">小分</th>
                    <th width=""></th>
                </tr>
                </tbody></table>
        </div>
        <no-data v-if="!daxiaofen || !daxiaofen.odds || !daxiaofen.odds.length"></no-data>

        <div class="pl-box-bd" v-if="daxiaofen && daxiaofen.odds && daxiaofen.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <colgroup>
                    <col width="18%">
                    <col width="10%">
                    <col width="22%">
                    <col width="22%">
                    <col width="26%">
                    <col width="">
                </colgroup>
                <tbody>
                <tr v-for="info in daxiaofen.odds" v-tap="{methods:viewOddsDetail,cid:info.cid}">
                    <!--v-on="click: redirect('#/basketballdetail/' + tab + '/' + match.fid + '/zongfen/' + info.cid)">-->
                    <td >
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td width="7%" class="carriage">
                    </td>
                    <td width="22%" class="carriage">
                        <p class="color6 f24" :class="{'red': info.first.b == 1, 'green': info.first.b == -1}">{{info.first.big}}</p>

                        <p class="f24" :class="{'red': info.end.b == 1, 'green': info.end.b == -1}">{{info.end.big}}</p>

                    </td>
                    <td width="22%" class="carriage">
                        <p class="color6 f24">{{info.first.handi}}</p>

                        <p class="color6 f24">{{info.end.handi}}</p>

                    </td>
                    <td width="26%" class="carriage">
                        <p class="color6 f24" :class="{'red': info.first.s == 1, 'green': info.first.s == -1}">{{info.first.small}}</p>

                        <p class="f24" :class="{'red': info.end.s == 1, 'green': info.end.s == -1}">{{info.end.small}}</p>

                    </td>
                    <td ></td>

                </tr>
                </tbody>
            </table>
        </div>
        <odds-skbtips v-if="daxiaofen.odds && daxiaofen.odds.length" :all="daxiaofen.all_num||0" :main="daxiaofen.main_num || 0"></odds-skbtips>
    </div>
    <item-loader v-else></item-loader>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import noData from '~components/no_data.vue'
    import oddsInfo from '~components/detail/basketball/odds/oddsInfo.vue'
    import oddsSkbtips from '~components/detail/oddsSkbtips.vue'
    import itemLoader from '~components/detail/itemLoader.vue'

    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getOddsPoints, {
                fid: params.fid
            })
        },
        components: {
            noData, itemLoader, oddsSkbtips
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            daxiaofen () {
                return this.$store.state.lqdetail.odds && this.$store.state.lqdetail.odds.points
            }
        },
        methods: {
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')

                await this.$store.dispatch(aTypes.getOddsPoints, {
                    fid: this.$route.params.fid
                })
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                // console.log(cid);
                if (cid === '-1') return
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.daxiaofen.odds,
                        type: 'zongfen'
                    }
                })
            }
        },
        watch: {
            loaded (loaded) {
                this.refreshScroll()
            },
            refreshTime () {
                this.fetchData()
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>

<style scoped>
    .pl-box-hd {
        background: #fff;
        border-top: 1px solid #f4f4f4
    }
    .pl-box-hd table th {
        border-bottom: 1px solid #f4f4f4
    }
    .pl-table {
        background: #fff
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
    .pl-box-bd {
        background: #fff;
        border-bottom: 1px solid #f1f1f1
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
    [data-dpr="1"] .pl-table .f24 {
        font-size: 12px
    }

    [data-dpr="2"] .pl-table .f24 {
        font-size: 24px
    }

    [data-dpr="3"] .pl-table .f24 {
        font-size: 36px
    }

    .pl-table .pl-num {
        color: #aab5bd
    }

    .pl-table .pl-num span {
        display: inline-block;
        color: #242c35
    }

    .pl-table .green,
    .pl-table .pl-num .green {
        color: #36a171
    }

    .pl-table .pl-num .red,
    .pl-table .red {
        color: #d3553d
    }

    .pl-table .pl-return {
        display: block;
        color: #242c35
    }




</style>
