/**
 * Created by sampson on 2017/5/12.
 */
// entry-server.js
import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                reject(new Error('not found', 404))
            }

            // call asyncData() on all matched route components
            Promise.all(matchedComponents.map(Component => {
                // console.log(Component)
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // When we attach the state to the context, and the `template` option
                // is used for the renderer, the state will automatically be
                // serialized and injected into the HTML as window.__INITIAL_STATE__.
                store.state.time = Date.now()
                context.state = store.state
                let title = '比分'
                matchedComponents.some(Component => {
                    if (Component.title) {
                        title = Component.title
                    }
                })
                context.title = title

                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
