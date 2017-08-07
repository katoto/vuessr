<template>
    <div>

        <div class="gl-box box-bsyp">
            <div class="gl-nav">泊松亚盘</div>
            <template v-if="poissonInfo&&poissonInfo.aomen">
                <div class="dataBox">
                    <span class="dataTit f22">澳门初盘</span>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{poissonInfo.aomen.home}}</em>
                        </li>
                        <li class="itemC">
                            <span class="item-tit">{{poissonInfo.aomen.handi}}</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{poissonInfo.aomen.away}}</em>
                        </li>
                    </ul>
                    <span class="dataTit f22">泊松推算盘</span>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num " drunk-class="{'red2':poissonInfo.poisson.home>poissonInfo.aomen.home,'green2':poissonInfo.poisson.home<poissonInfo.aomen.home}">{{poissonInfo.poisson.home}}</em>
                        </li>
                        <li class="itemC">
                            <span class="item-tit">{{poissonInfo.poisson.handi}}</span>
                        </li>
                        <li class="itemR">
                            <em class="num " drunk-class="{'red2':poissonInfo.poisson.away>poissonInfo.aomen.away,'green2':poissonInfo.poisson.away<poissonInfo.aomen.away}">{{poissonInfo.poisson.away}}</em>
                        </li>
                    </ul>
                </div>
                <div class="infoTips" v-if="poissonInfo.presnetations"><i class="icon"></i><p class="f24">{{poissonInfo.presnetations}}</p>	</div>
            </template>
            <div class="feed-back" v-if="poissonInfo&&!poissonInfo.aomen">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <div class="item-loader" v-if="!poissonInfo">
                <div class="la-ball-pulse la-2x">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="gl-box box-tongp">
            <div class="zj-nav">
                <span class="i-po">同赔分析</span>
            </div>
            <template v-if="probability&&probability.rate">
                <div class="dataBox">
                    <ul class="dataItem">
                        <li class="itemL" :class="{red2: probability.rate[0] > probability.rate[1] && probability.rate[0] > probability.rate[2]}">
                            <em class="num">{{probability.rate[0]}}</em>
                            <span>%</span>
                            <span class="item-info">主胜</span>
                        </li>
                        <li class="itemC" :class="{red2: probability.rate[0] < probability.rate[1] && probability.rate[1] > probability.rate[2]}">
                            <em class="num">{{probability.rate[1]}}</em>
                            <span>%</span>
                            <span class="item-info">平局</span>
                        </li>
                        <li class="itemR" :class="{red2: probability.rate[2] > probability.rate[1] && probability.rate[0] < probability.rate[2]}">
                            <em class="num">{{probability.rate[2]}}</em>
                            <span>%</span>
                            <span class="item-info">主负</span>
                        </li>
                    </ul>
                </div>

                <div class="opgl-tips clear">
                    <p class="color9">
                        场均初赔：
                        <span class="chupei">{{probability.avar_first_odds[0].toFixed(2)}}</span>
                        <span class="chupei">{{probability.avar_first_odds[1].toFixed(2)}}</span>
                        <span class="chupei">{{probability.avar_first_odds[2].toFixed(2)}}</span>
                    </p>

                    <p class="color9">
                        场均终赔：
                        <span class="chupei">{{probability.avar_last_odds[0].toFixed(2)}}</span>
                        <span class="chupei">{{probability.avar_last_odds[1].toFixed(2)}}</span>
                        <span class="chupei">{{probability.avar_last_odds[2].toFixed(2)}}</span>
                    </p>
                    <span class="color78 fr yb-btn" v-tap="{methods: showHisSampleDetail}">历史样本详情&gt;</span>
                </div>
            </template>

            <div class="feed-back" v-if="probability&&!probability.rate">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <div class="item-loader" v-if="!probability">
                <div class="la-ball-pulse la-2x">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="gl-box box-panl" >
            <div class="gl-nav">盘路特征对比</div>
            <template v-if="handicapFeature&&handicapFeature.europe">
                <div class="dataBox">
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{handicapFeature.europe.h_prob}}</em>
                            <span v-if="handicapFeature.europe.h_prob != '--'">%</span>
                            <span class="item-info">{{handicapFeature.europe.h_option}}</span>
                        </li>
                        <li class="itemC">
                            <em class="item-tit">欧赔盘</em>
                            <span class="item-info">出现概率最高</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{handicapFeature.europe.a_prob}}</em>
                            <span v-if="handicapFeature.europe.a_prob != '--'">%</span>
                            <span class="item-info">{{handicapFeature.europe.a_option}}</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{handicapFeature.rangqiu.h_prob}}</em>
                            <span v-if="handicapFeature.rangqiu.h_prob">%</span>
                            <span class="item-info">{{handicapFeature.rangqiu.h_option}}</span>
                        </li>
                        <li class="itemC">
                            <em class="item-tit">让球盘</em>
                            <span class="item-info">赢盘率</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{handicapFeature.rangqiu.a_prob}}</em>
                            <span v-if="handicapFeature.rangqiu.a_prob">%</span>
                            <span class="item-info">{{handicapFeature.rangqiu.a_option}}</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{handicapFeature.daxiao.h_prob}}</em>
                            <span v-if="handicapFeature.daxiao.h_prob">%</span>
                            <span class="item-info">{{handicapFeature.daxiao.h_option}}</span>
                        </li>
                        <li class="itemC">
                            <em class="item-tit">大小盘</em>
                            <span class="item-info">大球率</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{handicapFeature.daxiao.a_prob}}</em>
                            <span v-if="handicapFeature.daxiao.a_prob">%</span>
                            <span class="item-info">{{handicapFeature.daxiao.a_option}}</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{handicapFeature.jinqiu.h_prob}}</em>
                            <span>球</span>
                            <span class="item-info">{{handicapFeature.jinqiu.h_option}}</span>
                        </li>
                        <li class="itemC">
                            <em class="item-tit">总进球数</em>
                            <span class="item-info">出现次数最多</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{handicapFeature.jinqiu.a_prob}}</em>
                            <span>球</span>
                            <span class="item-info">{{handicapFeature.jinqiu.a_option}}</span>
                        </li>
                    </ul>
                </div>
                <div class="bili-tips">数据来自本赛事主客场相同的近期比赛统计</div>
            </template>

            <div class="feed-back" v-if="handicapFeature&&!handicapFeature.europe">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <div class="item-loader" v-if="!handicapFeature">
                <div class="la-ball-pulse la-2x">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <!-- TODO 这里后面需要补上
        <div class="gl-box" drunk-if="from!='app_online'&&(hasUserBetPercent_spf || hasUserBetPercent_nspf)">
            <div class="zj-nav">用户投注比例</div>
            <div class="bili-box">
                &lt;!&ndash;账户圆环 start&ndash;&gt;

                <div class="wdl-box">
                    <div class="wins">
                <span class="wdl-bili">
                <em class="wdl-mun" drunk-number-counter="userBetPercent[chartType].win * 100|toInt"
                    counter-step="3"></em>
                <em class="wdl-bfh">%</em>
                </span>
                        <span class="wdl-tips">胜</span>
                    </div>
                    <div class="draws">
                  <span class="wdl-bili">
                <em class="wdl-mun" drunk-number-counter="userBetPercent[chartType].draw * 100|toInt"
                    counter-step="3"></em>
                <em class="wdl-bfh">%</em>
                        </span>
                        <span class="wdl-tips">平</span>
                    </div>
                    <div class="losses">
                <span class="wdl-bili">
                <em class="wdl-mun" drunk-number-counter="userBetPercent[chartType].loss * 100|toInt"
                    counter-step="3"></em>
                <em class="wdl-bfh">%</em>
                    </span>
                        <span class="wdl-tips">负</span>
                    </div>
                </div>
                <div class="bili-tips">数据来自500.com用户竞彩投注统计</div>
            </div>
        </div>-->
        <div class="gl-box">
            <div class="gl-nav">冷热分布</div>
            <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb"  v-if="coldHotInfo&&coldHotInfo.win">
                <tbody><tr>
                    <th>选项</th>
                    <th width="22%">百家欧赔</th>
                    <th width="22%">必发</th>
                    <th width="18%">人气</th>
                </tr>
                <tr>
                    <td><em class="f24">主胜</em></td>
                    <td>{{coldHotInfo.win.europe?(coldHotInfo.win.europe+'%'):'--'}}</td>
                    <td>{{coldHotInfo.win.betfair?(coldHotInfo.win.betfair+'%'):'--'}}</td>
                    <td>{{coldHotInfo.win.renqi?(coldHotInfo.win.renqi+'%'):'--'}}</td>
                </tr>
                <tr>
                    <td><em class="f24">平局</em></td>
                    <td>{{coldHotInfo.draw.europe?(coldHotInfo.draw.europe+'%'):'--'}}</td>
                    <td>{{coldHotInfo.draw.betfair?(coldHotInfo.draw.betfair+'%'):'--'}}</td>
                    <td>{{coldHotInfo.draw.renqi?(coldHotInfo.draw.renqi+'%'):'--'}}</td>
                </tr>
                <tr>
                    <td><em class="f24">主负</em></td>
                    <td>{{coldHotInfo.lost.europe?(coldHotInfo.lost.europe+'%'):'--'}}</td>
                    <td>{{coldHotInfo.lost.betfair?(coldHotInfo.lost.betfair+'%'):'--'}}</td>
                    <td>{{coldHotInfo.lost.renqi?(coldHotInfo.lost.renqi+'%'):'--'}}</td>
                </tr>
                </tbody></table>
            <div class="feed-back" v-if="coldHotInfo&&!coldHotInfo.win">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <div class="item-loader" v-if="!coldHotInfo">
                <div class="la-ball-pulse la-2x">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <skbtips></skbtips>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'

    import HistorySample from '~components/detail/football/analysis/historySample.vue'
    import skbtips from '~components/detail/skbtips.vue'
    export default {
        async asyncData ({store, route: {params}}) {
            const {stageid, matchtime, homeid, awayid, league_id} = store.state.zqdetail.baseInfo
            const matchdate = matchtime.substr(0, 10)
            await store.dispatch(aTypes.getAnalysisPm, {
                homeid,
                awayid,
                stid: stageid,
                matchdate,
                fid: params.fid,
                leagueid: league_id
            })
        },
        data () {
            return {
                strengthInfoContentVisible: false
            }
        },
        components: {
            skbtips
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                const {stageid, matchtime, homeid, awayid, league_id} = this.$store.state.zqdetail.baseInfo
                const matchdate = matchtime.substr(0, 10)
                await this.$store.dispatch(aTypes.getAnalysisPm, {
                    homeid,
                    awayid,
                    stid: stageid,
                    matchdate,
                    fid: this.$route.params.fid,
                    leagueid: league_id
                })
                this.$store.commit('endOneRefresh')
            },
            showHisSampleDetail () {
                this.$store.commit(mTypes.setDialog, {
                    component: HistorySample,
                    params: {
                        probability: this.probability
                    }})
            },
            toggleFightingInfoResultType () {
                const arr = ['result1', 'result2', 'result3']
                let idx = arr.indexOf(this.fightingInfoResultType)
                this.fightingInfoResultType = arr[(idx + 1) % 3]
            }
        },
        mounted () {
            this.fetchData()
        },
        watch: {
            refreshTime () {
                this.fetchData()
            },
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime)
                }
            },
            strengthInfoContentVisible () {
                this.$store.commit(mTypes.updateScTime)
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            },
            pm () {
                return this.$store.state.zqdetail.analysis.pm
            },
            poissonInfo () {
                return this.pm.poisson
            },
            probability () {
                return this.pm.avrodds
            },
            handicapFeature () {
                return this.pm.handicapFeature
            },
            coldHotInfo () {
                return this.pm.coldHot
            }
        },
        filters: {
            truncate: (val, num) => {
                if (val.length > num) {
                    return val.substr(0, num) + '...'
                } else {
                    return val
                }
            }
        }
    }
