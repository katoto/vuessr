<template>

    <li class="one-game" :class="{'__first_no_end': match._flag}"
        >
        <!-- 比赛时间信息 、猜球、有料、加时 -->
        <div class="game-info">
            {{match.order}}&nbsp;&nbsp;{{match.simpleleague}}&nbsp;

            <span v-if="match.status == StatusCode.ENDED">总分 {{match.total}}&nbsp;</span>

            <div class="game-info-r">{{match.matchtime.substring(5, 16)}}</div>
        </div>
        <!-- 比赛详细信息 -->
        <div class="game-detail">
            <!-- 左边的球队信息、近六场 -->
            <router-link class="game-detail-l l-flex-column" v-tap="{methods: goDetail}" :to="detailPath">

                <div class="game-item ">
                    <div class="game-name"><img data-inited="0"
                                                src="http://cache.500boss.com/mobile/touch/images/bifen/mr-base.png"
                                                alt="客队图标"
                                                :data-src="match.awaylogo || 'http://cache.500boss.com/mobile/touch/images/bifen/mr-base.png'">{{match.awaysxname}}
                    </div>

                    <template v-if="match.status === StatusCode.NOT_STARTED">
                        <div class="game-lately" v-if="view==='1'">{{match.extra_info.awayrecord}}</div>

                    </template>
                    <template v-if="feature.a[match.status]"><!--正在开打-->
                        <div class="game-lately score-half base-score-half">
                            <em class="first-half" v-if="ascore[0]">{{ascore[0]}}</em>
                            <em class="first-half" v-if="ascore[1]">{{ascore[1]}}</em>
                            <em class="first-half" v-if="ascore[2]">{{ascore[2]}}</em>
                            <em class="second-half">{{match.awayscore}}</em>
                        </div>
                    </template>
                    <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                        <div class="game-lately score-half base-score-half">
                            <em class="first-half">{{ascore[0]}}</em>
                            <em class="first-half">{{ascore[1]}}</em>
                            <em class="first-half">{{ascore[2]}}</em>
                            <em class="second-half had-over">{{match.awayscore}}</em>
                        </div>
                    </template>
                </div>
                <div class="game-item">
                    <div class="game-name"><img data-inited="0"
                                                src="http://cache.500boss.com/mobile/touch/images/bifen/mr-base.png"
                                                alt="主队图标"
                                                :data-src="match.homelogo || 'http://cache.500boss.com/mobile/touch/images/bifen/mr-base.png'">{{match.homesxname}}
                    </div>
                    <div class="game-lately" v-if="match.status === StatusCode.NOT_STARTED && view==='1'">
                        {{match.extra_info.homerecord}}
                    </div>
                    <template v-if="feature.a[match.status]"><!--正在开打-->
                        <div class="game-lately score-half base-score-half">
                            <em class="first-half" v-if="hscore[0]">{{hscore[0]}}</em>
                            <em class="first-half" v-if="hscore[1]">{{hscore[1]}}</em>
                            <em class="first-half" v-if="hscore[2]">{{hscore[2]}}</em>
                            <!--<em class="second-half">{{match.homescore}}</em>-->
                            <move class="second-half" :score="match.homescore" ready="true"></move>
                        </div>
                    </template>
                    <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                        <div class="game-lately score-half base-score-half">
                            <em class="first-half">{{hscore[0]}}</em>
                            <em class="first-half">{{hscore[1]}}</em>
                            <em class="first-half">{{hscore[2]}}</em>
                            <em class="second-half had-over">{{match.homescore}}</em>
                            <!--<move class="second-half" :score="match.homescore" ready="true"></move>-->
                        </div>
                    </template>
                </div>
                <!--<div class="odds-item" v-if="match.status === StatusCode.NOT_STARTED && view==='2'">
                    <ul>
                        <li>{{currodds[0]}}</li>
                        <li>{{currodds[1]}}</li>
                        <li>{{currodds[2]}}</li>
                    </ul>
                </div>-->
            </router-link>



            <!-- 右边的关注、直播情况-->
            <div class="game-detail-r">
                <!--<div class="btn-live">直播</div>-->
                <template v-if="match.status === StatusCode.NOT_STARTED"><!--未开始-->
                    <div class="follow had-follow" v-if="concern && concern.isfocus === '1'" v-tap="{methods: doConcern}">已关注</div>
                    <div class="follow" v-else v-tap="{methods: doConcern}">关注</div>
                </template>
                <template v-if="feature.a[match.status]"><!--正在开打-->
                    <div class="score-live">第四节</div>
                    <div class="live-time">68'32''</div>
                </template>
                <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                    <div class="follow had-follow">已结束</div>
                </template>

                <template v-if="feature.b[match.status]"><!--异常-->
                    <div class="follow">{{StatusName[match.status]}}</div>
                </template>

            </div>
        </div>
    </li>


