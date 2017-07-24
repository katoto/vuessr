<template>
    <div class="l-full l-flex-column">
        <div class="detailTop topBarMove2" style="display: block;">
            <a class="back-icon" onclick="history.back()" href="javascript:;">返回</a>
            <router-link to="/home/zq/jczq/cur" class="link-index f26">比分首页</router-link>

            <div onclick="home.goLeague()" class="r-sn f24">WNBA</div>
            <div id="_concern" style="display: none" class="topR" onclick="home.doConcern()">
                <div class="sk-gz"></div>
            </div>
            <div id="_sharemode" style="display: block;" class="topR" onclick="home.showShareMode()">
                <div class="sk-point"></div>
            </div>
            <div class="fen-box f30 responsive" v-if="match">
                <span class="itm-team each-resone" id="team_home">{{match.homesxname}}</span>

                <div class="itm-bf" v-if="match.status == StatusCode.NOT_STARTED">&nbsp;&nbsp;VS&nbsp;&nbsp;</div>
                <div class="itm-bf" v-else>
                    <div class="fen-bf-lq"><span id="home_score" class="score">{{match.homescore}}</span></div>
                    <div class="fen-ld">:</div>
                    <div class="fen-bf-lq"><span id="away_score" class="score">{{match.awayscore}}</span></div>
                </div>
                <span class="itm-team each-resone" id="team_away">{{match.awaysxname}}</span>
            </div>
        </div>

        <div class="l-flex-1 l-relative">
            <detail-scroller ref="scroller" @switch="changeHeader" @end="reachEnd">
                <div class="zq-header _header">
                    <div class="fen-box">

                        <div class="itm-bf" v-if="match.status != StatusCode.NOT_STARTED">
                            <div class="fen-bf-lq"  time-out='2'>
                                <span class="score">{{match.awayscore || 0}}</span>
                                <span class="score">{{match.awayscore || 0}}</span>
                            </div>
                            <div class="fen-ld">:</div>
                            <div class="fen-bf-lq" time-out='2'>
                                <span class="score">{{match.homescore || 0}}</span>
                                <span class="score">{{match.homescore || 0}}</span>
                            </div>
                        </div>

                        <div v-if="match.status == StatusCode.NOT_STARTED" class="wks">VS</div>


                        <div class="left-img" v-tap="{methods: goTeam, teamId: match.homeid}">
                            <div class="img-box">
                                <img :src="match.awaylogo">
                            </div>
                            <h2 class="left-name f28">{{match.awaysxname}}</h2>

                            <p class="header-pm f20">{{match.astr?match.astr:'暂无排名'}}</p>
                        </div>
                        <div class="right-img" v-tap="{methods: goTeam, teamId: match.awayid}">
                            <div class="img-box">
                                <img :src="match.awaylogo">
                            </div>
                            <h2 class="right-name f28">{{match.homesxname}}</h2>

                            <p class="header-pm f20">{{match.hstr?match.hstr:'暂无排名'}}</p>
                        </div>
                    </div>
                    <div class="game-info">
                        <div v-if="match.status === StatusCode.FIRST_HALF || match.status === StatusCode.LAST_HALF"
                             class="game-state f24">{{ match.match_at|matchAtFmt(match.status == StatusCode.FIRST_HALF)}}<i class="dian">'</i>
                        </div>
                        <div v-if="match.status === StatusCode.MID" class="game-state f24">中场休息</div>
                        <div v-if="match.status === StatusCode.ENDED" class="game-state f24">完场</div>
                        <div class="game-time f20">{{match.matchtime.slice(5,16)}}</div>

                    </div>

                </div>

                <div slot="navigator" class="navigator hide">
                    <ul>
                        <li
                                :class="{cur: ~$route.path.indexOf('/situation')}">
                            <router-link :to="{name: 'basketball-detail-situation-event'}" replace>
                                <span>赛况<i class="sktab-arrow"></i></span>
                            </router-link>
                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/analysis')}">
                            <router-link :to="{name: 'football-detail-analysis-zj'}" replace>
                                <span>分析<i class="sktab-arrow"></i></span>
                            </router-link>

                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/odds')}">
                            <router-link :to="{name: 'football-detail-odds-europe'}" replace>
                                <span>赔率<i class="sktab-arrow"></i></span>
                            </router-link>
                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/comment')}">
                            <router-link :to="{name: 'football-detail-comment'}" replace>
                                <span>聊球<i class="sktab-arrow"></i></span>
                            </router-link>
                        </li>

                    </ul>
                </div>
                <div class="navigator" style="width: 0"></div>
                <div class="main-inner2">
                    <router-view></router-view>
                </div>

            </detail-scroller>

        </div>
        <div  v-if="outer.component" class="popLayer"></div>
        <transition name="slide">
            <div v-if="outer.component" class="l-full" style="z-index: 101">
                <component :is="outer.component" :params="outer.params"></component>
            </div>
        </transition>

        <refresh/>
    </div>
</template>

<script>
    import {BasketballStatusCode as StatusCode} from '~common/constants'
    import refresh from '~components/refresh.vue'
    import detailScroller from '~components/detail_scroller.vue'
    import {aTypes, mTypes} from '~store/lqdetail'
    export default {
        components:{
            refresh,detailScroller
        },
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getBaseInfo, params.fid)
        },

        data(){
            return{
                StatusCode
            }
        },
        computed: {
            match:function () {
                return this.$store.state.lqdetail.baseInfo;
            },
            outer () {
                return this.$store.state.lqdetail.outer
            },
        },
        async mounted () {
            this.fetchData()
            if (~this.$route.path.indexOf('/crazybet')) {
                this.$refs.scroller.scrollTo(document.querySelector('.zq-header').offsetHeight, true)
                this.$refs.scroller.switchStop(true)
            }
        },

        destroyed () {
            this.$store.commit(mTypes.reset)
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let baseInfo = this.$store.state.lqdetail.baseInfo
                if (this.$store.state.lqdetail.baseInfo.fid !== this.$route.params.fid || !baseInfo) {
                    console.log(this.$route.params.fid);
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
                this.$store.commit(mTypes.updateReachEndTime)
            },
            updateScroller () {
                this.$refs.scroller.update()
            },
            goTeam ({teamId}) {
                this.$router.push(`/team/basketball/${teamId}/sc`)
            }
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
            '$store.state.lqdetail.scTime' () {
                this.updateScroller()
            }
        },
        filters: {
            matchAtFmt: (matchAt, isFirstHalf) => {
                let second = Number(matchAt)
                if (second >= 45 * 60) {
                    return isFirstHalf ? '45+' : '90+'
                }
                let minute = Math.ceil(Number(matchAt) / 60)
                if (minute <= 0) {
                    minute = 1
                }
                return isFirstHalf ? minute : (minute + 45)
            }
        }

    }

</script>
<style>
    .detailTop {
        position: relative;
    }

    .detailTop:after{
        content: '';
        z-index: -1;
        position: absolute;
        background-color: #242c35;
        top: 0;
        left: 0;
        right: 0;
        height:1.1893rem;
    }
    .zq-header {
        position: relative;
        top: 0;
    }
    .navigator {
        top: 0
    }

    .sktab-arrow {
        border: none !important;
        margin-left: auto !important;

    }


    .slide-enter-active, .slide-leave-active {
        -webkit-transition: -webkit-transform .3s ease;
        transition: transform .3s ease;
    }
    .slide-enter-active, .slide-leave {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }

    .slide-leave-active, .slide-enter {
        -webkit-transform: translate(0, 100%);
        transform: translate(0, 100%);
    }


</style>
