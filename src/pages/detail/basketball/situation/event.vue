
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
                nameList: [],
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
                            this.nameList.push('第' + this.dataList[j - 1] + '节')
                            j++
                        } else {
                            this.jieData.push('加' + k)
                            this.nameList.push('加时' + this.dataList[k - 1])
                            k++
                        }
                    }
                    this.nameList.reverse()
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
