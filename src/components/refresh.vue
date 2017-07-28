<template>
    <div class="refresh-box">
        <i id="sx" class="refresh-icon" :class="{'refresh-rorate': refreshing}" v-tap="{methods: emitRefresh}"></i>
    </div>
</template>
<script>
    export default {
        computed: {
            refreshing () {
                return this.$store.state.refreshing
            }
        },
        methods: {
            emitRefresh () {
                if (window.EsApp) {
                    location.reload()
                    return
                }
                this.$store.commit('beginRefresh')
            }
        }
    }
</script>
