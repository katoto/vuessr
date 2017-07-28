
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
                return this.$store.state.lqdetail.odds && this.$store.state.lqdetail.odds.europe
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
