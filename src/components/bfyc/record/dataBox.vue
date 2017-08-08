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
    data () {
        return {
            resultObj: {
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
            },
            recordType: {
                recent_record: '近期战绩',
                history_battle: '历史交战'
            }
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.data.recent_record) || this.noEmpty(this.data.history_battle)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        },
        goAnalysis ({fid}) {
            this.$router.push(`/detail/football/${fid}/analysis/zj`)
        }
    }
}
</script>

<style lang="css" scoped>
    .hotc-left{float:left;padding-top:.24rem;width:5.6rem;height:.933333rem}
    .hot-cool-wrap .gl-nav:first-child{border-top:none}
    .hotc-item{clear:both;overflow:hidden;padding:.4rem .4rem;border-bottom:1px solid #eaeaea;background:#fff;zoom:1}
    .record-item{padding:.6rem .4rem}
    .record-item .hotc-right{float:left}
    .record-item .hotc-left{margin-left:.533rem;padding-top:0;width:6.906667rem}
    .record-item .hotc-right{padding:.213333rem 0;height:.64rem;line-height:.64rem}
    .record-item .right-predict{width:1.68rem;font-size:.8rem}
    .record-item .right-predict em{margin-left:.04rem;font-size:.293333rem}
    .record-item .right-predict i{display:inline-block;width:.88rem;text-align:center}
    .record-item .hotc-info-time em{margin-left:.533333rem}
    .hotc-info-tit{margin-bottom:.266667rem;height:.4rem;color:#242c35;font-size:.426667rem}
    .hotc-info-time{height:.293333rem;color:#aab5bd;font-size:.293333rem}
    .hotc-right{float:right;padding:.226667rem 0;height:1rem;border-radius:.053333rem;background:#d25138;box-shadow:.026667rem .026667rem .106667rem #e8a89b;color:#fff;text-align:center}
    .always-fail{background:#437ba8;box-shadow:.026667rem .026667rem .106667rem #729cbd}
    .always-draw{background:#36a171;box-shadow:.026667rem .026667rem .106667rem #68b894}
</style>
