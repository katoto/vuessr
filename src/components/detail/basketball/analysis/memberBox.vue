<template>
    <div>
        <div class="zj-nav" v-if="isJj">
            {{baseInfo[hoa + 'sxname']}}球员
            <ul class="time-item">
                <li class="time-item-cur" v-tap="{methods: openWordBox, str: baseInfo[hoa + 'sxname'] + '球员'}">名词解释</li>
            </ul>
        </div>
        <div class="zj-nav" v-else>
            {{baseInfo[hoa + 'sxname']}}
            <ul class="time-item" v-if="noEmptyFlag">
                <li class="click-cj" :class="{'time-item-cur': vtype === 1}" v-tap="{methods: () => vtype = 1}">场均</li>
                <li class="click-zs" :class="{'time-item-cur': vtype === 2}" v-tap="{methods: () => vtype = 2}">总数</li>
                <li class="click-ybhh" :class="{'time-item-cur': vtype === 3}" v-tap="{methods: () => vtype = 3}">100回合</li>
                <li class="click-sslfz" :class="{'time-item-cur': vtype === 4}" v-tap="{methods: () => vtype = 4}">36分钟</li>
            </ul>
        </div>

        <div class="dataBox" v-if="noEmptyFlag">
            <div class="zr-detail">
                <ul class="zr-detail-left">
                    <li class="zr-detail-tit">球员</li>
                    <li v-for="item in membersFmt">{{item.player | truncate(4)}}<em v-if="item.isinjury === '1'">伤</em></li>
                </ul>
                <div class="scroll-cont table-sslfz">
                    <ul class="zr-detail-right" :style="{width: liW}">
                        <li class="zr-detailer zr-detail-tit">
                            <ul>
                                <li v-for="(name, type) in membersType">{{name}}</li>
                            </ul>
                        </li>
                        <li class="zr-detailer zr-detailer-box" v-for="item in membersFmt">
                            <ul>
                                <li v-for="(name, type) in membersType">{{item[type]}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
        <div class="box-arrow noborder" v-if="members" v-tap="{methods: collap, lenght: members.length}">
            <div class="zd-arrow" :class="{'rotate180': moreFlag}">
            </div>
        </div>

    </div>
</template>

<script>
import {
    mTypes,
    aTypes
} from '~store/lqdetail'
import wordBox from '~components/detail/basketball/analysis/jj/wordBox.vue'
import {Scroller} from 'scroller'

export default {
    props: {
        baseInfo: {
            type: Object,
            required: true
        },
        members: {
            required: true
        },
        membersType: {
            type: Object,
            required: true
        },
        liW: {
            type: String,
            required: true
        },
        hoa: {
            type: String,
            required: true
        },
        isJj: {
            type: Boolean
        }
    },
    data () {
        return {
            moreFlag: false,
            cutLen: 5,
            vtype: 1,
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
        noEmptyFlag () {
            return this.noEmpty(this.members)
        },
        membersFmt () {
            return this.members.slice(0, this.cutLen)
        }
    },
    methods: {
        collap ({length}) {
            this.moreFlag = !this.moreFlag
            this.cutLen = this.moreFlag ? length : 5
            this.$store.commit(mTypes.updateScTime)
        },
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        },
        raf: (cb) => window.requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(() => cb(), 16.7),
        scrollTo (left, isAnimate) {
            this.raf(() => {
                this.raf(() => {
                    this.scrollerObj.scrollTo(left, 0, isAnimate)
                })
            })
        },
        async updateMembersData (vtype, hoa) {
            this.$store.commit('startOneRefresh')
            const {
                homeid,
                awayid,
                seasonid
            } = this.baseInfo // baseInfo 保证有数据了
            await this.$store.dispatch(aTypes.getAnalysisZrMembers, {
                homeid,
                awayid,
                seasonid,
                hoa: hoa,
                vtype: vtype
            })
            this.$store.commit('endOneRefresh')
        },
        openWordBox ({str}) {
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
    mounted () {
        if (!this.noEmptyFlag) return
        this.container = this.$el.querySelector('.scroll-cont')
        this.content = this.$el.querySelector('.zr-detail-right')
        const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
        this.scrollerObj = new Scroller((left, top, zoom) => {
            this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
        }, {
            bouncing: false,
            scrollingX: true,
            Locking: false,
            scrollingY: false,
            animationDuration: 150
        })
        this.scrollerObj.setSnapSize(this.container.offsetWidth)
        this.scrollerObj.setDimensions(this.container.offsetWidth, this.container.offsetHeight, this.content.offsetWidth, this.content.offsetHeight)
        let latestX = 0
        let latesY = 0
        let needLockY = false
        this.container.addEventListener('touchstart', (e) => {
            latestX = e.touches[0].pageX
            latesY = e.touches[0].pageY
            this.scrollerObj.doTouchStart(e.touches, e.timeStamp)
            e.preventDefault()
        }, false)
        this.container.addEventListener('touchmove', (e) => {
            if (Math.abs(latestX - e.touches[0].pageX) > Math.abs(latesY - e.touches[0].pageY)) {
                needLockY = true
            }
            latestX = e.touches[0].pageX
            latesY = e.touches[0].pageY

            needLockY && e.stopPropagation()
            this.scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
        }, false)

        this.container.addEventListener('touchend', (e) => {
            needLockY = false
            this.scrollerObj.doTouchEnd(e.timeStamp)
        }, false)

        this.container.addEventListener('touchcancel', (e) => {
            this.scrollerObj.doTouchEnd(e.timeStamp)
        }, false)
    },
    filters: {
        truncate (input, length, tail) {
            if (input.length <= length) {
                return input
            }
            return input.slice(0, length) + (tail || '...')
        }
    },
    watch: {
        vtype (vtype) {
            this.scrollTo(0, false)
            this.updateMembersData(vtype, this.hoa)
        }
    }
}
</script>

<style lang="css">
</style>
