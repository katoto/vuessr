<template>
    <div>

        <div class="gl-box box-yc" v-if="predictRecommend&&predictRecommend.articles">
            <div class="gl-nav">专家推荐</div>
            <div class="feed-back" v-if="predictRecommend.isrecommend=='0'&&predictRecommend.articles.length>0">
                <div class="feed-box">
                    <em>本场比赛暂无推荐，看下其他比赛吧</em>
                </div>
            </div>
            <div class="feed-back" v-if="predictRecommend.articles&&predictRecommend.articles.length<1">
                <div class="feed-box">
                    <em>本场暂无推荐</em>
                </div>
            </div>
            <ul class="list-yuce" v-if="predictRecommend.articles">
                <template  v-for="c,idx in predictRecommend.articles">
                    <li data-p2="zq_detail" data-p4="predict_zjtj" v-if="!isArticle||idx<2" v-tap="{methods: goUrl, url:c.touch_url}">
                        <div class="title clear"><span>{{c.title}}</span><i v-if="c.paytype=='1'">付费</i></div>

                        <div class="info">
                            <span class="mr0"><i class="face"><img alt="小头像" v-logo="c.headimg"></i>{{c.nickname | truncate(4)}}</span>
                            <em class="zj-mzl" v-if="c.threereturnrate">3天回报{{c.threereturnrate|percentFormat}}</em>
                            <em class="zj-mzl" v-if="c.tenprojecthits">近10中{{c.tenprojecthits}}</em>
                            <em class="zj-mzl" v-if="c.rednum">{{c.rednum}}连红</em>
                            <span class="time">{{c.publishtime|recommendAt(match.matchtime) }}</span>
                        </div>
                    </li>
                </template>

                <li class="box-arrow" v-if="predictRecommend.articles.length>2"
                    v-tap="{methods: ()=>isArticle=!isArticle}">
                    <div class="zd-arrow" :class="{'rotate180':!isArticle}"></div>
                </li>
            </ul>

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
                predictAsian.inner.this_match.curr_odds[1]?('（盘口：'+predictAsian.inner.this_match.curr_odds[1]+'）'):''}}
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

        <skbtips v-if="predictRecommend||predictEurope||predictAsian||predictDaXiao||predictScore"></skbtips>

        <item-loader v-else></item-loader>
    </div>
</template>
<script>
    import europePop from '~components/detail/football/predict/europePop.vue'
    import asianPop from '~components/detail/football/predict/asianPop.vue'
    import daxiaoPop from '~components/detail/football/predict/daxiaoPop.vue'
    import scorePop from '~components/detail/football/predict/scorePop.vue'
    import halfPop from '~components/detail/football/predict/halfPop.vue'
    import skbtips from '~components/detail/skbtips.vue'
    import itemLoader from '~components/detail/itemLoader.vue'

    import echartBarLine from '~components/detail/football/predict/echartBarLine.vue'
    import echartPosition from '~components/detail/football/predict/echartPosition.vue'
    import logo from '~directives/logo'
    import {mTypes, aTypes} from '~store/zqdetail'
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getPredict, params.fid)
        },
        directives: {
            logo
        },
        data () {
            return {
                isArticle: true
            }
        },
        components: {
            echartBarLine, echartPosition, skbtips, itemLoader
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
        },
        filters: {
            percentFormat: (val) => {
                return `${(100 * val).toFixed(0)}%`
            },
            recommendAt: (t, matchAt) => {
                let matchMillTime = new Date(matchAt.replace(/-/g, '/')).getTime()
                let articleMillTime = new Date(t.replace(/-/g, '/')).getTime()
                let difference = matchMillTime - articleMillTime
                if (difference < 0) {
                    return t.substring(5, 11)
                }
                if (difference < 60 * 1000) {
                    return '赛前1分钟'
                }
                if (difference < 60 * 60 * 1000) {
                    let m = parseInt(difference / (60 * 1000))
                    return '赛前' + m + '分钟'
                }
                if (difference < 24 * 60 * 60 * 1000) {
                    let h = parseInt(difference / (60 * 60 * 1000))
                    return '赛前' + h + '小时'
                }
                if (difference > 24 * 60 * 60 * 1000) {
                    let d = parseInt(difference / (24 * 60 * 60 * 1000))
                    return '赛前' + d + '天'
                }
            },
            truncate: (val, num) => {
                if (val.length > num) {
                    return val.substr(0, num - 1) + '...'
                } else {
                    return val
                }
            }
        }
    }
</script>
<style scoped >
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
    .list-yuce .time::after, .list-yuce .view::after {
        display: inline-block;
        content: '';
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/icon_sprite.png) no-repeat 0 -.586667rem;
        background-size: 1.92rem;
        position: absolute;
        left: 0;
        top: .066667rem;
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
        /*color: #aab5bd*/
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

    .chart-yuce {
        width: 9.2rem;
        height: 5.866667rem;
        margin: 0 auto
    }

    /* flag */
    /*弹窗start*/

    /*over*/
    .hide {
        display: none
    }
    .list-yuce .info .mr0{
        margin-left: 0
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
        padding-left: .293333rem;
        position: relative;
        margin-left: 0.266rem;
    }

    .list-yuce .info span:first-child {
        padding-left: 0;
        margin-right: 0
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

    .list-yuce .time::after,.list-yuce .view::after {
        display: inline-block;
        content: '';
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/icon_sprite.png) no-repeat 0 -.586667rem;
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

    .zj-mzl {
        font-size: .24rem;
        padding: .026667rem .106667rem;
        border: 1px solid rgba(210,81,56,.4);
        color: rgba(210,81,56,1);
        border-radius: .053333rem;
        margin-left: 0.106rem;
    }


    .hot-cool-wrap .gl-nav:first-child {
        border-top: none
    }

    .zd-arrow{width:.533333rem;height:.177rem;position:absolute;top:50%;left:50%;margin:-.2rem 0 0 -.266667rem;background-position:center -10.84rem}
    .rotate180{-webkit-animation:all .2s linear;animation:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}
    .dataItem .item-info2{display:block}
    [data-dpr="1"] .dataItem .item-info2{font-size:10px}
    [data-dpr="2"] .dataItem .item-info2{font-size:20px}
    [data-dpr="3"] .dataItem .item-info2{font-size:30px}

    .feed-back{width:100%;height:1.733333rem;background:#fff;border-top:1px solid #eaeaea}
    .feed-box{color:#787878;line-height:1.733333rem;text-align:center}
    [data-dpr="1"] .feed-box {
        font-size: 13px
    }

    [data-dpr="2"] .feed-box {
        font-size: 26px
    }

    [data-dpr="3"] .feed-box {
        font-size: 39px
    }

    .box-arrow{height:1.066667rem;position:relative}
    .box-arrow:active{background:#f4f4f4}
</style>
