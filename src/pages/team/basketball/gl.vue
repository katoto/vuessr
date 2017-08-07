<template>
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
</template>

<script>
import {
    aTypes
} from '~store/team/lq'
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

<style lang="css">
</style>
