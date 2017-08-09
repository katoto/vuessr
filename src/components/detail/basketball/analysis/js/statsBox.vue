<template>
    <div class="l-full l-flex-column  slide-bottom-to-top v-created">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner box-yc">
            <div class="full-scroll">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table  jcsj-table">
                    <tbody>
                    <tr>
                        <th width="30%"></th>
                        <th width="35%" colspan="2" v-for="hoa in ['away', 'home']">
                                <span class="jcsj-img">
                    				<img :src="baseInfo.awaylogo">
                    			</span>
                                <em>{{baseInfo.awaysxname}}</em>
                            </th>
                            <th width="35%" colspan="2">
                                <em>{{baseInfo.homesxname}}</em>
                                <span class="jcsj-img">
                    				<img :src="baseInfo.homelogo">
                    			</span>
                            <em>{{baseInfo[hoa + 'sxname']}}</em>
                        </th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>场均</td>
                        <td>联盟排名</td>
                        <td>场均</td>
                        <td>联盟排名</td>
                    </tr>
                    <tr v-for="(name, type) in statsType">
                        <td>{{name}}</td>
                        <td v-if="noEmptyFlag">{{stats[type].home_per}}</td>
                        <td v-if="noEmptyFlag">{{stats[type].home_rank}}</td>
                        <td v-if="noEmptyFlag">{{stats[type].away_per}}</td>
                        <td v-if="noEmptyFlag">{{stats[type].away_rank}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">基础数据</h2>
        </div>
    </div>
</template>

<script>
import {
    mTypes
} from '~store/lqdetail'
export default {
    props: ['params'],
    data () {
        return {
            statsType: {
                'points_per_game': '得分',
                'assists': '助攻',
                'rebounds': '篮板',
                'steals': '抢断',
                'cap': '盖帽',
                'mistakes': '失误',
                'foul': '犯规',
                'hit': '命中',
                'shots': '出手',
                'rate': '命中率',
                '3hit': '3分命中',
                '3shots': '3分出手',
                '3rate': '3分命中率',
                '2hit': '2分命中',
                '2shots': '2分出手',
                '2rate': '2分命中率',
                'penalty_hit': '罚篮命中',
                'penalty_num': '罚篮数',
                'penalty_rate': '罚篮命中率',
                'off_rebounds': '进攻篮板',
                'def_rebounds': '防守篮板'
            }
        }
    },
    computed: {
        baseInfo () {
            return this.params.baseInfo
        },
        stats () {
            return this.params.stats
        },
        noEmptyFlag () {
            return this.noEmpty(this.stats)
        }
    },
    methods: {
        closeDialog () {
            this.$store.commit(mTypes.setDialog, {})
        },
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    }
}
</script>

<style scoped>



    .zhzl-list li {
        height: 1.08rem
    }


    .zhzl-vs div:first-child.zhzl-green .hh {
        border-top: .16rem solid #5c788f;
        border-right: .16rem solid transparent;
        right: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        z-index: 1
    }

    .zhzl-vs div:last-child.zhzl-green .hh {
        border-top: .17rem solid #5c788f;
        border-left: .16rem solid transparent;
        left: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0
    }


    .fczs-cont .pm-img img {
        width: auto;
        max-width: 100%;
        max-height: 100%
    }


    .zsjj i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-jj.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem
    }

    .zsj i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-jj.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg)
    }

    .zspw i {
        display: inline-block;
        width: .293333rem;
        height: .213333rem;
        background: url(~assets/style/images/detail/zous-pw.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.106667rem;
        left: 50%;
        margin-left: -.146667rem
    }

    .zsc i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-cha.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg)
    }

    .zsjc i {
        display: inline-block;
        width: .213333rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/zous-cha.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        left: 50%;
        margin-left: -.106667rem
    }




    .vic-item-empty span {
        text-align: center;
        height: 100%;
        border-bottom: 1px solid #aab5bd;
        position: absolute;
        bottom: 0;
        width: .266667rem;
        display: inline-block
    }
    .vic-item-lose span {
        display: inline-block;
        width: .266667rem;
        background: #c6d7e5;
        height: 80%;
        position: absolute;
        bottom: 1px;
        left: 0
    }

    .vic-item-win span {
        display: inline-block;
        width: .266667rem;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: #f1cac3;
        height: 50%
    }

    .vic-item-coming span {
        display: inline-block;
        width: .266667rem;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: #f0f0f0;
        height: 30%
    }


    .jqzs-fc .vic-cont .vic-item-win span {
        height: 100%
    }


    .fczs-notice span {
        margin: 0 .186667rem
    }

    .fczs-notice span em {
        display: inline-block
    }



    .popTopbar {
        height: 1.173333rem;
        width: 100%
    }
    .popInner {
        background: #fff;
        display: block;
        border-radius: .186667rem .186667rem 0 0;
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        overflow: hidden
    }
    .full-scroll {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch
    }
    .popInner .full-scroll {
        overflow-x: hidden;
        border-radius: .186667rem .186667rem 0 0
    }
    .plxq-table {
        text-align: center;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    [data-dpr="1"] .plxq-table {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table {
        font-size: 33px
    }
    .plxq-table {
        margin-top: 0
    }
    .plxq-table tr th {
        line-height: 1.066667rem;
        height: 1.066667rem;
        color: #aab5bd;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 400
    }

    .plxq-table{margin-top:0}
    .plxq-table tr td,.plxq-table tr th{border-bottom:none}
    .plxq-table tr:nth-child(2){line-height:.6rem;border-bottom:1px solid #ededed}
    .plxq-table tr:nth-child(2) td{padding:0;color:#aab5bd}
    .plxq-table tr td:nth-child(1){text-align:left;padding-left:.4rem}


    .plxq-table tr td {
        border-bottom: 1px solid #f4f4f4;
        height: 1.066667rem
    }

    [data-dpr="1"] .plxq-table tr td {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table tr td {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table tr td {
        font-size: 33px
    }
    .jcsj-table tr th {
        text-align: center;
        position: relative;
        font-size: .32rem;
        color: #242c35;
        padding: .4rem 0 .3rem 0
    }
   .plxq-table tr td,
    .plxq-table tr th {
        border-bottom: none
    }

    .plxq-table tr:nth-child(2) {
        line-height: .6rem;
        border-bottom: 1px solid #ededed
    }

    .plxq-table tr:nth-child(2) td {
        padding: 0;
        color: #aab5bd
    }

    .plxq-table tr td:nth-child(1) {
        text-align: left;
        padding-left: .4rem
    }
    .jcsj-table th .jcsj-img {
        width: .666667rem;
        height: .666667rem;
        display: inline-block;
        position: relative;
        top: .2rem
    }

    .jcsj-table th .jcsj-img img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        left: 0
    }
    .popFooter {
        border-top: 1px solid #e8e8e8;
        background: #fff;
        width: 100%;
        height: 1.32rem;
        text-align: center;
        position: relative
    }

    .popFooter:active {
        background: #eee
    }

    .popFooter-act:active {
        background: #fff
    }

    .popFooter h2 {
        display: inline-block;
        margin: 0 auto;
        padding: 0 .133333rem;
        white-space: nowrap;
        line-height: 1.32rem;
        color: #242c35
    }
    .arrow {
        overflow: hidden;
        height: .333333rem;
        width: .6rem;
        position: absolute;
        left: .4rem;
        top: .493333rem
    }

    .arrow:before {
        content: '';
        height: .16rem;
        width: .16rem;
        display: block;
        border: .053333rem solid #333;
        border-right-width: 0;
        border-top-width: 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        bottom: .093333rem;
        left: .093333rem
    }

</style>
