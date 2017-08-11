<template>
    <div v-if="rankList" class="games-list rank-tb">
        <table class="games" width="100%" cellspacing="0" cellpadding="0">
            <colgroup>
                <col width="35%">
                <col width="18%">
                <col width="15%">
                <col width="15%">
                <col width="17%">
            </colgroup>
            <tbody>
            <tr>
                <th class="tb-lp"></th>
                <th>胜/负</th>
                <th>胜率</th>
                <th>胜差</th>
                <th align="right">状态</th>
            </tr>
            <tr v-for="item in rankList.values" v-tap="{methods:goTeam,teamid:item.teamid}">
                <td>
                    <em class="cate-cont"><i class="game-category ">{{item.order}}</i></em>
                    <em class="gamer-cont">
                        <img v-logo="item.teamlogo" >{{item.teamgbname}}
                    </em>
                </td>
                <td>{{item.win}}/{{item.lost}}</td>
                <td>{{item.winrate}}%</td>
                <td>{{item.windiff}}</td>
                <!--如果连续失败就用tb-rp-fail-->
                <td v-if="item['winstatus']==='1'" class="tb-rp">{{item.wintext}}连胜</td>
                <td v-if="item['winstatus']==='0'" class="tb-rp-fail tb-rp">{{item.wintext}}连败</td>
                <td v-if="item['winstatus']==='-1'">--</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import logo from '~directives/logo'
    export default{
        props: ['rankList'],
        directives: {
            logo
        },
        methods: {
            goTeam ({teamid}) {
                this.$router.push(`/team/basketball/${teamid}/curr/gl/`)
            }
        }
    }
</script>

<style scoped>
    .games th{ text-align: center;color: #999999; font-size: 0.293333rem; font-weight: normal;height:0.8rem; line-height: 0.8rem; border-bottom: 1px solid #f1f1f1;background: #fff;}
     td{ height: 1.066667rem; font-size: 0.32rem; color: #787878; text-align: center;}
     th:nth-child(6){padding-right: 0.53rem;}
     td:nth-child(6){color: #333; padding-right: 0.53rem;}
    .cate-cont{width: 0.986667rem; text-align: right; float:left;margin-right: 0.266667rem; display: inline-block;height: 1.066667rem; line-height: 1.066667rem}
    .gamer-cont{color: #333;text-align: left;overflow: hidden;height:1.066667rem; line-height:1.066667rem; display: inline-block; float: left}
    .gamer-cont>img{max-width:0.5066rem;height:0.5066rem;margin-top:0.32rem; margin-right:0.1333rem; float: left;}
    .inte-main .games-list{padding: 0;border-bottom: 0.266667rem solid #f4f4f4;}
    .game-category{ width: 0.453333rem;height: 0.453333rem;line-height: 0.453333rem; text-align: center;color: #333;display: inline-block; border-radius: 0.226667rem;font-size: 0.293333rem;}
    .inte-header-b .game-category{ width: 0.266667rem; height: 0.266667rem;}
    .game-list-b .game-category{ border-radius: 0;}
    .games{text-align:center;}
    .games td{border-bottom:1px solid #f4f4f4;}
    .games tr td:first-child{font-size:0.346667rem}
    .rank-tb td{ color: #787878;}
    .rank-tb .where-mat{color: #333;}
    .rank-tb .tb-lp{padding-left: 0.533333rem; text-align: left;}
    .rank-tb .tb-rp{ padding-right: 0.533333rem; text-align: right;color: #ff3f3f;}
    .rank-tb .tb-rp-fail{color: #3daaef;}
    .tb-lp span{display: inline-block;color: #333; height: 1.06667rem; line-height: 1.06667rem;}
    .tb-lp em{ height: 0.8rem; line-height: 0.8rem;display: inline-block;}
    .tb-lp img{max-width:0.5066rem;height:0.5066rem;margin-top:0.32rem; margin-right:0.1333rem;}
    .tb-lp .good-team{ width: 0.453333rem;height: 0.453333rem;line-height: 0.453333rem; text-align: center;color: #333;display: inline-block;}
    .tb-lp .not-good-team{ width: 0.453333rem;height: 0.453333rem;line-height: 0.453333rem; text-align: center;color: #333;display: inline-block;}
</style>
