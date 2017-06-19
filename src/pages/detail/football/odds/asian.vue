<template>
   <div v-if="asian">
        <div class="pl-box-hd">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <tr>
                    <th width="18%">公司</th>
                    <th width="15%"></th>
                    <th width="20%">水</th>
                    <th>盘口</th>
                    <th width="20%">水</th>
                </tr>
            </table>
        </div>

        <!--<widget-prompt-view
                src="widget/prompt.html"
                drunk-if="!isRequesting && !oddsDataMap.asian || !oddsDataMap.asian.odds || !oddsDataMap.asian.odds.length"
                extra-text="很抱歉，没有数据"
                small-size
                type="no-data">
        </widget-prompt-view>-->

        <div class="pl-box-bd" v-if="asian.odds && asian.odds.length">
            <table cellspacing="0" cellpadding="0" border="0" class="pl-table" width="100%">
                <colgroup>
                    <col width="18%">
                    <col width="15%">
                    <col width="20%">
                    <col width="">
                    <col width="20%">
                </colgroup>

                <tr v-for="info in asian.odds"
                    drunk-highlight="{yebg: info.cid == highlightCid}"
                    drunk-on="click: redirect('#/footballdetail/' + tab + '/' + match.fid + '/asian/' + info.cid)">
                    <td>
                        <span class="color3">{{info.name}}</span>
                    </td>
                    <td></td>
                    <td class="carriage">
                        <span class="color6 f24"
                              :class="{'red': info.first.s1 == 1, 'green': info.first.s1 == -1}">{{info.first.home|nullFormat}}</span><br>

                        <span class="f24" :class="{'red': info.end.s1 == 1, 'green': info.end.s1 == -1}">{{info.end.home|nullFormat}}</span>
                    </td>
                    <td class="carriage">
                        <span class="color6 f24"
                              :class="{'sheng': info.first.pk == 1, 'jiang': info.first.pk == -1}">{{info.first.handi|nullFormat}}</span><br>

                        <span class="color6 f24" :class="{'sheng': info.end.pk == 1, 'jiang': info.end.pk == -1}">{{info.end.handi|nullFormat}}</span>
                    </td>
                    <td class="carriage">
                        <span class="color6 f24"
                              :class="{'red': info.first.s2 == 1, 'green': info.first.s2 == -1}">{{info.first.away|nullFormat}}</span><br>

                        <span class="f24" :class="{'red': info.end.s2 == 1, 'green': info.end.s2 == -1}">{{info.end.away|nullFormat}}</span>
                    </td>
                </tr>
            </table>
        </div>

        <div class="sk-btips" v-if="asian.odds && asian.odds.length">
            共{{asian.all_num}}家公司为你提供数据，其中主流公司{{asian.main_num}}家
            <br>
            <span>500彩票网提示：以上数据仅供参考，请以官方公布的数据为准</span>
        </div>

    </div>


</template>
<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import oddsInfo from '~components/detail/football/odds/oddsInfo.vue'
    export default {
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getOddsAsian, params.fid)
        },
        watch: {
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime) // 更新自定义滚动组件
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
                await this.$store.dispatch(aTypes.getOddsAsian, this.$route.params.fid)
                this.$store.commit('endOneRefresh')
            },
            viewOddsDetail ({cid}) {
                this.$store.commit(mTypes.setDialog, {
                    component: oddsInfo,
                    params: {
                        cid,
                        odds: this.asian.odds,
                        type: 'asian'
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
            asian () {
                return this.$store.state.zqdetail.odds.asian
            }
        },
        filters: {
            nullFormat: (value) => {
                return (value === '' || value === null) ? '--' : value
            }
        }

    }
</script>
