<template>
    <div class="hot-cool-wrap l-flex-1 l-relative" >
        <div class="l-full l-scroll-y" v-if="record">
            <data-box :data='record'  :resultObj='resultObj' v-if="record"></data-box>
        </div>
        <prompt v-else type="no-data" tip0="暂无数据"/>
    </div>
</template>

<script>
import dataBox from '~components/bfyc/record/dataBox.vue'
import Prompt from '~components/prompt.vue'
import {aTypes} from '~store/bfyc'

export default {
    async asyncData ({store}) {
        return store.dispatch(aTypes.getRecord)
    },
    components: {
        Prompt, dataBox
    },
    computed: {
        tab () {
            return this.$route.meta.tab
        },
        record () {
            return this.$store.state.bfyc.record && this.$store.state.bfyc.record[this.tab]
        },
        resultObj () {
            let resultObj = {
                '3': {
                    class: '',
                    desc: '连胜'
                },
                '1': {
                    class: 'always-draw',
                    desc: '连平'
                },
                '0': {
                    class: 'always-fail',
                    desc: '连负'
                }
            }
            switch (this.tab) {
            case 'bigsmall':
                resultObj['3'].desc = '连大'
                resultObj['0'].desc = '连小'
                break
            case 'asian':
                resultObj['3'].desc = '连赢'
                resultObj['0'].desc = '连输'
                break
            default:
            }

            return resultObj
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getRecord)
    }
}
</script>

<style scoped>
    .hot-cool-wrap .gl-nav:first-child{border-top:none}

</style>
