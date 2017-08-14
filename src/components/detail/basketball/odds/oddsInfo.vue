<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner" style="z-index: 2">
            <div class="l-full l-flex-row">
                <div class="l-relative" style="width: 2rem;color: #242c35">
                    <div class="l-full l-scroll-y">
                        <div class="scroller">
                            <ul class="plleft-list">
                                <li v-for="(info,index) in params.odds"
                                    v-tap="{methods: changeComp, cid: info.cid}"
                                    :class="{cur: info.cid == cid}" v-if="info.cid!=='-1'">{{info.name}}

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="l-flex-1 l-flex-column" style="width:0;border-radius: 0 .186667rem 0 0">
                    <div class="l-flex-1 l-relative">
                        <template>
                            <div class="l-full l-scroll-y">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table">
                                    <!--胜负-->
                                    <tbody v-if="params.type === 'europe' && oddsInfo && oddsInfo.length">
                                    <tr>
                                        <th width="22%">主负</th>
                                        <th width="16%">主胜</th>
                                        <th width="22%">返还率</th>
                                        <th width="36%" v-tap="{methods:updateCustomOddsInfo}">更新时间
                                        <!--drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">-->
                                            <em class="gxsj"></em>
                                        </th>
                                    </tr>
                                    <tr v-for="info in oddsInfo">
                                        <td><span class="red f24" :class="{'red': info.l == 1, 'green': info.l == -1}">{{info.lost}}</span>
                                        </td>
                                        <td><span class="f24" :class="{'red': info.w == 1, 'green': info.w == -1}">{{info.win}}</span>
                                        </td>
                                        <td><span class="color6 f24">{{info.pay}}%</span></td>
                                        <td v-tap="{methods:updateCustomOddsInfo}">
                                            <span class="color9" v-if="!isOddsTimeNormal">{{info.time}}</span>
                                            <span class="color9" v-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                        </td>
                                    </tr>
                                    </tbody >
                                    <!--让分盘-->
                                    <tbody v-if="params.type === 'rangqiu' && oddsInfo && oddsInfo.length">
                                    <tr>
                                        <th width="22%">客队</th>
                                        <th width="16%">盘口</th>
                                        <th width="22%">主队</th>
                                        <th width="30%" v-tap="{methods:updateCustomOddsInfo}">更新时间<em class="gxsj" id="gxsj"></em></th>
                                    </tr>
                                    <tr v-for="info,index in oddsInfo">
                                        <td><span class="f24" :class="{'red': info.s2 == 1, 'green': info.s2 == -1}">{{info.a}}</span>
                                        </td>
                                        <td><span class="color6 f24">{{info.handi}}</span></td>
                                        <td><span class="f24" :class="{'red': info.s1 == 1, 'green': info.s1 == -1}">{{info.h}}</span>
                                        </td>
                                        <td v-tap="{methods:updateCustomOddsInfo}">
                                            <span class="color9" v-if="!isOddsTimeNormal">{{info.time}}</span>
                                            <span class="color9" v-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                        </td>
                                    </tr>
                                    </tbody>

                                    <!--大小分-->
                                    <tbody v-if="params.type === 'zongfen' && oddsInfo && oddsInfo.length">
                                    <tr>
                                        <th width="22%">大分</th>
                                        <th width="16%">总分</th>
                                        <th width="22%">小分</th>
                                        <th width="30%" v-tap="{methods:updateCustomOddsInfo}">更新时间
                                            <em class="gxsj" id="gxsj"></em></th>
                                    </tr>
                                    <tr v-for="info,index in oddsInfo">
                                        <td><span class="f24" :class="{'red': info.b == 1, 'green': info.b == -1}">{{info.big}}</span>
                                        </td>
                                        <td><span class="color6 f24" :class="{'red': info.pk == 1, 'green': info.pk == -1}">{{info.handi}}</span>
                                        </td>
                                        <td><span class="f24" :class="{'red': info.s == 1, 'green': info.s == -1}">{{info.small}}</span>
                                        </td>
                                        <td v-tap="{methods:updateCustomOddsInfo}">
                                            <span class="color9" v-if="!isOddsTimeNormal">{{info.time}}</span>
                                            <span class="color9" v-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <no-match v-if="oddsInfo && !oddsInfo.length"></no-match>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">赔率详情</h2>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import noMatch from '~components/detail/basketball/odds/noMatch.vue'

    export default{
        components: {
            noMatch
        },
        props: {
            params: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.odds && value.cid && value.type
                }
            }
        },
        data () {
            return {
                tab: 0,
                cid: -1,
                oddsInfo: null,
                loading: false,
                error: false,
                isOddsTimeNormal: false
            }
        },
        computed: {
            match () {
                return this.$store.state.lqdetail.baseInfo
            }
        },
        mounted () {
            this.cid = this.params.cid
        },
        methods: {
            async changeComp ({cid}) {
                this.cid = cid
            },
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            },
            updateCustomOddsInfo: function () {
                this.isOddsTimeNormal = !this.isOddsTimeNormal
            }
        },
        watch: {
            async cid (cid) {
                this.loading = true
                this.isOddsTimeNormal = false
                try {
                    switch (this.params.type) {
                    case 'europe': {
                        this.oddsInfo = null
                        let currentInfo = null
                        this.params.odds.some((info) => {
                            if (info.cid === cid) {
                                currentInfo = info
                            }
                        })
                        if (currentInfo) {
                            const oddsInfo = await this.$store.dispatch(aTypes.getOddsDetailEurope, {
                                fid: this.$route.params.fid,
                                cid,
                                date: this.match.matchtime
                            })
                            this.oddsInfo = oddsInfo
                        }
                        break
                    }
                    case 'rangqiu': {
                        this.oddsInfo = null
                        let currentInfo = null
                        this.params.odds.some((info) => {
                            if (info.cid === cid) {
                                currentInfo = info
                            }
                        })
                        if (currentInfo) {
                            const oddsInfo = await this.$store.dispatch(aTypes.getOddsDetailHandicap, {
                                fid: this.$route.params.fid,
                                cid,
                                date: this.match.matchtime
                            })
                            this.oddsInfo = oddsInfo
                        }
                        break
                    }
                    case 'zongfen': {
                        this.oddsInfo = null
                        let currentInfo = null
                        this.params.odds.some((info) => {
                            if (info.cid === cid) {
                                currentInfo = info
                            }
                        })
                        if (currentInfo) {
                            const oddsInfo = await this.$store.dispatch(aTypes.getOddsDetailPoints, {
                                fid: this.$route.params.fid,
                                cid,
                                date: this.match.matchtime
                            })
                            this.oddsInfo = oddsInfo
                        }
                        break
                    }
                    }
                } catch (e) {
                    this.error = true
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped>
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

    .pl-cont .red {
        color: #d3553d
    }

    .pl-cont .green {
        color: #36a171
    }
</style>

