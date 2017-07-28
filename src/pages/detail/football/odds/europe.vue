<template>
        <div v-if="europe">
            <div class="pl-box-hd">
                <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                    <tbody>
                    <tr>
                        <th width="19%">公司</th>
                        <th width="7%"></th>
                        <th width="28%">欧赔</th>
                        <th width="28%">凯利</th>
                        <th width="">返还率</th>
                    </tr>
                    </tbody>
                </table>
            </div>

            <no-data v-if="!europe.odds || !europe.odds.length"></no-data>


            <div class="pl-box-bd" v-if="europe.odds && europe.odds.length">
                <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                    <colgroup>
                        <col width="19%">
                        <col width="7%">
                        <col width="28%">
                        <col width="28%">
                        <col width="">
                    </colgroup>
                    <tbody>
                    <tr :class="{'noLink':idx==0, 'yebg': info.cid === $route.query.cid}" v-for="info,idx in europe.odds"
                        v-tap="{methods: viewOddsDetail, cid: info.cid}" >
                        <td>
                            <span class="color3">{{info.name}}</span>
                        </td>
                        <td></td>
                        <td class="colorc">
                            <p class="pl-num"><span :class="{'red': info.first.w == 1, 'green': info.first.w == -1}">{{parseFloat(info.first.win).toFixed(2)|nullFormat}}</span>/<span
                                    >{{parseFloat(info.first.draw).toFixed(2)|nullFormat}}</span>/<span :class="{'red': info.first.l == 1, 'green': info.first.l == -1}">{{parseFloat(info.first.lost).toFixed(2)|nullFormat}}</span></p>
                            <p class="pl-num"><span :class="{'red': info.end.w == 1, 'green': info.end.w == -1}">{{parseFloat(info.end.win).toFixed(2)|nullFormat}}</span>/<span
                                    :class="{'red': info.end.d == 1, 'green': info.end.d == -1}">{{parseFloat(info.end.draw).toFixed(2)|nullFormat}}</span>/<span :class="{'red': info.end.l == 1, 'green': info.end.l == -1}">{{parseFloat(info.end.lost).toFixed(2)|nullFormat}}</span></p>
                        </td>
                        <td>
                            <p class="pl-num"><span :class="{'red': info.first.wkl == 1, 'green': info.first.wkl == -1}">{{parseFloat(info.first.winkl).toFixed(2)|nullFormat}}</span>/<span
                                    :class="{'red': info.first.dkl == 1, 'green': info.first.dkl == -1}">{{parseFloat(info.first.drawkl).toFixed(2)|nullFormat}}</span>/<span :class="{'red': info.first.lkl == 1, 'green': info.first.lkl == -1}">{{parseFloat(info.first.lostkl).toFixed(2)|nullFormat}}</span></p>
                            <p class="pl-num"><span :class="{'red': info.end.wkl == 1, 'green': info.end.wkl == -1}">{{parseFloat(info.end.winkl).toFixed(2)|nullFormat}}</span>/<span
                                    :class="{'red': info.end.dkl == 1, 'green': info.end.dkl == -1}">{{parseFloat(info.end.drawkl).toFixed(2)|nullFormat}}</span>/<span :class="{'red': info.end.lkl == 1, 'green': info.end.lkl == -1}">{{parseFloat(info.end.lostkl).toFixed(2)|nullFormat}}</span></p>

                        </td>
                        <td>
                            <span class="pl-return">{{info.first.pay|nullFormat}}%</span>
                            <span class="pl-return">{{info.end.pay|nullFormat}}%</span>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>

            <div class="sk-btips" v-if="europe && europe.odds && europe.odds.length">
                共{{europe.all_num}}家公司为你提供数据，其中主流公司{{europe.main_num}}家<br>
                <span class="colorc">500彩票网提示：以上数据仅供参考，请以官方公布的数据为准</span>
            </div>
        </div>
</template>
<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import oddsInfo from '~components/detail/football/odds/oddsInfo.vue'
    import noData from '~components/no_data.vue'
    export default {
        async asyncData ({store, route: {params}}) {
//            await store.dispatch(aTypes.getOddsEurope, params.fid)
        },
        components: {
            noData
        },
        watch: {
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime)
                }
            },
            refreshTime () {
                this.fetchData()
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getOddsEurope, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
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
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            europe () {
                return this.$store.state.zqdetail.odds.europe
            }
        },
        filters: {
            nullFormat: (value) => {
                return (value === '' || value === null) ? '--' : value
            }
        }

    }
