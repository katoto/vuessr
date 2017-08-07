/**
 * Created by guxiaojuan on 2017/7/31.
 */
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'

const ns = 'center'
const initState = {
    lqhot: null,
    zqhot: null,
    lqAll: {
        europe: null,
        asian: null,
        america: null,
        cups: null
    },
    zqAll: {
        europe: {
            cups: null,
            leagues: null
        },
        asian: {
            cups: null,
            leagues: null
        },
        america: {
            cups: null,
            leagues: null
        },
        africa: {
            cups: null,
            leagues: null
        },
        inte: {
            cups: null,
            leagues: null
        }
    },
    basketballMatch: {
        head: null,
        rank: null,
        schedule: null,
        statistics: null
    },
    footballMatch: {
        head: null,
        schedule: null,
        integral: null,
        statistics: null
    },
    outer: {
        component: null,   // 组件名
        params: null       // 所传递的参数
    }
}
const actionsInfo = mapActions({
    async getBasketHead ({commit}, {seasonid}) {
        let baseInfo = await ajax.get(`library/lq/baseinfo?seasonid=${id}&T=${new Date().getTime()}`)
        commit(mTypes.setBasketHead, baseInfo)
        return baseInfo
    },
    async getBasketballHot ({commit}) {
        let baskethot = await ajax.get(`/library/lq/leagues?areaid=0&T=${new Date().getTime()}`)
        commit(mTypes.setBasketballHot, baskethot)
        return baskethot
    },
    async getFootballHot ({commit}) {
        let foothot = await ajax.get(`/library/zq/leagues?areaid=0&T=${new Date().getTime()}`)
        commit(mTypes.setFootballHot, foothot)
        return foothot
    },
    async getBasketballAll ({commit}, {areaid}) {
        let lqAll = await ajax.get(`/library/lq/leagues?areaid=${areaid}&T=${new Date().getTime()}`)
        switch (areaid) {
        case 1: {
            commit(mTypes.setBasketballEurope, lqAll)
            // console.log(areaid)
            break
        }
        case 2: {
            commit(mTypes.setBasketballAsian, lqAll)
            break
        }
        case 3: {
            commit(mTypes.setBasketballAmerica, lqAll)
            break
        }
        case 5: {
            commit(mTypes.setBasketballCups, lqAll)
            break
        }
        }

        return lqAll
    },
    async getFootballAll ({commit}, {vtype, areaid}) {
        let [{cups}, {leagues}] = await Promise.all([
            ajax.get(`/library/zq/cups?areaid=${vtype}&T=${new Date().getTime()}`),
            ajax.get(`/library/zq/leagues?areaid=${vtype}&T=${new Date().getTime()}`)
        ])
        commit(mTypes.setFootballEurope, {cups, leagues})
        return {cups, leagues}
    },
    async getBasketballMatchRank ({commit}, {seasonid}) {
        let rank = await ajax.get(`/library/lq/rank?T=${new Date().getTime()}&seasonid=${seasonid}&iscup=0`)
        commit(mTypes.setBasketballMatchRank, rank)
        return rank
    },
    async getBasketballMatchSchedule ({commit}, {seasonid}) {
        let schedule = await ajax.get(`library/lq/progress?seasonid=${seasonid}&T=${new Date().getTime()}`)
        commit(mTypes.setBasketballMatchSchedule, schedule)
        return schedule
    },
    async getBasketballMatchStatistics ({commit}, {seasonid, key}) {
        let statistics = await ajax.get(`library/lq/statistic?T=${new Date().getTime()}&seasonid=${seasonid}&key=${key}`)
        commit(mTypes.setBasketballMatchStatistics, statistics)
        return statistics
    }

}, ns)
const mutationsInfo = mapMutations({
    setBasketballHot (state, lqhot) {
        state.lqhot = lqhot
    },
    setFootballHot (state, zqhot) {
        state.zqhot = zqhot
    },
    setBasketballEurope (state, europe) {
        state.lqAll.europe = europe
    },
    setBasketballAsian (state, asian) {
        state.lqAll.asian = asian
    },
    setBasketballAmerica (state, america) {
        state.lqAll.america = america
    },
    setBasketballCups (state, cups) {
        state.lqAll.cups = cups
    },
    setFootballEurope (state, {cups, leagues}) {
        state.zqAll.europe.cups = cups
        state.zqAll.europe.leagues = leagues
    },
    setBasketHead (state, head) {
        state.basketballMatch.head = head
    },
    setBasketballMatchRank (state, rank) {
        state.basketballMatch.rank = rank
    },
    setBasketballMatchSchedule (state, schedule) {
        state.basketballMatch.schedule = schedule
    },
    setBasketballMatchStatistics (state, statistics) {
        state.basketballMatch.statistics = statistics
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
