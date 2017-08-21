<template>
    <div class="l-full l-flex-column">
        <div class="filter-cont">
            <!-- 日期筛选 -->
            <filter-time style="float: left"></filter-time>


            <!-- 联赛筛选 -->
            <filter-league style="float: right"></filter-league>

            <!-- 中超筛选弹窗 -->
            <div class="alert-csl alert-csl-close hide">
                <div class="month-tit"><span></span>轮次</div>
                <!-- 杯赛选择 -->
                <div class="cup-info fadeout">
                    <ul>
                        <li class="">巴西杯</li>
                        <li class="">吉尼斯杯</li>
                        <li class="">金杯奖</li>
                        <li class="">墨西杯</li>
                        <li class="cur">苏联赛杯</li>
                        <li class="">欧冠</li>
                        <li class="">女欧杯</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="l-flex-1 l-relative">
            <div v-if="isLoading" class="loading">
                <div class="icon"></div>
                <div class="icon-shadow"></div>
            </div>
            <matches-scroller ref="scroller" v-else @position="setPosition" :pos="position">
                <ul class="list">
                    <zq-list-item v-for="match in showedMatches" :match="match" key="match.fid"
                                  :view="view"></zq-list-item>
                </ul>
            </matches-scroller>

        </div>


    </div>


</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import zqListItem from '~components/home/zqListItem.vue'
    import filterTime from '~components/home/filterTime.vue'
    import filterLeague from '~components/home/filterLeague.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    const savedData = {}
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
            await store.dispatch(aTypes.fetchZqMatches, {expect, tab})
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.name && ~from.name.indexOf('football-detail')) {
                    vm.position = savedData.position
                    vm.selectOptions = savedData.selectOptions
                    vm.filteredMatches = savedData.filteredMatches
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            if (~to.name.indexOf('football-detail')) {
                savedData.selectOptions = this.selectOptions
                savedData.filteredMatches = this.filteredMatches
            }
            next()
        },
        data () {
            return {
                selectOptions: null,
                filteredMatches: null,
                position: 0
            }
        },
        watch: {
            showedMatchesSize () {
                this.$refs.scroller && this.$refs.scroller.update()
            },
            matches () {
                this.showExpectList = false
                this.filteredMatches = null
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

            '$route.path' () {
                this.fetchData()
            },

            refreshTime () {
                this.fetchData()
            }

        },
        components: {
            MatchesScroller, zqListItem, filterTime, filterLeague
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
            view () {
                return this.$store.state.home.view
            },
            showedMatchesSize () {
                return this.showedMatches && this.showedMatches.length
            },

            showedMatches () {
                return this.filteredMatches || this.matches
            },

            matches () {
                return this.zq.matches
            },

            curExpect () {
                return this.zq.curExpect
            },

            fidIndexMap () { // matches 变化了， fidIndexMap一定会变化
                const map = {}
                if (!this.matches) return null
                this.matches.forEach((match, idx) => {
                    if (match.status !== StatusCode.ENDED) {
                        map[match.fid] = idx
                    }
                })
                return map
            },

            expectList () {
                return this.zq.expectList
            },

            isLoading () {
                if (this.zq.tab === this.$route.params.tab) {
                    if (this.$route.params.expect === 'cur') {
                        return false
                    } else if (this.$route.params.expect === this.zq.curExpect) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            }
        },

        mounted () {
            this.fetchData()
        },

        methods: {
            setPosition (position) {
                savedData.position = position
                this.position = position
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.fetchZqMatches, this.$route.params)
                this.$store.commit('endOneRefresh')
            }
        }

    }
</script>
<style scoped>
    .loading {
        width: 100%;
        height: 2.5rem;
        text-align: center;
        position: relative
    }

    .loading .icon {
        display: inline-block;
        width: .72rem;
        height: .72rem;
        border-radius: 50% 50%;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAMAAABMOI/cAAAAVFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////8wXzyWAAAAG3RSTlMA+YX8+vQb7dbNpnlvYkQ7FwzhuLOgj4xIQQXn8XA9AAAAgElEQVQoz+WPSRKEIBAEBQX3GZ19rP//08JWxCD05sm8kNVFEE1ywK0wv82gebbusAp49OFFAB+eXUap1/lQML+cfSnG+qIGuTvrc1q1zK1heou3ckeo6Hk3h5KhFP2DNJNqhQilWaSUuNktdp7KdBIA4sP5xTU+6Ellyxitwi1HmooaqKw566UAAAAASUVORK5CYII=) no-repeat center center #ffba00;
        background-size: .32rem .373333rem;
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
        -webkit-animation: jump 1s infinite;
        animation: jump 1s infinite;
        position: absolute;
        left: 50%;
        margin-left: -.36rem;
        z-index: 2;
        margin-top: .3rem
    }

    @-webkit-keyframes jump {
        0% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: .933333rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        55% {
            top: 1.066667rem;
            height: .6rem;
            border-radius: .36rem .3rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        65% {
            top: .8rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        95% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        100% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }

    @keyframes jump {
        0% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: .933333rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        55% {
            top: 1.066667rem;
            height: .6rem;
            border-radius: .36rem .3rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        65% {
            top: .8rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        95% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        100% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }

    .loading .icon-shadow {
        position: absolute;
        left: 50%;
        margin-left: -.08rem;
        width: .16rem;
        height: .213333rem;
        background: rgba(20, 20, 20, .08);
        box-shadow: 0 0 .16rem .24rem rgba(20, 20, 20, .05);
        border-radius: .08rem/.106667rem;
        -webkit-transform: scaleY(.1);
        transform: scaleY(.1);
        -webkit-animation: shrink 1s infinite;
        animation: shrink 1s infinite;
        z-index: 1;
        top: 2rem
    }

    @-webkit-keyframes shrink {
        0% {
            top: 1.8rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: 1.925rem;
            margin-left: -.025rem;
            width: .06rem;
            height: .02rem;
            background: rgba(20, 20, 20, .3);
            box-shadow: 0 0 .06rem .12rem rgba(20, 20, 20, .1);
            border-radius: .06rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        100% {
            top: 1.8rem;
            margin-left: -.08rem;
            width: .16rem;
            height: .213333rem;
            background: rgba(20, 20, 20, .05);
            box-shadow: 0 0 .16rem .24rem rgba(20, 20, 20, .05);
            border-radius: .08rem/.106667rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }

    @keyframes shrink {
        0% {
            top: 1.8rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: 1.925rem;
            margin-left: -.025rem;
            width: .06rem;
            height: .02rem;
            background: rgba(20, 20, 20, .3);
            box-shadow: 0 0 .06rem .12rem rgba(20, 20, 20, .1);
            border-radius: .06rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        100% {
            top: 1.8rem;
            margin-left: -.08rem;
            width: .16rem;
            height: .213333rem;
            background: rgba(20, 20, 20, .05);
            box-shadow: 0 0 .16rem .24rem rgba(20, 20, 20, .05);
            border-radius: .08rem/.106667rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
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
