<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/record.html-->
<template>

    <div class="l-full l-scroll-y" v-if="strength">
        <!--实力对比列表-->

        <section class="hotc-list" v-if="strength.matches.length">
            <data-box :data='matches.noEnd' v-if="matches.noEnd"></data-box>
            <!--已完场-->
            <div class="tag-game-over" v-if="curStatus.history&&curStatus.latest">已完场</div>
            <data-box :data='matches.end' v-if="matches.end"></data-box>

        </section>
        <prompt v-else type="no-data" tip0="暂无数据"/>
    </div>
    <prompt v-else type="loading" tip0="正在加载中..."/>

</template>

<script>
    import {aTypes} from '~store/bfyc'
    import Prompt from '~components/prompt.vue'
    import dataBox from '~components/bfyc/strength/dataBox.vue'

    export default{
        async asyncData ({store}) {
            return store.dispatch(aTypes.getStrength)
        },
        components: {
            Prompt, dataBox
        },
        computed: {
            strength () {
                return this.$store.state.bfyc.strength
            },
            matches () {
                let matches = {
                    end: [],
                    noEnd: []
                }
                this.strength.matches.forEach((match) => {
                    if (match.status !== '4') matches.noEnd.push(match)
                    else matches.end.push(match)
                })
                return matches
            },
            curStatus () {
                let curStatus = {
                    latest: false,
                    history: false
                }
                if (this.strength && this.strength.matches) {
                    this.strength.matches.forEach(match => {
                        if (match.status !== '4') {
                            curStatus.latest = true
                        } else {
                            curStatus.history = true
                        }
                    })
                }
                return curStatus
            }

        },
        mounted () {
            this.$store.dispatch(aTypes.getStrength)
        }

    }
</script>
