<template>
<div class="l-full matches">
    <div class="list-view" style="height: 100%;overflow-y: auto;-webkit-overflow-scrolling: touch">
        <schedule-list :teamMatches="teamMatches" v-if="noEmptyFlag"></schedule-list>
        <prompt v-else type="no-data" tip0="暂无数据" />
    </div>
</div>
</template>

<script>
import {
    aTypes
} from '~store/team/lq'
import Prompt from '~components/prompt.vue'
import scheduleList from '~components/team/schedule_list_lq.vue'

export default {
    async asyncData ({store, route: {params: {tid, sid}}}) {
        await store.dispatch(aTypes.getTeamMatches, {tid, sid})
    },
    components: {
        Prompt, scheduleList
    },
    computed: {
        teamMatches () {
            return this.$store.state.teamLq.teamMatches
        },
        noEmptyFlag () {
            return this.noEmpty(this.teamMatches)
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getTeamMatches, {
            tid: this.$route.params.tid,
            sid: this.$route.params.sid
        })
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    }
}
</script>

<style lang="css">
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
</style>
