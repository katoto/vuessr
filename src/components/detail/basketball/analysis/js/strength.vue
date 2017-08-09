<template>
    <div class="zhedie-box">
        <div class="gl-nav">
            实力对比
            <ul class="time-item" drunk-if="strengthInfo">
                <li class="time-item-cur more-zl" v-tap='{methods: openStatBox}' v-if="noEmptyFlagStats">更多</li>
            </ul>
        </div>
        <template v-if="noEmptyFlag">
            <div class="zhzl-box">
                <div class="zhzl-title">综合评分</div>
                <div class="zhzl-vs">
                    <div class="zhzl-l" :class="finalscoreClassAway" :style="finalscoreStyleAway">
                        <div class="wua">
                            <div class="hh"></div>
                        </div>
                    </div>
                    <div class="zhzl-r" :class="finalscoreClassHome" :style="finalscoreStyleHome">
                        <div class="wua">
                            <div class="hh"></div>
                        </div>
                    </div>
                </div>
                <div class="zhzl-bfb-left">{{strength.finalscore.away}}</div>
                <div class="zhzl-bfb-right">{{strength.finalscore.home}}</div>
            </div>
            <div class="zhedie" v-if="collaFlag">
                <ul class="zhzl-list">
                    <li class="responsive">
                        <div class="zhzl-left">{{strength.shoot.away}}%</div>
                        <div class="each-resone">
                            <div class="zhzl-classify">投篮命中率</div>
                            <div class="responsive">
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-left" :class="shootClassAway" :style="shootStyleAway"></div>
                                </div>
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-right" :class="shootClassHome" :style="shootStyleHome"></div>
                                </div>
                            </div>
                        </div>
                        <div class="zhzl-right">{{strength.shoot.home}}%</div>
                    </li>
                    <li class="responsive" v-for="(name, type) in strengthType">
                        <div class="zhzl-left">{{strength[type].away}}</div>
                        <div class="each-resone">
                            <div class="zhzl-classify">{{name}}</div>
                            <div class="responsive">
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-left" :class="leftColorClass[type]" :style="leftWidthStyle[type]"></div>
                                </div>
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-right" :class="rightColorClass[type]" :style="rightWidthStyle[type]"></div>
                                </div>
                            </div>
                        </div>
                        <div class="zhzl-right">{{strength[type].home}}</div>
                    </li>
                </ul>
                <div class="zhzl-tips">数据来自NBA常规赛球队场均统计</div>
            </div>
        </template>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
        <div class="box-arrow noborder" v-tap="{methods: () => collaFlag = !collaFlag}" v-if="noEmptyFlag">
        	<div class="zd-arrow" :class="{'rotate180': collaFlag}">
        	</div>
        </div>
    </div>

</template>

<script>
import {mTypes} from '~store/lqdetail'
import statsBox from '~components/detail/basketball/analysis/js/statsBox.vue'

export default {
    components: {
        statsBox
    },
    props: {
        baseInfo: {
            type: Object,
            required: true
        },
        strength: {
            type: Object,
            required: true
        },
        stats: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            strengthType: {
                // finalscore: '综合评分',
                // shoot: '投篮命中率',
                attack: '得分',
                defense: '失分',
                rebound: '篮板',
                assist: '助攻'
                // home: '主队实力值'
                // away: '客队实力值'
                // home_percent: '主队实力占比'
                // away_percent: '客队实力占比'
            },
            collaFlag: false
        }
    },
    computed: {
        leftColorClass () {
            let colorObj = {}
            for (var type in this.strengthType) {
                if (this.strengthType.hasOwnProperty(type)) {
                    colorObj[type] = this.makeColorClass(type, true)
                }
            }
            return colorObj
        },
        rightColorClass () {
            let colorObj = {}
            for (var type in this.strengthType) {
                if (this.strengthType.hasOwnProperty(type)) {
                    colorObj[type] = this.makeColorClass(type)
                }
            }
            return colorObj
        },
        leftWidthStyle () {
            let widthObj = {}
            for (var type in this.strengthType) {
                if (this.strengthType.hasOwnProperty(type)) {
                    widthObj[type] = this.makeWidthStyle(type, true)
                }
            }
            return widthObj
        },
        rightWidthStyle () {
            let widthObj = {}
            for (var type in this.strengthType) {
                if (this.strengthType.hasOwnProperty(type)) {
                    widthObj[type] = this.makeWidthStyle(type)
                }
            }
            return widthObj
        },
        finalscoreClassHome () {
            return this.makeColorClass('finalscore')
        },
        finalscoreClassAway () {
            return this.makeColorClass('finalscore', true)
        },
        finalscoreStyleHome () {
            return this.makeWidthStyle('finalscore')
        },
        finalscoreStyleAway () {
            return this.makeWidthStyle('finalscore', true)
        },
        shootClassHome () {
            return this.makeColorClass('shoot')
        },
        shootClassAway () {
            return this.makeColorClass('shoot', true)
        },
        shootStyleHome () {
            return this.makeWidthStyle('shoot')
        },
        shootStyleAway () {
            return this.makeWidthStyle('shoot', true)
        },
        noEmptyFlag () {
            return this.noEmpty(this.strength)
        },
        noEmptyFlagStats () {
            return this.noEmpty(this.stats)
        }
    },
    methods: {
        makeColorClass (type, isReverse, classL = 'zhzl-green', classS = 'zhzl-gray') { // isReverse=true时，为客队
            let home = +(this.strength[type].home_percent)
            let away = +(this.strength[type].away_percent)
            if (isReverse) { return home <= away ? classL : classS }
            return home >= away ? classL : classS
        },
        makeWidthStyle (type, isReverse) { // isReverse=true时，为客队
            if (isReverse) { return `width: ${this.strength[type].away_percent}%` }
            return `width: ${this.strength[type].home_percent}%`
        },
        openStatBox () {
            this.$store.commit(mTypes.setDialog, {
                component: statsBox,
                params: {
                    baseInfo: this.baseInfo,
                    stats: this.stats
                }
            })
        },
        noEmpty (obj) {
            if (obj) return !!Object.keys(obj).length
            return false
        }
    },
    watch: {
        collaFlag () {
            this.$store.commit(mTypes.updateScTime)
        }
    }
}
</script>

<style lang="css">
</style>
