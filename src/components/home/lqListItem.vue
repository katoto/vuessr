<template>

    <li class="one-game" :class="{'__first_no_end': match._flag}"
        >
        <!-- 比赛时间信息 、猜球、有料、加时 -->
        <div class="game-info">
            {{match.order}}<span class="two_blank" v-if="match.order"></span>{{match.simpleleague}}<span class="two_blank" v-if="match.simpleleague"></span>

            <span v-if="match.status == StatusCode.ENDED">总分 {{match.total}}<span class="two_blank" v-if="match.status == StatusCode.ENDED"></span></span>

            <div class="game-info-r">{{match.matchtime.substring(5, 16)}}</div>
        </div>
        <!-- 比赛详细信息 -->
        <div class="game-detail">
            <!-- 左边的球队信息、近六场 -->
            <router-link class="game-detail-l l-flex-column" v-tap="{methods: goDetail}" :to="detailPath">

                <div class="game-item ">
                    <div class="game-name"><img data-inited="0"
                                                src="~assets/style/images/home/lq-logo.png"
                                                alt="客队图标"
                                                :data-src="match.awaylogo">{{match.awaysxname}}
                        <em v-if="match.awaystanding && match.awaystanding != '-1'">{{match.awaystanding | rankFmt}}</em>
                    </div>

                    <template v-if="match.status === StatusCode.NOT_STARTED">
                        <div class="game-lately" v-if="view==='1'">{{match.extra_info.awayrecord}}</div>

                    </template>
                    <template v-if="feature.a[match.status]"><!--正在开打-->
                        <div class="game-lately score-half base-score-half five-score">
                            <em class="first-half" v-if="ascore[0]">{{ascore[0]}}</em>
                            <em class="first-half" v-if="ascore[1]">{{ascore[1]}}</em>
                            <em class="first-half" v-if="ascore[2]">{{ascore[2]}}</em>
                            <em class="first-half" v-if="ascore[3]">{{ascore[3]}}</em>
                            <em class="first-half" v-if="asadd">{{asadd}}</em>
                            <em class="second-half">{{match.awayscore}}</em>
                        </div>
                    </template>
                    <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                        <div class="game-lately score-half base-score-half five-score">
                            <em class="first-half">{{ascore[0]}}</em>
                            <em class="first-half">{{ascore[1]}}</em>
                            <em class="first-half">{{ascore[2]}}</em>
                            <em class="first-half">{{ascore[3]}}</em>
                            <em class="first-half" v-if="asadd">{{asadd}}</em>
                            <em class="second-half had-over">{{match.awayscore}}</em>
                        </div>
                    </template>
                </div>
                <div class="game-item">
                    <div class="game-name"><img data-inited="0"
                                                src="~assets/style/images/home/lq-logo.png"
                                                alt="主队图标"
                                                :data-src="match.homelogo">{{match.homesxname}}
                        <em v-if="match.homestanding && match.homestanding != '-1'">{{match.homestanding | rankFmt}}</em>
                    </div>
                    <div class="game-lately" v-if="match.status === StatusCode.NOT_STARTED && view==='1'">
                        {{match.extra_info.homerecord}}
                    </div>
                    <template v-if="feature.a[match.status]"><!--正在开打-->
                        <div class="game-lately score-half base-score-half five-score">
                            <em class="first-half" v-if="hscore[0]">{{hscore[0]}}</em>
                            <em class="first-half" v-if="hscore[1]">{{hscore[1]}}</em>
                            <em class="first-half" v-if="hscore[2]">{{hscore[2]}}</em>
                            <em class="first-half" v-if="hscore[3]">{{hscore[3]}}</em>
                            <em class="first-half" v-if="hsadd">{{hsadd}}</em>
                            <!--<em class="second-half">{{match.homescore}}</em>-->
                            <move class="second-half" :score="match.homescore" ready="true"></move>
                        </div>
                    </template>
                    <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                        <div class="game-lately score-half base-score-half five-score">
                            <em class="first-half">{{hscore[0]}}</em>
                            <em class="first-half">{{hscore[1]}}</em>
                            <em class="first-half">{{hscore[2]}}</em>
                            <em class="first-half">{{hscore[3]}}</em>
                            <em class="first-half" v-if="hsadd">{{hsadd}}</em>
                            <em class="second-half had-over">{{match.homescore}}</em>
                            <!--<move class="second-half" :score="match.homescore" ready="true"></move>-->
                        </div>
                    </template>
                </div>
                <!--<div class="odds-item" v-if="match.status === StatusCode.NOT_STARTED && view==='2'">-->
                    <!--<ul>-->
                        <!--<li>{{currodds[0]}}</li>-->
                        <!--<li>{{currodds[1]}}</li>-->
                        <!--<li>{{currodds[2]}}</li>-->
                    <!--</ul>-->
                <!--</div>-->
            </router-link>



            <!-- 右边的关注、直播情况-->
            <div class="game-detail-r">
                <!--<div class="btn-live">直播</div>-->
                <template v-if="match.status === StatusCode.NOT_STARTED"><!--未开始-->
                    <div class="follow had-follow" v-if="concern && concern.isfocus === '1'" v-tap="{methods: doConcern}">已关注</div>
                    <div class="follow" v-else v-tap="{methods: doConcern}">关注</div>
                </template>
                <template v-if="feature.a[match.status]"><!--正在开打-->
                    <div class="score-live">{{match.status_desc}}</div>
                    <!--<div class="live-time" v-if="match.status !== StatusCode.MID">{{match.match_at}}</div>-->
                    <div class="live-time" v-if="match.status === StatusCode.MID">中场</div>
                </template>
                <template v-if="match.status === StatusCode.ENDED"><!--已结束-->
                    <div class="follow had-follow">完场</div>
                </template>

                <template v-if="feature.b[match.status]"><!--异常-->
                    <div class="follow">{{StatusName[match.status]}}</div>
                </template>

            </div>
        </div>
    </li>


