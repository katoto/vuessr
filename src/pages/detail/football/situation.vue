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

        <template v-if="!feature.a[match.status] && match.status !== ''">

            <event :eventlist="situation.eventlist" :status="match.status"></event>
            <statistic :statistic="situation.statistic"></statistic>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news" :init-size="3" @rs="refreshScroll"></me-sports>
            <skbtips v-if="(situation.eventlist && situation.eventlist.length) || (situation.statistic && situation.statistic.h_ballcontrol_rate)"></skbtips>


        </template>
        <template v-else>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news"  :init-size="match.status == StatusCode.NOT_STARTED?5:3"></me-sports>
            <div class="ui-empty" v-if="(!situation.news || !situation.news.length) && !match.video">
                <img src="~assets/style/images/detail/07.png" class="w240">
                <div class="ui-empty-dfont" v-if="match.status === StatusCode.NOT_STARTED || match.status === ''">比赛时间 {{match.matchtime.substr(5, 11)}}</div>
                <div class="ui-empty-dfont" v-else>{{StatusDesc[match.status === '' ? '0' : match.status]}}</div>
                <div class="ui-empty-gfont" v-if="match.status === StatusCode.NOT_STARTED || match.status === ''">先去分析栏目看看吧</div>
            </div>
        </template>



    </div>
</template>

<script scoped>
    import {mTypes, aTypes} from '~store/zqdetail'
    import {FootballStatusCode as StatusCode, pushEvents, FootballStatusDesc as StatusDesc} from '~common/constants'
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
                StatusCode,
                StatusDesc
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
                    // 校验数据是否正常
                    let isAvailable = (event) => {
                        return event.eventtype === '8'
                            // 换人,两个队员名都不为空
                            ? /\S/.test(event.exchange_player[0]) && /\S/.test(event.exchange_player[1])
                            // 其他事件则要求cdata不为空
                            : /\S/.test(event.cdata)
                    }

                    let newEvent = null
                    let newEventList = []
                    let eventlist = this.situation.eventlist
                    // 正常事件：直接存入
                    if (data.is_modify === '0') {
                        // 校验数据是否正常
                        data.isUnavailable = !isAvailable(data)
                        newEventList = [...eventlist]
                        newEventList.unshift(data)
                    }

                    // 修改事件：找到并修改存储的旧事件
                    if (data.is_modify === '1') {
                        let oldEvent = eventlist.filter(event => event.eventid === data.related_eventid).pop()
                        if (oldEvent) {
                            // 11 撤销，事件不可用，其他覆盖
                            newEvent = {...oldEvent}
                            if (data.eventtype === '11') {
                                newEvent.isUnavailable = true
                            } else {
                                newEvent.cdata = data.cdata
                                newEvent.exchange_player = data.exchange_player
                                newEvent.isUnavailable = !isAvailable(oldEvent)
                            }
                        }
                        eventlist.forEach((event) => {
                            if (event.eventid === data.related_eventid) {
                                newEventList.push(newEvent)
                            } else {
                                newEventList.push(event)
                            }
                        })
                    }
                    this.$store.commit(mTypes.setSituationEventlist, newEventList)
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