</script>
<style scoped>
    .zhzl-vs div:first-child.zhzl-green .hh {
        border-top: .16rem solid #5c788f;
        border-right: .16rem solid transparent;
        right: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        z-index: 1
    }

    .zhzl-vs div:last-child.zhzl-green .hh {
        border-top: .17rem solid #5c788f;
        border-left: .16rem solid transparent;
        left: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0
    }


    .gl-box,
    .zr-box {
        background: #fff
    }
    .dataBox {
        padding: .4rem .4rem .266667rem .4rem;
        border-bottom: 1px solid #f4f4f4;
        text-align: center
    }

    .dataItem {
        display: table;
        height: 1.333333rem;
        width: 100%
    }

    .dataItem li {
        display: table-cell;
        color: #515e6d;
        vertical-align: middle;
        height: 1.733333rem
    }
    .dataItem .itemL {
        text-align: left;
        width: 2.8rem;
        padding-left: .4rem
    }

    .dataItem .itemC {
        text-align: center;
        color: #aab5bd
    }

    .dataItem .itemR {
        text-align: right;
        width: 2.8rem;
        padding-right: .4rem
    }

    [data-dpr="1"] .dataItem .num {
        font-size: 23px
    }

    [data-dpr="2"] .dataItem .num {
        font-size: 46px
    }

    [data-dpr="3"] .dataItem .num {
        font-size: 69px
    }
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


    .opgl-tips {
        border-top: 1px solid #f4f4f4;
        padding: .266667rem .4rem;
        position: relative
    }

    [data-dpr="1"] .opgl-tips {
        font-size: 11px
    }

    [data-dpr="2"] .opgl-tips {
        font-size: 22px
    }

    [data-dpr="3"] .opgl-tips {
        font-size: 33px
    }

    .opgl-tips p {
        line-height: .48rem;
        color: #515e6d
    }
    .chupei {
        padding-right: .133333rem
    }
    .color9{color: #999;}
    .opgl-tips .yb-btn {
        position: absolute;
        top: .266667rem;
        right: .4rem;
        display: block;
        line-height: .48rem;
        color: #515e6d
    }
    /*清除浮动*/
    .clear {
        zoom: 1
    }
    .clear:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }
    /*over*/
    .feed-box {
        color: #787878;
        line-height: 1.733333rem;
        text-align: center
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
    .dataTit {
        position: relative;
        margin: .533333rem auto 0;
        padding: 0 14px;
        display: inline-block;
        color: #aab5bd
    }

    .dataTit:first-child {
        margin-top: .266667rem
    }

    .dataTit:after,
    .dataTit:before {
        content: '';
        display: block;
        width: .4rem;
        height: 1px;
        overflow: hidden;
        background: #bbc4ca;
        position: absolute;
        top: 50%
    }

    .dataTit:before {
        left: -.533333rem
    }

    .dataTit:after {
        right: -.533333rem
    }
    .dataItem .item-tit {
        color: #242c35;
        display: block;
        height: .72rem;
        line-height: .72rem
    }

    [data-dpr="1"] .dataItem .item-tit {
        font-size: 16px
    }

    [data-dpr="2"] .dataItem .item-tit {
        font-size: 32px
    }

    [data-dpr="3"] .dataItem .item-tit {
        font-size: 48px
    }
    .box-bsyp .dataItem li {
        height: 1.333333rem
    }

    [data-dpr="1"] .box-bsyp .dataItem .num {
        font-size: 18px
    }

    [data-dpr="2"] .box-bsyp .dataItem .num {
        font-size: 36px
    }

    [data-dpr="3"] .box-bsyp .dataItem .num {
        font-size: 54px
    }

    [data-dpr="1"] .box-panl .dataItem .item-tit {
        font-size: 13px
    }

    [data-dpr="2"] .box-panl .dataItem .item-tit {
        font-size: 26px
    }

    [data-dpr="3"] .box-panl .dataItem .item-tit {
        font-size: 39px
    }

    .box-panl .dataBox {
        border-bottom: 0
    }
    .dataItem .red2 {
        color: #d3553d
    }
    .dataItem .green2 {
        color: #36a171
    }


    .dataItem .item-info{display:block;color:#aab5bd}
    .bili-tips{line-height:.96rem;color:rgba(170,181,189,.5);text-align:center}
    [data-dpr="1"] .bili-tips{font-size:10px}
    [data-dpr="2"] .bili-tips{font-size:20px}
    [data-dpr="3"] .bili-tips{font-size:30px}
</style>