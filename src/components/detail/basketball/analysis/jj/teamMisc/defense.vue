<template>
    <div class="tContent" style="display:block">
        <div class="zj-nav">
            防守四要素
            <ul class="time-item">
                <li class="time-item-cur" v-tap="{methods: openWordBox}">名词解释</li>
            </ul>
        </div>
        <div class="gl-box" v-if="noEmptyFlag">
            <data-box :data="defense" :dataType="defenseType"></data-box>
            <div class="infoTips" v-if="defense.desc">
                <i class="icon"></i>
                <p class="f24">
                    {{defense.desc}}
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
import {mTypes} from '~store/lqdetail'
import wordBox from '~components/detail/basketball/analysis/jj/wordBox.vue'
import dataBox from '~components/detail/basketball/analysis/jj/teamMisc/dataBox.vue'

export default {
    components: {
        dataBox
    },
    props: {
        defense: {
            required: true
        }
    },
    data () {
        return {
            defenseType: {
                efg: {
                    zn: '防投篮',
                    en: 'eFG%'
                },
                tov: {
                    zn: '造误率',
                    en: 'TOV%'
                },
                orb: {
                    zn: '后场篮板率',
                    en: 'DRB%'
                },
                ftfga: {
                    zn: '防罚球',
                    en: 'FT/FGA'
                }
            },
            wordData: {
                efg: {
                    name: '防投篮',
                    tit: '防投篮eFG%',
                    desc: '防投篮，本赛季对手球队的有效命中率（将三分球算作1.5个进球来计算命中率）。'
                },
                tov: {
                    name: '造误率',
                    tit: '造误率TOV%',
                    desc: '造误率，本赛季对手球队在每100个回合中以失误结束的比重'
                },
                orb: {
                    name: '后场篮板率',
                    tit: '后场篮板率DRB%',
                    desc: '后场篮板率，用来描述球队在每100回合中将对方投失球转化为防守篮板的比重'
                },
                ftfga: {
                    name: '防罚球',
                    tit: '防罚球FT/FGA',
                    desc: '防罚球，本赛季对手球队罚球命中数/投篮出手数'
                }
            }
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.defense)
        }
    },
    methods: {
        openWordBox () {
            this.$store.commit(mTypes.setDialog, {
                component: wordBox,
                params: {
                    wordData: this.wordData,
                    cur: 'efg',
                    title: '防守四要素'
                }
            })
        },
        noEmpty (obj) {
            if (obj) return !!Object.keys(obj).length
            return false
        }
    }
}
</script>

<style lang="css">
</style>
