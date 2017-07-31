
import ajax from '~common/ajax'
import {mapActions, mapMutations} from '~common/util'
const name = 'bfyc'

const initState = {
    predict: null,
    hotcool: null,
    record: null,
    strength: null
}
const actionsInfo = mapActions({
    async getPredict ({commit}, expect) {
        let predict = await ajax(`library/aggregate/awesome_predict?expect=${expect}&T=${Date.now()}`)
        commit(mTypes.setPredict, predict)
        return predict
    },
    async getHotcool ({commit}, expect) {
        let hotcool = await ajax(`library/aggregate/coldhot_distribute?expect=${expect}&T=${Date.now()}`)
        commit(mTypes.setHotcool, hotcool)
        return hotcool
    },
    async getRecord ({commit}, expect) {
        let record = await ajax(`library/aggregate/strength_compare?expect=${expect}&T=${Date.now()}`)
        commit(mTypes.setRecord, record)
        return record
    },
    async getStrengh ({commit}, expect) {
        let strengh = await ajax(`library/aggregate/combat_feature?expect=${expect}&T=${Date.now()}`)
        commit(mTypes.setStrengh, strengh)
        return strengh
    },
    reset (state) {
        const iState = JSON.parse(JSON.stringify(initState))
        Object.keys(state).forEach(key => {
            state[key] = iState[key]
        })
    }
}, name)

const mutationsInfo = mapMutations({
    updateScTime (state) {
        state.scTime = Date.now()
    },
    setPredict ({state}, predict) {
        state.predict = predict
    },
    setHotcool ({state}, hotcool) {
        state.hotcool = hotcool
    },
    setRecord ({state}, record) {
        state.record = record
    },
    setStrengh ({state}, strengh) {
        state.strengh = strengh
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
