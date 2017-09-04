<template>
    <div class="main member">
        <div class="l-full  l-scroll-y">
            <div class="main-box">
                <div class="box-tit">
                    <h2> 射手榜 </h2>
                </div>
                <div class="member-list" v-if="statisticList && statisticList.scores">
                    <table width="100%" cellpadding="0" cellspacing="0" v-for="score in statisticList.scores">
                        <colgroup>
                            <col width="10%">
                            <col width="">
                            <col width="18%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <td align="left">
                                <img class="member-face" v-face="score.avatar">
                            </td>
                            <td align="left">
                                <strong>{{score.playername}}</strong>

                                <p>{{score.teamsxname}}</p>
                            </td>
                            <td align="right">
                                <strong>{{score.goals}}</strong>

                                <p>{{score.avg_goals}}球/场</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="member-list member-empty" v-if="!statisticList.scores || !statisticList.scores.length">暂无数据</div>
            </div>
            <div class="main-box">
                <div class="box-tit">
                    <h2>助攻榜</h2>
                </div>
                <div class="member-list" v-if="statisticList && statisticList.assists">
                    <table width="100%" cellpadding="0" cellspacing="0" v-for="assist in statisticList.assists">
                        <colgroup>
                            <col width="10%">
                            <col width="">
                            <col width="18%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <td align="left">
                                <img class="member-face" v-face="assist.avatar">
                            </td>

                            <td align="left">
                                <strong>{{assist.playername}}</strong>
                                <p>{{assist.teamsxname}}</p>
                            </td>
                            <td align="right">
                                <strong>{{assist.assists}}</strong>
                                <p>{{assist.avg_assists}}助/场</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="member-list member-empty" v-if="!statisticList.assists || !statisticList.assists.length">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    import face from '~directives/face'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getFootballMatchStatistics, {seasonid: params.seasonid})
        },
        directives: {
            face
        },
        computed: {
            statisticList () {
                return this.$store.state.center.footballMatch.statistics
            }
        },
        mounted () {
            this.getFootStatistics()
        },
        methods: {
            getFootStatistics () {
                this.$store.dispatch(aTypes.getFootballMatchStatistics, {seasonid: this.$route.params.seasonid})
            }
        },
        watch: {
            '$route' () {
                this.getFootStatistics()
            }
        }
    }
</script>
<style scoped>
    .member{padding-top:0;padding-bottom:.8rem;background:#f4f4f4}
    .member .main-box{margin-bottom:0}
    .member .box-tit{background:#f4f4f4;height:.773333rem; position: -webkit-sticky;position: sticky;top: 0;}
    .member .box-tit h2{line-height:.773333rem;font-size:.373333rem;color:#666}
    .member-list{padding:0.106667rem .533333rem;background-color:#fff}
    .member-face{width:.8rem;height:.8rem;border-radius:50% 50%}
    .member-list td{height:1.413333rem}
    .member-list td:nth-child(2){ text-indent: 0.1333rem;}
    .member-list td strong{font-size:.346667rem;font-weight:400}
    .member-list td p{font-size:.266667rem;height:.346667rem;line-height:.346667rem;color:#999}
    .member-empty {height:1.013333rem;color:#999;font-size:.373333rem;text-align:center; line-height: 1.01333rem;}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
</style>
