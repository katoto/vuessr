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

            <!--<widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !oddsDataMap.europe || !oddsDataMap.europe.odds || !oddsDataMap.europe.odds.length"
                                extra-text="很抱歉，没有数据" small-size type="no-data">
            </widget-prompt-view>-->

            <div class="pl-box-bd">
                <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                    <colgroup>
                        <col width="19%">
                        <col width="7%">
                        <col width="28%">
                        <col width="28%">
                        <col width="">
                    </colgroup>
                    <tbody>
                    <tr drunk-class="{'noLink':idx==0}" v-for="info,idx in europe.odds" drunk-highlight="{'yebg': info.cid == highlightCid}"
                        v-tap="{methods: viewOddsDetail, cid: info.cid}"
                        drunk-on="click:(info.cid != '-1' && redirect('#/footballdetail/' + tab + '/' + match.fid + '/europe/' + info.cid))">
                        <td>
                            <span class="color3">{{info.name}}</span>
                        </td>
                        <td></td>
                        <td class="colorc">
                            <p class="pl-num"><span :class="{'red': info.first.w == 1, 'green': info.first.w == -1}">{{parseFloat(info.first.win).toFixed(2)|nullFormat}}</span>/<span
                                    drunk-class="{'red': info.first.d == 1, 'green': info.first.d == -1}">{{parseFloat(info.first.draw).toFixed(2)|nullFormat}}</span>/<span :class="{'red': info.first.l == 1, 'green': info.first.l == -1}">{{parseFloat(info.first.lost).toFixed(2)|nullFormat}}</span></p>
                            <p class="pl-num"><span drunk-class="{'red': info.end.w == 1, 'green': info.end.w == -1}">{{parseFloat(info.end.win).toFixed(2)|nullFormat}}</span>/<span
                                    drunk-class="{'red': info.end.d == 1, 'green': info.end.d == -1}">{{parseFloat(info.end.draw).toFixed(2)|nullFormat}}</span>/<span :class="{'red': info.end.l == 1, 'green': info.end.l == -1}">{{parseFloat(info.end.lost).toFixed(2)|nullFormat}}</span></p>
                        </td>
                        <td>
                            <p class="pl-num"><span drunk-class="{'red': info.first.wkl == 1, 'green': info.first.wkl == -1}">{{parseFloat(info.first.winkl).toFixed(2)|nullFormat}}</span>/<span
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
                <span>500彩票网提示：以上数据仅供参考，请以官方公布的数据为准</span>
            </div>
        </div>
</template>
<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import oddsInfo from '~components/detail/football/odds/oddsInfo.vue'
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getOddsEurope, params.fid)
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
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.europe,
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
