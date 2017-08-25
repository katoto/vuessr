<template>
    <div class="l-full">
        <login-page v-if="!hasLogin"></login-page>
        <template v-else>
            <loading v-if="!matches"></loading>
            <template v-else>
                <empty v-if="matches.length === 0"></empty>
                <matches-scroller ref="scroller" v-else @position="setPosition" :pos="position">
                    <ul class="list">
                        <lq-list-item v-for="match in matches" :match="match" key="match.fid"
                                      :view="view"></lq-list-item>
                    </ul>
                </matches-scroller>
            </template>
        </template>
    </div>


</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import lqListItem from '~components/home/lqListItem.vue'
    import empty from '~components/home/empty.vue'
    import loading from '~components/home/loading.vue'
    import loginPage from '~components/home/loginPage.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    const savedData = {}
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.name && ~from.name.indexOf('football-detail')) {
                    vm.position = savedData.position
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            if (~to.name.indexOf('football-detail')) {
                savedData.position = this.position
            }
            next()
        },
        data () {
            return {
                position: 0,
                ready: false
            }
        },
        watch: {
            filteredMatches (after, before) {
                if (!before || before.length !== after.length) {
                    this.position = 0
                    this.$refs.scroller && this.$refs.scroller.update()
                }
            },
            fidIndexMap (fidIndexMap) {
                this.$store.dispatch(aTypes.subscribeFootballInfo, Object.keys(fidIndexMap))
            },

            socketData ({data, stamp}) {
                if (stamp === pushEvents.FOOTBALL_INFO) {
                    data.fid = data.fid + ''
                    let match = this.matches[this.fidIndexMap[data.fid]]
                    if (match && match.fid === data.fid) {
                        this.$store.commit(mTypes.updateZqMatch, {info: data, idx: this.fidIndexMap[data.fid]})
                    }
                }
            },
            refreshTime () {
                this.fetchData()
            }

        },
        components: {
            MatchesScroller, lqListItem, empty, loginPage, loading
        },

        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },

            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },

            zq () {
                return this.$store.state.home.zq
            },
            view () { // 展示赔率， 最近6场比赛， 空 三种情况标志位
                return this.$store.state.home.view
            },
            matches () {
                return this.zq.concern
            },

            fidIndexMap () { // matches 变化了， fidIndexMap一定会变化
                const map = {}
                if (!this.matches) return map
                this.matches.forEach((match, idx) => {
                    if (match.status !== StatusCode.ENDED) {
                        map[match.fid] = idx
                    }
                })
                return map
            },
            hasLogin () {
                return this.$store.state.home.hasLogin
            }
        },

        async mounted () {
            if (this.hasLogin) {
                await this.fetchData()
                this.ready = true
            }
        },

        methods: {
            setPosition (position) {
                savedData.position = position
                this.position = position
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getConcern, '1')
                this.$store.commit('endOneRefresh')
            }
        }

    }
