<template>
    <div class="l-full l-flex-column">
       <template v-if="footChoice">
           <template v-if="isEmpty(footChoice)">
               <div class="sk-detail-tap-box  turn-box" v-if="footChoice.choice_list[currSelect]">
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
                                   <li class="schedule-itm  l-flex-row" v-for="list in footSchedule.values" v-tap="{methods:goDetail,fid:list.fid}">
                                       <!--左边的参赛时间-->
                                       <div class="when-game">
                                           <em class="game-time">{{list.matchtime.substr(5, 11)}}</em>
                                       </div>
                                       <!--右边的参赛队伍和结果-->
                                       <div class="who-game l-flex-1 l-flex-row">
                                           <div class="who-gamer who-gamer-home l-flex-1">
                                               <img :src="[list.homelogo?list.homelogo:'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png']"/>
                                               <em>{{list.homesxname}}</em>
                                           </div>

                                           <em class="who-win" v-if="list.homescore">{{list.homescore}}<i>:</i>{{list.awayscore}}</em>
                                           <em class="who-win no-start" v-if="!list.homescore">vs</em>
                                           <div class="who-gamer who-gamer-guest l-flex-1">
                                               <img :src="[list.awaylogo?list.awaylogo:'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png']"/><em>{{list.awaysxname}}</em>
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
                                   <li class="schedule-itm  l-flex-row" v-for="item in footSchedule.values[idx]" v-tap="{methods:goDetail,fid:item.fid}">
                                       <!--左边的参赛时间-->
                                       <div class="when-game">
                                           <em class="game-time">{{item.matchtime.substr(5,11)}}</em>
                                       </div>
                                       <!--右边的参赛队伍和结果-->
                                       <div class="who-game l-flex-1 l-flex-row">
                                           <div class="who-gamer who-gamer-home l-flex-1">
                                               <img :src="[item.homelogo?item.homelogo:'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png']"/>
                                               <em>{{item.homesxname}}</em>
                                           </div>

                                           <em class="who-win" v-if="item.homescore">{{item.homescore}}<i>:</i>{{item.awayscore}}</em>
                                           <em class="who-win no-start" v-if="!item.homescore">vs</em>
                                           <div class="who-gamer who-gamer-guest l-flex-1">
                                               <img :src="[item.awaylogo?item.awaylogo:'http://tccache.500.com/mobile/touch/images/bifen/mr-logo.png']"/>
                                               <em>{{item.awaysxname}}</em>
                                           </div>
                                       </div>
                                   </li>
                               </ul>
                           </section>
                       </div>
                   </div>
               </section>
           </template>

           <view-empty v-else></view-empty>
       </template>
    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    import logo from '~directives/logo'
    import viewEmpty from '~components/match/view_empty.vue'
    export default{
        directives: {
            logo
        },
        components: {
            viewEmpty
        },
        data () {
            return {
                isHide: true, // 弹层是否显示
                isShow: false, // 列表展示区域是否显示
                switchId: '',
                stageId: '',
                currSelect: '', // 当前被选中的选框
                selected: {}, // 所有选框对象
                isForward: true,
                isBehind: true
            }
        },
        computed: {
            choiceNum () { // 总共有多少个choice
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
                if (this.currSelect !== this.currChoice) { // 有个延迟
                    setTimeout(() => {
                        this.isHide = true
                        this.isShow = false
                    }, 200)
                } else { // 初始进入
                    this.isHide = true
                    this.isShow = false
                }
                this.$store.dispatch(aTypes.getFootballMatchSchedule, {
                    stageid: this.stageId,
                    switchid: this.switchId,
                    roundtype: this.typeId
                })
            //                console.log(this.switchId)
            //                console.log(this.typeId)
            },
            goForward () {
                this.$set(this.selected, this.currSelect, false)
                this.currSelect--
                this.$set(this.selected, this.currSelect, true)
                if (this.currSelect >= 0 && this.isHide) { // 弹出层隐藏时执行
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
                this.isHide = !this.isHide
                this.isShow = !this.isShow
                console.log(this.isHide)
                if (this.isHide) {
                    this.goShow({index: this.currSelect})
                }
            },
            goDetail ({fid}) {
                this.$router.push(`/detail/football/${fid}/analysis/zj`)
            },
            isEmpty (obj) {
                return Object.keys(obj).length
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
    .qi-pop-box{width:100%}
    .schedule-foot .who-gamer-home em, .schedule-foot .who-gamer-guest em{ display: inline-block; width: 1.7rem; text-align:center;}
    .schedule-foot .who-win{ width: 1.173333rem}
    .schedule-foot .when-game{ width: 3rem;}
    .tit-round{text-indent: 0.533333rem;color: #787878; font-size: 0.32rem; height: 0.8rem; line-height: 0.8rem; text-align: left; border-top:1px solid #f4f4f4; border-bottom: 1px solid #f4f4f4;}
    .look-prev-have::before{
        position:absolute;
        content: '';
        top:-.5rem;
        left:-.5rem;
        bottom:-.5rem;
        right:-.5rem;
    }
    .look-next-have::before{
        display: block;
        position:absolute;
        content: '';
        top:-.5rem;
        left:-.5rem;
        bottom:-.5rem;
        right:-.5rem;
    }

</style>
