/**
 * Created by sampson on 2017/5/10.
 */
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
import platform from '~common/platform'
import {pushEvents} from '~common/constants'
const ns = 'home'
const state = {
    hasLogin: false,
    myState: {},
    view: '0',
    switchShow: true, // 切换框显示
    zq: {
        metro: null,
        tab: 'jczq',
        matches: null,
        expectList: null,
        curExpect: null,
        concern: null,
        concernState: {}
    },
    lq: {
        metro: null,
        tab: 'jclq',
        matches: null,
        expectList: null,
        curExpect: null,
        concern: null,
        concernState: {}
    }
}
const actionsInfo = mapActions({
    subscribeFootballInfo ({dispatch}, fidList) {
        if (!fidList || fidList.length < 1) {
            return
        }
        const eventList = fidList.map(fid => 'LIVE:FOOTBALL:INFO:' + fid)
        dispatch('subscribe', {stamp: pushEvents.FOOTBALL_INFO, data: eventList})
    },
    subscribeBasketballInfo ({dispatch}, fidList) {
        if (!fidList || fidList.length < 1) {
            return
        }
        const eventList = fidList.map(fid => 'LIVE:BASKETBALL:INFO:' + fid)
        dispatch('subscribe', {stamp: pushEvents.BASKETBALL_INFO, data: eventList})
    },
    async checkHasLogin ({commit}) {
        const hasLogin = platform.isLogin()
        commit(mTypes.setLogin, hasLogin)
        return hasLogin
    },
    switchView ({commit, state}, view) {
        view = view || (parseInt(state.view) + 1) % 3 + ''
        sessionStorage.setItem('view', view)
        commit(mTypes.setView, view)
    },
    async getConcern ({commit}, vtype) {
        try {
            const {matches} = await ajax.get(`/score/concern/list?vtype=${vtype}`, {ignore: false})
            if (vtype === '1') {
                commit(mTypes.setZqConcern, matches)
            } else {
                commit(mTypes.setLqConcern, matches)
            }
        } catch (e) {
            if (e.code === '102') {
                commit(mTypes.setLogin, false)
                // platform.login()
            }
        }
    },
    async getConcernState ({commit}, vtype) {
        try {
            const list = await ajax.get(`/score/concern/state?vtype=${vtype}`, {ignore: false})
            if (list.length) {
                const data = {}
                list.forEach(item => {
                    data[item.fid] = item
                })
                if (vtype === '1') {
                    commit(mTypes.setZqConcernState, data)
                } else {
                    commit(mTypes.setLqConcernState, data)
                }
            }
        } catch (e) {
            if (e.code === '102') {
                commit(mTypes.setLogin, false)
                // platform.login()
            }
        }
    },
    async doConcern ({commit, state}, {vtype, fid, tab, expect = ''}) {
        try {
            if (vtype === '1') {
                const isfocus = state.zq.concernState[fid] ? state.zq.concernState[fid].isfocus : '0'
                let op = isfocus === '1' ? 'unset' : 'set'
                await ajax.get(`/score/concern/focus?fid=${fid}&vtype=${vtype}&op=${op}&expect=${expect}`, {ignore: false})
                const concernState = {...state.zq.concernState}
                concernState[fid] = {...concernState[fid]}
                concernState[fid].isfocus = isfocus === '1' ? '0' : '1'
                commit(mTypes.setZqConcernState, concernState)
            } else {
                const isfocus = state.lq.concernState[fid] ? state.lq.concernState[fid].isfocus : '0'
                let op = isfocus === '1' ? 'unset' : 'set'
                await ajax.get(`/score/concern/focus?fid=${fid}&vtype=${vtype}&op=${op}&expect=${expect}`, {ignore: false})
                const concernState = {...state.lq.concernState}
                concernState[fid] = {...concernState[fid]}
                concernState[fid].isfocus = isfocus === '1' ? '0' : '1'
                commit(mTypes.setLqConcernState, concernState)
            }
        } catch (e) {
            if (e.code === '102') {
                commit(mTypes.setLogin, false)
                // platform.login()
            }
        }
    },
    async fetchZqMatches ({commit}, {expect, tab}) {
        let url = `/score/zq/info?vtype=${tab}&expect=${expect === 'cur' ? '' : expect}&_t=${Date.now()}`
        const matchesInfo = await ajax.get(url)
        let existNotStartMatch = false // 存在未开始比赛标志
        matchesInfo.matches.some(match => {
            if (match.status < 4) {
                match._flag = true
                return true
            }
        })
        existNotStartMatch = matchesInfo.matches.some(match => {
            return match.status === '0'
        })
        commit(mTypes.setSwitchShow, existNotStartMatch)
        matchesInfo._expect = expect
        matchesInfo.tab = tab
        commit(mTypes.setZqMatches, matchesInfo)
        return matchesInfo
    },
    async getMyState ({commit}, {vtype = '1', lottery = 'jczq'}) {
        const myState = await ajax.get(`/score/concern/state?vtype=${vtype}&lottery=${lottery}`)
        const tmp = {}
        if (myState.length) {
            myState.forEach((stat) => {
                tmp[stat.fid] = stat
            })
        }
        commit(mTypes.setMyState, myState)
    },

    async getZqMetro ({commit}) {
        const metro = await ajax.get('/library/aggregate/metro')
        commit(mTypes.setZqMetro, metro)
        return metro
    },
    async fetchLqMatches ({commit}, {expect, tab}) {
        const matchesInfo = await ajax.get(`/score/lq/info?vtype=${tab}&expect=${expect === 'cur' ? '' : expect}&_t=${Date.now()}`)
        let existNotStartMatch = false // 存在未开始比赛标志
        matchesInfo.matches.some(match => {
            if ((match.status - 0) < 4) {
                match._flag = true
                return true
            }
        })
        existNotStartMatch = matchesInfo.matches.some(match => {
            return match.status === '1'
        })
        commit(mTypes.setSwitchShow, existNotStartMatch)
        matchesInfo._expect = expect
        matchesInfo.tab = tab
        commit(mTypes.setLqMatches, matchesInfo)
        return matchesInfo
    }
}, ns)

