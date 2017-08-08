<template>
    <div class="l-full l-scroll-y">
        <div class="main" :class="{'top_0': noEmptyFlag}">
            <div v-if="teamInfo">
                <team-strength :strength="teamInfo.teamstrength" :score="teamInfo.finalscore" v-if="teamInfo.teamstrength"></team-strength>
                <div class="main-box">
                    <div class="box-tit">
                        <h2> 赛事排名</h2> </div>
                    <table width="100%" cellpadding="0" cellspacing="0" class="table" v-if="noEmptyFlag">
                        <tbody>
                        <tr>
                            <th align="left">赛季</th>
                            <th width="15%">排名</th>
                            <th width="15%">胜</th>
                            <th width="15%">负</th>
                            <th width="15%">胜率</th>
                        </tr>
                        <tr v-for="rank in teamInfo.teamrank">
                            <td align="left">{{rank | seasonFmt}}</td>
                            <td>{{rank.standing}}</td>
                            <td>{{rank.win}}</td>
                            <td>{{rank.lost}}</td>
                            <td>{{rank.winrate}}%</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="member-list member-empty" v-else>暂无数据</div>
                </div>
                <intro-box :introStr="teamInfo.introduction" v-if="teamInfo"></intro-box>
            </div>
        </div>
    </div>

</template>

<script>
import Prompt from '~components/prompt.vue'
import introBox from '~components/team/intro_box.vue'
import teamStrength from '~components/team/team_strength.vue'

export default {
    components: {
        Prompt, introBox, teamStrength
    },
    computed: {
        teamInfo () {
            return this.$store.state.teamLq.teamInfo
        },
        isCountry () {
            return !(this.teamInfo.teamrank instanceof Array)
        },
        noEmptyFlag () {
            return this.noEmpty(this.teamInfo.teamrank)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    },
    filters: {
        seasonFmt: (rank) => {
            return this.isCountry ? rank.year + '.' + rank.month : rank.seasonyear + ' ' + rank.simplegbname
        }
    }
}
</script>

<style lang="css" scoped>
    .main{width:100%;padding-top:.266667rem}
    .main-box{width:100%;margin-bottom:.266667rem;background:#fff;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .table{text-align:center}
    .table th{background:#fbfbfb;height:.8rem;font-size:.293333rem;color:#999;font-weight:400;border-bottom:1px solid #f1f1f1}
    .table td{height:.96rem; font-size: 0.32rem;}
    .table tr td:first-child,.table tr th:first-child{padding-left:.533333rem;color:#999}
    .member-list{padding:0.106667rem .533333rem}
    .member-list td{height:1.413333rem}
    .member-list td:nth-child(2){ text-indent: 0.1333rem;}
    .member-list td strong{font-size:.346667rem;font-weight:400}
    .member-list td p{font-size:.266667rem;height:.346667rem;line-height:.346667rem;color:#999}
    .member-empty {height:1.013333rem;color:#999;font-size:.373333rem;text-align:center; line-height: 1.01333rem;}
</style>
