<template>
    <div class="zhedie-box">
        <div class="zj-nav noborder" drunk-init-data="trendType='1'"> 球队状态
            <ul class="time-item">
                <li class="click-fc" :class="{'time-item-cur': vtype == 1}" v-tap="{methods: updateTrendData, vtype: 1}">分差</li>
                <li class="click-zf" :class="{'time-item-cur': vtype == 2}" v-tap="{methods: updateTrendData, vtype: 2}">总分</li>
            </ul>
        </div>
        <template v-if="noEmptyFlag">
            <div class="zhedie show">
                <div class="jqzs-fc" v-if="trend.away">
                    <div class="pm-namel fczs-cont ">
                        <div class="pm-img">
                            <img :src="baseInfo.awaylogo">
                        </div>
                        <div class="fczs">
                            <div class="fczs-jt">{{trendType[trend.away.exp]}}<em :class="trendTypeClass[trend.away.exp]"><i></i></em></div>
                            <div class="fczs-txt">近期状态</div>
                        </div>
                    </div>
                    <div class="vic-cont">
                        <template  v-if="vtype === 1">
                            <div class="line-horiz" v-if="trend.home.level" :style="trendTopHome"><em>{{trend.home.level}}</em></div>
                            <ul class="vic-list vic-list-fc">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose': item.value<0,'vic-item-win': item.value>0,'vic-item-coming':!item.value&&item.fid}" v-for="(item, idx) in trend.away.coords">
                                    <span :style="trendHeightAway[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <span v-if="!item.value&&!item.fid" ></span>
                                </li>
                            </ul>
                        </template>
                        <template v-if="vtype === 2">
                            <div class="line-horiz" v-if="trend.home.level" :style="trendTotalTopHome"><em>{{trend.home.level}}</em></div>
                            <ul class="vic-list">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose':item.state=='0','vic-item-win':item.state=='3','vic-item-coming':!item.state}" v-for="(item, idx) in trend.away.coords"  v-if="vtype === 2">
                                    <span :style="totalTrendHeightAway[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <span v-if="!item.value&&!item.fid" ></span>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <p class="jqzs-notice" v-if="vtype === 1"> 近20天分差走势</p>
                    <p class="jqzs-notice" v-if="vtype === 2"> 近20天总分走势</p>
                </div>
                <div class="jqzs-fc" v-if="trend.home">
                    <div class="pm-namel fczs-cont ">
                        <div class="pm-img">
                            <img :src="baseInfo.homelogo">
                        </div>
                        <div class="fczs">
                            <div class="fczs-jt">{{trendType[trend.home.exp]}}<em :class="trendTypeClass[trend.home.exp]"><i></i></em></div>
                            <div class="fczs-txt">近期状态</div>
                        </div>
                    </div>
                    <div class="vic-cont ">
                        <template  v-if="vtype === 1">
                            <div class="line-horiz" v-if="trend.home.level" :style="trendTopAway"><em>{{trend.away.level}}</em></div>
                            <ul class="vic-list vic-list-fc">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose': item.value<0,'vic-item-win': item.value>0,'vic-item-coming':!item.value&&item.fid}" v-for="(item, idx) in trend.home.coords">
                                    <span :style="trendHeightHome[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <span v-if="!item.value&&!item.fid" ></span>
                                </li>
                            </ul>
                        </template>
                        <template v-if="vtype === 2">
                            <div class="line-horiz" v-if="trend.home.level" :style="trendTotalTopAway"><em>{{trend.away.level}}</em></div>
                            <ul class="vic-list">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose':item.state=='0','vic-item-win':item.state=='3','vic-item-coming':!item.state}" v-for="(item, idx) in trend.home.coords">
                                    <span :style="totalTrendHeightHome[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <span v-if="!item.value&&!item.fid" ></span>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <p class="jqzs-notice" v-if="vtype === 1"> 近20天分差走势</p>
                    <p class="jqzs-notice" v-if="vtype === 2"> 近20天总分走势</p>
                </div>

            </div>

            <!--图形解释-->
            <div class="fczs-notice" v-if="vtype === 1">
                <span><em class="point-red"></em>胜</span>
                <span><em class="point-blue"></em>负</span>
                <span><em class="xs">---</em>日期</span>
                <span><em class="zx">——</em>本场让分盘口</span>
            </div>
            <div class="fczs-notice" v-else>
                <span><em class="point-red"></em>大分</span>
                <span><em class="point-blue"></em>小分</span>
                <span><em class="xs">---</em>日期</span>
                <span><em class="zx">——</em>本场大小分盘口</span>
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
import {mTypes, aTypes} from '~store/lqdetail'
export default {
    props: {
        baseInfo: {
            type: Object,
            required: true
        },
        trends: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            trendType: {
                great: '极佳',
                good: '佳',
                steady: '平稳',
                bad: '差',
                terrible: '极差'
            },
            trendTypeClass: {
                great: 'zsjj',
                good: 'zsj',
                steady: 'zspw',
                bad: 'zsc',
                terrible: 'zsjc'
            },
            vtype: 1,
            trendFid: null,
            trend: this.trends
        }
    },
    computed: {
        totalTrendHeightHome () {
            if (this.vtype === 1) return []
            return this.trend.home.coords.map((item) => {
                if (!item.value) return ''
                return `height: ${this.makeTotalTrendHeight(item.value - 170, 75)}%`
            })
        },
        totalTrendHeightAway () {
            if (this.vtype === 1) return []
            return this.trend.away.coords.map((item) => {
                if (!item.value) return ''
                return `height: ${this.makeTotalTrendHeight(item.value - 170, 75)}%`
            })
        },
        trendHeightHome () {
            if (this.vtype === 2) return []
            return this.trend.home.coords.map((item) => {
                if (!item.value) return ''
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendHeightAway () {
            if (this.vtype === 2) return []
            return this.trend.away.coords.map((item) => {
                if (!item.value) return ''
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendTopHome () {
            if (this.vtype === 2) return ''
            return `top: ${this.makeTrendTop(this.trend.home.level, 20)}%`
        },
        trendTopAway () {
            if (this.vtype === 2) return ''
            return `top: ${this.makeTrendTop(0 - this.trend.home.level, 20)}%`
        },
        trendTotalTopHome () {
            if (this.vtype === 1) return ''
            return `top: ${this.makeTrendTop(this.trend.home.level - 170, 75)}%`
        },
        trendTotalTopAway () {
            if (this.vtype === 1) return ''
            return `top: ${this.makeTrendTop(this.trend.home.level - 170, 75)}%`
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        noEmptyFlag () {
            return this.noEmpty(this.trend)
        }
    },
    methods: {
        makeTotalTrendHeight (val, total) {
            if (val > 0) {
                return val * 100 / total
            }
            return 5
        },
        makeTrendHeight (val, total) {
            if (val > 0) {
                return val * 100 / total
            }
            if (val < 0) {
                return (0 - val * 100 / total)
            }
            return 0
        },
        makeTrendTop (val, total) {
            if (val > 0) {
                return (100 - val * 100 / total) / 2
            }
            if (val < 0) {
                return ((((0 - val) / total) * 100) / 2 + 50)
            }
            return 0
        },
        async updateTrendData ({vtype}) {
            this.vtype = vtype
            this.trend = null
            this.trendFid = null
            this.$store.commit('startOneRefresh')
            const {fid, homeid, awayid, matchtime} = this.baseInfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            if (this.$store.state.lqdetail.analysis.js.trend[vtype]) {
                this.trend = this.$store.state.lqdetail.analysis.js.trend[vtype]
                this.$store.commit('endOneRefresh')
                return
            }
            await this.$store.dispatch(aTypes.getAnalysisJsTrend, {fid, homeid, awayid, matchdate, vtype: vtype}).then((data) => {
                this.trend = data
                console.log(data)
            })
            this.$store.commit('endOneRefresh')
        },
        noEmpty (obj) {
            if (obj) return !!Object.keys(obj).length
            return false
        }
    },
    watch: {
        loaded (loaded) {
            if (loaded) { this.$store.commit(mTypes.updateScTime) }
        }
    }
}
</script>

<style lang="css">
</style>
