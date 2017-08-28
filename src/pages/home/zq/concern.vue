<template>
    <div class="l-full" v-if="ready">
        <login-page v-if="!hasLogin"></login-page>
        <template v-else>
            <loading v-if="!matches"></loading>
            <template v-else>
                <empty v-if="matches.length === 0"></empty>
                <matches-scroller ref="scroller" v-else @position="setPosition" :pos="position">
                    <ul class="list">
                        <zq-list-item v-for="match in matches" :match="match" key="match.fid"
                                      :view="view"></zq-list-item>
                    </ul>
                </matches-scroller>
            </template>
        </template>
    </div>


</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import zqListItem from '~components/home/zqListItem.vue'
    import empty from '~components/home/empty.vue'
    import loading from '~components/home/loading.vue'
    import loginPage from '~components/home/loginPage.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    const savedData = {}
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.name && ~from.name.indexOf('football-detail')) {
                    vm.position = savedData.position
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            if (~to.name.indexOf('football-detail')) {
                savedData.position = this.position
            }
            next()
        },
        data () {
            return {
                position: 0,
                ready: false
            }
        },
        watch: {
            filteredMatches (after, before) {
                if (!before || before.length !== after.length) {
                    this.position = 0
                    this.$refs.scroller && this.$refs.scroller.update()
                }
            },
            fidIndexMap (fidIndexMap) {
                this.$store.dispatch(aTypes.subscribeFootballInfo, Object.keys(fidIndexMap))
            },

            socketData ({data, stamp}) {
                if (stamp === pushEvents.FOOTBALL_INFO) {
                    data.fid = data.fid + ''
                    let match = this.matches[this.fidIndexMap[data.fid]]
                    if (match && match.fid === data.fid) {
                        this.$store.commit(mTypes.updateZqMatch, {info: data, idx: this.fidIndexMap[data.fid]})
                    }
                }
            },
            refreshTime () {
                this.fetchData()
            }

        },
        components: {
            MatchesScroller, zqListItem, empty, loginPage, loading
        },

        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },

            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },

            zq () {
                return this.$store.state.home.zq
            },
            view () { // 展示赔率， 最近6场比赛， 空 三种情况标志位
                return this.$store.state.home.view
            },
            matches () {
                return this.zq.concern
            },

            fidIndexMap () { // matches 变化了， fidIndexMap一定会变化
                const map = {}
                if (!this.matches) return map
                this.matches.forEach((match, idx) => {
                    if (match.status !== StatusCode.ENDED) {
                        map[match.fid] = idx
                    }
                })
                return map
            },
            hasLogin () {
                return this.$store.state.home.hasLogin
            }
        },

        async mounted () {
            await this.$store.dispatch(aTypes.checkHasLogin)
            this.ready = true
            if (this.hasLogin) {
                await this.fetchData()
            }
        },

        methods: {
            setPosition (position) {
                savedData.position = position
                this.position = position
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getConcern, '1')
                this.$store.commit('endOneRefresh')
            }
        }

    }
</script>
