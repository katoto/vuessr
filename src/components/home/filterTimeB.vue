<!--篮球日期选择器-->
<template>
    <div class="filter-time">
        <div class="prev-day" :class="{'no-day': onPre}" v-tap="{methods: goPre}"><span></span></div>
        <div class="today" v-tap="{methods: toggleSel}"><span></span>{{curExpect|curr}}</div>
        <div class="next-day" :class="{'no-day': onNext}" v-tap="{methods: goNext}"><span class="rotate180"></span></div>


        <transition name="c-h-ftb">
            <div class="alert-datetime " v-if="showSel">
                <div class="month-tit"><span></span>{{curExpect.substr(5, 2)}}月</div>
                <div class="week-tit">
                    <ul>
                        <li>{{rExpectList[0]|day}}</li>
                        <li>{{rExpectList[1]|day}}</li>
                        <li>{{rExpectList[2]|day}}</li>
                        <li>{{rExpectList[3]|day}}</li>
                        <li>{{rExpectList[4]|day}}</li>
                        <li>{{rExpectList[5]|day}}</li>
                        <li>{{rExpectList[6]|day}}</li>
                    </ul>
                </div>
                <div class="week-tit weeker-item">
                    <ul v-if="rExpectList">
                        <li v-for="expect in rExpectList" :class="{cur: expect === curExpect}" v-tap="{methods: enterExpect, expect: expect}">{{expect | expectFmt}}</li>
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
    const dayMap = ['日', '一', '二', '三', '四', '五', '六']
    export default {
        props: ['expectList', 'curExpect'],
        data () {
            return {
                showSel: false,
                rExpectList: [],
                onPre: false,
                onNext: false
            }
        },
        mounted () {
            this.initPreAndNext(this.curExpect)
        },
        watch: {
            showSel (showSel) {
                if (showSel) {
                    let rEL = [...this.expectList]
                    rEL.reverse()
                    this.rExpectList = rEL
                }
            },
            curExpect (newData, oldData) {
                this.initPreAndNext(newData)
            }
        },
        methods: {
            toggleSel () {
                this.showSel = !this.showSel
            },
            initPreAndNext (curExpect) {
                const idx = this.expectList.indexOf(curExpect)
                if (idx === this.expectList.length - 1) {
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
                        name: 'home-lq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: expect
                        },
                        query: this.$route.query
                    })
                }, 500)
            },
            goPre () {
                const idx = this.expectList.indexOf(this.curExpect)
                if (idx === this.expectList.length - 1) {
                } else {
                    this.$router.replace({
                        name: 'home-lq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: this.expectList[idx + 1]
                        },
                        query: this.$route.query
                    })
                }
            },
            goNext () {
                const idx = this.expectList.indexOf(this.curExpect)
                if (idx === 0) {
                } else {
                    this.$router.replace({
                        name: 'home-lq-expect',
                        params: {
                            tab: this.$route.params.tab,
                            expect: this.expectList[idx - 1]
                        },
                        query: this.$route.query
                    })
                }
            }
        },
        filters: {
            day: (expect) => {
                const date = new Date(expect.split('-').join('/'))
                return dayMap[date.getDay()]
            },
            curr: (expect) => {
                const date = new Date(expect.split('-').join('/'))
                const current = new Date()
                if (current.getDate() === date.getDate() && current.getMonth() === date.getMonth() && current.getFullYear() === date.getFullYear()) {
                    return `今日 周${dayMap[current.getDay()]}`
                } else {
                    const tmp = expect.split('-')
                    return `${[tmp[1], tmp[2]].join('-')} 周${dayMap[date.getDay()]}`
                }
            },
            expectFmt: (expect) => {
                const date = new Date(expect.split('-').join('/'))
                const current = new Date()
                if (current.getDate() === date.getDate() && current.getMonth() === date.getMonth() && current.getFullYear() === date.getFullYear()) {
                    return '今'
                } else {
                    return expect.substr(8)
                }
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
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        /*float: left;*/
        box-sizing: border-box;
        position: relative;
    }
    .filter-time .no-day{opacity: 0.3}
    [data-dpr="1"] .filter-time {
        line-height: 40px
    }

    [data-dpr="2"] .filter-time {
        line-height: 80px
    }

    [data-dpr="3"] .filter-time {
        line-height: 120px
    }

    .filter-league, .filter-time {
        box-shadow: 0 0 .133333rem rgba(22, 34, 29, .1)
    }

    .filter-time .prev-day {
        width: .96rem;
        height: 1.066667rem;
        position: relative;
        float: left
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

    .alert-datetime {
        width: 9.2rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: .4rem .4rem .506667rem .4rem;
        box-sizing: border-box;
        border-radius: .106667rem;
        background: #fff;
        z-index: 11
    }

    [data-dpr="1"] .alert-datetime {
        border: .5px solid #eaeaea
    }

    [data-dpr="2"] .alert-datetime {
        border: 1px solid #eaeaea
    }

    [data-dpr="3"] .alert-datetime {
        border: 1.5px solid #eaeaea
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

    .week-tit {
        height: .72rem;
        line-height: .72rem;
        font-size: .32rem;
        color: #aab5bd
    }

    .week-tit ul {
        overflow: hidden;
        clear: both
    }

    .week-tit ul li {
        float: left;
        width: .88rem;
        text-align: center;
        margin-right: .293333rem
    }

    .week-tit ul li:last-child {
        margin-right: 0
    }

    .weeker-item {
        height: auto;
        font-size: .346667rem;
        color: #242c35
    }

    .weeker-item ul {
        overflow: hidden;
        clear: both
    }

    .weeker-item ul li {
        height: .88rem;
        line-height: .88rem;
        margin-top: .133333rem
    }

    .weeker-item ul .cur {
        background: #d25138;
        border-radius: 50%;
        color: #fff
    }


    .c-h-ftb-enter-active .week-tit {
        display: none
    }

    .c-h-ftb-leave-active .week-tit {
        display: none
    }

    .layer-leave-active {
        transition: transform .8s;
    }
</style>