</script>
<style scoped>
    .fl {
        float: left;
    }

    .fr {
        float: right;
    }


    .qi-list-box {
        position: relative;
        top: 0;
    }

    .qi-list-box a {
        display: block;
        color: inherit;
    }

    .filter-cont {
        width: 9.2rem;
        margin: 0 auto;
        margin-top: .266667rem;
        color: #aab5bd;
        font-size: .346667rem;
        clear: both;
        zoom: 1;
        position: relative
    }

    .filter-time {
        width: 6.88rem;
        height: 1.066667rem;
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        float: left;
        box-sizing: border-box
    }

    [data-dpr="1"] .filter-time {
        line-height: 40px
    }

    [data-dpr="2"] .filter-time {
        line-height: 80px
    }

    [data-dpr="3"] .filter-time {
        line-height: 120px
    }

    .filter-league, .filter-time {
        box-shadow: 0 0 .133333rem rgba(22, 34, 29, .1)
    }

    .filter-time .prev-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: left
    }

    .filter-time .prev-day span {
        display: inline-block;
        width: .16rem;
        height: .293333rem;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        background: url(/mobile/touch/images/bifen/bifen-list/prev.png) no-repeat;
        background-size: cover;
        left: 50%;
        margin-left: -.08rem
    }

    .filter-time .today {
        width: 4.906667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        float: left;
        padding-left: 1.733333rem;
        box-sizing: border-box;
        position: relative
    }

    .filter-time .today span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        left: 1.066667rem;
        background: url(/mobile/touch/images/bifen/bifen-list/date.png) no-repeat;
        background-size: cover
    }

    .filter-time .next-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: right
    }

    .filter-time .next-day span {
        display: inline-block;
        width: .16rem;
        height: .293333rem;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        background: url(/mobile/touch/images/bifen/bifen-list/prev.png) no-repeat;
        background-size: cover;
        left: 50%;
        margin-left: -.08rem
    }

    .rotate180 {
        -webkit-animation: all .2s linear;
        animation: all .2s linear;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .filter-league:active, .filter-time .next-day:active, .filter-time .prev-day:active, .filter-time .today:active {
        background: #f4f4f4
    }

    .filter-league {
        width: 2.066667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        text-align: center;
        text-align: left;
        padding-left: 1.013333rem;
        box-sizing: border-box;
        position: relative;
        float: right
    }

    .filter-league span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        background: url(/mobile/touch/images/bifen/bifen-list/select.png) no-repeat;
        background-size: cover;
        left: .333333rem
    }

    .alert-datetime {
        width: 9.2rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: .4rem .4rem .506667rem .4rem;
        box-sizing: border-box;
        border-radius: .106667rem;
        background: #fff;
        z-index: 2
    }

    [data-dpr="1"] .alert-datetime {
        border: .5px solid #eaeaea
    }

    [data-dpr="2"] .alert-datetime {
        border: 1px solid #eaeaea
    }

    [data-dpr="3"] .alert-datetime {
        border: 1.5px solid #eaeaea
    }

    .month-tit {
        height: .466667rem;
        line-height: .466667rem;
        width: 100%;
        padding-left: .72rem;
        box-sizing: border-box;
        position: relative;
        font-size: .346667rem;
        margin-bottom: .4rem
    }

    .month-tit span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        left: 0;
        background: url(/mobile/touch/images/bifen/bifen-list/date.png) no-repeat;
        background-size: cover
    }

    .week-tit {
        height: .72rem;
        line-height: .72rem;
        font-size: .32rem;
        color: #aab5bd
    }

    .week-tit ul {
        overflow: hidden;
        clear: both
    }

    .week-tit ul li {
        float: left;
        width: .88rem;
        text-align: center;
        margin-right: .293333rem
    }

    .week-tit ul li:last-child {
        margin-right: 0
    }

    .weeker-item {
        height: auto;
        font-size: .346667rem;
        color: #242c35
    }

    .weeker-item ul {
        overflow: hidden;
        clear: both
    }

    .weeker-item ul li {
        height: .88rem;
        line-height: .88rem;
        margin-top: .133333rem
    }

    .weeker-item ul .cur {
        background: #d25138;
        border-radius: 50%;
        color: #fff
    }

    .alert-league {
        padding-top: .4rem;
        width: 9.2rem;
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        border-radius: .106667rem;
        background: #fff;
        z-index: 2
    }

    [data-dpr="1"] .alert-league {
        border: .5px solid #eaeaea
    }

    [data-dpr="2"] .alert-league {
        border: 1px solid #eaeaea
    }

    [data-dpr="3"] .alert-league {
        border: 1.5px solid #eaeaea
    }

    .matches-info {
        width: 8.4rem;
        margin: 0 auto;
        color: #aab5bd;
        overflow: hidden;
        margin-bottom: .613333rem
    }

    [data-dpr="1"] .matches-info {
        font-size: 13px
    }

    [data-dpr="2"] .matches-info {
        font-size: 26px
    }

    [data-dpr="3"] .matches-info {
        font-size: 39px
    }

    .matches-info-l {
        float: left;
        padding-left: .8rem;
        position: relative
    }

    .matches-info-l span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        background: url(/mobile/touch/images/bifen/bifen-list/select.png) no-repeat;
        background-size: cover;
        left: .133333rem
    }

    .matches-info-r {
        float: right;
        text-align: right
    }

    .cup-info {
        width: 8.4rem;
        margin: 0 auto;
        min-height: 6.133333rem
    }

    .cup-info ul {
        overflow: hidden
    }

    .cup-info ul li {
        width: 2.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        float: left;
        margin-right: .373333rem;
        background: #ebf1f5;
        color: #242c35;
        text-align: center;
        border-radius: .16rem;
        margin-bottom: .266667rem
    }

    .cup-info ul li:nth-child(3n) {
        margin-right: 0;
        float: right
    }

    .cup-info ul .cur {
        background: #5c788f;
        color: #fff
    }

    .select-all {
        width: 8.4rem;
        margin: 0 auto;
        overflow: hidden
    }

    .select-all li {
        padding: .133333rem .266667rem;
        border: 1px solid #eaeaea;
        border-radius: .32rem;
        color: #aab5bd;
        float: left;
        margin-right: .266667rem
    }

    [data-dpr="1"] .select-all li {
        font-size: 11px
    }

    [data-dpr="2"] .select-all li {
        font-size: 22px
    }

    [data-dpr="3"] .select-all li {
        font-size: 33px
    }

    .select-all .cur {
        background: #ebf1f5;
        color: #242c35
    }

    .btn-cont {
        width: 100%;
        border-top: 1px solid #eaeaea;
        font-size: .4rem;
        color: #242c35;
        margin-top: .4rem;
        height: 1.2rem;
        line-height: 1.2rem;
        position: absolute;
        bottom: 0;
        left: 0
    }

    .btn-cont .btn-sure {
        width: 50%;
        box-sizing: border-box;
        text-align: center;
        position: absolute;
        bottom: 0
    }

    .btn-cont .btn-l {
        border-right: 1px solid #eaeaea;
        left: 0
    }

    .btn-cont .btn-r {
        right: 0
    }

    .btn-cont .btn-sure:active {
        background: #f4f4f4
    }

    .one-game {
        padding: .333333rem .4rem .346667rem .4rem;
        border-bottom: 1px solid #eaeaea
    }

    .one-game:active {
        -webkit-tap-highlight-color: rgba(244, 244, 244, .6)
    }
</style>