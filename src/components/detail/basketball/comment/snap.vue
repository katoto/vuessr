<template>
    <div class="swiper-container swiper-container-horizontal swiper-container-coverflow">
    	<div class="new-comm-info swiper-wrapper">
    		<div class="com-slide-box swiper-slide swiper-slide-next" style="">
                <h1 class="com-slide-tit">{{(baseInfo.status === '11' ||
                    vote.voted=='1')?(vote.ticket[0]+vote.ticket[1]+vote.ticket[2])+'人已投票':'本场比赛看好哪队获胜?'}}
                </h1>
                <div class="comm-slide-cont comm-base-cont" v-if="vote.voted === '0' && baseInfo.status !== '11'">
                    <ul>
                        <li v-tap="{methods: onVote, opt: '3', idx: 0}">
                            <div class="support-icon"></div>
                            <div class="support-name">{{baseInfo.homesxname}}</div>
                        </li>
                        <li v-tap="{methods: onVote, opt: '0', idx: 2}">
                            <div class="support-icon"></div>
                            <div class="support-name">{{baseInfo.awaysxname}}</div>
                        </li>
                    </ul>
                </div>
    			<div class="touph-box base-box" v-if="vote.voted==='1'||(baseInfo.status === '11')">
                    <div class="data-line">
                        <ul>
                            <li :style="{width: voteResult.winW+'%'}"
                                :class="{'data-hight':vote.myoption==='3'}"></li>
                            <li :style="{width: voteResult.lostW+'%'}"
                                :class="{'data-hight':vote.myoption==='0'}"></li>
                        </ul>
                    </div>
                    <div class="data-detail">
                        <ul>
                            <li>
                                <p>{{voteResult.winPer}}%</p>
                                <p>{{baseInfo.homesxname}}</p>
                            </li>
                            <li>
                                <p>{{voteResult.lostPer}}%</p>
                                <p>{{baseInfo.awaysxname}}</p>
                            </li>
                        </ul>
                    </div>
    			</div>
    			<div class="swiper-slide-shadow-left" style="opacity:0;transition-duration:0ms">
    			</div>
    			<div class="swiper-slide-shadow-right" style="opacity:1;transition-duration:0ms">
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script>
import {aTypes} from '~store/lqdetail'
export default {
    props: ['baseInfo', 'online', 'vote'],
    computed: {
        voteResult () {
            if (this.vote && this.vote.ticket) {
                let result = {
                    winPer: 0,
                    lostPer: 0,
                    winW: 0,
                    lostW: 0
                }
                let totalVote = (this.vote.ticket[0] - 0) + (this.vote.ticket[2] - 0) + (this.vote.ticket[1] - 0)
                if (totalVote) {
                    result.winPer = (this.vote.ticket[0] / totalVote * 100).toFixed(0)
                    result.lostPer = (this.vote.ticket[2] / totalVote * 100).toFixed(0)
                    result.winW = result.winPer
                    result.lostW = result.lostPer
                    if(result.winW === '100') {
                        result.winW = '97'
                        result.lostW = '3'
                    }
                    if(result.lostW === '100') {
                        result.winW = '3'
                        result.lostW = '97'
                    }
                } else {
                    result.winPer = 0
                    result.lostPer = 0
                    result.winW = 50
                    result.lostW = 50
                }
                return result
            }
            return {}
        }
    },
    methods: {
        /**
         * 投票接口， 投完后立马获取投票数
         * @param opt
         * @param idx
         * @returns {Promise.<void>}
         */
        async onVote ({opt, idx}) {
            if (this.baseInfo.status === '11') {
                return
            }
            this.$store.dispatch('ensureLogin')
            await this.$store.dispatch(aTypes.onVote, {
                opt, id: this.vote._id, fid: this.$route.params.fid
            })
            await this.$store.dispatch(aTypes.getVote, {fid: this.$route.params.fid})
        }
    }
}
</script>

