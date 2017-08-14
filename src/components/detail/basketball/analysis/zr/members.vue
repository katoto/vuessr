<template>
<div>
    <div class="tContent" v-for="hoa in ['away', 'home']">
        <div class="gl-box fx-zr-box">
            <member-box ref="memBox" :baseInfo='baseInfo' :members='members[hoa]' :membersType='BasketballMemberType' :hoa="hoa" liW="40.133333rem"></member-box>
        </div>
    </div>
</div>
</template>

<script>
import {
    mTypes
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
        loaded (loaded) {
            if (loaded) {
                this.$store.commit(mTypes.updateScTime)
            }
        }
    }
}
</script>

<style scoped>
    .tContent {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    .gl-box,.zr-box{background:#fff}


</style>
