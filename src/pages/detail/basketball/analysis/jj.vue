<template>
    <div>
        <team-misc :teamMisc="teamMisc" v-if="teamMisc"></team-misc>
        <members-advanced :baseInfo="baseInfo" :membersAdvanced="membersAdvanced" v-if="membersAdvanced"></members-advanced>
        <div class="item-loader" v-if="!(teamMisc && membersAdvanced)">
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
import teamMisc from '~components/detail/basketball/analysis/jj/teamMisc.vue'
import membersAdvanced from '~components/detail/basketball/analysis/jj/membersAdvanced.vue'
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
        teamMisc () {
            return this.analysis.jj.teamMisc
        },
        membersAdvanced () {
            return this.analysis.jj.membersAdvanced
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
