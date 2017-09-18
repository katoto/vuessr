<template>
    <div class="l-full l-flex-column root" v-if="baseInfo">
        <div class="detailTop" style="display: block;" :class="{'topBarMove': showScore, 'topBarMove2': !showScore}">
            <a class="back-icon" onclick="history.back()" href="javascript:;" v-if="$route.query.from!=='app_bet'">返回</a>
            <router-link2  :to="{path: '/home/zq/jclq/cur', query: $route.query}" class="link-index f26" v-if="$route.query.from!=='app_bet'">比分首页</router-link2>
            <div v-tap="{methods:goLeague,seasonid:baseInfo.seasonid}" class="r-sn f24">{{baseInfo.simpleleague}}</div>


            <div id="_concern" style="display: none" class="topR" onclick="home.doConcern()">
                <div class="sk-gz"></div>
            </div>
            <div id="_sharemode" style="display: block;overflow: hidden" class="topR" v-tap="{methods: showShareMode}"
                 onclick="home.showShareMode()">
                <div class="sk-point"></div>
            </div>
            <div class="fen-box f30 responsive">
                <span class="itm-team each-resone" id="team_away">{{baseInfo.awaysxname}}</span>

                <div class="itm-bf" v-if="baseInfo.status == StatusCode.NOT_STARTED">&nbsp;&nbsp;VS&nbsp;&nbsp;</div>
                <div class="itm-bf" v-else>
                    <div class="fen-bf-lq"><span id="away_score" class="score">{{baseInfo.awayscore}}</span></div>
                    <div class="fen-ld">:</div>
                    <div class="fen-bf-lq"><span id="home_score" class="score">{{baseInfo.homescore}}</span></div>
                </div>
                <span class="itm-team each-resone" id="team_home">{{baseInfo.homesxname}}</span>
            </div>
        </div>
        <div class="l-flex-1 l-relative">
            <detail-scroller ref="scroller" @switch="changeHeader" @end="reachEnd">
                <div class="zq-header _header ">
                    <div class="fen-box">

                        <div class="itm-bf" v-if="baseInfo.status == StatusCode.SECTION_1 ||
                               baseInfo.status == StatusCode.SECTION_2 ||
                               baseInfo.status == StatusCode.SECTION_3 ||
                               baseInfo.status == StatusCode.SECTION_4 ||
                               baseInfo.status == StatusCode.MID ||
                               baseInfo.status == StatusCode.OVERTIME_1 ||
                               baseInfo.status == StatusCode.OVERTIME_2 ||
                               baseInfo.status == StatusCode.OVERTIME_3 ||
                               baseInfo.status == StatusCode.OVERTIME_4 ||
                               baseInfo.status == StatusCode.ENDED">
                            <!--<div class="fen-bf-lq" drunk-scroll-text="baseInfo.awayscore" time-out='8'
                                class-list="['fen-bf-active']">
                                <span class="score">{{baseInfo.awayscore}}</span>
                                <span class="score">{{baseInfo.awayscore}}</span>
                            </div>
                            <div class="fen-ld">:</div>
                             <div class="fen-bf-lq" drunk-scroll-text="baseInfo.homescore" time-out='8'
                                  class-list="['fen-bf-active']">
                                 <span class="score">{{baseInfo.homescore}}</span>
                                 <span class="score">{{baseInfo.homescore}}</span>
                             </div>-->
                            <score :homescore="baseInfo.homescore" :awayscore="baseInfo.awayscore" :ready="ready"
                                   type="lq"></score>

                        </div>

                        <div
                                v-if="baseInfo.status == StatusCode.CHANGED"
                                class="wks">{{baseInfo.status_desc}}
                        </div>
                        <div v-if="baseInfo.status == StatusCode.NOT_STARTED" class="wks">VS</div>


                        <div class="left-img" v-tap="{methods: goTeam, teamId: baseInfo.awayid}">
                            <div class="img-box"><img
                                    :src="baseInfo.awaylogo">
                            </div>
                            <h2 class="right-name f28">{{baseInfo.awaysxname}}</h2>

                            <p class="header-pm f20">{{baseInfo.astr?baseInfo.astr:'暂无排名'}}</p>
                        </div>
                        <div class="right-img" v-tap="{methods: goTeam, teamId: baseInfo.homeid}">
                            <div class="img-box"><img
                                    :src="baseInfo.homelogo">
                            </div>
                            <h2 class="left-name f28">{{baseInfo.homesxname}}<span class="zhongli f20"
                                                                                   v-if="baseInfo.zlc == 1"> (中)</span>
                            </h2>

                            <p class="header-pm f20">{{baseInfo.hstr?baseInfo.hstr:'暂无排名'}}</p>
                        </div>
                    </div>
                    <div class="game-info">
                        <div v-if="
                            baseInfo.status != StatusCode.NOT_STARTED && baseInfo.status != StatusCode.ENDED && baseInfo.status != StatusCode.CHANGED"
                             class="game-state f24">{{baseInfo.status_desc}}
                        </div>
                        <div v-if="baseInfo.status === StatusCode.ENDED" class="game-state f24">完场</div>
                        <div class="game-time f20">{{baseInfo.matchtime.slice(5,16)}}</div>

                    </div>
                    <div class="sk-tips"></div>
                </div>
                <div slot="navigator" class="navigator hide">
                    <ul>
                        <li :class="{cur: ~$route.path.indexOf('/situation')}">
                            <router-link2 :to="{name: 'basketball-detail-situation-event', query: $route.query}"
                                          replace>
                                <span>赛况<i class="sktab-arrow"></i></span>
                            </router-link2>
                        </li>
                        <li :class="{cur: ~$route.path.indexOf('/analysis')}" data-p2="lq_detail" data-p4="analysis">
                            <router-link2 :to="{name: 'basketball-detail-analysis-zj', query: $route.query}" replace>
                                <span>分析<i class="sktab-arrow"></i></span>
                            </router-link2>

                        </li>
                        <li :class="{cur: ~$route.path.indexOf('/odds')}">
                            <router-link2 :to="{name: 'basketball-detail-odds-shengfu', query: $route.query}" replace>
                                <span>赔率<i class="sktab-arrow"></i></span>
                            </router-link2>
                        </li>
                        <li :class="{cur: ~$route.path.indexOf('/comment')}">
                            <router-link2 :to="{name: 'basketball-detail-comment', query: $route.query}" replace>
                                <span>聊球<i class="sktab-arrow"></i></span>
                            </router-link2>
                        </li>
                    </ul>
                </div>
                <div class="navigator " style="width: 0"></div>
                <div class="main-inner2">
                    <router-view></router-view>
                </div>
            </detail-scroller>
        </div>

        <div v-if="outer.component" class="popLayer"></div>
        <transition name="slide">
            <div v-if="outer.component" class="l-full" style="z-index: 101">
                <component :is="outer.component" :params="outer.params"></component>
            </div>
        </transition>

        <div v-if="~$route.path.indexOf('/comment') && showEditor">
            <editor :reply-name="replyName" type="2" @send="onSend" @close="closeEditor"></editor>
        </div>


        <comm-enter v-if="~$route.path.indexOf('/comment')" :total="total" @edit="beginEdit"></comm-enter>
        <toast v-if="toast.visible" :msg="toast.msg"/>
        <refresh/>
    </div>
