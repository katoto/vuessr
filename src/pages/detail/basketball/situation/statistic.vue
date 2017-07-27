<template>
    <div>
        <div v-if="home">

            <div class="zhedie-box">
                <div class="gl-nav">球队统计</div>

                <div class="zhedie">
                    <ul class="zhzl-list">
                        <li class="responsive" v-for="(itm,idx) in teamData">
                            <div class="zhzl-left">{{away.zj[sf[idx]] || 0}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">{{itm}}</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <!--:style="'width:' +getData(Number(away.zj[sf[idx]]),Number(home.zj[sf[idx]])) + '%' ">-->

                                        <div class="zhzl-vs-left " :class="away.zj[sf[idx]] < home.zj[sf[idx]] ? 'zhzl-gray' : 'zhzl-green'"
                                             :style="away.zj[sf[idx]], home.zj[sf[idx]]|getWidth">
                                        </div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="away.zj[sf[idx]] < home.zj[sf[idx]] ? 'zhzl-green' : 'zhzl-gray'"
                                             :style="home.zj[sf[idx]], away.zj[sf[idx]]|getWidth">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{home.zj[sf[idx]] || 0}}</div>
                        </li>

                    </ul>
                </div>
            </div>

            <!--客队统计-->
            <div class="zhedie-box" v-if="away">
                <div class="gl-nav">{{match.awaysxname}}统计</div>
                <div class="gl-box fx-zr-box">
                    <div class="dataBox">
                        <div class="zr-detail">
                            <ul class="zr-detail-left">
                                <li class="zr-detail-tit">首发球员</li>
                                <li v-for="info in away.sf">{{info.player}}</li>

                                <li class="zr-detail-tit">替补球员</li>
                                <li v-for="info in away.tb">{{info.player}}</li>

                            </ul>
                            <div class="scroll-cont ">
                                <slide>
                                    <ul class=" zr-detail-right table-tj">
                                        <li class="zr-detailer zr-detail-tit">
                                            <ul>
                                                <li>时间</li>
                                                <li>得分</li>
                                                <li>投篮</li>
                                                <li>篮板</li>
                                                <li>助攻</li>
                                                <li>抢断</li>
                                                <li>盖帽</li>
                                                <li>失误</li>
                                                <li>犯规</li>
                                            </ul>
                                        </li>

                                        <li class="zr-detailer" v-for="info in away.sf">
                                            <ul>

                                                <li>{{info.time}}</li>
                                                <li>{{info.score}}</li>
                                                <li>{{info.shoot}}</li>
                                                <li>{{info.rebs}}</li>
                                                <li>{{info.assists}}</li>
                                                <li>{{info.steals}}</li>
                                                <li>{{info.block_shot}}</li>
                                                <li>{{info.fehlpass}}</li>
                                                <li>{{info.foul}}</li>
                                            </ul>
                                        </li>

                                        <li class="zr-detailer zr-detail-tit">
                                            <ul>
                                                <li>时间</li>
                                                <li>得分</li>
                                                <li>投篮</li>
                                                <li>篮板</li>
                                                <li>助攻</li>
                                                <li>抢断</li>
                                                <li>盖帽</li>
                                                <li>失误</li>
                                                <li>犯规</li>

                                            </ul>
                                        </li>
                                        <li class="zr-detailer" v-for="info in away.tb">
                                            <ul>
                                                <li>{{info.time}}</li>
                                                <li>{{info.score}}</li>
                                                <li>{{info.shoot}}</li>
                                                <li>{{info.rebs}}</li>
                                                <li>{{info.assists}}</li>
                                                <li>{{info.steals}}</li>
                                                <li>{{info.block_shot}}</li>
                                                <li>{{info.fehlpass}}</li>
                                                <li>{{info.foul}}</li>

                                            </ul>
                                        </li>
                                    </ul>
                                </slide>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--主队统计-->
            <div class="zhedie-box">
                <div class="gl-nav">{{match.homesxname}}统计</div>
                <div class="gl-box fx-zr-box">
                    <div class="dataBox">
                        <div class="zr-detail">
                            <ul class="zr-detail-left">
                                <li class="zr-detail-tit">首发球员</li>
                                <li v-for="info in home.sf">{{info.player}}</li>

                                <li class="zr-detail-tit">替补球员</li>
                                <li v-for="info in home.tb">{{info.player}}</li>

                            </ul>
                            <div class="scroll-cont ">
                                <slide>
                                    <ul class=" zr-detail-right table-tj">
                                        <li class="zr-detailer zr-detail-tit">
                                            <ul>
                                                <li>时间</li>
                                                <li>得分</li>
                                                <li>投篮</li>
                                                <li>篮板</li>
                                                <li>助攻</li>
                                                <li>抢断</li>
                                                <li>盖帽</li>
                                                <li>失误</li>
                                                <li>犯规</li>
                                            </ul>
                                        </li>

                                        <li class="zr-detailer" v-for="info in home.sf">
                                            <ul>

                                                <li>{{info.time}}</li>
                                                <li>{{info.score}}</li>
                                                <li>{{info.shoot}}</li>
                                                <li>{{info.rebs}}</li>
                                                <li>{{info.assists}}</li>
                                                <li>{{info.steals}}</li>
                                                <li>{{info.block_shot}}</li>
                                                <li>{{info.fehlpass}}</li>
                                                <li>{{info.foul}}</li>
                                            </ul>
                                        </li>

                                        <li class="zr-detailer zr-detail-tit">
                                            <ul>
                                                <li>时间</li>
                                                <li>得分</li>
                                                <li>投篮</li>
                                                <li>篮板</li>
                                                <li>助攻</li>
                                                <li>抢断</li>
                                                <li>盖帽</li>
                                                <li>失误</li>
                                                <li>犯规</li>

                                            </ul>
                                        </li>
                                        <li class="zr-detailer" v-for="info in home.tb">
                                            <ul>
                                                <li>{{info.time}}</li>
                                                <li>{{info.score}}</li>
                                                <li>{{info.shoot}}</li>
                                                <li>{{info.rebs}}</li>
                                                <li>{{info.assists}}</li>
                                                <li>{{info.steals}}</li>
                                                <li>{{info.block_shot}}</li>
                                                <li>{{info.fehlpass}}</li>
                                                <li>{{info.foul}}</li>

                                            </ul>
                                        </li>
                                    </ul>
                                </slide>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sk-btips">
                500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
            </div>
        </div>

        <div v-else>
            <div class="ui-empty" style="padding: 1.54rem 0;">
                <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                <!--<if: message />--><div class="ui-empty-dfont">很抱歉，没有数据</div>
                <!--<if: extraText />-->
            </div>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import meSports from '~components/detail/basketball/situation/meSports.vue'
    import slide from '~components/detail/basketball/situation/slide.vue'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getSituationStatistic, {
                fid: params.fid
            })
        },

        components:{
            slide
        },
        data () {
            return {
                teamData: ['投篮', '三分', '罚球', '前篮板', '后篮板', '总篮板', '助攻', '抢断', '盖帽', '失误', '犯规', '得分'],
                sf: ['shoot', 'third', 'penalty_kick', 'offensiverebound', 'defensiverebound', 'rebs', 'assists', 'steals', 'block_shot', 'fehlpass', 'foul', 'score'],
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            match: function () {
                return this.$store.state.lqdetail.baseInfo
            },
            home: function () {
                return this.$store.state.lqdetail.situation.statistic && this.$store.state.lqdetail.situation.statistic.home
            },
            away: function () {
                return this.$store.state.lqdetail.situation.statistic && this.$store.state.lqdetail.situation.statistic.away
            },

        },
        methods: {
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getSituationStatistic, {
                    fid: this.$route.params.fid
                })
                this.$store.commit('endOneRefresh')
            }
        },
        watch: {
            loaded (loaded) {
                this.refreshScroll()
            },
            refreshTime () {
                this.fetchData()
            },
        },
        mounted () {
            this.fetchData()
        },
        filters: {
            getWidth (data1, data2) {  // 横条比例显示的数据处理
                data1 = data1 - 0
                data2 = data2 - 0
                let tmp = data1 + data2
                if (data1 === 0) { return "width:3%" }
                if (data1 === tmp) { return "width:3%" }
                return {width: data1 / (data1 + data2) * 100 + '%'}
            }
        }
    }
</script>
