<template>
    <section class="count-main">
        <div class="l-flex-row l-full">
            <!--left scroll-->
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
            <div class="plright l-flex-l l-flex-column" v-if="statisList && statisList.length">
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
            <div class="plright l-flex-l l-flex-column" v-if="!statisList || !statisList.length" style="flex:1">
                <div class="ui-empty">
                    <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                    <div class="ui-empty-gfont">暂无数据</div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import {aTypes} from '~store/center'
    export default{
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
    .ui-empty{padding:2.72rem 0;text-align:center;}
    .ui-empty img{margin-bottom:0.933333rem;}
    .ui-empty .w240{width:3.2rem;}
    .ui-empty-gfont{font-size:0.4rem;color:#b3b3b3;margin-bottom:0.773333rem;padding:0 0.5rem;}

    ul.average-list.l-srcoll-y{
        overflow: auto;
    }
    .plright.l-flex-l.l-flex-column {
        flex: 1;
    }
</style>
