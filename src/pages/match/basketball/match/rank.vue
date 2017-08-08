<template>
    <section class="">
        <div class="inte-main l-full l-scroll-y" v-if="rankList">
            <!--有东西部之分-->
            <div v-if="rankList.rettype=='object'" class="games-list rank-tb">
                <table class="games" width="100%" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="35%">
                        <col width="18%">
                        <col width="15%">
                        <col width="15%">
                        <col width="17%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th class="tb-lp">
                            <em class="where-mat">东部</em>
                        </th>
                        <th>胜/负</th>
                        <th>胜率</th>
                        <th>胜差</th>
                        <th align="right">状态</th>
                    </tr>
                    <tr v-for="list in rankList.values.east">
                        <td>
                            <em class="cate-cont"><i class="game-category ">{{list.order}}</i></em>
                            <em class="gamer-cont">
                                <img v-logo="list.teamlogo" >{{list.teamgbname}}
                            </em>
                        </td>
                        <td>{{list.win}}/{{list.lost}}</td>
                        <td>{{list.winrate}}%</td>
                        <td>{{list.windiff}}</td>
                        <!--如果连续失败就用tb-rp-fail-->
                        <td v-if="list['winstatus']==='1'" class="tb-rp">{{list.wintext}}连胜</td>
                        <td v-if="list['winstatus']==='0'" class="tb-rp-fail tb-rp">{{list.wintext}}连败</td>
                        <td v-if="list['winstatus']==='-1'">--</td>
                    </tr>
                    </tbody>
                </table>

                <table class="games" width="100%" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="35%">
                        <col width="18%">
                        <col width="15%">
                        <col width="15%">
                        <col width="17%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th class="tb-lp">
                            <em class="where-mat">西部</em>
                        </th>
                        <th>胜/负</th>
                        <th>胜率</th>
                        <th>胜差</th>
                        <th align="right">状态</th>
                    </tr>
                    <tr v-for="list in rankList.values.west">
                        <td>
                            <em class="cate-cont"><i class="game-category ">{{list.order}}</i></em>
                            <em class="gamer-cont">
                                <img v-logo="list.teamlogo" >{{list.teamgbname}}
                            </em>
                        </td>
                        <td>{{list.win}}/{{list.lost}}</td>
                        <td>{{list.winrate}}%</td>
                        <td>{{list.windiff}}</td>
                        <!--如果连续失败就用tb-rp-fail-->
                        <td v-if="list['winstatus']==='1'" class="tb-rp">{{list.wintext}}连胜</td>
                        <td v-if="list['winstatus']==='0'" class="tb-rp-fail tb-rp">{{list.wintext}}连败</td>
                        <td v-if="list['winstatus']==='-1'">--</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="rankList['rettype']==='array'" class="games-list rank-tb">
                <table class="games" width="100%" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="35%">
                        <col width="18%">
                        <col width="15%">
                        <col width="15%">
                        <col width="17%">
                    </colgroup>
                    <tr>
                        <th class="tb-lp"></th>
                        <th>胜/负</th>
                        <th>胜率</th>
                        <th>胜差</th>
                        <th align="right">状态</th>
                    </tr>
                    <tr v-for="item in rankList.values">
                        <td>
                            <em class="cate-cont"><i class="game-category ">{{item.order}}</i></em>
                            <em class="gamer-cont">
                                <img v-logo="item.teamlogo" >{{item.teamgbname}}
                            </em>
                        </td>
                        <td>{{item.win}}/{{item.lost}}</td>
                        <td>{{item.winrate}}%</td>
                        <td>{{item.windiff}}</td>
                        <!--如果连续失败就用tb-rp-fail-->
                        <td v-if="item['winstatus']==='1'" class="tb-rp">{{item.wintext}}连胜</td>
                        <td v-if="item['winstatus']==='0'" class="tb-rp-fail tb-rp">{{item.wintext}}连败</td>
                        <td v-if="item['winstatus']==='-1'">--</td>
                    </tr>
                </table>
            </div>

        </div>
        <div v-else>
            <ViewEmpty></ViewEmpty>
        </div>
    </section>
</template>

<script>
    import ViewEmpty from '~components/match/basketball/view_empty.vue'
    // import basketballHeader from '~components/match/basketball/basketball_header.vue'
    import {aTypes} from '~store/center'
    import logo from '~directives/logo'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getBasketballMatchRank, {seasonid: params.seasonid})
        },
        components: {
            ViewEmpty
        },
        directives: {
            logo
        },
        computed: {
            rankList () {
                return this.$store.state.center.basketballMatch.rank
            }
        },
        watch: {
            '$route' () {
                this.fetchData()
            }

        },
        methods: {
            fetchData () {
                this.$store.dispatch(aTypes.getBasketballMatchRank, {seasonid: this.$route.params.seasonid})
            }
        }
    }
</script>
