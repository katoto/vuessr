<template>
    <div v-if="news || eventList">
        <div v-if="eventList && eventList.length">
            <div class="jie-detail">
                <div class="jie-detailL">
                    <div class="t-nav"></div>
                    <ul class="t-detail" v-if="match">
                        <li>
                            <div class="t-img">
                                <img :src="match.awaylogo">
                            </div>
                            {{match.awaysxname}}(客)
                        </li>
                        <li>
                            <div class="t-img">
                                <img :src="match.homelogo">
                            </div>
                            {{match.homesxname}}(主)
                        </li>
                    </ul>
                </div>
                <div class="jie-detailR">
                    <div id="slider" class="slide-box mr40">
                        <div class="t-nav">
                            <div class="responsive">
                                <div class="wjie" v-for="itm in jieData">{{itm}}</div>
                            </div>
                        </div>
                        <ul class="t-detail">
                            <li class="responsive">
                                <div class="wjie" v-for="itma in ascore">{{itma}}</div>
                            </li>
                            <li class="responsive">
                                <div class="wjie" v-for="itmh in hscore">{{itmh}}</div>
                            </li>
                        </ul>
                    </div>

                    <div class="zongfen-box">
                        <div class="zongfen gray-zf">总分</div>
                        <div class="zongfen red-zf">{{match.awayscore || '-'}}</div>
                        <div class="zongfen red-zf">{{match.homescore || '-'}}</div>
                    </div>
                    <div class="sli-line"></div>
                </div>
            </div>
            <!--<me-sports src="detail-page/comment/me-sports.html" match.status == StatusCode.NOT_STARTED || eventlist == null" requesting="{{isRequesting}}" leagueid="{{match.matchid}}" on-size="hasNews=!!$event.args[0]" init-size="{{match.status == StatusCode.NOT_STARTED?5:3}}" homeid="{{match.homeid}}" awayid="{{match.awayid}}" status="{{match.status}}" matchtime="{{match.matchdate}}" vtype="2"></me-sports>-->
            <me-sports v-if="news" :news="news.news" :init-size="3" @rs="refreshScroll"></me-sports>
            <div class="gl-nav">文字直播</div>
            <div class="zhedie-box" v-if="eventList.length" v-for="(item,index) in eventList">
                <div class="zhedie-nav" :class="{'dang-list-l-on': isActive[index]}"
                     v-tap="{methods:()=>changeSelect(index)}">
                    {{nameList[index]}}
                    <span class="live" v-if=" Number(match.status) >= 2 && Number(match.status) <= 10 && index == 0">Live</span>
                    <span class="sh-arrow" :class="{'rotate180': !isActive[index]}"></span>
                </div>

                <div class="tree-box" v-if="isActive[index]"
                     :class="{'green-s': match.status >=7 && match.status <=10, 'gray-s': match.status == StatusCode.ENDED}">
                    <div class="list" v-for="evt in item">
                        <span class="timing">{{evt.time}}</span>
                        <div class="dui" v-if="evt.team">[{{evt.team}}]</div>
                        <p class="jies">{{evt.desc}}
                            <span class="jies-bf">[{{evt.awayscore}}:{{evt.homescore}}]</span>
                        </p>
                    </div>

                    <div class="list">
                        <span class="timing"></span>
                        <div class="kais">开始</div>
                    </div>
                </div>
            </div>
            <skbtips></skbtips>
        </div>
        <div v-if="!news || (news && !news.news) || !eventList || !eventList.length">
            <no-data></no-data>

        </div>
    </div>
    <item-loader v-else></item-loader>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import meSports from '~components/detail/meSports.vue'
    import noData from '~components/no_data.vue'
    import {BasketballStatusCode as StatusCode, pushEvents, BOrderedStatusCode} from '~common/constants'
    import skbtips from '~components/detail/skbtips.vue'
    import itemLoader from '~components/detail/itemLoader.vue'

    export default{
        async asyncData ({store, route: {params}}) {
            const {status, matchtime, homeid, awayid, matchid} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
            await store.dispatch(aTypes.getSituationEvent, {
                fid: params.fid, homeid, awayid, status, matchtime, leagueid: matchid
            })
        },

        components: {
            noData, meSports, skbtips, itemLoader

        },
        data () {
            return {
                isActive: {},
                dataList: ['一', '二', '三', '四'],
                StatusCode
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            match () {
                return this.$store.state.lqdetail.baseInfo
            },
            socketData () { // websocket推送过来的数据
                return this.$store.getters.getSocketData
            },
            ascore () {
                let reg = /-|\// // 将字符串20-0-21-0/10-20中的数据拆分出来
                if (this.match) {
                    return this.match.ascore.split(reg).filter(function (n) {
                        return n
                    })
                }
            },
            hscore () {
                let reg = /-|\// // 将字符串20-0-21-0/10-20中的数据拆分出来
                if (this.match) {
                    return this.match.hscore.split(reg).filter(function (n) {
                        return n
                    })
                }
            },
            nameList () {
                const nameList = []
                if (this.$store.state.lqdetail.situation && this.$store.state.lqdetail.situation.eventlist) {
                    for (let i = 0; i < this.$store.state.lqdetail.situation.eventlist.length; i++) {
                        if (i < 4) {
                            nameList.push('第' + this.dataList[i] + '节')
                        } else {
                            nameList.push('加时' + this.dataList[i - 4])
                        }
                    }
                    nameList.reverse()
                }
                return nameList
            },
            eventList () {
                if (this.$store.state.lqdetail.situation && this.$store.state.lqdetail.situation.eventlist) {
                    let list = []
                    let tmp = [...this.$store.state.lqdetail.situation.eventlist].reverse()
                    for (let lst of tmp) {
                        list.push([...lst].reverse())
                    }
                    return list
                }
            },
            jieData () {
                let result = []
                if (this.ascore) {
                    for (let i = 1, len = this.ascore.length, j = 1, k = 1; i <= len; i++) {
                        if (i <= 4) {
                            result.push(j + '节')
                            j++
                        } else {
                            result.push('加' + k)
                            k++
                        }
                    }
                }
                return result
            },
            news () {
                return this.$store.state.lqdetail.situation.news
            }
        },
        methods: {
            changeSelect (idx) {
                const isActive = {...this.isActive}
                isActive[idx] = !this.isActive[idx]
                this.isActive = isActive
                this.refreshScroll()
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                const {status, matchtime, homeid, awayid, matchid} = this.$store.state.lqdetail.baseInfo
                await this.$store.dispatch(aTypes.getSituationEvent, {
                    fid: this.$route.params.fid, homeid, awayid, status, matchtime, leagueid: matchid
                })
                this.$store.commit('endOneRefresh')
            },
            refreshScroll () {
                this.$store.commit(mTypes.updateScTime)
            }
        },
        watch: {
            loaded (loaded) {
                this.refreshScroll()
            },
            refreshTime () {
                this.fetchData()
            },
            socketData ({data, stamp}) {
                if (stamp === pushEvents.BASKETBALL_EVENT) {
                    let eventlist = [...this.$store.state.lqdetail.situation.eventlist]
                    let lastEvent = data.events[data.events.length - 1]
                    const match = {}
                    if (lastEvent.status) {
                        // 更新状态
                        match.status = lastEvent.status
                    }
                    if (lastEvent.homescore && lastEvent.awayscore) {
                        match.homescore = lastEvent.homescore
                        match.awayscore = lastEvent.awayscore
                    }
                    const orders = [...BOrderedStatusCode].reverse()
                    data.events.forEach((event) => {
                        const idx = orders.indexOf(event.status)
                        if (eventlist.length < idx + 1) {
                            eventlist.push([event])
                        } else {
                            eventlist[idx] = [...eventlist[idx], event]
                        }
                    })
                    this.$store.commit(mTypes.syncBaseInfo, match)
                    this.$store.commit(mTypes.setSituationEvent, eventlist)
                    this.refreshScroll()
                }
            }
        },
        mounted () {
            this.fetchData()
            this.isActive = {'0': true}
        }
    }
</script>

<style scoped>
    .jie-detail {
        background: #fff;
        margin: 0 auto
    }

    .jie-detail:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }

    .jie-detailL {
        float: left;
        width: 3.906667rem
    }

    .jie-detailR {
        float: right;
        width: 6.073333rem;
        position: relative;
        padding-bottom: .133333rem
    }

    .t-nav {
        line-height: .933333rem;
        height: .933333rem;
        border-bottom: 1px solid #ededed;
        color: #999;
        text-align: center
    }

    [data-dpr="1"] .t-nav {
        font-size: 11px
    }

    [data-dpr="2"] .t-nav {
        font-size: 22px
    }

    [data-dpr="3"] .t-nav {
        font-size: 33px
    }

    [data-dpr="1"] .t-detail {
        font-size: 11px
    }

    [data-dpr="2"] .t-detail {
        font-size: 22px
    }

    [data-dpr="3"] .t-detail {
        font-size: 33px
    }

    .t-detail li {
        line-height: 1rem;
        height: 1rem
    }

    .jie-detailR .t-detail li div {
        text-align: center
    }

    .jie-detailL .t-detail li {
        padding-left: .4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .jie-detailR .t-detail,
    .jie-detailR .t-nav {
        padding-right: .4rem
    }

    .t-img {
        width: .786667rem;
        height: 1rem;
        position: relative;
        float: left
    }

    .simg,
    .t-img img {
        width: .506rem;
        height: .506rem;
        position: absolute;
        top: 50%;
        margin-top: -.253rem;
        left: 0
    }

    .jie-detailR .mr40 {
        margin-right: 1.253333rem
    }

    .slide-box {
        -webkit-overflow-scrolling: touch
    }

    .jie-detailR {
        float: right;
        width: 6.073333rem;
        position: relative;
        padding-bottom: .133333rem
    }

    .t-nav {
        line-height: .933333rem;
        height: .933333rem;
        border-bottom: 1px solid #ededed;
        color: #999;
        text-align: center
    }

    [data-dpr="1"] .t-nav {
        font-size: 11px
    }

    [data-dpr="2"] .t-nav {
        font-size: 22px
    }

    [data-dpr="3"] .t-nav {
        font-size: 33px
    }

    .jie-detailR .t-detail li div {
        text-align: center
    }

    .responsive {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }

    .t-nav div {
        text-align: center
    }

    .wjie {
        width: 1rem
    }

    .zongfen-box {
        position: absolute;
        top: 0;
        right: 0;
        background: #fff;
        box-shadow: -.266667rem 0 .16rem -.106667rem #fff
    }

    .zongfen {
        text-align: right;
        width: .72rem
    }

    .gray-zf {
        color: #999;
        height: .933333rem;
        line-height: .933333rem;
        border-bottom: 1px solid #ededed;
        padding-right: .533333rem
    }

    [data-dpr="1"] .gray-zf {
        font-size: 11px
    }

    [data-dpr="2"] .gray-zf {
        font-size: 22px
    }

    [data-dpr="3"] .gray-zf {
        font-size: 33px
    }

    .sli-line {
        height: 1px;
        width: 100%;
        position: absolute;
        left: 0;
        top: .933333rem;
        background: #ededed
    }

    .jie-detail:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }

    .zhedie-box {
        background: #fff
    }

    .zhedie-nav {
        border-bottom: 1px solid #ededed;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border-radius: 100%;
        background: #fff;
        padding: 0 .533333rem;
        font-size: .346667rem;
        overflow-x: auto;
        color: #333;
        position: relative
    }

    .live {
        width: .68rem;
        height: .346667rem;
        line-height: .346667rem;
        color: #fff;
        text-align: center;
        display: inline-block;
        background: #f63f3f
    }

    [data-dpr="1"] .live {
        font-size: 11px
    }

    [data-dpr="2"] .live {
        font-size: 22px
    }

    [data-dpr="3"] .live {
        font-size: 33px
    }

    .sh-arrow {
        background: url(~assets/style/images/detail/detail-icon.png) no-repeat;
        background-size: .533333rem 13.333333rem
    }

    .sh-arrow {
        height: .533333rem;
        display: inline-block;
        position: absolute;
        top: 50%;
        margin-top: -.266667rem;
        transition: -webkit-transform .2s linear;
        transition: transform .2s linear;
        transition: transform .2s linear, -webkit-transform .2s linear
    }

    .sh-arrow {
        background-position: center -7.453333rem;
        right: .426667rem;
        width: .533333rem
    }

    .tree-box {
        position: relative;
        color: #333;
        padding: .453333rem .533333rem .693333rem 1.8rem;
        -webkit-perspective: 200;
        background: #fff;
        transition: all .2s linear
    }

    .show {
        display: block
    }

    .hide {
        display: none
    }

    .list {
        background: #fff
    }

    .tree-box .list {
        padding-left: .32rem;
        position: relative;
        padding-bottom: .6rem
    }

    .tree-box .timing {
        position: absolute;
        left: -1.506667rem;
        display: block;
        width: 1.506667rem;
        color: #999;
        text-align: right;
        padding-right: .253333rem;
        box-sizing: border-box
    }

    [data-dpr="1"] .tree-box .timing {
        font-size: 12px
    }

    [data-dpr="2"] .tree-box .timing {
        font-size: 24px
    }

    [data-dpr="3"] .tree-box .timing {
        font-size: 36px
    }

    .tree-box .timing:after {
        content: "";
        position: absolute;
        width: .146667rem;
        height: .146667rem;
        border-radius: 100%;
        -webkit-border-radius: 100%;
        display: inline-block;
        right: -.07rem
    }

    .dui {
        color: #999
    }

    [data-dpr="1"] .dui {
        font-size: 11px
    }

    [data-dpr="2"] .dui {
        font-size: 22px
    }

    [data-dpr="3"] .dui {
        font-size: 33px
    }

    .jies {
        color: #333;
        position: relative;
        padding-right: 1.6rem
    }

    [data-dpr="1"] .jies {
        font-size: 12px
    }

    [data-dpr="2"] .jies {
        font-size: 24px
    }

    [data-dpr="3"] .jies {
        font-size: 36px
    }

    .jies-bf {
        position: absolute;
        width: 1.6rem;
        text-align: right;
        right: 0;
        top: 0
    }

    .green-s .list {
        border-left: 1px solid #36bd72
    }

    .gray-s .list {
        border-left: 1px solid #dbdbdb
    }

    .green-s .timing:after {
        background: #36bd72
    }

    .gray-s .timing:after {
        background: #dbdbdb
    }

    .gray-s .list:first-child .timing:after {
        width: .266667rem;
        height: .266667rem;
        right: -.133333rem;
        background: #acacac
    }

    .gray-s {
        padding: .693333rem .533333rem .693333rem 1.8rem
    }

    .gray-s .list:last-child {
        padding-bottom: 0
    }

    .zhedie-box:last-child {
        margin-bottom: 0
    }

    .red-zf {
        color: #ee2e2e;
        height: 1rem;
        line-height: 1rem;
        padding-right: .533333rem
    }

    [data-dpr="1"] .red-zf {
        font-size: 15px
    }

    [data-dpr="2"] .red-zf {
        font-size: 30px
    }

    [data-dpr="3"] .red-zf {
        font-size: 45px
    }

    .rotate180 {
        -webkit-animation: all .2s linear;
        animation: all .2s linear;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }

</style>
