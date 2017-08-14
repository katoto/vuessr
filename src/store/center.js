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
        cups: null,
        leagues: null
    },

    basketballMatch: {
        head: null,
        rank: null,
        schedule: {
            basketchoice: null,
            basketschedule: null
        },
        statistics: null
    },
    footballMatch: {
        head: null,
        schedule: {
            footchoice: null,
            footschedule: null
        },
        integral: {
            all: null,
            home: null,
            away: null
        },
        statistics: null

    }
}
const actionsInfo = mapActions({
    async getBasketHead ({commit}, {seasonid}) {
        let baseInfo = await ajax.get(`library/lq/baseinfo?seasonid=${seasonid}&T=${new Date().getTime()}`)
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
    async getFootHead ({commit}, {seasonid}) {
        let baseInfo = await ajax.get(`library/zq/baseinfo?seasonid=${seasonid}&T=${new Date().getTime()}`)
        commit(mTypes.setFootHead, baseInfo)
        return baseInfo
    },
    async getFootballAll ({commit}, {vtype, areaid}) {
        let [cups, leagues] = await Promise.all([
            ajax.get(`/library/zq/cups?areaid=${vtype}&T=${new Date().getTime()}`),
            ajax.get(`/library/zq/leagues?areaid=${vtype}&T=${new Date().getTime()}`)
        ])
        commit(mTypes.setFootballAll, {cups, leagues})
        return {cups, leagues}
    },
    async getBasketballMatchRank ({commit}, {seasonid}) {
        let rank = await ajax.get(`/library/lq/rank?T=${new Date().getTime()}&seasonid=${seasonid}&iscup=0`)
        commit(mTypes.setBasketballMatchRank, rank)
        return rank
    },
    async getBasketballMatchScheduleChoice ({commit}, {seasonid}) {
        let basketballchoice = await ajax.get(`/library/lq/progress?seasonid=${seasonid}&T=${new Date().getTime()}`)
        commit(mTypes.setBasketballMatchScheduleChoice, basketballchoice)
        return basketballchoice
    },
    async getBasketballMatchSchedule ({commit}, {seasonid, stageid}) {
        let basketschedule = await ajax.get(`/library/lq/switch?t=${new Date().getTime()}&seasonid=${seasonid}&stageid=${encodeURIComponent(stageid)}`)
        commit(mTypes.setBasketballMatchSchedule, basketschedule)
        // console.log(basketschedule)
        return basketschedule
    },
    async getBasketballMatchStatistics ({commit}, {seasonid, key}) {
        let statistics = await ajax.get(`/library/lq/statistic?T=${new Date().getTime()}&seasonid=${seasonid}&key=${key}`)
        commit(mTypes.setBasketballMatchStatistics, statistics)
        return statistics
    },
    async getFootballIntegralAll ({commit}, {seasonid, iscup}) {
        let all = await ajax.get(`/library/zq/integrate?T=${new Date().getTime()}&seasonid=${seasonid}&iscup=${iscup}&vtype=all`)
        commit(mTypes.setFootballIntegralAll, all)
        return all
    },
    async getFootballIntegralHome ({commit}, {seasonid, iscup}) {
        let home = await ajax.get(`/library/zq/integrate?T=${new Date().getTime()}&seasonid=${seasonid}&iscup=${iscup}&vtype=home`)
        commit(mTypes.setFootballIntegralHome, home)
        return home
    },
    async getFootballIntegralAway ({commit}, {seasonid, iscup}) {
        let away = await ajax.get(`/library/zq/integrate?T=${new Date().getTime()}&seasonid=${seasonid}&iscup=${iscup}&vtype=away`)
        commit(mTypes.setFootballIntegralAway, away)
        return away
    },
    async getFootballMatchScheduleChoice ({commit}, {seasonid}) {
        let footballchoice = await ajax.get(`/library/zq/progress?seasonid=${seasonid}&T=${new Date().getTime()}`)
        commit(mTypes.setFootballMatchScheduleChoice, footballchoice)
        return footballchoice
    },
    async getFootballMatchSchedule ({commit}, {stageid, switchid, roundtype}) {
        let footschedule = await ajax.get(`/library/zq/switch?T=${new Date().getTime()}&stageid=${stageid}&switchid=${switchid}&roundtype=${roundtype}`)
        commit(mTypes.setFootballMatchSchedule, footschedule)
        // console.log(basketschedule)
        return footschedule
    },
    async getFootballMatchStatistics ({commit}, {seasonid}) {
        let statistics = await ajax.get(`/library/zq/statistic?T=${new Date().getTime()}&seasonid=${seasonid}`)
        commit(mTypes.setFootballMatchStatistics, statistics)
        console.log(statistics)
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
    setBasketHead (state, head) {
        state.basketballMatch.head = head
    },
    setBasketballMatchRank (state, rank) {
        state.basketballMatch.rank = rank
    },
    setBasketballMatchSchedule (state, basketschedule) {
        state.basketballMatch.schedule.basketschedule = basketschedule
    },
    setBasketballMatchScheduleChoice (state, basketchoice) {
        state.basketballMatch.schedule.basketchoice = basketchoice
    },
    setBasketballMatchStatistics (state, statistics) {
        state.basketballMatch.statistics = statistics
    },
    setFootballAll (state, {cups, leagues}) {
        state.zqAll.cups = cups
        state.zqAll.leagues = leagues
    },
    setFootHead (state, head) {
        state.footballMatch.head = head
    },
    setFootballIntegralAll (state, all) {
        state.footballMatch.integral.all = all
    },
    setFootballIntegralHome (state, home) {
        state.footballMatch.integral.home = home
    },
    setFootballIntegralAway (state, away) {
        state.footballMatch.integral.away = away
    },
    setFootballMatchScheduleChoice (state, footchoice) {
        state.footballMatch.schedule.footchoice = footchoice
    },
    setFootballMatchSchedule (state, footschedule) {
        state.footballMatch.schedule.footschedule = footschedule
    },
    setFootballMatchStatistics (state, statistics) {
        state.footballMatch.statistics = statistics
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
