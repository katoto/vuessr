/**
 * Created by sampson on 2017/5/27.
 */
/**
 * Created by sampson on 2017/5/10.
 */
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
const ns = 'zqdetail'
const state = {
    scTime: 0, // 触发滚动更新时间戳
    analysis: {
        zj: {
            cuprank: null,
            jzdata: null,
            fifarank: null,
            futureMatch: null,
            macauNews: null,
            recentRecord: null,
            leaguerank: null
        },
        js: {
            strength: null,
            compare: null
        },
        pm: {
            poisson: null,
            avrodds: null,
            handicapFeature: null,
            tzbl: null,
            coldHot: null
        },
        zr: {
            teamworth: null,
            formation: null,
            lineup: null
        }
    },
    baseInfo: null,
    odds: {
        europe: null,
        bifa: null
    },

    predict: {
        europe: null,
        asian: null,
        daxiaoqiu: null,
        score: null,
        half: null
    },
    outer: {
        component: null,
        params: null
    }
}
const actionsInfo = mapActions({
    async getBaseInfo ({commit}, fid) {
        const baseInfo = await ajax.get(`/score/zq/baseinfo?fid=${fid}`)
        commit(mTypes.setBaseInfo, baseInfo)
        return baseInfo
    },
    async getOddsEurope ({commit}, fid) {
        const europe = await ajax.get(`/score/zq/europe?fid=${fid}`)
        commit(mTypes.setOddsEurope, europe)
        return europe
    },
    async getOddsBifa ({commit}, fid) {
        const bifa = await ajax.get(`/score/zq/spdex2?fid=${fid}`)
        commit(mTypes.setOddsBifa, bifa)
        return bifa
    },
    async getOddsDetailDaxiaoqiu ({commit}, {fid, cid, big, handi, small, leagueid, date}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/samedaxiaoqiu?fid=${fid}&cid=${cid}&big=${big}&handi=${handi}&small=${small}&league_id=${leagueid}&date=${date}`),
            ajax.get(`/score/zq/oneodds_daxiaoqiu?fid=${fid}&cid=${cid}&matchdate=${date}`)
        ])
        return result
    },
    async getOddsDetailEurope ({commit}, {fid, cid, win, draw, lost, leagueid, date}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/sameeurope?fid=${fid}&cid=${cid}&win=${win}&draw=${draw}&lost=${lost}&league_id=${leagueid}&date=${date}`),
            ajax.get(`/score/zq/oneodds?fid=${fid}&cid=${cid}&matchdate=${date}&vtype=europe`)
        ])
        return result
    },
    async getOddsDetailAsian ({commit}, {fid, cid, s1, s2, cp, leagueid, date}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/sameeurope?fid=${fid}&cid=${cid}&s1=${s1}&s2=${s2}&cp=${cp}&league_id=${leagueid}&date=${date}`),
            ajax.get(`/score/zq/oneodds_asian?fid=${fid}&cid=${cid}&matchdate=${date}`)
        ])
        return result
    },
    async getOddsDetailRq ({commit}, {fid, cid, win, draw, lost, leagueid, date, handicapline}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/sameeurope?fid=${fid}&cid=${cid}&win=${win}&draw=${draw}&lost=${lost}&league_id=${leagueid}&date=${date}&handicapline=${handicapline}`),
            ajax.get(`/score/zq/oneodds?fid=${fid}&cid=${cid}&matchdate=${date}&vtype=rangqiu&handicapline=${handicapline}`)
        ])
        return result
    },
    async getAnalysisZj ({commit}, {homeid, awayid, matchdate, matchgroup, stid, fid, leagueid, limit, hoa}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/leaguerank?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&stid=${stid}&fid=${fid}`),
            ajax.get(`/score/zq/cuprank?matchgroup=${matchgroup}&matchdate=${matchdate}&stid=${stid}`),
            ajax.get(`/score/zq/recent_record?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&leagueid=${leagueid}&stid=${stid}&limit=${limit}&hoa=${hoa}`),
            ajax.get(`/score/zq/macau_news?fid=${fid}`),
            ajax.get(`/score/zq/fifarank?homeid=${homeid}&awayid=${awayid}`),
            ajax.get(`/score/zq/future_match?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&fid=${fid}`),
            ajax.get(`/score/zq/jz_data?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&leagueid=${leagueid}&limit=${limit}&hoa=${hoa}`)
        ])
        const [leaguerank, cuprank, recentRecord, macauNews, fifarank, futureMatch, jzdata] = result
        commit(mTypes.setAnalysisZj, {leaguerank, cuprank, recentRecord, macauNews, fifarank, futureMatch, jzdata})
    },

    async getAnalysisJs ({commit}, {homeid, awayid, matchdate, stid, fid, leagueid}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/strength?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&stid=${stid}&fid=${fid}&leagueid=${leagueid}`),
            ajax.get(`/score/zq/compare?fid=${fid}&matchdate=${matchdate}&stid=${stid}&homeid=${homeid}&awayid=${awayid}`)
        ])
        const [strength, compare] = result
        commit(mTypes.setAnalysisJs, {strength, compare})
    },
    async getAnalysisPm ({commit}, {homeid, awayid, matchdate, stid, fid, leagueid}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/poisson?fid=${fid}`),
            ajax.get(`/score/zq/avrodds?matchdate=${matchdate}&fid=${fid}&leagueid=${leagueid}`),
            ajax.get(`/score/zq/handicap_feature?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&stid=${stid}&leagueid=${leagueid}`),
            ajax.get(`/score/zq/tzbl?fid=${fid}`),
            ajax.get(`/score/zq/cold_hot?fid=${fid}`)
        ])
        const [poisson, avrodds, handicapFeature, tzbl, coldHot] = result
        commit(mTypes.setAnalysisPm, {poisson, avrodds, handicapFeature, tzbl, coldHot})
    },
    async getAnalysisZr ({commit}, {homeid, awayid, fid}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/teamworth?fid=${fid}`),
            ajax.get(`/score/zq/formation?homeid=${homeid}&fid=${fid}&awayid=${awayid}`),
            ajax.get(`/score/zq/lineup?fid=${fid}`)
        ])
        const [teamworth, formation, lineup] = result
        commit(mTypes.setAnalysisZr, {teamworth, formation, lineup})
    },
    async getPredict ({commit}, fid) {
        let result = await Promise.all([
            ajax.get(`/score/zq/predict_europe?fid=${fid}`),
            ajax.get(`/score/zq/predict_asian?fid=${fid}`),
            ajax.get(`/score/zq/predict_daxiaoqiu?fid=${fid}`),
            ajax.get(`/score/zq/predict_score?fid=${fid}`),
            ajax.get(`/score/zq/predict_half?fid=${fid}`)
        ])
        const [europe, asian, daxiaoqiu, score, half] = result.map(item => Object.keys(item).length ? item : null)
        commit(mTypes.setPredict, {europe, asian, daxiaoqiu, score, half})
    }

}, ns)

