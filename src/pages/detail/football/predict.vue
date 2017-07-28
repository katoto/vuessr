<template>
    <div>
        <div class="gl-box box-yc" v-if="predictEurope">
            <div class="gl-nav">胜平负 <span class="yc-more"></span></div>
            <div class="box-ycInner">
                <template v-if="predictEurope.outter">
                    <div class="dataBox" v-tap="{methods: selectTab, tab: 'europe'}">
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictEurope.outter.result.pw>predictEurope.outter.result.pd&&predictEurope.outter.result.pw>predictEurope.outter.result.pl}">
                                <em class="num">{{predictEurope.outter.result.pw}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">主胜</span>
                            </li>
                            <li class="itemC"
                                :class="{'red2':predictEurope.outter.result.pd>predictEurope.outter.result.pw&&predictEurope.outter.result.pd>predictEurope.outter.result.pl}">
                                <em class="num">{{predictEurope.outter.result.pd}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">平</span>
                            </li>
                            <li class="itemR"
                                :class="{'red2':predictEurope.outter.result.pl>predictEurope.outter.result.pw&&predictEurope.outter.result.pl>predictEurope.outter.result.pd}">
                                <em class="num">{{predictEurope.outter.result.pl}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">主负</span>
                            </li>
                        </ul>
                    </div>

                    <echart-bar-line v-if="predictEurope" v-tap="{methods: selectTab, tab: 'europe'}"  class="chart-yuce" name-bar="主胜概率" name-line="赔率趋势" :data-bar="predictEurope.outter.chart.nbars" :data-line="predictEurope.outter.chart.curve"></echart-bar-line>

                </template>

                <div class="feed-back" v-if="!predictEurope.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
            </div>
        </div>

        <div class="gl-box box-yc" v-if="predictAsian">
            <div class="gl-nav">
                亚盘{{predictAsian && predictAsian.inner && predictAsian.inner.this_match.curr_odds[1]?('（盘口：'+predictAsian.inner.this_match.curr_odds[1]+'）'):'--'}}
                <span class="yc-more" ></span></div>
            <div class="box-ycInner">
                <template v-if="predictAsian.outter">
                    <div class="dataBox" v-tap="{methods: selectTab, tab: 'asian'}">
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictAsian.outter.result.pw>predictAsian.outter.result.pd&&predictAsian.outter.result.pw>predictAsian.outter.result.pl}">
                                <em class="num">{{predictAsian.outter.result.pw}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">赢盘</span>
                            </li>
                            <li class="itemC"
                                :class="{'red2':predictAsian.outter.result.pd>predictAsian.outter.result.pw&&predictAsian.outter.result.pd>predictAsian.outter.result.pl}">
                                <em class="num">{{predictAsian.outter.result.pd}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">走盘</span>
                            </li>
                            <li class="itemR"
                                :class="{'red2':predictAsian.outter.result.pl>predictAsian.outter.result.pw&&predictAsian.outter.result.pl>predictAsian.outter.result.pd}">
                                <em class="num">{{predictAsian.outter.result.pl}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">输盘</span>
                            </li>
                        </ul>
                    </div>

                    <echart-bar-line v-tap="{methods: selectTab, tab: 'asian'}" class="chart-yuce" name-bar="赢盘概率" name-line="赔率趋势" :data-bar="predictAsian.outter.chart.nbars" :data-line="predictAsian.outter.chart.curve"></echart-bar-line>

                </template>

                <div class="feed-back" v-if="!predictAsian.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>

            </div>
        </div>

        <div class="gl-box box-yc" v-if="predictDaXiao">
            <div class="gl-nav">
                大小盘{{predictDaXiao.inner && predictDaXiao.inner.this_match.curr_odds[1]?('（盘口：'+predictDaXiao.inner.this_match.curr_odds[1]+'）'):''}}
                <span class="yc-more"></span>
            </div>
            <div class="box-ycInner">
                <template v-if="predictDaXiao.outter">
                    <div class="dataBox" v-tap="{methods: selectTab, tab: 'daxiao'}">
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictDaXiao.outter.result.pw>predictDaXiao.outter.result.pd&&predictDaXiao.outter.result.pw>predictDaXiao.outter.result.pl}">
                                <em class="num">{{predictDaXiao.outter.result.pw}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">大球</span>
                            </li>
                            <li class="itemC"
                                :class="{'red2':predictDaXiao.outter.result.pd>predictDaXiao.outter.result.pw&&predictDaXiao.outter.result.pd>predictDaXiao.outter.result.pl}">
                                <em class="num">{{predictDaXiao.outter.result.pd}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">走盘</span>
                            </li>
                            <li class="itemR"
                                :class="{'red2':predictDaXiao.outter.result.pl>predictDaXiao.outter.result.pw&&predictDaXiao.outter.result.pl>predictDaXiao.outter.result.pd}">
                                <em class="num">{{predictDaXiao.outter.result.pl}}</em>
                                <span class="numSub">%</span>
                                <span class="item-info2">小球</span>
                            </li>
                        </ul>
                    </div>

                    <echart-bar-line v-tap="{methods: selectTab, tab: 'daxiao'}"  class="chart-yuce" name-bar="大球概率" name-line="赔率趋势" :data-bar="predictDaXiao.outter.chart.nbars" :data-line="predictDaXiao.outter.chart.curve"></echart-bar-line>

                </template>

                <div class="feed-back" v-if="!predictDaXiao.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
            </div>

        </div>

        <div class="gl-box box-yc" v-if="predictScore">

            <div class="gl-nav">比分与进球 <span class="yc-more" ></span></div>
            <div class="box-ycInner box-yc-bifen">

                <template v-if="predictScore.outter">
                    <div class="dataBox" v-tap="{methods: selectTab, tab: 'score'}">
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictScore.outter.score[0].prob>predictScore.outter.score[1].prob&&predictScore.outter.score[0].prob>predictScore.outter.score[2].prob}">
                                <em class="num">{{predictScore.outter.score[0].prob}}</em> <span class="numSub">%</span> <span
                                    class="item-info2">{{predictScore.outter.score[0].score}}</span></li>
                            <li class="itemC"
                                :class="{'red2':predictScore.outter.score[1].prob>predictScore.outter.score[0].prob&&predictScore.outter.score[1].prob>predictScore.outter.score[2].prob}">
                                <em class="num">{{predictScore.outter.score[1].prob}}</em> <span class="numSub">%</span> <span
                                    class="item-info2">{{predictScore.outter.score[1].score}}</span></li>
                            <li class="itemR"
                                :class="{'red2':predictScore.outter.score[2].prob>predictScore.outter.score[0].prob&&predictScore.outter.score[2].prob>predictScore.outter.score[1].prob}">
                                <em class="num">{{predictScore.outter.score[2].prob}}</em> <span class="numSub">%</span> <span
                                    class="item-info2">{{predictScore.outter.score[2].score}}</span></li>
                        </ul>
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictScore.outter.nums[0].prob>predictScore.outter.nums[1].prob&&predictScore.outter.nums[0].prob>predictScore.outter.nums[2].prob}">
                                <em class="num">{{predictScore.outter.nums[0].prob}}</em> <span class="numSub">%</span> <span
                                    class="item-info2">{{predictScore.outter.nums[0].num}}球</span></li>
                            <li class="itemC"
                                :class="{'red2':predictScore.outter.nums[1].prob>predictScore.outter.nums[0].prob&&predictScore.outter.nums[1].prob>predictScore.outter.nums[2].prob}">
                                <em class="num">{{predictScore.outter.nums[1].prob}}</em> <span class="numSub">%</span> <span
                                    class="item-info2">{{predictScore.outter.nums[1].num}}球</span></li>
                            <li class="itemR"
                                :class="{'red2':predictScore.outter.nums[2].prob>predictScore.outter.nums[0].prob&&predictScore.outter.nums[2].prob>predictScore.outter.nums[1].prob}">
                                <em class="num">{{predictScore.outter.nums[2].prob}}</em> <span class="numSub">%</span> <span
                                    class="item-info2">{{predictScore.outter.nums[2].num}}球</span></li>
                        </ul>
                    </div>


                    <echart-position class="chart-yuce" style="height: 5.2rem" :name1="match.homesxname+'(主)'" :name2="match.awaysxname" :data1="predictScore.u.hu" :data2="predictScore.u.au"></echart-position>

                </template>


                <div class="feed-back" v-if="!predictScore.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
            </div>
        </div>

        <div class="gl-box box-yc" v-if="predictHalf">
            <div class="gl-nav">半场 <span class="yc-more" ></span></div>
            <div class="box-ycInner">
                <div class="dataBox" v-if="predictHalf.outter"  v-tap="{methods: selectTab, tab: 'half'}">
                    <ul class="dataItem">
                        <li class="itemL"
                            :class="{'red2':predictHalf.outter.prob.win>predictHalf.outter.prob.draw&&predictHalf.outter.prob.win>predictHalf.outter.prob.lost}">
                            <em class="num">{{predictHalf.outter.prob.win}}</em> <span class="numSub">%</span> <span
                                class="item-info2">主胜</span></li>
                        <li class="itemC"
                            :class="{'red2':predictHalf.outter.prob.draw>predictHalf.outter.prob.win&&predictHalf.outter.prob.draw>predictHalf.outter.prob.lost}">
                            <em class="num">{{predictHalf.outter.prob.draw}}</em> <span class="numSub">%</span> <span
                                class="item-info2">平</span></li>
                        <li class="itemR"
                            :class="{'red2':predictHalf.outter.prob.lost>predictHalf.outter.prob.draw&&predictHalf.outter.prob.lost>predictHalf.outter.prob.win}">
                            <em class="num">{{predictHalf.outter.prob.lost}}</em> <span class="numSub">%</span> <span
                                class="item-info2">主负</span></li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL"
                            :class="{'red2':predictHalf.outter.score[0].prob>predictHalf.outter.score[1].prob&&predictHalf.outter.score[0].prob>predictHalf.outter.score[2].prob}">
                            <em class="num">{{predictHalf.outter.score[0].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{predictHalf.outter.score[0].score}}</span></li>
                        <li class="itemC"
                            :class="{'red2':predictHalf.outter.score[1].prob>predictHalf.outter.score[0].prob&&predictHalf.outter.score[1].prob>predictHalf.outter.score[2].prob}">
                            <em class="num">{{predictHalf.outter.score[1].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{predictHalf.outter.score[1].score}}</span></li>
                        <li class="itemR"
                            :class="{'red2':predictHalf.outter.score[2].prob>predictHalf.outter.score[0].prob&&predictHalf.outter.score[2].prob>predictHalf.outter.score[1].prob}">
                            <em class="num">{{predictHalf.outter.score[2].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{predictHalf.outter.score[2].score}}</span></li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL"
                            :class="{'red2':predictHalf.outter.nums[0].prob>predictHalf.outter.score[1].prob&&predictHalf.outter.score[0].prob>predictHalf.outter.score[2].prob}">
                            <em class="num">{{predictHalf.outter.nums[0].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{predictHalf.outter.nums[0].num}}球</span></li>
                        <li class="itemC"
                            :class="{'red2':predictHalf.outter.nums[1].prob>predictHalf.outter.score[0].prob&&predictHalf.outter.score[1].prob>predictHalf.outter.score[2].prob}">
                            <em class="num">{{predictHalf.outter.nums[1].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{predictHalf.outter.nums[1].num}}球</span></li>
                        <li class="itemR"
                            :class="{'red2':predictHalf.outter.nums[2].prob>predictHalf.outter.score[0].prob&&predictHalf.outter.score[2].prob>predictHalf.outter.score[1].prob}">
                            <em class="num">{{predictHalf.outter.nums[2].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{predictHalf.outter.nums[2].num}}球</span></li>
                    </ul>
                </div>
                <div class="feed-back" v-if="!predictHalf.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
            </div>
        </div>
        <div class="sk-btips" v-if="predictEurope||predictAsian||predictDaXiao||predictScore">
            500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
        </div>
    </div>
</template>
<script>
    import europePop from '~components/detail/football/predict/europePop.vue'
    import asianPop from '~components/detail/football/predict/asianPop.vue'
    import daxiaoPop from '~components/detail/football/predict/daxiaoPop.vue'
    import scorePop from '~components/detail/football/predict/scorePop.vue'
    import halfPop from '~components/detail/football/predict/halfPop.vue'

    import echartBarLine from '~components/detail/football/predict/echartBarLine.vue'
    import echartPosition from '~components/detail/football/predict/echartPosition.vue'
    import {mTypes, aTypes} from '~store/zqdetail'
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getPredict, params.fid)
        },
        components: {
            echartBarLine, echartPosition
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getPredict, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            selectTab ({tab}) {
                let component = null
                switch (tab) {
                case 'europe':
                    component = europePop
                    break
                case 'asian':
                    component = asianPop
                    break
                case 'daxiao':
                    component = daxiaoPop
                    break
                case 'score':
                    component = scorePop
                    break
                case 'half':
                    component = halfPop
                    break
                }
                this.$store.commit(mTypes.setDialog, {component})
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
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            predictEurope () {
                return this.$store.state.zqdetail.predict.europe
            },
            predictDaXiao () {
                return this.$store.state.zqdetail.predict.daxiaoqiu
            },
            predictScore () {
                return this.$store.state.zqdetail.predict.score
            },
            predictHalf () {
                return this.$store.state.zqdetail.predict.half
            },
            predictAsian () {
                return this.$store.state.zqdetail.predict.asian
            }

        },
        mounted () {
            this.fetchData()
        }
    }
</script>
<style>
    .main-inner {
        min-height: 15.44rem;
        width: 100%;
        overflow-x: hidden;
        color: #242c35
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
    /*底部文字 start*/

    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
    }
    /*over*/
/*弹层小按钮*/
    .yc-more {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 1.066667rem;
        height: 1.066667rem
    }

    .yc-more:after {
        content: '';
        display: block;
        position: absolute;
        right: .4rem;
        bottom: .2rem;
        width: .346667rem;
        height: .346667rem;
        background: url(~assets/style/images/detail/icon_sprite.png) no-repeat -1.6rem 0;
        background-size: 1.92rem
    }
    /*over*/
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

    .dataItem .red2 {
        color: #d3553d
    }

    .dataItem .green2 {
        color: #36a171
    }

    .dataItem .blue {
        color: #437ba8
    }

    .dataItem .item-info {
        display: block;
        color: #aab5bd
    }

    [data-dpr="1"] .dataItem .item-info {
        font-size: 11px
    }

    [data-dpr="2"] .dataItem .item-info {
        font-size: 22px
    }

    [data-dpr="3"] .dataItem .item-info {
        font-size: 33px
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
    .item-loader {
        text-align: center;
        height: 1.733333rem;
        position: relative;
        background: #fff
    }

    .la-ball-pulse {
        position: absolute;
        width: 1.44rem;
        height: .48rem;
        display: inline-block;
        font-size: 0;
        left: 50%;
        top: 50%;
        margin-left: -.72rem;
        margin-top: -.24rem
    }

    .la-ball-pulse.la-dark {
        color: #333
    }

    .la-ball-pulse>span {
        display: inline-block;
        float: none;
        background-color: #515e6d;
        border: 0
    }

    .la-ball-pulse>span:nth-child(1) {
        -webkit-animation-delay: -.2s;
        animation-delay: -.2s
    }

    .la-ball-pulse>span:nth-child(2) {
        -webkit-animation-delay: -.1s;
        animation-delay: -.1s
    }

    .la-ball-pulse>span:nth-child(3) {
        -webkit-animation-delay: 0s;
        animation-delay: 0s
    }

    .la-ball-pulse>span {
        width: .133333rem;
        height: .133333rem;
        margin: .053333rem;
        border-radius: 50% 50%;
        -webkit-animation: ball-pulse 1s ease infinite;
        animation: ball-pulse 1s ease infinite
    }

    .la-ball-pulse.la-2x {
        height: .293333rem;
        margin-top: -.146667rem
    }

    .la-ball-pulse.la-2x>span {
        width: .133333rem;
        height: .133333rem;
        margin: .08rem
    }

    @-webkit-keyframes ball-pulse {
        0%,
        100%,
        60% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1)
        }
        30% {
            opacity: .1;
            -webkit-transform: scale(.01);
            transform: scale(.01)
        }
    }

    @keyframes ball-pulse {
        0%,
        100%,
        60% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1)
        }
        30% {
            opacity: .1;
            -webkit-transform: scale(.01);
            transform: scale(.01)
        }
    }
    .chart-yuce {
        width: 9.2rem;
        height: 5.866667rem;
        margin: 0 auto
    }



    .chart-position {
        height: 5.2rem
    }
    /* flag */
    /*弹窗start*/
    .popLayer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: 90;
        background: rgba(0, 0, 0, .8)
    }

    .popBox .popLayer {
        z-index: 2
    }

    .popBox {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 91;
        color: #242c35;
        overflow: hidden
    }

    .popBox .l-flex-column {
        position: relative;
        z-index: 5
    }

    .popTopbar {
        height: 1.173333rem;
        width: 100%
    }

    .popInner {
        background: #fff;
        display: block;
        border-radius: .186667rem .186667rem 0 0;
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        overflow: hidden
    }

    .popInner .full-scroll {
        overflow-x: hidden;
        border-radius: .186667rem .186667rem 0 0
    }

    .popHeader {
        padding: 0 .4rem
    }

    .popBox .popTit {
        color: #a9abad;
        margin-top: .533333rem
    }

    .popHeader .dataBox {
        border-bottom: 0
    }

    .popHeader .dataBox:active {
        background: #fff
    }

    .popTab {
        text-align: center;
        border-bottom: 1px solid #f4f4f4
    }

    .popTab li {
        display: inline-block;
        height: 1.066667rem;
        line-height: 1.066667rem;
        color: #666a6f;
        margin: 0 .533333rem
    }

    .popTab li.cur {
        border-bottom: .053333rem solid #242c35;
        color: #242c35
    }

    .popDetail {
        padding: 0 .4rem
    }

    .box-yc .popDetail .dataItem .itemC,
    .popDetail .dataItem li {
        color: #242c35
    }

    .popDetail .dataItem .itemL {
        padding-left: 0;
        width: 2.933333rem
    }

    .popDetail .dataItem .itemC {
        text-align: left
    }

    .popDetail .dataItem .itemR {
        padding-right: 0;
        width: 2.4rem;
        position: relative
    }

    .popDetail .fx-table tr:nth-child(2) td {
        padding-top: 0
    }

    .popDetail .dataItem td {
        height: .666667rem
    }

    .popDetail .dataItem td .state {
        display: inline-block;
        width: .666667rem;
        height: .346667rem;
        line-height: .346667rem;
        color: #fff;
        border-radius: .04rem;
        text-align: center;
        margin-left: .266667rem;
        position: relative;
        top: -.026667rem
    }

    [data-dpr="1"] .popDetail .dataItem td .state {
        font-size: 10px
    }

    [data-dpr="2"] .popDetail .dataItem td .state {
        font-size: 20px
    }

    [data-dpr="3"] .popDetail .dataItem td .state {
        font-size: 30px
    }

    .popDetail .dataItem td .state.red {
        background: #d25138
    }

    .popDetail .dataItem td .state.green {
        background: #36a171
    }

    .popDetail .dataItem td .state.blue {
        background: #437ba8
    }

    .popDetail .dataItem td .state.gray {
        background: #efefef;
        color: #acaeb0
    }

    .popDetail .dataItem .itemL div {
        height: .666667rem;
        line-height: .666667rem
    }

    .popDetail .dataItem li {
        height: 1.733333rem
    }

    .popDetail .dataItem-tit {
        height: .8rem;
        margin-bottom: -.266667rem
    }

    .popDetail .dataItem-tit li {
        color: #aab5bd;
        height: .8rem
    }

    [data-dpr="1"] .popDetail .dataItem-tit li {
        font-size: 11px
    }

    [data-dpr="2"] .popDetail .dataItem-tit li {
        font-size: 22px
    }

    [data-dpr="3"] .popDetail .dataItem-tit li {
        font-size: 33px
    }

    .box-yc .popDetail .dataItem-tit .itemC {
        color: #aab5bd
    }

    .popDetail .chart-similar {
        height: 100%;
        margin-left: .266667rem
    }

    .popDetail .similar-num {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -.773333rem;
        margin-top: -.773333rem;
        width: 1.546667rem;
        height: 1.546667rem;
        color: rgba(210, 81, 56, .16);
        font-size: 1.333333rem
    }

    .popDetail .similar-num:after {
        position: absolute;
        right: -.4rem;
        bottom: .24rem;
        color: rgba(210, 81, 56, .16);
        content: '%';
        font-size: .4rem
    }

    .popDetail .fx-table {
        margin-top: .4rem
    }

    .popDetail-pl {
        border-top: 1px solid #f4f4f4;
        color: #242c35;
        padding-top: .4rem
    }

    .popDetail-pl td {
        height: .48rem
    }

    .popFooter {
        border-top: 1px solid #e8e8e8;
        background: #fff;
        width: 100%;
        height: 1.32rem;
        text-align: center;
        position: relative
    }

    .popFooter:active {
        background: #eee
    }

    .popFooter-act:active {
        background: #fff
    }

    .popFooter h2 {
        display: inline-block;
        margin: 0 auto;
        padding: 0 .133333rem;
        white-space: nowrap;
        line-height: 1.32rem;
        color: #242c35
    }

    .popBox-lsyb .popDetail .dataItem .itemL {
        width: 2.666667rem
    }

    .popBox-lsyb .popDetail .dataItem .itemR {
        width: 2.933333rem;
        text-align: center
    }

    .popBox .sk-btips {
        background: #fff
    }
    .arrow {
        overflow: hidden;
        height: .333333rem;
        width: .6rem;
        position: absolute;
        left: .4rem;
        top: .493333rem
    }

    .arrow:before {
        content: '';
        height: .16rem;
        width: .16rem;
        display: block;
        border: .053333rem solid #333;
        border-right-width: 0;
        border-top-width: 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        bottom: .093333rem;
        left: .093333rem
    }
    .chart-yuce {
        width: 9.2rem;
        height: 5.866667rem;
        margin: 0 auto
    }
    .popDetail .fx-table tr:nth-child(2) td {
        padding-top: 0
    }

    .popDetail .dataItem td {
        height: .666667rem
    }

    .popDetail .dataItem td .state {
        display: inline-block;
        width: .666667rem;
        height: .346667rem;
        line-height: .346667rem;
        color: #fff;
        border-radius: .04rem;
        text-align: center;
        margin-left: .266667rem;
        position: relative;
        top: -.026667rem
    }

    [data-dpr="1"] .popDetail .dataItem td .state {
        font-size: 10px
    }

    [data-dpr="2"] .popDetail .dataItem td .state {
        font-size: 20px
    }

    [data-dpr="3"] .popDetail .dataItem td .state {
        font-size: 30px
    }

    .popDetail .dataItem td .state.red {
        background: #d25138
    }

    .popDetail .dataItem td .state.green {
        background: #36a171
    }

    .popDetail .dataItem td .state.blue {
        background: #437ba8
    }

    .popDetail .dataItem td .state.gray {
        background: #efefef;
        color: #acaeb0
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

    /*over*/
    .hide{display: none}
</style>
