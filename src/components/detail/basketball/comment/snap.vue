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

<style lang="css">
</style>
