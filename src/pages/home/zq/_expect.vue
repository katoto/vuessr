<template>
    <loading v-if="isLoading===1"></loading>
    <div class="l-full l-flex-column" v-else>
        <div class="filter-cont">
            <template v-if="$route.params.tab === 'csl'"> <!--中超筛选-->
                <filter-csl :expect-list="expectList" :cur-expect="curExpect"></filter-csl>

            </template>
            <template v-else>
                <!-- 日期筛选 -->
                <filter-time v-if="$route.params.tab === 'jczq' || $route.params.tab === 'all'||$route.params.tab === 'crazybet'||$route.params.tab === 'hot'" class="fl" :expect-list="expectList" :cur-expect="curExpect"></filter-time>
                <expect-select v-if="$route.params.tab === 'sfc' || $route.params.tab === 'bjdc'" class="fl" :expect-list="expectList" :cur-expect="curExpect"></expect-select>

                <!-- 联赛筛选 -->
                <filter-league class="fr" :initial="selectOptions" :matches="matches" @ok="doFilter"></filter-league>

            </template>

        </div>

        <div class="l-flex-1 l-relative">
            <loading v-if="isLoading === 2"></loading>
            <template v-else>
                <empty v-if="filteredMatches.length === 0"></empty>
                <matches-scroller ref="scroller" v-else @position="setPosition" :pos="position">
                    <ul class="list">
                        <zq-list-item v-for="match,idx in filteredMatches" :match="match" key="match.fid" :ready="ready"
                                      :view="view" :concern="concerns && concerns[match.fid]"></zq-list-item>
                    </ul>
                </matches-scroller>
            </template>

        </div>
        <toast v-if="toast.visible" :msg="toast.msg"/>

    </div>


</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import zqListItem from '~components/home/zqListItem.vue'
    import empty from '~components/home/empty.vue'
    import filterTime from '~components/home/filterTime.vue'
    import filterCsl from '~components/home/filterCsl.vue'
    import toast from '~components/toast.vue'
    import expectSelect from '~components/home/expectSelect.vue'

    import loading from '~components/home/loading.vue'
    import filterLeague from '~components/home/filterLeague.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    const savedData = {}
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
            await store.dispatch(aTypes.fetchZqMatches, {expect, tab})
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.name && ~from.name.indexOf('football-detail')) {
                    vm.position = savedData.position
                    vm.selectOptions = savedData.selectOptions
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            if (~to.name.indexOf('football-detail')) {
                savedData.selectOptions = this.selectOptions
            }
            this.$store.dispatch('unsubscribeAll')
            next()
        },
        data () {
            return {
                selectOptions: null,
                position: 0,
                ready: false
            }
        },
        watch: {
            filteredMatches (after, before) {
                if (before && before.length !== after.length) {
                    this.position = 0
                }
                if (!before || before.length !== after.length) {
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

            '$route.path' () {
                this.selectOptions = null
                this.position = 0
                this.$store.dispatch('unsubscribeAll')
                this.$refs.scroller && this.$refs.scroller.update()
                this.fetchData()
            },

            refreshTime () {
                this.fetchData()
            }

        },
        components: {
            MatchesScroller, zqListItem, filterTime, filterLeague, empty, loading, filterCsl, expectSelect, toast
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
                return this.$store.state.home.zqView
            },

            filteredMatches () {
                return this.matches && this.matches.filter(match => !this.selectOptions || this.selectOptions[match.simpleleague])
            },
            matches () {
                return this.zq.matches
            },

            curExpect () {
                return this.zq.curExpect
            },

            fidIndexMap () { // matches 变化了， fidIndexMap一定会变化
                const map = {}
                if (!this.matches) return null
                this.matches.forEach((match, idx) => {
                    if (match.status !== StatusCode.ENDED) {
                        map[match.fid] = idx
                    }
                })
                return map
            },

            expectList () {
                return this.zq.expectList
            },
            concerns () {
                return this.zq.concernState
            },
            isLoading () {
                if (!this.matches) return 1
                if (this.zq.tab === this.$route.params.tab) {
                    if (this.$route.params.expect === 'cur') {
                        return 0
                    } else if (this.$route.params.expect !== this.zq.curExpect) {
                        return 2
                    }
                } else {
                    return 1
                }
            },
            toast () {
                return this.$store.state.toast
            }
        },

        async mounted () {
            await this.fetchData()
            this.ready = true
            this.$store.dispatch(aTypes.subscribeFootballInfo, Object.keys(this.fidIndexMap))
        },

        methods: {
            setPosition (position) {
                savedData.position = position
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.fetchZqMatches, this.$route.params)
                this.$store.commit('endOneRefresh')
            },
            doFilter (selectOptions) {
                this.selectOptions = selectOptions
            }
        }

    }
</script>
<style scoped>
    .fl {
        float: left;
    }

    .fr {
        float: right;
    }


    .filter-cont {
        width: 9.2rem;
        margin: 0 auto;
        margin-top: .266667rem;
        color: #aab5bd;
        font-size: .346667rem;
        clear: both;
        zoom: 1;
        position: relative
    }

</style>
