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
    outer: {
        component: null,   // 组件名
        params: null       // 所传递的参数
    }
}
const actionsInfo = mapActions({
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
            console.log(areaid)
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
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
