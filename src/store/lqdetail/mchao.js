import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
const ns = 'lqdetail/mchao'
const initState = {
    reachEndTime: 0,  // 滚动到最后触发的时间戳
    scTime: 0, // 触发滚动更新时间戳
    baseinfo: null,
    analysis: {
        zj: {
            nbarank: null,
            leaguerank: null,
            jz_data: null,
            recent_record: null,
            future_match: null,
            macau_news: null
        },
        js: {
            strength: null,
            trend: {
                1: null,
                2: null
            },
            stats: null
        },
        zr: {
            members: null,
            best3: null
        },
        jj: {
            team_misc: null,
            members_advanced: null
        }
    },
    comment: {
        eventlist: null,
        statistic: null,
        online: null,
        total: null,
        vote: null
    },
    outer: {
        component: null,
        params: null
    }
}
const actionsInfo = mapActions({
    async getBaseInfo ({commit}, fid) {
        const baseinfo = await ajax.get(`/score/lq/baseinfo?fid=${fid}`)
        commit(mTypes.setBaseInfo, baseinfo)
        return baseinfo
    },
    async getAnalysisZj ({commit}, {fid, homeid, awayid, seasonid, stageid, matchid, matchdate, group, stagemode}) {
        let result = await Promise.all([
            ajax.get(`/score/lq/nbarank?homeid=${homeid}&awayid=${awayid}&seasonid=${seasonid}&T=${Date.now()}`),
            ajax.get(`/score/lq/leaguerank?fid=${fid}&stageid=${stageid}&homeid=${homeid}&awayid=${awayid}&matchid=${matchid}&matchdate=${matchdate}&group=${group}&stagemode=${stagemode}&T=${Date.now()}`),
            ajax.get(`/score/lq/jz_data?fid=${fid}&stageid=${stageid}&homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&T=${Date.now()}`),
            ajax.get(`/score/lq/recent_record?fid=${fid}&stageid=${stageid}&homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&T=${Date.now()}`),
            ajax.get(`/score/lq/future_match?fid=${fid}&homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&T=${Date.now()}`),
            ajax.get(`/score/lq/macau_news?fid=${fid}`)
        ])
        const [nbarank, leaguerank, jz_data, recent_record, future_match, macau_news] = result
        commit(mTypes.setAnalysisZj, {nbarank, leaguerank, jz_data, recent_record, future_match, macau_news})
        return {nbarank, leaguerank, jz_data, recent_record, future_match, macau_news}
    },
    async getAnalysisJs ({commit}, {fid, seasonid, homeid, awayid, matchdate}) {
        let result = await Promise.all([
            ajax.get(`/score/lq/strength?fid=${fid}&seasonid=${seasonid}&homeid=${homeid}&awayid=${awayid}&T=${Date.now()}`),
            ajax.get(`/score/lq/trend?fid=${fid}&homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&vtype=1&T=${Date.now()}`),
            ajax.get(`/score/lq/stats?seasonid=${seasonid}&homeid=${homeid}&awayid=${awayid}&T=${Date.now()}`)
        ])
        const [strength, trend, stats] = result
        commit(mTypes.setAnalysisJs, {strength, trend, stats})
    },
    async getAnalysisJsTrend ({commit}, {fid, homeid, awayid, matchdate, vtype}) {
        let trend = await ajax.get(`/score/lq/trend?fid=${fid}&homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&vtype=${vtype}&T=${Date.now()}`)
        commit(mTypes.setAnalysisJsTrend, {trend, vtype})
        return trend
    },
    async getAnalysisZr ({commit}, {homeid, awayid, seasonid, vtype}) {
        let result = await Promise.all([
            ajax.get(`/score/lq/best3?homeid=${homeid}&awayid=${awayid}&seasonid=${seasonid}&T=${Date.now()}`),
            ajax.get(`/score/lq/members?homeid=${homeid}&awayid=${awayid}&seasonid=${seasonid}&vtype=${vtype}&T=${Date.now()}`)
        ])
        const [best3, members] = result
        commit(mTypes.setAnalysisZr, {best3, members})
    },
    async getAnalysisZrMembers ({commit}, {homeid, awayid, seasonid, vtype, hoa}) {
        let members = await ajax.get(`/score/lq/members?homeid=${homeid}&awayid=${awayid}&seasonid=${seasonid}&vtype=${vtype}&T=${Date.now()}`)
        commit(mTypes.setAnalysisZrMembers, {members, hoa})
    },
    async getAnalysisJj ({commit}, {homeid, awayid, seasonid}) {
        let result = await Promise.all([
            ajax.get(`/score/lq/members_advanced?homeid=${homeid}&awayid=${awayid}&seasonid=${seasonid}&T=${Date.now()}`),
            ajax.get(`/score/lq/team_misc?homeid=${homeid}&awayid=${awayid}&seasonid=${seasonid}&T=${Date.now()}`)
        ])
        const [members_advanced, team_misc] = result
        commit(mTypes.setAnalysisJj, {members_advanced, team_misc})
    },
    async getCommentList ({commit}, {type, fid, pageNo, tab, pageSize = 10}) {
        let result = await ajax.get(`/sns/score/commentlist?vtype=${type}&fid=${fid}&pn=${pageNo}&tab=${tab}&rn=${pageSize}&_t=` + new Date().getTime())
        return result
    }

}, ns)

const mutationsInfo = mapMutations({
    setDialog (state, {component, params = null}) {
        state.outer.component = component
        state.outer.params = params
    },
    updateScTime (state) {
        state.scTime = Date.now()
    },
    updateReachEndTime (state) {
        state.reachEndTime = Date.now()
    },
    setBaseInfo (state, baseinfo) {
        state.baseinfo = baseinfo
    },
    setAnalysisZj (state, {nbarank, leaguerank, jz_data, recent_record, future_match, macau_news}) {
        state.analysis.zj.leaguerank = leaguerank
        state.analysis.zj.nbarank = nbarank
        state.analysis.zj.jz_data = jz_data
        state.analysis.zj.recent_record = recent_record
        state.analysis.zj.future_match = future_match
        state.analysis.zj.macau_news = macau_news
    },
    setAnalysisJs (state, {strength, trend, stats}) {
        state.analysis.js.strength = strength
        state.analysis.js.trend['1'] = trend
        state.analysis.js.stats = stats
    },
    setAnalysisJsTrend(state, {trend, vtype}) {
        state.analysis.js.trend[vtype] = trend
    },
    setAnalysisZr (state, {best3, members}) {
        state.analysis.zr.best3 = best3
        state.analysis.zr.members = members
    },
    setAnalysisZrMembers(state, {members, hoa}) {
        state.analysis.zr.members[hoa] = members[hoa]
    },
    setAnalysisJj (state, {members_advanced, team_misc}) {
        state.analysis.jj.members_advanced = members_advanced
        state.analysis.jj.team_misc = team_misc
    },
    reset (state) {
        const iState = JSON.parse(JSON.stringify(initState))
        Object.keys(state).forEach(key => {
            state[key] = iState[key]
        })
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
