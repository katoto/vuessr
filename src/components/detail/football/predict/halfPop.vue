<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner box-yc">
            <div class="full-scroll l-full l-scroll-y">
                <div class="popHeader">
                    <h4 class="popTit">最大概率</h4>
                    <ul class="dataItem">
                        <li class="itemL"
                            :class="{'red2':outter.prob.win>outter.prob.draw&&outter.prob.win>outter.prob.lost}">
                            <em class="num">{{outter.prob.win}}</em> <span class="numSub">%</span> <span
                                class="item-info2">主胜</span></li>
                        <li class="itemC"
                            :class="{'red2':outter.prob.draw>outter.prob.win&&outter.prob.draw>outter.prob.lost}">
                            <em class="num">{{outter.prob.draw}}</em> <span class="numSub">%</span> <span
                                class="item-info2">平</span></li>
                        <li class="itemR"
                            :class="{'red2':outter.prob.lost>outter.prob.draw&&outter.prob.lost>outter.prob.win}">
                            <em class="num">{{outter.prob.lost}}</em> <span class="numSub">%</span> <span
                                class="item-info2">主负</span></li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL"
                            :class="{'red2':outter.score[0].prob>outter.score[1].prob&&outter.score[0].prob>outter.score[2].prob}">
                            <em class="num">{{outter.score[0].prob}}</em> <span class="numSub">%</span>
                            <span class="item-info2">{{outter.score[0].score}}</span></li>
                        <li class="itemC"
                            :class="{'red2':outter.score[1].prob>outter.score[0].prob&&outter.score[1].prob>outter.score[2].prob}">
                            <em class="num">{{outter.score[1].prob}}</em> <span class="numSub">%</span>
                            <span class="item-info2">{{outter.score[1].score}}</span></li>
                        <li class="itemR"
                            :class="{'red2':outter.score[2].prob>outter.score[0].prob&&outter.score[2].prob>outter.score[1].prob}">
                            <em class="num">{{outter.score[2].prob}}</em> <span class="numSub">%</span>
                            <span class="item-info2">{{outter.score[2].score}}</span></li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL"
                            :class="{'red2':outter.nums[0].prob>outter.score[1].prob&&outter.score[0].prob>outter.score[2].prob}">
                            <em class="num">{{outter.nums[0].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{outter.nums[0].num}}球</span></li>
                        <li class="itemC"
                            :class="{'red2':outter.nums[1].prob>outter.score[0].prob&&outter.score[1].prob>outter.score[2].prob}">
                            <em class="num">{{outter.nums[1].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{outter.nums[1].num}}球</span></li>
                        <li class="itemR"
                            :class="{'red2':outter.nums[2].prob>outter.score[0].prob&&outter.score[2].prob>outter.score[1].prob}">
                            <em class="num">{{outter.nums[2].prob}}</em> <span class="numSub">%</span> <span
                                class="item-info2">{{outter.nums[2].num}}球</span></li>
                    </ul>
                </div>
                <div class="popDetail">
                    <h4 class="popTit">概率分布</h4>

                    <div class="box-gailv responsive">
                        <div class="gailvTit bgRed bgRed2">半场比分</div>
                        <div class="each-resone">
                            <table cellspacing="0" cellpadding="0" width="100%" class="tb-gailv">
                                <colgroup>
                                    <col width="20%">
                                    <col width="20%">
                                    <col width="20%">
                                    <col width="20%">
                                    <col>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <td><em class="f28">0:0</em>

                                        <p class="f22">{{inner.maps[0]}}%</p></td>
                                    <td><em class="f28">1:0</em>

                                        <p class="f22">{{inner.maps[1]}}%</p></td>
                                    <td><em class="f28">2:0</em>

                                        <p class="f22">{{inner.maps[2]}}%</p></td>
                                    <td><em class="f28">3:0</em>

                                        <p class="f22">{{inner.maps[3]}}%</p></td>
                                    <td><em class="f28">4+:0</em>

                                        <p class="f22">{{inner.maps[4]}}%</p></td>
                                </tr>
                                <tr>
                                    <td><em class="f28">0:1</em>

                                        <p class="f22">{{inner.maps[5]}}%</p></td>
                                    <td><em class="f28">1:1</em>

                                        <p class="f22">{{inner.maps[6]}}%</p></td>
                                    <td><em class="f28">2:1</em>

                                        <p class="f22">{{inner.maps[7]}}%</p></td>
                                    <td><em class="f28">3:1</em>

                                        <p class="f22">{{inner.maps[8]}}%</p></td>
                                    <td><em class="f28">4+:1</em>

                                        <p class="f22">{{inner.maps[9]}}%</p></td>
                                </tr>
                                <tr>
                                    <td><em class="f28">0:2</em>

                                        <p class="f22">{{inner.maps[10]}}%</p></td>
                                    <td><em class="f28">1:2</em>

                                        <p class="f22">{{inner.maps[11]}}%</p></td>
                                    <td><em class="f28">2:2</em>

                                        <p class="f22">{{inner.maps[12]}}%</p></td>
                                    <td><em class="f28">3:2</em>

                                        <p class="f22">{{inner.maps[13]}}%</p></td>
                                    <td><em class="f28">4+:2</em>

                                        <p class="f22">{{inner.maps[14]}}%</p></td>
                                </tr>
                                <tr>
                                    <td><em class="f28">0:3</em>

                                        <p class="f22">{{inner.maps[15]}}%</p></td>
                                    <td><em class="f28">1:3</em>

                                        <p class="f22">{{inner.maps[16]}}%</p></td>
                                    <td><em class="f28">2:3</em>

                                        <p class="f22">{{inner.maps[17]}}%</p></td>
                                    <td><em class="f28">3:3</em>

                                        <p class="f22">{{inner.maps[18]}}%</p></td>
                                    <td><em class="f28">4:3</em>

                                        <p class="f22">{{inner.maps[19]}}%</p></td>
                                </tr>
                                <tr>
                                    <td><em class="f28">0:4+</em>

                                        <p class="f22">{{inner.maps[20]}}%</p></td>
                                    <td><em class="f28">1:4+</em>

                                        <p class="f22">{{inner.maps[21]}}%</p></td>
                                    <td><em class="f28">2:4+</em>

                                        <p class="f22">{{inner.maps[22]}}%</p></td>
                                    <td><em class="f28">3:4+</em>

                                        <p class="f22">{{inner.maps[23]}}%</p></td>
                                    <td><em class="f28">4+:4+</em>

                                        <p class="f22">{{inner.maps[24]}}%</p></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="box-gailv responsive">
                        <div class="gailvTit bgBlue2 bgBlue22">进球数</div>
                        <div class="each-resone">
                            <table cellspacing="0" cellpadding="0" width="100%" class="tb-gailv">
                                <colgroup>
                                    <col width="20%">
                                    <col width="20%">
                                    <col width="20%">
                                    <col width="20%">
                                    <col>
                                </colgroup>
                                <tbody>
                                <tr>
                                    <td><em class="f28">0</em>

                                        <p class="f22">{{inner.nums[0]}}%</p></td>
                                    <td><em class="f28">1</em>

                                        <p class="f22">{{inner.nums[1]}}%</p></td>
                                    <td><em class="f28">2</em>

                                        <p class="f22">{{inner.nums[2]}}%</p></td>
                                    <td><em class="f28">3</em>

                                        <p class="f22">{{inner.nums[3]}}%</p></td>
                                    <td><em class="f28">4+</em>

                                        <p class="f22">{{inner.nums[4]}}%</p></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}"><span class="arrow"></span>

            <h2 class="f30">
                半场
            </h2>
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
                return this.$store.state.zqdetail.predict.half.outter
            },
            inner () {
                return this.$store.state.zqdetail.predict.half.inner
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
    .each-resone {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%
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

    .box-gailv{margin-top:.4rem}
    .gailvTit{width:.4rem;height:100%;-webkit-writing-mode:vertical-rl;color:#fff;text-align:center;letter-spacing:.133333rem;vertical-align:middle}
    [data-dpr="1"] .gailvTit{font-size:10px}
    [data-dpr="2"] .gailvTit{font-size:20px}
    [data-dpr="3"] .gailvTit{font-size:30px}
    .gailvTit.bgRed{background:#d25138;height:4.586667rem}
    .gailvTit.bgRed2{height:7.653333rem}
    .gailvTit.bgGreen{background:#36a171;height:1.52rem}
    .gailvTit.bgBlue{background:#437ba8;height:4.586667rem}
    .gailvTit.bgBlue2{background:#5c788f;height:3.053333rem}
    .gailvTit.bgBlue22{height:1.533333rem}
    .tb-gailv{text-align:center}
    .tb-gailv tr td{height:1.52rem;border-bottom:1px solid #f4f4f4;}
    .tb-gailv td .f22{color:#aab5bd;line-height:.48rem}
    .tb-gailv td .f28{color:#242c35}
    .tb-gailv tr:last-child td{border-bottom:0}
    .tb-gailv tr td:last-child{padding-right:.2rem}



</style>
