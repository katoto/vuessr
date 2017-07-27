<template>
<div class="l-full l-flex-column" v-if="baseinfo">
    <div class="detailTop topBarMove2" style="display: block;">
        <a class="back-icon" onclick="history.back()" href="javascript:;">返回</a>
        <router-link to="/home/zq/jczq/cur" class="link-index f26">比分首页</router-link>
        <!--<a class="link-index f26" href="/score/index.html#/football">比分首页</a>-->

        <div onclick="home.goLeague()" class="r-sn f24">{{baseinfo.simpleleague}}</div>


        <div id="_concern" style="display: none" class="topR" onclick="home.doConcern()">
            <div class="sk-gz"></div>
        </div>
        <div id="_sharemode" style="display: block;overflow: hidden" class="topR" v-tap="{methods: showShareMode}"
             onclick="home.showShareMode()">
            <div class="sk-point"></div>
        </div>
        <div class="fen-box f30 responsive">
            <span class="itm-team each-resone" id="team_away">{{baseinfo.awaysxname}}</span>

            <div class="itm-bf" v-if="baseinfo.status == StatusCode.NOT_STARTED">&nbsp;&nbsp;VS&nbsp;&nbsp;</div>
            <div class="itm-bf" v-else>
                <div class="fen-bf-lq"><span id="away_score" class="score">{{baseinfo.awayscore}}</span></div>
                <div class="fen-ld">:</div>
                <div class="fen-bf-lq"><span id="home_score" class="score">{{baseinfo.homescore}}</span></div>
            </div>
            <span class="itm-team each-resone" id="team_home">{{baseinfo.homesxname}}</span>
        </div>
    </div>
    <div class="l-flex-1 l-relative">
        <detail-scroller ref="scroller" @switch="changeHeader" @end="reachEnd">
            <div class="zq-header _header ">
                <div class="fen-box">

                    <div class="itm-bf" v-if="baseinfo.status == StatusCode.SECTION_1 ||
                               baseinfo.status == StatusCode.SECTION_2 ||
                               baseinfo.status == StatusCode.SECTION_3 ||
                               baseinfo.status == StatusCode.SECTION_4 ||
                               baseinfo.status == StatusCode.MID ||
                               baseinfo.status == StatusCode.OVERTIME_1 ||
                               baseinfo.status == StatusCode.OVERTIME_2 ||
                               baseinfo.status == StatusCode.OVERTIME_3 ||
                               baseinfo.status == StatusCode.OVERTIME_4 ||
                               baseinfo.status == StatusCode.ENDED">
                       <div class="fen-bf-lq" drunk-scroll-text="baseinfo.awayscore" time-out='8'
                           class-list="['fen-bf-lq-active']">
                           <span class="score">{{baseinfo.awayscore}}</span>
                           <span class="score">{{baseinfo.awayscore}}</span>
                       </div>
                       <div class="fen-ld">:</div>
                        <div class="fen-bf-lq" drunk-scroll-text="baseinfo.homescore" time-out='8'
                             class-list="['fen-bf-lq-active']">
                            <span class="score">{{baseinfo.homescore}}</span>
                            <span class="score">{{baseinfo.homescore}}</span>
                        </div>
                    </div>

                    <div
                            v-if="baseinfo.status == StatusCode.CHANGED"
                            class="wks">{{baseinfo.status_desc}}
                    </div>
                    <div v-if="baseinfo.status == StatusCode.NOT_STARTED" class="wks">VS</div>


                    <div class="left-img" v-tap="{methods: goTeam, teamId: baseinfo.awayid}">
                        <div class="img-box"><img
                            :src="baseinfo.awaylogo">
                        </div>
                        <h2 class="right-name f28">{{baseinfo.awaysxname}}</h2>

                        <p class="header-pm f20">{{baseinfo.astr?baseinfo.astr:'暂无排名'}}</p>
                    </div>
                    <div class="right-img" v-tap="{methods: goTeam, teamId: baseinfo.homeid}">
                        <div class="img-box"><img
                                :src="baseinfo.homelogo">
                        </div>
                        <h2 class="left-name f28">{{baseinfo.homesxname}}<span class="zhongli f20"
                                                                            v-if="baseinfo.zlc == 1"> (中)</span></h2>

                        <p class="header-pm f20">{{baseinfo.hstr?baseinfo.hstr:'暂无排名'}}</p>
                    </div>
                </div>
                <div class="game-info">
                    <div v-if="
                            baseinfo.status != StatusCode.NOT_STARTED && baseinfo.status != StatusCode.ENDED && baseinfo.status != StatusCode.CHANGED"
                         class="game-state f24">{{baseinfo.status_desc}}
                    </div>
                    <div v-if="baseinfo.status === StatusCode.ENDED" class="game-state f24">完场</div>
                    <div class="game-time f20">{{baseinfo.matchtime.slice(5,16)}}</div>

                </div>
                <div class="sk-tips"></div>
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

    <!-- <div  v-if="outer.component" class="popLayer"></div> -->
    <transition name="slide">
        <div v-if="outer.component" class="l-full" style="z-index: 101">
            <component :is="outer.component" :params="outer.params"></component>
        </div>
    </transition>

    <div v-if="~$route.path.indexOf('/comment') && showEditor">
        <editor :reply-name="replyName" type="1" @send="onSend" @close="closeEditor"></editor>
    </div>


    <div v-if="~$route.path.indexOf('/comment')">
        <div class="comm-enter">
            <div class="enter-ipt" v-tap="{methods: beginEdit}">
                <i class="ipt-icon"></i>
                <p class="ipt-txt">我来说两句…</p>
                <span class="ipt-count">{{total}}评</span>
            </div>
        </div>
    </div>

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
    import copy from '~components/detail/copy.vue'
    import {
        aTypes,
        mTypes
    } from '~store/lqdetail/mchao'

    if (process.env.VUE_ENV !== 'server') {
        require('nativeshare')
    }
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getBaseInfo, params.fid)
        },
        components: {
            detailScroller, refresh, editor, toast
        },
        data () {
            return {
                StatusCode
            }
        },
        computed: {
            socketData () {  // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },
            baseinfo () {
                return this.$store.state.mchao.baseinfo
            },
            outer () {
                return this.$store.state.mchao.outer
            },
            total () {
                return this.$store.state.mchao.comment.total
            },
            replyName () {
                return this.$store.state.mchao.comment.replyName
            },
            commentReplyId () {
                return this.$store.state.mchao.comment.commentReplyId
            },
            showEditor () {
                return this.$store.state.mchao.comment.showEditor
            },
            toast () {
                return this.$store.state.toast
            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let baseinfo = this.$store.state.mchao.baseinfo
                if (!baseinfo || this.$store.state.mchao.baseinfo.fid !== this.$route.params.fid) {
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
                    title: '实时比分',
                    desc: `${this.baseinfo.homesxname}vs${this.baseinfo.awaysxname}`,
                    from: '500彩票网'
                })
                this.$store.commit(mTypes.setDialog, {
                    component: share,
                    params: {
                        initFocus: this.baseinfo.isfocus, // 初始状态
                        onClose: () => {
                            this.$store.commit(mTypes.setDialog, {})
                        },
                        onShare: () => {
                            this.$store.commit(mTypes.setDialog, {})
                            this.doShare(nativeShare)
                        },
                        onCollect: () => {
                            this.$store.dispatch(aTypes.requestConcern, this.baseinfo)
                            this.$store.commit(mTypes.setDialog, {})
                        }
                    }
                })
            },
            goTeam ({teamId}) {
                this.$router.push(`/team/basketball/${teamId}/sc`)
            }
        },
        async mounted () {
            await this.fetchData()
            if (this.baseinfo.status !== StatusCode.ENDED) {
                console.log('---------');
                this.$store.dispatch(aTypes.subscribeInfo, [this.baseinfo.fid])
                this.$store.dispatch(aTypes.subscribeEvent, [this.baseinfo.fid])
            }
        },
        destroyed () {
            this.$store.dispatch('unsubscribeAll')
            this.$store.commit(mTypes.reset)
        },
        watch: {
            socketData ({data, stamp}) {  // websocket推送过来的数据
                console.log('=========websocket');
                console.log({data, stamp});
                if (stamp === pushEvents.BASKETBALL_INFO) {
                    if (data.fid === this.baseinfo.fid) {
                        this.$store.dispatch(aTypes.getBaseInfo, this.baseinfo.fid)
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
            '$store.state.mchao.scTime' () {
                this.updateScroller()
            }
        }
    }
</script>

<style lang="css">
.detailTop {
    position: relative;
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
</style>
