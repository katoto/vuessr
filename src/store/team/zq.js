import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'

const ns = 'team/zq'
const state = {
    teamInfo: null,
    teamMatches: null,
    teamMembers: null
}

const actionsInfo = mapActions({
    async getTeamInfo ({commit}, tid) {
        const teamInfo = await ajax.get(`/library/zq/teaminfo?teamid=${tid}`)
        commit(mTypes.setTeamInfo, teamInfo)
        return teamInfo
    },
    async getTeamMatches ({commit}, tid) {
        const teamMatches = await ajax.get(`/library/zq/teammatches?teamid=${tid}`)
        commit(mTypes.setTeamMatches, teamMatches)
        return teamMatches
    },
    async getTeamMember ({commit}, tid) {
        const teamMember = await ajax.get(`/library/zq/teammembers?teamid=${tid}`)
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
