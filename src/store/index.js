/**
 * Created by lichun on 2017/1/19.
 */
import SockJS from 'sockjs-client'
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import zqdetail from './zqdetail'
import teamZq from './team/zq'
import teamLq from './team/lq'
Vue.use(Vuex)

const state = {
    refreshTime: 0, // 用来监控用户点击刷新按钮时间
    refreshing: 0, // 表示当前正在刷新任务数量
    time: 0, // 记录生成页面的时间
    websocket: { // 数据推送相关的
        connect: null, // 代表当前连接
        data: null,  // websocket 返回来的数据， 用到推送过来的数据的地方 watch一下就好了
        latestSub: null, // 最近一次订阅数据， websocket重连的时候重新订阅上次订阅的事件
        reconnect: 0  // socket 记录重连次数， 起到辅助作用， 比如websocket断开了连接， 重新请求接口， 避免推送丢失引发的问题
    }
}
const mutations = {
    initSocket (state, {connect}) {
        state.websocket.connect = connect
    },
    addConnectNum (state) {
        state.websocket.reconnect ++
    },
    setLatestSub (state, latestSub) {
        state.websocket.latestSub = latestSub
    },
    updateSocketData (state, data) {
        state.websocket.data = data
    },
    setTime (state, time) {
        state.time = time
    },
    startOneRefresh (state) {
        state.refreshing++
    },
    endOneRefresh (state) {
        if (state.refreshing > 0) {
            state.refreshing--
        }
    },
    beginRefresh (state) {
        state.refreshTime = Date.now()
    }
}
const actions = {
    initWebsocket ({commit, dispatch, state}) {
        return new Promise((resolve, reject) => {
            if (state.websocket.connect) return resolve()
            let connect = new SockJS(`http://em.500.com/score/sock`)
            let interval = null
            let hasFinished = false
            connect.onmessage = function (e) {
                let data = JSON.parse(e.data)
                commit('updateSocketData', data)
            }
            connect.onopen = function () {
                /*
                let homeScore = 0
                setInterval(() => {
                    let data = {
                        "status":"1",
                        "fid":660486,
                        "awayscore":"0",
                        "status_desc":"上半场",
                        "homescore":(homeScore++)+ '',
                        "home_red_counts":"0",
                        "away_red_counts":"0",
                        "match_at":"1080"
                    }
                    // console.log(data)
                    commit('updateSocketData', {data, stamp: 0})
                }, 2000) */
                if (state.websocket.latestSub) {
                    connect.send(state.websocket.latestSub)
                }
                interval = setInterval(() => {
                    connect.send(JSON.stringify({
                        'action': 'ping',
                        'from': {
                            url: window.location.href,
                            time: new Date().getTime()
                        }
                    }))
                }, 15000)
                if (hasFinished) return
                hasFinished = true
                resolve()
            }
            connect.onclose = function () {
                console.warn('5s后 websocket 重连')
                clearInterval(interval)
                setTimeout(() => {
                    commit('addConnectNum')
                    dispatch('initWebsocket')
                }, 5000)
            }
            connect.onerror = function (e) {
                console.error('sock error')
                e.code = '102'
                if (hasFinished) return
                hasFinished = true
                reject(e)
            }
            setTimeout(() => {
                if (hasFinished) return
                hasFinished = true
                let error = new Error('超时')
                error.code = '103'
                reject(error)
            }, 2000)
            commit('initSocket', {connect})
        })
    },
    subscribe ({commit, dispatch, state}, {stamp, data}) {
        try {
            let latestSub = JSON.stringify({
                action: 'subs',
                stamp,
                data
            })
            // if (!state.websocket.connect) await dispatch('initWebsocket')
            state.websocket.connect && state.websocket.connect.send(latestSub)
            commit('setLatestSub', latestSub)
        } catch (e) {
            console.error(e.message)
        }
    }
}

const getters = {
    getSocketData (state) {
        return state.websocket.data
    }
}

export function createStore () {
    return new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
        modules: {
            home, zqdetail, teamZq, teamLq
        }
    })
}
