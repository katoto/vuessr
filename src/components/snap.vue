<template>
    <div style="height: 3.186667rem;margin-top: .26rem;overflow: hidden;" class="snap-container">
        <div class="l-box-vertical-center-justify snap-content" style="height: 100%; width: 19.4rem; ">
            <div class="com-slide-box swiper-slide swiper-slide-active" style="display: block;margin-left: .4rem">
                <h1 class="com-slide-tit">共<em><span
                    class="score-itm"><i>81288</i><i>81288</i></span></em>人看了这场比赛！</h1>
                <div class="zhud-jq">
                    主
                    <span class="jiaoq-qz">
                            <img src="http://live.m.500.com/mobile/touch/images/bifen/v126/jiaoq.png" alt="角球图标">
                            <em>6</em>
                        </span>
                </div>

                <div class="comm-sk">

                    <div class="zud-sk-icon">
                       <span class="jinq-icon"
                                                                                               style="left: 100%;"></span>
                        <span></span><span
                            class="jiaoh-icon" style="left: 94.4444%;"></span>
                       <span></span><span
                            class="jiaoh-icon" style="left: 86.6667%;"></span>
                        <span class="jiaoh-icon" style="left: 85.5556%;"></span>
                        <span class="huangp-icon" style="left: 82.2222%;"></span>
                        <span></span>
                        <span></span>
                        <span></span>
                     <span></span>
                    </div>
                    <div class="ked-bg">

                        <div class="deep-blue" style="width: 100%;"></div>
                        <div class="keg-img"></div>
                    </div>
                    <!--客队赛况图标-->
                    <div class="ked-sk-icon">
                        <!--<repeat>: e in eventlist--><!--[repeat-item]e in eventlist--><span></span>
                        <!--[repeat-item]e in eventlist--><span class="jiaoh-icon" style="left: 100%;"></span>
                        <!--[repeat-item]e in eventlist--><span></span><!--[repeat-item]e in eventlist--><span
                            class="jiaoh-icon" style="left: 93.3333%;"></span>
                        <!--[repeat-item]e in eventlist--><span></span>
                        <!--[repeat-item]e in eventlist--><span></span>
                        <!--[repeat-item]e in eventlist--><span></span><!--[repeat-item]e in eventlist--><span
                            class="huangp-icon" style="left: 81.1111%;"></span>
                        <!--[repeat-item]e in eventlist--><span class="jinq-icon" style="left: 56.6667%;"></span>
                        <!--[repeat-item]e in eventlist--><span class="huangp-icon" style="left: 50%;"></span>
                        <!--[repeat-item]e in eventlist--><span class="huangp-icon" style="left: 50%;"></span>
                        <!--</repeat>: e in eventlist-->
                    </div>
                </div>
                <!--客队角球-->
                <div class="zhud-jq ked-jq">
                        <span class="jiaoq-qz">
                            <img src="http://live.m.500.com/mobile/touch/images/bifen/v126/jiaoq.png" alt="角球图标">
                            <em>8</em>
                        </span>
                    客
                </div>
                <div class="swiper-slide-shadow-left"></div>
                <div class="swiper-slide-shadow-right"></div>
            </div>
            <!--投票模块-->
            <div class="com-slide-box swiper-slide swiper-slide-next" style=";margin-right: .4rem">
                <h1 class="com-slide-tit">103人已投票</h1>

                <!--<if: vote.voted=='0'&&!isMatchFinsh />-->
                <!--<if: vote.voted=='1'||isMatchFinsh />-->
                <div class="touph-box">
                    <!--数据条-->
                    <div class="data-line">
                        <ul>
                            <li style="width:27%"></li>
                            <!--<if: type=='1' />-->
                            <li style="width:31%"></li>
                            <li style="width:42%"></li>
                        </ul>
                    </div>
                    <!--数据统计-->
                    <div class="data-detail">
                        <ul>
                            <li>
                                <p>27%</p>
                                <p>额尔齐</p>
                            </li>
                            <!--<if: type=='1' />-->
                            <li>
                                <p>31%</p>
                                <p>平局</p>
                            </li>
                            <li>
                                <p>42%</p>
                                <p>红 星</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="swiper-slide-shadow-left" style="opacity: 0; transition-duration: 0ms;"></div>
                <div class="swiper-slide-shadow-right" style="opacity: 1; transition-duration: 0ms;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Scroller} from 'scroller'

    export default {
        mounted () {
            this.container = this.$el
            this.content = this.$el.querySelector('.snap-content')
            const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
            this.scrollerObj = new Scroller((left, top, zoom) => {
                this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
            }, {
                bouncing: true,
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
        }
    }
</script>
