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

            <event :eventlist="situation.eventlist" :status="match.status"></event>
            <statistic :statistic="situation.statistic"></statistic>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news" :init-size="3" @rs="refreshScroll"></me-sports>
            <skbtips v-if="(situation.eventlist && situation.eventlist.length) || (situation.statistic && situation.statistic.h_ballcontrol_rate)"></skbtips>


        </template>
        <template v-else>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news"  :init-size="match.status == StatusCode.NOT_STARTED?5:3"></me-sports>
            <div class="ui-empty" v-else>
                <img src="~assets/style/images/detail/07.png" class="w240">
                <div class="ui-empty-dfont">比赛时间 {{match.matchtime.substr(5, 11)}}</div>
                <div class="ui-empty-gfont">先去分析栏目看看吧</div>
            </div>
        </template>



    </div>
</template>

<script scoped>
    import {mTypes, aTypes} from '~store/zqdetail'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import event from '~components/detail/football/situation/event.vue'
    import meSports from '~components/detail/meSports.vue'
    import statistic from '~components/detail/football/situation/statistic.vue'
    import skbtips from '~components/detail/skbtips.vue'
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
            event, meSports, statistic, skbtips
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
    .video-box {
        padding: .4rem;
        height: 4.5333rem;
        position: relative;
        background: #fff
    }




    /*.ui-empty{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;display:inline-block;}*/
    .ui-empty{padding:2.72rem 0;text-align:center;}
    .ui-empty img{margin-bottom:0.933333rem;}
    .ui-empty .w240{width:3.2rem;}

    .ui-empty-dfont{font-size:0.453333rem;color:#333;height:0.893333rem;line-height:0.893333rem;}
    .ui-empty-gfont{font-size:0.4rem;color:#b3b3b3;margin-bottom:0.773333rem;padding:0 0.5rem;}

</style>
