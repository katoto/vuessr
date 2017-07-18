/**
 * Created by lichun on 2017/5/10.
 */
import axios from 'axios'

const options = {}
if (process.env.NODE_ENV === 'production') {
    options.baseURL = 'http://ews.500.com'
} else {
    if (process.env.VUE_ENV === 'server') { // The server-side needs a full url to works
        options.baseURL = 'http://ews.500.com'
    } else {
        options.baseURL = '/ews'
    }
}
const _axios = axios.create(options)

const ajax = function (url, config = {ignore: true}) {
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
