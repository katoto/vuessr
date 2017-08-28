
<template>
    <div>
        <template v-if="match.status != StatusCode.NOT_STARTED">  <!--赛中或赛后-->
            <div class="sk-detail-tap-box sk-detail-tap-box2">
                <ul class="sk-detail-tap">
                    <li :class="{cur:~$route.path.indexOf('/event')}">
                        <router-link :to="{name: 'basketball-detail-situation-event'}" replace>事件</router-link>
                    </li>
                    <li :class="{cur:~$route.path.indexOf('/statistic')}">
                        <router-link :to="{name: 'basketball-detail-situation-statistic'}" replace>统计</router-link>
                    </li>
                </ul>
            </div>
            <div>
                <router-view></router-view>
            </div>
            <!--<me-sports v-if="news && news.length" :news="situation.news" :init-size="3" @rs="refreshScroll"></me-sports>-->
        </template>

        <div class="ui-empty" v-if="news && !news.length && (match.status == StatusCode.NOT_STARTED || match.status == StatusCode.CHANGED || match.status == StatusCode.REMOVED || match.status == StatusCode.CANCELED || match.status == StatusCode.PAUSED)" style="padding: 1.54rem 0;">
            <img src="~assets/style/images/detail/07.png" class="w240">
            <div class="ui-empty-dfont" v-if="match.status == StatusCode.NOT_STARTED">比赛时间 {{match.matchtime.substr(5, 11)}}</div>
            <div class="ui-empty-dfont" v-else>{{StatusDesc[match.status === '' ? '0' : match.status]}}</div>
            <div class="ui-empty-gfont" v-if="match.status == StatusCode.NOT_STARTED">先去分析栏目看看吧</div>
        </div>
        <!--<widget-prompt-view src="widget/prompt.html"-->
        <!--drunk-if="hasNews===false&&(match.status == StatusCode.NOT_STARTED || match.status == StatusCode.CHANGED || match.status == StatusCode.REMOVED || match.status == StatusCode.CANCELED || match.status == StatusCode.PAUSED)"-->
        <!--extra-text="{{match.status == StatusCode.NOT_STARTED ? '先去分析栏目看看吧' : ''}}"-->
        <!--message="{{match.status == StatusCode.NOT_STARTED ? '比赛时间 ' + match.matchdate.slice(5, 16) : StatusDesc[match.status]}}"-->
        <!--type="normal">-->
        <!--</widget-prompt-view>-->

        <!--<me-sports src="detail-page/comment/me-sports.html" drunk-if="match.status == StatusCode.NOT_STARTED || eventlist == null" requesting="{{isRequesting}}" leagueid="{{match.matchid}}" on-size="hasNews=!!$event.args[0]" init-size="{{match.status == StatusCode.NOT_STARTED?5:3}}" homeid="{{match.homeid}}" awayid="{{match.awayid}}" status="{{match.status}}" matchtime="{{match.matchdate}}" vtype="2"></me-sports>-->
        <me-sports v-if="match.status == StatusCode.NOT_STARTED && news && news.length" :news="news.news" :init-size="5"></me-sports>
    </div>
</template>
<script>
    import {BasketballStatusCode as StatusCode, BasketballStatusDesc as StatusDesc} from '~common/constants'
    import {mTypes, aTypes} from '~store/lqdetail'
    import meSports from '~components/detail/meSports.vue'
    import noData from '~components/no_data.vue'
    export default{
        async asyncData ({store, route: {params}}) {
            const {status, matchtime, homeid, awayid, matchid} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
            await store.dispatch(aTypes.getSituationNews, {
                homeid, awayid, status, matchtime, leagueid: matchid
            })
        },
        components: {
            meSports, noData
        },
        data () {
            return {
                StatusCode,
                StatusDesc
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
                return this.$store.state.lqdetail.baseInfo
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            news () {
                return this.$store.state.lqdetail.situation.news
            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                const {status, matchtime, homeid, awayid, matchid} = this.$store.state.lqdetail.baseInfo
                await this.$store.dispatch(aTypes.getSituationNews, {
                    homeid, awayid, status, matchtime, leagueid: matchid
                })
                this.$store.commit('endOneRefresh')
            },
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>
<style scoped>
    a {
        color: inherit;
        display:block;
    }
    .sk-detail-tap-box2 {
        margin-bottom: .266667rem
    }
    .sk-detail-tap-box {
        text-align: center;
        height: 1.173333rem;
        padding: 0 .4rem;
        background: #fff
    }
    .sk-detail-tap {
        border-bottom: 1px solid #e8e8e8;
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 1.173333rem;
        line-height: 1.173333rem
    }

    [data-dpr="1"] .sk-detail-tap {
        font-size: 12px
    }

    [data-dpr="2"] .sk-detail-tap {
        font-size: 24px
    }

    [data-dpr="3"] .sk-detail-tap {
        font-size: 36px
    }
    .sk-detail-tap li {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #aab5bd;
        height: 1.173333rem
    }

    .sk-detail-tap li:active {
        background: #f4f4f4
    }

    .sk-detail-tap li.cur,
    .sk-detail-tap li:active {
        color: #242c35
    }
    .ui-empty{padding:2.72rem 0;text-align:center;}
    .ui-empty img{margin-bottom:0.933333rem;}
    .ui-empty .w240{width:3.2rem;}
    .ui-empty-dfont{font-size:0.453333rem;color:#333;height:0.893333rem;line-height:0.893333rem;}
    .ui-empty-gfont{font-size:0.4rem;color:#b3b3b3;margin-bottom:0.773333rem;padding:0 0.5rem;}
</style>
