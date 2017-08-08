<template>
    <div class="l-full l-flex-column">
        <div class="sk-detail-tap-box  turn-box" v-if="footChoice && footChoice.choice_list[currSelect]">
            <!--如果后面没有了就用look-prev-none-->
            <div class="boxer-h">
                <em class="turn-boxer turn-boxer-prev">
                    <i class="turn-to look-prev-have" v-if="isForward"  v-tap="{methods:goForward}"></i>
                    <i class="turn-to" v-if="!isForward"></i>
                </em>
                <div class="num-turn" v-tap="{methods:goSelect}">{{footChoice.choice_list[currSelect].stagegbname}}<i class="num-turner"></i></div>
                <!--如果后面没有了就用look-next-have-->
                <em class="turn-boxer turn-boxer-next">
                    <i class="turn-to look-next-have" v-if="isBehind"  v-tap="{methods:goBehind}"></i>
                    <i class="turn-to" v-if="!isBehind"></i>
                </em>
            </div>

        </div>
        <section class="l-flex-1 l-relative schedule-h">
            <!--没有回合的情况-->
            <div class="l-full l-scroll-y ">
                <!--弹层-筛选轮次-->
                <div class="alert-turns" :class="{'hide':isHide}">
                    <div class="qi-pop-box">
                        <div class="ui-navbox-item " v-if="footChoice && footChoice.choice_list">
                            <ul>
                                <li v-for="(item,index) in footChoice.choice_list" :class="{'select':selected[index]}" v-tap="{methods:goShow,index:index}">
                                    <span>{{item.stagegbname}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="schedule-wrap schedule-foot" :class="{'hide':isShow}" v-if="footSchedule">
                    <section class="schedule-cont home-sc-cont l-scroll-y" v-if="footSchedule.rettype === 'array' ">
                        <ul class="schedule-list" >
                            <li class="schedule-itm  l-flex-row" v-for="list in footSchedule.values">
                                <!--左边的参赛时间-->
                                <div class="when-game">
                                    <em class="game-time">{{list.matchtime.substr(5, 11)}}</em>
                                </div>
                                <!--右边的参赛队伍和结果-->
                                <div class="who-game l-flex-1 l-flex-row">
                                    <div class="who-gamer who-gamer-home l-flex-1">
                                        <img v-logo="list.homelogo"/>
                                        <em>{{list.homesxname}}</em>
                                    </div>

                                    <em class="who-win" v-if="list.homescore">{{list.homescore}}<i>:</i>{{list.awayscore}}</em>
                                    <em class="who-win no-start" v-if="!list.homescore">vs</em>
                                    <div class="who-gamer who-gamer-guest l-flex-1">
                                        <img v-logo="list.awaylogo"/><em>{{list.awaysxname}}</em>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <!--有回合的展示区域-->
                    <!--赛程列表 第一回合-->
                    <section class="schedule-cont home-sc-cont " v-if="footSchedule.rettype === 'object' " v-for="idx in footSchedule.sort">
                        <h1 class="tit-round">{{idx}}</h1>
                        <ul class="schedule-list ">
                            <li class="schedule-itm  l-flex-row" v-for="item in footSchedule.values[idx]">
                                <!--左边的参赛时间-->
                                <div class="when-game">
                                    <em class="game-time">{{item.matchtime.substr(5,11)}}</em>
                                </div>
                                <!--右边的参赛队伍和结果-->
                                <div class="who-game l-flex-1 l-flex-row">
                                    <div class="who-gamer who-gamer-home l-flex-1">
                                        <img v-logo="item.homelogo"/>
                                        <em>{{item.homesxname}}</em>
                                    </div>

                                    <em class="who-win" v-if="item.homescore">{{item.homescore}}<i>:</i>{{item.awayscore}}</em>
                                    <em class="who-win no-start" v-if="!item.homescore">vs</em>
                                    <div class="who-gamer who-gamer-guest l-flex-1">
                                        <img v-logo="item.awaylogo"/><em>{{item.awaysxname}}</em>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    import logo from '~directives/logo'
    export default{
        directives: {
            logo
        },
        data () {
            return {
                isHide: true,  // 弹层是否显示
                isShow: false, // 列表展示区域是否显示
                switchId: '',
                stageId: '',
                currSelect: '',  // 当前被选中的选框
                selected: {},    // 所有选框对象
                isForward: true,
                isBehind: true
            }
        },
        computed: {
            choiceNum () {    // 总共有多少个choice
                return this.footChoice && this.footChoice.choice_list.length - 1
            },
            footSchedule () {
                return this.$store.state.center.footballMatch.schedule.footschedule
            },
            footChoice () {
                return this.$store.state.center.footballMatch.schedule.footchoice
            },
            typeId () {
                return this.footChoice && this.footChoice.roundtype
            }
        },
        mounted () {
            this.goInit()
            this.isHide = true
            this.isShow = false
        },
        watch: {
            '$route' () {
                this.goInit()
                this.isHide = true
                this.isShow = false
            },
            'footChoice' (val) {
                console.log('---------------')
                console.log(val)
                this.currSelect = val.curr_choice
                this.switchId = this.footChoice.choice_list[this.currSelect].switchid
                this.stageId = this.footChoice.choice_list[this.currSelect].stageid
                this.$set(this.selected, this.currSelect, true)
                this.goShow({index: this.currSelect})
                if (this.currSelect === 0) {
                    this.isForward = false
                }
                if (this.currSelect === this.choiceNum) {
                    this.isBehind = false
                }
            }
        },
        methods: {
            goInit () {
                this.$store.dispatch(aTypes.getFootballMatchScheduleChoice, {seasonid: this.$route.params.seasonid})
            },
            goShow ({index}) {
                this.switchId = this.footChoice.choice_list[index].switchid
                this.stageId = this.footChoice.choice_list[index].stageid
                this.$set(this.selected, this.currSelect, false)
                this.currSelect = index
                this.$set(this.selected, this.currSelect, true)
                if (this.currSelect > 0 && this.currSelect < this.choiceNum) {
                    this.isForward = true
                    this.isBehind = true
                } else if (this.currSelect === 0) {
                    this.isForward = false
                    this.isBehind = true
                } else {
                    this.isForward = true
                    this.isBehind = false
                }
                if (this.currSelect !== this.currChoice) {   // 有个延迟
                    setTimeout(() => {
                        this.isHide = true
                        this.isShow = false
                    }, 200)
                } else {    // 初始进入
                    this.isHide = true
                    this.isShow = false
                }
                this.$store.dispatch(aTypes.getFootballMatchSchedule, {
                    stageid: this.stageId,
                    switchid: this.switchId,
                    roundtype: this.typeId
                })
                console.log('11111111111111111')
                console.log(this.switchId)
                console.log(this.typeId)
            },
            goForward () {
                this.$set(this.selected, this.currSelect, false)
                this.currSelect--
                this.$set(this.selected, this.currSelect, true)
                if (this.currSelect >= 0 && this.isHide) {   // 弹出层隐藏时执行
                    this.goShow({index: this.currSelect})
                }
                this.isBehind = true
                if (this.currSelect === 0) { this.isForward = false }
            },
            goBehind () {
                this.$set(this.selected, this.currSelect, false)
                this.currSelect++
                this.$set(this.selected, this.currSelect, true)
            // alert(this.currSelect);
                if (this.currSelect <= this.choiceNum && this.isHide) {
                    this.goShow({index: this.currSelect})
                }
                this.isForward = true
                if (this.currSelect === this.choiceNum) { this.isBehind = false }
            },
            goSelect () {
                this.isHide = false
                this.isShow = true
            }
        }
    }
</script>
