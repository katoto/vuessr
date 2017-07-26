<template>
    <div>
        <div class="tContent" style="display:block" v-for="hoa in ['away', 'home']">
            <div class="gl-box fx-zr-box">
                <div class="zj-nav">
                    {{baseinfo[hoa + 'sxname']}}球员
                    <ul class="time-item">
                        <li class="time-item-cur" v-tap="{methods: openWordBox, str: baseinfo[hoa + 'sxname'] + '球员'}">名词解释</li>
                    </ul>
                </div>
                <member-box ref="memBox" :members='members_advanced[hoa]' :membersType='BasketballMemberAdvType' liW="25.73rem"></member-box>
            </div>
        </div>
    </div>
</template>


<script>
import {mTypes} from '~store/lqdetail/mchao'
import {
    BasketballMemberAdvType
} from '~common/constants'
import memberBox from '~components/detail/basketball/analysis/member_box.vue'
import wordBox from '~components/detail/basketball/analysis/jj/word_box.vue'

export default {
    components: {
        memberBox
    },
    props: {
        baseinfo: {
            type: Object,
            required: true
        },
        members_advanced: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            BasketballMemberAdvType,
            wordData: {
                effective_rate: {
                    name: '效率值PER',
                    tit: '效率值PER',
                    desc: '评判球员当赛季综合表现的数值，数值越高球员综合表现越好，每年NBA所有球员的平均PER为15。 '
                },
                true_hit_rate: {
                    name: '真实命中率',
                    tit: '真实命中率TS%',
                    desc: '该数据有效命中率的基础上，进一步考虑了罚球的数据，因此也被视作体现球员把握得分机会能力的数据。计算公式为：真实命中率% = 得分 / ( 2 * ( 投篮数 + 0.44 * 罚球数 ))'
                },
                '3rate': {
                    name: '3分率',
                    tit: '3分率3PAr',
                    desc: '该数据反应球员3分出手数占总出手数的比例'
                },
                penalty_rate: {
                    name: '罚球率',
                    tit: '罚球率FTr',
                    desc: '该数据反应球员罚球出手数占总出手数的比例'
                },
                rebounds_rate: {
                    name: '篮板率',
                    tit: '篮板率TRB%',
                    desc: '该数据反应球员在场时获取篮板的能力。计算公式为：篮板率 = 100 * (球员篮板数 * (球队比赛时间 / 5)) / (球员比赛时间 * (球队篮板数+ 对手篮板数))'
                },
                off_rebounds_rate: {
                    name: '前场篮板率',
                    tit: '前场篮板率ORB%',
                    desc: '该数据反应球员在场时获取进攻篮板的能力。计算公式为：前场篮板率 = 100 * (球员前场篮板数 * (球队比赛时间 / 5)) / (球员比赛时间 * (球队前场篮板 + 对手后场篮板))'
                },
                def_rebounds_rate: {
                    name: '后场篮板率',
                    tit: '后场篮板率DRB%',
                    desc: '该数据反应球员在场时获取防守篮板的能力。计算公式为：后场篮板率 = 100 * (球员后场篮板 * (球队比赛时间 / 5)) / (球员比赛时间 * (球队后场篮板数+ 对手前场篮板数))'
                },
                assists_rate: {
                    name: '助攻率',
                    tit: '助攻率AST%',
                    desc: '用来描述球员在场时，队友的进球中大约有多少来自他的助攻。计算公式为：助攻率=100*助攻数/(((球场上场时间 / (球队比赛时间 / 5))*球队得分) - 球员得分)'
                },
                steals_rate: {
                    name: '抢断率',
                    tit: '抢断率STL%',
                    desc: '该数据反应球员在场时获取抢断的能力。计算公式为：抢断率 = 100 * (球员抢断数 * (球队比赛时间 / 5)) / (球员比赛时间 * 对手回合数)'
                },
                cap_rate: {
                    name: '盖帽率',
                    tit: '盖帽率BLK%',
                    desc: '该数据反应球员在场时2分盖帽的能力。计算公式为：盖帽率 = 100 * (球员盖帽数 * (球队比赛时间 / 5)) / (球员比赛时间 * (对手出手数 - 对手3P出手数))'
                },
                mistakes_rate: {
                    name: '失误率',
                    tit: '失误率TOV%',
                    desc: '该数据用来描述球员在每100个回合中，大约有多少回合以失误结束。计算公式为：失误率 = 100 * 球员失误数 / (球员出手数 + 0.44 * 球员罚球数 + 球员失误数)'
                },
                usage_rate: {
                    name: '球权指数',
                    tit: '球权指数USG%',
                    desc: `球权指数反应球员对球队球权的掌控程度，数据越大则该球员在比赛中掌握更多球权。计算公式为：球权指数 = 100 * ((球员出手数 + 0.44 * 球员罚球数 + 球员失误数) * (球队比赛时间/ 5)) /
                    (球员比赛时间 * (球队出手数+ 0.44 * 球队罚球数+ 球队失误数))`
                },
                win_shares: {
                    name: '贡献值',
                    tit: '贡献值',
                    desc: '该数值是用来衡量球员整体能力对球队获胜的贡献。贡献值=进攻贡献+防守贡献'
                },
                off_win_shares: {
                    name: '进攻贡献',
                    tit: '进攻贡献OWS',
                    desc: '该数值是用来衡量球员进攻能力对球队进攻端的贡献'
                },
                def_win_shares: {
                    name: '防守贡献',
                    tit: '防守贡献DWS',
                    desc: '该数值是用来衡量球员防守能力对球队防守端的贡献'
                }
            }
        }
    },
    computed: {
        loaded() {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        openWordBox({str}) {
            this.$store.commit(mTypes.setDialog, {
                component: wordBox,
                params: {
                    wordData: this.wordData,
                    cur: 'effective_rate',
                    title: str
                }
            })
        }
    },
    watch: {
        loaded(loaded) {
            if (loaded) {
                this.$store.commit(mTypes.updateScTime)
            }
        }
    }
}
</script>

<style lang="css">
</style>
