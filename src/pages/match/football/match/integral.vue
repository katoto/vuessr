<template>
    <div class="l-full l-flex-column">
        <!--二级菜单选择总榜主场客场-->
        <div class="sk-detail-tap-box three" v-if="iscup && iscup === '0' ">
            <ul class="sk-detail-tap three">
                <li :class="{'cur':tab==='all'}" v-tap="{methods:onTab, type:'all'}">总榜</li>
                <li :class="{'cur':tab==='home'}" v-tap="{methods:onTab, type:'home'}">主场</li>
                <li :class="{'cur':tab==='away'}" v-tap="{methods:onTab, type:'away'}">客场</li>
            </ul>
        </div>

        <!--总榜-->
        <section class="l-flex-1 l-relative" v-if="tab === 'all' ">
            <div class=" l-full l-scroll-y" v-if="allData">
                <!--有分组-->
                <div class="inte-main">
                    <div class="games-list games-group" v-if="allData['rettype'] === 'object' ">
                        <table class="games" width="100%" cellspacing="0" cellpadding="0"  v-for="idx in allData.sort">
                            <colgroup>
                                <col width="45.5%">
                                <col width="8%">
                                <col width="16.6%">
                                <col width="10.3%">
                                <col width="5%">
                                <col width="15.6%">
                            </colgroup>
                            <tr>
                                <th><em class="group">{{idx+1}}</em></th>
                                <th>赛</th>
                                <th>胜/平/负</th>
                                <th>进/失</th>
                                <th>净</th>
                                <th>积分</th>
                            </tr>
                            <tr v-for="lst in allData.values[idx]" @click="goTeam">
                                <td>
                                    <em class="cate-cont">
                                        <i class="game-category " v-style="lst.color">{{lst.order}}</i>
                                    </em>
                                    <em class="gamer-cont">
                                        <img v-logo="lst.teamlogo" >{{lst.teamsxname}}</em>
                                </td>
                                <td>{{lst.total}}</td>
                                <td>{{lst.win}}/{{lst.draw}}/{{lst.lost}}</td>
                                <td>{{lst.jq}}/{{lst.sq}}</td>
                                <td>{{lst.js}}</td>
                                <td>{{lst.score}}</td>
                            </tr>
                        </table>
                    </div>
                    <!--没有分组-->
                    <div class="games-list game-list-b " v-if="allData['rettype'] === 'array' ">
                        <table class="games" width="100%" cellspacing="0" cellpadding="0">
                            <colgroup>
                                <col width="45.5%">
                                <col width="8%">
                                <col width="16.6%">
                                <col width="10.3%">
                                <col width="5%">
                                <col width="15.6%">
                            </colgroup>
                            <tr>
                                <th></th>
                                <th>赛</th>
                                <th>胜/平/负</th>
                                <th>进/失</th>
                                <th>净</th>
                                <th>积分</th>
                            </tr>
                            <tr  v-for="item in allData.values" @click="goTeam(item.teamid)">
                                <td>
                                    <em class="cate-cont"><i class="game-category" v-style="item.color">{{item.order}}</i></em>
                                    <em class="gamer-cont">
                                        <img v-logo="item.teamlogo">
                                        {{item.teamsxname}}
                                    </em>
                                </td>
                                <td>{{item.total}}</td>
                                <td>{{item.win}}/{{item.draw}}/{{item.lost}}</td>
                                <td>{{item.jq}}/{{item.sq}}</td>
                                <td>{{item.js}}</td>
                                <td>{{item.score}}</td>
                            </tr>

                        </table>
                    </div>
                </div>

                <ul class="color-mean what-means" v-if="allData.desc">
                    <li class="mean-item"  v-for="list in allData.desc">
                        <i class="game-category" v-style="list.color"></i>
                        <em>{{list.name}}</em>
                    </li>
                </ul>
            </div>

            <div class="ui-empty"  v-if="!allData || !allData.length">
                <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                <div class="ui-empty-gfont">暂无数据</div>
            </div>
        </section>

        <!--主场-->
        <section class="l-flex-1 l-relative" v-if="tab === 'home' ">
            <div class="inte-main l-full l-scroll-y" v-if="homeData">
                <div class="games-list game-list-b " v-if="homeData['rettype'] === 'array' ">
                    <table class="games" width="100%" cellspacing="0" cellpadding="0">
                        <colgroup>
                            <col width="45.5%">
                            <col width="8%">
                            <col width="16.6%">
                            <col width="10.3%">
                            <col width="5%">
                            <col width="15.6%">
                        </colgroup>
                        <tr>
                            <th></th>
                            <th>赛</th>
                            <th>胜/平/负</th>
                            <th>进/失</th>
                            <th>净</th>
                            <th>积分</th>
                        </tr>
                        <tr  v-for="item in homeData.values" @click="goTeam(item.teamid)">
                            <td>
                                <em class="cate-cont"><i class="game-category" v-style="item.color">{{item.order}}</i></em>
                                <em class="gamer-cont">
                                    <img v-logo="item.teamlogo">
                                    {{item.teamsxname}}
                                </em>
                            </td>
                            <td>{{item.total}}</td>
                            <td>{{item.win}}/{{item.draw}}/{{item.lost}}</td>
                            <td>{{item.jq}}/{{item.sq}}</td>
                            <td>{{item.js}}</td>
                            <td>{{item.score}}</td>
                        </tr>

                    </table>
                </div>
                <ul class="color-mean what-means" v-if="homeData.desc">
                    <li class="mean-item"  v-for="list in homeData.desc">
                        <i class="game-category" v-style="list.color"></i>
                        <em>{{list.name}}</em>
                    </li>
                </ul>
            </div>

            <div class="ui-empty"  v-if="!homeData">
                <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                <div class="ui-empty-gfont">暂无数据</div>
            </div>
        </section>

        <!--客场-->
        <section class="l-flex-1 l-relative" v-if="tab === 'away' ">
            <div class="inte-main l-full l-scroll-y" v-if="awayData">
                <div class="games-list game-list-b " v-if="awayData['rettype'] === 'array' ">
                    {{awaydata}}
                    <table class="games" width="100%" cellspacing="0" cellpadding="0">
                        <colgroup>
                            <col width="45.5%">
                            <col width="8%">
                            <col width="16.6%">
                            <col width="10.3%">
                            <col width="5%">
                            <col width="15.6%">
                        </colgroup>
                        <tr>
                            <th></th>
                            <th>赛</th>
                            <th>胜/平/负</th>
                            <th>进/失</th>
                            <th>净</th>
                            <th>积分</th>
                        </tr>
                        <tr  v-for="item in awayData.values" @click="goTeam(item.teamid)">
                            <td>
                                <em class="cate-cont"><i class="game-category" v-style="item.color">{{item.order}}</i></em>
                                <em class="gamer-cont">
                                    <img v-logo="item.teamlogo">
                                    {{item.teamsxname}}
                                </em>
                            </td>
                            <td>{{item.total}}</td>
                            <td>{{item.win}}/{{item.draw}}/{{item.lost}}</td>
                            <td>{{item.jq}}/{{item.sq}}</td>
                            <td>{{item.js}}</td>
                            <td>{{item.score}}</td>
                        </tr>

                    </table>
                </div>
                <ul class="color-mean what-means" v-if="awayData.desc">
                    <li class="mean-item"  v-for="list in awayData.desc">
                        <i class="game-category" v-style="list.color"></i>
                        <em>{{list.name}}</em>
                    </li>
                </ul>
            </div>

            <div class="ui-empty" v-if="!awayData">
                <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                <div class="ui-empty-gfont">暂无数据</div>
            </div>
        </section>
    </div>
