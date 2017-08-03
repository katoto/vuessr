<template>
    <div v-if="bifa">
        <div class="bifa-stat">
            <div class="gl-nav">
                必发数据
            </div>
            <table v-if="bifa.spdex_data" cellspacing="0" cellpadding="0" border="0" class="fx-table" width="100%">
                <tbody>
                <tr>
                    <th>选项</th>
                    <th width="16%">成交价</th>
                    <th width="26%">交易量</th>
                    <th width="26%">庄家盈亏</th>
                    <th width="15%">冷热</th>
                </tr>
                <tr>
                    <td>主胜</td>
                    <td>{{bifa.spdex_data.win.price}}</td>
                    <td>{{bifa.spdex_data.win.amount}}</td>
                    <td><span
                            :class="{'red2':bifa.spdex_data.win.profit!='0'&&bifa.spdex_data.win.profit.indexOf('-')==-1,'green2':bifa.spdex_data.win.profit!='0'&&bifa.spdex_data.win.profit.indexOf('-')>-1}">{{bifa.spdex_data.win.profit}}</span>
                    </td>
                    <td>{{bifa.spdex_data.win.exp}}</td>
                </tr>
                <tr>
                    <td>平</td>
                    <td>{{bifa.spdex_data.draw.price}}</td>
                    <td>{{bifa.spdex_data.draw.amount}}</td>
                    <td><span
                            :class="{'red2':bifa.spdex_data.draw.profit!='0'&&bifa.spdex_data.draw.profit.indexOf('-')==-1,'green2':bifa.spdex_data.draw.profit!='0'&&bifa.spdex_data.draw.profit.indexOf('-')>-1}">{{bifa.spdex_data.draw.profit}}</span>
                    </td>
                    <td>{{bifa.spdex_data.draw.exp}}</td>
                </tr>
                <tr>
                    <td>主负</td>
                    <td>{{bifa.spdex_data.lost.price}}</td>
                    <td>{{bifa.spdex_data.lost.amount}}</td>
                    <td><span
                            :class="{'red2':bifa.spdex_data.lost.profit!='0'&&bifa.spdex_data.lost.profit.indexOf('-')==-1,'green2':bifa.spdex_data.lost.profit!='0'&&bifa.spdex_data.lost.profit.indexOf('-')>-1}">{{bifa.spdex_data.lost.profit}}</span>
                    </td>
                    <td>{{bifa.spdex_data.lost.exp}}</td>
                </tr>
                </tbody>
            </table>
            <div class="infoTips" v-if="bifa.presentations">
                <i class="icon"></i>
                <p class="f24">{{bifa.presentations}}</p>
            </div>
            <div class="feed-back" v-if="!bifa.spdex_data">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>

        </div>
        <div class="bifa-stat bifa-volume">
            <div class="gl-nav clear">
                交易数据
            </div>
            <div class="volumeBox" v-if="bifa.all_trade.pie_chart">
                <div class="bili-box">
                    <div class="chart into">
                        <echart-pip  class="volumeChart" :data="[
                   {'value':bifa.all_trade.pie_chart.win_percent,'name':'胜'},
                   {'value':bifa.all_trade.pie_chart.draw_percent,'name':'平'},
                   {'value':bifa.all_trade.pie_chart.lost_percent,'name':'负'}
                 ]"></echart-pip>
                        <div class="info">
                            <em class="f34">{{bifa.all_trade.pie_chart.all_amount}}</em>
                            <p class="f22">总交易[港币]</p>
                        </div>
                    </div>
                    <div class="wdl-box">
                        <div class="wins"><span class="wdl-bili"><em class="wdl-mun">{{bifa.all_trade.pie_chart.win_percent}}</em> <em
                                class="wdl-bfh">%</em></span> <span class="wdl-tips">胜</span> <span
                                class="wdl-count f20">{{bifa.all_trade.pie_chart.win_amount}}</span></div>
                        <div class="draws"><span class="wdl-bili"><em class="wdl-mun">{{bifa.all_trade.pie_chart.draw_percent}}</em> <em
                                class="wdl-bfh">%</em></span> <span class="wdl-tips">平</span> <span
                                class="wdl-count f20">{{bifa.all_trade.pie_chart.draw_amount}}</span></div>
                        <div class="losses"><span class="wdl-bili"><em class="wdl-mun">{{bifa.all_trade.pie_chart.lost_percent}}</em> <em
                                class="wdl-bfh">%</em></span> <span class="wdl-tips">负</span> <span
                                class="wdl-count f20">{{bifa.all_trade.pie_chart.lost_amount}}</span></div>
                    </div>
                </div>
                <p class="bili-tips">

                </p>
                <div class="volumeAll">
                    <echart-big-trade class="all-qushi1" name1="主胜" name2="平" name3="主负" :data1="bifa.all_trade.line_chart.win_gram" :data2="bifa.all_trade.line_chart.draw_gram"
                    :data3="bifa.all_trade.line_chart.lost_gram" :start-time="bifa.all_trade.line_chart.start_time" :end-time="bifa.all_trade.line_chart.curr_time"></echart-big-trade>

                    <echart-all-trade class="all-qushi1" :data="bifa.all_trade.line_chart.amount_gram" name="交易总量"></echart-all-trade>

                </div>
            </div>
            <div class="volumeBox" v-if="bifa.big_trade">
                <div class="bili-box">
                    <div class="chart into">
                        <echart-pip  class="volumeChart" :data="[
                   {'value':bifa.big_trade.pie_chart.win_percent,'name':'胜'},
                   {'value':bifa.big_trade.pie_chart.draw_percent,'name':'平'},
                   {'value':bifa.big_trade.pie_chart.lost_percent,'name':'负'}
                 ]"></echart-pip>
                        <div class="info">
                            <em class="f34">{{bifa.big_trade.pie_chart.all_amount}}</em>
                            <p class="f22">大额交易[港币]</p>
                        </div>
                    </div>
                    <div class="wdl-box">
                        <div class="wins"><span class="wdl-bili"><em class="wdl-mun">{{bifa.big_trade.pie_chart.win_percent}}</em> <em
                                class="wdl-bfh">%</em></span> <span class="wdl-tips">胜</span> <span
                                class="wdl-count f20">{{bifa.big_trade.pie_chart.win_amount}}</span></div>
                        <div class="draws"><span class="wdl-bili"><em class="wdl-mun">{{bifa.big_trade.pie_chart.draw_percent}}</em> <em
                                class="wdl-bfh">%</em></span> <span class="wdl-tips">平</span> <span
                                class="wdl-count f20">{{bifa.big_trade.pie_chart.draw_amount}}</span></div>
                        <div class="losses"><span class="wdl-bili"><em class="wdl-mun">{{bifa.big_trade.pie_chart.lost_percent}}</em> <em
                                class="wdl-bfh">%</em></span> <span class="wdl-tips">负</span> <span
                                class="wdl-count f20">{{bifa.big_trade.pie_chart.lost_amount}}</span></div>
                    </div>
                </div>
                <div class="volumeAll">
                    <echart-big-trade-bar class="dae-fenbu" name1="买入" name2="卖出" :data1="[bifa.big_trade.line_chart.win_buy,bifa.big_trade.line_chart.draw_buy,bifa.big_trade.line_chart.lost_buy]"
                                          :data2="[bifa.big_trade.line_chart.win_sell,bifa.big_trade.line_chart.draw_sell,bifa.big_trade.line_chart.lost_sell]"></echart-big-trade-bar>

                </div>
                <h4 class="bili-tit">近10笔大额交易明细</h4>
                <table cellspacing="0" cellpadding="0" border="0" class="fx-table" width="100%">
                    <tbody>
                    <tr>
                        <th>时间</th>
                        <th width="18%">选项</th>
                        <th width="25%">交易量</th>
                        <th width="18%">操作</th>
                    </tr>
                    <tr v-for="item in bifa.big_trade.line_chart.trade_list">
                        <td>{{item.tradetime.substring(5,16)}}</td>
                        <td v-if="item.choice=='3'">主胜</td>
                        <td v-if="item.choice=='1'">平</td>
                        <td v-if="item.choice=='0'">主负</td>
                        <td>{{item.amount}}</td>
                        <td>
                            <span v-if="item.buysell==='1'" class="red2">买入</span>
                            <span v-if="item.buysell==='2'">卖出</span>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <div class="feed-back" v-if="!bifa.all_trade && !bifa.big_trade">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import echartPip from '~components/detail/football/odds/echartPip.vue'
    import echartBigTrade from '~components/detail/football/odds/echartBigTrade.vue'
    import echartBigTradeBar from '~components/detail/football/odds/echartBigTradeBar.vue'
    import echartAllTrade from '~components/detail/football/odds/echartAllTrade.vue'

    export default {
        async asyncData ({store, route: {params: {fid}}}) {
            await store.dispatch(aTypes.getOddsBifa, fid)
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getOddsBifa, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            }
        },
        components: {
            echartPip, echartBigTrade, echartAllTrade, echartBigTradeBar
        },
        data () {
            return {
                bifaTab: 'big'
            }
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
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            bifa () {
                return this.$store.state.zqdetail.odds.bifa
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
    .bifa-stat,
    .bifa-volume {
        background: #fff
    }
    /*小标题 start*/
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }
    /*over*/
    .fx-table {
        margin-top: .053333rem
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

    .red2 {
        color: #d3553d
    }

    .green2 {
        color: #36a171
    }
    /*提点*/
    .infoTips {
        padding: .266667rem .4rem;
        line-height: .533333rem;
        color: #515e6d;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-top: 1px solid #f4f4f4
    }

    .infoTips .icon {
        display: block;
        width: .88rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/icon_sprite.png) no-repeat -.613333rem 0;
        background-size: 1.92rem;
        margin-top: .106667rem
    }

    .infoTips p {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-left: .213333rem
    }
    .bifa-stat,
    .bifa-volume {
        background: #fff
    }
    .bili-box {
        position: relative;
        padding: .8rem 0;
        border-bottom: 1px solid #f4f4f4
    }
    .bili-tips {
        line-height: .96rem;
        color: rgba(170, 181, 189, .5);
        text-align: center
    }

    [data-dpr="1"] .bili-tips {
        font-size: 10px
    }

    [data-dpr="2"] .bili-tips {
        font-size: 20px
    }

    [data-dpr="3"] .bili-tips {
        font-size: 30px
    }
    .volumeAll {
        padding: .533333rem .4rem
    }
    .bifa-volume .volumeAll {
        padding-bottom: 0
    }

    .all-qushi1,
    .all-qushi2,
    .dae-fenbu {
        height: 5.866667rem;
        width: 9.2rem;
        margin-bottom: .266667rem
    }
    .volumeChart {
        width: 3.333333rem;
        height: 3.333333rem
    }
    .chart .info {
        width: 2.4rem;
        height: .4rem;
        background-position: center -1.96rem;
        position: absolute;
        bottom: 1.7rem;
        left: 50%;
        margin-left: -1.2rem;
        z-index: 3;
        text-align: center;
        color: #aab5bd
    }

    .chart .info em {
        display: block;
        color: #515e6d
    }
    .wdl-box {
        position: absolute;
        right: 2.213333rem;
        top: 1.16rem
    }
    .bifa-volume .wdl-box {
        left: 5.8rem;
        right: auto;
        width: 4.3rem
    }
    .wins {
        color: #d3553d
    }

    .draws {
        color: #36a171
    }

    .losses {
        color: #437ba8
    }

    .wins span {
        display: inline-block;
        vertical-align: middle
    }

    .wdl-bili {
        display: inline-block;
        width: 1.626667rem;
        margin-right: .2rem
    }
    .wdl-bili .wdl-bfh,
    .wdl-bili .wdl-mun {
        position: relative;
        top: .026667rem
    }

    [data-dpr="1"] .wdl-bfh {
        font-size: 12px
    }

    [data-dpr="2"] .wdl-bfh {
        font-size: 24px
    }

    [data-dpr="3"] .wdl-bfh {
        font-size: 36px
    }

    .wdl-tips {
        color: #aab5bd
    }
    .wdl-mun {
        font-size: .5067rem
    }
    .wdl-count {
        color: #aab5bd;
        margin-left: .266667rem
    }
    .bifa-volume .chart {
        margin-left: .8rem
    }
    .chart {
        position: relative;
        width: 3.326667rem;
        height: 3.326667rem;
        margin-left: 1.946667rem
    }
    .draws,
    .losses,
    .wins {
        font-size: 0;
        line-height: .746667rem;
        position: relative
    }
    .draws:after,
    .losses:after,
    .wins:after {
        width: .146667rem;
        height: .146667rem;
        content: '';
        position: absolute;
        left: -.266667rem;
        top: .333333rem
    }
    .wins-k,
    .wins:after {
        background: #d3553d
    }
    .draws-k,
    .draws:after {
        background: #36a171
    }
    .losses-k,
    .losses:after {
        background: #437ba8
    }
    /*over*/



</style>