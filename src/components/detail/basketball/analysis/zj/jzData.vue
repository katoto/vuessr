<template>
    <div>
        <div class="zhedie-box">
            <div class="zj-nav">
                 历史交战
            </div>
            <fight-box :matchesObj='jzData' :isJz='isJz' v-if="noEmptyFlag"></fight-box>
            <feed-back-no-data v-else></feed-back-no-data>
        </div>
    </div>
</template>

<script>
import fightBox from '~components/detail/basketball/analysis/zj/fightBox.vue'
import feedBackNoData from '~components/detail/feedBackNoData.vue'

export default {
    data () {
        return {
            isJz: true
        }
    },
    components: {
        fightBox, feedBackNoData
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.jzData)
        }
    },
    props: {
        jzData: {
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

<style scoped>

    .zhedie-box {
        background: #fff
    }

    .zhedie-box:last-child {
        margin-bottom: 0
    }
</style>
