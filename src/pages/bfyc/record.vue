<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/record.html-->
<template>
    <div class="v124-wrap l-flex-column l-full">
        <section class="record-header">
            <ul>
                <li :class="{'cur':tab === 'result' }" v-tap="{methods: () => tab = 'result'}">胜平负</li>
                <li :class="{'cur':tab === 'asian' }" v-tap="{methods: () => tab = 'asian'}">亚盘</li>
                <li :class="{'cur':tab === 'bigsmall' }" v-tap="{methods: () => tab = 'bigsmall'}">大小球</li>
            </ul>
        </section>
        <div class="hot-cool-wrap l-flex-1 l-relative" v-if="record">
            <div class="l-full l-scroll-y">
                <data-box :data='record[tab]' v-if="record[tab]"></data-box>
            </div>
        </div>
        <prompt v-else type="loading" tip0="正在加载中..."/>
    </div>
</template>

<script>
    import {aTypes} from '~store/bfyc'
    import Prompt from '~components/prompt.vue'
    import dataBox from '~components/bfyc/record/dataBox.vue'

    export default{
        async asyncData ({store}) {
            return store.dispatch(aTypes.getRecord)
        },
        components: {
            Prompt, dataBox
        },
        data () {
            return {
                tab: 'result'
            }
        },
        computed: {
            record () {
                return this.$store.state.bfyc.record
            }

        },
        mounted () {
            this.$store.dispatch(aTypes.getRecord)
        }

    }
</script>
