<template >
    <ul class="list-view-wrapper">
        <li trackby="$index" class="list-view-item" v-for="(match, idx) in teamMatches" v-tap="{methods: goDetail, fid: match.fid}" :id="'match' + idx">
            <div class="schedule-itm l-flex-row">
                <div class="when-game"> <em class="game-time">{{match.matchtime.substr(5, 11)}}</em> <em class="game-league">{{match.simplegbname + ' ' + match.stagegbname}}</em> </div>
                <div class="who-game l-flex-1 l-flex-row">
                    <div class="who-gamer who-gamer-home l-flex-1"> <img :src="match.homelogo"> <em>{{match.homesxname}}</em> </div>
                    <em class="who-win" :class="{'no-start': noStartStatus[idx]}" v-html="scoreText[idx]"></em>
                    <div class="who-gamer who-gamer-guest l-flex-1"> <img :src="match.awaylogo"><em>{{match.awaysxname}}</em> </div>
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
    data () {
        return {
            goDetailFlag: false
        }
    },
    computed: {
        noStartStatus () {
            return this.teamMatches.map((match) => {
                return !(match.homescore && match.awayscore)
            })
        },
        firstNoStartId () {
            return this.noStartStatus.indexOf(true)
        },
        scoreText () {
            return this.teamMatches.map((match) => {
                return this.scoreFmt(match)
            })
        }
    },
    methods: {
        initPos () {
            if (sessionStorage.getItem('teamScPos')) {
                this.$el.parentElement.scrollTop = sessionStorage.getItem('teamScPos')
            } else {
                this.goNoStartMatch()
            }
        },
        goDetail ({fid}) {
            sessionStorage.setItem('teamScPos', this.$el.parentElement.scrollTop)
            this.goDetailFlag = true
            this.$router.push(`/detail/football/${fid}/situation`)
        },
        scoreFmt (match) {
            if (match.homescore && match.awayscore) {
                return `${match.homescore}<i style="color: #999; margin:0 0.13333rem; display: inline-block;">:</i>${match.awayscore}`
            } else {
                return 'vs'
            }
        },
        goNoStartMatch () {
            var noStartDom = this.$el.querySelector('#match' + (this.firstNoStartId - 1))
            if (!noStartDom) return
            this.$el.parentElement.scrollTop = noStartDom.offsetTop
        }
    },
    mounted () {
        this.initPos()
    },
    destroyed () {
        if (!this.goDetailFlag) {    // 假如不是跳到详情页，则清楚位置记录
            sessionStorage.removeItem('teamScPos')
        }
    }
}
</script>

<style lang="css" scoped>
    .schedule-itm{clear:both;box-sizing:border-box;height:1.333333rem;border-bottom: 1px solid #f4f4f4;
        font-size: 0.293333rem;color: #999999; background: #fff;}
    .l-flex-row{ display:-webkit-box; -webkit-box-orient: horizontal; display:flex; flex-flow: row; width: 100%}
    .l-flex-1{ -webkit-box-flex: 1; flex:1;overflow: hidden}
    .when-game{width: 2.773333rem; text-align: left;margin-left: 0.533333rem;clear:both;font-size: 0.266667rem}
    .game-time,.game-league{display: inline-block;width: 3.7rem}
    .game-time{margin-top: 0.3rem;color: #999;}
    .who-game{color: #333333; font-size:0.346667rem;height: 1.333333rem;line-height:1.333333rem;margin-right: 0.533333rem;}
    .who-gamer{ width: 0;}
    .who-gamer-home{ text-align: right; position: relative; }
    .who-gamer-home img{position: absolute;left: 0; top:50%; margin-top:-0.30666rem}
    .who-gamer-home img,.who-gamer-guest img{max-width: 0.506667rem; max-height: 0.506667rem;}
    .who-gamer-home em, .who-gamer-guest em{ display: inline-block; width: 1.5rem; text-align:center;}
    .schedule-foot .who-gamer-home em, .schedule-foot .who-gamer-guest em{ display: inline-block;
        width: 1.7rem; text-align:center;}
    .who-win{width: 1.733333rem; text-align: center;display:inline-block; background: #f4f4f4; height: 0.64rem;height: 0.64rem;
        line-height: 0.64rem;position: relative;top: 50%;margin-top: -0.32rem; margin-left:0.133333rem;
        margin-right: 0.133333rem;border-radius: 0.066667rem;}
    .who-win i{ color: #999; margin:0 0.13333rem; display: inline-block;}
    .schedule-foot .who-win{ width: 1.173333rem}
    .schedule-foot .when-game{ width: 3rem;}
    .who-gamer-guest{text-align: left; position: relative;}
    .who-gamer-guest img{position: absolute;right: 0; top:50%; margin-top: -0.30666rem;}
    .no-start{ color:#999; background: none; font-size: 0.32rem}
</style>
