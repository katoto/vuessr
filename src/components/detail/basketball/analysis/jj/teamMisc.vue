<template>
    <div class="tContent" style="display: block;">
        <ratio :teamMisc='teamMisc' v-if="teamMisc"></ratio>
        <offend :offend="teamMisc.offend"></offend>
        <defense :defense="teamMisc.defense"></defense>
    </div>
</template>

<script>
import ratio from '~components/detail/basketball/analysis/jj/teamMisc/ratio.vue'
import offend from '~components/detail/basketball/analysis/jj/teamMisc/offend.vue'
import defense from '~components/detail/basketball/analysis/jj/teamMisc/defense.vue'
export default {
    props: {
        teamMisc: {
            type: Object,
            required: true
        }
    },
    components: {
        ratio,
        offend,
        defense
    }
}
</script>

<style lang="css">
</style>
