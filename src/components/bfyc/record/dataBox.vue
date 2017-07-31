<template>
    <div >
        <template v-for="(name, type) in recordType" v-if="noEmptyFlag">
            <div class="gl-nav sticky" v-if="data[type].length">{{name}}</div>
            <section v-for="item in data[type]">
                <div class="hotc-item record-item" v-tap="{methods: goAnalysis, fid: item.fid}">
                    <div class="hotc-right" :class="resultObj[item.cell.result].class">
                        <div class="right-predict">{{item.cell.continous}}<em>{{resultObj[item.cell.result].desc}}</em></div>
                    </div>

                    <div class="hotc-left">
                        <div class="hotc-info-tit">{{item.cell.teamsxname}}</div>
                        <div class="hotc-info-time">{{item.simpleleague}} {{item.matchtime.substr(5)}} <em>{{item.homesxname}}
                            VS {{item.awaysxname}}</em></div>
                        </div>
                    </div>
            </section>
        </template>
        <prompt v-else type="no-data" tip0="暂无数据"/>
    </div>
</template>

<script>
import Prompt from '~components/prompt.vue'
export default {
    components: {
        Prompt
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            resultObj: {
                '3': {
                    class: '',
                    desc: '连赢'
                },
                '1': {
                    class: 'always-draw',
                    desc: '连平'
                },
                '0': {
                    class: 'always-fail',
                    desc: '连输'
                }
            },
            recordType: {
                recent_record: '近期战绩',
                history_battle: '历史交战'
            }
        }
    },
    computed: {
        noEmptyFlag() {
            return this.noEmpty(this.data.recent_record) || this.noEmpty(this.data.history_battle)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        },
        goAnalysis({fid}) {
            this.$router.push(`detail/football/${fid}/analysis/zj`)
        }
    }
}
</script>

<style lang="css">
</style>
