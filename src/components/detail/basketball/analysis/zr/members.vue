<template>
<div>
    <div class="tContent" style="display:block" v-for="hoa in ['away', 'home']">
        <div class="gl-box fx-zr-box">
            <div class="zj-nav">
                {{baseinfo[hoa + 'sxname']}}
                <ul class="time-item" v-if="hoa === 'away'">
                    <li class="click-cj" :class="{'time-item-cur': awayVtype === 1}" v-tap="{methods: () => awayVtype = 1}">场均</li>
                    <li class="click-zs" :class="{'time-item-cur': awayVtype === 2}" v-tap="{methods: () => awayVtype = 2}">总数</li>
                    <li class="click-ybhh" :class="{'time-item-cur': awayVtype === 3}" v-tap="{methods: () => awayVtype = 3}">100回合</li>
                    <li class="click-sslfz" :class="{'time-item-cur': awayVtype === 4}" v-tap="{methods: () => awayVtype = 4}">36分钟</li>
                </ul>

                <ul class="time-item" v-if="hoa === 'home'">
                    <li class="click-cj" :class="{'time-item-cur': homeVtype === 1}" v-tap="{methods: () => homeVtype = 1}">场均</li>
                    <li class="click-zs" :class="{'time-item-cur': homeVtype === 2}" v-tap="{methods: () => homeVtype = 2}">总数</li>
                    <li class="click-ybhh" :class="{'time-item-cur': homeVtype === 3}" v-tap="{methods: () => homeVtype = 3}">100回合</li>
                    <li class="click-sslfz" :class="{'time-item-cur': homeVtype === 4}" v-tap="{methods: () => homeVtype = 4}">36分钟</li>
                </ul>
            </div>
            <member-box ref="memBox" :members='members[hoa]' :membersType='BasketballMemberType' liW="33.6rem"></member-box>
        </div>
    </div>
</div>
</template>

<script>
import {
    mTypes,
    aTypes
} from '~store/lqdetail/mchao'
import {
    BasketballMemberType
} from '~common/constants'
import memberBox from '~components/detail/basketball/analysis/member_box.vue'
export default {
    components: {
        memberBox
    },
    props: {
        baseinfo: {
            type: Object,
            required: true
        },
        members: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            awayVtype: 1,
            homeVtype: 1,
            BasketballMemberType
        }
    },
    computed: {
        loaded() {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        noEmpty(obj) {
            if(obj)
            return !!Object.keys(obj).length
            return false
        },
        async updateMembersData(vtype, hoa) {
            this.$store.commit('startOneRefresh')
            const {
                homeid,
                awayid,
                seasonid
            } = this.baseinfo // baseInfo 保证有数据了
            await this.$store.dispatch(aTypes.getAnalysisZrMembers, {
                homeid,
                awayid,
                seasonid,
                hoa: hoa,
                vtype: vtype
            })
            this.$store.commit('endOneRefresh')
        }
    },
    watch: {
        awayVtype(vtype) {
            this.$refs.memBox[0].scrollTo(0, false)
            this.updateMembersData(vtype, 'away')
        },
        homeVtype(vtype) {
            this.$refs.memBox[1].scrollTo(0, false)
            this.updateMembersData(vtype, 'home')
        },
        loaded(loaded) {
            if (loaded) {
                this.$store.commit(mTypes.updateScTime)
            }
        }
    }
}
</script>

<style lang="css">
</style>
