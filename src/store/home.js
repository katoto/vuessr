/**
 * Created by sampson on 2017/5/10.
 */
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
import {pushEvents} from '~common/constants'
const ns = 'home'
const state = {
    filter: {
        filterTime: 0,
        show: false, // 控制筛选对话框显示与隐藏
        matches: null, // 当前所有比赛
        init: null,  // 初始化选项
        onOk: () => {  // 点击确认回调
        },
        onCancel: () => { // 点击取消回调
        }
    },
    zq: {
        tab: 'jczq',
        matches: null,
        expectList: null,
        curExpect: null,
        mymatch: null,
        state: {
            bjdc: null,
            jczq: null
        }
    },
    lq: {
        jclq: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        }
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
    async fetchZqMatches ({commit}, {expect, tab}) {
        let url = ``
        if (tab === 'jczq' || tab === 'bjdc' || tab === 'all' || tab === 'sfc') {
            url = `/score/zq/info?vtype=${tab}&expect=${expect === 'cur' ? '' : expect}&_t=${Date.now()}`
        } else if (tab === 'hot') {
            url = `/score/zq/hot?expect=${expect === 'cur' ? '' : expect}&_t=${Date.now()}`
        }
        const matchesInfo = await ajax.get(url)
        matchesInfo.matches.some(match => {
            if (match.status < 4) {
                match._flag = true
                return true
            }
        })
        matchesInfo._expect = expect
        matchesInfo.tab = tab
        commit(mTypes.setZqMatches, matchesInfo)
        return matchesInfo
    },

    async fetchLqMatches ({commit}, {expect, tab}) {
        let url = ``
        if (tab === 'jclq' || tab === 'all') {
            url = `/score/lq/info?vtype=${tab}&expect=${expect === 'cur' ? '' : expect}&_t=${Date.now()}`
        } else if (tab === 'hot') {
            url = `/score/zq/hot?expect=${expect === 'cur' ? '' : expect}&_t=${Date.now()}`
        }
        const matchesInfo = await ajax.get(url)
        matchesInfo.matches.some(match => {
            if (match.status < 4) {
                match._flag = true
                return true
            }
        })
        matchesInfo._expect = expect
        matchesInfo.tab = tab
        commit(mTypes.setLqMatches, matchesInfo)
        return matchesInfo
    },
    startFilter ({commit}, {matches, inited, onOk, onCancel}) {
        commit(mTypes.initFilter, {matches, inited, onOk, onCancel})
    },
    finishFilter ({commit}) {
        commit(mTypes.endFilter)
    }
}, ns)

const mutationsInfo = mapMutations({
    filterTime (state) { // 用户点击帅选的时候 触发
        state.filter.filterTime = Date.now()
    },
    initFilter (state, {matches, inited, onOk, onCancel}) {
        state.filter.matches = matches
        state.filter.show = true
        state.filter.inited = inited
        state.filter.onOk = onOk || (() => {})
        state.filter.onCancel = onCancel || (() => {})
    },
    endFilter (state) {
        state.filter.matches = null
        state.filter.show = false
        state.filter.begin = false
        state.filter.inited = null
        state.filter.onOk = () => {}
        state.filter.onCancel = () => {}
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
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state, actions, mutations}
