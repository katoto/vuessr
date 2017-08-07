<template>
<div class="l-full matches schedule-foot">
    <div class="list-view" style="height: 100%;overflow-y: auto;-webkit-overflow-scrolling: touch">
        <ul class="list-view-wrapper" v-if="noEmptyFlag">
            <li trackby="$index" class="list-view-item" v-for="(match, idx) in teamMatches" v-tap="{methods: goDetail, fid: match.fid}">
                <div class="schedule-itm l-flex-row">
                    <div class="when-game"> <em class="game-time">{{match.matchtime.substr(5, 11)}}</em> <em class="game-league">{{match.simplegbname + ' ' + match.stagegbname}}</em> </div>
                    <div class="who-game l-flex-1 l-flex-row">
                        <div class="who-gamer who-gamer-home l-flex-1"> <img :src="match.homelogo"> <em>{{match.homesxname}}</em> </div> <em class="who-win" :class="{'no-start': startStatus[idx]}" v-html="scoreText[idx]"></em>
                        <div class="who-gamer who-gamer-guest l-flex-1"> <img :src="match.awaylogo"><em>{{match.awaysxname}}</em> </div>
                    </div>
                </div>
            </li>
        </ul>
        <prompt v-else type="no-data" tip0="暂无数据"/>
    </div>
</div>
</template>

<script>
import {aTypes} from '~store/team/zq'
import Prompt from '~components/prompt.vue'
export default {
    components: {
        Prompt
    },
    computed: {
        teamMatches () {
            return this.$store.state.teamZq.teamMatches
        },
        noEmptyFlag () {
            return this.noEmpty(this.teamMatches)
        },
        startStatus () {
            return this.teamMatches.map((match) => {
                return !(match.homescore && match.awayscore)
            })
        },
        scoreText () {
            return this.teamMatches.map((match) => {
                return this.scoreFmt(match)
            })
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getTeamMatches, this.$route.params.tid)
    },
    methods: {
        goDetail ({fid}) {
            this.$router.push(`/detail/football/${fid}/situation`)
        },
        scoreFmt (match) {
            if (match.homescore && match.awayscore) {
                return `${match.homescore}<i>:</i>${match.awayscore}`
            } else {
                return 'vs'
            }
        },
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    }
}
</script>

<style lang="css">
</style>
