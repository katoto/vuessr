
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
import { pushEvents } from '~common/constants'
import platform from '~common/platform'
const name = 'lqdetail'

const initState = {
    reachEndTime: 0, // 滚动到最后触发的时间戳
    scTime: 0, // 触发滚动更新时间戳
    baseInfo: null,
    situation: {
        eventlist: null,
        statistic: null,
        news: null
    },
    odds: {
        europe: null,
        handicap: null,
        points: null
    },
    analysis: {
        zj: {
            nbarank: null,
            leaguerank: null,
            jzData: null,
            recentRecord: null,
            futureMatch: null,
            macauNews: null
        },
        js: {
            strength: null,
            trend: {
                '1': null,
                '2': null
            },
            stats: null,
            vtype: '1'
        },
        zr: {
            members: null,
            best3: null
        },
        jj: {
            teamMisc: null,
            membersAdvanced: null
        }
    },
    comment: {
        commentlist: null,
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
    // zhichao

    subscribeInfo ({dispatch}, fidList) {
        if (!fidList || fidList.length < 1) {
            return
        }
        const infoList = fidList.map(fid => 'LIVE:BASKETBALL:INFO:' + fid)
        return dispatch('subscribe', {stamp: pushEvents.BASKETBALL_INFO, data: infoList})
    },
    subscribeEvent ({dispatch}, fidList) {
        if (!fidList || fidList.length < 1) {
            return
        }
        const eventList = fidList.map(fid => 'LIVE:BASKETBALL:EVENT:' + fid)
        return dispatch('subscribe', {stamp: pushEvents.BASKETBALL_EVENT, data: eventList})
    },
    async getBaseInfo ({commit}, fid) {
        const baseInfo = await ajax.get(`/score/lq/baseinfo?fid=${fid}`)
        commit(mTypes.setBaseInfo, baseInfo)
        return baseInfo
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
        const [nbarank, leaguerank, jzData, recentRecord, futureMatch, macauNews] = result
        commit(mTypes.setAnalysisZj, {nbarank, leaguerank, jzData, recentRecord, futureMatch, macauNews})
        return {nbarank, leaguerank, jzData, recentRecord, futureMatch, macauNews}
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
        const [membersAdvanced, teamMisc] = result
        commit(mTypes.setAnalysisJj, {membersAdvanced, teamMisc})
    },
    async getCommentList ({commit}, {vtype, fid, pageNo, tab, pageSize = 10}) {
        let result = await ajax.get(`/sns/score/commentlist?vtype=${vtype}&fid=${fid}&pn=${pageNo}&tab=${tab}&rn=${pageSize}&_t=` + new Date().getTime())
        return result
    },
    async getTotal ({commit}, {fid}) {
        let {online, total} = await ajax.get(`/sns/score/total?vtype=2&fid=${fid}`)
        commit(mTypes.setTotal, {online, total})
        return {online, total}
    },
    async getVote ({commit}, {fid}) {
        let {votelist} = await ajax.get(`/sns/score/votelist?vtype=2&fid=${fid}`)
        commit(mTypes.setVote, votelist[0])
        return votelist[0]
    },
    async onVote (ignore, {opt, vtype = '2', id, fid}) {
        console.log(opt)
        return ajax.post(`/sns/score/vote?_t=${Date.now()}`, {
            opt, id, fid, vtype
        })
    },
    onLike (ignore, {status, id}) {
        try {
            return ajax.post(`/sns/score/like?_t=${Date.now()}`, {
                status, id
            }, {ignore: false})
        } catch (e) {
            if (e.code === '102') {
                platform.login()
            }
        }
    },
    onReport (ignore, id) {
        try {
            return ajax.post(`/sns/score/report?_t=${Date.now()}`, {
                id
            }, {ignore: false})
        } catch (e) {
            if (e.code === '102') {
                platform.login()
            }
        }
    },
    async sendComment ({commit}, {vtype = '2', fid, parentid, content, isShare = false}) {
        try {
            if (parentid) {
                await ajax.post(`/sns/score/reply?_t=${Date.now()}`, {
                    vtype,
                    id: fid,
                    parentid,
                    ctx: content
                }, {ignore: false})
            } else {
                await ajax.post(`/sns/score/commit?_t=${Date.now()}`, {
                    vtype,
                    id: fid,
                    isshare: isShare ? '1' : '0',
                    ctx: content
                }, {ignore: false})
            }

            commit(mTypes.updateReplyTime)
        } catch (e) {
            if (e.code === '102') {
                platform.login()
            }
        }
    },
    async requestConcern ({commit, state}, {fid, expect}) {
        let origin = state.baseInfo.isfocus
        let op
        let statset
        if (origin === '0') {
            op = 'set'
            statset = '1'
        } else {
            op = 'unset'
            statset = '0'
        }

        try {
            await ajax.get(`/score/concern/focus?fid=${fid}&vtype=2&op=${op}&lotid=46&expect=${expect}`, {ignore: false})
            commit(mTypes.changeConcernStatus, statset)
        } catch (e) {
            if (e.code === '102') {
                platform.login()
            }
        }
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
    async getSituationNews ({commit}, {homeid, awayid, status, matchtime, leagueid}) {
        const news = await ajax.get(`/library/sports/news?homeid=${homeid}&awayid=${awayid}&status=${status}&matchtime=${matchtime}&vtype=2&leagueid=${leagueid}&limit=20`)
        commit(mTypes.setSituationNews, news)
        return news
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
        commit(mTypes.setOddsHandicap, handicap)
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
        try {
            return await ajax.get(`/score/concern/customize?vtype=2&ptype=${ptype}&item=${items.join(',')}&_t=${Date.now()}`, {ignore: false})
        } catch (e) {
            if (e.code === '102') {
                platform.login()
            }
            throw e
        }
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
    syncBaseInfo (state, baseInfo) {
        Object.assign(state.baseInfo, baseInfo)
    },
    setSituationEvent (state, eventlist) {
        state.situation.eventlist = eventlist
    },
    setSituationStatistic (state, statistic) {
        state.situation.statistic = statistic
    },
    setSituationNews (state, news) {
        state.situation.news = news
    },
    setOddsEurope (state, europe) {
        state.odds.europe = europe
    },
    setOddsHandicap (state, handicap) {
        state.odds.handicap = handicap
    },
    setOddsPoints (state, points) {
        state.odds.points = points
    },

    setAnalysisZj (state, {nbarank, leaguerank, jzData, recentRecord, futureMatch, macauNews}) {
        state.analysis.zj.leaguerank = leaguerank
        state.analysis.zj.nbarank = nbarank
        state.analysis.zj.jzData = jzData
        state.analysis.zj.recentRecord = recentRecord
        state.analysis.zj.futureMatch = futureMatch
        state.analysis.zj.macauNews = macauNews
    },
    setAnalysisJs (state, {strength, trend, stats}) {
        state.analysis.js.strength = strength
        state.analysis.js.trend['1'] = trend
        state.analysis.js.stats = stats
    },
    setAnalysisJsTrend (state, {trend, vtype}) {
        state.analysis.js.trend[vtype] = trend
    },
    setAnalysisZr (state, {best3, members}) {
        state.analysis.zr.best3 = best3
        state.analysis.zr.members = members
    },
    setAnalysisZrMembers (state, {members, hoa}) {
        state.analysis.zr.members[hoa] = members[hoa]
    },
    setAnalysisJj (state, {membersAdvanced, teamMisc}) {
        state.analysis.jj.membersAdvanced = membersAdvanced
        state.analysis.jj.teamMisc = teamMisc
    },
    setVote (state, vote) {
        state.comment.vote = vote
    },
    setTotal (state, {online, total}) {
        state.comment.online = online
        state.comment.total = total
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
    changeConcernStatus (state, status) {
        state.baseInfo.isfocus = status
    },
    setVtype (state, vtype) {
        state.analysis.js.vtype = vtype
    },
    reset (state) {
        const iState = JSON.parse(JSON.stringify(initState))
        Object.keys(state).forEach(key => {
            state[key] = iState[key]
        })
    }
}, name)

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}
