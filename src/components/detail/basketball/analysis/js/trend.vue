<template>
    <div class="zhedie-box">
        <div class="zj-nav noborder" drunk-init-data="trendType='1'"> 球队状态
            <ul class="time-item">
                <li class="click-fc" :class="{'time-item-cur': vtype === '1'}" v-tap="{methods: updateTrendData, vtype: '1'}">分差</li>
                <li class="click-zf" :class="{'time-item-cur': vtype === '2'}" v-tap="{methods: updateTrendData, vtype: '2'}">总分</li>
            </ul>
        </div>
        <template v-if="noEmptyFlag">
            <template v-if="vtype === '1'">
                <div class="zhedie show" v-if="noEmptyFlagHome && noEmptyFlagAway">
                    <trend-box :baseInfo="baseInfo" type="分差" :trends="trends" hoa="away" :trendTop="trendTopAway" :trendHeight="trendHeightAway" ></trend-box>
                    <trend-box :baseInfo="baseInfo" type="分差" :trends="trends" hoa="home" :trendTop="trendTopHome" :trendHeight="trendHeightHome" ></trend-box>
                    <!-- <item-loader  v-if="!loaded"></item-loader> -->
                </div>
                <feed-back-no-data v-else></feed-back-no-data>
                <div class="fczs-notice" v-if="noEmptyFlagHome || noEmptyFlagAway">
                    <span><em class="point-red"></em>胜</span>
                    <span><em class="point-blue"></em>负</span>
                    <span><em class="xs">---</em>日期</span>
                    <span><em class="zx">——</em>本场让分盘口</span>
                </div>
            </template>
            <template v-else>
                <div class="zhedie show" v-if="noEmptyFlagHome && noEmptyFlagAway">
                    <trend-box :baseInfo="baseInfo" type="总分"  :trends="trends" hoa="away" :trendTop="trendTotalTopAway" :trendHeight="totalTrendHeightAway" ></trend-box>
                    <trend-box :baseInfo="baseInfo" type="总分"  :trends="trends" hoa="home" :trendTop="totalTrendTopHome" :trendHeight="totalTrendHeightHome" ></trend-box>
                    <!-- <item-loader  v-if="!loaded"></item-loader> -->
                </div>
                <feed-back-no-data v-else></feed-back-no-data>
                <!--图形解释-->
                <div class="fczs-notice" v-if="noEmptyFlagHome || noEmptyFlagAway">
                    <span><em class="point-red"></em>大分</span>
                    <span><em class="point-blue"></em>小分</span>
                    <span><em class="xs">---</em>日期</span>
                    <span><em class="zx">——</em>本场大小分盘口</span>
                </div>
            </template>
        </template>
        <feed-back-no-data v-else></feed-back-no-data>

    </div>

</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import feedBackNoData from '~components/detail/feedBackNoData.vue'
import itemLoader from '~components/detail/itemLoader.vue'
import trendBox from '~components/detail/basketball/analysis/js/trendBox.vue'

