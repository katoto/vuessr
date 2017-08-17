<template>

    <li class="one-game" :class="{'__first_no_end': match._flag}"
        v-tap="{methods: goDetail, fid: match.fid}">
        <!-- 比赛时间信息 、猜球、有料、加时 -->
        <div class="game-info">
            {{match.order}}&nbsp;&nbsp;{{match.simpleleague}}<span class="crazy-guess" v-if="match.iscrazybet==='1'">猜球</span><span class="crazy-guess">有料</span>
            <div class="game-info-r">{{match.matchtime.substring(5, 16)}}</div>
        </div>
        <!-- 比赛详细信息 -->
        <div class="game-detail">
            <!-- 左边的球队信息、近六场 -->
            <div class="game-detail-l l-flex-column">
                <div class="game-item">
                    <div class="game-name"><img data-inited="0"  src="http://cache.500boss.com/mobile/touch/images/bifen/mr-foot.png" alt="主队图标" :data-src="match.homelogo || 'http://cache.500boss.com/mobile/touch/images/bifen/mr-foot.png'">阿森纳</div>
                    <div class="game-lately">胜胜平平负负</div>
                </div>
                <div class="game-item ">
                    <div class="game-name"><img data-inited="0"  src="http://cache.500boss.com/mobile/touch/images/bifen/mr-foot.png"  alt="客队图标" :data-src="match.awaylogo || 'http://cache.500boss.com/mobile/touch/images/bifen/mr-foot.png'">切尔西西</div>
                    <div class="game-lately">胜平胜平负负</div>
                </div>
            </div>
            <!-- 右边的关注、直播情况-->
            <div class="game-detail-r">
                <!--<div class="btn-live">直播</div>-->
                <!--<div class="follow">已关注</div>-->
                <div class="live-time  live-timer" v-if="feature.b[match.status]">80'</div>
            </div>
        </div>
    </li>


    <!--<li class="list-item" :class="{'__first_no_end': match._flag}"
        v-tap="{methods: goDetail, fid: match.fid}">
        <div class="list-tit">
            <span class="list-day"> {{match.order}}&nbsp;&nbsp;{{match.simpleleague}}</span>

            <span class="list-state color3" v-if="feature.a[match.status]">
                                {{match.matchtime.substring(5, 16)}}
                            </span>
            <span class="list-state color3"
                  v-if="match.status === StatusCode.ENDED">完场</span>

            <span class="crazy-sports f20" v-if="match.iscrazybet==='1'">猜球</span>

            <span class="list-state green"
                  v-if="match.status === StatusCode.MID">中场休息</span>
            <span class="list-state green"
                  v-if="match.status === StatusCode.FIRST_HALF || match.status === StatusCode.LAST_HALF">
                                {{match.match_at | matchAtFmt(match.status === StatusCode.FIRST_HALF)}}
                                <i class="dian">'</i>
                            </span>
            <span class="list-state green"
                  v-if="match.status===StatusCode.ENDED && match.extra_statusid === StatusCode.SPOT_KICK_STARTED">
                                点球 {{match.spot_kick_score}}
                            </span>

            <span class="list-time"
                  v-if="feature.b[match.status]">
								{{match.matchtime.substring(5, 16)}}
                            </span>
            <span class="list-time"
                  v-if="feature.a[match.status]">
                            </span>
        </div>
        <div class="list-team">
            <div class="team team-l f30">
                <img data-inited="0" src="http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png"
                     :data-src="match.homelogo || 'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png'">
                {{match.homesxname | truncate(4)}}
                <sub class="team-site f22"
                     v-if="match.zlc == 1">(中)</sub>
                <i class="red-pai f22"
                   v-show="match.home_red_counts > 0">{{match.home_red_counts}}</i>
            </div>

            <div class="team-c"
                 v-if="feature.b[match.status]"
                 :class="{'green': match.status !== StatusCode.ENDED,'color3': match.status === StatusCode.ENDED}">
                <p class="score">
                    <em class="score-itm"
                        v-scroll-text="{'score':match.homescore,'class':'itmMove',timeOut:1,oldClass:'score-itm',isEnd:match.status == StatusCode.ENDED}">

                        <i>{{match.homescore}}</i>
                        <i>{{match.homescore}}</i>
                    </em>
                    <span class="score-c">:</span>
                    <em class="score-itm"
                        v-scroll-text="{'score':match.awayscore,'class':'itmMove',timeOut:1,oldClass:'score-itm',isEnd:match.status == StatusCode.ENDED}">
                        <i>{{match.awayscore}}</i>
                        <i>{{match.awayscore}}</i>
                    </em>
                </p>
            </div>
            <div class="team-c"
                 v-if="match.status === StatusCode.NOT_STARTED"
                 @click.stop="onCollect(match.fid,match.isfocus)">
                <i class="collect"
                   :class="{'cur': match.isfocus==='1'}"></i>
            </div>

            <div class="team-c"
                 v-if="match.status===StatusCode.CANCELED"><span class="f30 ffw">取消</span></div>
            <div class="team-c"
                 v-if="match.status===StatusCode.CHANGED"><span class="f30 ffw">改期</span></div>
            <div class="team-c"
                 v-if="match.status===StatusCode.REMOVED"><span class="f30 ffw">腰斩</span></div>
            <div class="team-c"
                 v-if="match.status===StatusCode.PAUSED"><span class="f30 ffw">中断</span></div>
            <div class="team-c"
                 v-if="match.status===StatusCode.UNSURE"><span class="f30 ffw">待定</span></div>

            <div class="team team-r f30">
                <i class="red-pai f22"
                   v-if="match.away_red_counts>0">{{match.away_red_counts}}</i>
                {{match.awaysxname | truncate(4)}}
                <img data-inited="0" src="http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png"
                     :data-src="match.awaylogo || 'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png'">
            </div>
        </div>
        <div class="list-info f22">
            <span v-if="match.status === StatusCode.MID||match.status===StatusCode.LAST_HALF||match.status===StatusCode.ENDED">半场 {{match.homehalfscore}}:{{match.awayhalfscore}}&nbsp;</span>
            <span v-if="match.status === StatusCode.ENDED && match.extra_statusid === StatusCode.EXTRA_STARTED">90'内 {{match.homescore}}:{{match.awayscore}}&nbsp;</span>
            <span v-if="match.status === StatusCode.ENDED && match.extra_statusid === StatusCode.EXTRA_ENDED">90'内 {{match.homescore}}:{{match.awayscore}} 加时 {{match.extra_time_score}}&nbsp;</span>
            <span v-if="match.status === StatusCode.ENDED && match.extra_statusid === StatusCode.SPOT_KICK_ENDED">90'内 {{match.homescore}}:{{match.awayscore}} {{match.extra_exist === '1' ? ('加时' + match.extra_time_score) : ''}} 点球 {{match.spot_kick_score}}</span>
        </div>
        <div class="tips-box"
             v-if="$route.params.tab ==='hot'">
					<span class="easily-selected"
                          v-if="match.tags.indexOf(1)>-1">主胜易中</span>
            <span class="easily-selected"
                  v-if="~match.tags.indexOf(2)">平局易中</span>
            <span class="easily-selected"
                  v-if="~match.tags.indexOf(3)">主负易中</span>
            <span class="highest-sales"
                  v-if="~match.tags.indexOf(4)">热度最高</span>
            <span class="attention"
                  v-if="~match.tags.indexOf(5)">关注最多</span>
            <span class="danguan"
                  v-if="~match.tags.indexOf(6)">单关</span>
        </div>
    </li>-->
</template>
<style scoped>
    .one-game {
        padding: .333333rem .4rem .346667rem .4rem;
        border-bottom: 1px solid #eaeaea
    }

    .one-game:active {
        -webkit-tap-highlight-color: rgba(244,244,244,.6)
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
        border-right: 1px solid #eaeaea
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
        color: #aab5bd;
        line-height: 1.28rem
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
        color: #d25138
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
    import {FootballStatusCode as StatusCode} from '~common/constants'
    import scrollText from '~directives/scroll_text'

    export default {
        props: {
            match: {
                required: true,
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
                    }
                },
                StatusCode
            }
        },
        methods: {
            goDetail ({fid}) {
                this.$router.push(`/detail/football/${fid}/situation`)
            }
        },
        directives: {
            scrollText
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
