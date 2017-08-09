<template>
    <div>
        <best3 :best3='best3' v-if="best3"></best3>
        <members :baseInfo="baseInfo" :members='members' v-if="members"></members>
        <item-loader v-if="!(best3 && members)"></item-loader>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import best3 from '~components/detail/basketball/analysis/zr/best3.vue'
import members from '~components/detail/basketball/analysis/zr/members.vue'
import itemLoader from '~components/detail/itemLoader.vue'
export default {
    async asyncData ({store, route: {params}}) {
        const {homeid, awayid, seasonid} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
        await store.dispatch(aTypes.getAnalysisZr, {homeid, awayid, seasonid, vtype: 1})
    },
    components: {
        best3,
        members,
        itemLoader
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        analysis () {
            return this.$store.state.lqdetail.analysis
        },
        best3 () {
            return this.analysis.zr.best3
        },
        members () {
            return this.analysis.zr.members
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
            await this.$store.dispatch(aTypes.getAnalysisZr, {homeid, awayid, seasonid, vtype: 1})
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

