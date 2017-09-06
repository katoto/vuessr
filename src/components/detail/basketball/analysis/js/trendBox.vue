<template>
    <div class="jqzs-fc" >
        <div class="pm-namel fczs-cont ">
            <div class="pm-img">
                <img :src="baseInfo[hoa + 'logo']">
            </div>
            <div class="fczs">
                <div class="fczs-jt">{{trendType[trends[hoa].exp]}}<em :class="trendTypeClass[trends[hoa].exp]"><i></i></em></div>
                <div class="fczs-txt">近期状态</div>
            </div>
        </div>
        <template v-if="noEmptyFlag">
            <div class="vic-cont">
                <template >
                    <div class="line-horiz" v-if="trends[hoa].level" :style="trendTop"><em>{{hoa === 'home' ? 0 - trends[hoa].level : trends[hoa].level}}</em></div>
                    <ul class="vic-list" :class="{'vic-list-fc': type === '分差'}">
                        <li class="vic-item-empty" v-tap="{methods: () => trendFid = item.fid}" :class="{'vic-item-lose':item.state=='0','vic-item-win':item.state=='3','vic-item-coming':!item.state}" v-for="(item, idx) in trends[hoa].coords">
                            <span :style="trendHeight[idx]">
                                <em class="line-ver" v-if="item.value&&item.fid&&trendFid&&trendFid==item.fid"><i>{{item.matchdate.substring(5,10)}}<br>{{item.awaysxname}}{{item.awayscore}}:{{item.homescore}}{{item.homesxname}}</i></em>
                            </span>
                            <!-- <span v-if="!item.value&&!item.fid" ></span> -->
                        </li>
                    </ul>
                </template>
            </div>
            <p class="jqzs-notice">近20天{{type}}走势</p>
        </template>
        <trend-no-data v-else></trend-no-data>

    </div>
</template>

<script>
import trendNoData from '~components/detail/trendNoData.vue'

export default {
    components: {
        trendNoData
    },
    props: {
        baseInfo: {
            type: Object,
            required: true
        },
        trends: {
            type: Object,
            required: true
        },
        trendTop: {
            type: String,
            required: true
        },
        trendHeight: {
            type: Array,
            required: true
        },
        hoa: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            trendType: {
                great: '极佳',
                good: '佳',
                steady: '平稳',
                bad: '差',
                terrible: '极差'
            },
            trendTypeClass: {
                great: 'zsjj',
                good: 'zsj',
                steady: 'zspw',
                bad: 'zsc',
                terrible: 'zsjc'
            },
            trendFid: null
        }
    },
    computed: {
        noEmptyFlag() {
            return this.trends[this.hoa].coords.slice(0, 15).some((item) => {
                return item.state !== ""
            })
        }
    }
}
</script>