</template>
<style scoped>
    .base-score-half .second-half.had-over {
        color: #242c35
    }
    .one-game {
        padding: .333333rem .4rem .346667rem .4rem;
        border-bottom: 1px solid #eaeaea
    }

    .one-game:active {
        -webkit-tap-highlight-color: rgba(244, 244, 244, .6)
    }

    .game-info {
        color: #aab5bd
    }

    [data-dpr="1"] .game-info {
        font-size: 11px
    }

    [data-dpr="2"] .game-info {
        font-size: 22px
    }

    [data-dpr="3"] .game-info {
        font-size: 33px
    }

    .game-info .crazy-guess {
        color: #d25138;
        padding: 0 .066667rem;
        border: 1px solid #d25138;
        height: .346667rem;
        line-height: .346667rem;
        margin-left: .133333rem;
        box-sizing: border-box;
        border-radius: .053333rem
    }

    [data-dpr="1"] .game-info .crazy-guess {
        font-size: 10px
    }

    [data-dpr="2"] .game-info .crazy-guess {
        font-size: 20px
    }

    [data-dpr="3"] .game-info .crazy-guess {
        font-size: 30px
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
        margin-top: .346667rem
    }

    .game-detail-l {
        float: left;
        width: 7.52rem;
        border-right: 1px solid #eaeaea;
        position: relative;
    }

    .game-item {
        padding-right: .533333rem;
        box-sizing: border-box;
        width: 7.52rem;
        line-height: .64rem;
        height: .64rem
    }

    .game-name {
        color: #242c35;
        font-size: .4rem;
        float: left;
        padding-left: .88rem;
        position: relative;
        height: .64rem
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

    .game-lately {
        color: #aab5bd;
        float: right
    }

    [data-dpr="1"] .game-lately {
        font-size: 11px
    }

    [data-dpr="2"] .game-lately {
        font-size: 22px
    }

    [data-dpr="3"] .game-lately {
        font-size: 33px
    }

    .game-detail-r {
        float: right;
        width: 1.64rem;
        text-align: center;
        height: 1.28rem;
        position: relative
    }

    .follow {
        color: #d25138;
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
        margin-left: -.6rem
    }

    [data-dpr="1"] .follow {
        font-size: 13px
    }

    [data-dpr="2"] .follow {
        font-size: 26px
    }

    [data-dpr="3"] .follow {
        font-size: 39px
    }

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
        color: #5c788f
    }

    .btn-live:active {
        background: #f4f4f4
    }

    .live-time {
        color: #36a171;
        width: 100%;
        text-align: center;
        margin-top: .186667rem
    }

    [data-dpr="1"] .live-time {
        font-size: 15px
    }

    [data-dpr="2"] .live-time {
        font-size: 30px
    }

    [data-dpr="3"] .live-time {
        font-size: 45px
    }

    .live-timer {
        line-height: 1.28rem;
        margin-top: 0
    }

    .score-half .first-half {
        color: #aab5bd;
        width: .586667rem;
        text-align: right;
        display: inline-block;
        height: .64rem;
        line-height: .64rem
    }

    [data-dpr="1"] .score-half .first-half {
        font-size: 13px
    }

    [data-dpr="2"] .score-half .first-half {
        font-size: 26px
    }

    [data-dpr="3"] .score-half .first-half {
        font-size: 39px
    }

    .score-half .second-half {
        color: #36a171;
        display: inline-block;
        height: .64rem;
        line-height: .64rem;
        width: 1rem;
        text-align: right
    }

    [data-dpr="1"] .score-half .second-half {
        font-size: 17px
    }

    [data-dpr="2"] .score-half .second-half {
        font-size: 34px
    }

    [data-dpr="3"] .score-half .second-half {
        font-size: 51px
    }

    .btn-once {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 50%;
        margin-left: -.6rem
    }


</style>
<script>
    import {BasketballStatusCode as StatusCode, FootballStatusName as StatusName} from '~common/constants'
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
                        [StatusCode.SECTION_1]: true,
                        [StatusCode.SECTION_2]: true,
                        [StatusCode.SECTION_3]: true,
                        [StatusCode.SECTION_4]: true
                    },
                    b: {
                        [StatusCode.CHANGED]: true
                    }
                },
                StatusCode,
                StatusName
            }
        },
        methods: {
            goDetail () {
                this.$router.push(this.detailPath)
            },
            doConcern () {
                this.$store.dispatch(aTypes.doConcern, {fid: this.match.fid, vtype: '2'})
            }
        },
        computed: {
            currodds () {
                return this.match.extra_info.currodds.split('/')
            },
            detailPath () {
                if (this.match.status === StatusCode.NOT_STARTED || this.match.status === StatusCode.CHANGED) {
                    return `/detail/basketball/${this.match.fid}/analysis/zj`
                }
                return `/detail/basketball/${this.match.fid}/situation/event`
            },
            ascore () {
                return this.match.ascore.split('-')
            },
            hscore () {
                return this.match.hscore.split('-')
            }
        },
        directives: {
            scrollText
        },
        components: {
            move
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
            }
        }
    }
</script>
