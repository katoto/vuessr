/**
 * 保留最近10次的构建结果
 * Created by lichun on 2017/9/19.
 */
const fs = require('fs')
const path = require('path')

const { exec } = require('child_process')

const dist = path.join(__dirname, '../dist')

const manifest = require('../dist/vue-ssr-client-manifest.json')
const allFile = manifest.all
let fversions = []
const fvp = path.join(dist, '.version.json')
if (fs.existsSync(fvp)) {
    fversions = JSON.parse(fs.readFileSync(fvp, 'utf-8'))
}

let vs = []
fversions.forEach((v, i) => {
    if (i < 9) {
        vs.push(v)
    }
})
fversions = vs
fversions.push(allFile)
fs.writeFileSync(fvp, JSON.stringify(fversions))
// ------------------------------------------------------------
const all = {}
fversions.forEach(versions => {
    versions.forEach(file => {
        all[file] = true
    })
})
all['vue-ssr-client-manifest.json'] = true
all['vue-ssr-server-bundle.json'] = true
all['backup.html'] = true
const distFiles = fs.readdirSync(dist)

const deleteFileList = []
distFiles.forEach(file => {
    if (!all[file] && file.indexOf('.') !== 0) {
        deleteFileList.push(file)
        // fs.unlinkSync(path.join(dist, file))
        console.log(`deleted file: ` + file)
    }
})
const args = deleteFileList.map(file => path.join(__dirname, '../dist', file))
if (args.length) {
    exec(`svn delete ${args.join(' ')}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            process.exit(-1)
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
}
