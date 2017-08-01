
<template>
    <div>
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tbody><tr>
                    <th width="18%">公司</th>
                    <th width="10%"></th>
                    <th width="22%">主负</th>
                    <th width="22%">主胜</th>
                    <th width="26%">返还率</th>
                    <th width=""></th>
                </tr>
                </tbody></table>
        </div>
        <no-data v-if="!europe || !europe.odds || !europe.odds.length"></no-data>

        <div class="pl-box-bd" v-if="europe && europe.odds && europe.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <colgroup>
                    <col width="18%">
                    <col width="10%">
                    <col width="22%">
                    <col width="22%">
                    <col width="26%">
                    <col width="">
                </colgroup>
                <tbody>
                <tr v-for="info in europe.odds"
                    v-tap="{methods:viewOddsDetail,cid:info.cid}">
                    <!--drunk-on="click: redirect('#/basketballdetail/' + tab + '/' + match.fid + '/europe/' + info.cid)">-->
                    <td >
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td width="7%" class="carriage">
                    </td>

                    <td width="22%" class="carriage">
                        <p class="color6 f24" :class="{'red': info.first.l == 1, 'green': info.first.l == -1}">{{info.first.lost}}</p>
                        <!--<br>-->
                        <p class="f24" :class="{'red': info.end.l == 1, 'green': info.end.l == -1}">{{info.end.lost}}</p>

                    </td>
                    <td width="22%" class="carriage">
                        <p class="color6 f24" :class="{'red': info.first.w == 1, 'green': info.first.w == -1}">{{info.first.win}}</p>
                        <!--<br>-->
                        <p class="f24" :class="{'red': info.end.w == 1, 'green': info.end.w == -1}">{{info.end.win}}</p>

                    </td>
                    <td width="26%" class="carriage">
                        <p class="color6 f24">{{info.first.pay}}%</p>
                        <!--<br>-->
                        <p class="color6 f24">{{info.end.pay}}%</p>
                    </td>
                    <td>

                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="sk-btips" v-if="europe && europe.odds">
            共{{europe.all_num || 0}}家公司为你提供数据，其中主流公司{{europe.main_num || 0}}家
            <br>
            <span>500彩票网提示：以上数据仅供参考，请以官方公布的数据为准</span>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import noData from '~components/no_data.vue'
    import oddsInfo from '~components/detail/basketball/odds/oddsInfo.vue'

    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getOddsEurope, {
                fid: params.fid
            })
        },
        components: {
            noData
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            europe () {
                return this.$store.state.lqdetail.odds.europe
            }
        },
        methods: {
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')

                await this.$store.dispatch(aTypes.getOddsEurope, {
                    fid: this.$route.params.fid
                })
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                console.log(cid)
                if (cid === '-1') return
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.europe.odds,
                        type: 'europe'
                    }
                })
            }
        },
        watch: {
            loaded (loaded) {
                this.refreshScroll()
            },
            refreshTime () {
                this.fetchData()
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>
<style>
    .pl-box-hd {
        background: #fff;
        border-top: 1px solid #f4f4f4
    }
    .pl-box-hd table th {
        border-bottom: 1px solid #f4f4f4
    }
    .pl-table {
        background: #fff
    }

    .pl-box-left,
    .pl-box-right,
    .pl-table tr th {
        background: #fff;
        height: .733333rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .pl-box-left,
    [data-dpr="1"] .pl-box-right,
    [data-dpr="1"] .pl-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .pl-box-left,
    [data-dpr="2"] .pl-box-right,
    [data-dpr="2"] .pl-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .pl-box-left,
    [data-dpr="3"] .pl-box-right,
    [data-dpr="3"] .pl-table tr th {
        font-size: 33px
    }

    .pl-table tr td:first-child,
    .pl-table tr th:first-child {
        line-height: normal;
        padding-left: .4rem
    }

    .pl-table tr td:first-child .color3 {
        color: #242c35
    }

    .pl-table tr td:last-child,
    .pl-table tr th:last-child {
        text-align: right;
        padding-right: .4rem
    }
    [data-dpr="1"] .pl-table .f24 {
        font-size: 12px
    }

    [data-dpr="2"] .pl-table .f24 {
        font-size: 24px
    }

    [data-dpr="3"] .pl-table .f24 {
        font-size: 36px
    }
    .pl-box-bd {
        background: #fff;
        border-bottom: 1px solid #f1f1f1
    }
    .pl-table tr td {
        border-bottom: 1px solid #f4f4f4;
        text-align: center;
        height: 1.733333rem;
        line-height: .6rem;
        color: #242c35;
        word-break: break-all
    }

    [data-dpr="1"] .pl-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .pl-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .pl-table tr td {
        font-size: 36px
    }
    [data-dpr="1"] .pl-table .f24 {
        font-size: 12px
    }

    [data-dpr="2"] .pl-table .f24 {
        font-size: 24px
    }

    [data-dpr="3"] .pl-table .f24 {
        font-size: 36px
    }

    .pl-table .pl-num {
        color: #aab5bd
    }

    .pl-table .pl-num span {
        display: inline-block;
        color: #242c35
    }

    .pl-table .green,
    .pl-table .pl-num .green {
        color: #36a171
    }

    .pl-table .pl-num .red,
    .pl-table .red {
        color: #d3553d
    }

    .pl-table .pl-return {
        display: block;
        color: #242c35
    }
    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
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
    .popBox .popLayer {
        z-index: 2
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

    .popInner .full-scroll {
        overflow-x: hidden;
        border-radius: .186667rem .186667rem 0 0
    }
    .plleft {
        width: 2rem;
        color: #242c35;
        overflow: hidden;
        float: left;
        height: 100%;
        background: #f4f4f4
    }

    [data-dpr="1"] .plleft {
        font-size: 12px
    }

    [data-dpr="2"] .plleft {
        font-size: 24px
    }

    [data-dpr="3"] .plleft {
        font-size: 36px
    }
    .plleft-list li {
        line-height: 1.226667rem;
        height: 1.226667rem;
        text-align: center;
        background: #f4f4f4;
        overflow: hidden;
        color: #666a6f
    }

    .plleft-list li.cur {
        background: #fff;
        position: relative;
        color: #242c35
    }
    .plright {
        width: 7.733333rem;
        float: right;
        background: #fff;
        position: relative;
        border-radius: 0 .186667rem 0 0
    }
    .pl-cont {
        position: relative;
        width: 100%;
        height: 14rem;
        overflow: hidden
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
    .plxq-table tr th {
        line-height: 1.066667rem;
        height: 1.066667rem;
        color: #aab5bd;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 400
    }
    .gxsj {
        width: .2rem;
        height: .2rem;
        display: inline-block;
        background: url(~assets/style/images/detail/qhsj.png) no-repeat;
        background-size: cover;
        margin-left: .053333rem
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

    [data-dpr="1"] .f24 {
        font-size: 12px
    }

    [data-dpr="2"] .f24 {
        font-size: 24px
    }
    [data-dpr="3"] .f24 {
        font-size: 36px
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
