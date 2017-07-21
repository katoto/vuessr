<template>
    <div class="zhedie-box">
        <div class="zj-nav noborder" drunk-init-data="trendType='1'"> 球队状态
            <ul class="time-item">
                <li class="click-fc" :class="{'time-item-cur': vtype == 1}" v-tap="{methods: updateTrendData, vtype: 1}">分差</li>
                <li class="click-zf" :class="{'time-item-cur': vtype == 2}" v-tap="{methods: updateTrendData, vtype: 2}">总分</li>
            </ul>
        </div>

        <div class="zhedie show">
            <div class="jqzs-fc" v-if="trend.away">
                <div class="pm-namel fczs-cont ">
                    <div class="pm-img">
                        <img :src="baseinfo.awaylogo">
                    </div>
                    <div class="fczs">
                        <div class="fczs-jt">{{trendType[trend.away.exp]}}<em :class="trendTypeClass[trend.away.exp]"><i></i></em></div>
                        <div class="fczs-txt">近期状态</div>
                    </div>
                </div>
                <div class="vic-cont ">
                    <!-- <div class="line-horiz"  ><em></em></div> -->
                    <ul class="vic-list vic-list-fc">
                        <li class="vic-item-empty" :class="{'vic-item-lose': item.value<0,'vic-item-win': item.value>0,'vic-item-coming':!item.value&&item.fid}" v-for="(item, idx) in trend.away.coords">
                            <span :style="trendHeightAway[idx]" v-if="vtype === 1"></span>
                            <span :style="totalTrendHeightAway[idx]" v-if="vtype === 2"></span>
                            <!-- <span drunk-if="!item.value&&!item.fid" ></span> -->
                        </li>
                    </ul>
                </div>
                <p class="jqzs-notice"> 近20天分差走势</p>
            </div>
            <div class="jqzs-fc" v-if="trend.home">
                <div class="pm-namel fczs-cont ">
                    <div class="pm-img">
                        <img :src="baseinfo.homelogo">
                    </div>
                    <div class="fczs">
                        <div class="fczs-jt">{{trendType[trend.home.exp]}}<em :class="trendTypeClass[trend.home.exp]"><i></i></em></div>
                        <div class="fczs-txt">近期状态</div>
                    </div>
                </div>
                <div class="vic-cont ">
                    <ul class="vic-list vic-list-fc">
                        <li class="vic-item-empty" :class="{'vic-item-lose': item.value<0,'vic-item-win': item.value>0,'vic-item-coming':!item.value&&item.fid}" v-for="(item, idx) in trend.home.coords">
                            <span :style="trendHeightHome[idx]" v-if="vtype === 1"></span>
                            <span :style="totalTrendHeightHome[idx]" v-if="vtype === 2"></span>
                        </li>
                    </ul>
                </div>
                <p class="jqzs-notice"> 近20天分差走势</p>
            </div>

        </div>

        <!--图形解释-->
        <div class="fczs-notice" drunk-if="basketBallTrend_1&&trendType=='1'">
            <span><em class="point-red"></em>胜</span>
            <span><em class="point-blue"></em>负</span>
            <span><em class="xs">---</em>日期</span>
            <span><em class="zx">——</em>本场让分盘口</span>
        </div>
        <div class="fczs-notice" drunk-if="basketBallTrend_2&&trendType=='2'">
            <span><em class="point-red"></em>大分</span>
            <span><em class="point-blue"></em>小分</span>
            <span><em class="xs">---</em>日期</span>
            <span><em class="zx">——</em>本场大小分盘口</span>
        </div>

    </div>

</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail/mchao'
export default {
    props: {
        baseinfo: {
            type: Object,
            required: true
        },
        trend: {
            type: Object,
            required: true
        }
    },
    data() {
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
            vtype: 1
        }
    },
    computed: {
        totalTrendHeightHome() {
            return this.trend.home.coords.map((item) => {
                return `height: ${this.makeTotalTrendHeight(item.value, 20)}%`
            })
        },
        totalTrendHeightAway() {
            return this.trend.away.coords.map((item) => {
                return `height: ${this.makeTotalTrendHeight(item.value, 20)}%`
            })
        },
        trendHeightHome() {
            return this.trend.home.coords.map((item) => {
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendHeightAway() {
            return this.trend.away.coords.map((item) => {
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        loaded () {
            return this.$store.state.refreshing === 0
        }
    },
    methods: {
        makeTotalTrendHeight(val, total) {
            if (val > 0) {
                return val * 100 / total;
            }
            return 5;
        },
        makeTrendHeight(val, total) {
            if (val > 0) {
                return val * 100 / total;
            }
            if (val < 0) {
                return (0 - val * 100 / total);
            }
            return 0;
        },
        async updateTrendData({vtype}) {
            this.vtype = vtype
            this.$store.commit('startOneRefresh')
            const {fid, homeid, awayid, matchtime} = this.baseinfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            await this.$store.dispatch(aTypes.getAnalysisJsTrend, {fid, homeid, awayid, matchdate, vtype: vtype})
            this.$store.commit('endOneRefresh')
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
