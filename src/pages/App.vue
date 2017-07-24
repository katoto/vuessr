<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import Vue from 'vue'
    import vueTap from 'v-tap'
    import '~assets/style/base.css'
    Vue.use(vueTap)
    export default {
        mounted () {
            this.$store.dispatch('initWebsocket')
        }
    }
</script>
<style>

</style>
