<template>
    <div v-if="situation">
       <!-- <template v-if="(situation.eventlist && situation.eventlist.length) || (situation.statistic && situation.statistic.h_ballcontrol_rate)">

        </template>-->
        <template v-if="!feature.a[match.status]">
            <event v-if="situation.eventlist && situation.eventlist.length" :eventlist="situation.eventlist" :status="match.status"></event>
            <statistic v-if="situation.statistic && situation.statistic.h_ballcontrol_rate" :statistic="situation.statistic"></statistic>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news" :init-size="3"></me-sports>
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
    import {FootballStatusCode as StatusCode} from '~common/constants'
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
            }
        },
        watch: {
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime)
                }
            },
            refreshTime () {
                this.fetchData()
            }
        },
        computed: {
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
    /*.ui-empty{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;display:inline-block;}*/
    .ui-empty{padding:2.72rem 0;text-align:center;}
    .ui-empty img{margin-bottom:0.933333rem;}
    .ui-empty .w240{width:3.2rem;}

    .ui-empty-dfont{font-size:0.453333rem;color:#333;height:0.893333rem;line-height:0.893333rem;}
    .ui-empty-gfont{font-size:0.4rem;color:#b3b3b3;margin-bottom:0.773333rem;padding:0 0.5rem;}

</style>
