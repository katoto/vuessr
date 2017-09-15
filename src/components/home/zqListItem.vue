<template>

    <li class="one-game" :class="{'__first_no_end': match._flag}"
        >
        <!-- 比赛时间信息 、猜球、有料、加时 -->
        <div class="game-info">
            {{match.order}}<span class="two_blank" v-if="match.order"></span>{{match.simpleleague}}<span class="two_blank" v-if="match.simpleleague"></span>

            <span v-if="match.status == StatusCode.ENDED && match.extra_exist == '1'">加时 {{match.extra_time_score}}<span class="two_blank" v-if="match.status == StatusCode.ENDED && match.extra_statusid == '13'"></span></span>
            <span v-if="match.status == StatusCode.ENDED && match.extra_statusid == '13'">点球 {{match.spot_kick_score}}</span>

            <template v-if="feature.d[match.status] && match.extra_info">
                <span class="crazy-guess" v-if="match.extra_info.iscrazybet==='1' && $route.query.iosspecial !== '1'">猜球</span><span
                    class="crazy-guess" v-if="match.extra_info.isrecommend === '1'">有料</span>
            </template>

            <div class="game-info-r">{{match.matchtime.substring(5, 16)}}</div>
        </div>
        <!-- 比赛详细信息 -->
        <div class="game-detail">
            <!-- 左边的球队信息、近六场 -->
            <router-link class="game-detail-l l-flex-column" v-tap="{methods: goDetail}" :to="{path: detailPath, query: $route.query}">
                <div class="game-item">
                    <div class="game-name"><img data-inited="0"
                                                src="~assets/style/images/home/zq-logo.png"
                                                alt="主队图标"
                                                :data-src="match.homelogo">
                                                {{match.homesxname}}
                                                <em v-if="match.homestanding && match.homestanding !== '0' && match.homestanding != '-1'">{{match.homestanding | rankFmt}}</em>
                                                <em v-if="match.zlc === '1'">(中)</em>
                                                <em class="red-c" v-if="match.home_red_counts !== '' && match.home_red_counts !== '0'">{{match.home_red_counts}}</em>
                    </div>
                    <div class="game-lately" v-if="match.status === StatusCode.NOT_STARTED && view==='1'">
                        {{match.extra_info && match.extra_info.homerecord}}
                    </div>
                    <template v-if="feature.e[match.status]"><!--正在开打-->
                        <div class="game-lately score-half">
                            <em class="first-half" v-if="match.homehalfscore && match.status !== StatusCode.FIRST_HALF">{{match.homehalfscore}}</em>
                            <!--<em class="second-half">{{match.homescore}}</em>-->
                            <move :score="match.homescore" :ready="ready"></move>

                        </div>
                    </template>
                    <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                        <div class="game-lately score-half">
                            <em class="first-half">{{match.homehalfscore}}</em>
                            <em class="second-half had-over">{{match.homescore}}</em>

                            <!--<em class="first-half">{{match.awayhalfscore}}</em>
                            <em class="second-half">{{match.awayscore}}</em>-->
                        </div>
                    </template>
                </div>
                <div class="game-item ">
                    <div class="game-name"><img data-inited="0"
                                                src="~assets/style/images/home/zq-logo.png"
                                                alt="客队图标"
                                                :data-src="match.awaylogo">
                                                {{match.awaysxname}}
                                                <em v-if="match.awaystanding && match.awaystanding !== '0' && match.awaystanding != '-1'">{{match.awaystanding | rankFmt}}</em>
                                                <em class="red-c" v-if="match.away_red_counts !== '' && match.away_red_counts !== '0'">{{match.away_red_counts}}</em>
                    </div>

                    <template v-if="match.status === StatusCode.NOT_STARTED">
                        <div class="game-lately" v-if="view==='1' && match.extra_info">{{match.extra_info.awayrecord}}</div>

                    </template>
                    <template v-if="feature.e[match.status]"><!--正在开打-->
                        <div class="game-lately score-half">
                            <em class="first-half" v-if="match.awayhalfscore && match.status !== StatusCode.FIRST_HALF">{{match.awayhalfscore}}</em>
                            <move :score="match.awayscore" :ready="ready"></move>
                        </div>
                    </template>
                    <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                        <div class="game-lately score-half">
                            <em class="first-half">{{match.awayhalfscore}}</em>
                            <em class="second-half had-over">{{match.awayscore}}</em>
                            <!--<move :score="match.homescore" :ready="ready"></move>-->
                        </div>
                    </template>
                </div>
                <div class="odds-item" v-if="match.status === StatusCode.NOT_STARTED && view==='2'">
                    <ul>
                        <li>{{currodds[0] || '-'}}</li>
                        <li>{{currodds[1] || '-'}}</li>
                        <li>{{currodds[2] || '-'}}</li>
                    </ul>
        </div>
            </router-link>

            <!-- 右边的关注、直播情况-->
            <div class="game-detail-r">
                <!--<div class="btn-live">直播</div>-->
                <template v-if="match.status === StatusCode.NOT_STARTED"><!--未开始-->
                    <div class="follow had-follow" v-if="concern && concern.isfocus === '1'" v-tap="{methods: doConcern}">已关注</div>
                    <div class="follow" v-else v-tap="{methods: doConcern}">关注</div>
                </template>
                <template v-if="feature.e[match.status]"><!--正在开打-->
                    <template v-if="match.extra_info && match.extra_info.ishasvideo === '1'">
                        <div class="btn-live" v-tap="{methods: goPath}">视频</div>
                        <div class="live-time mid-font" v-if="match.status === StatusCode.MID">中场</div>
                        <div class="live-time" v-else>{{match.match_at | matchAtFmt(match.status === StatusCode.FIRST_HALF)}}<i class="dian">'</i></div>

                    </template>
                    <template v-else>
                        <div class="follow had-follow mid-live" v-if="match.status === StatusCode.MID">中场</div>
                        <div class="live-time  live-timer" v-else>{{match.match_at | matchAtFmt(match.status === StatusCode.FIRST_HALF)}}<i class="dian">'</i></div>
                    </template>
                </template>
                <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                    <template v-if="match.extra_info && match.extra_info.ishasvideo === '1'">
                        <div class="btn-live btn-once" v-tap="{methods: goPath}">回放</div>
                    </template>
                    <template v-else>
                        <div class="follow had-follow">完场</div>
                    </template>
                </template>

                <template v-if="feature.c[match.status]"><!--异常-->
                    <div class="follow">{{StatusName[match.status]}}</div>
                </template>

            </div>
        </div>
    </li>


