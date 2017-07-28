<template>
    <div>
        <team-misc :team_misc="team_misc" v-if="team_misc"></team-misc>
        <members-advanced :baseInfo="baseInfo" :members_advanced="members_advanced" v-if="members_advanced"></members-advanced>
        <div class="item-loader" v-if="$store.state.refreshing">
            <div class="la-ball-pulse la-2x">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import teamMisc from '~components/detail/basketball/analysis/jj/team_misc.vue'
import membersAdvanced from '~components/detail/basketball/analysis/jj/members_advanced.vue'
export default {
    async asyncData ({store, route: {params}}) {
        const {homeid, awayid, seasonid} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
        await store.dispatch(aTypes.getAnalysisJj, {homeid, awayid, seasonid})
    },
    components: {
        teamMisc,
        membersAdvanced
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        analysis () {
            return this.$store.state.lqdetail.analysis
        },
        team_misc () {
            return this.analysis.jj.team_misc
        },
        members_advanced () {
            return this.analysis.jj.members_advanced
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        refreshTime () { // 用户点击刷新按钮时间戳
            return this.$store.state.refreshTime
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {homeid, awayid, seasonid} = this.baseInfo // baseInfo 保证有数据了
            await this.$store.dispatch(aTypes.getAnalysisJj, {homeid, awayid, seasonid})
            this.$store.commit('endOneRefresh')
        }
    },
    mounted () {
        this.fetchData()
    },
    watch: {
        loaded (loaded) {
            if (loaded) { this.$store.commit(mTypes.updateScTime) }
        },
        refreshTime () {
            this.fetchData()
        }
    }
}
</script>

<style lang="css">
</style>
