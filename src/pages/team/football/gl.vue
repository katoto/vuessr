<template>
<div class="l-full l-scroll-y">
    <div class="main" :class="{'top_0': noEmptyFlag}">
        <div class="main-box">
            <div class="box-tit">
                <h2>{{matchType}}</h2> </div>
                <table width="100%" cellpadding="0" cellspacing="0" class="table" v-if="noEmptyFlagRank">
                    <!-- 国家联赛 -->
                    <tbody v-if="isCountry">
                        <tr>
                            <th align="left">日期</th>
                            <th width="20%">排名</th>
                            <th width="20%">排名变化</th>
                            <th width="20%">积分</th>
                        </tr>
                        <tr>
                            <td align="left">{{teamInfo.teamrank | seasonFmt}}</td>
                            <td>{{teamInfo.teamrank.rank}}</td>
                            <td>{{teamInfo.teamrank.rankchange}}</td>
                            <td>{{teamInfo.teamrank.point}}</td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr>
                            <th align="left">赛季</th>
                            <th width="15%">排名</th>
                            <th width="15%">胜</th>
                            <th width="15%">平</th>
                            <th width="15%">负</th>
                        </tr>
                        <tr v-for="rank in teamInfo.teamrank">
                            <td align="left">{{rank | seasonFmt}}</td>
                            <td>{{rank.standing}}</td>
                            <td>{{rank.win}}</td>
                            <td>{{rank.draw}}</td>
                            <td>{{rank.lost}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="member-list member-empty" v-else>暂无数据</div>
        </div>
        <intro-box :introStr="teamInfo.introduction" v-if="teamInfo"></intro-box>
    </div>
</div>
</template>

<script>
import Prompt from '~components/prompt.vue'
import introBox from '~components/team/intro_box.vue'

export default {
    components: {
        Prompt, introBox
    },
    computed: {
        teamInfo () {
            return this.$store.state.teamZq.teamInfo
        },
        matchType () {
            return this.isCountry ? '国际积分排名' : '赛事排名'
        },
        isCountry () {
            return !(this.teamInfo.teamrank instanceof Array)
        },
        noEmptyFlag () {
            return this.noEmpty(this.teamInfo)
        },
        noEmptyFlagRank () {
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
    .l-scroll-y{overflow: auto;-webkit-overflow-scrolling:touch;}
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .main{width:100%;padding-top:.266667rem}
    .main-box{width:100%;margin-bottom:.266667rem;background:#fff;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .table{text-align:center}
    .table th{background:#fbfbfb;height:.8rem;font-size:.293333rem;color:#999;font-weight:400;border-bottom:1px solid #f1f1f1}
    .table td{height:.96rem; font-size: 0.32rem;}
    .table tr td:first-child,.table tr th:first-child{padding-left:.533333rem;color:#999}
    .introduction header{font-weight:700;margin-bottom:.4rem}
    .introduction p{margin-bottom:.4rem;}
    .member-list{padding:0.106667rem .533333rem}
    .member-list td{height:1.413333rem}
    .member-list td:nth-child(2){ text-indent: 0.1333rem;}
    .member-list td strong{font-size:.346667rem;font-weight:400}
    .member-list td p{font-size:.266667rem;height:.346667rem;line-height:.346667rem;color:#999}
    .member-empty {height:1.013333rem;color:#999;font-size:.373333rem;text-align:center; line-height: 1.01333rem;}
</style>
