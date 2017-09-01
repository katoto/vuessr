<template>
    <loading v-if="isLoading===1"></loading>
    <div class="l-full l-flex-column" v-else>
        <div class="filter-cont">
            <!-- 日期筛选 -->
            <filter-time class="fl" :expect-list="expectList" :cur-expect="curExpect"></filter-time>
            <!-- 联赛筛选 -->
            <filter-league class="fr" :initial="selectOptions" :matches="matches" @ok="doFilter"></filter-league>
        </div>

        <div class="l-flex-1 l-relative">
            <loading v-if="isLoading === 2"></loading>
           <template v-else>
               <empty v-if="filteredMatches.length === 0"></empty>
               <matches-scroller ref="scroller" v-else @position="setPosition" :pos="position">
                   <ul class="list">
                       <lq-list-item v-for="match in filteredMatches" :match="match" key="match.fid" :ready="ready"
                                     :view="view" :concern="concerns && concerns[match.fid]"></lq-list-item>
                   </ul>
               </matches-scroller>
           </template>

        </div>
        <toast v-if="toast.visible" :msg="toast.msg"/>
    </div>


</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import toast from '~components/toast.vue'
    import lqListItem from '~components/home/lqListItem.vue'
    import filterTime from '~components/home/filterTimeB.vue'
    import loading from '~components/home/loading.vue'
    import filterLeague from '~components/home/filterLeague.vue'
    import empty from '~components/home/empty.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    const savedData = {}
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
            await store.dispatch(aTypes.fetchLqMatches, {params: {expect, tab}, dataHandler: null})
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.name && ~from.name.indexOf('basketball-detail')) {
                    vm.position = savedData.position
                    vm.selectOptions = savedData.selectOptions
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            if (~to.name.indexOf('basketball-detail')) {
                savedData.selectOptions = this.selectOptions
                savedData.position = this.position
            }
            next()
        },
        data () {
            return {
                selectOptions: null,
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
                this.$store.dispatch(aTypes.subscribeBasketballInfo, Object.keys(fidIndexMap))
            },

            socketData ({data, stamp}) {
                if (stamp === pushEvents.BASKETBALL_INFO) {
                    data.fid = data.fid + ''
                    let match = this.matches[this.fidIndexMap[data.fid]]
                    if (match && match.fid === data.fid) {
                        this.$store.commit(mTypes.updateLqMatch, {info: data, idx: this.fidIndexMap[data.fid]})
                    }
                }
            },

            '$route.path' () {
                this.selectOptions = null
                this.position = 0
                this.$store.dispatch('unsubscribeAll')
                this.$refs.scroller && this.$refs.scroller.update()
                this.fetchData()
            },

            refreshTime () {
                this.fetchData()
            }

        },
        components: {
            MatchesScroller, lqListItem, filterTime, filterLeague, loading, empty, toast
        },

        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },

            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },

            lq () {
                return this.$store.state.home.lq
            },
            view () { // 展示赔率， 最近6场比赛， 空 三种情况标志位
                // if(typeof window !== 'undefined') {
                //     return window && window.sessionStorage.getItem('view') || this.$store.state.home.view
                // }
                return this.$store.state.home.lqView
            },

            filteredMatches () {
                return this.matches && this.matches.filter(match => !this.selectOptions || this.selectOptions[match.simpleleague])
            },
            matches () {
                return this.lq.matches
            },
            concerns () {
                return this.lq.concernState
            },
            curExpect () {
                return this.lq.curExpect
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
                return this.lq.expectList
            },

            isLoading () {
                if (!this.matches) return 1
                if (this.lq.tab === this.$route.params.tab) {
                    if (this.$route.params.expect === 'cur') {
                        return 0
                    } else if (this.$route.params.expect !== this.lq.curExpect) {
                        return 2
                    }
                } else {
                    return 1
                }
            },
            toast () {
                return this.$store.state.toast
            }
        },

        async mounted () {
            await this.fetchData()
            this.ready = true
            this.$store.dispatch(aTypes.subscribeBasketballInfo, Object.keys(this.fidIndexMap))
        },

        methods: {
            setPosition (position) {
                savedData.position = position
                this.position = position
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.fetchLqMatches, {params: this.$route.params, dataHandler: (matches) => {
                    if(matches.length === 0) {
                        this.$route.replace('home/lq/all/cur')
                    }
                }})
                this.$store.commit('endOneRefresh')
            },
            doFilter (selectOptions) {
                this.selectOptions = selectOptions
            }
        }

    }
</script>
<style scoped>
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
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
        background: url(~assets/style/images/home/prev.png) no-repeat;
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
        background: url(~assets/style/images/home/date.png) no-repeat;
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
        background: url(~assets/style/images/home/prev.png) no-repeat;
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
        background: url(~assets/style/images/home/select.png) no-repeat;
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
        background: url(~assets/style/images/home/date.png) no-repeat;
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
        border: .013333rem solid #eaeaea;
        border-radius: .106667rem;
        background: #fff;
        z-index: 99
    }

    .matches-info {
        width: 8.4rem;
        margin: 0 auto;
        color: #aab5bd;
        font-size: .346667rem;
        overflow: hidden;
        margin-bottom: .613333rem
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
        height: 5.706667rem;
        overflow-y: scroll;
        margin-bottom: .3rem
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
        font-size: .293333rem;
        color: #aab5bd;
        float: left;
        margin-right: .266667rem
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
        line-height: 1.2rem
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
        padding: .333333rem 0 .346667rem 0;
        border-bottom: 1px solid #eaeaea
    }

    .one-game:active {
        -webkit-tap-highlight-color: rgba(244,244,244,.6)
    }
</style>
