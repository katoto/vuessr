<template>
    <div>
        <div class="popLayer "></div>
        <div style="z-index: 100;" class="l-full l-flex-column slide-bottom-to-top">
            <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
            <div class="popInner">
                <div class="full-scroll">
                    <div class="plleft">
                        <div class="scroller">
                            <ul class="plleft-list">
                                <li v-for="(info,index) in params.odds"
                                    v-tap="{methods: changeComp, cid: info.cid}"
                                    :class="{cur: info.cid == cid}" v-if="info.cid!=='-1'">{{info.name}}

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="plright" v-if="params.type === 'europe'">
                        <div class="pl-cont">
                            <div class="scroller">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table" v-if="oddsInfo && oddsInfo.length">
                                    <tbody>
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
                                    </tbody>
                                </table>
                            </div>
                            <no-match v-if="!oddsInfo || !oddsInfo.length"></no-match>
                        </div>
                    </div>

                    <div class="plright" v-if="params.type == 'rangqiu'">

                        <div class="pl-cont">
                            <div class="scroller">
                                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="plxq-table" v-if="oddsInfo && oddsInfo.length">
                                    <tbody>
                                    <tr>
                                        <th width="22%">客队</th>
                                        <th width="16%">盘口</th>
                                        <th width="22%">主队</th>
                                        <th width="30%" v-tap="{methods:updateCustomOddsInfo}">更新时间<em class="gxsj" id="gxsj"></em></th>
                                    </tr>
                                    <tr drunk-repeat="info,index in oddsInfo">
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
                                </table>

                            </div>
                            <!--<widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !oddsInfo || !oddsInfo.length" extra-text="很抱歉，没有数据"-->
                                                <!--type="no-match-bball">-->
                            <!--</widget-prompt-view>-->
                            <no-match v-if="!oddsInfo || !oddsInfo"></no-match>
                        </div>
                    </div>

                    <div class="plright" v-if="params.type == 'zongfen'">

                        <div class="pl-cont" id="europe-right">
                            <div class="scroller">

                                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="plxq-table" v-if="oddsInfo && oddsInfo.length">
                                    <tbody>
                                    <tr>
                                        <th width="22%">大分</th>
                                        <th width="16%">总分</th>
                                        <th width="22%">小分</th>
                                        <th width="30%" v-tap="{methods:updateCustomOddsInfo}">更新时间
                                            <em class="gxsj" id="gxsj"></em></th>
                                    </tr>
                                    <tr drunk-repeat="info,index in oddsInfo">
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
                            <no-match v-if="!oddsInfo || !oddsInfo.length"></no-match>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popFooter" v-tap="{methods: closeDialog}">
                <span class="arrow"></span>
                <h2 class="f30">赔率详情</h2>
            </div>
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
            console.log(this.cid)
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
