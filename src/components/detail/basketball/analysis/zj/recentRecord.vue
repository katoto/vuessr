<template>
    <div>
        <div class="zhedie-box">
            <div class="zj-nav">
                近期战绩
            </div>
            <template v-if="noEmptyFlag">
                <fight-box :matchesObj='recentRecord.alist' hoa='awaysxname' v-if="noEmptyFlag_home">
                </fight-box>
                <fight-box :matchesObj='recentRecord.hlist' v-if="noEmptyFlag_away">
                </fight-box>
            </template>
            <feed-back-no-data v-else></feed-back-no-data>
        </div>
    </div>
</template>

<script>
import fightBox from '~components/detail/basketball/analysis/zj/fightBox.vue'
import feedBackNoData from '~components/detail/feedBackNoData.vue'

export default {
    components: {
        fightBox, feedBackNoData
    },
    computed: {
        noEmptyFlag () {
            return this.noEmptyFlag_home && this.noEmptyFlag_away
        },
        noEmptyFlag_home () {
            return this.noEmpty(this.recentRecord && this.recentRecord.hlist)
        },
        noEmptyFlag_away () {
            return this.noEmpty(this.recentRecord && this.recentRecord.alist)
        }
    },
    props: {
        recentRecord: {
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
