import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'

const ns = 'team/lq'
const state = {
    teamInfo: null,
    teamMatches: null,
    teamMembers: null
}

const actionsInfo = mapActions({
    async getTeamInfo ({commit}, {tid, sid}) {
        const teamInfo = await ajax.get(`/library/lq/teaminfo?teamid=${tid}&seasonid=${sid}`)
        commit(mTypes.setTeamInfo, teamInfo)
        return teamInfo
    },
    async getTeamMatches ({commit}, {tid, sid}) {
        const teamMatches = await ajax.get(`/library/lq/teammatches?teamid=${tid}&seasonid=${sid}`)
        commit(mTypes.setTeamMatches, teamMatches)
        return teamMatches
    },
    async getTeamMember ({commit}, {tid, sid}) {
        const teamMember = await ajax.get(`/library/lq/teammembers?teamid=${tid}&seasonid=${sid}`)
        commit(mTypes.setTeamMembers, teamMember)
        return teamMember
    }
}, ns)

const mutationsInfo = mapMutations({
    setTeamInfo (state, teamInfo) {
        state.teamInfo = teamInfo
    },
    setTeamMatches (state, teamMatches) {
        state.teamMatches = teamMatches
    },
    setTeamMembers (state, teamMembers) {
        state.teamMembers = teamMembers
    }
}, ns)
const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const mTypes = mutationsInfo.mTypes
export const aTypes = actionsInfo.aTypes

export default {state, mutations, actions}
