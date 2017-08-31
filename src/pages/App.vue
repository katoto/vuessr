<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import '~assets/style/public/reset.css'
    import Vue from 'vue'
    import vueTap from 'v-tap'
    import '~assets/style/base.css'
    Vue.use(vueTap)
    export default {
        mounted () {
            this.$store.dispatch('initWebsocket')
            const findP = (e) => {
                if (e.tagName === 'BODY' || !e) return
                if (e.dataset.p2) {
                    return e
                } else {
                    return findP(e.parentNode)
                }
            }

            let initTime = 0
            this.$el.addEventListener('touchstart', (e) => {
                const ele = findP(e.target)
                if (ele) {
                    initTime = e.timeStamp
                }
            }, true)
            this.$el.addEventListener('touchend', (e) => {
                const ele = findP(e.target)
                if (ele) {
                    if (e.timeStamp - initTime < 500) this.summery(ele.dataset.p2, ele.dataset.p4, ele.dataset.p1, ele.dataset.p3)
                }
            }, true)

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
