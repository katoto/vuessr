<template>
    <div>

        <div class="gl-box box-yc" v-if="predictRecommend&&predictRecommend.articles">
            <div class="gl-nav">专家推荐</div>
            <ul class="list-yuce" v-if="predictRecommend.articles">
                <template  v-for="c,idx in predictRecommend.articles">
                    <li data-p2="zq_detail" data-p4="predict_zjtj" v-if="!isArticle||idx<2" v-tap="{methods: goUrl, url:c.touch_url}">
                        <div class="title clear"><span>{{c.title}}</span><i v-if="c.paytype=='1'">付费</i></div>
                        <div class="info">
                            <span>
                                <i class="face"><img alt="小头像" :src="c.headimg"></i>{{c.nickname}}
                            </span>
                            <span class="time">{{c.publishtime.substring(5,16)}}</span>
                            <span class="view">{{c.hits}}</span>
                        </div>

                    </li>
                </template>

                <li class="box-arrow" v-if="predictRecommend.articles.length>2"
                    v-tap="{methods: ()=>isArticle=!isArticle}">
                    <div class="zd-arrow" :class="{'rotate180':!isArticle}"></div>
                </li>
            </ul>
            <div class="feed-back" v-if="predictRecommend.articles&&predictRecommend.articles.length<1">
                <div class="feed-box">
                    <em>本场暂无推荐</em>
                </div>
            </div>
        </div>


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

                    <echart-bar-line v-if="predictEurope" v-tap="{methods: selectTab, tab: 'europe'}" class="chart-yuce"
                                     name-bar="主胜概率" name-line="赔率趋势" :data-bar="predictEurope.outter.chart.nbars"
                                     :data-line="predictEurope.outter.chart.curve"></echart-bar-line>

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
                亚盘{{predictAsian && predictAsian.inner &&
                predictAsian.inner.this_match.curr_odds[1]?('（盘口：'+predictAsian.inner.this_match.curr_odds[1]+'）'):'--'}}
                <span class="yc-more"></span></div>
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

                    <echart-bar-line v-tap="{methods: selectTab, tab: 'asian'}" class="chart-yuce" name-bar="赢盘概率"
                                     name-line="赔率趋势" :data-bar="predictAsian.outter.chart.nbars"
                                     :data-line="predictAsian.outter.chart.curve"></echart-bar-line>

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
                大小盘{{predictDaXiao.inner &&
                predictDaXiao.inner.this_match.curr_odds[1]?('（盘口：'+predictDaXiao.inner.this_match.curr_odds[1]+'）'):''}}
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

                    <echart-bar-line v-tap="{methods: selectTab, tab: 'daxiao'}" class="chart-yuce" name-bar="大球概率"
                                     name-line="赔率趋势" :data-bar="predictDaXiao.outter.chart.nbars"
                                     :data-line="predictDaXiao.outter.chart.curve"></echart-bar-line>

                </template>

                <div class="feed-back" v-if="!predictDaXiao.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
            </div>

        </div>

        <div class="gl-box box-yc" v-if="predictScore">

            <div class="gl-nav">比分与进球 <span class="yc-more"></span></div>
            <div class="box-ycInner box-yc-bifen">

                <template v-if="predictScore.outter">
                    <div class="dataBox" v-tap="{methods: selectTab, tab: 'score'}">
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictScore.outter.score[0].prob>predictScore.outter.score[1].prob&&predictScore.outter.score[0].prob>predictScore.outter.score[2].prob}">
                                <em class="num">{{predictScore.outter.score[0].prob}}</em> <span class="numSub">%</span>
                                <span
                                        class="item-info2">{{predictScore.outter.score[0].score}}</span></li>
                            <li class="itemC"
                                :class="{'red2':predictScore.outter.score[1].prob>predictScore.outter.score[0].prob&&predictScore.outter.score[1].prob>predictScore.outter.score[2].prob}">
                                <em class="num">{{predictScore.outter.score[1].prob}}</em> <span class="numSub">%</span>
                                <span
                                        class="item-info2">{{predictScore.outter.score[1].score}}</span></li>
                            <li class="itemR"
                                :class="{'red2':predictScore.outter.score[2].prob>predictScore.outter.score[0].prob&&predictScore.outter.score[2].prob>predictScore.outter.score[1].prob}">
                                <em class="num">{{predictScore.outter.score[2].prob}}</em> <span class="numSub">%</span>
                                <span
                                        class="item-info2">{{predictScore.outter.score[2].score}}</span></li>
                        </ul>
                        <ul class="dataItem">
                            <li class="itemL"
                                :class="{'red2':predictScore.outter.nums[0].prob>predictScore.outter.nums[1].prob&&predictScore.outter.nums[0].prob>predictScore.outter.nums[2].prob}">
                                <em class="num">{{predictScore.outter.nums[0].prob}}</em> <span class="numSub">%</span>
                                <span
                                        class="item-info2">{{predictScore.outter.nums[0].num}}球</span></li>
                            <li class="itemC"
                                :class="{'red2':predictScore.outter.nums[1].prob>predictScore.outter.nums[0].prob&&predictScore.outter.nums[1].prob>predictScore.outter.nums[2].prob}">
                                <em class="num">{{predictScore.outter.nums[1].prob}}</em> <span class="numSub">%</span>
                                <span
                                        class="item-info2">{{predictScore.outter.nums[1].num}}球</span></li>
                            <li class="itemR"
                                :class="{'red2':predictScore.outter.nums[2].prob>predictScore.outter.nums[0].prob&&predictScore.outter.nums[2].prob>predictScore.outter.nums[1].prob}">
                                <em class="num">{{predictScore.outter.nums[2].prob}}</em> <span class="numSub">%</span>
                                <span
                                        class="item-info2">{{predictScore.outter.nums[2].num}}球</span></li>
                        </ul>
                    </div>


                    <echart-position class="chart-yuce" style="height: 5.2rem" :name1="match.homesxname+'(主)'"
                                     :name2="match.awaysxname" :data1="predictScore.u.hu"
                                     :data2="predictScore.u.au"></echart-position>

                </template>


                <div class="feed-back" v-if="!predictScore.outter">
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
            </div>
        </div>

        <div class="gl-box box-yc" v-if="predictHalf">
            <div class="gl-nav">半场 <span class="yc-more"></span></div>
            <div class="box-ycInner">
                <div class="dataBox" v-if="predictHalf.outter" v-tap="{methods: selectTab, tab: 'half'}">
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
                            <em class="num">{{predictHalf.outter.score[0].prob}}</em> <span class="numSub">%</span>
                            <span
                                    class="item-info2">{{predictHalf.outter.score[0].score}}</span></li>
                        <li class="itemC"
                            :class="{'red2':predictHalf.outter.score[1].prob>predictHalf.outter.score[0].prob&&predictHalf.outter.score[1].prob>predictHalf.outter.score[2].prob}">
                            <em class="num">{{predictHalf.outter.score[1].prob}}</em> <span class="numSub">%</span>
                            <span
                                    class="item-info2">{{predictHalf.outter.score[1].score}}</span></li>
                        <li class="itemR"
                            :class="{'red2':predictHalf.outter.score[2].prob>predictHalf.outter.score[0].prob&&predictHalf.outter.score[2].prob>predictHalf.outter.score[1].prob}">
                            <em class="num">{{predictHalf.outter.score[2].prob}}</em> <span class="numSub">%</span>
                            <span
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

        <div class="sk-btips" v-if="predictRecommend||predictEurope||predictAsian||predictDaXiao||predictScore">
            500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
        </div>

        <div class="item-loader" v-else>
            <div class="la-ball-pulse la-2x">
                <span></span>
                <span></span>
                <span></span>
            </div>
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
        data () {
            return {
                isArticle: true
            }
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
            },
            goUrl ({url}) {
                location.href = url
            }
        },
        watch: {
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime)
                }
            },
            isArticle () {
                this.$store.commit(mTypes.updateScTime)
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
            predict () {
                return this.$store.state.zqdetail.predict
            },
            predictEurope () {
                return this.predict.europe
            },
            predictDaXiao () {
                return this.predict.daxiaoqiu
            },
            predictScore () {
                return this.predict.score
            },
            predictHalf () {
                return this.predict.half
            },
            predictAsian () {
                return this.predict.asian
            },
            predictRecommend () {
                return this.predict.recommends
            }

        },
        mounted () {
            this.fetchData()
        }
    }