</template>
<style scoped>
    .active {
        background-color: #f4f4f4;
    }
    .dian {
        animation: dianstyle 1s ease-out 0s infinite alternate;
        -webkit-animation: dianstyle 1s ease-out 0s infinite alternate;
        font-size: 0.4rem;
    }
    .one_blank {
        margin-right: .073333rem;
    }

    .two_blank {
        margin-right: .133333rem;
    }

    @keyframes dianstyle {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
    @-webkit-keyframes dianstyle {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
    .one-game {
        padding: .333333rem 0 .346667rem 0;
        border-bottom: 1px solid #eaeaea
    }

    .one-game:active {
        -webkit-tap-highlight-color: rgba(244,244,244,.6)
    }

    .game-info {
        font-size: .293333rem;
        color: #aab5bd;
        padding: 0 .4rem
    }

    .game-info .crazy-guess {
        color: #d25138;
        font-size: .266667rem;
        padding: 0 .066667rem;
        border: 1px solid rgba(210,81,56,.4);
        height: .346667rem;
        line-height: .346667rem;
        margin-left: .133333rem;
        box-sizing: border-box;
        border-radius: .026667rem
    }

    .game-info .crazy-guess:nth-child(1) {
        margin-left: .266667rem
    }

    .game-info .game-info-r {
        float: right;
        text-align: center
    }

    .game-detail {
        width: 100%;
        overflow: hidden;
        margin-top: .346667rem;
        padding-left: .4rem;
        box-sizing: border-box
    }

    .game-detail-l {
        float: left;
        width: 7.52rem;
        border-right: 1px solid #eaeaea;
        position: relative
    }
    .game-detail-l:active{background: #f4f4f4}

    .game-item {
        padding-right: .533333rem;
        box-sizing: border-box;
        width: 7.52rem;
        line-height: .64rem;
        height: .693333rem
    }
    .game-name {
        color: #242c35;
        font-size: .4rem;
        float: left;
        padding-left: .88rem;
        position: relative;
        height: .64rem;
        line-height: .64rem
    }

    .game-name em {
        font-size: .293333rem;
        color: #aab5bd;
        margin-left: .213333rem;
        position: relative;
        top:-0.05rem;
    }

    .game-name .red-c {
        display: inline-block;
        display:-moz-inline-stack;
        width: .24rem;
        padding-top: 0.05rem;
        line-height: 0.24rem;
        vertical-align: middle;
        background: #f44336;
        color: #fff;
        font-size: .24rem;
        text-align: center;
        position: relative;
        top:-0.05rem;
        padding-bottom: 0.02rem;
    }
    .game-name img {
        display: inline-block;
        vertical-align: middle;
        width: .533333rem;
        height: .533333rem;
        margin-right: .266667rem;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 50%;
        left: 0
    }

    .game-lately {
        color: #aab5bd;
        font-size: .293333rem;
        float: right;
        height: .64rem;
        line-height: .64rem;
        overflow: hidden;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .game-detail-r {
        float: left;
        width: 2.04rem;
        text-align: center;
        height: 1.28rem;
        position: relative
    }

    .follow {

        color: #5c788f;
        width: 1.2rem;
        margin: 0 auto;
        height: .533333rem;
        border: 1px solid #eaeaea;
        line-height: .533333rem;
        text-align: center;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 50%;
        margin-left: -.6rem;
        font-size: .346667rem;
        border-radius: .0533rem
    }
    .follow:active{background: #f4f4f4;}

    .had-follow {
        color: #aab5bd;
        border: none
    }

    .btn-live {
        width: 1.2rem;
        margin: 0 auto;
        height: .533333rem;
        border: 1px solid #eaeaea;
        line-height: .533333rem;
        text-align: center;
        color: #5c788f;
        font-size: .346667rem;
        border-radius: .0533rem
    }

    .btn-live:active {
        background: #f4f4f4
    }

    .live-time {
        font-size: .4rem;
        color: #36a171;
        width: 100%;
        text-align: center;
        margin-top: .186667rem
    }

    .live-timer {
        line-height: 1.28rem;
        margin-top: 0
    }

    .score-half .first-half {
        font-size: .346667rem;
        color: #aab5bd;
        width: .586667rem;
        text-align: right;
        height: .64rem;
        line-height: .64rem;
        overflow: hidden;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
    }
    .five-score .first-score{
        width:0.54rem;
    }

    .score-half .second-half {
        font-size: .453333rem;
        color: #36a171;
        display: inline-block;
        height: .64rem;
        line-height: .64rem;
        width: 1rem;
        text-align: right;
        overflow: hidden;
    }
    .btn-once {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 50%;
        margin-left: -.6rem
    }

    .game-name em {
        font-size: .293333rem;
        color: #aab5bd;
        margin-left: .13333rem;
    }
    .score-half .had-over {
        color: #242c35
    }
    .odds-item {
        width: 1.6rem;
        text-align: center;
        color: #aab5bd;
        font-size: .293333rem;
        position: absolute;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%)
    }

    .odds-item ul li {
        line-height: .426667rem
    }

    .mid-live {
        color: #36a171;
    }
    .mid-live-video {
        margin-top: .186667rem;
    }
    .mid-font {
        font-size: .346667rem;
    }
    .live-time i{-webkit-animation:flash 2s 2s ease infinite;-moz-animation:flash 2s 2s ease infinite;}
    @-webkit-keyframes flash{
    0%,50%,100%
    {opacity: 1;}
    25%,75%
    {opacity: 0;}
    }
    @-moz-keyframes flash{
    0%,50%,100%
    {opacity: 1;}
    25%,75%
    {opacity: 0;}
    }
</style>
<script>
    import {FootballStatusCode as StatusCode, FootballStatusName as StatusName} from '~common/constants'
    import scrollText from '~directives/scroll_text'
    import move from '~components/home/move.vue'
    import {aTypes} from '~store/home'
    export default {
        props: {
            match: {
                required: true,
                type: Object
            },
            view: {
                required: true,
                type: String
            },
            ready: { // 前端接口调用状态
                required: true,
                type: Boolean
            },
            concern: {
                required: false,
                default: () => {},
                type: Object
            }
        },
        data () {
            return {
                feature: {
                    a: {
                        [StatusCode.NOT_STARTED]: true,
                        [StatusCode.CANCELED]: true,
                        [StatusCode.CHANGED]: true,
                        [StatusCode.REMOVED]: true,
                        [StatusCode.PAUSED]: true,
                        [StatusCode.UNSURE]: true
                    },
                    b: {
                        [StatusCode.MID]: true,
                        [StatusCode.FIRST_HALF]: true,
                        [StatusCode.LAST_HALF]: true,
                        [StatusCode.ENDED]: true
                    },
                    c: {
                        [StatusCode.CANCELED]: true,
                        [StatusCode.CHANGED]: true,
                        [StatusCode.REMOVED]: true,
                        [StatusCode.PAUSED]: true,
                        [StatusCode.UNSURE]: true
                    },
                    d: {
                        [StatusCode.NOT_STARTED]: true,
                        [StatusCode.MID]: true,
                        [StatusCode.FIRST_HALF]: true,
                        [StatusCode.LAST_HALF]: true
                        // [StatusCode.ENDED]: true
                    },
                    e: {
                        [StatusCode.MID]: true,
                        [StatusCode.FIRST_HALF]: true,
                        [StatusCode.LAST_HALF]: true
                    }
                },
                StatusCode,
                StatusName,
                firstTime: {
                    status: true
                },
                timeSeed: 0,
                timer: null,
                _timeId: null
            }
        },
        methods: {
            goDetail () {
                this.$router.push({path: this.detailPath, query: this.$route.query})
            },
            doConcern () {
                this.$store.dispatch('ensureLogin')
                this.$store.dispatch(aTypes.doConcern, {fid: this.match.fid, vtype: '1'})
            },
            goPath () {
                this.$router.push(`/detail/football/${this.match.fid}/situation`)
            },
            makeInterVal (time) {
                this.timer = setInterval(() => {
                    this.timeSeed++
                }, time)
            }
        },
        computed: {
            currodds () {
                return this.match.extra_info.currodds.split('/')
            },
            detailPath () {
                if (this.feature.a[this.match.status]) {
                    return `/detail/football/${this.match.fid}/analysis/zj`
                }
                return `/detail/football/${this.match.fid}/situation`
            }
        },
        directives: {
            scrollText
        },
        components: {
            move
        },
        mounted () {
            this.makeInterVal(1000 * 60) // 设置定时器
            let detailL = this.$el.querySelector('.game-detail-l')
            detailL.addEventListener('touchstart', (e) => {
                detailL.classList.add('active')
            })
            detailL.addEventListener('touchend', (e) => {
                detailL.classList.remove('active')
            })
        },
        filters: {
            matchtimeFmt: (macthtime) => {
                return macthtime.match(/\d{2}:\d{2}/)[0]
            },
            matchdateFmt: (macthtime) => {
                return macthtime.match(/\d{2}-\d{2}/)[0]
            },
            // eslint-disable-next-line
            matchAtFmt: (match_at, isFirstHalf) => {
                // eslint-disable-next-line
                let second = Number(match_at)
                if (second >= 45 * 60) {
                    return isFirstHalf ? '45+' : '90+'
                }
                let minute = Math.ceil(Number(match_at) / 60)
                if (minute <= 0) {
                    minute = 1
                }
                return isFirstHalf ? minute : (minute + 45)
            },
            matchtimeFm: (macthtime) => macthtime.match(/\d{2}:\d{2}/)[0],
            truncate: function (input, length, tail) {
                if (input.length <= length) {
                    return input
                }
                return input.slice(0, length) + (tail || '...')
            },
            contains: function (list, item) {
                if (!list || !list.length) {
                    return false
                }
                return list.indexOf(item) > -1
            },
            rankFmt: (rank) => {
                if (!rank || rank === '0') return ''
                return `[${Number(rank)}]`
            },
            redCardFmt: (count) => {
                if (!count || count === '0') return ''
                return count
            }
        },
        watch: {
            // 定时标志
            timeSeed () {
                if (this.match.status === StatusCode.ENDED || this.match.status === StatusCode.CANCELED) {
                    clearInterval(this.timer)
                }
                this.match.match_at = this.match.match_at - 0 + 60 // 自动加一分钟
            }
        }
    }
</script>
