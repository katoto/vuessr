/**
 * Created by guxiaojuan on 2017/7/31.
 */
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'

const ns = 'center'
const initState = {
    lqhot: null,
    zqhot: null,
    lqAll: null,
    zqAll: {
        cups: null,
        leagues: null
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
        commit(mTypes.setBasketballAll, lqAll)
        return lqAll
    },
    async getFootballAll ({commit}, {vtype, areaid}) {
        let [{cups}, {leagues}] = await Promise.all([
            ajax.get(`/library/zq/cups?areaid=${vtype}&T=${new Date().getTime()}`),
            ajax.get(`/library/zq/leagues?areaid=${vtype}&T=${new Date().getTime()}`)
        ])
        commit(mTypes.setFootballAll, {cups, leagues})
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
    setBasketballAll (state, lqAll) {
        state.lqAll = lqAll
    },
    setFootballAll (state, {cups, leagues}) {
        state.cups = cups
        state.leagues = leagues
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