</script>
<style scoped>

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

    .la-ball-pulse > span {
        display: inline-block;
        float: none;
        background-color: #515e6d;
        border: 0
    }

    .la-ball-pulse > span:nth-child(1) {
        -webkit-animation-delay: -.2s;
        animation-delay: -.2s
    }

    .la-ball-pulse > span:nth-child(2) {
        -webkit-animation-delay: -.1s;
        animation-delay: -.1s
    }

    .la-ball-pulse > span:nth-child(3) {
        -webkit-animation-delay: 0s;
        animation-delay: 0s
    }

    .la-ball-pulse > span {
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

    .la-ball-pulse.la-2x > span {
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

    /*over*/
    .hide {
        display: none
    }

    .list-yuce li {
        height: 1.893333rem;
        padding: .266667rem .4rem 0 .4rem;
        border-bottom: 1px solid #f4f4f4
    }

    .list-yuce .title {
        height: .933333rem;
        line-height: .933333rem
    }

    .list-yuce .title span {
        display: block;
        float: left;
        width: 8.213333rem;
        color: #242c35;
        font-size: .426667rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .list-yuce .title i {
        display: inline-block;
        float: right;
        width: .666667rem;
        height: .346667rem;
        line-height: .346667rem;
        background: #d25138;
        color: #fff;
        text-align: center;
        margin-top: .266667rem;
        border-radius: .04rem;
        font-size: .266667rem
    }

    .list-yuce .info {
        color: #aab5bd;
        height: .4rem;
        line-height: .4rem;
        padding-top: .08rem
    }

    [data-dpr="1"] .list-yuce .info {
        font-size: 11px
    }

    [data-dpr="2"] .list-yuce .info {
        font-size: 22px
    }

    [data-dpr="3"] .list-yuce .info {
        font-size: 33px
    }

    .list-yuce .info span {
        display: inline-block;
        margin-right: .4rem;
        padding-left: .293333rem;
        position: relative
    }

    .list-yuce .info span:first-child {
        padding-left: 0
    }

    .list-yuce .face {
        display: inline-block;
        width: .4rem;
        height: .4rem;
        overflow: hidden;
        border-radius: 100%;
        overflow: hidden;
        vertical-align: middle;
        margin-right: .133333rem;
        position: relative;
        top: -1px
    }

    .list-yuce li img {
        width: .4rem;
        height: .4rem
    }

    .list-yuce .time::after, .list-yuce .view::after {
        display: inline-block;
        content: '';
        width: .266667rem;
        height: .266667rem;
        /*background: url(/mobile/touch/images/bifen/icon_sprite.png) no-repeat 0 -.586667rem;*/
        background-size: 1.92rem;
        position: absolute;
        left: 0;
        top: .066667rem
    }

    .list-yuce .view::after {
        background-position: -.36rem -.586667rem
    }

    .list-yuce .box-arrow {
        height: .8rem;
        padding-top: 0;
        margin-top: -.026667rem;
        background: #fff
    }

    .ui-head a {
        text-decoration: none
    }

    .ui-head li, .ui-head ul {
        list-style: none
    }

    .ui-head button, .ui-head li, .ui-head ul {
        margin: 0;
        padding: 0
    }

    .ui-head {
        width: 100%;
        height: 1.173333rem
    }

    .ui-head-in {
        width: 100%;
        height: 1.173333rem;
        background: #242c35;
        position: relative
    }

    .ui-head-l, .ui-head-r {
        position: absolute;
        top: 0;
        height: 100%
    }

    .ui-head-l {
        left: 0
    }

    .ui-head-m {
        height: 100%;
        line-height: 1.173333rem;
        text-align: center
    }

    .ui-head-tit {
        display: inline-block;
        margin: 0;
        padding: 0;
        font-size: .48rem;
        font-weight: 700;
        color: #fff
    }

    .ui-head-tit img {
        vertical-align: middle
    }

    .ui-head-tit .ui-head-arrow {
        transition: all .2s linear
    }

    .ui-head-tit-on .ui-head-arrow {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .ui-head-r {
        right: 0
    }

    .ui-head-l span, .ui-head-r span {
        height: 100%;
        padding: 0 0 0 .133333rem
    }

    .ui-head-l span:active, .ui-head-r span:active {
        background-color: #5c788f
    }

    .ui-head-l span:after {
        left: .4rem
    }

    .ui-head-r span:after {
        right: .4rem
    }

    .ui-head-btn1:after {
        position: absolute;
        top: 50%;
        background: url(/mobile/touch/images/bifen/v124/return.png) no-repeat;
        width: .306667rem;
        height: .48rem;
        background-size: cover;
        content: '';
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%)
    }

    .v124-wrap {
        background: #efefef;
        width: 100%;
        height: 100%
    }

    .hotc-header {
        height: 1.173333rem;
        line-height: 1.173333rem;
        padding: 0 .4rem;
        color: #aab5bd;
        font-size: .346667rem;
        border-bottom: 1px solid #eaeaea;
        background: #fff;
        box-sizing: border-box
    }

    .hotc-header ul {
        float: right;
        clear: both;
        zoom: 1
    }

    .hotc-header ul li {
        height: 1.173333rem;
        line-height: 1.173333rem;
        box-sizing: border-box;
        width: .773333rem;
        float: left
    }

    .hotc-header ul li:nth-child(2) {
        margin: 0 .533333rem
    }

    .hotc-header ul .cur {
        color: #242c35;
        border-bottom: 3px solid #242c35
    }

    .notice-predict {
        height: .333333rem;
        width: 9.2rem;
        margin: 0 auto;
        padding: .36rem 0;
        box-shadow: .013333rem .013333rem .026667rem .013333rem rgba(239, 239, 239, .5);
        border: 1px solid #eaeaea;
        border-radius: .08rem
    }

    .notice-predict p {
        color: #515e6d;
        font-size: .373333rem;
        height: .333333rem;
        line-height: .333333rem;
        border-left: .053333rem solid #d25138;
        padding-left: .133333rem
    }

    .notice-predict p em {
        color: #d25138
    }

    .hotc-list {
        padding-top: .266667rem;
        background: #fff
    }

    .hotc-item {
        clear: both;
        zoom: 1;
        padding: .4rem .4rem;
        border-bottom: 1px solid #eaeaea;
        overflow: hidden;
        background: #fff
    }

    .hotc-cont:active, .hotc-item:active, .news-item:active, .strengh-cont:active {
        background: #f4f4f4
    }

    .hotc-left {
        width: 5.6rem;
        float: left;
        height: .933333rem;
        padding-top: .24rem
    }

    .hotc-info-tit {
        font-size: .426667rem;
        color: #242c35;
        height: .4rem;
        margin-bottom: .266667rem
    }

    .hotc-info-time {
        color: #aab5bd;
        font-size: .293333rem;
        height: .293333rem
    }

    .hotc-right {
        float: right;
        height: 1rem;
        padding: .226667rem 0;
        background: #d25138;
        color: #fff;
        text-align: center;
        border-radius: .053333rem;
        box-shadow: .026667rem .026667rem .106667rem #e8a89b
    }

    .statue-hit-no {
        background: #bcd0de;
        box-shadow: .026667rem .026667rem .106667rem #dde7ee
    }

    .left-statue {
        float: left;
        width: .72rem;
        box-sizing: border-box;
        color: rgba(255, 255, 255, .8);
        height: 1rem;
        border-right: 1px solid rgba(255, 255, 255, .5);
        font-size: .373333rem;
        line-height: 140%
    }

    .right-predict {
        width: 2.213333rem;
        float: left
    }

    .right-predict p {
        font-size: .64rem;
        height: .64rem
    }

    .right-predict p:nth-child(1) {
        line-height: .506667rem;
        text-indent: .12rem
    }

    .right-predict p:nth-child(2) {
        font-size: .373333rem;
        height: .373333rem;
        line-height: .373333rem;
        margin-top: .026667rem
    }

    .right-predict p em {
        font-size: .293333rem
    }

    .txt-predict {
        text-align: center;
        color: #aab5bd;
        font-size: .293333rem;
        padding: .533333rem 0;
        background: #efefef
    }

    .tag-game-over {
        height: .8rem;
        line-height: .8rem;
        background: #efefef;
        font-size: .293333rem;
        color: #aab5bd;
        width: 100%;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #eaeaea
    }

    .tag-game-over:before {
        content: "";
        display: inline-block;
        width: .4rem;
        height: 1px;
        background: #aab5bd;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem
    }

    .tag-game-over:after {
        content: "";
        display: inline-block;
        width: .4rem;
        height: 1px;
        background: #aab5bd;
        position: absolute;
        top: 50%;
        right: 50%;
        margin-right: -1rem
    }

    .hotc-item-going .left-statue {
        display: none
    }

    .strengh-item {
        box-sizing: border-box;
        margin: 0;
        padding-top: .666667rem;
        height: 1.333333rem
    }

    .strengh-cont {
        height: 3.173333rem;
        box-sizing: border-box;
        padding: .266667rem .4rem .666667rem;
        border-bottom: 1px solid #eaeaea
    }

    .strengh-time {
        font-size: .293333rem;
        color: #aab5bd;
        margin-bottom: .533333rem
    }

    .strengh-time em {
        float: right
    }

    .strengh-tit {
        font-size: .426667rem;
        color: #242c35;
        position: absolute;
        top: 0;
        text-align: center;
        width: 100%;
        overflow: hidden;
        height: .426667rem;
        line-height: .426667rem
    }

    .strengh-tit em {
        display: inline-block;
        width: 4.133333rem;
        float: left
    }

    .strengh-tit em:nth-child(2) {
        display: inline-block;
        width: .933333rem;
        text-align: center
    }

    .strengh-tit em:nth-child(1) {
        text-align: right
    }

    .strengh-tit em:nth-child(3) {
        text-align: left
    }

    .strengh-item .zhzl-bfb-left, .strengh-item .zhzl-bfb-right {
        top: inherit;
        bottom: .293333rem;
        font-size: .346667rem;
        color: #515e6d
    }

    .strengh-item .zhzl-vs-left, .strengh-item .zhzl-vs-right {
        height: .16rem
    }

    .record-header {
        height: 1.173333rem;
        line-height: 1.173333rem;
        width: 100%;
        border-bottom: 1px solid #eaeaea;
        background: #fff;
        box-sizing: border-box
    }

    .record-header ul {
        clear: both;
        zoom: 1;
        width: 6.8rem;
        margin: 0 auto
    }

    .record-header ul li {
        width: 1.333333rem;
        text-align: center;
        float: left;
        font-size: .4rem;
        color: rgba(36, 44, 53, .8);
        height: 1.173333rem;
        box-sizing: border-box
    }

    .record-header ul li:nth-child(2) {
        margin: 0 1.333333rem
    }

    .record-header ul .cur {
        color: #242c35;
        border-bottom: .04rem solid #242c35
    }

    .record-item {
        padding: .6rem .4rem
    }

    .record-item .hotc-right {
        float: left
    }

    .record-item .hotc-left {
        margin-left: .533rem;
        padding-top: 0;
        width: 6.906667rem
    }

    .record-item .hotc-right {
        height: .64rem;
        padding: .213333rem 0;
        line-height: .64rem
    }

    .record-item .right-predict {
        width: 1.68rem;
        font-size: .8rem
    }

    .record-item .right-predict em {
        font-size: .293333rem;
        margin-left: .04rem
    }

    .record-item .right-predict i {
        width: .88rem;
        text-align: center;
        display: inline-block
    }

    .record-item .hotc-info-time em {
        margin-left: .533333rem
    }

    .always-fail {
        background: #437ba8;
        box-shadow: .026667rem .026667rem .106667rem #729cbd
    }

    .always-draw {
        background: #36a171;
        box-shadow: .026667rem .026667rem .106667rem #68b894
    }

    .pre-header {
        height: .8rem;
        line-height: .8rem;
        color: #aab5bd;
        font-size: .293333rem;
        background: #fff;
        border-bottom: 1px solid #eaeaea;
        padding: 0 .4rem;
        box-sizing: border-box
    }

    .pre-header ul {
        overflow: hidden
    }

    .pre-header ul li {
        width: 1.36rem;
        text-align: center;
        margin-left: .4rem;
        float: left
    }

    .pre-header ul li:first-child {
        margin-left: 0;
        text-align: left;
        width: 3.133333rem
    }

    .pre-header ul li:last-child {
        text-align: right;
        margin-left: 0;
        float: right;
        width: 1.173333rem
    }

    .pre-header ul li:nth-child(2) {
        margin-left: 0
    }

    .hotc-cont {
        padding-top: .266667rem;
        background: #fff;
        border-bottom: 1px solid #eaeaea
    }

    .hotc-tab-tit {
        font-size: .293333rem;
        color: #aab5bd;
        margin-bottom: .266667rem;
        height: .533333rem;
        line-height: .533333rem;
        padding-left: .4rem
    }

    .hotc-tab-tit em {
        color: #d25138;
        font-size: .266667rem;
        color: #fff;
        text-align: center;
        width: 1.333333rem;
        height: .533333rem;
        display: inline-block;
        background: #d25138;
        float: right;
        border-top-left-radius: .053333rem;
        border-bottom-left-radius: .053333rem;
        box-shadow: .013333rem .013333rem .04rem rgba(210, 81, 56, .7)
    }

    .hotc-tit-red {
        color: #d25138
    }

    .hotc-tab-tit .too-cold {
        background: #437ba8;
        box-shadow: .013333rem .013333rem .04rem rgba(67, 123, 168, .7)
    }

    .hotc-tab-tit .too-draw {
        background: #5c788f;
        box-shadow: .013333rem .013333rem .04rem rgba(92, 120, 143, .7)
    }

    .hotc-tab-list {
        padding: 0 .4rem;
        color: #242c35;
        font-size: .346667rem
    }

    .hotc-tab-item {
        margin-bottom: .533333rem
    }

    .hotc-tab-item ul {
        overflow: hidden;
        height: .373333rem;
        line-height: .373333rem
    }

    .hotc-tab-item ul li {
        width: 1.2rem;
        text-align: center;
        margin-left: .533333rem;
        float: left;
        position: relative
    }

    .hotc-tab-item ul li em {
        display: inline-block;
        width: .346667rem;
        height: .346667rem;
        font-size: .266667rem;
        color: #fff;
        text-align: center;
        line-height: .346667rem;
        background: #d25138;
        margin-left: .053333rem;
        border-radius: .026667rem;
        position: absolute;
        top: 50%;
        margin-top: -.173333rem
    }

    .hotc-tab-item ul li:last-child {
        text-align: right;
        margin-left: 0;
        float: right
    }

    .hotc-tab-item ul li:nth-child(2) {
        margin-left: 0
    }

    .hotc-tab-item ul li:first-child {
        font-size: .373333rem;
        margin-left: 0;
        text-align: left;
        width: 3.133333rem
    }

    .each-resone-all {
        width: 100%;
        position: absolute;
        bottom: .106667rem
    }

    .each-resone-all .zhzl-vs-left {
        margin-right: -.0533rem
    }

    .news-cont {
        background: #fff
    }

    .news-item {
        overflow: hidden;
        padding: .32rem .4rem;
        height: 1.6rem;
        position: relative;
        border-bottom: 1px solid #eaeaea
    }

    .news-list .news-item:last-child {
        border-bottom: none
    }

    .left-info {
        width: 6.266667rem;
        float: left;
        color: #242c35;
        font-size: .373333rem
    }

    .info-tit {
        line-height: .466667rem;
        margin-top: .133333rem
    }

    .info-time {
        font-size: .293333rem;
        color: #aab5bd;
        height: .293333rem;
        line-height: .293333rem;
        position: absolute;
        left: .4rem;
        bottom: .373333rem
    }

    .news-pic {
        width: 2.346667rem;
        height: 1.6rem;
        float: right;
        text-align: right
    }

    .news-pic img {
        width: 100%;
        height: 100%
    }

    .alert-bg {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 99
    }

    .alert-share {
        height: 4.266667rem;
        background: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        box-sizing: border-box;
        padding-top: 1.013333rem
    }

    .icons-cont {
        color: #aab5bd;
        font-size: .32rem;
        overflow: hidden;
        width: 6.666667rem;
        margin: 0 auto
    }

    .collec-box {
        width: 1.333333rem;
        float: left;
        text-align: center;
        height: 1.333333rem;
        position: relative
    }

    .collec-box:nth-child(1) {
        float: left
    }

    .collec-box:nth-child(2) {
        float: left;
        margin: 0 1.2rem 0 1.333333rem
    }

    .collec-box:nth-child(3) {
        float: right
    }

    .collec-box:nth-child(1) img {
        width: .72rem;
        height: .68rem
    }

    .collec-box:nth-child(2) img {
        width: .56rem;
        height: .626667rem
    }

    .collec-box:nth-child(3) img {
        width: .76rem;
        height: .626667rem
    }

    .star-cllect {
        width: .64rem;
        height: .6rem;
        display: inline-block;
        /*background: url(/mobile/touch/images/bifen/v124/collect.png) no-repeat;*/
        background-size: cover
    }

    .star-cllected {
        width: .64rem;
        height: .6rem;
        display: inline-block;
        /*background: url(/mobile/touch/images/bifen/v124/collected.png) no-repeat;*/
        background-size: cover
    }

    .share-icon {
        width: .56rem;
        height: .626667rem;
        display: inline-block;
        /*background: url(/mobile/touch/images/bifen/v124/share.png) no-repeat;*/
        background-size: cover
    }

    .collec-box p {
        height: .32rem;
        line-height: .32rem;
        margin-top: .133333rem;
        position: absolute;
        bottom: 0;
        width: 1.333333rem;
        text-align: center;
        left: 0
    }

    .icon-close-s {
        width: 1.333333rem;
        height: 1.333333rem;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -.666667rem;
        text-align: center;
        line-height: 1.333333rem
    }

    .btn-share-notice {
        width: 2.32rem;
        height: 1.16rem;
        /*background: url(/mobile/touch/images/bifen/v124/click-s.png) no-repeat;*/
        background-size: cover;
        font-size: .373333rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        position: fixed;
        bottom: .186667rem;
        left: 50%;
        margin-left: -1.16rem
    }

    .icon-close-s img {
        width: .293333rem;
        height: .306667rem
    }

    .btn-notice-anim {
        -webkit-animation: bounce 2s .2s ease infinite;
        -moz-animation: bounce 1s .2s ease infinite
    }

    @-webkit-keyframes bounce {
        0% {
            -webkit-transform: translateY(0)
        }
        20% {
            -webkit-transform: translateY(0)
        }
        40% {
            -webkit-transform: translateY(-.2rem)
        }
        50% {
            -webkit-transform: translateY(0)
        }
        60% {
            -webkit-transform: translateY(-.093333rem)
        }
        80% {
            -webkit-transform: translateY(0)
        }
        100% {
            -webkit-transform: translateY(0)
        }
    }

    .exit-cont {
        padding: .133333rem .266667rem;
        border-bottom: 1px solid #eaeaea;
        background: #fff;
        overflow: hidden
    }

    .exit-cont ul li {
        width: 1.893333rem;
        padding: .4rem 0 .4rem .266667rem;
        text-align: left;
        border-radius: .08rem;
        float: left;
        margin-right: .266667rem
    }

    .exit-cont ul .exit-pre {
        background: #d25138;
        box-shadow: .026667rem .026667rem .106667rem #e8a89b
    }

    .exit-cont ul .exit-hotc {
        background: #437ba8;
        box-shadow: .026667rem .026667rem .106667rem #729cbd
    }

    .exit-cont ul .exit-stre {
        background: #36a171;
        box-shadow: .026667rem .026667rem .106667rem #68b894
    }

    .exit-cont ul .exit-recod {
        background: #5c788f;
        box-shadow: .026667rem .026667rem .106667rem #adbbc7
    }

    .exit-cont ul li:last-child {
        margin-right: 0
    }

    .exit-cont ul li p {
        color: rgba(255, 255, 255, .5);
        font-size: .293333rem
    }

    .exit-cont ul li p:first-child {
        color: rgba(255, 255, 255, 1);
        font-size: .4rem;
        height: .4rem;
        line-height: .4rem
    }

    .exit-cont ul li p:nth-child(2) {
        height: .293333rem;
        line-height: .293333rem;
        margin: .373333rem 0 .133333rem 0
    }

    .exit-cont ul li p:nth-child(3) {
        height: .293333rem;
        line-height: .293333rem
    }

    .sk-point {
        position: relative;
        width: 1.333333rem;
        height: 1.333333rem;
        display: inline-block
    }

    .sk-point:after {
        content: "";
        display: inline-block;
        /*background: url(/mobile/touch/images/bifen/v124/share-point.png) no-repeat;*/
        width: .48rem;
        height: .106667rem;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.053333rem;
        left: 50%;
        margin-left: -.24rem
    }

    .zhzl-tips {
        padding: .133333rem 0
    }

    .gl-nav-nobor {
        border-top: 0
    }

    .hot-cool-wrap .gl-nav:first-child {
        border-top: none
    }

    .jie-detail-nomb {
        margin-bottom: 0
    }
    .zd-arrow{width:.533333rem;height:.177rem;position:absolute;top:50%;left:50%;margin:-.2rem 0 0 -.266667rem;background-position:center -10.84rem}
    .rotate180{-webkit-animation:all .2s linear;animation:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}
    .dataItem .item-info2{display:block}
    [data-dpr="1"] .dataItem .item-info2{font-size:10px}
    [data-dpr="2"] .dataItem .item-info2{font-size:20px}
    [data-dpr="3"] .dataItem .item-info2{font-size:30px}
</style>