</template>
<style scoped>
    .one_blank {
        margin-right: .073333rem;
    }

    .two_blank {
        margin-right: .133333rem;
    }
    .base-score-half .second-half.had-over {
        color: #242c35
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
        box-sizing: border-box;
    }

    .game-detail-l {
        float: left;
        width: 7.52rem;
        border-right: 1px solid #eaeaea;
        position: relative
    }

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
        margin-left: .13333rem;
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
    }
    .game-detail-r {
        float: left;
        width: 2.04rem;
        text-align: center;
        height: 1.28rem;
        position: relative
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
        font-size: .293333rem;
        float: right;
        display: table-cell;
        vertical-align:middle;
    }

    .game-detail-r {
        float: left;
        width: 2.04rem;
        text-align: center;
        height: 1.28rem;
        position: relative
    }

    .follow {
        font-size: .346667rem;
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
        width: .58rem;
        text-align: right;
        display: inline-block;
        height: .56rem;
        line-height: .56rem;
        overflow: hidden;
        display: inline-table;
    }
    .five-score .first-score{
        width:0.54rem;
    }
    .score-half .second-half {
        font-size: .453333rem;
        color: #36a171;
        display: inline-block;
        height: .56rem;
        line-height: .56rem;
        width: 1rem;
        text-align: right;
        overflow: hidden;display: inline-table;
    }
    .btn-once {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        left: 50%;
        margin-left: -.6rem
    }
    .score-live {
        font-size: .346667rem;
        color: #36a171;
        margin-top: .053333rem;
    }
</style>
<script>
    import {BasketballStatusCode as StatusCode, BasketballStatusDesc as StatusName} from '~common/constants'
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
                        [StatusCode.SECTION_4]: true,
                        [StatusCode.MID]: true,
                        [StatusCode.OVERTIME_1]: true,
                        [StatusCode.OVERTIME_2]: true,
                        [StatusCode.OVERTIME_3]: true,
                        [StatusCode.OVERTIME_4]: true
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
                this.$store.dispatch('ensureLogin')
                this.$store.dispatch(aTypes.doConcern, {fid: this.match.fid, vtype: '2'})
            },
            add (itm) {
                let sum = 0
                itm.map((item) => {
                    sum += Number(item)
                })
                return sum
            }
        },
        computed: {
        //            currodds () {
        //                return this.match.extra_info && this.match.extra_info.currodds && this.match.extra_info.currodds.split('/')
        //            },
            detailPath () {
                if (this.match.status === StatusCode.NOT_STARTED || this.match.status === StatusCode.CHANGED) {
                    return `/detail/basketball/${this.match.fid}/analysis/zj`
                }
                return `/detail/basketball/${this.match.fid}/situation/event`
            },
            ascore () {
                return this.match.ascore && this.match.ascore.split('/')[0].split('-')
            //                return this.match.ascore && this.match.ascore.substr(0,this.match.ascore.indexOf('/')).split('-')
            },
            hscore () {
                return this.match.hscore && this.match.hscore.split('/')[0].split('-')
            },
            asadd () {
                return this.match.ascore && this.match.ascore.split('/')[1] && this.add(this.match.ascore.split('/')[1].split('-'))
            },
            hsadd () {
                return this.match.hscore && this.match.hscore.split('/')[1] && this.add(this.match.hscore.split('/')[1].split('-'))
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
            matchAtFmt: (match_at) => {
                // eslint-disable-next-line
                if (match_at) {
                    let [minutes, seconds] = match_at.split(':')
                    return minutes + "'" + seconds + "''"
                }
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
            }
        }
    }
</script>
