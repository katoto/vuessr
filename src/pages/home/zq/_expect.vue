<template>
    <div class="l-full l-flex-column">
        <div class="filter-cont">
            <!-- 日期筛选 -->
            <filter-time style="float: left"></filter-time>


            <!-- 联赛筛选 -->
            <filter-league style="float: right"></filter-league>
            <!-- 联赛筛选弹窗 -->
            <div class="alert-league alert-league-close hide">
                <!-- 场次信息 -->
                <div class="matches-info">
                    <div class="matches-info-l"><span></span>竞彩</div>
                    <div class="matches-info-r">共105场比赛，已选85场</div>
                </div>
                <!-- 杯赛选择 -->
                <div class="cup-info fadeout">
                    <ul>
                        <li class="cur">巴西杯</li>
                        <li>吉尼斯杯</li>
                        <li>金杯奖</li>
                        <li>墨西杯</li>
                        <li>苏联赛杯</li>
                        <li>欧冠</li>
                        <li>女欧杯</li>
                    </ul>
                </div>
                <!-- 全选、反选、五大联赛 -->
                <ul class="select-all fadeout">
                    <li>全选</li>
                    <li class="cur">反选</li>
                    <li>五大联赛</li>
                </ul>
                <!-- 确认按钮区 -->
                <div class="btn-cont fadeout">
                    <div class="btn-sure btn-l">取消</div>
                    <div class="btn-sure btn-r">筛好了</div>
                </div>
            </div>
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

        <!--<expect-select :expect-list="expectList" :cur-expect="curExpect" v-if="expectList"></expect-select>-->
        <!--<div v-else class="loading">
            <div class="icon"></div>
            <div class="icon-shadow"></div>
        </div>-->
        <div class="l-flex-1 l-relative">
            <matches-scroller ref="scroller">
                <ul class="list">
                    <zq-list-item v-for="match in showedMatches" :match="match" key="match.fid"></zq-list-item>
                </ul>
            </matches-scroller>

        </div>


    </div>


</template>
<script>
    import MatchesScroller from '~components/matches_scroller.vue'
    import expectSelect from '~components/home/expectSelect.vue'
    import zqListItem from '~components/home/zqListItem.vue'
    import filterTime from '~components/home/filterTime.vue'
    import filterLeague from '~components/home/filterLeague.vue'
    import {FootballStatusCode as StatusCode, pushEvents} from '~common/constants'
    import {aTypes, mTypes} from '~store/home'
    export default {
        async asyncData ({store, route: {params: {expect, tab}}}) {
            await Promise.all([store.dispatch(aTypes.getZqMetro), store.dispatch(aTypes.fetchZqMatches, {expect, tab})])
        },
        data () {
            return {
                selectOptions: null,
                filteredMatches: null
            }
        },
        watch: {
            filterTime () {
                this.$store.commit(mTypes.initFilter, {
                    matches: this.matches,
                    inited: this.selectOptions,
                    onOk: ({selectOptions, filteredMatches}) => {
                        this.filteredMatches = filteredMatches
                        this.selectOptions = selectOptions
                        this.$store.commit(mTypes.endFilter)
                    },
                    onCancel: () => {
                        this.$store.commit(mTypes.endFilter)
                    }
                })
            },
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
            MatchesScroller, expectSelect, zqListItem, filterTime, filterLeague
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },
            filterTime () { // 用户点击筛选按钮时间戳
                return this.$store.state.home.filter.filterTime
            },
            zq () {
                return this.$store.state.home.zq
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
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await Promise.all([this.$store.dispatch(aTypes.getZqMetro), this.$store.dispatch(aTypes.fetchZqMatches, this.$route.params)])
                this.$store.commit('endOneRefresh')
            }
        }

    }
</script>
<style scoped>
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
        zoom:1;position: relative
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

    .filter-league,.filter-time {
        box-shadow: 0 0 .133333rem rgba(22,34,29,.1)
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

    .filter-league:active,.filter-time .next-day:active,.filter-time .prev-day:active,.filter-time .today:active {
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
        -webkit-tap-highlight-color: rgba(244,244,244,.6)
    }
</style>
