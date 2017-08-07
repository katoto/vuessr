
<template>
    <div>
        <div v-if="eventList && eventList.length">
            <div class="jie-detail jie-detail-nomb">
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

            <div class="gl-nav">文字直播</div>
            <div class="zhedie-box" v-if="eventList && eventList.length" v-for="(item,index) in eventList">
                <div class="zhedie-nav" :class="{'dang-list-l-on': isActive[index]}" v-tap="{methods:()=>changeSelect(index)}">
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
            <div class="sk-btips">500彩票网提示：
                <br>以上数据仅供参考，请以官方公布的数据为准
            </div>
        </div>
        <me-sports v-if="news" :news="news.news" :init-size="3" @rs="refreshScroll"></me-sports>
        <div v-if="!news && ! eventList">
           <no-data></no-data>

        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import meSports from '~components/detail/meSports.vue'
    import noData from '~components/no_data.vue'
    import {BasketballStatusCode as StatusCode} from '~common/constants'

    export default{
        async asyncData ({store, route: {params}}) {
            const {status, matchtime, homeid, awayid, matchid} = store.state.lqdetail.baseInfo // baseInfo 保证有数据了
            console.log(status)
            await store.dispatch(aTypes.getSituationEvent, {
                fid: params.fid, homeid, awayid, status, matchtime, leagueid: matchid
            })
        },

        components: {
            noData, meSports

        },
        data () {
            return {
                jieData: [],
                isActive: {},
                nameList:[],
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
            eventList () {
                let tmp = []
                let list = []
                if (this.$store.state.lqdetail.situation && this.$store.state.lqdetail.situation.eventlist) {
                    for(let i=0; i<this.$store.state.lqdetail.situation.eventlist.length;i++){
                        if(i<4){
                            this.nameList.push('第'+ this.dataList[i] + '节')
                        }else{
                            this.nameList.push('加时'+ this.dataList[i-4])
                        }
                    }
                    this.nameList.reverse()
                    tmp = [...this.$store.state.lqdetail.situation.eventlist].reverse()
                    for (let lst of tmp) {
                        list.push(lst.reverse())
                    }
                    return list
                }
            },
            news () {
                return this.$store.state.lqdetail.situation.news
            }
        },
        methods: {
            jiePush () { // 4小节+加时赛
                if (this.ascore) {
                    for (let i = 1, len = this.ascore.length, j = 1, k = 1; i <= len; i++) {
                        if (i <= 4) {
                            this.jieData.push(j + '节')
                            j++
                        } else {
                            this.jieData.push('加' + k)
                            k++
                        }
                    }
                }
            },

            changeSelect (idx) {
                // this.isActive[idx] = !this.isActive[idx]
                this.$set(this.isActive, idx, !this.isActive[idx])
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
            }
        },
        mounted () {
            this.fetchData()
            this.jiePush()
            this.$set(this.isActive, 0, true)
        }
    }
</script>

<style>
    .ui-empty{padding:2.72rem 0; text-align: center}
    .ui-empty .w240{
        width:3.2rem;}
    .ui-empty img{ margin-bottom: 0.933rem;}
    .ui-empty-dfont{font-size: 0.4533rem; color: #333; height: 0.8933rem;line-height: 0.8933rem;}
    .main-inner {
        min-height: 15.44rem;
        width: 100%;
        overflow-x: hidden;
        color: #242c35
    }
    .tContent {
        display: none;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    .jie-detail {
        background: #fff;
        margin: 0 auto .266667rem
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
    .hide{display: none}
    .list{background: #fff}
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
    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
    }
    .refresh-box {
        width: 1.066667rem;
        height: 1.066667rem;
        position: fixed;
        bottom: 1.706667rem;
        right: .533333rem;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: .9;
        z-index: 9;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg)
    }

    .refresh-icon {
        width: 1.066667rem;
        height: 1.066667rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAq1BMVEX2Pz8AAAD2Pz/2Pz//+fn+8PD90tL2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/+8vL7q6v4YWH3S0v2Pz/2Pz/6ior5e3v2Pz/8w8P5hIT5fX32Pz//9/f+4eH8t7f6kpL4b2/4amr3XV32Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/8xcX/+/v+6en+5eX9y8v4cXH2RET2Pz/2Pz/2Pz/2Pz/8wsL///8dBChgAAAAOHRSTlPZAAi//vv1yDwb0LSE/O3f3GVd5+S68uXkzf348Oji4d6poZ2OTBHCfk5EE/L++vn04tp6QiMP8qyEnYEAAAKKSURBVFjDrNPZdqpAEIXhnUZlTEAUCQ44mxgznQxr5f2f7HQHMkhV04L57tTml0ILF/V2Tny78m0Pnp34q9vY2RkuqAuKt1cfhP/6JloFnY0HDW/jNA2K2EItKxYNgqJvw8jui1ODWwsnsbYnBd01TrZ2zcF9hgayvSEoAjQUiLrgYYnGlgd90E3QQuLqgu83aOXmnQ+6qteu6HLBXYLWkh0NiiXOsBQkGOAsQTW4x5n2x0E3w5ky9yi4hlZEXvDWv4Nb6AzvO91rlK67nfshdLY/QWGBl04+pC5KXfVqkoJnie9gH6xFTwWOg0pvAVb/KyhscNJx2fsZuSyOB+DYogzG4FwVF49y/JKPinevwInLoAXGtJguREVYPIcpGFYRdLT315mBMeto79H5DG5ADdQ1l3Ow5pfq0wGojQoKD8RirHohNEJVHC9AeEIG70D11Lw5tHI1dQ/UnQwGIFI10gw1ZupECiKQwQTEhHw/O8MERHKBA4jhhxSiVqjODEEc4IAYqf8zOOZDDugeR+qJ/4NBrn63iO4zAnbiRxg9sjMHWLFLMoXRlF2XFXxUPXNrwC/TM6p82Kh6kifnMJrLY0+ospGhSu1VBKNIbSddPlAP8uQLjF7ksQdQ3l8H7b8e+X9zZowDIAhDUWMHo4wuHoEQFwfw/jczjhooUt4gB+hC+/v/q8CfgrcN3tj46OHi0CVfe0a+ugR2ywgsvQLwJYWvUXzR01aEN0u8nasbzsfMHKdqOHVLvBosMW/a+VjBBx8+mvHhkY+3fADnEQEPMXjMcr8otnoSi6jKWeq5uQzTkgWmJRX3+dZ6fqwAydAGJAONTGGoS2NnGIyz6P4Px4XX+WNYpk/njwuTZnCjF4SGqAAAAABJRU5ErkJggg==) center center no-repeat;
        background-size: 1.066667rem;
        display: inline-block
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
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }

    .sk-detail-tap-box2 {
        margin-bottom: .266667rem
    }
    .sk-detail-tap-box {
        text-align: center;
        height: 1.173333rem;
        padding: 0 .4rem;
        background: #fff
    }
    .sk-detail-tap {
        border-bottom: 1px solid #e8e8e8;
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 1.173333rem;
        line-height: 1.173333rem
    }

    [data-dpr="1"] .sk-detail-tap {
        font-size: 12px
    }

    [data-dpr="2"] .sk-detail-tap {
        font-size: 24px
    }

    [data-dpr="3"] .sk-detail-tap {
        font-size: 36px
    }
    .sk-detail-tap li {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #aab5bd;
        height: 1.173333rem
    }

    .sk-detail-tap li:active {
        background: #f4f4f4
    }

    .sk-detail-tap li.cur,
    .sk-detail-tap li:active {
        color: #242c35
    }

</style>

