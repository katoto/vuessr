<template>
</template>

<script>
import ratio from '~components/detail/basketball/analysis/jj/teamMisc/ratio.vue'
import offend from '~components/detail/basketball/analysis/jj/teamMisc/offend.vue'
import defense from '~components/detail/basketball/analysis/jj/teamMisc/defense.vue'
import combat from '~components/detail/basketball/analysis/jj/teamMisc/combat.vue'

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
        defense,
        combat
    }
}
</script>

<style lang="css">
</style>
