<template>
    <section class="l-flex-1 l-relative"  v-if="homeData">
        <div class="inte-main l-full l-scroll-y">
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
                    <tr  v-for="item in homeData.values" v-tap="{methods:goTeam,teamid:item.teamid}">
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

        <view-empty v-if="!homeData.values.length"></view-empty>
    </section>
</template>

<script>
    import viewEmpty from '~components/match/view_empty.vue'
    import style from '~directives/style'
    import logo from '~directives/logo'
    import loader from '~components/match/loader.vue'
    export default{
        directives: {
            style, logo
        },
        components: {
            viewEmpty, loader
        },
        props: ['homeData'],
        methods: {
            goTeam ({teamid}) {
                this.$router.push(`/team/football/${teamid}/sc/`)
            }
        }
    }
</script>

<style scoped>
    .inte-main td{ height: 1.066667rem; font-size: 0.32rem; color: #787878; text-align: center;}
    .inte-main th:nth-child(6){padding-right: 0.53rem;}
    .inte-main td:nth-child(6){color: #333; padding-right: 0.53rem;}
    .inte-main .games-list{padding: 0;border-bottom: 0.266667rem solid #f4f4f4;}
    .games-list{background:#fff;padding:0 .533333rem;font-size:.32rem;}
    .games{text-align:center;}
    .games td{border-bottom:1px solid #f4f4f4}
    .games tr td:first-child{font-size:0.346667rem}
    .games th{ text-align: center;color: #999999; font-size: 0.293333rem; font-weight: normal;height:0.8rem; line-height: 0.8rem; border-bottom: 1px solid #f1f1f1;background: #fff;}
    .group{  display: inline-block; text-align: left;color: #333; font-size: 0.293333rem;float: left; margin-left: 0.533333rem}
    .cate-cont{width: 0.986667rem; text-align: right; float:left;margin-right: 0.266667rem; display: inline-block;height: 1.066667rem;  line-height: 1.066667rem}
    .gamer-cont{color: #333;text-align: left;overflow: hidden;height:1.066667rem; line-height:1.066667rem;  display: inline-block; float: left}
    .gamer-cont>img{max-width:0.5066rem;height:0.5066rem;margin-top:0.32rem; margin-right:0.1333rem; float: left;}
    .inte-main .games-list{padding: 0;border-bottom: 0.266667rem solid #f4f4f4;}
    .game-category{ width: 0.453333rem;height: 0.453333rem;line-height: 0.453333rem; text-align: center;color: #333;display: inline-block;  border-radius: 0.226667rem;font-size: 0.293333rem;}
    .inte-header-b .game-category{ width: 0.266667rem; height: 0.266667rem;}
    .game-list-b .game-category{ border-radius: 0;}
    .color-mean{padding-left:0.5333rem; font-size: 0.293333rem; color: #999; background: #fff; border-bottom: 1px solid #f1f1f1;}
    .mean-item{float: left; height: 1.2rem; line-height: 1.2rem;text-align: left; margin-right: 0.65rem;}
    .mean-item em{ margin-left: 0.133333rem;color: #999; font-size:0.2667rem}
    .mean-item .game-category{ position: relative; top: 10%;}
    .what-means .mean-item{ height: 0.8rem; line-height: 0.8rem;margin-right: 0.366667rem;}
    .what-means .game-category{ width:0.2667rem; height: 0.2667rem;line-height: 0.16rem;border-radius:0; top:0.01rem; }
    .games{border-bottom: 0.266667rem solid #f4f4f4;}
</style>
