
<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner box-yc" style="z-index: 2">
            <div class="full-scroll">
                <!--顶部标题切换tab-->
                <div class="gsdz-list-box">
                    <ul class="gsdz-list">
                        <li class="wddz " :class="{'cur':customMy}" v-tap="{methods: ()=>customMy=true}">我的定制</li>
                        <li class="gslb" :class="{'cur':!customMy}" v-tap="{methods: ()=>customMy=false}">公司列表</li>
                    </ul>
                </div>
                <!--“我的定制”内容区-->
                <div class="my-companys" v-if="customMy && customOdds">
                    <ul class="company-items">
                        <li class="company-item" v-for="item,idx in customOdds.company.custom">
                            <span class="com-name"><em v-tap="{methods: deleteCustomOdd, idx}"></em>{{item.name}}</span>
                            <span class="com-zd" :class="{'had-zd':idx===0}"  v-tap="{methods: setCustomTop, idx}">置顶</span>
                        </li>
                    </ul>
                    <div class="company-notice">可前往公司列表添加赔率公司，最多可添加30家</div>
                </div>
                <!--“公司列表”内容区-->
                <div class="companys-list " v-if="!customMy && customKeyList">
                    <div class="ques-item" v-for="key in customKeyList">
                        <h1 class="zmpx">{{key}}</h1>
                        <ul class="company-items">
                            <li class="company-item" v-for="odd,index in customOdds.company.all[key]">
                                <span class="com-name">{{odd.name}}<i class="zlgs" v-if="odd.type=='1'">主</i><i v-if="odd.type=='3'" class="jys">E</i></span>
                                <span v-tap="{methods: addCustomOdd, key, idx: index}" :class="{'had-zd':odd.ischeck=='1'}" class="com-zd">{{odd.ischeck=='1'?'已添加':'添加'}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="company-notice">最多可添加30家
                        <i class="zlgs">主</i>主流公司
                        <i class="jys">E</i>交易所
                    </div>
                </div>
            </div>


        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">赔率详情</h2>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import noMatch from '~components/detail/football/odds/noMatch.vue'
    export default {
        props: {
            params: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.ptype
                }
            }
        },
        data () {
            return {
                customMy: true,
                customOdds: null,
                customKeyList: null
            }
        },
        components: {
            noMatch
        },
        async mounted () {
            let customOdds = await this.$store.dispatch(aTypes.getCustomOdds, {ptype: this.params.ptype === 'daxiaopan' ? 'daxiaoqiu' : this.params.ptype})
            this.customOdds = customOdds
            this.customKeyList = []
            for (let p in this.customOdds.company.all) {
                this.customKeyList.push(p)
            }
            this.customKeyList.sort()
        },
        methods: {
            deleteCustomOdd ({idx}) {
                if (!this.customOdds.company.custom || this.customOdds.company.custom.length < 2) {
                    return this.$store.dispatch('showToast', '至少选择一家公司')
                }
                // 更新总列表对应的状态
                let isBreak = false
                for (let j = 0, k = this.customKeyList.length; j < k; j++) {
                    let list = this.customOdds.company.all[this.customKeyList[j]]
                    for (let a = 0, b = list.length; a < b; a++) {
                        let item = list[a]
                        if (item.cid === this.customOdds.company.custom[idx].cid) {
                            this.customOdds.company.all[this.customKeyList[j]][a].ischeck = '0'
                            isBreak = true
                            break
                        }
                    }
                    if (isBreak) {
                        break
                    }
                }
                this.customOdds.company.custom.splice(idx, 1)
            },
            setCustomTop ({idx}) {
                console.log(idx)
                if (idx > 0) {
                    console.log(this.customOdds.company.custom)
                    this.customOdds.company.custom.unshift(this.customOdds.company.custom[idx])
                    this.customOdds.company.custom.splice(idx + 1, 1)
                }
            },
            addCustomOdd ({key, idx}) {
                if (!this.customOdds.company.custom || this.customOdds.company.custom.length > 29) {
                    return this.$store.dispatch('showToast', '最多可添加30家赔率公司')
                }
                let item = this.customOdds.company.all[key][idx]
                if (item.ischeck === '1') {
                    return
                }
                item.ischeck = '1'
                this.customOdds.company.all[key].splice(idx, 1, item)
                this.customOdds.company.custom.push({
                    cid: item.cid,
                    name: item.name,
                    type: item.type
                })
            },
            async changeComp ({cid}) {
                this.cid = cid
            },
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            }
        },
        watch: {
            async cid (cid) {
                this.loading = true
                try {
                    switch (this.params.type) {
                        case 'europe': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailEurope, {
                                    fid: this.$route.params.fid,
                                    cid,
                                    win: currentInfo.first.win,
                                    draw: currentInfo.first.draw,
                                    lost: currentInfo.first.lost,
                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime
                                })
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                        case 'rangqiu': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailRq, {
                                    fid: this.$route.params.fid,
                                    cid,
                                    win: currentInfo.first.win,
                                    draw: currentInfo.first.draw,
                                    lost: currentInfo.first.lost,
                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime,
                                    handicapline: currentInfo.end.handicapline
                                })
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                        case 'asian': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailAsian, {
                                    fid: this.$route.params.fid,
                                    cid,

                                    s1: currentInfo.first.home,
                                    s2: currentInfo.first.away,
                                    cp: currentInfo.first.handi,

                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime
                                })
                                sameOddsInfo.s1 = currentInfo.first.home
                                sameOddsInfo.s2 = currentInfo.first.away
                                sameOddsInfo.handi = currentInfo.first.handi
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                        case 'daxiaopan': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailDaxiaoqiu, {
                                    fid: this.$route.params.fid,
                                    cid,

                                    big: currentInfo.first.big,
                                    small: currentInfo.first.small,
                                    handi: currentInfo.first.handi,

                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime
                                })

//                                sameOddsInfo.s1 = currentInfo.first.home
//                                sameOddsInfo.s2 = currentInfo.first.away

                                sameOddsInfo.big = currentInfo.first.big
                                sameOddsInfo.small = currentInfo.first.small
                                sameOddsInfo.handi = currentInfo.first.handi
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                    }
                } catch (e) {
                    this.error = true
                } finally {
                    this.loading = false
                }
            }
        },
        computed: {
            match () {
                return this.$store.state.zqdetail.baseInfo
            }

        }

    }
</script>
