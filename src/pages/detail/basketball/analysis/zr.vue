<template>
    <div>
        <best3 :best3='best3' v-if="best3"></best3>
        <members :baseinfo="baseinfo" :members='members' v-if="members"></members>
        <div class="sk-btips">
            500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
        </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail/mchao'
import best3 from '~components/detail/basketball/analysis/zr/best3.vue'
import members from '~components/detail/basketball/analysis/zr/members.vue'
export default {
    components: {
        best3,
        members
    },
    computed: {
        baseinfo () {
            return this.$store.state.mchao.baseinfo
        },
        analysis () {
            return this.$store.state.mchao.analysis
        },
        best3() {
            return this.analysis.zr.best3
        },
        members() {
            return this.analysis.zr.members
        },
        loaded () {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {homeid, awayid, seasonid, vtype} = this.baseinfo // baseInfo 保证有数据了
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
        }
    }
}
</script>

<style lang="css">
</style>
