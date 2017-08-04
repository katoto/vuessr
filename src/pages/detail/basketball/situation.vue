
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


        <div class="ui-empty" v-if="!news &&(match.status == StatusCode.NOT_STARTED || match.status == StatusCode.CHANGED || match.status == StatusCode.REMOVED || match.status == StatusCode.CANCELED || match.status == StatusCode.PAUSED)">
            <img src="http://tccache.500.com/mobile/widget/empty/images/07.png" class="w240">
            <div class="ui-empty-dfont">比赛时间 {{match.matchtime.substr(5, 11)}}</div>
            <div class="ui-empty-gfont">先去分析栏目看看吧</div>
        </div>
        <!--<widget-prompt-view src="widget/prompt.html"-->
        <!--drunk-if="hasNews===false&&(match.status == StatusCode.NOT_STARTED || match.status == StatusCode.CHANGED || match.status == StatusCode.REMOVED || match.status == StatusCode.CANCELED || match.status == StatusCode.PAUSED)"-->
        <!--extra-text="{{match.status == StatusCode.NOT_STARTED ? '先去分析栏目看看吧' : ''}}"-->
        <!--message="{{match.status == StatusCode.NOT_STARTED ? '比赛时间 ' + match.matchdate.slice(5, 16) : StatusDesc[match.status]}}"-->
        <!--type="normal">-->
        <!--</widget-prompt-view>-->

        <!--<me-sports src="detail-page/comment/me-sports.html" drunk-if="match.status == StatusCode.NOT_STARTED || eventlist == null" requesting="{{isRequesting}}" leagueid="{{match.matchid}}" on-size="hasNews=!!$event.args[0]" init-size="{{match.status == StatusCode.NOT_STARTED?5:3}}" homeid="{{match.homeid}}" awayid="{{match.awayid}}" status="{{match.status}}" matchtime="{{match.matchdate}}" vtype="2"></me-sports>-->
        <me-sports v-if="match.status == StatusCode.NOT_STARTED && news" :news="news.news" :init-size="5"></me-sports>
    </div>
</template>

<script>
    import {BasketballStatusCode as StatusCode} from '~common/constants'
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
                StatusCode
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
    }
</style>
