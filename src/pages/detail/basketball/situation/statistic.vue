
<template>
    <div v-if="statistic">
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

            <skbtips></skbtips>
        </div>

        <div v-else>
            <no-data></no-data>

        </div>
    </div>
    <item-loader v-else></item-loader>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import itemLoader from '~components/detail/itemLoader.vue'
//    import meSports from '~components/detail/basketball/situation/meSports.vue'
    import skbtips from '~components/detail/skbtips.vue'
    import noData from '~components/no_data.vue'
    import slide from '~components/detail/basketball/situation/slide.vue'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getSituationStatistic, {
                fid: params.fid
            })
        },

        components: {
            slide, noData, skbtips, itemLoader
        },
        data () {
            return {
                teamData: ['投篮', '三分', '罚球', '前篮板', '后篮板', '总篮板', '助攻', '抢断', '盖帽', '失误', '犯规', '得分'],
                sf: ['shoot', 'third', 'penalty_kick', 'offensiverebound', 'defensiverebound', 'rebs', 'assists', 'steals', 'block_shot', 'fehlpass', 'foul', 'score']
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
                return this.$store.state.lqdetail.baseInfo
            },
            statistic () {
                return this.$store.state.lqdetail.situation.statistic
            },
            home () {
                return this.statistic && this.statistic.home
            },
            away () {
                return this.statistic && this.statistic.away
            }

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
            }
        },
        mounted () {
            this.fetchData()
        },
        filters: {
            getWidth (data1, data2) { // 横条比例显示的数据处理
                data1 = Number(data1)
                data2 = Number(data2)
                // let tmp = data1 + data2
                if (data1 == 0) { return 'width:3%' }
                // if (data1 === tmp) { return 'width:3%' }
                return {width: data1 / (data1 + data2) * 100 + '%'}
            }
        }
    }
</script>
<style scoped>
    .zhzl-list {
        margin: .533333rem .4rem 0
    }

    .zhzl-list li {
        height: 1.08rem
    }
    .responsive {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }
    .zhzl-left,
    .zhzl-right {
        color: #333;
        width: 2.106667rem;
        line-height: 1.066667rem
    }

    [data-dpr="1"] .zhzl-left,
    [data-dpr="1"] .zhzl-right {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-left,
    [data-dpr="2"] .zhzl-right {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-left,
    [data-dpr="3"] .zhzl-right {
        font-size: 33px
    }
    .zhzl-left {
        text-align: left
    }

    .zhzl-right {
        text-align: right
    }

    .each-resone {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%
    }
    .zhzl-classify {
        color: #aab5bd;
        line-height: .466667rem;
        text-align: center
    }

    [data-dpr="1"] .zhzl-classify {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-classify {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-classify {
        font-size: 33px
    }
    .responsive {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }
    .each-resone {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%
    }
    .zhzl-vs-left,
    .zhzl-vs-right {
        height: .106667rem;
        position: absolute;
        top: 0;
        background: #bcd0de
    }
    .green-bg,
    .zhzl-green {
        background: #5c788f
    }
    .zhzl-vs-left {
        right: 0;
        margin-right: .04rem
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
    .fx-zr-box .dataBox {
        border-bottom: 0;
        padding-bottom: 0;
        padding-top: .2rem
    }
    .zr-detail {
        overflow: hidden;
        width: 9.2rem;
        position: relative;
    }
    .zr-detail-left {
        float: left;
        width: 2.266667rem;
        color: #242c35;
        font-size: .32rem;
        position: absolute;
        left: 0;
        text-align: left
    }

    .zr-detail-left li {
        height: 1.066667rem;
        line-height: 1.066667rem;
        width: 2.266667rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .zr-detail-left .zr-detail-tit,
    .zr-detail-right .zr-detail-tit {
        height: .706667rem;
        line-height: .706667rem;
        color: #aab5bd
    }
    .scroll-cont {
        width: 7.066667rem;
        overflow: hidden;
        float: left;
        position: relative;
        left: 2.066667rem
    }

    .scroll-cont .zr-detail-right {
        overflow: scroll
    }
    .table-tj .zr-detailer {
        width: 9rem
    }


    .table-tj li ul li {
        width: 1rem
    }

    .zr-detail-left li em {
        width: .4rem;
        height: .4rem;
        background: #d25138;
        font-size: .293333rem;
        color: #fff;
        line-height: .4rem;
        text-align: center;
        display: inline-block;
        margin-left: .133333rem;
        border-radius: .066667rem
    }
    .zr-detailer ul {
        height: 1.066667rem;
        line-height: 1.066667rem
    }

    .zr-detail-tit ul {
        height: .706667rem;
        line-height: .706667rem
    }
    .zr-detail-right li ul li {
        float: left;
        width: 1.6rem
    }
    .table-tj .zr-detailer ul li:nth-child(1) {
        width: 1rem
    }
    .table-tj li ul li {
        width: 1rem
    }
    .zhedie-box {
        background: #fff
    }

    .zhedie-box:last-child {
        margin-bottom: 0
    }

</style>
