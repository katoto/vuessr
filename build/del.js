/**
 * Created by lichun on 2017/9/19.
 */
const fs = require('fs')
const path = require('path')

const { exec } = require('child_process')

const dist = path.join(__dirname, '../dist')
const manifest = require('../dist/vue-ssr-client-manifest.json')
// console.log(manifest.all)
const all = {}
manifest.all.forEach((file) => {
    all[file] = true
})
all['vue-ssr-client-manifest.json'] = true
all['vue-ssr-server-bundle.json'] = true
all['backup.html'] = true
const distFiles = fs.readdirSync(dist)

const deleteFileList = []
distFiles.forEach(file => {
    if (!all[file]) {
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