const mutationsInfo = mapMutations({
    setDialog (state, {component, params}) {
        state.outer.component = component
        state.outer.params = params
    },
    updateScTime (state) {
        state.scTime = Date.now()
    },
    setBaseInfo (state, baseInfo) {
        state.baseInfo = baseInfo
    },
    setPredict (state, {europe, asian, daxiaoqiu, score, half}) {
        state.predict.europe = europe
        state.predict.asian = asian
        state.predict.daxiaoqiu = daxiaoqiu
        state.predict.score = score
        state.predict.half = half
    },
    setOddsEurope (state, europe) {
        state.odds.europe = europe
    },
    setOddsBifa (state, bifa) {
        state.odds.bifa = bifa
    },
    setAnalysisZj (state, {leaguerank, cuprank, recentRecord, macauNews, fifarank, futureMatch, jzdata}) {
        state.analysis.zj.leaguerank = leaguerank
        state.analysis.zj.cuprank = cuprank
        state.analysis.zj.recentRecord = recentRecord
        state.analysis.zj.macauNews = macauNews
        state.analysis.zj.fifarank = fifarank
        state.analysis.zj.futureMatch = futureMatch
        state.analysis.zj.jzdata = jzdata
    },
    setAnalysisJs (state, {strength, compare}) {
        state.analysis.js.strength = strength
        state.analysis.js.compare = compare
    },
    setAnalysisPm (state, {poisson, avrodds, handicapFeature, tzbl, coldHot}) {
        state.analysis.pm.poisson = poisson
        state.analysis.pm.avrodds = avrodds
        state.analysis.pm.handicapFeature = handicapFeature
        state.analysis.pm.tzbl = tzbl
        state.analysis.pm.coldHot = coldHot
    },
    setAnalysisZr (state, {teamworth, formation, lineup}) {
        state.analysis.zr.teamworth = teamworth
        state.analysis.zr.formation = formation
        state.analysis.zr.lineup = lineup
    }
}, ns)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state, actions, mutations}
