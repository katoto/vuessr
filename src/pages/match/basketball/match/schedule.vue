<template>
    <div class="l-full l-flex-column">
        <div class="sk-detail-tap-box  turn-box" v-if="basketChoice">
            <div class="boxer-h">
                <em class="turn-boxer turn-boxer-prev">
                    <i class="turn-to look-prev-have" v-if="isForward"  v-tap="{methods:goForward}"></i>
                    <i class="turn-to" v-if="!isForward"></i>
                </em>
                <div class="num-turn" v-tap="{methods:goSelect}">{{tapname}} {{tapshow}}<i class="num-turner"></i></div>

                <em class="turn-boxer turn-boxer-next">
                    <i class="turn-to look-next-have" v-if="isBehind"  v-tap="{methods:goBehind}"></i>
                    <i class="turn-to" v-if="!isBehind"></i>
                </em>
            </div>
        </div>

        <section class="l-flex-1 l-relative schedule-h" v-if="basketChoice">
            <!--没有回合的情况-->
            <div class="l-full l-scroll-y ">
                <!--弹层-筛选轮次-->
                <div class="alert-turns slect-alert-turns" :class="{'hide':isHide}">
                    <!--二维-->
                    <div class="ui-navbox-item" v-for="(itm1,idx1) in basketChoice.choice_list" v-if="tapshow">
                        <div class="nav-box-tit ">{{itm1.stagegbname}}</div>
                        <ul>
                            <li v-for="(itm2,idx2) in itm1.nav" :class="{'select':selected[idx1+'&'+idx2]}" v-tap="{methods:goShow,i:idx1,j:idx2}">
                                <span>{{itm2.show}}</span>
                            </li>
                        </ul>
                    </div>

                    <!--一维-->
                    <div class="ui-navbox-item" v-if="!tapshow">
                        <ul>
                            <li v-for="(itm,dx) in basketChoice.choice_list" :class="{'select':selected[dx]}" v-tap="{methods:goShow,i:dx,j:-1}">
                                <span>{{itm.stagegbname}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="schedule-wrap" :class="{'hide':isShow}" v-if="basketSchedule">
                    <section class="schedule-cont home-sc-cont l-scroll-y">
                        <ul class="schedule-list" >
                            <li class="schedule-itm  l-flex-row" v-for="list in basketSchedule">
                                <!--左边的参赛时间-->
                                <div class="when-game">
                                    <em class="game-time">{{list.matchtime.substr(5, 11)}}</em>
                                </div>
                                <!--右边的参赛队伍和结果-->
                                <div class="who-game l-flex-1 l-flex-row">
                                    <div class="who-gamer who-gamer-home l-flex-1">
                                        <img v-logo="list.homelogo"/>
                                        <em>{{list.awaysxname}}</em>
                                    </div>

                                    <em class="who-win" v-if="list.homescore">{{list.awayscore}}<i>:</i>{{list.homescore}}</em>
                                    <em class="who-win no-start" v-if="!list.homescore">vs</em>
                                    <div class="who-gamer who-gamer-guest l-flex-1">
                                        <img v-logo="list.awaylogo"/><em>{{list.homesxname}}</em>
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
        data () {
            return {
                isHide: true, // 弹层是否显示
                isShow: false, // 列表展示区域是否显示
                stageId: '',
                currSelect: '', // 当前被选中的选框
                selected: {}, // 所有选框对象
                tapname: '', // 季前赛
                tapshow: '', // 3月
                isForward: true,
                isBehind: true
            }
        },
        directives: {
            logo
        },
        computed: {
            basketSchedule () {
                return this.$store.state.center.basketballMatch.schedule.basketschedule
            },
            basketChoice () {
                return this.$store.state.center.basketballMatch.schedule.basketchoice
            },
            numChoice () { // 总共有多少个choice
                return this.basketChoice && this.basketChoice.choice_list.length - 1
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
            'basketChoice' (val) { // 后端数据太恶心了，不是我故意把这里做成这样的
            //                console.log(val)
            //                console.log(val.choice_list[val.curr_choice].nav)
                this.stageId = val.curr_stid
                let tmp = val.choice_list[val.curr_choice].nav
                //                console.log(tmp)

                if (tmp) { // 二维
                    for (let i = 0, len = tmp.length; i < len; i++) {
                        if (val.curr_stid === tmp[i].stageid) {
                            this.currSelect = val.curr_choice + '&' + i // 0&1
                            break
                        }
                    }
                    let idx = this.currSelect.indexOf('&')
                    let row = Number(this.currSelect.substr(0, idx))
                    let column = Number(this.currSelect.substr(idx + 1))

                    this.tapname = val.choice_list[row].stagegbname
                    this.tapshow = val.choice_list[row].nav[column].show

                    this.goShow({i: row, j: column})
                } else { // 一维
                    this.currSelect = val.curr_choice
                    if (this.currSelect === 0) { this.isForward = false }
                    if (this.currSelect === this.numChoice) { this.isBehind = false }
                    this.tapname = val.curr_tapname

                    this.goShow({i: this.currSelect, j: -1})
                }

                this.$set(this.selected, this.currSelect, true)
            }
        },
        methods: {
            goInit () {
                this.$store.dispatch(aTypes.getBasketballMatchScheduleChoice, {
                    seasonid: this.$route.params.seasonid
                })
            },
            goShow ({i, j}) {
                // alert(j);
                this.$set(this.selected, this.currSelect, false)
                this.isForward = false
                this.isBehind = false
                if (j !== -1) {
                    this.stageId = this.basketChoice.choice_list[i].nav[j].stageid
                    this.tapname = this.basketChoice.choice_list[i].stagegbname
                    this.tapshow = this.basketChoice.choice_list[i].nav[j].show

                    if (this.basketChoice.choice_list[i].nav[j + 1] || i + 1 <= this.numChoice) {
                        this.isBehind = true
                    }
                    this.currSelect = i + '&' + j
                    if (this.basketChoice.choice_list[i].nav[j - 1] || i - 1 >= 0) {
                        this.isForward = true
                    }
                } else {
                    this.stageId = this.basketChoice.choice_list[i].stageid
                    this.tapname = this.basketChoice.choice_list[i].stagegbname
                    this.currSelect = i
                    if (i-- > 0) { this.isForward = true }
                    if (i + 2 <= this.numChoice) { this.isBehind = true }
                }
                this.$set(this.selected, this.currSelect, true)
                this.isHide = true
                this.isShow = false
                this.$store.dispatch(aTypes.getBasketballMatchSchedule, {
                    seasonid: this.$route.params.seasonid,
                    stageid: this.stageId
                })
            },
            goForward () {
                this.$set(this.selected, this.currSelect, false)
                this.isBehind = true
                this.isForward = false
                if (this.tapshow) {
                    let idx = this.currSelect.indexOf('&')
                    let row = this.currSelect.substr(0, idx)
                    let column = this.currSelect.substr(idx + 1)
                    column--
                    if (column >= 0) {
                        this.isForward = true
                    } else if (--row >= 0) {
                        // alert(row);
                        if (row) { this.isForward = true }
                        column = this.basketChoice.choice_list[row].nav.length - 1
                    // alert(column);
                    }
                    this.currSelect = row + '&' + column
                    if (this.isHide) {
                        this.goShow({i: row, j: column})
                    }
                    this.tapname = this.basketChoice.choice_list[row].stagegbname
                    this.tapshow = this.basketChoice.choice_list[row].nav[column].show
                } else {
                    this.currSelect--
                    if (this.currSelect - 1 >= 0) { this.isForward = true }
                    if (this.isHide) {
                        this.goShow({i: this.currSelect, j: -1})
                    }
                    this.tapname = this.basketChoice.choice_list[this.currSelect].stagegbname
                }

                this.$set(this.selected, this.currSelect, true)
            },
            goBehind () {
                this.$set(this.selected, this.currSelect, false)
                this.isForward = true
                this.isBehind = false
                if (this.tapshow) { // 二维
                    let idx = this.currSelect.indexOf('&')
                    let row = this.currSelect.substr(0, idx)
                    let column = this.currSelect.substr(idx + 1)
                    column++

                    let column_len = this.basketChoice.choice_list[row].nav.length - 1
                    if (column <= column_len) {
                        row++
                        if (row < this.numChoice) {
                            this.isBehind = true
                        }
                        row--
                    } else if (row++ < this.numChoice) {
                        this.isBehind = true
                        column = 0
                    }
                    this.currSelect = row + '&' + column
                    if (this.isHide) {
                        this.goShow({i: row, j: column})
                    }
                    this.tapname = this.basketChoice.choice_list[row].stagegbname
                    this.tapshow = this.basketChoice.choice_list[row].nav[column].show
                } else {
                    this.currSelect++
                    if (this.currSelect + 1 <= this.numChoice) { this.isBehind = true }
                    if (this.isHide) { this.goShow({i: this.currSelect, j: -1}) }

                    this.tapname = this.basketChoice.choice_list[this.currSelect].stagegbname
                }
                this.$set(this.selected, this.currSelect, true)
            },
            goSelect () {
                this.isHide = false
                this.isShow = true
            }

        }
    }
</script>
<style scoped>
    /*.ui-empty{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;display:inline-block;}*/
    .ui-empty{padding:2.72rem 0;text-align:center;}
    .ui-empty img{margin-bottom:0.933333rem;}
    .ui-empty .w240{width:3.2rem;}
    .ui-empty-gfont{font-size:0.4rem;color:#b3b3b3;margin-bottom:0.773333rem;padding:0 0.5rem;}

    ul.average-list.l-srcoll-y{
        overflow: auto;
    }
</style>
