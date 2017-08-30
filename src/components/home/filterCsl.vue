<!--足球日期选择器-->
<template>
    <div class="filter-league-wrap">
        <div class="filter-time filter-time-long">
            <div class="prev-day" v-tap="{methods: goPre}"><span></span></div>
            <div class="today" v-tap="{methods: toggleSel}"><span></span>第{{curExpect}}轮</div>
            <div class="next-day" v-tap="{methods: goNext}"><span class="rotate180"></span></div>
        </div>
        <transition name="toggle">
            <!-- 联赛筛选弹窗 -->
            <div class="alert-csl" v-if="showSel">
                <div class="month-tit"><span></span>轮次</div>
                <!-- 杯赛选择 -->
                <div class="cup-info">
                    <ul>
                        <li :class="{cur: expect === curExpect}"  v-tap="{methods: enterExpect, expect: expect}" v-for="expect in expectList">第{{expect}}轮</li>
                    </ul>
                </div>

            </div>
        </transition>
        <transition name="layer">
            <div class="layer" v-if="showSel" v-tap="{methods: toggleSel}"></div>
        </transition>


    </div>


</template>
<script>
    export default {
        props: ['expectList', 'curExpect'],
        data () {
            return {
                showSel: false,
                rExpectList: []
            }
        },
        mounted () {
        },
        methods: {
            toggleSel () {
                this.showSel = !this.showSel
            },
            enterExpect ({expect}) {
                this.showSel = false
                setTimeout(() => {
                    this.$router.replace({
                        name: 'home-zq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: expect
                        }
                    })
                }, 500)
            },
            goPre () {
                const idx = this.expectList.indexOf(this.curExpect)
                if (idx === 0) {
                } else {
                    this.$router.replace({
                        name: 'home-zq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: this.expectList[idx - 1]
                        }
                    })
                }
            },
            goNext () {
                const idx = this.expectList.indexOf(this.curExpect)
                if (idx === this.expectList.length - 1) {
                } else {
                    this.$router.replace({
                        name: 'home-zq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: this.expectList[idx + 1]
                        }
                    })
                }
            }
        },
        filters: {
        }
    }
</script>
<style scoped>
    .filter-league:active, .filter-time .next-day:active, .filter-time .prev-day:active, .filter-time .today:active {
        background: #f4f4f4
    }

    .filter-league-wrap {
        position: relative;
        width: 9.2rem;
        height: 1.066667rem;
    }

    .filter-time {
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        float: left;
        box-sizing: border-box;
    }



    .filter-time-long {
        width: 9.2rem
    }

    .filter-league,.filter-time {
        box-shadow: 0 0 .133333rem rgba(22,34,29,.1)
    }

    .filter-time .prev-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: left
    }

    .filter-time .prev-day span {
        display: inline-block;
        width: .16rem;
        height: .293333rem;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        background: url(~assets/style/images/home/prev.png) no-repeat;
        background-size: cover;
        left: 50%;
        margin-left: -.08rem
    }

    .filter-time .today {
        width: 4.906667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        float: left;
        padding-left: 1.733333rem;
        box-sizing: border-box;
        position: relative
    }

    .filter-time .today span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        left: 1.066667rem;
        background: url(~assets/style/images/home/date.png) no-repeat;
        background-size: cover
    }

    .filter-time-long .today {
        width: 7.2rem;
        padding-left: 2.933333rem
    }

    .filter-time-long .today span {
        left: 2.266667rem
    }

    .filter-time .next-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: right
    }

    .filter-time .next-day span {
        display: inline-block;
        width: .16rem;
        height: .293333rem;
        position: absolute;
        top: 50%;
        margin-top: -.146667rem;
        background: url(~assets/style/images/home/prev.png) no-repeat;
        background-size: cover;
        left: 50%;
        margin-left: -.08rem
    }

    .rotate180 {
        -webkit-animation: all .2s linear;
        animation: all .2s linear;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }





    .alert-csl {
        width: 9.2rem;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        padding: .4rem .4rem .506667rem .4rem;
        box-sizing: border-box;
        border: .013333rem solid #eaeaea;
        border-radius: .106667rem;
        background: #fff;
        z-index: 20
    }

    .alert-csl .cup-info {
        min-height: .88rem
    }

    .month-tit {
        height: .466667rem;
        line-height: .466667rem;
        width: 100%;
        padding-left: .72rem;
        box-sizing: border-box;
        position: relative;
        font-size: .346667rem;
        margin-bottom: .4rem
    }

    .month-tit span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        left: 0;
        background: url(~assets/style/images/home/date.png) no-repeat;
        background-size: cover
    }

    .cup-info {
        width: 8.4rem;
        height: 6.133333rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        margin: 0 auto .3rem;
    }


    .cup-info ul {
        overflow: hidden
    }

    .cup-info ul li {
        width: 2.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        float: left;
        margin-right: .373333rem;
        background: #ebf1f5;
        color: #242c35;
        text-align: center;
        border-radius: .16rem;
        margin-bottom: .266667rem
    }

    .cup-info ul li:nth-child(3n) {
        margin-right: 0;
        float: right
    }

    .cup-info ul .cur {
        background: #5c788f;
        color: #fff
    }

    .select-all {
        width: 8.4rem;
        margin: 0 auto;
        overflow: hidden
    }

    .select-all li {
        padding: .133333rem .266667rem;
        border: 1px solid #eaeaea;
        border-radius: .32rem;
        color: #aab5bd;
        float: left;
        margin-right: .266667rem
    }

    [data-dpr="1"] .select-all li {
        font-size: 11px
    }

    [data-dpr="2"] .select-all li {
        font-size: 22px
    }

    [data-dpr="3"] .select-all li {
        font-size: 33px
    }

    .select-all .cur {
        background: #ebf1f5;
        color: #242c35
    }

    .btn-cont {
        width: 100%;
        border-top: 1px solid #eaeaea;
        font-size: .4rem;
        color: #242c35;
        margin-top: .4rem;
        height: 1.2rem;
        line-height: 1.2rem;
        position: absolute;
        bottom: 0;
        left: 0
    }

    .btn-cont .btn-sure {
        width: 50%;
        box-sizing: border-box;
        text-align: center;
        position: absolute;
        bottom: 0
    }

    .btn-cont .btn-l {
        border-right: 1px solid #eaeaea;
        left: 0
    }

    .btn-cont .btn-r {
        right: 0
    }

    .btn-cont .btn-sure:active {
        background: #f4f4f4
    }

    @keyframes league-open {
        0% {
            width: 9.2rem;
            height: 1.066667rem
        }

        86% {
            width: 9.2rem;
            height: 11.333333rem
        }

        100% {
            width: 9.2rem;
            height: 10rem
        }
    }

    @keyframes league-close {
        0% {
            width: 9.2rem;
            height: 10rem
        }

        30% {
            width: 9.2rem;
            height: 11.333333rem
        }

        60% {
            width: 9.2rem;
            height: 1.066667rem
        }

        100% {
            width: 9.2rem;
            height: 1.066667rem
        }
    }

    .toggle-enter-active {
        animation: league-open .4s 0s 1 cubic-bezier(.5, .25, 0, .75) normal forwards
    }

    .toggle-leave-active {
        animation: league-close .4s 0s 1 ease both
    }

    .toggle-enter-active .cup-info {
        display: none
    }

    .toggle-leave-active .cup-info {
        display: none
    }

    .layer-leave-active {
        transition: transform .4s;
    }

    .layer {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .2);

    }


</style>
