<template>
    <div v-if="noEmptyFlag">
        <div class="zhedie-box">
            <div class="zj-nav">
                近期战绩
            </div>
            <fight-box :matchesObj='recent_record.alist' hoa='awaysxname' v-if="noEmptyFlag_home">
            </fight-box>
            <fight-box :matchesObj='recent_record.hlist' v-if="noEmptyFlag_away">
            </fight-box>
        </div>
    </div>
</template>

<script>
import fightBox from '~components/detail/basketball/analysis/zj/fight_box.vue'
export default {
    components: {
        fightBox
    },
    computed: {
        noEmptyFlag () {
            return this.noEmptyFlag_home && this.noEmptyFlag_away
        },
        noEmptyFlag_home () {
            return this.noEmpty(this.recent_record && this.recent_record.hlist)
        },
        noEmptyFlag_away () {
            return this.noEmpty(this.recent_record && this.recent_record.alist)
        }
    },
    props: {
        recent_record: {
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
