<template>
    <div class="tContent" style="display: block;">
        <ratio :team_misc='team_misc' v-if="team_misc"></ratio>
        <offend :offend="team_misc.offend"></offend>
        <defense :defense="team_misc.defense"></defense>
    </div>
</template>

<script>
import ratio from '~components/detail/basketball/analysis/jj/teamMisc/ratio.vue'
import offend from '~components/detail/basketball/analysis/jj/teamMisc/offend.vue'
import defense from '~components/detail/basketball/analysis/jj/teamMisc/defense.vue'
export default {
    props: {
        team_misc: {
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
