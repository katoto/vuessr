<template>
    <div class="filter-time">
        <div class="prev-day" :class="{'no-day': onPre}" v-tap="{methods: goPre}"><span></span></div>
        <div class="today" v-tap="{methods: toggleSel}"><span></span>{{curExpect}}期</div>
        <div class="next-day" :class="{'no-day': onNext}" v-tap="{methods: goNext}"><span class="rotate180"></span></div>


        <transition name="c-h-es">
            <div class="alert-csl " v-if="showSel">
                <div class="month-tit"><span></span>{{curExpect}}期</div>

                <div class="cup-info">
                    <ul v-if="expectListR">
                        <li v-for="expect in expectListR" :class="{cur: expect === curExpect}" v-tap="{methods: enterExpect, expect: expect}">{{expect}}期</li>
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
                onPre: false,
                onNext: false
            }
        },
        computed: {
            expectListR () { // 逆序expectListR
                return [...this.expectList].reverse()
            }
        },
        mounted () {
            this.initPreAndNext(this.curExpect)
        },
        methods: {
            toggleSel () {
                this.showSel = !this.showSel
            },
            initPreAndNext (curExpect) {
                const idx = this.expectList.indexOf(curExpect)
                if (idx === this.expectList.length - 1) { // expectList是反的所以这么写
                    this.onPre = true
                } else {
                    this.onPre = false
                }
                if (idx === 0) {
                    this.onNext = true
                } else {
                    this.onNext = false
                }
            },
            enterExpect ({expect}) {
                this.showSel = false
                setTimeout(() => {
                    this.$router.replace({
                        name: 'home-zq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: expect
                        },
                        query: this.$route.query
                    })
                }, 500)
            },
            goPre () {
                const idx = this.expectListR.indexOf(this.curExpect)
                if (idx === 0) {
                } else {
                    this.$router.replace({
                        name: 'home-zq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: this.expectListR[idx - 1]
                        },
                        query: this.$route.query
                    })
                }
            },
            goNext () {
                const idx = this.expectListR.indexOf(this.curExpect)
                if (idx === this.expectListR.length - 1) {
                } else {
                    this.$router.replace({
                        name: 'home-zq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: this.expectListR[idx + 1]
                        },
                        query: this.$route.query
                    })
                }
            }
        },
        watch: {
            curExpect (newData, oldData) {
                this.initPreAndNext(newData)
            }
        }
    }
</script>
<style scoped>
    .layer {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .2);

    }

    .filter-time {
        width: 6.88rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        float: left;
        box-sizing: border-box
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
        width: 4.8rem;
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



    .filter-time .next-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: right;
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

    .filter-time .no-day {
        opacity: .3
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
        margin-right: .378rem;
        background: #ebf1f5;
        color: #242c35;
        text-align: center;
        border-radius: .1067rem;
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

    .filter-time .next-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: right
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

    .filter-league:active, .filter-time .next-day:active, .filter-time .prev-day:active, .filter-time .today:active {
        background: #f4f4f4
    }

    /*----------------------------*/

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

    

    .c-h-es-enter-active .cup-info {
        display: none
    }

    .c-h-es-leave-active .cup-info {
        display: none
    }

    .layer-leave-active {
        transition: transform .8s;
    }

</style>
