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
                <!-- away status -->
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
                            <div class="line-horiz" v-if="trend.away.level" :style="trendTopAway"><em>{{trend.away.level}}</em></div>
                            <ul class="vic-list vic-list-fc">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose': item.value<0,'vic-item-win': item.value>0,'vic-item-coming':!item.value&&item.fid}" v-for="(item, idx) in trend.away.coords">
                                    <span :style="trendHeightAway[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <!-- <span v-if="!item.value&&!item.fid" ></span> -->
                                </li>
                            </ul>
                        </template>
                        <template v-if="vtype === 2">
                            <div class="line-horiz" v-if="trend.away.level" :style="trendTotalTopAway"><em>{{trend.away.level}}</em></div>
                            <ul class="vic-list">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose':item.state=='0','vic-item-win':item.state=='3','vic-item-coming':!item.state}" v-for="(item, idx) in trend.away.coords"  v-if="vtype === 2">
                                    <span :style="totalTrendHeightAway[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <!-- <span v-if="!item.value&&!item.fid" ></span> -->
                                </li>
                            </ul>
                        </template>
                    </div>
                    <p class="jqzs-notice" v-if="vtype === 1"> 近20天分差走势</p>
                    <p class="jqzs-notice" v-if="vtype === 2"> 近20天总分走势</p>
                </div>

                <!-- home status -->
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
                            <div class="line-horiz" v-if="trend.home.level" :style="trendTopHome"><em>{{0 - trend.home.level}}</em></div>
                            <ul class="vic-list vic-list-fc">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose': item.value<0,'vic-item-win': item.value>0,'vic-item-coming':!item.value&&item.fid}" v-for="(item, idx) in trend.home.coords">
                                    <span :style="trendHeightHome[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <!-- <span v-if="!item.value&&!item.fid" ></span> -->
                                </li>
                            </ul>
                        </template>
                        <template v-if="vtype === 2">
                            <div class="line-horiz" v-if="trend.home.level" :style="trendTotalTopHome"><em>{{trend.home.level}}</em></div>
                            <ul class="vic-list">
                                <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose':item.state=='0','vic-item-win':item.state=='3','vic-item-coming':!item.state}" v-for="(item, idx) in trend.home.coords">
                                    <span :style="totalTrendHeightHome[idx]">
                                        <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                                    </span>
                                    <!-- <span v-if="!item.value&&!item.fid" ></span> -->
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
        <feed-back-no-data v-else></feed-back-no-data>


    </div>