</script>
<style>
    .tContent {
        display: none;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    /*小标题 start*/
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
    /*over*/
    .pl-box-bd {
        background: #fff;
        border-bottom: 1px solid #f1f1f1
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
    .pl-box-bd {
        background: #fff;
        border-bottom: 1px solid #f1f1f1
    }

    .pl-table tr th {
        background: #fff;
        height: .733333rem;
        color: #aab5bd;
        font-weight: 400
    }
    [data-dpr="1"] .pl-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .pl-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .pl-table tr th {
        font-size: 33px
    }
    .pl-table {
        background: #fff
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

    .pl-table tr:active {
        background-color: #f4f4f4
    }

    .pl-table tr.noLink:active {
        background-color: #fff
    }

    .yb-box .pl-table tr:active {
        background-color: #fff
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
    .pl-table tr td:first-child,
    .pl-table tr th:first-child {
        line-height: normal;
        padding-left: .4rem
    }
/*网站说明*/
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
    .colorc {
        color: #ccc
    }
    /*over*/
/*弹层点击*/
    .time-item {
        float: right;
        font-size: .293333rem
    }

    .time-item li {
        background: #efefef;
        color: #aab5bd;
        height: .613333rem;
        line-height: .613333rem;
        padding: 0 .2rem;
        margin-left: .133333rem;
        text-align: center;
        border-radius: .306667rem;
        border: 1px solid #dadee4;
        float: left;
        box-sizing: border-box
    }

    .time-item .time-item-cur {
        color: #242c35;
        background: #fff;
        border: 1px solid #dadee4
    }
    /*over*/
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

    .popBox .popLayer {
        z-index: 2
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

    .plright {
        width: 7.733333rem;
        float: right;
        background: #fff;
        position: relative;
        border-radius: 0 .186667rem 0 0
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
    .popTab {
        text-align: center;
        border-bottom: 1px solid #f4f4f4
    }
    .popTab li {
        display: inline-block;
        height: 1.066667rem;
        line-height: 1.066667rem;
        color: #666a6f;
        margin: 0 .533333rem
    }

    .popTab li.cur {
        border-bottom: .053333rem solid #242c35;
        color: #242c35
    }
    .clear {
        zoom: 1
    }
    .clear:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }
    .pl-cont {
        position: relative;
        width: 100%;
        height: 14rem;
        overflow: hidden
    }
    .plcontent {
        padding: 0 .333333rem 0 .266667rem
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

    .plxq-table td .color9 {
        color: #aab5bd
    }

    .firstleft tr td:first-child {
        text-align: left
    }
    .gxsj {
        width: .2rem;
        height: .2rem;
        display: inline-block;
        background: url(~assets/style/images/detail/qhsj.png) no-repeat;
        background-size: cover;
        margin-left: .053333rem
    }

    .firstleft tr td:first-child {
        text-align: left
    }
    .plxq-table-lspt tr.plxq-lspt-td130 td {
        height: 1.733333rem
    }

    [data-dpr="1"] .plxq-table-lspt tr td .colora {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table-lspt tr td .colora {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table-lspt tr td .colora {
        font-size: 33px
    }
    .colora {
        color: #aab5bd
    }
    .win-c p:first-child {
        color: #d3553d
    }

    .level-c p:first-child {
        color: #36a171
    }

    .lose-c p:first-child {
        color: #437ba8
    }
    .plxq-table-f {
        margin-top: .533333rem;
        font-size: .2933rem;
        text-align: center;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    .plxq-table-f th {
        line-height: .8rem;
        height: .8rem;
        color: #aab5bd;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 400
    }

    .plxq-table-f th .color3 {
        color: #242c35
    }

    .plxq-table-f td {
        border-bottom: 1px solid #f4f4f4;
        text-align: center;
        word-break: break-all;
        height: 1.733333rem;
        line-height: .6rem
    }

    [data-dpr="1"] .plxq-table-f td {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table-f td {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table-f td {
        font-size: 33px
    }

    .plxq-table-f th:last-child,
    .plxq-table-f tr td:last-child {
        text-align: right
    }
    .result-last {
        text-align: right
    }

    .result-last span {
        display: inline-block;
        width: .4267rem;
        height: .4267rem;
        text-align: center;
        line-height: .4267rem;
        color: #fff;
        font-size: .32rem
    }

    .result-win span {
        background: #d25138
    }

    .result-level span {
        background: #36a171
    }

    .result-lose span {
        background: #437ba8
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
    .pl-table .green,
    .pl-table .pl-num .green {
        color: #36a171
    }

    .pl-table .pl-num .red,
    .pl-table .red {
        color: #d3553d
    }
    .pl-cont .red {
        color: #d3553d
    }
    .pl-cont .green {
        color: #36a171
    }

</style>
