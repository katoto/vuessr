
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
        expect = expect ? 'expect=' + expect : ''
        let predict = await ajax(`library/aggregate/awesome_predict?${expect}&T=${Date.now()}`)
        commit(mTypes.setPredict, predict)
        return predict
    },
    async getHotcool ({commit}, expect) {
        expect = expect ? 'expect=' + expect : ''
        let hotcool = await ajax(`library/aggregate/coldhot_distribute?${expect}&T=${Date.now()}`)
        commit(mTypes.setHotcool, hotcool)
        return hotcool
    },
    async getRecord ({commit}, expect) {
        expect = expect ? 'expect=' + expect : ''
        let record = await ajax(`library/aggregate/combat_feature?${expect}&T=${Date.now()}`)
        commit(mTypes.setRecord, record)
        return record
    },
    async getStrength ({commit}, expect) {
        expect = expect ? 'expect=' + expect : ''
        let strength = await ajax(`library/aggregate/strength_compare?${expect}&T=${Date.now()}`)
        commit(mTypes.setStrength, strength)
        return strength
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
    setPredict (state, predict) {
        state.predict = predict
    },
    setCurrExpect (state, curr_expect) {
        state.predict.curr_expect = curr_expect
    },
    setHotcool (state, hotcool) {
        state.hotcool = hotcool
    },
    setRecord (state, record) {
        state.record = record
    },
    setStrength (state, strength) {
        state.strength = strength
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
