<template>
    <div class="tContent" style="display:block">
    	<div class="zj-nav">
    		球队进阶
    		<ul class="time-item">
    			<li class="time-item-cur" v-tap="{methods: openWordBox}">名词解释</li>
    		</ul>
    	</div>
        <template v-if="noEmptyFlag">
            <div class="gl-box">
                <data-box :data="team_misc.ratio" :dataType="ratioType"></data-box>
                <div class="infoTips" v-if="team_misc.ratio.desc">
                    <i class="icon"></i>
                    <p class="f24">
                        {{team_misc.ratio.desc}}
                    </p>
                </div>
            </div>
            <div class="gl-box gl-zjBox">
                <data-box :data="data" :dataType="combatType"></data-box>
                <div class="infoTips" v-if="team_misc.combat.desc">
                    <i class="icon"></i>
                    <p class="f24">
                        {{team_misc.combat.desc}}
                    </p>
                </div>
            </div>
        </template>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes} from '~store/lqdetail'
import wordBox from '~components/detail/basketball/analysis/jj/word_box.vue'
import dataBox from '~components/detail/basketball/analysis/jj/teamMisc/data_box.vue'

export default {
    components: {
        dataBox,
        wordBox
    },
    props: {
        team_misc: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            ratioType: {
                pace: {
                    zn: '节奏',
                    en: 'Pace'
                },
                offrtg: {
                    zn: '进攻效率',
                    en: 'Off Rtg'
                },
                defrtg: {
                    zn: '防守效率',
                    en: 'Def Rtg'
                }
            },
            combatType: {
                expect: {
                    zn: '实际战绩',
                    en: 'Win-Lost'
                },
                real: {
                    zn: '期望战绩',
                    en: 'Expected W-L'
                },
                sos: {
                    zn: '赛程强度',
                    en: 'SOS'
                }
            },
            wordData: {
                pace: {
                    name: '节奏',
                    tit: '节奏Pace',
                    desc: '节奏（自1973-74赛季后引入NBA），是每48分钟平均回合数估计，反映球队的攻防快慢'
                },
                offrtg: {
                    name: '进攻效率',
                    tit: '进攻效率Off Rtg',
                    desc: '进攻效率值（自1977-78赛季后引入NBA），无论是用于球员还是球队，该数值都是指每百回合的得分能力。举一个例子，节奏较慢的球队A每场比赛可以获得40次进攻机会，从中得到了80分；另一支节奏较快的球队B每场比赛可以获得70次的进攻机会，但从中只得到了90分。如果从“得分”来看，球队B的进攻能力要强于球队A，但事实上，球队B的进攻机会比球队A多了75%，得分却只多了12.5%，实在很难认为球队B的进攻能力要强于球队A'
                },
                defrtg: {
                    name: '防守效率',
                    tit: '防守效率Def Rtg',
                    desc: '防守效率值（自1973-74赛季后引入NBA），无论是用于球员还是球队，该数值都是指每百回合被对手攻下的分数（防守能力）'
                },
                expect: {
                    name: '实际战绩',
                    tit: '实际战绩Win-Lost',
                    desc: '球队目前的打出的战绩，用“胜场次数-负场次数”表示'
                },
                real: {
                    name: '期望战绩',
                    tit: '期望战绩Expected W-L',
                    desc: '期望战绩是以本赛季所打比赛的净胜分差来预估球队战绩的期望值'
                },
                sos: {
                    name: '赛程强度',
                    tit: '赛程强度SOS',
                    desc: '赛程强度反应赛程对球队的影响，包含赛程时间紧密程度及对手实力的影响。该数值的联盟平均数是0，数值越大赛程强度越高，对球队的负面影响也就越大'
                }
            }
        }
    },
    computed: {
        data () {
            return {
                expect: this.team_misc.combat.expect,
                real: this.team_misc.combat.real,
                sos: this.team_misc.degree.sos
            }
        },
        noEmptyFlag () {
            return this.noEmpty(this.team_misc)
        }
    },
    methods: {
        openWordBox () {
            this.$store.commit(mTypes.setDialog, {
                component: wordBox,
                params: {
                    wordData: this.wordData,
                    cur: 'pace',
                    title: '球队进阶'
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
