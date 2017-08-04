<template>
    <div class="hot-cool-wrap l-flex-1 l-relative" >
        <div class="l-full l-scroll-y" v-if="record">
            <data-box :data='record' v-if="record"></data-box>
        </div>
        <prompt v-else type="no-data" tip0="暂无数据"/>
    </div>
</template>

<script>
import dataBox from '~components/bfyc/record/dataBox.vue'
import Prompt from '~components/prompt.vue'

export default {
    components: {
        Prompt, dataBox
    },
    computed: {
        tab () {
            return this.$route.meta.tab
        },
        record () {
            return this.$store.state.bfyc.record[this.tab]
        }
    }

}
</script>

<style lang="css">
</style>