</template>

<script>
    import {BasketballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import refresh from '~components/refresh.vue'
    import toast from '~components/toast.vue'
    import editor from '~components/editor.vue'
    import detailScroller from '~components/detail_scroller.vue'
    import share from '~components/detail/share.vue'
    import score from '~components/detail/score.vue'
    import copy from '~components/detail/copy.vue'
    import commEnter from '~components/detail/commEnter.vue'
    import verify from '~components/detail/verify.vue'

    import {
        aTypes,
        mTypes
    } from '~store/lqdetail'
    import routerLink2 from '~components/routerLink2.vue'
    if (process.env.VUE_ENV !== 'server') {
        require('nativeshare')
    }
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getBaseInfo, params.fid)
        },
        components: {
            detailScroller, refresh, editor, toast, commEnter, score, routerLink2
        },
        data () {
            return {
                StatusCode,
                showScore: false,
                ready: false
            }
        },
        computed: {
            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            baseInfo () {
                return this.$store.state.lqdetail.baseInfo
            },
            outer () {
                return this.$store.state.lqdetail.outer
            },
            total () {
                return this.$store.state.lqdetail.comment.total
            },
            replyName () {
                return this.$store.state.lqdetail.comment.replyName
            },
            commentReplyId () {
                return this.$store.state.lqdetail.comment.commentReplyId
            },
            showEditor () {
                return this.$store.state.lqdetail.comment.showEditor
            },
            toast () {
                return this.$store.state.toast
            }
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
            reachEnd () {
                this.$store.commit(mTypes.updateReachEndTime) // 更新滚动时间戳
            },
            updateScroller () {
                this.$refs.scroller.update()
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
            async beginEdit () {
                this.$store.dispatch('ensureLogin')
                await this.$store.dispatch('doVerify') // 判断实名认证
                if (this.isVerify) {
                    this.$store.commit(mTypes.showEditorDialog, {})
                } else {
                    this.$store.commit(mTypes.setDialog, {
                        component: verify,
                        params: {
                            onClose: () => {
                                this.$store.commit(mTypes.setDialog, {})
                            },
                            onVerify: () => {
                                window.location.href = `http://m.500.com/account/index.php?c=home&a=idauth&backurl=${window.location.href}`
                            }
                        }
                    })
                }
            },
            closeEditor () {
                this.$store.commit(mTypes.hideEditorDialog)
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
                    this.$store.commit(mTypes.setDialog, {
                        component: copy,
                        params: {
                            onClose: () => {
                                this.$store.commit(mTypes.setDialog, {})
                            }
                        }
                    })
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
                if (this.baseInfo.status === StatusCode.NOT_STARTED) {
                    //  设置分享文案
                    nativeShare.setShareData({
                        icon: 'http://www.500cache.com/mobile/touch/images/app_logo.png',
                        link: location.href,
                        title: `${this.baseInfo.awaysxname}vs${this.baseInfo.homesxname} ${this.baseInfo.matchtime.substr(5, 2)}月${this.baseInfo.matchtime.substr(8, 2)}日${this.baseInfo.matchtime.substr(11, 5)}, 预测推荐>>`,
                        desc: `小伙伴一起来看赛事前瞻吧！`,
                        from: '500彩票网'
                    })
                } else if (this.baseInfo.status === StatusCode.SECTION_1 || this.baseInfo.status === StatusCode.SECTION_2 || this.baseInfo.status === StatusCode.MID ||
                    this.baseInfo.status === StatusCode.SECTION_3 || this.baseInfo.status === StatusCode.SECTION_4 || this.baseInfo.status === StatusCode.OVERTIME_1 ||
                    this.baseInfo.status === StatusCode.OVERTIME_2 || this.baseInfo.status === StatusCode.OVERTIME_3 || this.baseInfo.status === StatusCode.OVERTIME_4) {
                    //  设置分享文案
                    nativeShare.setShareData({
                        icon: 'http://www.500cache.com/mobile/touch/images/app_logo.png',
                        link: location.href,
                        title: `正在直播：${this.baseInfo.awaysxname}vs${this.baseInfo.homesxname} 一起看球侃大山>>`,
                        desc: `小伙伴一起来看比赛吧！`,
                        from: '500彩票网'
                    })
                } else if (this.baseInfo.status === StatusCode.ENDED) {
                    //  设置分享文案
                    nativeShare.setShareData({
                        icon: 'http://www.500cache.com/mobile/touch/images/app_logo.png',
                        link: location.href,
                        title: `${this.baseInfo.awaysxname}${this.baseInfo.awayscore}:${this.baseInfo.homescore}${this.baseInfo.homesxname} 技术统计+赛况详情，不复盘你怎么懂球>>`,
                        desc: `小伙伴一起来回顾比赛吧！`,
                        from: '500彩票网'
                    })
                } else {
                    //  设置分享文案
                    nativeShare.setShareData({
                        icon: 'http://www.500cache.com/mobile/touch/images/app_logo.png',
                        link: location.href,
                        title: `${this.baseInfo.awaysxname}vs${this.baseInfo.homesxname} 实时比分`,
                        desc: `小伙伴一起来看比赛吧！`,
                        from: '500彩票网'
                    })
                }
                this.$store.commit(mTypes.setDialog, {
                    component: share,
                    params: {
                        match: this.baseInfo, // 初始状态
                        onClose: () => {
                            this.$store.commit(mTypes.setDialog, {})
                        },
                        onShare: () => {
                            this.$store.commit(mTypes.setDialog, {})
                            setTimeout(() => this.doShare(nativeShare), 400)
                        },
                        onCollect: async () => {
                            await this.$store.dispatch('ensureLogin')
                            try {
                                await this.$store.dispatch(aTypes.requestConcern, this.baseInfo)
                                if (this.baseInfo.isfocus === '1') {
                                    this.$store.dispatch('showToast', '收藏成功')
                                } else {
                                    this.$store.dispatch('showToast', '取消收藏成功')
                                }
                            } catch (e) {
                                this.$store.dispatch('showToast', e.message)
                            }
                        },
                        onReply: () => {
                            this.$store.dispatch('ensureLogin')
                            location.href = 'http://m.500.com/helpcenter/submituserproblem/'
                        }
                    }
                })
            },
            goTeam ({teamId}) {
                this.$router.push({path: `/team/basketball/${teamId}/curr/sc`, query: this.$route.query})
            },
            goLeague ({seasonid}) {
                this.$router.push({path: `/center/basketballmatch/${seasonid}/rank`, query: this.$route.query})
            }
        },
        async mounted () {
            await this.fetchData()
            if (this.baseInfo.status !== StatusCode.ENDED) {
                this.$store.dispatch(aTypes.subscribeInfo, [this.baseInfo.fid])
                this.$store.dispatch(aTypes.subscribeEvent, [this.baseInfo.fid])
            }
            this.ready = true
        },
        destroyed () {
            this.$store.dispatch('unsubscribeAll')
            this.$store.commit(mTypes.reset)
        },
        watch: {
            socketData ({data, stamp}) { // websocket推送过来的数据
                if (stamp === pushEvents.BASKETBALL_INFO) {
                    if (data.fid === this.baseInfo.fid) {
                        this.$store.commit(mTypes.syncBaseInfo, data)
                    }
                }
            },
            refreshTime () {
                this.fetchData()
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
            '$store.state.lqdetail.scTime' () {
                this.updateScroller()
            }
        },
        head (state) {
            return {
                title: `【${state.lqdetail.baseInfo.awaysxname}】vs【${state.lqdetail.baseInfo.homesxname}】篮球比赛直播_在线直播_比赛技术统计-500彩票网`,
                description: '【500彩票网免费提供全网效率最高篮球比分直播】包括篮球即时比分、篮彩完场比分、竞彩篮球未来赛事等服务，绝对是竞彩篮球投注的神器！'
            }
        }
    }
</script>

<style scoped>
    .root {
        overflow: hidden;
    }

    .detailTop {
        position: relative;
    }

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
        margin-left: -.26rem;
    }

    .zq-header {
        position: relative;
        top: -1px
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

    .f20 {
        font-size: 0.266rem
    }

    .f24 {
        font-size: 0.32rem
    }

    .f26 {
        font-size: 0.346rem
    }

    .f28 {
        font-size: 0.373rem
    }

    .f30 {
        font-size: 0.4rem
    }

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

    [data-dpr="2"] .detailTop {
        height: 88px
    }

    [data-dpr="3"] .detailTop {
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
        /*opacity: 0;*/
        overflow: hidden;
        /*transform: translateY(-500%);*/
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

    .fen-bf, .fen-bf-lq, .fen-ld {
        height: .96rem;
        line-height: 1rem;
        color: #fff;
        display: inline-block;
    }

    .fen-bf, .fen-bf-lq {
        background: rgba(255, 255, 255, .06);
        font-size: 0.667rem;
        font-family: Arial;
        border-radius: .053333rem;
        position: relative;
        overflow: hidden
    }

    .fen-bf {
        width: 0.9333rem;
    }

    .fen-bf-lq {
        width: 1.533333rem;
    }

    .fen-ld {
        width: .626667rem;
        font-size: 0.8rem;
        overflow: hidden;
        line-height: .82rem;
        position: relative;
        vertical-align: top
    }

    .wks, .gaix {
        color: #fff;
        height: 1.5rem;
        line-height: 1.5rem
    }

    .wks {
        font-size: 0.667rem;
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

    .zq-header .fen-bf .score:last-child {
        transform: translate(-50%, 100%)
    }

    .zq-header .fen-bf-active .score {
        animation: changeScore 1s ease-in-out forwards
    }

    .zq-header .fen-bf-active .score:last-child {
        animation: changeScore2 10s ease-in-out forwards
    }

    @keyframes changeScore {
        0% {
            transform: translate(-50%, 0)
        }
        100% {
            transform: translate(-50%, -100%)
        }
    }

    @keyframes changeScore2 {
        0% {
            color: #fff;
            transform: translate(-50%, 100%)
        }
        10% {
            color: #1ac843;
            transform: translate(-50%, 0)
        }
        90% {
            color: #1ac843;
            transform: translate(-50%, 0)
        }
        100% {
            color: #fff;
            transform: translate(-50%, 0)
        }
    }

    .fen-bf-lq {
        position: relative;
        min-width: .933333rem;
        overflow: hidden;
    }

    .fen-bf-lq .score {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0)
    }

    .zq-header .fen-bf-lq .score:last-child {
        transform: translate(-50%, 100%)
    }

    .zq-header .fen-bf-lq.fen-bf-active .score {
        animation: changeScore 1s ease-in-out forwards
    }

    .zq-header .fen-bf-lq.fen-bf-active .score:last-child {
        animation: changeScore3 3s ease-in-out forwards
    }

    @keyframes changeScore3 {
        0% {
            color: #fff;
            transform: translate(-50%, 100%)
        }
        30% {
            color: #ffba00;
            transform: translate(-50%, 0)
        }
        50% {
            color: #ffba00;
            transform: translate(-50%, 0)
        }
        80% {
            color: #ffba00;
            transform: translate(-50%, 0)
        }
        100% {
            color: #fff;
            transform: translate(-50%, 0)
        }
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
        font-size: 0.4rem;
        text-align: center;
        width: 100%;
        z-index: 9;
        background: #fff;
        position: -webkit-sticky;
        position: sticky;
        left: 0;
        top: 1.173rem;
    }

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
        width: 0.4667rem;
        height: 0.1866rem;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAOCAMAAACSNVWDAAAAclBMVEUAAADlSTHlSTHlSTHlSTHlSTHkSTHlSTHlSTHlSTHlSTHlSTHlSTHlSTHlSTHkSTHlSTHkSTHlSTHkSTHkSTHkSTLkSTHlSTLkSTHlSTHkSTHkSTHkSTHkSTHlSjLkSTHlSTHlSTLlSTHkSTHkSTHlSTFTN8UVAAAAJXRSTlMAS3fMaSnfuKEj7sOmf1VDBPzWsINnOBEK9fLpq5ZyTz4xHXBj5h9i+AAAALpJREFUGNONkesOgjAMhY/TDYZyEwS8K3re/xVtwch+CSfZSZt9bdMUds3/WlsIMgeh5KygtoK022EjgcoBCW9oSIsoYPIv88yyjF6+nihOibyJ6VCNzFXzN+oEQBShCWbVsPHAtN5njHGv4JGmMAGzveMxMDbPX3Tob4iRrxCFzL7ANIsWfXf0XVscQ4aHkamdc9TkodaQIXNuf7tTdkTKi5oKpVhspPZiKglU5NmYPRM1UbnkFktu+gHlfC6LgIIIigAAAABJRU5ErkJggg==") no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.133rem;
        right: 0.133rem;
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
        height: 0.0533rem;
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

    .headerMove {
        animation: headerM .2s ease-out both;
        transform-origin: center top;
    }

    .headerMove2 {
        animation: headerM2 .2s ease-out both;
        transform-origin: center top;
    }

    @keyframes headerM {
        0% {
            height: 2.5867rem;
        }
        100% {
            height: 0rem;
        }
    }

    @keyframes headerM2 {
        0% {
            height: 0rem;
        }
        100% {
            height: 2.5867rem;
        }
    }

    /*详情页头部动效 end*/
    /*标题*/

    /*over*/
    /*春哥增加*/
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
