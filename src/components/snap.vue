<template>
    <div style="height: 3.186667rem;margin-top: .26rem;overflow: hidden;" class="snap-container">
        <div class="l-box-vertical-center-justify snap-content" style="height: 100%; "
             :style="{width: (statistic&&eventlist&&(match.status=='1'||match.status=='2'||match.status=='3'||match.status=='4'))?'19.4rem':'auto'}">


            <div v-if="statistic&&eventlist&&(match.status=='1'||match.status=='2'||match.status=='3'||match.status=='4')"
                 class="com-slide-box swiper-slide swiper-slide-active" style="display: block;margin-left: .4rem">
                <h1 class="com-slide-tit" v-if="!(match.status=='4'&&online=='0')">
                    {{match.status=='4'?'共':'与'}}<em><span
                        class="score-itm"><i>{{online}}</i><i>{{online}}</i></span></em>{{match.status=='4'?'人看了这场比赛！':'人一起观看比赛！'}}
                </h1>
                <h1 class="com-slide-tit" v-if="match.status=='4'&&online=='0'">有球有朋友，红单大家有</h1>

                <div class="zhud-jq">
                    主
                    <span class="jiaoq-qz">
                            <img src="http://live.m.500.com/mobile/touch/images/bifen/v126/jiaoq.png" alt="角球图标">
                            <em>{{statistic.h_corner_count}}</em>
                        </span>
                </div>

                <!--动态赛况详情-->
                <div class="comm-sk">
                    <!--主队赛况图标-->
                    <div class="zud-sk-icon">
                        <span v-for="e in eventlist" v-if="e.is_team === 1" :class="classHas[e.eventtype]"
                              :style="{'left': e.timing_point<91?((e.timing_point/9) * 10 + '%'):0}"></span>
                    </div>
                    <div class="ked-bg">
                        <!--这里分为3层，0层淡蓝色背景，1层深蓝色背景，2层刻度层-->
                        <div class="deep-blue" :style="{width: progWidth}"></div>
                        <div class="keg-img"></div>
                    </div>
                    <!--客队赛况图标-->
                    <div class="ked-sk-icon">
                        <span v-for="e in eventlist" v-if="e.is_team === 0" :class="classHas[e.eventtype]"
                              :style="{'left': e.timing_point<91?((e.timing_point/9) * 10 + '%'):0}"></span>
                    </div>
                </div>

                <!--客队角球-->
                <div class="zhud-jq ked-jq">
                        <span class="jiaoq-qz">
                            <img src="http://live.m.500.com/mobile/touch/images/bifen/v126/jiaoq.png" alt="角球图标">
                            <em>{{statistic.a_corner_count}}</em>
                        </span>
                    客
                </div>
                <div class="swiper-slide-shadow-left"></div>
                <div class="swiper-slide-shadow-right"></div>
            </div>
            <!--投票模块-->
            <div class="com-slide-box swiper-slide swiper-slide-next" style=";margin-right: .4rem">


                <h1 class="com-slide-tit">{{(match.status === '4' ||
                    vote.voted=='1')?(vote.ticket[0]+vote.ticket[1]+vote.ticket[2])+'人已投票':'本场比赛看好哪队获胜?'}}</h1>


                <div class="comm-slide-cont" v-if="vote.voted==='0'&&match.status !== '4'">
                    <ul>
                        <li drunk-on="click:onVote('3',0)">
                            <div class="support-icon"></div>
                            <div class="support-name">{{match.homesxname}}</div>
                        </li>
                        <li drunk-on="click:onVote('1',1)">
                            <div class="support-icon"></div>
                            <div class="support-name">平局</div>
                        </li>
                        <li drunk-on="click:onVote('0',2)">
                            <div class="support-icon"></div>
                            <div class="support-name">{{match.awaysxname}}</div>
                        </li>
                    </ul>
                </div>

                <div class="touph-box" v-if="vote.voted==='1'||(match.status === '4')">
                    <!--数据条-->
                    <div class="data-line">
                        <ul>
                            <li :style="{width: tzbl.winW+'%'}"
                                :class="{'data-hight':vote.myoption==='3'}"></li>
                            <li :style="{width: tzbl.drawW+'%'}"
                                :class="{'data-hight':vote.myoption==='1'}"></li>
                            <li :style="{width: tzbl.lostW+'%'}"
                                :class="{'data-hight':vote.myoption==='0'}"></li>
                        </ul>
                    </div>
                    <!--数据统计-->
                    <div class="data-detail">
                        <ul>
                            <li>
                                <p>{{tzbl.winPer}}%</p>
                                <p>{{match.homesxname}}</p>
                            </li>
                            <li>
                                <p>{{tzbl.drawPer}}%</p>
                                <p>平局</p>
                            </li>
                            <li>
                                <p>{{tzbl.lostPer}}%</p>
                                <p>{{match.awaysxname}}</p>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
    import {Scroller} from 'scroller'

    export default {
        props: ['eventlist', 'statistic', 'match', 'online', 'vote'],
        data () {
            return {
                classHas: {
                    '1': 'jinq-icon',
                    '2': 'wul-icon',
                    '3': 'dianq-icon',
                    '4': 'huangp-icon',
                    '5': 'hongp-icon ',
                    '6': 'lianghbh-icon',
                    '7': 'jinqwx-icon',
                    '8': 'jiaoh-icon',
                    '9': '',
                    '10': ''
                }
            }
        },
        mounted () {
            this.container = this.$el
            this.content = this.$el.querySelector('.snap-content')
            const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
            this.scrollerObj = new Scroller((left, top, zoom) => {
                this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
            }, {
                bouncing: false,
                scrollingX: true,
                Locking: false,
                scrollingY: false,
                snapping: true,
                animationDuration: 150
            })
            this.scrollerObj.setSnapSize(this.container.offsetWidth)
            this.scrollerObj.setDimensions(this.container.offsetWidth, this.container.offsetHeight, this.content.offsetWidth, this.content.offsetHeight)
            let latestX = 0
            let latesY = 0
            let needLockY = false
            this.container.addEventListener('touchstart', (e) => {
                latestX = e.touches[0].pageX
                latesY = e.touches[0].pageY
                this.scrollerObj.doTouchStart(e.touches, e.timeStamp)
                e.preventDefault()
            }, false)
            this.container.addEventListener('touchmove', (e) => {
                if (Math.abs(latestX - e.touches[0].pageX) > Math.abs(latesY - e.touches[0].pageY)) {
                    needLockY = true
                }
                latestX = e.touches[0].pageX
                latesY = e.touches[0].pageY

                needLockY && e.stopPropagation()
                this.scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
            }, false)

            this.container.addEventListener('touchend', (e) => {
                needLockY = false
                this.scrollerObj.doTouchEnd(e.timeStamp)
            }, false)

            this.container.addEventListener('touchcancel', (e) => {
                this.scrollerObj.doTouchEnd(e.timeStamp)
            }, false)
        },
        computed: {
            progWidth () {
                if (this.match.status === '4') {
                    return '100%'
                }
                if (this.match.status === '2') {
                    return '50%'
                }
                if (this.match.status === '1' || this.match.status === '3') {
                    let minute = Math.ceil(Number(this.match.match_at) / 60)
                    if (this.match.status === '1' && minute > 44) {
                        minute = 45
                    }
                    if (this.match.status === '3') {
                        minute = minute + 45
                    }
                    return (minute / 90) * 100 + '%'
                } else {
                    return '1%'
                }
            },
            tzbl () {
                if (this.vote && this.vote.ticket) {
                    let result = {
                        winPer: 0,
                        drawPer: 0,
                        lostPer: 0,
                        winW: 0,
                        drawW: 0,
                        lostW: 0
                    }
                    let totalVote = (this.vote.ticket[0] - 0) + (this.vote.ticket[2] - 0) + (this.vote.ticket[1] - 0)
                    if (totalVote) {
                        result.winPer = (this.vote.ticket[0] / totalVote * 100).toFixed(0)
                        result.drawPer = (this.vote.ticket[1] / totalVote * 100).toFixed(0)
                        result.lostPer = 100 - result.winPer - result.drawPer

                        result.winW = result.winPer
                        result.drawW = result.drawPer
                        result.lostW = result.lostPer

                        if (this.vote.ticket[0] === 0) {
                            result.winW = 3
                        }
                        if (this.vote.ticket[1] === 0) {
                            result.drawW = 3
                        }
                        if (this.vote.ticket[2] === 0) {
                            result.lostW = 3
                        }

                        if (this.vote.ticket[0] === 0 && this.vote.ticket[1] === 0) {
                            result.winW = 3
                            result.drawW = 3
                            result.lostW = 94
                        }
                        if (this.vote.ticket[0] === 0 && this.vote.ticket[2] === 0) {
                            result.winW = 3
                            result.drawW = 94
                            result.lostW = 3
                        }
                        if (this.vote.ticket[1] === 0 && this.vote.ticket[2] === 0) {
                            result.winW = 94
                            result.drawW = 3
                            result.lostW = 3
                        }

                        if (this.vote.ticket[0] === 0 && this.vote.ticket[1] !== 0 && this.vote.ticket[2] !== 0) {
                            result.winW = 3
                            result.drawW = 97 - parseInt(result.lostW)
                        }
                        if (this.vote.ticket[1] === 0 && this.vote.ticket[0] !== 0 && this.vote.ticket[2] !== 0) {
                            result.drawW = 3
                            result.winW = 97 - parseInt(result.lostW)
                        }
                        if (this.vote.ticket[2] === 0 && this.vote.ticket[0] !== 0 && this.vote.ticket[1] !== 0) {
                            result.lostW = 3
                            result.winW = 97 - parseInt(result.drawW)
                        }
                    } else {
                        result.winPer = 0
                        result.drawPer = 0
                        result.lostPer = 0
                        result.winW = 33
                        result.drawW = 33
                        result.lostW = 33
                    }
                    return result
                }
                return {}
            }
        }
    }
</script>
