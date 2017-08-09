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
        <div class="box-arrow noborder" v-tap="{methods: () => collaFlag = !collaFlag}">
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

<style scoped>
    .zhedie-box{background:#fff}
    .zhedie-box:last-child{margin-bottom:0}

    .time-item{float:right;font-size:.293333rem}
    .time-item li{background:#efefef;color:#aab5bd;height:.613333rem;line-height:.613333rem;padding:0 .2rem;margin-left:.133333rem;text-align:center;border-radius:.306667rem;border:1px solid #dadee4;float:left;box-sizing:border-box}
    .time-item .time-item-cur{color:#242c35;background:#fff;border:1px solid #dadee4}

    .zhzl-box{height:.973333rem;position:relative;margin:.4rem .4rem 0}
    .zhzl-title{color:#999;padding-top:.186667rem;text-align:center;width:100%;line-height:.626667rem}
    [data-dpr="1"] .zhzl-title{font-size:13px}
    [data-dpr="2"] .zhzl-title{font-size:26px}
    [data-dpr="3"] .zhzl-title{font-size:39px}
    .zhzl-l,.zhzl-r{position:absolute;bottom:0;transition:all .5s ease-in-out 0s;-webkit-transition:all .5s ease-in-out 0s;height:.16rem;width:0}
    .zhzl-l{left:0}
    .zhzl-r{right:0}
    .zhzl-vs div:first-child.zhzl-green .hh{border-top:.16rem solid #5c788f;border-right:.16rem solid transparent;right:-.13rem;position:absolute;content:'';width:0;height:0;z-index:1}
    .zhzl-vs div:last-child.zhzl-green .hh{border-top:.17rem solid #5c788f;border-left:.16rem solid transparent;left:-.13rem;position:absolute;content:'';width:0;height:0}
    .zhzl-gray .hh{border:0}
    .zhzl-bfb-left,.zhzl-bfb-right{position:absolute;top:.066667rem;color:#333}
    [data-dpr="1"] .zhzl-bfb-left,[data-dpr="1"] .zhzl-bfb-right{font-size:23px}
    [data-dpr="2"] .zhzl-bfb-left,[data-dpr="2"] .zhzl-bfb-right{font-size:46px}
    [data-dpr="3"] .zhzl-bfb-left,[data-dpr="3"] .zhzl-bfb-right{font-size:69px}
    .zhzl-bfb-right{right:0}
    [data-dpr="1"] .zhzl-box i{font-size:12px}
    [data-dpr="2"] .zhzl-box i{font-size:24px}
    [data-dpr="3"] .zhzl-box i{font-size:36px}
    .zhzl-list{margin:.533333rem .4rem 0}
    .zhzl-list li{height:1.08rem}
    .zhzl-left,.zhzl-right{color:#333;width:2.106667rem;line-height:1.066667rem}
    [data-dpr="1"] .zhzl-left,[data-dpr="1"] .zhzl-right{font-size:11px}
    [data-dpr="2"] .zhzl-left,[data-dpr="2"] .zhzl-right{font-size:22px}
    [data-dpr="3"] .zhzl-left,[data-dpr="3"] .zhzl-right{font-size:33px}
    .zhzl-left{text-align:left}
    .zhzl-right{text-align:right}
    .zhzl-classify{color:#aab5bd;line-height:.466667rem;text-align:center}
    [data-dpr="1"] .zhzl-classify{font-size:11px}
    [data-dpr="2"] .zhzl-classify{font-size:22px}
    [data-dpr="3"] .zhzl-classify{font-size:33px}
    .zhzl-vs-left,.zhzl-vs-right{height:.106667rem;position:absolute;top:0;background:#bcd0de}
    .zhzl-vs-left{right:0;margin-right:.04rem}
    .gray-bg,.zhzl-gray{background:#bcd0de}
    .green-bg,.zhzl-green{background:#5c788f}
    .noborder{border:0}
    .zhzl-tips{color:rgba(170,181,189,.5);text-align:center}
    [data-dpr="1"] .zhzl-tips{font-size:10px}
    [data-dpr="2"] .zhzl-tips{font-size:20px}
    [data-dpr="3"] .zhzl-tips{font-size:30px}

    .zhzl-vs-left,.zhzl-vs-right{height:.106667rem;position:absolute;top:0;background:#bcd0de}
    .zhzl-vs-left{right:0;margin-right:.04rem}
    .gray-bg,.zhzl-gray{background:#bcd0de}
    .green-bg,.zhzl-green{background:#5c788f}
    .each-resone{-webkit-box-flex:1;-ms-flex:1;flex:1;display:block;width:100%}


    .box-arrow{height:1.066667rem;position:relative}
    .noborder{border:0}
    .zd-arrow{width:.533333rem;height:.177rem;position:absolute;top:50%;left:50%;margin:-.2rem 0 0 -.266667rem;background-position:center -10.84rem}
    .rotate180{-webkit-animation:all .2s linear;animation:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}
    .wua{position:relative;width:100%;height:.16rem}


    .feed-back {
        width: 100%;
        height: 1.733333rem;
        background: #fff;
        border-top: 1px solid #eaeaea
    }
    .feed-box {
        color: #787878;
        line-height: 1.733333rem;
        text-align: center
    }
    [data-dpr="1"] .feed-box {
        font-size: 13px
    }
    [data-dpr="2"] .feed-box {
        font-size: 26px
    }
    [data-dpr="3"] .feed-box {
        font-size: 39px
    }

</style>
