<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner box-yc">
            <div class="full-scroll l-full l-scroll-y">
                <div class="popHeader">
                    <h4 class="popTit">概率分布</h4>
                    <ul class="dataItem">
                        <li class="itemL" :class="{'red2': outter.result.pw>outter.result.pd&&outter.result.pw>outter.result.pl}">
                            <em class="num">{{outter.result.pw}}</em>
                            <span class="numSub">%</span>
                            <span class="item-info2">主胜</span>
                        </li>
                        <li class="itemC" :class="{'red2':outter.result.pd>outter.result.pw&&outter.result.pd>outter.result.pl}">
                            <em class="num">{{outter.result.pd}}</em>
                            <span class="numSub">%</span>
                            <span class="item-info2">平</span>
                        </li>
                        <li class="itemR" :class="{'red2':outter.result.pl>outter.result.pw&&outter.result.pl>outter.result.pd}">
                            <em class="num">{{outter.result.pl}}</em>
                            <span class="numSub">%</span>
                            <span class="item-info2">主负</span>
                        </li>
                    </ul>
                </div>
                <ul class="popTab clear">
                    <li class="f30" :class="{cur: tab==='history'}" v-tap="{methods: switchTab, tab: 'history'}">历史对比
                    </li>
                    <li class="f30" :class="{cur: tab==='trend'}" v-tap="{methods: switchTab, tab: 'trend'}">趋势记录
                    </li>
                </ul>
                <div class="popDetail" v-if="tab === 'history'">
                    <h4 class="popTit">本场比赛</h4>
                    <ul class="dataItem">
                        <li class="itemL">
                            <div>{{match.simpleleague}}</div>
                            <div>{{match.matchtime.substring(0,11)}}</div>
                        </li>
                        <li class="itemC">
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                <tr>
                                    <td width="35%">
                                        {{(inner.this_match.homesxname||'')|truncate(3)}}
                                    </td>
                                    <td width="10%" class="textcenter">
                                        {{inner.this_match.result==='-1'?'-':inner.this_match.homescore}}
                                    </td>
                                    <td>
                                        <span v-if="inner.this_match.result=='3'"
                                              class="state red">主胜</span>
                                        <span v-if="inner.this_match.result=='1'" class="state green">平</span>
                                        <span v-if="inner.this_match.result=='0'" class="state blue">主负</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{(inner.this_match.awaysxname||'')|truncate(3)}}</td>
                                    <td class="textcenter">
                                        {{inner.this_match.result==='-1'?'-':inner.this_match.awayscore}}
                                    </td>
                                    <td>&nbsp;</td>
                                </tr>
                                </tbody>
                            </table>
                        </li>
                        <li class="itemR">
                            <echart-line :oddslist="inner.this_match.oddslist" class="chart-similar"></echart-line>
                        </li>
                    </ul>
                    <div class="popDetail-pl">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td width="13%">初赔：</td>
                                <td width="10%">{{inner.this_match.first_odds[0]}}</td>
                                <td width="30%" align="center">{{inner.this_match.first_odds[1]}}</td>
                                <td width="10%" align="right">{{inner.this_match.first_odds[2]}}</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>即赔：</td>
                                <td :class="{'red2':inner.this_match.curr_odds[0]>inner.this_match.first_odds[0],'green2':inner.this_match.curr_odds[0]<inner.this_match.first_odds[0]}">
                                    {{inner.this_match.curr_odds[0]}}
                                </td>
                                <td align="center"
                                    :class="{'red2':inner.this_match.curr_odds[1]>inner.this_match.first_odds[1],'green2':inner.this_match.curr_odds[1]<inner.this_match.first_odds[1]}">
                                    {{inner.this_match.curr_odds[1]}}
                                </td>
                                <td align="right"
                                    :class="{'red2':inner.this_match.curr_odds[2]>inner.this_match.first_odds[2],'green2':inner.this_match.curr_odds[2]<inner.this_match.first_odds[2]}">
                                    {{inner.this_match.curr_odds[2]}}
                                </td>
                                <td>&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 class="popTit">历史样本</h4>
                    <ul class="dataItem dataItem-tit">
                        <li class="itemL">联赛</li>
                        <li class="itemC">对阵</li>
                        <li class="itemR">相似度</li>
                    </ul>


                    <ul class="dataItem" v-for="item in inner.history_sample">

                        <li class="itemL">
                            <div>{{item.simplegbname}}</div>
                            <div>{{item.matchtime.substring(0,11)}}</div>
                        </li>
                        <li class="itemC">
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                <tr>
                                    <td width="45%">{{(item.homesxname||'')|truncate(3)}}</td>
                                    <td width="10%" class="textcenter">{{item.homescore}}</td>
                                    <td><span v-if="item.result==='3'" class="state red">主胜</span>
                                        <span v-if="item.result==='1'" class="state green">平</span>
                                        <span v-if="item.result==='0'" class="state blue">主负</span></td>
                                </tr>
                                <tr>
                                    <td>{{(item.awaysxname||'')|truncate(3)}}</td>
                                    <td class="textcenter">{{item.awayscore}}</td>
                                    <td>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </li>

                        <li class="itemR">
                            <em class="similar-num">{{item.similarity}}</em>
                            <echart-line :oddslist="item.oddslist" class="chart-similar"></echart-line>

                        </li>
                    </ul>

                </div>
                <div class="popDetail" v-if="tab === 'trend'">
                    <echart-bar-line class="chart-yuce" name-bar="主胜概率" name-line="赔率趋势" :data-bar="outter.chart.nbars" :data-line="outter.chart.curve"></echart-bar-line>

                    <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                        <tbody>
                        <tr>
                            <th>时间</th>
                            <th width="18%">主胜</th>
                            <th width="18%">平</th>
                            <th width="18%">主负</th>
                        </tr>
                        <tr v-for="item,idx in outter.table">
                            <td>{{panTimeMap[idx]}}</td>
                            <td>{{item.pw}}%</td>
                            <td>{{item.pd}}%</td>
                            <td>{{item.pl}}%</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>

            <h2 class="f30">亚盘（盘口：{{inner.this_match.curr_odds[1]}}）</h2>
        </div>
    </div>
