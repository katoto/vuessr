<template>
<div>
    <div class="tContent" style="display:block" v-for="hoa in ['away', 'home']">
        <div class="gl-box fx-zr-box">
            <member-box ref="memBox" :baseInfo='baseInfo' :members='members[hoa]' :membersType='BasketballMemberType' :hoa="hoa" liW="33.6rem"></member-box>
        </div>
    </div>
</div>
</template>

<script>
import {
    mTypes,
    aTypes
} from '~store/lqdetail'
import {
    BasketballMemberType
} from '~common/constants'
import memberBox from '~components/detail/basketball/analysis/memberBox.vue'
export default {
    components: {
        memberBox
    },
    props: {
        baseInfo: {
            type: Object,
            required: true
        },
        members: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            awayVtype: 1,
            homeVtype: 1,
            BasketballMemberType
        }
    },
    computed: {
        loaded () {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    },
    watch: {
        awayVtype (vtype) {
            this.$refs.memBox[0].scrollTo(0, false)
            this.updateMembersData(vtype, 'away')
        },
        homeVtype (vtype) {
            this.$refs.memBox[1].scrollTo(0, false)
            this.updateMembersData(vtype, 'home')
        },
        loaded (loaded) {
            if (loaded) {
                this.$store.commit(mTypes.updateScTime)
            }
        }
    }
}
</script>

<style lang="css">
</style>
