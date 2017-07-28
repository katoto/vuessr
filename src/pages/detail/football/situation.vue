<template>
    <div v-if="situation">
       <!-- <template v-if="(situation.eventlist && situation.eventlist.length) || (situation.statistic && situation.statistic.h_ballcontrol_rate)">

        </template>-->
        <div v-if="match.video" class="sk-nav bge6">视频</div>
        <div class="video-box" id="video-box" v-if="match.video">
            <iframe :src="match.video" name="url_pptv" allowtransparency="true"
                    width="100%" height="100%"
                    scrolling="no" frameborder="0">
            </iframe>
        </div>

        <template v-if="!feature.a[match.status]">

            <event v-if="situation.eventlist && situation.eventlist.length" :eventlist="situation.eventlist" :status="match.status"></event>
            <statistic v-if="situation.statistic && situation.statistic.h_ballcontrol_rate" :statistic="situation.statistic"></statistic>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news" :init-size="3" @rs="refreshScroll"></me-sports>
            <div class="sk-btips"
                 v-if="(situation.eventlist && situation.eventlist.length) || (situation.statistic && situation.statistic.h_ballcontrol_rate)">
                500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
            </div>



        </template>
        <template v-else>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news"  :init-size="match.status == StatusCode.NOT_STARTED?5:3"></me-sports>

        </template>

        <div class="ui-empty" v-if="noData">
            <img src="http://tccache.500.com/mobile/widget/empty/images/07.png" class="w240">
            <div class="ui-empty-dfont">比赛时间 {{match.matchtime.substr(5, 11)}}</div>
            <div class="ui-empty-gfont">先去分析栏目看看吧</div>
        </div>

    </div>
</template>

<script>
    import {mTypes, aTypes} from '~store/zqdetail'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import event from '~components/detail/football/situation/event.vue'
    import meSports from '~components/detail/football/situation/meSports.vue'
    import statistic from '~components/detail/football/situation/statistic.vue'
    export default {
        async asyncData ({store, route: {params}}) {
            const {status, matchtime, homeid, awayid, league_id} = store.state.zqdetail.baseInfo // baseInfo 保证有数据了
            await store.dispatch(aTypes.getSituation, {
                fid: params.fid, homeid, awayid, status, matchtime, leagueid: league_id
            })
        },
        data () {
            return {
                feature: {
                    a: {
                        [StatusCode.NOT_STARTED]: true,
                        [StatusCode.UNSURE]: true,
                        [StatusCode.CHANGED]: true,
                        [StatusCode.CANCELED]: true,
                        [StatusCode.REMOVED]: true
                    }
                },
                StatusCode
            }
        },
        components: {
            event, meSports, statistic
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                const {status, matchtime, homeid, awayid, league_id} = this.$store.state.zqdetail.baseInfo
                await this.$store.dispatch(aTypes.getSituation, {
                    fid: this.$route.params.fid, homeid, awayid, status, matchtime, leagueid: league_id
                })
                this.$store.commit('endOneRefresh')
            },
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            }
        },
        watch: {
            loaded (loaded) {
                this.refreshScroll()
            },
            refreshTime () {
                this.fetchData()
            },
            socketData ({data, stamp}) {
                if (stamp === pushEvents.FOOTBALL_EVENT) {
                    // 重新调用接口
                    this.fetchData()
                }
            }
        },
        computed: {
            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            },
            situation () {
                return this.$store.state.zqdetail.situation
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            noData () {
                if (!this.loaded) {
                    return false
                }
                if (!this.feature.a[this.match.status]) {
                    return !((this.situation.statistic && this.situation.statistic.h_ballcontrol_rate) ||
                    (this.situation.eventlist && this.situation.eventlist.length) || (this.situation.news && this.situation.news.length))
                } else {
                    return !(this.situation.news && this.situation.news.length)
                }
            }

        },
        mounted () {
            this.fetchData()
        }
    }