const mutationsInfo = mapMutations({
    setZqConcern (state, matches) {
        state.zq.concern = matches
    },
    setLqConcern (state, matches) {
        state.lq.concern = matches
    },
    setZqConcernState (state, data) {
        state.zq.concernState = data
    },
    setLqConcernState (state, data) {
        state.lq.concernState = data
    },
    setLogin (state, hasLogin) {
        state.hasLogin = hasLogin
    },
    setView (state, view) {
        state.view = view
    },
    setMyState (state, myState) {
        state.myState = myState
    },
    setZqMatches (state, data) {
        let {curr_expect, expect_list, matches, tab} = data
        state.zq.tab = tab
        // eslint-disable-next-line
        state.zq.expectList = expect_list
        // eslint-disable-next-line
        state.zq.curExpect = curr_expect
        state.zq.matches = matches
    },
    setZqMetro (state, metro) {
        state.zq.metro = metro
    },
    updateZqMatch (state, {info, idx}) {
        let match = {...state.zq.matches[idx], ...info}
        state.zq.matches.splice(idx, 1, match)
    },
    updateLqMatch (state, {info, idx}) {
        let match = {...state.lq.matches[idx], ...info}
        state.lq.matches.splice(idx, 1, match)
    },
    setLqMatches (state, data) {
        let {curr_expect, expect_list, matches, tab} = data
        state.lq.tab = tab
        // eslint-disable-next-line
        state.lq.expectList = expect_list
        // eslint-disable-next-line
        state.lq.curExpect = curr_expect
        state.lq.matches = matches
    },
    setSwitchShow (state, switchShow) {
        state.switchShow = switchShow
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state, actions, mutations}
