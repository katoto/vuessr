<template>
    <div class="filter-league-wrap">
        <div class="filter-league" data-p4="filter" data-p2="zq" v-tap="{methods: toggleSel}"><span></span>
            筛选
        </div>
        <transition name="c-h-fl">
            <!-- 联赛筛选弹窗 -->
            <div class="alert-league" v-if="showSel">
                <!-- 场次信息 -->
                <div class="matches-info">
                    <div class="matches-info-l"><span></span>{{tabNameMap[$route.params.tab]}}</div>
                    <div class="matches-info-r">共{{matches.length}}场比赛，已选{{filteredMatches.length}}场</div>
                </div>
                <!-- 杯赛选择 -->
                <div class="cup-info">
                    <ul>
                        <li :class="{cur:selectOptions[league]}" v-for="league in leagueNameList" v-tap="{methods: toggleLeague, league: league}"><span>{{league}}</span></li>
                    </ul>
                </div>
                <!-- 全选、反选、五大联赛 -->
                <ul class="select-all">
                    <li v-tap="{methods: selectAll}" :class="{cur:tab ==='all'}">全选</li>
                    <li v-tap="{methods: inverseAll}" :class="{cur:tab ==='reverse'}">反选</li>
                    <li v-tap="{methods: selectFiveLeague}" v-if="show" :class="{cur:tab ==='five'}">五大联赛</li>
                </ul>
                <!-- 确认按钮区 -->
                <div class="btn-cont">
                    <div class="btn-sure btn-l" v-tap="{methods: toggleSel}">取消</div>
                    <div class="btn-sure btn-r" v-tap="{methods: confirm}">筛好了</div>
                </div>
            </div>
        </transition>
        <transition name="layer">
            <div class="layer" v-if="showSel" v-tap="{methods: toggleSel}"></div>
        </transition>
    </div>

</template>
<script>
    export default {
        props: ['matches', 'initial'],
        data () {
            return {
                fiveLeagues: {'西甲': 1, '意甲': 2, '英超': 3, '德甲': 4, '法甲': 5},
                selectOptions: {},
                leagueNameList: [],
                filteredMatches: [],
                showSel: false,
                tabNameMap: {
                    'jczq': '竞彩',
                    'jclq': '竞彩',
                    'all': '全部',
                    'crazybet': '猜球',
                    'hot': '热门',
                    'sfc': '足彩',
                    'bjdc': '单场'
                },
                show: true,
                tab: ''
            }
        },
        watch: {
            showSel (showSel) {
                if (showSel) {
                    this.selectOptions = {}
                    this.leagueNameList = []
                    let selectOptions = {}
                    if (!this.initial) {
                        this.matches.forEach(match => {
                            selectOptions[match.simpleleague] = false
                        })
                    } else {
                        selectOptions = JSON.parse(JSON.stringify(this.initial))
                    }
                    this.selectOptions = selectOptions
                    let leagueNameList = Object.keys(selectOptions)
                    leagueNameList.sort((a, b) => -a.localeCompare(b))
                    this.leagueNameList = leagueNameList
                    this.filteredMatches = this.matches.filter(match => this.selectOptions[match.simpleleague])
                }
            }
        },
        mounted () {
            /**/
            if (~this.$route.path.indexOf('/lq')) {
                this.show = false
            }
        },
        methods: {
            toggleSel () {
                this.showSel = !this.showSel
            },
            toggleLeague ({league}) {
                this.selectOptions[league] = !this.selectOptions[league]
                this.filteredMatches = this.matches.filter(match => this.selectOptions[match.simpleleague])
                this.tab = ''
            },
            selectAll: function () {
                Object.keys(this.selectOptions).forEach((key) => {
                    this.selectOptions[key] = true
                })
                this.filteredMatches = this.matches.filter(match => this.selectOptions[match.simpleleague])
                this.tab = 'all'
            },
            inverseAll: function () {
                Object.keys(this.selectOptions).forEach((key) => {
                    this.selectOptions[key] = !this.selectOptions[key]
                })
                this.filteredMatches = this.matches.filter(match => this.selectOptions[match.simpleleague])
                this.tab = 'reverse'
            },
            selectFiveLeague () {
                Object.keys(this.selectOptions).forEach((key) => {
                    this.selectOptions[key] = !!this.fiveLeagues[key]
                })
                this.filteredMatches = this.matches.filter(match => this.selectOptions[match.simpleleague])
                this.tab = 'five'
            },
            confirm: function () {
                let tmp = Object.values(this.selectOptions)
                let flag = tmp.some((item) => {
                    return item
                })
                console.log(flag)

                if (flag) {
                    this.$emit('ok', this.selectOptions)
                    this.showSel = false
                } else {
                    this.$store.dispatch('showToast', '至少选择一个联赛')
                }
            }
        }
    }
</script>
<style scoped>
    .filter-league:active, .filter-time .next-day:active, .filter-time .prev-day:active, .filter-time .today:active {
        background: #f4f4f4
    }
    .filter-league,.filter-time {
        box-shadow: 0 0 .133333rem rgba(22,34,29,.1)
    }
    .filter-league-wrap {
        position: relative;
        width: 2.066667rem;
        height: 1.066667rem;
    }

    .filter-league {
        width: 100%;
        height: 100%;
        line-height: 1.066667rem;
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        text-align: left;
        padding-left: 1.013333rem;
        box-sizing: border-box;
        position: relative;
        /*float: right*/
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
        z-index: 99;
        overflow: hidden;
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
        background: url(~assets/style/images/home/select.png) no-repeat;
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
        -webkit-overflow-scrolling: touch;
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
        margin-right: .38rem;
        background: #ebf1f5;
        color: #242c35;
        text-align: center;
        border-radius: .1067rem;
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
        height:0.8rem;
        margin-top: 0.5rem;
    }
    .select-all li {
        padding: .133333rem .266667rem;
        border: 1px solid #eaeaea;
        border-radius: .45rem;
        font-size: .293333rem;
        color: #aab5bd;
        float: left;
        margin-right: .266667rem;
        box-sizing: border-box;
    }

    .select-all  .cur {
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



    .c-h-fl-enter-active .btn-cont {
        display: none
    }

    .c-h-fl-leave-active .btn-cont {
        display: none
    }

    .layer-leave-active {
        transition: transform .8s;
    }

    .layer {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .2);

    }


</style>
