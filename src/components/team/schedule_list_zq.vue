<template >
    <ul class="list-view-wrapper">
        <li trackby="$index" class="list-view-item" v-for="(match, idx) in teamMatches" v-tap="{methods: goDetail, fid: match.fid}">
            <div class="schedule-itm l-flex-row">
                <div class="when-game"> <em class="game-time">{{match.matchtime.substr(5, 11)}}</em> <em class="game-league">{{match.simplegbname + ' ' + match.stagegbname}}</em> </div>
                <div class="who-game l-flex-1 l-flex-row">
                    <div class="who-gamer who-gamer-guest l-flex-1"> <img :src="match.awaylogo"><em>{{match.awaysxname}}</em> </div>
                    <div class="who-gamer who-gamer-home l-flex-1"> <img :src="match.homelogo"> <em>{{match.homesxname}}</em> </div> <em class="who-win" :class="{'no-start': startStatus[idx]}" v-html="scoreText[idx]"></em>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        teamMatches: {
            type: Array,
            required: true
        }
    },
    computed: {
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
        }
    }
}
</script>

<style lang="css">
</style>
