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
                                        <div class="zhzl-vs-left " :class="away.zj[sf[idx]] < home.zj[sf[idx]] ? 'zhzl-gray' : 'zhzl-green'"
                                             :style="'width:' +getData(Number(away.zj[sf[idx]]),Number(home.zj[sf[idx]])) + '%' ">
                                        </div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="away.zj[sf[idx]] < home.zj[sf[idx]] ? 'zhzl-green' : 'zhzl-gray'"
                                             :style="'width:' + getData(Number(home.zj[sf[idx]]),Number(away.zj[sf[idx]])) + '%'">

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
    import {Scroller} from 'scroller'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getSituationStatistic, {
                fid: params.fid
            })
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
            scrollwidth:function () {
                return document.querySelector('.zr-detail-right').width;
            }
        },
        methods: {
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let baseInfo = this.$store.state.lqdetail.baseInfo
                if (!baseInfo || this.$store.state.lqdetail.baseInfo.fid !== this.$route.params.fid) {
                    baseInfo = await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                }

                await this.$store.dispatch(aTypes.getSituationStatistic, {
                    fid: this.$route.params.fid
                })
                this.$store.commit('endOneRefresh')
            },
            getData: function (data1, data2) {     // 横条比例显示的数据处理
                let tmp = data1 + data2
                if (data1 === 0) { return 3 }
                if (data1 === tmp) { return 3 }
                return data1 / (data1 + data2) * 100
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

            this.container = this.$el.querySelector('.scroll-cont')
            this.content = this.$el.querySelector('.zr-detail-right')
            const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
            this.scrollerObj = new Scroller((left, top, zoom) => {
                this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
        }, {
                bouncing: false,
                    scrollingX: true,
                    Locking: false,
                    scrollingY: false,
                    animationDuration: 150
            })
            this.scrollerObj.setSnapSize(this.container.offsetWidth)
            this.scrollerObj.setDimensions(this.container.offsetWidth, this.container.offsetHeight, this.content.offsetWidth, this.content.offsetHeight)
            let latestX = 0
            let latesY = 0
            let needLockY = false
            this.container.addEventListener('touchstart', (e) => {
                latestX = e.touches[0].pageX
                latesY = e.touches[0].pageY
                this.scrollerObj.doTouchStart(e.touches, e.timeStamp)
            e.preventDefault()
        }, false)
            this.container.addEventListener('touchmove', (e) => {
                if (Math.abs(latestX - e.touches[0].pageX) > Math.abs(latesY - e.touches[0].pageY)) {
                needLockY = true
            }
            latestX = e.touches[0].pageX
            latesY = e.touches[0].pageY

            needLockY && e.stopPropagation()
            this.scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
        }, false)

            this.container.addEventListener('touchend', (e) => {
                needLockY = false
                this.scrollerObj.doTouchEnd(e.timeStamp)
        }, false)

            this.container.addEventListener('touchcancel', (e) => {
                this.scrollerObj.doTouchEnd(e.timeStamp)
        }, false)
        }
    }
</script>
