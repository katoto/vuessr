/**
 * 默认发生任何异常都返回一个空对象
 * Created by lichun on 2017/5/10.
 */
import axios from 'axios'
// import platform from '~common/platform'

const options = {}
if (process.env.NODE_ENV === 'production') {
    // options.baseURL = 'http://ews.500.com'
    options.baseURL = '/ews'
} else {
    if (process.env.VUE_ENV === 'server') { // The server-side needs a full url to works
        // options.baseURL = 'http://ews.500.com'
        options.baseURL = 'http://127.0.0.1:3000/ews'
    } else {
        options.baseURL = '/ews'
    }
}
const _axios = axios.create(options)

const ajax = function (url, config = {ignore: true}) {
    config.withCredentials = true
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100' || config.ignore) {
            if (!resp.data) {
                console.warn('服务端异常， 没有返回数据，' + url)
                return {}
            }
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.get = function (url, config = {ignore: true}) {
    config.withCredentials = true
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100' || config.ignore) {
            if (!resp.data) {
                console.warn('服务端异常， 没有返回数据，' + url)
                return {}
            }
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.post = function (url, param, config = {ignore: true}) {
    config.withCredentials = true
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100' || config.ignore) {
            if (!resp.data) {
                console.warn('服务端异常， 没有返回数据，' + url)
                return {}
            }
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
export default ajax
