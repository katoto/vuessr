import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
const name = 'lqdetail'

const initState = {
    reachEndTime: 0,  // 滚动到最后触发的时间戳
    scTime: 0, // 触发滚动更新时间戳
    baseInfo: null,
    situation: {
        eventlist: null,
        statistic: null
    },
    odds: {
        europe: null,
        handicap: null,
        points: null
    },
    outer: {
        component: null,
        params: null
    }
}
const actionsInfo = mapActions({
    async getBaseInfo ({commit}, fid) {
        const baseInfo = await ajax.get(`/score/lq/baseinfo?fid=${fid}`)
        commit(mTypes.setBaseInfo, baseInfo)
        return baseInfo
    },
    // async getSituation ({commit}, {fid}) {
    //     let [eventlist, statistic] = await Promise.all([
    //         ajax.get(`/score/lq/events?fid=${fid}`),
    //         ajax.get(`/score/lq/statistics?fid=${fid}`)
    //     ])
    //     commit(mTypes.setSituation, {eventlist, statistic})
    //     return {eventlist, statistic}
    // },
    async getSituationEvent ({commit}, {fid}) {
        const eventlist = await ajax.get(`/score/lq/events?fid=${fid}`)
        commit(mTypes.setSituationEvent, eventlist)
        return eventlist
    },
    async getSituationStatistic ({commit}, {fid}) {
        const statistic = await ajax.get(`/score/lq/statistics?fid=${fid}`)
        commit(mTypes.setSituationStatistic, statistic)
        return statistic
    },
    // async getOdds ({commit}, {fid}) {
    //     let [europe, handicap, points] = await Promise.all([
    //         ajax.get(`/score/lq/europe?fid=${fid}`),
    //         ajax.get(`/score/lq/handicap?fid=${fid}`),
    //         ajax.get(`/score/lq/points?fid=${fid}`)
    //     ])
    //     commit(mTypes.setOdds, {europe, handicap, points})
    //     return {europe, handicap, points}
    // },
    async getOddsEurope ({commit}, {fid}) {
        const europe = await ajax.get(`/score/lq/europe?fid=${fid}`)
        commit(mTypes.setOddsEurope, europe)
        return europe
    },
    async getOddsHandicap ({commit}, {fid}) {
        const handicap = await ajax.get(`/score/lq/handicap?fid=${fid}`)
        commit(mTypes.setOddsHandicap,handicap)
        return handicap
    },
    async getOddsPoints ({commit}, {fid}) {
        const points = await ajax.get(`/score/lq/points?fid=${fid}`)
        commit(mTypes.setOddsPoints, points)
        return points
    },
    async getCustomOdds (ignore, {ptype}) {
        return ajax.get(`/score/concern/settings?vtype=2&ptype=${ptype}&_t=${Date.now()}`)
    },
    async updateCustomOdds (ignore, {ptype, items}) {
        return ajax.get(`/score/concern/customize?vtype=2&ptype=${ptype}&item=${items.join(',')}&_t=${Date.now()}`, {ignore: false})
    },
    async getOddsDetailEurope ({commit}, {fid, cid, date}) {
        return ajax.get(`/score/lq/oneodds?fid=${fid}&cid=${cid}&vtype=europe&round=1&matchdate=${date}`)
    },
    async getOddsDetailHandicap ({commit}, {fid, cid, date}) {
        return ajax.get(`/score/lq/oneodds?fid=${fid}&cid=${cid}&vtype=rangqiu&round=1&matchdate=${date}`)
    },
    async getOddsDetailPoints ({commit}, {fid, cid, date}) {
        return ajax.get(`/score/lq/oneodds?fid=${fid}&cid=${cid}&vtype=zongfen&round=1&matchdate=${date}`)
    },
    reset (state) {
        const iState = JSON.parse(JSON.stringify(initState))
        Object.keys(state).forEach(key => {
            state[key] = iState[key]
        })
    }
}, name)

const mutationsInfo = mapMutations({
    setDialog (state, {component, params}) {
        state.outer.component = component
        state.outer.params = params
    },
    updateScTime (state) {
        state.scTime = Date.now()
    },
    updateReachEndTime (state) {
        state.reachEndTime = Date.now()
    },
    setBaseInfo (state, baseInfo) {
        state.baseInfo = baseInfo
    },
    setSituationEvent (state, eventlist) {
        state.situation.eventlist = eventlist
    },
    setSituationStatistic (state, statistic) {
        state.situation.statistic = statistic
    },
    setOddsEurope (state, europe) {
        state.odds.europe = europe

    },
    setOddsHandicap (state, handicap) {
        state.odds.handicap = handicap
    },
    setOddsPoints (state, points) {
        state.odds.points = points
    }
}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
