<template>
    <section class="count-main">
        <div class="l-flex-row l-full">
            <!--left scroll-->
            <template v-if="statisList && statisList.length">
                <div class="plleft l-flex-column">
                <ul class="plleft-list l-scroll-y l-flex-1">
                    <li :class="{'cur':tab === 'score'}" v-tap="{methods:onTab, type:'score'}">得分</li>
                    <li :class="{'cur':tab === 'lost'}" v-tap="{methods:onTab, type:'lost'}">失分</li>
                    <li :class="{'cur':tab === 'fieldgoal'}" v-tap="{methods:onTab, type:'fieldgoal'}">投篮命中率</li>
                    <li :class="{'cur':tab === 'threepoint'}" v-tap="{methods:onTab, type:'threepoint'}">三分命中率</li>
                    <li :class="{'cur':tab === 'freethrow'}" v-tap="{methods:onTab, type:'freethrow'}">罚球命中率</li>
                    <li :class="{'cur':tab === 'rebound'}" v-tap="{methods:onTab, type:'rebound'}">篮板</li>
                    <li :class="{'cur':tab === 'assist'}" v-tap="{methods:onTab, type:'assist'}">助攻</li>
                    <li :class="{'cur':tab === 'block'}" v-tap="{methods:onTab, type:'block'}">盖帽</li>
                    <li :class="{'cur':tab === 'steal'}" v-tap="{methods:onTab, type:'steal'}">抢断</li>
                    <li :class="{'cur':tab === 'turnover'}" v-tap="{methods:onTab, type:'turnover'}">失误</li>
                    <li :class="{'cur':tab === 'foul'}" v-tap="{methods:onTab, type:'foul'}">犯规</li>
                </ul>
            </div>

                <!--right scroll-->
                <div class="plright l-flex-l l-flex-column">
                    <h2 class="average-tit">
                        <em>球队</em>{{tabInfo[tab]}}
                    </h2>
                    <ul class="average-list l-flex-l l-srcoll-y">
                        <li class="average-item clear"  v-for="(list,index) in statisList">
                            <div class="aver-team">
                                <em class="aver-turn">{{index+1}}</em>
                                <span class="aver-team-img">
                                    <img :src="list.teamlogo">
                                    <em class="aver-team-name">{{list.teamgbname}}</em>
                                </span>
                            </div>
                            <span class="aver-score">{{list.value}}</span>
                        </li>
                    </ul>
                </div>
            </template>
            <!--<div class="plright l-flex-l l-flex-column" v-if="!statisList || !statisList.length" style="flex:1">-->
               <!--<view-empty></view-empty>-->
            <!--</div>-->
            <view-empty v-else style="flex:1"></view-empty>
        </div>
    </section>
</template>

<script>
    import {aTypes} from '~store/center'
    import viewEmpty from '~components/match/view_empty.vue'
    export default{
        components: {
            viewEmpty
        },
        data () {
            return {
                tab: 'score',
                tabInfo: {
                    'score': '场均得分',
                    'lost': '场均失分',
                    'fieldgoal': '投篮命中率',
                    'threepoint': '三分命中率',
                    'freethrow': '罚球命中率',
                    'rebound': '场均篮板',
                    'assist': '场均助攻',
                    'block': '场均盖帽',
                    'steal': '场均抢断',
                    'turnover': '场均失误',
                    'foul': '场均犯规'
                }
            }
        },
        mounted () {
            this.getStatisticData()
        },
        computed: {
            statisList () {
                return this.$store.state.center.basketballMatch.statistics
            }
        },
        watch: {
            '$route': function () {
                this.tab = 'score'
                this.getStatisticData()
            }
        },
        methods: {
            getStatisticData () {
                return this.$store.dispatch(aTypes.getBasketballMatchStatistics, {
                    seasonid: this.$route.params.seasonid, key: this.tab
                })
            },
            onTab ({type}) {
                this.tab = type
                this.getStatisticData()
            }
        }
    }
</script>

<style scoped>
    .plright.l-flex-l.l-flex-column {
        flex: 1;
    }
    .count-main{ background: #fff; width: 100%; flex-direction:row; display: flex;display:-moz-box;display:-webkit-box;display:box;}
    .average-tit{ height: 1.226667rem; line-height: 1.226667rem; text-align: right; color: #999;font-size: 0.266667rem; border-bottom:1px solid #f4f4f4;padding:0 0.53333rem;}
    .average-list{padding:0 0.53333rem;}
    .average-tit em{ float: left; margin-left: 1.2rem}
    .average-item{height:1.146667rem; line-height:1.146667rem; font-size: 0.346667rem; color: #333333;  border-bottom:1px solid #f4f4f4;display: inline-block;width: 100%; }
    .aver-team{ float: left;}
    .aver-team-img{ height: 1.226667rem;width: 0.506667rem; position: relative;}
    .aver-team-img img{max-width:0.506667rem; max-height:0.506667rem; position: absolute; top: 50%;margin-top: -0.18rem;}
    .aver-turn{ font-size:0.293333rem; color: #999; margin-right:0.133333rem;display: inline-block;width: 0.346667rem;  text-align: center;}
    .aver-team-name{ margin-left:0.64rem;}
    .aver-score{ float: right;}
    .plleft{width:1.96rem;font-size:.293333rem;color:#333;background:#efeff4;  box-shadow:-1px 1px 0 #e2e2e2 inset;}
    .plleft-list li{line-height:1.226667rem;color:#787878;height:1.226667rem;text-align:center;background:#efeff4;border-right:1px solid #e2e2e2;overflow:hidden}
    .plleft-list li.cur{background:#fff;position:relative;border-right:1px solid #fff;color: #333;}
    .plright{width: 6.933333rem;background: #fff;  }
</style>
