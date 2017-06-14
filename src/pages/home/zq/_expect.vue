<template>
    <expect-select :expect-list="expectList" :cur-expect="curExpect">
        <matches-scroller ref="scroller">
            <ul class="list">
                <zq-list-item v-for="match in showedMatches" :match="match" key="match.fid"></zq-list-item>
            </ul>
        </matches-scroller>
    </expect-select>

</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import expectSelect from '~components/home/expectSelect.vue'
    import zqListItem from '~components/home/zqListItem.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
            await store.dispatch(aTypes.fetchZqMatches, {expect, tab})
        },
        data () {
            return {
                showExpectList: false,
                selectOptions: null,
                filteredMatches: null
            }
        },
        watch: {
            filterClick () {
                this.$store.commit(mTypes.initFilter, {
                    matches: this.matches,
                    inited: this.selectOptions,
                    onOk: ({selectOptions, filteredMatches}) => {
                        this.filteredMatches = filteredMatches
                        this.selectOptions = selectOptions
                        this.$store.commit(mTypes.endFilter)
                    },
                    onCancel: () => {
                        this.$store.commit(mTypes.endFilter)
                    }
                })
            },
            showedMatchesSize () {
                this.$refs.scroller.config()
            },
            matches () {
                this.showExpectList = false
                this.filteredMatches = null
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
            }

        },
        components: {
            MatchesScroller, expectSelect, zqListItem
        },
        computed: {
            socketData () {
                return this.$store.getters.getSocketData
            },
            filterClick () {
                return this.$store.state.home.filter.filterClick
            },
            zq () {
                return this.$store.state.home.zq
            },
            showedMatchesSize () {
                return this.showedMatches && this.showedMatches.length
            },
            showedMatches () {
                return this.filteredMatches || this.matches
            },
            matches () {
                return this.zq.matches
            },
            curExpect () {
                return this.zq.curExpect
            },
            fidIndexMap () { // matches 变化了， fidIndexMap一定会变化
                const map = {}
                this.matches.forEach((match, idx) => {
                    if (match.status !== StatusCode.ENDED) {
                        map[match.fid] = idx
                    }
                })
                return map
            },
            expectList () {
                return this.zq.expectList
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            async fetchData () {
                await this.$store.dispatch(aTypes.fetchZqMatches, this.$route.params)
            }
        }

    }
</script>
<style>
    .qi-list-box {
        position: relative;
        top: 0;
    }

    .qi-list-box a {
        display: block;
        color: inherit;
    }
</style>
