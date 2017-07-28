// import Vue from 'vue'
import 'es6-promise/auto'
import platform from '~common/platform'
import { createApp } from './app'
// import ProgressBar from './components/ProgressBar.vue'

// global progress bar
// const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
// document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
/* Vue.mixin({
    beforeMount () {
        const { asyncData } = this.$options
        if (asyncData) {
            if (this.$store.state.time) {
                if (Date.now() - this.$store.state.time > 5000) {
                    bar.start()
                    asyncData({
                        store: this.$store,
                        route: this.$route
                    }).then(() => {
                        bar.finish()
                    }).catch(() => {
                        bar.finish()
                    })
                }
            }
        }
    },
    beforeRouteUpdate (to, from, next) {
        const wnext = () => {
            bar.finish()
            next(arguments)
        }
        const { asyncData, hasParametor } = this.$options
        if (asyncData && hasParametor) {
            bar.start()
            asyncData({
                store: this.$store,
                route: to
            }).then(wnext).catch(wnext)
        } else {
            next()
        }
    }
})
*/

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    /* router.beforeResolve((to, from, next) => {
        store.state.time = 0
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }
        bar.start()
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            bar.finish()
            next()
        }).catch(next)
    })
    */

    // actually mount to DOM
    platform.ready(() => {
        window.EsApp && window.EsApp.invoke('titleBar', {isShow: '0', title: '比分详情'})

        app.$mount('#app')
    })
})

// service worker
/* if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
}
*/
