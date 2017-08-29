const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
// const favicon = require('serve-favicon')
const compression = require('compression')
const forwardRequest = require('forward-request')
const {createBundleRenderer} = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? '7d' : 0
})
const port = process.env.PORT || 3000

const app = express()
/* if (process.env.EMBED) {
    app.use(compression({threshold: 0}))
    app.use('/', serve('./dist', true))
    app.use('/', serve('./public', true))

    app.listen(port, () => {
        console.log(`server started at localhost:${port}`)
    })
    return
}
*/

const template = fs.readFileSync(resolve('./public/index.template.html'), 'utf-8')

function createRenderer (bundle, options) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        template,
        // for component caching
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 5
        }),
        shouldPreload: () => false,
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: true
    }))
}

let renderer
let readyPromise
if (isProd) {
    // In production: create server renderer using built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        clientManifest
    })
} else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
        renderer = createRenderer(bundle, options)
    })
}

app.use(compression({threshold: 0}))
// app.use(favicon('./public/favicon.ico'))
app.use('/', serve('./dist', true))
app.use('/', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))

app.use((req, resp, next) => {
    if (req.originalUrl.indexOf('/ews') === 0) {
        forwardRequest({
            req,
            resp,
            host: 'ews.500.com',
            ip: '43.247.69.20',
            // ip: 'ews.500.com',
            // ip: '10.0.1.31',
            path: req.originalUrl.replace('/ews', '')
        })
    } else {
        next()
    }
})

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
    max: 100,
    maxAge: 2000
})

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
const isCacheable = req => useMicroCache

function render (req, res) {
    const s = Date.now()

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'max-age=3000')
    const handleError = err => {
        if (err && err.code === 404) {
            res.status(404).end('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).end('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const cacheable = isCacheable(req)
    if (cacheable) {
        const hit = microCache.get(req.url)
        if (hit) {
            if (!isProd) {
                console.log(`cache hit!`)
            }
            return res.end(hit)
        }
    }
    /* if (~req.url.indexOf('/bjdc/')) {
        res.sendFile(path.resolve('./dist/backup.html'))
        return
    }
    */
    const context = {
        title: '足球比分', // default title
        url: req.url
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.end(html)
        if (cacheable) {
            microCache.set(req.url, html)
        }
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
