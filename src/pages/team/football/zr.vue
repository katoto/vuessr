<template>
<div class="l-full">
    <div class="l-full l-scroll-y">
        <div class="main member" :class="{'top_0': noEmptyFlag}">
            <div v-if="noEmptyFlag">
                <member-list v-if="noEmptyFlagType[type]" v-for="(name, type) in memberType" :name='name' :members='teamMembers[type]' :key="type"></member-list>
            </div>
            <prompt v-else type="no-data" tip0="暂无数据"/>
        </div>
    </div>
</div>
</template>

<script>
import {aTypes} from '~store/team/zq'
import memberList from '~components/team/member_list.vue'
import Prompt from '~components/prompt.vue'

export default {
    async asyncData ({store, route: {params}}) {
        await store.dispatch(aTypes.getTeamMember, params.tid)
    },
    components: {
        memberList,
        Prompt
    },
    data () {
        return {
            memberType: {
                forward: '前锋',
                midfield: '中场',
                guard: '后卫',
                keeper: '门卫',
                coach: '教练'
            }
        }
    },
    computed: {
        teamMembers () {
            return this.$store.state.teamZq.teamMembers
        },
        noEmptyFlag () {
            return this.noEmpty(this.teamMembers)
        },
        noEmptyFlagType () {
            let result = {}
            for (let type in this.memberType) {
                result[type] = this.noEmpty(this.teamMembers[type])
            }
            return result
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getTeamMember, this.$route.params.tid)
    }
}
</script>

<style lang="css" scoped>
    .main{width:100%;padding-top:.266667rem}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .member{padding-top:0;padding-bottom:.8rem;background:#f4f4f4}
    .member-list td{height:1.413333rem}
    .member-list td:nth-child(2){ text-indent: 0.1333rem;}
    .member-list td strong{font-size:.346667rem;font-weight:400}
    .member-list td p{font-size:.266667rem;height:.346667rem;line-height:.346667rem;color:#999}
</style>
