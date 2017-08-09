<template>
    <div class="l-full l-flex-column" v-if="match" style="overflow: hidden">
        <div class="detailTop" :class="{'topBarMove': showScore, 'topBarMove2': !showScore}" style="display: block;">
            <a class="back-icon" onclick="history.back()" href="javascript:;">返回</a>
            <router-link to="/home/zq/jczq/cur" class="link-index f26">比分首页</router-link>
            <!--<a class="link-index f26" href="/score/index.html#/football">比分首页</a>-->

            <div onclick="home.goLeague()" class="r-sn f24">{{match.simpleleague}}</div>


            <!--<div id="_concern" style="display: none" class="topR" onclick="home.doConcern()">
                <div class="sk-gz"></div>
            </div>-->
            <div id="_sharemode" style="display: block;overflow: hidden" class="topR" v-tap="{methods: showShareMode}">
                <div class="sk-point"></div>
            </div>
            <div class="fen-box f30 responsive">
                <span class="itm-team each-resone">{{match.homesxname}}</span>

                <div class="itm-bf" v-if="(match.status !== StatusCode.FIRST_HALF &&
                                   match.status !== StatusCode.MID &&
                                   match.status !== StatusCode.LAST_HALF &&
                                   match.status !== StatusCode.ENDED)">&nbsp;&nbsp;VS&nbsp;&nbsp;</div>
                <div class="itm-bf" v-else>

                    <div class="fen-bf"><span class="score">{{match.homescore}}</span></div>
                    <div class="fen-ld">:</div>
                    <div class="fen-bf"><span class="score">{{match.awayscore}}</span></div>
                </div>
                <span class="itm-team each-resone">{{match.awaysxname}}</span>
            </div>
        </div>
        <div class="l-flex-1 l-relative">
            <detail-scroller ref="scroller" @switch="changeHeader" @end="reachEnd">
                <div class="zq-header _header ">
                    <div class="fen-box">

                        <div class="itm-bf" v-if="match.status == StatusCode.FIRST_HALF ||
                                   match.status == StatusCode.MID ||
                                   match.status == StatusCode.LAST_HALF ||
                                   match.status == StatusCode.ENDED">

                           <score :homescore="match.homescore" :new-homescore="newHomescore" :awayscore="match.awayscore" :new-awayscore="newAwayscore" @update="syncMatch" type="zq"></score>
                        </div>

                        <div
                                v-if="match.status == StatusCode.CHANGED || match.status == StatusCode.UNSURE || match.status == StatusCode.REMOVED || match.status == StatusCode.CANCELED || match.status == StatusCode.PAUSED"
                                class="wks">{{match.status_desc}}
                        </div>
                        <div v-if="(match.status !== StatusCode.FIRST_HALF &&
                                   match.status !== StatusCode.MID &&
                                   match.status !== StatusCode.LAST_HALF &&
                                   match.status !== StatusCode.ENDED)" class="wks">VS</div>


                        <div class="left-img" v-tap="{methods: goTeam, teamId: match.homeid}">
                            <div class="img-box"><img
                                    :src="match.homelogo">
                            </div>
                            <h2 class="left-name f28">{{match.homesxname}}<span class="zhongli f20"
                                                                                v-if="match.zlc == 1"> (中)</span></h2>

                            <p class="header-pm f20">{{match.hstr?match.hstr:'暂无排名'}}</p>
                        </div>
                        <div class="right-img" v-tap="{methods: goTeam, teamId: match.awayid}">
                            <div class="img-box"><img
                                    :src="match.awaylogo">
                            </div>
                            <h2 class="right-name f28">{{match.awaysxname}}</h2>

                            <p class="header-pm f20">{{match.astr?match.astr:'暂无排名'}}</p>
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
                    <div class="sk-tips"></div>
                </div>
                <div slot="navigator" class="navigator hide">
                    <ul>
                        <li
                                :class="{cur: ~$route.path.indexOf('/situation')}">
                            <router-link :to="{name: 'football-detail-situation'}" replace>
                                <span data-p2="zq_detail" data-p4="situation">赛况<i class="sktab-arrow"></i></span>
                            </router-link>
                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/analysis')}">
                            <router-link :to="{name: 'football-detail-analysis-zj'}" replace>
                                <span data-p2="zq_detail" data-p4="analysis">分析<i class="sktab-arrow"></i></span>
                            </router-link>

                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/predict')}">
                            <router-link :to="{name: 'football-detail-predict'}" replace>
                                <span data-p2="zq_detail" data-p4="predict">预测<i class="sktab-arrow"></i><em class="nav-yuce-liao " :class="{enter: !~$route.path.indexOf('/predict')}">料</em></span>
                            </router-link>
                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/odds')}">
                            <router-link :to="{name: 'football-detail-odds-europe'}" replace>
                                <span data-p2="zq_detail" data-p4="odds">赔率<i class="sktab-arrow"></i></span>
                            </router-link>
                        </li>
                        <li
                                :class="{cur: ~$route.path.indexOf('/comment')}">
                            <router-link :to="{name: 'football-detail-comment'}" replace>
                                <span data-p2="zq_detail" data-p4="comment">聊球<i class="sktab-arrow"></i></span>
                            </router-link>
                        </li>

                        <li
                                :class="{cur: ~$route.path.indexOf('/crazybet')}">
                            <router-link :to="{name: 'football-detail-crazybet'}" replace>
                                <span data-p2="zq_detail" data-p4="crazybet">猜球<i class="sktab-arrow"></i></span>
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
        <div  v-if="outer.component" class="popLayer"></div>
        <transition name="slide">
            <div v-if="outer.component" class="l-full" style="z-index: 101">
                <component :is="outer.component" :params="outer.params"></component>
            </div>
        </transition>

        <div v-if="~$route.path.indexOf('/comment') && showEditor">
            <editor :reply-name="replyName" type="1" @send="onSend" @close="closeEditor"></editor>
        </div>


        <comm-enter v-if="~$route.path.indexOf('/comment')" :total="total" @edit="beginEdit"></comm-enter>
        <refresh/>
        <toast v-if="toast.visible" :msg="toast.msg"/>

    </div>
