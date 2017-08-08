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
            this.$el.addEventListener('click', (e) => {
                if (e.target.dataset.p4 && e.target.dataset.p2) {
                    this.summery(e.target.dataset.p2, e.target.dataset.p4, e.target.dataset.p1, e.target.dataset.p3)
                }
            })

            if (window && (window.EsApp)) {
                this.$store.commit('setIsApp', true)
            }
        },
        methods: {
            summery (p2, p4, p1 = '_trackEvent', p3 = 'click') {
                if (window._hmt) {
                    window._hmt.push([p1, p2, p3, p4])
                }
                console.log([p1, p2, p3, p4])
            }
        }
    }
</script>
<style>

</style>
