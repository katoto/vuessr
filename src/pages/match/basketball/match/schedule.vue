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
                            <li class="schedule-itm  l-flex-row" v-for="list in basketSchedule" v-tap="{methods:goDetail,fid:list.fid}">
                                <!--左边的参赛时间-->
                                <div class="when-game">
                                    <em class="game-time">{{list.matchtime.substr(5, 11)}}</em>
                                </div>
                                <!--右边的参赛队伍和结果-->
                                <div class="who-game l-flex-1 l-flex-row">
                                    <div class="who-gamer who-gamer-home l-flex-1">
                                        <img v-logo="list.awaylogo"/>
                                        <em>{{list.awaysxname}}</em>
                                    </div>

                                    <em class="who-win" v-if="list.homescore">{{list.awayscore}}<i>:</i>{{list.homescore}}</em>
                                    <em class="who-win no-start" v-if="!list.homescore">vs</em>
                                    <div class="who-gamer who-gamer-guest l-flex-1">
                                        <img v-logo="list.homelogo"/><em>{{list.homesxname}}</em>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </section>
        <view-empty v-if="!basketChoice"></view-empty>

    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    import logo from '~directives/logo'
    import viewEmpty from '~components/match/view_empty.vue'
    export default{
        components: {
            viewEmpty
        },
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
            },
            goDetail ({fid}){
                this.$router.push(`/detail/basketball/${fid}/analysis/zj`)
            }
        }
    }
</script>
<style scoped>
    .sk-detail-tap-box{text-align:center}
    .sk-detail-tap li{width:2rem;height:.773333rem;line-height:.773333rem;color:#787878;float:left}
    .sk-detail-tap li.cur{background:#999;color:#fff}
    .turn-box{ position: relative; height: 1.333333rem;}
    .turn-boxer{ display: inline-block; width: 1.333333rem;height: 100px; text-align: center;}
    .turn-boxer-prev{float: left;}
    .turn-boxer-next{ float: right;}
    .turn-to{ width:0.186667rem;height:0.293333rem;position: absolute; top: 0.506667rem;display: inline-block; }
    .boxer-h{height:1.28rem}
    .num-turn{min-width:2.8rem; height: 0.8rem;line-height:0.8rem; color: #787878;font-size: 0.346667rem;position: absolute;top: 50%;  margin-top: -0.4rem; left: 50%; margin-left: -1.4rem; text-align: center;}
    .num-turner{display: inline-block;width:0.133333rem;height:0.08rem;background:url('~assets/images/match/drop.png');  background-size: cover;margin-left: 0.08rem;margin-bottom:0.053333rem}
    .look-prev-have{left: 0.533333rem;background:url('~assets/images/match/sprite.png') 0 0 no-repeat; background-size: cover}
    .look-next-have{right: 0.533333rem;background:url('~assets/images/match/sprite.png') -0.373333rem 0 no-repeat; background-size: cover;}
    .alert-turns{ width: 100%;  z-index: 5; height:auto;}
    .hide{ display: none;}
    .ui-navbox-item{background:#f4f4f4;position:relative;z-index:2; overflow: scroll;}
    .nav-box-tit{padding-left: 0.533333rem; color: #999; font-size: 0.32rem; height: 0.533333rem;}
    .ui-navbox-item ul{padding:0 .373333rem .373333rem .453333rem;overflow:hidden;font-size:.4rem}
    .ui-navbox-item li{float:left;width:23.5%;list-style:none;font-size: 0.32rem; margin-right: 0.133333rem;margin-bottom: 0.266667rem; background: #fff;border-radius:.106667rem;}
    .ui-navbox-item li span{display:block;height:1.066667rem;line-height:1.066667rem;border:1px solid #f1f1f1; text-align:center;position:relative;color:#333;text-decoration:none;border-radius:.106667rem;}
    .ui-navbox-item li.select span:after{position:absolute;bottom:-1px;right:-1px;width:.906667rem;height:.76rem;content:"";background-position:center 0;}
    .ui-navbox-item li.select span{border-color:#f63f3f;color:#f63f3f;border-radius:.106667rem;}
    .ui-navbox-item li:nth-child(4n) span{margin-right:0;}
    .ui-navbox-item li.select span:after{background:url('~assets/images/match/m-icon.png') no-repeat;background-size:.906667rem 2.533333rem}
    .alert-turns{ width: 100%;  z-index: 5; height:auto;}
    .schedule-cont{ margin-top:0.266667rem; background: #fff; width: 100%;}
    .schedule-itm{clear:both;box-sizing:border-box;height:1.333333rem;border-bottom: 1px solid #f4f4f4;  font-size: 0.293333rem;color: #999999; background: #fff;}
    .home-sc-cont{margin-top: 0;}
    .home-sc-cont{margin-bottom: 0.266667rem;}
    .home-sc-cont .schedule-itm{height: 1.333333rem;}
    .home-sc-cont .who-game{height: 1.333333rem;line-height: 1.333333rem;}
    .home-sc-cont .when-game{height: 1.333333rem;}
    .home-sc-cont .game-time{ margin-top: 0.5rem; font-size: 0.32rem}
    .when-game{width: 2.773333rem; text-align: left;margin-left: 0.533333rem;clear:both;font-size: 0.266667rem}
    .game-time,.game-league{display: inline-block;width: 3.7rem}
    .game-time{margin-top: 0.3rem;color: #999;}
    .who-game{color: #333333; font-size:0.346667rem;height: 1.333333rem;line-height:1.333333rem;margin-right: 0.533333rem;}
    .who-gamer{ width: 0;}
    .who-gamer-home{ text-align: right; position: relative; }
    .who-gamer-home img{position: absolute;left: 0; top:50%; margin-top:-0.30666rem}
    .who-gamer-home img,.who-gamer-guest img{max-width: 0.506667rem; max-height: 0.506667rem;}
    .who-gamer-home em, .who-gamer-guest em{ display: inline-block; width: 1.5rem; text-align:center;}
    .schedule-foot .who-gamer-home em, .schedule-foot .who-gamer-guest em{ display: inline-block; width: 1.7rem; text-align:center;}
    .who-win{width: 1.733333rem; text-align: center;display:inline-block; background: #f4f4f4; height: 0.64rem;height: 0.64rem; line-height: 0.64rem;position: relative;top: 50%;margin-top: -0.32rem; margin-left:0.133333rem;  margin-right: 0.133333rem;border-radius: 0.066667rem;}
    .who-win i{ color: #999; margin:0 0.13333rem; display: inline-block;}
    .schedule-foot .who-win{ width: 1.173333rem}
    .schedule-foot .when-game{ width: 3rem;}
    .no-start{ color:#999; background: none; font-size: 0.32rem}
    .who-gamer-guest{text-align: left; position: relative;}
    .who-gamer-guest img{position: absolute;right: 0; top:50%; margin-top: -0.30666rem;}
    .home-sc-cont{margin-top: 0;}
</style>
