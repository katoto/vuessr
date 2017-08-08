<template>
    <div class="main member">
        <div class="l-full  l-scroll-y">
            <div class="main-box">
                <div class="box-tit">
                    <h2> 射手榜 </h2>
                </div>
                <div class="member-list" v-if="statisticList.scores">
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
                <div class="member-list member-empty" v-if="!statisticList.scores">暂无数据</div>
            </div>
            <div class="main-box">
                <div class="box-tit">
                    <h2>助攻榜</h2>
                </div>
                <div class="member-list" v-if="statisticList.assists">
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
                <div class="member-list member-empty" v-if="!statisticList.assists">暂无数据</div>
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
