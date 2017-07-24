<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner box-yc">
            <div class="full-scroll">
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
