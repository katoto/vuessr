<template>
    <div class="tContent" style="display:block">
        <div class="zj-nav">
            进攻四要素
            <ul class="time-item">
                <li class="time-item-cur" v-tap="{methods: openWordBox}">名词解释</li>
            </ul>
        </div>
        <div class="gl-box" v-if="noEmptyFlag">
            <data-box :data="offend" :dataType="offendType"></data-box>
            <div class="infoTips" v-if="offend.desc">
                <i class="icon"></i>
                <p class="f24">
                    {{offend.desc}}
                </p>
            </div>
        </div>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes} from '~store/lqdetail/mchao'
import wordBox from '~components/detail/basketball/analysis/jj/word_box.vue'
import dataBox from '~components/detail/basketball/analysis/jj/teamMisc/data_box.vue'

export default {
    components: {
        dataBox
    },
    props: {
        offend: {
            required: true
        }
    },
    data() {
        return {
            offendType: {
                efg: {
                    zn: '有效命中率',
                    en: 'eFG%'
                },
                tov: {
                    zn: '失误率',
                    en: 'TOV%'
                },
                orb: {
                    zn: '前场篮板率',
                    en: 'ORB%'
                },
                ftfga: {
                    zn: '造罚球',
                    en: 'FT/FGA'
                }
            },
            wordData: {
                efg: {
                    name: '有效命中率',
                    tit: '有效命中率eFG%',
                    desc: '有效命中率，将三分球算作1.5个进球来计算的本方得分命中率。计算公式为：有效命中率=（命中数+0.5三分命中数）/出手数'
                },
                tov: {
                    name: '失误率',
                    tit: '失误率TOV%',
                    desc: '失误率，用来描述球队在每100个回合中以失误结束的比重。计算公式为：失误率= 100 * 失误数 / (出手数 + 0.44 * 罚球数 + 失误）'
                },
                orb: {
                    name: '前场篮板率',
                    tit: '前场篮板率ORB%',
                    desc: '前场篮板率，用来描述球队在每100回合中将本方投失球转化为进攻篮板的比重'
                },
                ftfga: {
                    name: '造罚球',
                    tit: '造罚球FT/FGA',
                    desc: '造罚球率，罚球命中数/投篮出手数，反应球队造罚球能力'
                }
            }
        }
    },
    computed: {
        noEmptyFlag() {
            return this.noEmpty(this.offend)
        }
    },
    methods: {
        openWordBox() {
            this.$store.commit(mTypes.setDialog, {
                component: wordBox,
                params: {
                    wordData: this.wordData,
                    cur: 'efg',
                    title: '进攻四要素'
                }
            })
        },
        noEmpty(obj) {
            if (obj) return !!Object.keys(obj).length
            return false
        }
    }
}
</script>

<style lang="css">
</style>
