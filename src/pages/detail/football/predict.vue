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

                <li class="box-arrow" v-if="predictRecommend.articles.length>2" v-tap="{methods: ()=>isArticle=!isArticle}">
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
<style>
    .chart-position {
        height: 5.2rem
    }
    /* flag */
</style>