</script>
<style>
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }
    .main-inner {
        min-height: 15.44rem;
        width: 100%;
        overflow-x: hidden;
        color: #242c35
    }
    .video-box {
        padding: .4rem;
        height: 4.5333rem;
        position: relative;
        background: #fff
    }
    .shikuang-box {
        text-align: center;
        font-size: .173333rem;
        background: #f4f4f4;
        padding-bottom: .84rem
    }

    .shikuang-line {
        background: #e2e2e2;
        width: 1px;
        margin: .533333rem auto 0;
        height: 100%;
        display: inline-block
    }

    .shikuang-line li {
        width: 3.906667rem;
        line-height: .933333rem;
        margin-bottom: .64rem;
        background: #fff;
        border: 1px solid #e2e2e2;
        position: relative;
        border-radius: .053333rem
    }
    .shikuang-line li:last-child,
    .shikuang-line li:last-child.d-zt-box {
        margin-bottom: 0
    }

    .shikuang-lineLeft {
        float: right;
        text-align: right;
        padding-right: .533333rem
    }

    .shikuang-lineRight {
        float: left;
        text-align: left;
        padding-left: .533333rem
    }

    .shikuang-lineLeft .mtop {
        margin: .093333rem 0 0 .053333rem
    }

    .shikuang-lineRight .mtop {
        margin: .093333rem .053333rem 0 0
    }

    .shikuang-ball {
        width: .8rem;
        height: .8rem;
        border-radius: 100%;
        display: inline-block;
        background: #fff;
        text-align: center;
        border: 1px solid #d0d0d0;
        position: absolute;
        top: 0
    }
    .shikuang-lineLeft .shikuang-ball {
        margin: -.4rem -.4rem 0 0;
        right: 0
    }

    .shikuang-lineRight .shikuang-ball {
        margin: -.4rem 0 0 -.933333rem
    }

    .ren-name {
        position: relative;
        top: 0;
        color: #333;
        display: inline-block
    }

    [data-dpr="1"] .ren-name {
        font-size: 13px
    }

    [data-dpr="2"] .ren-name {
        font-size: 26px
    }

    [data-dpr="3"] .ren-name {
        font-size: 39px
    }

    .sk-time {
        position: absolute;
        top: 0;
        width: .933333rem;
        color: #999
    }

    [data-dpr="1"] .sk-time {
        font-size: 14px
    }

    [data-dpr="2"] .sk-time {
        font-size: 28px
    }

    [data-dpr="3"] .sk-time {
        font-size: 42px
    }

    .shikuang-lineLeft .sk-time {
        right: -1.4rem;
        top: -.4rem;
        text-align: left
    }

    .shikuang-lineRight .sk-time {
        margin: -.4rem 0 0 -1.933333rem;
        text-align: right
    }

    .shikuang-line li.jh-box {
        min-height: 1.466667rem
    }

    .shikuang-lineRight .jh {
        margin: 0 .293333rem 0 0
    }

    .shikuang-lineLeft .jh {
        margin: 0 0 0 .293333rem
    }

    [data-dpr="1"] .jh {
        font-size: 13px
    }

    [data-dpr="2"] .jh {
        font-size: 26px
    }

    [data-dpr="3"] .jh {
        font-size: 39px
    }
    .back-icon:before,
    .black-ball,
    .dian-ball,
    .gl-tico:after,
    .green-arrow,
    .green-pl:after,
    .ipt-icon,
    .jiaohuan,
    .person-mr,
    .red-arrow,
    .red-ball,
    .red-pl:after,
    .saixuan:after,
    .sh-arrow,
    .sk-gz:after,
    .wuxiao-ball,
    .zan-icon,
    .zd-arrow,
    .zj-nav .cur:after{
        background: url(~assets/style/images/detail/detail-icon.png) no-repeat;
        background-size: .533333rem 13.333333rem}

    .black-ball,
    .dian-ball,
    .jiaohuan,
    .red-ball,
    .wuxiao-ball {
        width: .8rem;
        height: .8rem;
        display: inline-block
    }
    .wuxiao-ball {
        background-position: center -5.186667rem
    }
    .black-ball {
        background-position: center -1.72rem
    }

    .dian-ball {
        background-position: center -2.586667rem
    }

    .red-ball {
        background-position: center -4.32rem
    }

    .wuxiao-ball {
        background-position: center -5.186667rem
    }

    .lineH30 {
        line-height: .266667rem;
        display: inline-block
    }

    .jiaohuan {
        background-position: center -3.453333rem
    }

    .red-yellow-card {
        position: relative;
        top: .2rem
    }

    .shikuang-line li.d-zt-box {
        margin-bottom: .746667rem;
        height: 1.066667rem;
        background: 0 0;
        border: none;
        width: 1.06667rem;
        clear: both
    }

    .shikuang-line li.d-zt-box:first-child {
        margin-top: -1.066666rem
    }

    .green-arrow,
    .red-arrow {
        width: .8rem;
        height: .733333rem;
        display: inline-block;
        position: absolute;
        top: 0
    }

    .shikuang-lineLeft .green-arrow,
    .shikuang-lineLeft .red-arrow {
        right: 0
    }

    .shikuang-lineRight .green-arrow,
    .shikuang-lineRight .red-arrow {
        left: 0
    }

    .green-arrow {
        background-position: center -5.986667rem
    }

    .red-arrow {
        background-position: center -6.72rem
    }
    .dianqiu,
    .jinqiu,
    .wulong,
    .wuxiao {
        width: .746667rem;
        height: .33rem;
        padding-top: .03rem;
        line-height: .36rem;
        border-radius: .053333rem;
        color: #fff;
        text-align: center;
        display: inline-block;
        position: relative;
        top: 0
    }

    [data-dpr="1"] .dianqiu,
    [data-dpr="1"] .jinqiu,
    [data-dpr="1"] .wulong,
    [data-dpr="1"] .wuxiao {
        font-size: 11px
    }

    [data-dpr="2"] .dianqiu,
    [data-dpr="2"] .jinqiu,
    [data-dpr="2"] .wulong,
    [data-dpr="2"] .wuxiao {
        font-size: 22px
    }

    [data-dpr="3"] .dianqiu,
    [data-dpr="3"] .jinqiu,
    [data-dpr="3"] .wulong,
    [data-dpr="3"] .wuxiao {
        font-size: 33px
    }

    .shikuang-lineLeft code {
        margin-left: .213333rem
    }

    .shikuang-lineRight code {
        margin-right: .213333rem
    }

    .jinqiu {
        background: #0bcd0b
    }

    .dianqiu {
        background: #ff9000
    }

    .wuxiao {
        background: #b5b5b5
    }

    .wulong {
        background: #f54141
    }


    .jh dd {
        border-bottom: 1px solid #e2e2e2;
        line-height: .733333rem;
        position: relative
    }

    .jh dd:last-child {
        border-bottom: 0;
        color: #8c96a0
    }
    .shikuang-lineLeft .jh dd {
        padding-right: .8rem
    }

    .shikuang-lineRight .jh dd {
        padding-left: .8rem
    }

    .red-yellow-card em,
    .yellow-card {
        background: #ffe91f
    }
    .red-card,
    .red-yellow-card,
    .yellow-card {
        margin: 0 auto;
        width: .293333rem;
        height: .346667rem;
        display: block; position: relative;
        top: .24rem
    }
    .sk-intro {
        background: #fff;
        padding: .28rem 1.293333rem;
        text-align: center
    }
    .d-zt {
        width: 1.066667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #d0d0d0;
        text-align: center;
        border-radius: .503333rem .503333rem;
        color: #333;
        display: inline-block;
        background: #fff;
        position: relative;
        left: -.533333rem
    }

    [data-dpr="1"] .d-zt {
        font-size: 13px
    }

    [data-dpr="2"] .d-zt {
        font-size: 26px
    }

    [data-dpr="3"] .d-zt {
        font-size: 39px
    }
    .tongji-box {
        background: #fff;
        padding: .266667rem 0 0;
        text-align: center;
        color: #333
    }
    .tongji-box .zhzl-box {
        margin-top: 0
    }
    .zhzl-box {
        height: .973333rem;
        position: relative;
        margin: .4rem .4rem 0
    }
    .zhzl-title {
        color: #999;
        padding-top: .186667rem;
        text-align: center;
        width: 100%;
        line-height: .626667rem
    }

    [data-dpr="1"] .zhzl-title {
        font-size: 13px
    }

    [data-dpr="2"] .zhzl-title {
        font-size: 26px
    }

    [data-dpr="3"] .zhzl-title {
        font-size: 39px
    }
    .zhzl-l,
    .zhzl-r {
        position: absolute;
        bottom: 0;
        transition: all .5s ease-in-out 0s;
        -webkit-transition: all .5s ease-in-out 0s;
        height: .16rem;
        width: 0
    }

    .zhzl-l {
        left: 0
    }

    .zhzl-r {
        right: 0
    }
    .zhzl-vs-left,
    .zhzl-vs-right {
        height: .106667rem;
        position: absolute;
        top: 0;
        background: #bcd0de
    }

    .zhzl-vs-left {
        right: 0;
        margin-right: .04rem
    }
    .gray-bg,
    .zhzl-gray {
        background: #bcd0de
    }
    .green-bg,
    .zhzl-green {
        background: #5c788f
    }
    .zhzl-bfb-left,
    .zhzl-bfb-right {
        position: absolute;
        top: .066667rem;
        color: #333
    }

    [data-dpr="1"] .zhzl-bfb-left,
    [data-dpr="1"] .zhzl-bfb-right {
        font-size: 23px
    }

    [data-dpr="2"] .zhzl-bfb-left,
    [data-dpr="2"] .zhzl-bfb-right {
        font-size: 46px
    }

    [data-dpr="3"] .zhzl-bfb-left,
    [data-dpr="3"] .zhzl-bfb-right {
        font-size: 69px
    }

    .zhzl-bfb-right {
        right: 0
    }

    [data-dpr="1"] .zhzl-box i {
        font-size: 12px
    }

    [data-dpr="2"] .zhzl-box i {
        font-size: 24px
    }

    [data-dpr="3"] .zhzl-box i {
        font-size: 36px
    }
    .zhzl-list {
        margin: .533333rem .4rem 0
    }

    .zhzl-list li {
        height: 1.08rem
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
    .respon2 {
        height: 100%;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        box-orient: vertical
    }

    .respon2-itm {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%;
        position: relative
    }
    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
    }








    /*.ui-empty{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;display:inline-block;}*/
    .ui-empty{padding:2.72rem 0;text-align:center;}
    .ui-empty img{margin-bottom:0.933333rem;}
    .ui-empty .w240{width:3.2rem;}

    .ui-empty-dfont{font-size:0.453333rem;color:#333;height:0.893333rem;line-height:0.893333rem;}
    .ui-empty-gfont{font-size:0.4rem;color:#b3b3b3;margin-bottom:0.773333rem;padding:0 0.5rem;}

</style>
