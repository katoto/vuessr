<template>
    <div v-if="daxiaopan">
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tr>
                    <th width="18%">公司</th>
                    <th width="15%"></th>
                    <th width="20%">大</th>
                    <th>盘口</th>
                    <th width="20%">小</th>
                </tr>
            </table>
        </div>
        <no-data v-if="!daxiaopan.odds || !daxiaopan.odds.length"></no-data>

        <div class="pl-box-bd" v-if="daxiaopan.odds && daxiaopan.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <colgroup>
                    <col width="18%">
                    <col width="15%">
                    <col width="20%">
                    <col width="">
                    <col width="20%">
                </colgroup>

                <tr v-for="info,idx in daxiaopan.odds" v-tap="{methods: viewOddsDetail, cid: info.cid}" >
                    <td>
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td></td>
                    <td >
                        <span class="f24" :class="{'red': info.first.b == 1, 'green': info.first.b == -1}">{{parseFloat(info.first.big).toFixed(2)|nullFormat}}</span><br>
                        <span class="f24" :class="{'red': info.end.b == 1, 'green': info.end.b == -1}">{{parseFloat(info.end.big).toFixed(2)|nullFormat}}</span>
                    </td>
                    <td >
                        <span class="f24" :class="{'sheng': info.first.pk == 1, 'jiang': info.first.pk == -1}">{{info.first.handi|nullFormat}}</span><br>
                        <span class="f24" :class="{'sheng': info.end.pk == 1, 'jiang': info.end.pk == -1}">{{info.end.handi|nullFormat}}</span>
                    </td>
                    <td>
                        <span class="f24" :class="{'red': info.first.s == 1, 'green': info.first.s == -1}">{{parseFloat(info.first.small).toFixed(2)|nullFormat}}</span><br>
                        <span class="f24" :class="{'red': info.end.s == 1, 'green': info.end.s == -1}">{{parseFloat(info.end.small).toFixed(2)|nullFormat}}</span>
                    </td>
                </tr>
            </table>
        </div>

        <div class="sk-btips" v-if="daxiaopan.odds && daxiaopan.odds.length">
            共{{daxiaopan.all_num}}家公司为你提供数据，其中主流公司{{daxiaopan.main_num}}家
            <br>
            <span>500彩票网提示：以上数据仅供参考，请以官方公布的数据为准</span>
        </div>
    </div>


</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import oddsInfo from '~components/detail/football/odds/oddsInfo.vue'
    import noData from '~components/no_data.vue'
    export default {
        async asyncData ({store, route: {params}}) {
        //            await store.dispatch(aTypes.getOddsDxp, params.fid)
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
                await this.$store.dispatch(aTypes.getOddsDxp, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                if (cid === '-1') return
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.daxiaopan.odds,
                        type: 'daxiaopan'
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
            daxiaopan () {
                return this.$store.state.zqdetail.odds.daxiaopan
            }
        },
        filters: {
            nullFormat: (value) => {
                return (value === '' || value === null) ? '--' : value
            }
        }

    }
</script>