export default {
    components: {
        feedBackNoData, itemLoader, trendBox
    },
    props: {
        baseInfo: {
            type: Object,
            required: true
        },
        trends: {
            type: Object,
            required: true
        },
        vtype: {
            type: String,
            required: true
        }
    },
    computed: {
        totalTrendHeightHome () {
            if (this.vtype === '1') return []
            return this.trends.home.coords.map((item) => {
                if (!item.value) return 'height: 0%'
                return `height: ${this.makeTotalTrendHeight(item.value - 170, 75)}%`
            })
        },
        totalTrendHeightAway () {
            if (this.vtype === '1') return []
            return this.trends.away.coords.map((item) => {
                if (!item.value) return 'height: 0%'
                return `height: ${this.makeTotalTrendHeight(item.value - 170, 75)}%`
            })
        },
        trendHeightHome () {
            if (this.vtype === '2') return []
            return this.trends.home.coords.map((item) => {
                if (!item.value) return 'height: 0%'
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendHeightAway () {
            if (this.vtype === '2') return []
            return this.trends.away.coords.map((item) => {
                if (!item.value) return 'height: 0%'
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendTopHome () {
            if (this.vtype === '2') return ''
            return `top: ${this.makeTrendTop(0 - this.trends.home.level, 20)}%`
        },
        trendTopAway () {
            if (this.vtype === '2') return ''
            return `top: ${this.makeTrendTop(this.trends.away.level, 20)}%`
        },
        totalTrendTopHome () {
            if (this.vtype === '1') return ''
            return `top: ${this.makeTrendTop(this.trends.home.level - 170, 75)}%`
        },
        trendTotalTopAway () {
            if (this.vtype === '1') return ''
            return `top: ${this.makeTrendTop(this.trends.home.level - 170, 75)}%`
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        noEmptyFlag () {
            return this.noEmpty(this.trends)
        },
        noEmptyFlagHome () {
            if (this.noEmptyFlag) {
                return this.trends.home.coords.slice(0, 10).some((item) => {
                    return item.state !== ''
                })
            }
            return false
        },
        noEmptyFlagAway () {
            if (this.noEmptyFlag) {
                return this.trends.away.coords.slice(0, 10).some((item) => {
                    return item.state !== ''
                })
            }
            return false
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
            this.$store.commit('startOneRefresh')
            const {fid, homeid, awayid, matchtime} = this.baseInfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            // if (this.$store.state.lqdetail.analysis.js.trend[vtype]) {
            //     this.trends = this.$store.state.lqdetail.analysis.js.trend[vtype]
            //     this.$store.commit('endOneRefresh')
            //     return
            // }
            await this.$store.dispatch(aTypes.getAnalysisJsTrend, {fid, homeid, awayid, matchdate, vtype: vtype})
            this.$store.commit(mTypes.setVtype, vtype)
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

<style scoped>
    .zhedie-box{background:#fff}
    .zhedie-box:last-child{margin-bottom:0}

    .time-item{float:right;font-size:.293333rem}
    .time-item li{background:#efefef;color:#aab5bd;height:.613333rem;line-height:.613333rem;padding:0 .2rem;margin-left:.133333rem;text-align:center;border-radius:.306667rem;border:1px solid #dadee4;float:left;box-sizing:border-box}
    .time-item .time-item-cur{color:#242c35;background:#fff;border:1px solid #dadee4}


    .fx-zr-box .dataBox{border-bottom:0;padding-bottom:0;padding-top:.2rem}
    .jqzs-zf .vic-list{height:1.666667rem}
    .jqzs-fc .vic-list{height:1.066667rem;padding-bottom:1.066667rem}
    .vic-item-empty span{text-align:center;height:100%;border-bottom:1px solid #aab5bd;position:absolute;bottom:0;width:.266667rem;display:inline-block}
    .vic-item-lose span{display:inline-block;width:.266667rem;background:#c6d7e5;height:80%;position:absolute;bottom:1px;left:0}
    .vic-item-win span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f1cac3;height:50%}
    .vic-item-coming span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f0f0f0;height:30%}
    .vic-list .vic-item-win:nth-child(2n) span{height:100%}
    .vic-list .vic-item-lose:nth-child(2n) span{height:20%}
    .vic-list-fc .vic-item-empty{height:100%}
    .vic-list-fc .vic-item-lose span{bottom:inherit;top:0;margin-top:1.066667rem}
    .jqzs-fc .vic-cont .vic-item-win span{height:100%}
    .line-horiz em{width:.84rem;height:.4rem;background:#d25138;color:#fff;font-size:.266667rem;line-height:.4rem;text-align:center;position:absolute;right:-.8rem;top:50%;margin-top:-.2rem;display:inline-block}
    .line-ver i{min-width:2.8rem;height:.8rem;line-height:.333333rem;text-align:left;display:inline-block;position:absolute;left:-.666667rem;top:-.64rem;z-index:90}
    .zsjj i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-jj.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem}
    .zsj i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-jj.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem;transform:rotate(45deg);-webkit-transform:rotate(45deg)}
    .zspw i{display:inline-block;width:.293333rem;height:.213333rem;background:url(~assets/style/images/detail/zous-pw.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.106667rem;left:50%;margin-left:-.146667rem}
    .zsc i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-cha.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem;transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}
    .zsjc i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-cha.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem}
    .fczs-cont .pm-img{width:1.066667rem;height:1.066667rem}
    .fczs-cont .pm-img img{width:auto;max-width:100%;max-height:100%}
    .fczs-notice{font-size:.293333rem;color:#515e6d;padding-bottom:.8rem;text-align:center}
    .fczs-notice span{margin:0 .186667rem}
    .fczs-notice span em{display:inline-block}
    .fczs-notice span .point-red{background:#f1cac3;width:.12rem;height:.12rem;margin-right:.106667rem}
    .fczs-notice span .point-blue{background:#c6d7e5;width:.12rem;height:.12rem;margin-right:.106667rem}
    .fczs-notice span .xs{color:#c6d7e5;margin-right:.053333rem}
    .fczs-notice span .zx{color:#d25138;margin-right:.053333rem}
    .mcjs-list li{width:2.133333rem;height:.853333rem;float:left;background:#ebf1f5;color:#242c35;font-size:.373333rem;line-height:.853333rem;text-align:center;margin:.133333rem .106667rem;border-radius:.133333rem}
    .mcjs-list .cur{background:#5c788f;color:#fff}
    .mcjs-detail p{line-height:.666667rem}

</style>
