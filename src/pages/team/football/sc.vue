<template>
<div class="l-full matches schedule-foot">
    <div class="list-view" style="height: 100%;overflow-y: auto;-webkit-overflow-scrolling: touch">
        <schedule-list :teamMatches="teamMatches" pageType="football" v-if="noEmptyFlag"></schedule-list>
        <prompt v-else type="no-data" tip0="暂无数据"/>
    </div>
</div>
</template>

<script>
import {aTypes} from '~store/team/zq'
import Prompt from '~components/prompt.vue'
import scheduleList from '~components/team/schedule_list_zq.vue'

export default {
    async asyncData ({store, route: {params}}) {
        await store.dispatch(aTypes.getTeamMatches, params.tid)
    },
    components: {
        Prompt, scheduleList
    },
    computed: {
        teamMatches () {
            return this.$store.state.teamZq.teamMatches
        },
        noEmptyFlag () {
            return this.noEmpty(this.teamMatches)
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getTeamMatches, this.$route.params.tid)
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    }
}
</script>

<style lang="css" scoped>
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .schedule-foot .who-gamer-home em, .schedule-foot .who-gamer-guest em{ display: inline-block;
        width: 1.7rem; text-align:center;}
    .who-win i{ color: #999; margin:0 0.13333rem; display: inline-block;}
    .schedule-foot .who-win{ width: 1.173333rem}
    .schedule-foot .when-game{ width: 3rem;}
</style>