</template>

<script>
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import refresh from '~components/refresh.vue'
    import toast from '~components/toast.vue'
    import editor from '~components/editor.vue'
    import detailScroller from '~components/detail_scroller.vue'
    import share from '~components/detail/share.vue'
    import copy from '~components/detail/copy.vue'
    import score from '~components/detail/score.vue'
    import {aTypes, mTypes} from '~store/zqdetail'
    import commEnter from '~components/detail/commEnter.vue'
    if (process.env.VUE_ENV !== 'server') {
        require('nativeshare')
    }
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getBaseInfo, params.fid)
        },
        data () {
            return {
                StatusCode,
                showScore: false,
                newHomescore: 0,
                newAwayscore: 0
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            },
            outer () {
                return this.$store.state.zqdetail.outer
            },
            total () {
                return this.$store.state.zqdetail.comment.total
            },
            replyName () {
                return this.$store.state.zqdetail.comment.replyName
            },
            commentReplyId () {
                return this.$store.state.zqdetail.comment.commentReplyId
            },
            showEditor () {
                return this.$store.state.zqdetail.comment.showEditor
            },
            toast () {
                return this.$store.state.toast
            }
        },
        async mounted () {
            await this.fetchData()
            if (this.match.status !== StatusCode.ENDED) {
                this.$store.dispatch(aTypes.subscribeInfo, [this.match.fid])
                this.$store.dispatch(aTypes.subscribeEvent, [this.match.fid])
            }
            if (~this.$route.path.indexOf('/crazybet')) {
                this.$refs.scroller.scrollTo(document.querySelector('.zq-header').offsetHeight, true)
                this.$refs.scroller.switchStop(true)
            }
        },
        components: {
            detailScroller, refresh, editor, toast, score, commEnter
        },
        destroyed () {
            this.$store.dispatch('unsubscribeAll')
            this.$store.commit(mTypes.reset)
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            changeHeader (status) {
                if (status) {
                    this.showScore = true
                } else {
                    this.showScore = false
                }
            },
            closeEditor () {
                this.$store.commit(mTypes.hideEditorDialog)
            },
            reachEnd () {
                this.$store.commit(mTypes.updateReachEndTime) // 更新滚动时间戳
            },
            updateScroller () {
                this.$refs.scroller.update()
            },
            goTeam ({teamId}) {
                this.$router.push(`/team/football/${teamId}/sc`)
            },
            onSend ({content, isShare}) {
                this.$store.dispatch('ensureLogin')
                this.$store.dispatch(aTypes.sendComment, {
                    fid: this.$route.params.fid,
                    content,
                    parentid: this.commentReplyId,
                    isShare
                })
                this.closeEditor()
            },
            beginEdit () {
                this.$store.dispatch('ensureLogin')
                this.$store.commit(mTypes.showEditorDialog, {})
            },
            doShare (nativeShare) {
            // 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
                try {
                    nativeShare.call()
                    // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
                    // 类似的命令下面有介绍
                } catch (err) {
                //                    alert(err.message)
                    // 如果不支持，你可以在这里做降级处理
                    this.$store.commit(mTypes.setDialog, {component: copy,
                        params: {
                            onClose: () => {
                                this.$store.commit(mTypes.setDialog, {})
                            }
                        }})
                }
            },
            showShareMode () {
                // 先创建一个实例
                let nativeShare = new window.NativeShare({
                    wechatConfig: {
                        appId: '',
                        timestamp: '',
                        nonceStr: '',
                        signature: ''
                    },
                    // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
                    // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
                    syncDescToTag: false,
                    syncIconToTag: false,
                    syncTitleToTag: false
                })
                //  设置分享文案
                nativeShare.setShareData({
                    icon: 'http://m.500.com/favicon.ico',
                    link: location.href,
                    title: `${this.match.homesxname}vs${this.match.awaysxname} 实时比分`,
                    desc: `关注最新足球比分动态， 请关注500彩票网`,
                    from: '500彩票网'
                })
                this.$store.commit(mTypes.setDialog, {
                    component: share,
                    params: {
                        initFocus: this.match.isfocus, // 初始状态
                        onClose: () => {
                            this.$store.commit(mTypes.setDialog, {})
                        },
                        onShare: () => {
                            this.$store.commit(mTypes.setDialog, {})
                            setTimeout(() => this.doShare(nativeShare), 16.7)
                        },
                        onCollect: () => {
                            this.$store.dispatch(aTypes.requestConcern, this.match)
                            this.$store.commit(mTypes.setDialog, {})
                        },
                        onReply: () => {
                            this.$store.dispatch('ensureLogin')
                            location.href = 'http://m.500.com/helpcenter/submituserproblem/'
                        }
                    }
                })
            },
            syncMatch () {
                if (this.socketData.stamp === pushEvents.FOOTBALL_INFO && (this.socketData.data.fid + '' === this.match.fid)) {
                //                    同步数据
                    this.$store.commit(mTypes.syncBaseInfo, this.socketData.data)
                }
            }
        },
        watch: {
            refreshTime () {
                this.fetchData()
            },
            socketData ({data, stamp}) { // websocket推送过来的数据
                data.fid = data.fid + ''
                if (stamp === pushEvents.FOOTBALL_INFO) {
                    if ((data.fid + '') === this.match.fid) {
                        console.log(data.homescore)
                        if (this.match.homescore === data.homescore && this.match.awayscore === data.awayscore) {
                            this.syncMatch()
                        } else {
                            if (this.match.homescore !== data.homescore) {
                                this.newHomescore = data.homescore
                            }
                            if (this.match.awayscore !== data.awayscore) {
                                this.newAwayscore = data.awayscore
                            }
                        }

                    //                        this.$store.dispatch(aTypes.getBaseInfo, this.match.fid)
                    }
                }
            },
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
            '$store.state.zqdetail.scTime' () {
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
    .f20{font-size:0.266rem}
    .f24{font-size:0.32rem}
    .f26{font-size:0.346rem}
    .f28{font-size:0.373rem}
    .f30{font-size:0.4rem}
    .responsive {
        width: 100%;
        display: flex;
    }
    .each-resone {
        flex: 1;
        display: block;
        width: 100%;
    }
    /*头部*/
    .back-icon:before, .zj-nav .cur:after {
        background: url(~assets/style/images/detail/detail-icon.png) no-repeat;
        background-size: .533333rem 13.333333rem
    }
    /*详情页顶部*/
    .detailTop {
        position: relative;
        width: 100%;
        height: 1.173rem;
        background: #242c35;
    }
    [data-dpr="1"] .detailTop {
        height: 44px
    }

    [data-dpr="2"] .detailTop  {
        height: 88px
    }

    [data-dpr="3"] .detailTop  {
        height: 132px
    }

    .back-icon {
        width: 1.066667rem;
        height: 1.173rem;
        display: inline-block;
        text-indent: -999px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .back-icon:before {
        width: .32rem;
        height: .493333rem;
        content: '';
        position: absolute;
        left: .266667rem;
        top: 50%;
        background-position: center 0;
        margin-top: -.246667rem;
    }
    .back-icon:active {
        opacity: .6;
    }
    .yb-head .back-icon:before, .plxq .back-icon:before {
        margin-top: 0;
    }
    .detailTop .link-index {
        color: #fff;
        height: .5867rem;
        line-height: .5867rem;
        border-left: 1px solid #505354;
        display: inline-block;
        position: absolute;
        left: 1.066667rem;
        top: 50%;
        margin-top: -.2933rem;
        padding-left: .346667rem;
        z-index: 6
    }
    .detailTop .r-sn {
        color: #909396;
        position: absolute;
        left: 50%;
        margin-left: -2rem;
        height: 1.173rem;
        line-height: 1.173rem;
        width: 100%;
        text-align: center;
        width: 4rem;
    }
    .detailTop .r-sn:active {
        color: #fff;
    }

    .detailTop .sk-gz {
        width: 1.173rem;
        display: inline-block;
        height: 1.173rem;
        position: relative;
    }
    .detailTop .topR {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.173rem;
        height: 1.173rem;
    }
    .detailTop .sk-gz:after {
        position: absolute;
        content: '';
        width: 0.5333rem;
        height: 0.5333rem;
        left: 50%;
        top: 50%;
        margin-left: -0.2667rem;
        margin-top: -0.2667rem;
        background-position: center -.54rem;
    }
    .detailTop .sk-gz.cur:after {
        background-position: center -1.1567rem;
    }
    .detailTop .fen-box {
        position: absolute;
        width: 8rem;
        height: 1.173rem;
        line-height: 1.173rem;
        text-align: center;
        left: 50%;
        margin-left: -4rem;
        top: 0;
        color: #fff;
        opacity: 0;
        overflow: hidden;
        transform: translateY(-500%);
        z-index: 10;
    }
    .detailTop .itm-bf {
        height: 0.7733rem;
        line-height: 0.7733rem;
        padding: 0.2rem;
    }
    .detailTop .itm-team {
        position: relative;
        width: 2rem;
        overflow: hidden;
    }
    .detailTop .itm-team:first-child {
        text-align: right
    }
    .detailTop .itm-team:last-child {
        text-align: left;
    }
    .detailTop .fen-bf, .detailTop .fen-bf-lq {
        width: 0.9rem;
        height: 0.7733rem;
        line-height: 0.7733rem;
        font-size: 0.4rem;
        float: left;
    }
    .detailTop .fen-bf-lq {
        width: 1.1rem;
    }
    .detailTop .fen-ld {
        font-size: 0.586rem;
        line-height: 0.6933rem;
        float: left;
    }

    /*详情页头部*/
    .zq-header {
        width: 100%;
        height: 3.2rem;
        background: #242c35;
    }
    .zq-header .itm-bf {
        color: #fff;
        position: absolute;
        top: 0.2667rem;
        width: 100%;
    }
    .left-img, .right-img {
        width: 2rem;
        text-align: center;
        top: 0.2667rem;
        position: absolute;
        z-index: 9;
    }
    .left-img {
        left: 1.213333rem
    }
    .right-img {
        right: 1.213333rem
    }
    .left-img:active, .right-img:active {
        background: rgba(255, 255, 255, .1)
    }
    .left-name, .right-name {
        color: #fff;
        position: relative;
        display: inline-block;
        margin-top: 0.1333rem;
    }
    .img-box {
        height: 1.05rem
    }
    .img-box img {
        width: 0.9067rem;
    }
    .zhu-ke {
        font-size:0.293rem;
        color: #ccc;
        position: absolute;
    }
    .right-name .zhu-ke {
        right: -.266667rem
    }
    .left-name .zhu-ke {
        left: -.266667rem
    }
    .fen-box {
        width: 100%;
        text-align: center;
        position: relative;
        height: 2rem;
    }
    .fen-box .zhongli {
        position: absolute;
        bottom: 0.053333rem;
        color: rgba(255, 255, 255, .5);
        left: -.7rem;
    }
    .fen-box .header-pm {
        color: rgba(255, 255, 255, .3);
        height: 0.6667rem;
        line-height: 0.6667rem;
    }
    .itm-bf:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }


    .wks, .gaix {
        color: #fff;
        height: 1.5rem;
        line-height: 1.5rem
    }
    .wks {
        font-size: 0.667rem;
    }
    .gaix {
        font-size: 0.533rem;
    }
    .sk-tips {
        position: absolute;
        top: 3.2rem;
        width: 100%;
        color: #cad1c7;
        font-size: 0.2933rem;
        text-align: center
    }
    .fen-bf .score {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0)
    }

    .fen-bf {
        width: 0.9333rem;
    }
    .fen-ld {
        width: .626667rem;
        font-size: 0.8rem;
        overflow: hidden;
        line-height: .82rem;
        position: relative;
        vertical-align: top
    }

    .fen-bf-active .score {
        animation: changeScore 1s ease-in-out forwards
    }
    .fen-bf-active .score:last-child {
        animation: changeScore2 10s ease-in-out forwards
    }

    .game-info {
        text-align: center;
        width: 100%;
        position: absolute;
        left: 0;
        top: 1.44rem;
    }
    .game-info .game-state {
        color: #fff;
    }
    .game-info .game-time {
        color: rgba(255, 255, 255, .3);
        height: 0.6667rem;
        line-height: 0.6667rem;
        margin-top: -0.0267rem;
    }
    .dian {
        animation: dianstyle 1s ease-out 0s infinite alternate;
        -webkit-animation: dianstyle 1s ease-out 0s infinite alternate;
        font-size: 0.4rem;
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

    /*详情页导航*/
    .navigator {
        height: 1.173rem;
        line-height: 1.173rem;
        color: #d1d4d0;
        font-size:0.4rem;
        text-align: center;
        width: 100%;
        z-index: 9;
        background: #fff;
        position: -webkit-sticky;
        position: sticky;
        left: 0;
        top: 1.173rem;
    }
    [data-dpr="1"] .navigator{font-size:15px}
    [data-dpr="2"] .navigator{font-size:30px}
    [data-dpr="3"] .navigator{font-size:45px}
    .navigator ul {
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        /*no*/
    }
    .navigator li {
        flex: 1;
        display: block;
        width: 100%;
        height: 1.173rem;
        overflow: hidden;
        position: relative;
    }
    .navigator li:active {
        background: #f4f4f4;
    }
    .navigator .nav-guess::after {
        content: '';
        display: block;
        width: 35px;
        height: 14px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAOCAMAAACSNVWDAAAAclBMVEUAAADlSTHlSTHlSTHlSTHlSTHkSTHlSTHlSTHlSTHlSTHlSTHlSTHlSTHlSTHkSTHlSTHkSTHlSTHkSTHkSTHkSTLkSTHlSTLkSTHlSTHkSTHkSTHkSTHkSTHlSjLkSTHlSTHlSTLlSTHkSTHkSTHlSTFTN8UVAAAAJXRSTlMAS3fMaSnfuKEj7sOmf1VDBPzWsINnOBEK9fLpq5ZyTz4xHXBj5h9i+AAAALpJREFUGNONkesOgjAMhY/TDYZyEwS8K3re/xVtwch+CSfZSZt9bdMUds3/WlsIMgeh5KygtoK022EjgcoBCW9oSIsoYPIv88yyjF6+nihOibyJ6VCNzFXzN+oEQBShCWbVsPHAtN5njHGv4JGmMAGzveMxMDbPX3Tob4iRrxCFzL7ANIsWfXf0XVscQ4aHkamdc9TkodaQIXNuf7tTdkTKi5oKpVhspPZiKglU5NmYPRM1UbnkFktu+gHlfC6LgIIIigAAAABJRU5ErkJggg==") no-repeat;
        background-size: contain;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .navigator li span {
        color: rgba(36, 44, 53, .8);
        position: relative;
        z-index: 2;
        display: inline-block;
        white-space: nowrap;
    }
    .navigator li.cur span, .navigator li:active {
        color: rgba(36, 44, 53, 1);
    }
    .navigator li .sktab-arrow {
        height: 4px;
        overflow: hidden;
        background: #242c35;
        width: 100%;
        position: absolute;
        bottom: 0;
        /*no*/
        left: 0;
        display: none;
    }
    .navigator li.cur .sktab-arrow {
        display: block;
    }
    .navigator li.cur .sktab-arrow {
        animation: arrowMove .4s ease-in-out both;
    }
    @keyframes arrowMove {
        0% {
            transform: scaleX(0)
        }
        50% {
            transform: scaleX(1.2)
        }
        100% {
            transform: scaleX(1)
        }
    }
    /*详情页头部动效 start*/

    .topBarMove .link-index, .topBarMove .r-sn, .topBarMove2 .fen-box {
        animation: opacityC .4s ease both;
        display: none;
    }
    .topBarMove2 .link-index, .topBarMove2 .r-sn, .topBarMove .fen-box {
        animation: opacityC2 .4s ease both;
    }
    @keyframes opacityC {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        99% {
            opacity: 0;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-500%);
        }
    }
    @keyframes opacityC2 {
        0% {
            opacity: 0;
            transform: translateY(-500%);
        }
        1% {
            opacity: 0;
            transform: translateY(0);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fen-bf{background:rgba(255,255,255,.06);font-family:Arial;border-radius:.053333rem;position:relative;overflow:hidden}


    /*详情页头部动效 end*/

    /*春哥增加*/
    .popLayer {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: 90;
        background: rgba(0, 0, 0, .8)
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
    .sk-point {
        position: relative;
        width: 1.333333rem;
        height: 1.333333rem;
        display: inline-block;
    }
    .sk-point:after {
        content: "";
        display: inline-block;
        background: url(~assets/style/images/detail/share-point.png) no-repeat;
        width: .48rem;
        height: .106667rem;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.053333rem;
        left: 50%;
        margin-left: -.24rem;
    }
    .navigator .nav-yuce-liao{display:block;width:.4rem;height:.346667rem;line-height:.346667rem;position:absolute;top:.133333rem;right:-.44rem;text-align:center;background-color:#d25138;color:#fff;border-radius:.04rem;font-size:.266667rem;overflow:hidden;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scale(0);transform:scale(0)}
    .navigator .nav-yuce-liao.enter{-webkit-animation:iScale .3s ease both;animation:iScale .3s ease both;-webkit-transform:scale(1);transform:scale(1)}
    .navigator .nav-yuce-liao.leave{-webkit-animation:iScale2 .3s ease both;animation:iScale2 .3s ease both;-webkit-transform:scale(0);transform:scale(0)}
    @-webkit-keyframes iScale{0%{-webkit-transform:scale(0);transform:scale(0)}
        80%{-webkit-transform:scale(1.2);transform:scale(1.2)}
        100%{-webkit-transform:scale(1);transform:scale(1)}
    }
    @keyframes iScale{0%{-webkit-transform:scale(0);transform:scale(0)}
        80%{-webkit-transform:scale(1.2);transform:scale(1.2)}
        100%{-webkit-transform:scale(1);transform:scale(1)}
    }
    @-webkit-keyframes iScale2{0%{-webkit-transform:scale(1);transform:scale(1)}
        50%{-webkit-transform:scale(1.2);transform:scale(1.2)}
        100%{-webkit-transform:scale(0);transform:scale(0)}
    }
    @keyframes iScale2{0%{-webkit-transform:scale(1);transform:scale(1)}
        50%{-webkit-transform:scale(1.2);transform:scale(1.2)}
        100%{-webkit-transform:scale(0);transform:scale(0)}
    }

</style>