<style scoped>
    .swiper-container {
        width: 10rem;
        border: none
    }
    .swiper-slide {
        width: 9.2rem
    }
    .com-slide-box {
        width: 9.2rem;
        height: 2.906667rem;
        border-radius: .16rem;
        background: #fff;
        margin: 0 auto;
        padding-top: .28rem;
        box-sizing: border-box
    }
    .swiper-slide {
        width: 9.2rem
    }
    .com-slide-tit {
        color: #515e6d;
        width: 100%;
        text-align: center
    }

    [data-dpr="1"] .com-slide-tit {
        font-size: 14px
    }

    [data-dpr="2"] .com-slide-tit {
        font-size: 28px
    }

    [data-dpr="3"] .com-slide-tit {
        font-size: 42px
    }

    .com-slide-tit em {
        font-size: .48rem;
        color: #309b56;
        height: .48rem;
        display: inline-block;
        overflow: hidden;
        margin: 0 .093333rem
    }

    .com-slide-tit em span {
        display: inline-block
    }

    .com-slide-tit em i {
        display: block;
        white-space: nowrap
    }
    .comm-slide-cont {
        padding-top: .35rem
    }

    .comm-slide-cont ul {
        overflow: hidden;
        clear: both;
        width: 8.16rem;
        margin: 0 auto
    }

    .comm-slide-cont ul li {
        float: left;
        width: 2.72rem
    }
    .support-icon {
        width: .586667rem;
        height: .586667rem;
        border: .053333rem solid #aab5bd;
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 auto
    }

    .support-iconer {
        background: #aab5bd
    }

    .support-name {
        width: 100%;
        text-align: center;
        color: #515e6d;
        font-size: .373333rem;
        margin-top: .17rem
    }


    .new-comm-info {
        padding-top: .266667rem
    }
    .zhud-jq {
        padding-left: .533333rem;
        font-size: .32rem;
        color: #515e6d
    }
    .jiaoq-qz img {
        width: .16rem;
        height: .226667rem
    }

    .ked-jq {
        padding-right: .533333rem;
        text-align: right;
        height: .32rem;
        line-height: .32rem
    }

    .ked-jq .jiaoq-qz {
        margin-right: .133333rem
    }
    .comm-sk {
        width: 8.133333rem;
        margin: 0 auto;
        height: .933333rem;
        position: relative
    }
    .zud-sk-icon {
        width: 8.133333rem;
        height: .38rem;
        position: relative
    }



    .data-line{width:8.133333rem;height:.853333rem;margin:0 auto;position:relative}
    .data-line ul{overflow:hidden;clear:both;height:.16rem;width:100%;position:absolute;left:0;top:50%;margin-top:-.08rem}
    .data-line ul li{height:.16rem;float:left;box-sizing:border-box;background:#bcd0de}
    .data-line ul li:nth-child(1){width:22%;border-right:.053333rem solid #fff}
    .data-line ul li:nth-child(2){width:58%}
    .data-line ul li:nth-child(3){width:20%;border-left:.053333rem solid #fff}
    .base-box .data-line ul li{height:.16rem;float:left;box-sizing:border-box;background:#bcd0de}
    .base-box .data-line ul li:nth-child(1){width:78%;border-right:.053333rem solid #fff}
    .base-box .data-line ul li:nth-child(2){width:22%}
    .base-box .data-line ul .data-hight,.data-line ul .data-hight{background:#5c788f}
    .data-detail{width:8.133333rem;margin:0 auto}
    .data-detail ul{overflow:hidden;clear:both;zoom:1}
    .data-detail ul li{float:left;width:33.3%;box-sizing:border-box}
    .data-detail ul li:nth-child(1){text-align:left}
    .data-detail ul li:nth-child(2){text-align:center}
    .data-detail ul li:nth-child(3){text-align:right}
    .base-box .data-detail ul li{float:left;width:50%;box-sizing:border-box}
    .base-box .data-detail ul li:nth-child(1){text-align:left}
    .base-box .data-detail ul li:nth-child(2){text-align:right}
    .data-detail ul li p:nth-child(1){color:#515e6d;font-size:.4rem}
    .data-detail ul li p:nth-child(2){font-size:.32rem;color:rgba(81,94,109,.5)}

    .comm-base-cont ul li:nth-child(2) {
        float: right;
    }
    .comm-base-cont ul li {
        width: 50%;
    }
    .comm-base-cont ul li:nth-child(1) {
        float: left;
    }
    .comm-base-cont ul li {
        width: 50%;
    }
</style>
