<template>
    <div class="l-full l-flex-column">
        <!--二级菜单选择总榜主场客场-->
        <div class="sk-detail-tap-box three" v-if="iscup && iscup === '0' ">
            <ul class="sk-detail-tap three">
                <li :class="{'cur':tab==='all'}" v-tap="{methods:onTab, type:'all'}">总榜</li>
                <li :class="{'cur':tab==='home'}" v-tap="{methods:onTab, type:'home'}">主场</li>
                <li :class="{'cur':tab==='away'}" v-tap="{methods:onTab, type:'away'}">客场</li>
            </ul>
        </div>

        <!--总榜-->
        <template v-if="tab === 'all' ">
            <all :allData="allData"></all>
        </template>

        <!--主场-->
        <template v-if="tab === 'home' ">
            <home :homeData="homeData"></home>
        </template>

        <!--客场-->
        <template v-if="tab === 'away' ">
            <away :awayData="awayData"></away>
        </template>

    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    import all from '~components/match/football/all.vue'
    import home from '~components/match/football/home.vue'
    import away from '~components/match/football/away.vue'
    export default{
        components: {
            all, away, home
        },
        data () {
            return {
                tab: 'all'
            }
        },
        computed: {
            allData () {
                return this.$store.state.center.footballMatch.integral.all
            },
            homeData () {
                return this.$store.state.center.footballMatch.integral.home
            },
            awayData () {
                return this.$store.state.center.footballMatch.integral.away
            },
            iscup () {
                return this.$store.state.center.footballMatch.head && this.$store.state.center.footballMatch.head.iscup
            }
        },
        mounted () {
            this.getAll()
        },
        watch: {
            '$route' () {
                this.getAll()
            },
            iscup (iscup) {
                switch (this.tab) {
                case 'all': { this.getAll(); break }
                case 'home': { this.getHome(); break }
                case 'away': { this.getAway() }
                }
            }
        },
        methods: {
            getAll () {
                // console.log(this.iscup);
                return this.$store.dispatch(aTypes.getFootballIntegralAll, {seasonid: this.$route.params.seasonid, iscup: this.iscup})
            },
            getHome () {
                return this.$store.dispatch(aTypes.getFootballIntegralHome, {seasonid: this.$route.params.seasonid, iscup: 0})
            },
            getAway () {
                return this.$store.dispatch(aTypes.getFootballIntegralAway, {seasonid: this.$route.params.seasonid, iscup: 0})
            },
            onTab ({type}) {
                this.tab = type
                switch (type) {
                case 'all': { if (!this.allData) return this.getAll(); break }
                case 'home': { if (!this.homeData) return this.getHome(); break }
                case 'away': { if (!this.awayData) return this.getAway() }
                }
            }
        }
    }
</script>

<style scoped>
    .sk-detail-tap-box{text-align:center}
    .sk-detail-tap-box{text-align:center}
    .sk-detail-tap{margin:.266667rem auto .166667rem;font-size:.346667rem;border:1px solid #999;text-align:center; border-radius:.053333rem;display:inline-block}
    .sk-detail-tap li{width:2rem;height:.773333rem;line-height:.773333rem;color:#787878;float:left}
    .sk-detail-tap li.cur{background:#999;color:#fff}
    .three li{width:2rem;border-right:1px solid #aaa}
    .three li:last-child{border-right:0}
</style>
