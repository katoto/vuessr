<template>
<div class="l-full l-flex-column" v-if="baseinfo">
    <div class="detailTop topBarMove2" style="display: block;position:relative"><a onclick="history.back()" href="javascript:;" class="back-icon">返回</a><a href="/score/index.html#/basketball" class="link-index f26">比分首页</a>
        <div onclick="home.goLeague()" class="r-sn f24">WNBA</div>
        <div id="_concern" onclick="home.doConcern()" class="topR" style="display: none;">
            <div class="sk-gz"></div>
        </div>
        <div id="_sharemode" onclick="home.showShareMode()" class="topR" style="display: block;">
            <div class="sk-point"></div>
        </div>
        <div class="fen-box f30 responsive"><span id="team_home" class="itm-team each-resone">天空</span>
            <div id="type_vs" class="itm-bf" style="display: none;">&nbsp;&nbsp;VS&nbsp;&nbsp;</div>
            <div id="type_score" class="itm-bf" style="display: block;">
                <div class="fen-bf"><span id="home_score" class="score">106</span></div>
                <div class="fen-ld">:</div>
                <div class="fen-bf"><span id="away_score" class="score">112</span></div>
            </div><span id="team_away" class="itm-team each-resone">飞翼</span></div>
    </div>
    <div class="l-flex-1 l-relative">
        <detail-scroller ref="scroller" @switch="changeHeader" @end="reachEnd">
            <div class="zq-header _header" style="position: relative;top:0">
                <div class="fen-box">
                    <div class="itm-bf">
                        <div time-out="2" class-list="['fen-bf-active']" class="fen-bf-lq"><span class="score">106</span><span class="score">106</span></div>
                        <div class="fen-ld">:</div>
                        <div time-out="2" class-list="['fen-bf-active']" class="fen-bf-lq"><span class="score">112</span><span class="score">112</span></div>
                    </div>
                    <div onclick="location.href='team_home/index.html#!/team/lq/125/curr/gl'" class="left-img">
                        <div class="img-box"><img src="http://odds.500.com/static/soccerdata/images/BasketBallTeamPic/b8eec19219eb7fbc65ce7bd40fa9c8dc.gif"></div>
                        <h2 class="left-name f28"> 天空
                                    </h2>
                        <p class="header-pm f20">东部排名6</p>
                    </div>
                    <div onclick="location.href='team_home/index.html#!/team/lq/130/curr/gl'" class="right-img">
                        <div class="img-box"><img src="http://odds.500.com/static/soccerdata/images/BasketBallTeamPic/e57d0c76ea95e3a33ff0d1a9157bb1ef.png"></div>
                        <h2 class="right-name f28">飞翼
                                    </h2>
                        <p class="header-pm f20">西部排名5</p>
                    </div>
                </div>
                <div class="game-info">
                    <div class="game-state f24">完场</div>
                    <div class="game-time f20">07-17 04:30</div>
                </div>
            </div>
            <div slot="navigator" class="navigator hide">
                <ul>
                    <li :class="{cur: ~$route.path.indexOf('/situation')}">
                        <router-link :to="{name: 'basketball-detail-situation-event'}" replace>
                            <span>赛况<i class="sktab-arrow"></i></span>
                        </router-link>
                    </li>
                    <li :class="{cur: ~$route.path.indexOf('/analysis')}">
                        <router-link :to="{name: 'basketball-detail-analysis-zj'}" replace>
                            <span>分析<i class="sktab-arrow"></i></span>
                        </router-link>

                    </li>
                    <li :class="{cur: ~$route.path.indexOf('/odds')}">
                        <router-link :to="{name: 'basketball-detail-odds-shengfu'}" replace>
                            <span>赔率<i class="sktab-arrow"></i></span>
                        </router-link>
                    </li>
                    <li :class="{cur: ~$route.path.indexOf('/comment')}">
                        <router-link :to="{name: 'basketball-detail-comment'}" replace>
                            <span>聊球<i class="sktab-arrow"></i></span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="navigator " style="width: 0"></div>
            <div class="main-inner2">
                <router-view></router-view>
            </div>
        </detail-scroller>
    </div>
</div>
</template>

<script>
    import detailScroller from '~components/detail_scroller.vue'
    import {
        aTypes,
        mTypes
    } from '~store/lqdetail/mchao'
    export default {
        components: {
            detailScroller
        },
        computed: {
            baseinfo() {
                return this.$store.state.mchao.baseinfo
            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let baseInfo = this.$store.state.mchao.baseInfo
                if (!baseInfo || this.$store.state.mchao.baseInfo.fid !== this.$route.params.fid) {
                    await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                }
                this.$store.commit('endOneRefresh')
            },
            changeHeader (status) {
                if (status) {
                    this.$el.querySelector('.detailTop').className = 'detailTop topBarMove'
                } else {
                    this.$el.querySelector('.detailTop').className = 'detailTop topBarMove2'
                }
            },
            reachEnd () {
                this.$store.commit(mTypes.updateReachEndTime)        // 更新滚动时间戳
            },
            updateScroller () {
                this.$refs.scroller.update()
            },
        },
        async mounted () {
            this.fetchData()
        },
        destroyed () {
            this.$store.commit(mTypes.reset)
        },
        watch: {
            '$route.path' (path) {
                this.$refs.scroller.update()
                if (~path.indexOf('/crazybet')) {
                    this.$refs.scroller.scrollTo(document.querySelector('.zq-header').offsetHeight, true)
                    this.$refs.scroller.switchStop(true)
                } else {
                    this.$refs.scroller.scrollTo(0, true)
                    this.$refs.scroller.switchStop(false)
                }
            },
            '$store.state.mchao.scTime' () {
                this.updateScroller()
            }
        }
    }
</script>

<style lang="css">

</style>