</template>
<script>
    import {mTypes} from '~store/zqdetail'
    import echartBarLine from '~components/detail/football/predict/echartBarLine.vue'
    import echartLine from '~components/detail/football/predict/echartLine.vue'
    export default {
        data () {
            return {
                tab: 'history',
                panTimeMap: ['初赔', '赛前24h', '赛前12h', '赛前6h', '赛前5h', '赛前4h', '赛前3h', '赛前2.5h', '赛前2h', '赛前1.5h', '赛前1h', '赛前0.5h', '终赔']
            }
        },
        components: {
            echartBarLine, echartLine
        },
        methods: {
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            },
            switchTab ({tab}) {
                this.tab = tab
            }
        },
        computed: {
            outter () {
                return this.$store.state.zqdetail.predict.asian.outter
            },
            inner () {
                return this.$store.state.zqdetail.predict.asian.inner
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            }
        },
        filters: {
            truncate: (val, num) => {
                if (val.length > num) {
                    return val.substr(0, num) + '...'
                } else {
                    return val
                }
            }
        }

    }
</script>
<style scoped>
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
        font-size: 23px
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
    .item-loader {
        text-align: center;
        height: 1.733333rem;
        position: relative;
        background: #fff
    }

    .chart-yuce {
        width: 9.2rem;
        height: 5.866667rem;
        margin: 0 auto
    }


    .popBox .popLayer {
        z-index: 2
    }

    .popBox {
        position: absolute;
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

    .popInner .full-scroll {
        overflow-x: hidden;
        border-radius: .186667rem .186667rem 0 0
    }

    .popHeader {
        padding: 0 .4rem
    }

    .popBox .popTit {
        color: #a9abad;
        margin-top: .533333rem
    }

    .popHeader .dataBox {
        border-bottom: 0
    }

    .popHeader .dataBox:active {
        background: #fff
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

    .popDetail {
        padding: 0 .4rem
    }

    .box-yc .popDetail .dataItem .itemC,
    .popDetail .dataItem li {
        color: #242c35
    }

    .popDetail .dataItem .itemL {
        padding-left: 0;
        width: 2.933333rem
    }

    .popDetail .dataItem .itemC {
        text-align: left
    }

    .popDetail .dataItem .itemR {
        padding-right: 0;
        width: 2.4rem;
        position: relative
    }

    .popDetail .fx-table tr:nth-child(2) td {
        padding-top: 0
    }

    .popDetail .dataItem td {
        height: .666667rem
    }

    .popDetail .dataItem td .state {
        display: inline-block;
        width: .666667rem;
        height: .346667rem;
        line-height: .346667rem;
        color: #fff;
        border-radius: .04rem;
        text-align: center;
        margin-left: .266667rem;
        position: relative;
        top: -.026667rem
    }

    [data-dpr="1"] .popDetail .dataItem td .state {
        font-size: 10px
    }

    [data-dpr="2"] .popDetail .dataItem td .state {
        font-size: 20px
    }

    [data-dpr="3"] .popDetail .dataItem td .state {
        font-size: 30px
    }

    .popDetail .dataItem td .state.red {
        background: #d25138
    }

    .popDetail .dataItem td .state.green {
        background: #36a171
    }

    .popDetail .dataItem td .state.blue {
        background: #437ba8
    }

    .popDetail .dataItem td .state.gray {
        background: #efefef;
        color: #acaeb0
    }

    .popDetail .dataItem .itemL div {
        height: .666667rem;
        line-height: .666667rem
    }

    .popDetail .dataItem li {
        height: 1.733333rem
    }

    .popDetail .dataItem-tit {
        height: .8rem;
        margin-bottom: -.266667rem
    }

    .popDetail .dataItem-tit li {
        color: #aab5bd;
        height: .8rem
    }

    [data-dpr="1"] .popDetail .dataItem-tit li {
        font-size: 11px
    }

    [data-dpr="2"] .popDetail .dataItem-tit li {
        font-size: 22px
    }

    [data-dpr="3"] .popDetail .dataItem-tit li {
        font-size: 33px
    }

    .box-yc .popDetail .dataItem-tit .itemC {
        color: #aab5bd
    }

    .popDetail .chart-similar {
        height: 100%;
        margin-left: .266667rem
    }

    .popDetail .similar-num {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -.773333rem;
        margin-top: -.773333rem;
        width: 1.546667rem;
        height: 1.546667rem;
        color: rgba(210, 81, 56, .16);
        font-size: 1.333333rem
    }

    .popDetail .similar-num:after {
        position: absolute;
        right: -.4rem;
        bottom: .24rem;
        color: rgba(210, 81, 56, .16);
        content: '%';
        font-size: .4rem
    }

    .popDetail .fx-table {
        margin-top: .4rem
    }

    .popDetail-pl {
        border-top: 1px solid #f4f4f4;
        color: #242c35;
        padding-top: .4rem
    }

    .popDetail-pl td {
        height: .48rem
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

    .popBox-lsyb .popDetail .dataItem .itemL {
        width: 2.666667rem
    }

    .popBox-lsyb .popDetail .dataItem .itemR {
        width: 2.933333rem;
        text-align: center
    }

    .popBox .sk-btips {
        background: #fff
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
    .chart-yuce {
        width: 9.2rem;
        height: 5.866667rem;
        margin: 0 auto
    }
    .popDetail .fx-table tr:nth-child(2) td {
        padding-top: 0
    }

    .popDetail .dataItem td {
        height: .666667rem
    }

    .popDetail .dataItem td .state {
        display: inline-block;
        width: .666667rem;
        height: .346667rem;
        line-height: .346667rem;
        color: #fff;
        border-radius: .04rem;
        text-align: center;
        margin-left: .266667rem;
        position: relative;
        top: -.026667rem
    }

    [data-dpr="1"] .popDetail .dataItem td .state {
        font-size: 10px
    }

    [data-dpr="2"] .popDetail .dataItem td .state {
        font-size: 20px
    }

    [data-dpr="3"] .popDetail .dataItem td .state {
        font-size: 30px
    }

    .popDetail .dataItem td .state.red {
        background: #d25138
    }

    .popDetail .dataItem td .state.green {
        background: #36a171
    }

    .popDetail .dataItem td .state.blue {
        background: #437ba8
    }

    .popDetail .dataItem td .state.gray {
        background: #efefef;
        color: #acaeb0
    }
    .fx-table {
        margin-top: .053333rem
    }

    .fx-table tr th {
        background: #fff;
        border-bottom: 1px solid #f4f4f4;
        height: .8rem;
        line-height: .8rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .fx-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .fx-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .fx-table tr th {
        font-size: 33px
    }
    .fx-table tr td {
        line-height: 1.066667rem;
        color: #242c35;
        text-align: center
    }

    [data-dpr="1"] .fx-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .fx-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .fx-table tr td {
        font-size: 36px
    }

    .fx-table tr .win {
        color: #d3553d
    }

    .fx-table tr .lose {
        color: #437ba8
    }

    .fx-table tr td .color9,
    .fx-table tr td .colorc {
        color: #aab5bd
    }

    .fx-table tr td:first-child,
    .fx-table tr th:first-child {
        padding-left: .4rem;
        text-align: left;
        position: relative
    }

    .fx-table tr td:last-child,
    .fx-table tr th:last-child {
        padding-right: .4rem;
        text-align: right
    }

    .fx-table tr:last-child td {
        padding-bottom: .25rem
    }

    .fx-table tr td:first-child span {
        display: block;
        height: .426667rem;
        line-height: .426667rem
    }

    [data-dpr="1"] .fx-table tr td:first-child span {
        font-size: 10px
    }

    [data-dpr="2"] .fx-table tr td:first-child span {
        font-size: 20px
    }

    [data-dpr="3"] .fx-table tr td:first-child span {
        font-size: 30px
    }

    [data-dpr="1"] .fx-table tr td:first-child span.f23 {
        font-size: 11.5px
    }

    [data-dpr="2"] .fx-table tr td:first-child span.f23 {
        font-size: 23px
    }

    [data-dpr="3"] .fx-table tr td:first-child span.f23 {
        font-size: 34.5px
    }


</style>
