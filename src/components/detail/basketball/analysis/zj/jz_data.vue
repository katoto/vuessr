<template>
    <div v-if="noEmptyFlag">
        <div class="zhedie-box">
            <div class="zj-nav">
                 历史交战
            </div>
            <fight-box :matchesObj='jz_data' :isJz='isJz' v-if="jz_data"></fight-box>
        </div>
    </div>
</template>

<script>
import fightBox from '~components/detail/basketball/analysis/zj/fight_box.vue'
export default {
    data () {
        return {
            isJz: true
        }
    },
    components: {
        fightBox
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.jz_data)
        }
    },
    props: {
        jz_data: {
            type: Object,
            required: true
        }
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
</style>