</template>

<script>
    import {aTypes} from '~store/center'
    import style from '~directives/style'
    import logo from '~directives/logo'
    export default{
        directives: {
            style, logo
        },
        data () {
            return {
                tab: 'all'
            }
        },
        computed: {
            allData () {
                return this.$store.state.center.footballMatch.integral.all
            },
            homeData () {
                return this.$store.state.center.footballMatch.integral.home
            },
            awayData () {
                return this.$store.state.center.footballMatch.integral.away
            },
            iscup () {
                return this.$store.state.center.footballMatch.head && this.$store.state.center.footballMatch.head.iscup
            }
        },
        mounted () {
            this.getAll()
        },
        watch: {
            '$route' () {
                this.getAll()
            },
            iscup (iscup) {
                switch (this.tab) {
                case 'all': { this.getAll(); break }
                case 'home': { this.getHome(); break }
                case 'away': { this.getAway() }
                }
            }
        },
        methods: {
            getAll () {
                // console.log(this.iscup);
                return this.$store.dispatch(aTypes.getFootballIntegralAll, {seasonid: this.$route.params.seasonid, iscup: this.iscup})
            },
            getHome () {
                return this.$store.dispatch(aTypes.getFootballIntegralHome, {seasonid: this.$route.params.seasonid, iscup: 0})
            },
            getAway () {
                return this.$store.dispatch(aTypes.getFootballIntegralAway, {seasonid: this.$route.params.seasonid, iscup: 0})
            },
            onTab ({type}) {
                this.tab = type
                switch (type) {
                case 'all': { if (!this.allData) return this.getAll(); break }
                case 'home': { if (!this.homeData) return this.getHome(); break }
                case 'away': { if (!this.awayData) return this.getAway() }
                }
            },
            goTeam (idx) {
                location.href = '#/football/team/' + idx
            // console.log(location.href);
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
