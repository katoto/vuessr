<template>
    <div class="">
        <strength :baseInfo='baseInfo' :strength='strength' :stats='stats' v-if="strength"></strength>
        <trend :baseInfo='baseInfo' :trends='trend' v-if="trend"></trend>
        <div class="item-loader" v-if="!(strength && trend)">
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
import strength from '~components/detail/basketball/analysis/js/strength.vue'
import trend from '~components/detail/basketball/analysis/js/trend.vue'

export default {
    async asyncData ({store, route: {params}}) {
        const {fid, seasonid, homeid, awayid, matchtime} = store.state.lqdetail.baseInfo// baseInfo 保证有数据了
        const matchdate = matchtime && matchtime.substr(0, 10)
        await store.dispatch(aTypes.getAnalysisJs, {fid, seasonid, homeid, awayid, matchdate})
    },
    components: {
        strength,
        trend
    },
    computed: {
        refreshTime () { // 用户点击刷新按钮时间戳
            return this.$store.state.refreshTime
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        analysis () {
            return this.$store.state.lqdetail.analysis
        },
        strength () {
            return this.analysis.js.strength
        },
        stats () {
            return this.analysis.js.stats
        },
        trend () {
            return this.analysis.js.trend['1']
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            const {fid, seasonid, homeid, awayid, matchtime} = this.baseInfo // baseInfo 保证有数据了
            const matchdate = matchtime && matchtime.substr(0, 10)
            await this.$store.dispatch(aTypes.getAnalysisJs, {fid, seasonid, homeid, awayid, matchdate})
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
    .zhzl-box {
        height: .973333rem;
        position: relative;
        margin: .4rem .4rem 0
    }

    .zhzl-title {
        color: #999;
        padding-top: .186667rem;
        text-align: center;
        width: 100%;
        line-height: .626667rem
    }

    [data-dpr="1"] .zhzl-title {
        font-size: 13px
    }

    [data-dpr="2"] .zhzl-title {
        font-size: 26px
    }

    [data-dpr="3"] .zhzl-title {
        font-size: 39px
    }
    .zhzl-l,
    .zhzl-r {
        position: absolute;
        bottom: 0;
        transition: all .5s ease-in-out 0s;
        -webkit-transition: all .5s ease-in-out 0s;
        height: .16rem;
        width: 0
    }

    .zhzl-l {
        left: 0
    }

    .zhzl-r {
        right: 0
    }
    .wua {
        position: relative;
        width: 100%;
        height: .16rem
    }
    .zhzl-gray .hh {
        border: 0
    }


    .zhzl-bfb-left,
    .zhzl-bfb-right {
        position: absolute;
        top: .066667rem;
        color: #333
    }

    [data-dpr="1"] .zhzl-bfb-left,
    [data-dpr="1"] .zhzl-bfb-right {
        font-size: 23px
    }

    [data-dpr="2"] .zhzl-bfb-left,
    [data-dpr="2"] .zhzl-bfb-right {
        font-size: 46px
    }

    [data-dpr="3"] .zhzl-bfb-left,
    [data-dpr="3"] .zhzl-bfb-right {
        font-size: 69px
    }

    .zhzl-bfb-right {
        right: 0
    }
    .zhzl-list {
        margin: .533333rem .4rem 0
    }

    .zhzl-list li {
        height: 1.08rem
    }
    .responsive {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }
    .zhzl-left,
    .zhzl-right {
        color: #333;
        width: 2.106667rem;
        line-height: 1.066667rem
    }

    [data-dpr="1"] .zhzl-left,
    [data-dpr="1"] .zhzl-right {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-left,
    [data-dpr="2"] .zhzl-right {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-left,
    [data-dpr="3"] .zhzl-right {
        font-size: 33px
    }

    .zhzl-left {
        text-align: left
    }

    .zhzl-right {
        text-align: right
    }
    .each-resone {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%
    }
    .zhzl-classify {
        color: #aab5bd;
        line-height: .466667rem;
        text-align: center
    }

    [data-dpr="1"] .zhzl-classify {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-classify {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-classify {
        font-size: 33px
    }
    .each-resone {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%
    }
    .zhzl-classify {
        color: #aab5bd;
        line-height: .466667rem;
        text-align: center
    }

    [data-dpr="1"] .zhzl-classify {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-classify {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-classify {
        font-size: 33px
    }

    .zhzl-vs-left,
    .zhzl-vs-right {
        height: .106667rem;
        position: absolute;
        top: 0;
        background: #bcd0de
    }

    .zhzl-vs-left {
        right: 0;
        margin-right: .04rem
    }
    .gray-bg,
    .zhzl-gray {
        background: #bcd0de
    }
    .green-bg,
    .zhzl-green {
        background: #5c788f
    }
    .zhzl-vs div:first-child.zhzl-green .hh {
        border-top: .16rem solid #5c788f;
        border-right: .16rem solid transparent;
        right: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        z-index: 1
    }

    .zhzl-vs div:last-child.zhzl-green .hh {
        border-top: .17rem solid #5c788f;
        border-left: .16rem solid transparent;
        left: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0
    }

    .zhzl-gray .hh {
        border: 0
    }
    .zhzl-tips {
        color: rgba(170, 181, 189, .5);
        text-align: center
    }

    [data-dpr="1"] .zhzl-tips {
        font-size: 10px
    }

    [data-dpr="2"] .zhzl-tips {
        font-size: 20px
    }

    [data-dpr="3"] .zhzl-tips {
        font-size: 30px
    }
    .box-arrow {
        height: 1.066667rem;
        position: relative
    }

    .box-arrow:active {
        background: #f4f4f4
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
    .fczs-cont {
        overflow: hidden;
        clear: both;
        margin-top: .4rem
    }
    .pm-namel {
        background: #fff;
        line-height: 1.066667rem;
        padding: .213333rem .4rem 0;
        color: #333
    }

    [data-dpr="1"] .pm-namel {
        font-size: 14px
    }

    [data-dpr="2"] .pm-namel {
        font-size: 28px
    }

    [data-dpr="3"] .pm-namel {
        font-size: 42px
    }
    .fczs-cont .pm-img {
        width: 1.066667rem;
        height: 1.066667rem
    }

    .fczs-cont .pm-img img {
        width: auto;
        max-width: 100%;
        max-height: 100%
    }
    .fczs {
        width: 3.6rem;
        float: left;
        height: .933333rem;
        margin-left: .106667rem;
        padding-top: .133333rem
    }
    .fczs-jt {
        width: .706667rem;
        height: .426667rem;
        line-height: .426667rem;
        background: #5c788f;
        color: #fff;
        font-size: .32rem;
        text-align: right;
        border-radius: .106667rem;
        margin-bottom: .133333rem;
        position: relative;
        padding-right: .48rem
    }

    .zsc,
    .zsj,
    .zsjc,
    .zsjj,
    .zspw {
        width: .453333rem;
        height: .426667rem;
        position: absolute;
        right: 0;
        top: 0
    }

    .zsjj i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-jj.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem
    }

    .zsj i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-jj.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg)
    }

    .zspw i {
        display: inline-block;
        width: .293333rem;
        height: .213333rem;
        background: url(~assets/style/images/detail/zous-pw.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.106667rem;
        left: 50%;
        margin-left: -.146667rem
    }

    .zsc i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-cha.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg)
    }

    .zsjc i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-cha.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem
    }
    .fczs-txt {
        height: .4rem;
        line-height: .4rem;
        color: #aab5bd;
        font-size: .293333rem;
        margin-top: .053333rem
    }
    .vic-cont {
        position: relative;
        width: 9.2rem;
        margin: 0 auto
    }

    .vic-list {
        width: 7.466667rem;
        margin: 0 auto;
        margin-bottom: .266667rem;
        margin-top: .666667rem
    }
    .vic-list {
        width: 7.466667rem;
        margin: 0 auto;
        margin-bottom: .266667rem;
        margin-top: .666667rem
    }

    .jqzs-zf .vic-list {
        height: 1.666667rem
    }

    .jqzs-fc .vic-list {
        height: 1.066667rem;
        padding-bottom: 1.066667rem
    }
    .vic-item-empty {
        float: left;
        width: .266667rem;
        margin-right: .093333rem;
        position: relative;
        height: 100%
    }

    .vic-item-empty span {
        text-align: center;
        height: 100%;
        border-bottom: 1px solid #aab5bd;
        position: absolute;
        bottom: 0;
        width: .266667rem;
        display: inline-block
    }
    .vic-item-lose span {
        display: inline-block;
        width: .266667rem;
        background: #c6d7e5;
        height: 80%;
        position: absolute;
        bottom: 1px;
        left: 0
    }

    .vic-item-win span {
        display: inline-block;
        width: .266667rem;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: #f1cac3;
        height: 50%
    }

    .vic-item-coming span {
        display: inline-block;
        width: .266667rem;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: #f0f0f0;
        height: 30%
    }

    .vic-list .vic-item-win:nth-child(2n) span {
        height: 100%
    }

    .vic-list .vic-item-lose:nth-child(2n) span {
        height: 20%
    }

    .vic-list-fc .vic-item-empty {
        height: 100%
    }

    .vic-list-fc .vic-item-lose span {
        bottom: inherit;
        top: 0;
        top: 0;
        margin-top: 1.066667rem
    }
    .jqzs-fc .vic-cont .vic-item-win span {
        height: 100%
    }
    .jqzs-notice {
        text-align: center;
        color: #aab5bd;
        font-size: .293333rem;
        padding-bottom: .533333rem
    }
    .fczs-notice {
        font-size: .293333rem;
        color: #515e6d;
        padding-bottom: .8rem;
        text-align: center
    }

    .fczs-notice span {
        margin: 0 .186667rem
    }

    .fczs-notice span em {
        display: inline-block
    }

    .fczs-notice span .point-red {
        background: #f1cac3;
        width: .12rem;
        height: .12rem;
        margin-right: .106667rem
    }

    .fczs-notice span .point-blue {
        background: #c6d7e5;
        width: .12rem;
        height: .12rem;
        margin-right: .106667rem
    }

    .fczs-notice span .xs {
        color: #c6d7e5;
        margin-right: .053333rem
    }

    .fczs-notice span .zx {
        color: #d25138;
        margin-right: .053333rem
    }
    .lq-img,
     .pm-img,
     .ps-img {
         width: .6rem;
         position: relative;
         float: left
     }

    .pm-img {
        height: 1.066667rem
    }

    .ps-img {
        height: .8rem
    }

    .lq-img {
        height: 1.06667rem
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
    .popLayer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: 90;
        background: rgba(0, 0, 0, .8)
    }
    .popBox {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 91;
        color: #242c35;
        overflow: hidden
    }

    .popBox .l-flex-column {
        position: relative;
        z-index: 5
    }
    .popTopbar {
        height: 1.173333rem;
        width: 100%
    }
    .popInner {
        background: #fff;
        display: block;
        border-radius: .186667rem .186667rem 0 0;
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        overflow: hidden
    }
    .full-scroll {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch
    }
    .popInner .full-scroll {
        overflow-x: hidden;
        border-radius: .186667rem .186667rem 0 0
    }
    .plxq-table {
        text-align: center;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    [data-dpr="1"] .plxq-table {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table {
        font-size: 33px
    }
    .plxqBoxer .plxq-table {
        margin-top: 0
    }
    .plxq-table tr th {
        line-height: 1.066667rem;
        height: 1.066667rem;
        color: #aab5bd;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 400
    }

    .plxq-table tr td {
        border-bottom: 1px solid #f4f4f4;
        height: 1.066667rem
    }

    [data-dpr="1"] .plxq-table tr td {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table tr td {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table tr td {
        font-size: 33px
    }
    .jcsj-table tr th {
        text-align: center;
        position: relative;
        font-size: .32rem;
        color: #242c35;
        padding: .4rem 0 .3rem 0
    }
    .plxqBoxer .plxq-table tr td,
    .plxqBoxer .plxq-table tr th {
        border-bottom: none
    }

    .plxqBoxer .plxq-table tr:nth-child(2) {
        line-height: .6rem;
        border-bottom: 1px solid #ededed
    }

    .plxqBoxer .plxq-table tr:nth-child(2) td {
        padding: 0;
        color: #aab5bd
    }

    .plxqBoxer .plxq-table tr td:nth-child(1) {
        text-align: left;
        padding-left: .4rem
    }
    .jcsj-table th .jcsj-img {
        width: .666667rem;
        height: .666667rem;
        display: inline-block;
        position: relative;
        top: .2rem
    }

    .jcsj-table th .jcsj-img img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        left: 0
    }
    .popFooter {
        border-top: 1px solid #e8e8e8;
        background: #fff;
        width: 100%;
        height: 1.32rem;
        text-align: center;
        position: relative
    }

    .popFooter:active {
        background: #eee
    }

    .popFooter-act:active {
        background: #fff
    }

    .popFooter h2 {
        display: inline-block;
        margin: 0 auto;
        padding: 0 .133333rem;
        white-space: nowrap;
        line-height: 1.32rem;
        color: #242c35
    }
    .arrow {
        overflow: hidden;
        height: .333333rem;
        width: .6rem;
        position: absolute;
        left: .4rem;
        top: .493333rem
    }

    .arrow:before {
        content: '';
        height: .16rem;
        width: .16rem;
        display: block;
        border: .053333rem solid #333;
        border-right-width: 0;
        border-top-width: 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        bottom: .093333rem;
        left: .093333rem
    }



</style>
