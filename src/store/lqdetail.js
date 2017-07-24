import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
const name = 'lqdetail'

const initState={
    reachEndTime: 0,  // 滚动到最后触发的时间戳
    scTime: 0, // 触发滚动更新时间戳
    baseInfo:null,
    situation: {
        eventlist: null,
        statistic: null,
    },
    outer: {
        component: null,
        params: null
    }
};
const actionsInfo=mapActions({
    async getBaseInfo ({commit}, fid) {
        const baseInfo = await ajax.get(`/score/lq/baseinfo?fid=${fid}`)
        commit(mTypes.setBaseInfo, baseInfo)
        return baseInfo
    },
    async getSituation({commit},{fid}){
        let [eventlist,statistic]=await Promise.all([
            ajax.get(`/score/lq/events?fid=${fid}`),
            ajax.get(`/score/lq/statistics?fid=${fid}`)
        ]);
        commit(mTypes.setSituation,{eventlist,statistic});
        return {eventlist,statistic};
    },
    reset (state) {
        const iState = JSON.parse(JSON.stringify(initState))
        Object.keys(state).forEach(key => {
            state[key] = iState[key]
        })
    }
},name);

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
    setSituation (state, {eventlist, statistic}) {
        state.situation.eventlist = eventlist
        state.situation.statistic = statistic
    },
},name);

const actions = actionsInfo.actions
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes
export default {state: JSON.parse(JSON.stringify(initState)), actions, mutations}

