/**
 * Created by sampson on 2017/5/12.
 */
// entry-server.js
import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp()

        router.push(context.url)

        router.onReady(async () => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                reject(new Error('not found', 404))
            }

            try {
                for (let i = 0; i < matchedComponents.length; i++) {
                    if (matchedComponents[i].asyncData) {
                        await matchedComponents[i].asyncData({
                            store,
                            route: router.currentRoute
                        })
                    }
                }
                store.state.time = Date.now()
                context.state = store.state
                // let title = '比分'
                matchedComponents.some(Component => {
                    if (typeof Component.head === 'function') {
                        let head = Component.head(store.state)
                        Object.assign(context, head)
                        if (~context.url.indexOf('from=app_bet')) {
                            context.title = head.appTitle || context.title
                        }
                    } else {
                        if (Component.head) {
                            Object.assign(context, Component.head)
                            if (~context.url.indexOf('from=app_bet')) {
                                context.title = Component.head.appTitle || context.title
                            }
                        }
                    }
                })
                // context.title = title

                resolve(app)
            } catch (e) {
                reject(e)
            }
        })
    })
}
