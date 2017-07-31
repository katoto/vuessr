
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
            <!--<me-sports src="detail-page/comment/me-sports.html" drunk-if="subtab == 'event'" requesting="{{isRequesting}}" on-size="hasNews=!!$event.args[0]" leagueid="{{match.matchid}}" init-size="{{match.status == StatusCode.NOT_STARTED?5:3}}" homeid="{{match.homeid}}" awayid="{{match.awayid}}" status="{{match.status}}" matchtime="{{match.matchdate}}" vtype="2"></me-sports>-->

            <div class="gl-nav">文字直播</div>
            <div class="zhedie-box" v-if="eventList && eventList.length" v-for="(item,index) in eventList">
                <div class="zhedie-nav" :class="{'dang-list-l-on': isActive[index]}" v-tap="{methods:()=>changeSelect(index)}">
                    {{item[0].desc.replace('结束','')}}
                    <span class="live" v-if=" Number(match.status) >= 7 && Number(match.status) <= 10">Live</span>
                    <span class="sh-arrow" :class="{'rotate180': !isActive[index]}"></span>
                </div>

                <!--<div class="tree-box" v-if="isActive[index]">-->
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
        <div v-else>
            <div class="ui-empty" style="padding: 1.54rem 0;">
                <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                <!--<if: message />--><div class="ui-empty-dfont">很抱歉，没有数据</div>
                <!--<if: extraText />-->
            </div>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
//    import meSports from '~components/detail/basketball/situation/meSports.vue'
    import {BasketballStatusCode as StatusCode} from '~common/constants'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getSituationEvent, {
                fid: params.fid
            })
        },
        data () {
            return {
                jieData: [],
                isActive: {},
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
            match: function () {
                return this.$store.state.lqdetail.baseInfo
            },
            ascore: function () {
                let reg = /-|\// // 将字符串20-0-21-0/10-20中的数据拆分出来
                if (this.match) {
                    return this.match.ascore.split(reg).filter(function (n) {
                        return n
                    })
                }
            },
            hscore: function () {
                let reg = /-|\// // 将字符串20-0-21-0/10-20中的数据拆分出来
                if (this.match) {
                    return this.match.hscore.split(reg).filter(function (n) {
                        return n
                    })
                }
            },
            eventList: function () {
                let tmp = []
                let list = []
                if (this.$store.state.lqdetail.situation && this.$store.state.lqdetail.situation.eventlist) {
                    tmp = this.$store.state.lqdetail.situation.eventlist.reverse()
                    for (let lst of tmp) {
                        list.push(lst.reverse())
                    }
                    return list
                }
            }
        },
        methods: {
            jiePush: function () { // 4小节+加时赛
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
            changeSelect: function (idx) {
                this.$set(this.isActive, idx, !this.isActive[idx])
                this.refreshScroll()
            },
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getSituationEvent, {fid: this.$route.params.fid})
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

</style>
