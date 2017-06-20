<template>
    <div>
        <template v-if="!feature.a[match.status]">
            <event v-if="situation.eventlist && situation.eventlist.length" :eventlist="situation.eventlist" :status="match.status"></event>
            <statistic v-if="situation.statistic && situation.statistic.h_ballcontrol_rate" :statistic="situation.statistic"></statistic>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news" :init-size="match.status == StatusCode.NOT_STARTED?5:3"></me-sports>
            <div class="sk-btips"
                 v-if="(situation.eventlist && situation.eventlist.length) || (situation.statistic && situation.statistic.h_ballcontrol_rate != null)">
                500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
            </div>
        </template>
        <template v-else>
            <me-sports v-if="situation.news && situation.news.length" :news="situation.news"  :init-size="match.status == StatusCode.NOT_STARTED?5:3"></me-sports>

        </template>

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
            let baseInfo = store.state.zqdetail.baseInfo
            if (!baseInfo || store.state.zqdetail.baseInfo.fid !== params.fid) {
                baseInfo = await store.dispatch(aTypes.getBaseInfo, params.fid)
            }
            const {status, matchtime, homeid, awayid, league_id} = baseInfo
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
                let baseInfo = this.$store.state.zqdetail.baseInfo
                if (!baseInfo || this.$store.state.zqdetail.baseInfo.fid !== this.$route.params.fid) {
                    baseInfo = await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                }
                const {status, matchtime, homeid, awayid, league_id} = baseInfo
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
            }

        },
        mounted () {
            this.fetchData()
        }
    }
</script>
