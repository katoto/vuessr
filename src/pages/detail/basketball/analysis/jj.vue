<template>
    <team-misc :team_misc="team_misc" v-if="team_misc"></team-misc>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail/mchao'
import teamMisc from '~components/detail/basketball/analysis/jj/team_misc.vue'
export default {
    components: {
        teamMisc
    },
    computed: {
        baseinfo () {
            return this.$store.state.mchao.baseinfo
        },
        analysis () {
            return this.$store.state.mchao.analysis
        },
        team_misc() {
            return this.analysis.jj.team_misc
        },
        members_advanced() {
            return this.analysis.jj.members_advanced
        },
        loaded () {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {homeid, awayid, seasonid} = this.baseinfo // baseInfo 保证有数据了
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
        }
    }
}
</script>

<style lang="css">
</style>