<style lang="css">
    .jqzs-zf .vic-list{height:1.666667rem}
    .jqzs-fc .vic-list{height:1.066667rem;padding-bottom:1.066667rem}
    .time-item li{background:#efefef;color:#aab5bd;height:.613333rem;line-height:.613333rem;padding:0 .2rem;margin-left:.133333rem;text-align:center;border-radius:.306667rem;border:1px solid #dadee4;float:left;box-sizing:border-box}
    .time-item .time-item-cur{color:#242c35;background:#fff;border:1px solid #dadee4}

    .pm-namel{background:#fff;line-height:1.066667rem;padding:.213333rem .4rem 0;color:#333}
    [data-dpr="1"] .pm-namel{font-size:14px}
    [data-dpr="2"] .pm-namel{font-size:28px}
    [data-dpr="3"] .pm-namel{font-size:42px}

    .fx-zr-box .dataBox{border-bottom:0;padding-bottom:0;padding-top:.2rem}
    .vic-cont{position:relative;width:9.2rem;margin:0 auto}
    .vic-list{width:7.466667rem;margin:0 auto;margin-bottom:.266667rem;margin-top:.666667rem}
    .jqzs-zf .vic-list{height:1.666667rem}
    .jqzs-fc .vic-list{height:1.066667rem;padding-bottom:1.066667rem}
    .vic-item-empty{float:left;width:.266667rem;margin-right:.093333rem;position:relative;height:100%}
    .vic-item-empty span{text-align:center;height:100%;border-bottom:1px solid #aab5bd;position:absolute;bottom:0;width:.266667rem;display:inline-block}
    .vic-item-lose span{display:inline-block;width:.266667rem;background:#c6d7e5;height:80%;position:absolute;bottom:1px;left:0}
    .vic-item-win span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f1cac3;height:50%}
    .vic-item-coming span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f0f0f0;height:30%}
    .vic-list .vic-item-win:nth-child(2n) span{height:100%}
    .vic-list .vic-item-lose:nth-child(2n) span{height:20%}
    .vic-list-fc .vic-item-empty{height:100%}
    .vic-list-fc .vic-item-lose span{bottom:inherit;top:0;margin-top:1.066667rem}
    .jqzs-fc .vic-cont .vic-item-win span{height:100%}
    .line-horiz{background:#d25138;height:1px;position:absolute;top:0;width:7.6rem;z-index:90;left:50%;margin-left:-3.8rem}
    .line-horiz em{width:.84rem;height:.4rem;background:#d25138;color:#fff;font-size:.266667rem;line-height:.4rem;text-align:center;position:absolute;right:-.8rem;top:50%;margin-top:-.2rem;display:inline-block}
    .line-ver{height:.666667rem;display:inline-block;width:1px;background:#aab5bd;position:absolute;bottom:0}
    .line-ver i{min-width:2.8rem;height:.8rem;line-height:.333333rem;text-align:left;display:inline-block;position:absolute;left:-.666667rem;top:-.64rem;z-index:90}
    .fczs-cont{overflow:hidden;clear:both;margin-top:.4rem}
    .fczs{width:3.6rem;float:left;height:.933333rem;margin-left:.106667rem;padding-top:.133333rem}
    .fczs-jt{width:.706667rem;height:.426667rem;line-height:.426667rem;background:#5c788f;color:#fff;font-size:.32rem;text-align:right;border-radius:.106667rem;margin-bottom:.133333rem;position:relative;padding-right:.48rem}
    .zsc,.zsj,.zsjc,.zsjj,.zspw{width:.453333rem;height:.426667rem;position:absolute;right:0;top:0}
    .zsjj i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-jj.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem}
    .zsj i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-jj.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem;transform:rotate(45deg);-webkit-transform:rotate(45deg)}
    .zspw i{display:inline-block;width:.293333rem;height:.213333rem;background:url(~assets/style/images/detail/zous-pw.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.106667rem;left:50%;margin-left:-.146667rem}
    .zsc i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-cha.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem;transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}
    .zsjc i{display:inline-block;width:.213333rem;height:.293333rem;background:url(~assets/style/images/detail/zous-cha.png) no-repeat;background-size:cover;position:absolute;top:50%;margin-top:-.146667rem;left:50%;margin-left:-.106667rem}
    .fczs-cont .pm-img{width:1.066667rem;height:1.066667rem}
    .fczs-cont .pm-img img{width:auto;max-width:100%;max-height:100%}
    .fczs-txt{height:.4rem;line-height:.4rem;color:#aab5bd;font-size:.293333rem;margin-top:.053333rem}
    .fczs-notice span{margin:0 .186667rem}
    .fczs-notice span em{display:inline-block}
    .fczs-notice span .point-red{background:#f1cac3;width:.12rem;height:.12rem;margin-right:.106667rem}
    .fczs-notice span .point-blue{background:#c6d7e5;width:.12rem;height:.12rem;margin-right:.106667rem}
    .fczs-notice span .xs{color:#c6d7e5;margin-right:.053333rem}
    .fczs-notice span .zx{color:#d25138;margin-right:.053333rem}
    .jqzs-notice{text-align:center;color:#aab5bd;font-size:.293333rem;padding-bottom:.533333rem}
    .mcjs-list li{width:2.133333rem;height:.853333rem;float:left;background:#ebf1f5;color:#242c35;font-size:.373333rem;line-height:.853333rem;text-align:center;margin:.133333rem .106667rem;border-radius:.133333rem}
    .mcjs-list .cur{background:#5c788f;color:#fff}
    .mcjs-detail p{line-height:.666667rem}
    .pm-img{height:1.066667rem}
    .lq-img, .pm-img, .ps-img {
        width: .6rem;
        position: relative;
        float: left;
    }
    .vic-item-lose span{display:inline-block;width:.266667rem;background:#c6d7e5;height:80%;position:absolute;bottom:1px;left:0}
    .vic-item-win span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f1cac3;height:50%}
    .vic-item-coming span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f0f0f0;height:30%}
    .vic-list .vic-item-win:nth-child(2n) span{height:100%}
    .vic-list .vic-item-lose:nth-child(2n) span{height:20%}
    .vic-list-fc .vic-item-lose span{bottom:inherit;top:0;margin-top:1.066667rem}
    .vic-item-coming span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f0f0f0;height:30%}
    .vic-item-win span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f1cac3;height:50%}
    .vic-item-coming span{display:inline-block;width:.266667rem;position:absolute;bottom:1px;left:0;background:#f0f0f0;height:30%}
    .jqzs-fc .vic-cont .vic-item-win span{height:100%}
    .vic-item-empty{float:left;width:.266667rem;margin-right:.093333rem;position:relative;height:100%}
    .vic-item-empty span{text-align:center;height:100%;border-bottom:1px solid #aab5bd;position:absolute;bottom:0;width:.266667rem;display:inline-block}
    .vic-list-fc .vic-item-empty{height:100%}
    .vic-list-fc .vic-item-lose span {
        bottom: inherit;
        top: 0;
        margin-top: 1.066667rem;
    }
</style>
