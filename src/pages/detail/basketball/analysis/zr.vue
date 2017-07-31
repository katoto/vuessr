<template>
    <div>
        <best3 :best3='best3' v-if="best3"></best3>
        <members :baseInfo="baseInfo" :members='members' v-if="members"></members>
        <div class="item-loader" v-if="!(best3 && members)">
            <div class="la-ball-pulse la-2x">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes, aTypes} from '~store/lqdetail'
import best3 from '~components/detail/basketball/analysis/zr/best3.vue'
import members from '~components/detail/basketball/analysis/zr/members.vue'
export default {
    async asyncData ({store, route: {params}}) {
        const {homeid, awayid, seasonid} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
        await store.dispatch(aTypes.getAnalysisZr, {homeid, awayid, seasonid, vtype: 1})
    },
    components: {
        best3,
        members
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        analysis () {
            return this.$store.state.lqdetail.analysis
        },
        best3 () {
            return this.analysis.zr.best3
        },
        members () {
            return this.analysis.zr.members
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        refreshTime () { // 用户点击刷新按钮时间戳
            return this.$store.state.refreshTime
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {homeid, awayid, seasonid} = this.baseInfo // baseInfo 保证有数据了
            await this.$store.dispatch(aTypes.getAnalysisZr, {homeid, awayid, seasonid, vtype: 1})
            this.$store.commit('endOneRefresh')
        }
    },
    mounted () {
        this.fetchData()
    },
    watch: {
        loaded (loaded) {
            if (loaded) { this.$store.commit(mTypes.updateScTime) }
        },
        refreshTime () {
            this.fetchData()
        }
    }
}
</script>

<style >
    .tContent {
        display: none;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }
    .gl-box,
    .zr-box {
        background: #fff
    }
    .qy-databox {
        padding: 0 .4rem 0 .4rem
    }
    .dataItem {
        display: table;
        height: 1.333333rem;
        width: 100%
    }

    .dataItem li {
        display: table-cell;
        color: #515e6d;
        vertical-align: middle;
        height: 1.733333rem
    }

    .dataItem .itemL {
        text-align: left;
        width: 2.8rem;
        padding-left: .4rem
    }

    .dataItem .itemC {
        text-align: center;
        color: #aab5bd
    }

    .dataItem .itemR {
        text-align: right;
        width: 2.8rem;
        padding-right: .4rem
    }

    [data-dpr="1"] .dataItem .num {
        font-size:   23px
    }

    [data-dpr="2"] .dataItem .num {
        font-size: 46px
    }

    [data-dpr="3"] .dataItem .num {
        font-size: 69px
    }

    .dataItem .red2 {

        color: #d3553d
    }
    .dataItem .green2 {
        color: #36a171
    }

    .dataItem .blue {
        color: #437ba8
    }

    .dataItem .item-info {
        display: block;
        color: #aab5bd
    }

    [data-dpr="1"] .dataItem .item-info {
        font-size: 11px
    }

    [data-dpr="2"] .dataItem .item-info {
        font-size: 22px
    }

    [data-dpr="3"] .dataItem .item-info {
        font-size: 33px
    }

    .dataItem .item-tit {
        color: #242c35;
        display: block;
        height: .72rem;
        line-height: .72rem
    }

    [data-dpr="1"] .dataItem .item-tit {
        font-size: 16px
    }

    [data-dpr="2"] .dataItem .item-tit {
        font-size: 32px
    }

    [data-dpr="3"] .dataItem .item-tit {
        font-size: 48px
    }
    .qy-icon {
        width: 1.2rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -.56rem
    }

    .qy-icon img {
        max-width: 1.2rem
    }
    .qy-info {
        color: #aab5bd;
        font-size: .293333rem
    }
    .fx-zr-box .itemR .qy-icon {
        right: 0;
        left: inherit
    }

    .fx-zr-box .itemC {
        width: 3.466667rem;
        height: 1.733333rem;
        line-height: 1.733333rem;
        overflow: hidden;
        clear: both
    }

    .itemC .qy-score {
        font-size: .56rem;
        color: #515e6d;
        float: left;
        width: 1.2rem;
        text-align: right
    }

    .itemC .qy-score:last-child {
        float: right;
        text-align: left
    }
    .other-qy {
        padding: 0 .4rem
    }
    .other-qy {
        border-bottom: 1px solid #efefef;
        padding-bottom: .266667rem
    }
    .other-qy .dataItem,
    .other-qy li {
        height: .8rem
    }

    .other-qy .itemC {
        height: .8rem;
        line-height: .8rem
    }

    .other-qy .itemC .qy-score {
        font-size: .346667rem;
        color: #515e6d
    }
    .fx-zr-box .itemL {
         padding-left: 1.4rem;
         width: 1.533333rem
     }

    .fx-zr-box .itemR {
        padding-right: 1.4rem;
        width: 1.533333rem
    }

    .fx-zr-box .itemL,
    .fx-zr-box .itemR {
        position: relative
    }
    .dataBox {
        padding: .4rem .4rem .266667rem .4rem;
        border-bottom: 1px solid #f4f4f4;
        text-align: center
    }
    .fx-zr-box .dataBox {
        border-bottom: 0;
        padding-bottom: 0;
        padding-top: .2rem
    }

    .zr-detail {
        overflow: hidden;
        width: 9.2rem;
        position: relative;
    }
    .zr-detail-left {
        float: left;
        width: 2.266667rem;
        color: #242c35;
        font-size: .32rem;
        position: absolute;
        left: 0;
        text-align: left
    }

    .zr-detail-left li {
        height: 1.066667rem;
        line-height: 1.066667rem;
        width: 2.266667rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .zr-detail-left .zr-detail-tit,
    .zr-detail-right .zr-detail-tit {
        height: .706667rem;
        line-height: .706667rem;
        color: #aab5bd
    }

    .zr-detail-right li ul li {
        float: left;
        width: 1.6rem
    }
    .zr-detail-left li em {
        width: .4rem;
        height: .4rem;
        background: #d25138;
        font-size: .293333rem;
        color: #fff;
        line-height: .4rem;
        text-align: center;
        display: inline-block;
        margin-left: .133333rem;
        border-radius: .066667rem
    }
    .scroll-cont {
        width: 7.066667rem;
        overflow: hidden;
        float: left;
        position: relative;
        left: 2.066667rem
    }
    .scroll-cont .zr-detail-right {
        overflow: scroll
    }
    .zr-detail-right .zr-detailer {
        width: 40.133333rem;
        height: 1.066667rem
    }

    .table-zs .zr-detailer {
        width: 36.933333rem
    }

    .table-ybhh .zr-detailer {
        width: 36.8rem
    }

    .table-sslfz .zr-detailer {
        width: 33.6rem
    }

    .zr-detail-left .zr-detail-tit,
    .zr-detail-right .zr-detail-tit {
        height: .706667rem;
        line-height: .706667rem;
        color: #aab5bd
    }
    .zr-detail-tit ul {
        height: .706667rem;
        line-height: .706667rem
    }
    .zr-detail-right li ul li {
        float: left;
        width: 1.6rem
    }
    .zr-detailer ul {
        height: 1.066667rem;
        line-height: 1.066667rem
    }
    .zd-arrow{
        background: url(~assets/style/images/detail/detail-icon.png) no-repeat;
        background-size: .533333rem 13.333333rem
    }
    .zd-arrow {
        width: .533333rem;
        height: .177rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -.2rem 0 0 -.266667rem;
        background-position: center -10.84rem
    }

    .rotate180 {
        -webkit-animation: all .2s linear;
        animation: all .2s linear;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
    .refresh-box {
        width: 1.066667rem;
        height: 1.066667rem;
        position: fixed;
        bottom: 1.706667rem;
        right: .533333rem;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: .9;
        z-index: 9;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg)
    }

    .refresh-icon {
        width: 1.066667rem;
        height: 1.066667rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAq1BMVEX2Pz8AAAD2Pz/2Pz//+fn+8PD90tL2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/+8vL7q6v4YWH3S0v2Pz/2Pz/6ior5e3v2Pz/8w8P5hIT5fX32Pz//9/f+4eH8t7f6kpL4b2/4amr3XV32Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/8xcX/+/v+6en+5eX9y8v4cXH2RET2Pz/2Pz/2Pz/2Pz/8wsL///8dBChgAAAAOHRSTlPZAAi//vv1yDwb0LSE/O3f3GVd5+S68uXkzf348Oji4d6poZ2OTBHCfk5EE/L++vn04tp6QiMP8qyEnYEAAAKKSURBVFjDrNPZdqpAEIXhnUZlTEAUCQ44mxgznQxr5f2f7HQHMkhV04L57tTml0ILF/V2Tny78m0Pnp34q9vY2RkuqAuKt1cfhP/6JloFnY0HDW/jNA2K2EItKxYNgqJvw8jui1ODWwsnsbYnBd01TrZ2zcF9hgayvSEoAjQUiLrgYYnGlgd90E3QQuLqgu83aOXmnQ+6qteu6HLBXYLWkh0NiiXOsBQkGOAsQTW4x5n2x0E3w5ky9yi4hlZEXvDWv4Nb6AzvO91rlK67nfshdLY/QWGBl04+pC5KXfVqkoJnie9gH6xFTwWOg0pvAVb/KyhscNJx2fsZuSyOB+DYogzG4FwVF49y/JKPinevwInLoAXGtJguREVYPIcpGFYRdLT315mBMeto79H5DG5ADdQ1l3Ow5pfq0wGojQoKD8RirHohNEJVHC9AeEIG70D11Lw5tHI1dQ/UnQwGIFI10gw1ZupECiKQwQTEhHw/O8MERHKBA4jhhxSiVqjODEEc4IAYqf8zOOZDDugeR+qJ/4NBrn63iO4zAnbiRxg9sjMHWLFLMoXRlF2XFXxUPXNrwC/TM6p82Kh6kifnMJrLY0+ospGhSu1VBKNIbSddPlAP8uQLjF7ksQdQ3l8H7b8e+X9zZowDIAhDUWMHo4wuHoEQFwfw/jczjhooUt4gB+hC+/v/q8CfgrcN3tj46OHi0CVfe0a+ugR2ywgsvQLwJYWvUXzR01aEN0u8nasbzsfMHKdqOHVLvBosMW/a+VjBBx8+mvHhkY+3fADnEQEPMXjMcr8otnoSi6jKWeq5uQzTkgWmJRX3+dZ6fqwAydAGJAONTGGoS2NnGIyz6P4Px4XX+WNYpk/njwuTZnCjF4SGqAAAAABJRU5ErkJggg==) center center no-repeat;
        background-size: 1.066667rem;
        display: inline-block
    }



</style>
