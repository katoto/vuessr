/**
 * Created by sampson on 2017/5/27.
 */
/**
 * Created by sampson on 2017/5/10.
 */
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
const ns = 'zqdetail'
const initState = {
    reachEndTime: 0,  // 滚动到最后触发的时间戳
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
    situation: {
        eventlist: null,
        statistic: null,
        newsList: null
    },
    odds: {
        europe: null,
        asian: null,
        bifa: null,
        rangqiu: null,
        daxiaopan: null
    },

    predict: {
        europe: null,
        asian: null,
        daxiaoqiu: null,
        score: null,
        half: null
    },
    comment: {
        eventlist: null,
        statistic: null,
        online: null,
        total: null,
        vote: null,
        replyName: null,
        commentReplyId: null,
        showEditor: false,
        replyTime: 0 // 发表后服务端返回后时间戳
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
    async getSituation ({commit}, {fid, homeid, awayid, status, matchtime, leagueid}) {
        let [{eventlist, statistic}, {news}] = await Promise.all([
            ajax.get(`/score/zq/events_statistics?fid=${fid}`),
            ajax.get(`/library/sports/news?homeid=${homeid}&awayid=${awayid}&status=${status}&matchtime=${matchtime}&vtype=1&leagueid=${leagueid}&limit=20`)
        ])
        commit(mTypes.setSituation, {eventlist, statistic, news})
        return {eventlist, statistic, news}
    },

    async getEventAndStatistics ({commit}, {fid}) {
        let {eventlist, statistic} = await ajax.get(`/score/zq/events_statistics?fid=${fid}`)
        commit(mTypes.setEventAndStatistics, {eventlist, statistic})
        return {eventlist, statistic}
    },

    async getTotal ({commit}, {fid}) {
        let {online, total} = await ajax.get(`/sns/score/total?vtype=1&fid=${fid}`)
        commit(mTypes.setTotal, {online, total})
        return {online, total}
    },
    async getVote ({commit}, {fid}) {
        let {votelist} = await ajax.get(`/sns/score/votelist?vtype=1&fid=${fid}`)
        commit(mTypes.setVote, votelist[0])
        return votelist[0]
    },
    async getOddsEurope ({commit}, fid) {
        const europe = await ajax.get(`/score/zq/europe?fid=${fid}`)
        commit(mTypes.setOddsEurope, europe)
        return europe
    },
    async getOddsAsian ({commit}, fid) {
        const asian = await ajax.get(`/score/zq/asianodds?fid=${fid}`)
        commit(mTypes.setOddsAsian, asian)
        return asian
    },
    async getOddsRq ({commit}, fid) {
        const rangqiu = await ajax.get(`/score/zq/rangqiu?fid=${fid}`)
        commit(mTypes.setOddsRq, rangqiu)
        return rangqiu
    },
    async getOddsDxp ({commit}, fid) {
        const daxiaopan = await ajax.get(`/score/zq/daxiaoqiu?fid=${fid}`)
        commit(mTypes.setOddsDxp, daxiaopan)
        return daxiaopan
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
            ajax.get(`/score/zq/sameasian?fid=${fid}&cid=${cid}&s1=${s1}&s2=${s2}&cp=${cp}&league_id=${leagueid}&date=${date}`),
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
    async getAnalysisZj ({commit}, {homeid, awayid, matchdate, matchgroup, stid, fid, rleagueid, rlimit, rhoa, jzleagueid, jzlimit, jzhoa}) {
        let result = await Promise.all([
            ajax.get(`/score/zq/leaguerank?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&stid=${stid}&fid=${fid}`),
            ajax.get(`/score/zq/cuprank?matchgroup=${matchgroup}&matchdate=${matchdate}&stid=${stid}`),
            ajax.get(`/score/zq/recent_record?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&leagueid=${rleagueid}&stid=${stid}&limit=${rlimit}&hoa=${rhoa}`),
            ajax.get(`/score/zq/macau_news?fid=${fid}`),
            ajax.get(`/score/zq/fifarank?homeid=${homeid}&awayid=${awayid}`),
            ajax.get(`/score/zq/future_match?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&fid=${fid}`),
            ajax.get(`/score/zq/jz_data?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&leagueid=${jzleagueid}&limit=${jzlimit}&hoa=${jzhoa}`)
        ])
        const [leaguerank, cuprank, recentRecord, macauNews, fifarank, futureMatch, jzdata] = result
        commit(mTypes.setAnalysisZj, {leaguerank, cuprank, recentRecord, macauNews, fifarank, futureMatch, jzdata})
        return {leaguerank, cuprank, recentRecord, macauNews, fifarank, futureMatch, jzdata}
    },

    async getAnalysisZjHis ({commit}, {homeid, awayid, matchdate, jzleagueid, jzlimit, jzhoa}) {
        let jzdata = await ajax.get(`/score/zq/jz_data?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&leagueid=${jzleagueid}&limit=${jzlimit}&hoa=${jzhoa}`)
        commit(mTypes.setAnalysisZjHis, jzdata)
        return jzdata
    },
    async getAnalysisZjR ({commit}, {homeid, awayid, matchdate, stid, rleagueid, rlimit, rhoa}) {
        let recentRecord = await ajax.get(`/score/zq/recent_record?homeid=${homeid}&awayid=${awayid}&matchdate=${matchdate}&stid=${stid}&leagueid=${rleagueid}&limit=${rlimit}&hoa=${rhoa}`)
        commit(mTypes.setAnalysisZjR, recentRecord)
        return recentRecord
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
        // const [europe, asian, daxiaoqiu, score, half] = result.map(item => Object.keys(item).length ? item : null)
        const [europe, asian, daxiaoqiu, score, half] = result
        commit(mTypes.setPredict, {europe, asian, daxiaoqiu, score, half})
    },
    async getCommentList ({commit}, {type, fid, pageNo, tab, pageSize = 10}) {
        return ajax.get(`/sns/score/commentlist?vtype=${type}&fid=${fid}&pn=${pageNo}&tab=${tab}&rn=${pageSize}&_t=` + new Date().getTime())
    },
    onLike (ignore, {status, id}) {
        return ajax.post(`/sns/score/like?_t=${Date.now()}`, {
            status, id
        })
    },
    async onVote (ignore, {opt, id, vtype = '1', fid}) {
        return ajax.post(`/sns/score/vote?_t=${Date.now()}`, {
            opt,
            id,
            fid,
            vtype
        })
    },
    async sendComment ({commit}, {vtype = '1', fid, parentid, content, isShare = false}) {
        console.log({
            vtype,
            id: fid,
            parentid,
            ctx: content
        })
        if (parentid) {
            await ajax.post(`/sns/score/reply?_t=${Date.now()}`, {
                vtype,
                id: fid,
                parentid,
                ctx: content
            })
        } else {
            await ajax.post(`/sns/score/commit?_t=${Date.now()}`, {
                vtype,
                id: fid,
                isshare: isShare ? '1' : '0',
                ctx: content
            })
        }

        commit(mTypes.updateReplyTime)
    },
    async getCustomOdds (ignore, {ptype}) {
        return ajax.get(`/score/concern/settings?vtype=1&ptype=${ptype}&_t=${Date.now()}`)
    },
    async updateCustomOdds (ignore, {ptype, items}) {
        return ajax.get(`/score/concern/customize?vtype=1&ptype=${ptype}&item=${items.join(',')}&_t=${Date.now()}`, {ignore: false})
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
    updateReachEndTime (state) {
        state.reachEndTime = Date.now()
    },
    setBaseInfo (state, baseInfo) {
        state.baseInfo = baseInfo
    },
    setSituation (state, {eventlist, statistic, news}) {
        state.situation.eventlist = eventlist
        state.situation.statistic = statistic
        news && (state.situation.news = news)
    },
    setEventAndStatistics (state, {eventlist, statistic}) {
        state.comment.eventlist = eventlist
        state.comment.statistic = statistic
    },
    setVote (state, vote) {
        state.comment.vote = vote
    },
    setTotal (state, {online, total}) {
        state.comment.online = online
        state.comment.total = total
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
    setOddsAsian (state, asian) {
        state.odds.asian = asian
    },
    setOddsRq (state, rangqiu) {
        state.odds.rangqiu = rangqiu
    },
    setOddsDxp (state, daxiaopan) {
        state.odds.daxiaopan = daxiaopan
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
    setAnalysisZjHis (state, jzdata) {
        state.analysis.zj.jzdata = jzdata
    },
    setAnalysisZjR (state, recentRecord) {
        state.analysis.zj.recentRecord = recentRecord
    },
    setAnalysisJs (state, {strength, compare}) {
        state.analysis.js.strength = strength
        state.analysis.js.compare = compare
    },
    setAnalysisPm (state, {poisson, avrodds, handicapFeature, tzbl, coldHot}) {
        state.analysis.pm.poisson = poisson || {}
        state.analysis.pm.avrodds = avrodds || {}
        state.analysis.pm.handicapFeature = handicapFeature || {}
        state.analysis.pm.tzbl = tzbl || {}
        state.analysis.pm.coldHot = coldHot || {}
    },
    setAnalysisZr (state, {teamworth, formation, lineup}) {
        state.analysis.zr.teamworth = teamworth
        state.analysis.zr.formation = formation
        state.analysis.zr.lineup = lineup
    },
    showEditorDialog (state, {replyName, commentReplyId}) {
        state.comment.showEditor = true
        state.comment.replyName = replyName
        state.comment.commentReplyId = commentReplyId
    },
    updateReplyTime (state) {
        state.comment.replyTime = Date.now()
    },
    hideEditorDialog (state) {
        state.comment.showEditor = false
        state.comment.replyName = null
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