</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import feedBackNoData from '~components/detail/feedBackNoData.vue'

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
    components: {
        feedBackNoData
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
                if (!item.value) return 'height: 0%'
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendHeightAway () {
            if (this.vtype === 2) return []
            return this.trend.away.coords.map((item) => {
                if (!item.value) return 'height: 0%'
                return `height: ${this.makeTrendHeight(item.value, 20)}%`
            })
        },
        trendTopHome () {
            if (this.vtype === 2) return ''
            return `top: ${this.makeTrendTop(0 - this.trend.home.level, 20)}%`
        },
        trendTopAway () {
            if (this.vtype === 2) return ''
            return `top: ${this.makeTrendTop(this.trend.away.level, 20)}%`
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

<style scoped>
    .zhedie-box{background:#fff}
    .zhedie-box:last-child{margin-bottom:0}

    .time-item{float:right;font-size:.293333rem}
    .time-item li{background:#efefef;color:#aab5bd;height:.613333rem;line-height:.613333rem;padding:0 .2rem;margin-left:.133333rem;text-align:center;border-radius:.306667rem;border:1px solid #dadee4;float:left;box-sizing:border-box}
    .time-item .time-item-cur{color:#242c35;background:#fff;border:1px solid #dadee4}

    .pm-namel{background:#fff;line-height:1.066667rem;padding:.213333rem .4rem 0;color:#333}
    [data-dpr="1"] .pm-namel{font-size:14px}
    [data-dpr="2"] .pm-namel{font-size:28px}
    [data-dpr="3"] .pm-namel{font-size:42px}

    .gl-zjBox{margin-top:.066667rem}
    .fx-zr-box .dataBox{border-bottom:0;padding-bottom:0;padding-top:.2rem}
    .qy-databox{padding:0 .4rem 0 .4rem}
    .other-qy{padding:0 .4rem}
    .qy-databox:active{background:#f4f4f4}
    .bkb-icon{width:.546667rem;height:1.093333rem;display:inline-block;background:url(/mobile/touch/images/bifen/bkb.png) no-repeat;background-size:cover;position:absolute;top:.76rem;left:1.52rem}
    .vic-cont{position:relative;width:9.2rem;margin:0 auto}
    .vic-list{width:7.466667rem;margin:0 auto;margin-bottom:.266667rem;margin-top:.666667rem}
    .jqzs-zf .vic-list{height:1.666667rem}
    .jqzs-fc .vic-list{height:1.066667rem;padding-bottom:1.066667rem}
    .vic-item-empty{float:left;width:.266667rem;margin-right:.093333rem;position:relative;height:100%}
    .vic-item-empty span{text-align:center;height:100%;border-bottom:1px solid #aab5bd;position:absolute;bottom:0;width:.266667rem;display:inline-block}
    .vic-item-lose span{display:inline-block;width:.266667rem;background:#c6d7e5;height:80%;position:absolute;bottom:1px;left:0}
    .vic-item-win span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f1cac3;height:50%}
    .vic-item-coming span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f0f0f0;height:30%}
    .vic-list .vic-item-win:nth-child(2n) span{height:100%}
    .vic-list .vic-item-lose:nth-child(2n) span{height:20%}
    .vic-list-fc .vic-item-empty{height:100%}
    .vic-list-fc .vic-item-lose span{bottom:inherit;top:0;margin-top:1.066667rem}
    .jqzs-fc .vic-cont .vic-item-win span{height:100%}
    .line-horiz{background:#d25138;height:1px;position:absolute;top:0;width:7.6rem;z-index:90;left:50%;margin-left:-3.8rem}
    .line-horiz em{width:.84rem;height:.4rem;background:#d25138;color:#fff;font-size:.266667rem;line-height:.4rem;text-align:center;position:absolute;right:-.8rem;top:50%;margin-top:-.2rem;display:inline-block}
    .line-ver{height:.666667rem;display:inline-block;width:1px;background:#aab5bd;position:absolute;bottom:0}
    .line-ver i{min-width:2.8rem;height:.8rem;line-height:.333333rem;text-align:left;display:inline-block;position:absolute;left:-.666667rem;top:-.64rem;z-index:90}
    .fczs-cont{overflow:hidden;clear:both;margin-top:.4rem}
    .fczs{width:3.6rem;float:left;height:.933333rem;margin-left:.106667rem;padding-top:.133333rem}
    .fczs-jt{width:.706667rem;height:.426667rem;line-height:.426667rem;background:#5c788f;color:#fff;font-size:.32rem;text-align:right;border-radius:.106667rem;margin-bottom:.133333rem;position:relative;padding-right:.48rem}
    .zsc,.zsj,.zsjc,.zsjj,.zspw{width:.453333rem;height:.426667rem;position:absolute;right:0;top:0}
    .zsjj i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-jj.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem}
    .zsj i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-jj.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem;transform:rotate(45deg);-webkit-transform:rotate(45deg)}
    .zspw i{display:inline-block;width:.293333rem;height:.213333rem;background:url(~assets/style/images/detail/zous-pw.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.106667rem;left:50%;margin-left:-.146667rem}
    .zsc i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-cha.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem;transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}
    .zsjc i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-cha.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem}
    .fczs-cont .pm-img{width:1.066667rem;height:1.066667rem}
    .fczs-cont .pm-img img{width:auto;max-width:100%;max-height:100%}
    .fczs-txt{height:.4rem;line-height:.4rem;color:#aab5bd;font-size:.293333rem;margin-top:.053333rem}
    .fczs-notice{font-size:.293333rem;color:#515e6d;padding-bottom:.8rem;text-align:center}
    .fczs-notice span{margin:0 .186667rem}
    .fczs-notice span em{display:inline-block}
    .fczs-notice span .point-red{background:#f1cac3;width:.12rem;height:.12rem;margin-right:.106667rem}
    .fczs-notice span .point-blue{background:#c6d7e5;width:.12rem;height:.12rem;margin-right:.106667rem}
    .fczs-notice span .xs{color:#c6d7e5;margin-right:.053333rem}
    .fczs-notice span .zx{color:#d25138;margin-right:.053333rem}
    .jqzs-notice{text-align:center;color:#aab5bd;font-size:.293333rem;padding-bottom:.533333rem}
    .mcjs-list{clear:both;padding:.533333rem .266667rem;overflow:hidden}
    .mcjs-list li{width:2.133333rem;height:.853333rem;float:left;background:#ebf1f5;color:#242c35;font-size:.373333rem;line-height:.853333rem;text-align:center;margin:.133333rem .106667rem;border-radius:.133333rem}
    .mcjs-list .cur{background:#5c788f;color:#fff}
    .mcjs-detail{padding:0 .4rem;font-size:.373333rem;color:#515e6d}
    .mcjs-tit{font-size:.426667rem;color:#242c35;font-weight:700;height:.8rem;line-height:.8rem}
    .mcjs-detail p{line-height:.666667rem}
    .gxsj{width:.2rem;height:.2rem;display:inline-block;background:url(~assets/style/images/detail/qhsj.png) no-repeat;background-size:cover;margin-left:.053333rem}
    .lq-img,.pm-img,.ps-img{width:.6rem;position:relative;float:left}
    .pm-img{height:1.066667rem}
    .ps-img{height:.8rem}
    .lq-img{height:1.06667rem}

</style>
