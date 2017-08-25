<template>
    <div class="wrap">
        <template v-if="type === 'zq'">
            <div class="fen-bf" :class="{'fen-bf-active': homeChange}">
                <span class="score">{{oldHomescore}}</span>
                <span class="score">{{homescore}}</span>
            </div>
            <div class="fen-ld">:</div>
            <div class="fen-bf" :class="{'fen-bf-active': awayChange}">
                <span class="score">{{oldAwayscore}}</span>
                <span class="score">{{awayscore}}</span>
            </div>
        </template>
        <template v-if="type === 'lq'">
            <div class="fen-bf-lq" :class="{'fen-bf-lq-active': awayChange}">
                <span class="score">{{oldAwayscore}}</span>
                <span class="score">{{awayscore}}</span>
            </div>
            <div class="fen-ld">:</div>
            <div class="fen-bf-lq" :class="{'fen-bf-lq-active': homeChange}">
                <span class="score">{{oldHomescore}}</span>
                <span class="score">{{homescore}}</span>
            </div>
        </template>

    </div>
</template>
<script>
    export default {
        props: ['homescore', 'ready', 'awayscore', 'type'],
        data () {
            return {
                homeChange: false,
                awayChange: false,
                oldHomescore: 0,
                oldAwayscore: 0
            }
        },
        mounted () {
            this.oldHomescore = this.homescore
            this.oldAwayscore = this.awayscore
        },
        watch: {
            homescore () {
                if (this.ready) {
                    this.homeChange = true
                    setTimeout(() => {
                        this.homeChange = false
                        this.oldHomescore = this.homescore
                    }, 2000)
                } else {
                    this.oldHomescore = this.homescore
                }
            },
            awayscore () {
                if (this.ready) {
                    this.awayChange = true
                    setTimeout(() => {
                        this.awayChange = false
                        this.oldAwayscore = this.awayscore
                    }, 2000)
                } else {
                    this.oldAwayscore = this.awayscore
                }
            }
        }

    }
</script>
<style scoped>
    .wrap {
        display: inline-block;
        will-change:transform ;
        /*transform: translateZ(0);*/

        overflow: hidden;
    }
    .fen-bf, .fen-bf-lq, .fen-ld {
        height: .96rem;
        line-height: 1rem;
        color: #fff;
        display: inline-block;
    }
    .fen-bf, .fen-bf-lq {
        background: rgba(255, 255, 255, .06);
        font-size: 0.667rem;
        font-family: Arial;
        border-radius: .053333rem;
        position: relative;
        overflow: hidden
    }

    .fen-bf-lq {
        width: 1.1rem;
    }
    .fen-bf {
        width: 0.9333rem;
    }
    .fen-ld {
        width: .626667rem;
        font-size: 0.8rem;
        overflow: hidden;
        line-height: .82rem;
        position: relative;
        vertical-align: top
    }
    .fen-bf .score:last-child {
        transform: translate(-50%, 100%)
    }
    .fen-bf-active .score {
        animation: changeScore 1s ease-in-out forwards
    }
    .fen-bf-active .score:last-child {
        animation: changeScore2 10s ease-in-out forwards
    }
    @keyframes changeScore {
        0% {
            transform: translate(-50%, 0)
        }
        100% {
            transform: translate(-50%, -100%)
        }
    }
    @keyframes changeScore2 {
        0% {
            color: #fff;
            transform: translate(-50%, 100%)
        }
        10% {
            color: #1ac843;
            transform: translate(-50%, 0)
        }
        90% {
            color: #1ac843;
            transform: translate(-50%, 0)
        }
        100% {
            color: #fff;
            transform: translate(-50%, 0)
        }
    }
    .fen-bf-lq {
        position: relative;
        min-width: .933333rem;
        overflow: hidden;
    }
    .fen-bf .score{position:absolute;left:50%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}

    .fen-bf-lq .score {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0)
    }
    .fen-bf-lq .score:last-child {
        transform: translate(-50%, 100%)
    }
    .fen-bf-lq.fen-bf-active .score {
        animation: changeScore 1s ease-in-out forwards
    }
    .fen-bf-lq.fen-bf-active .score:last-child {
        animation: changeScore3 3s ease-in-out forwards
    }
    @keyframes changeScore3 {
        0% {
            color: #fff;
            transform: translate(-50%, 100%)
        }
        30% {
            color: #ffba00;
            transform: translate(-50%, 0)
        }
        50% {
            color: #ffba00;
            transform: translate(-50%, 0)
        }
        80% {
            color: #ffba00;
            transform: translate(-50%, 0)
        }
        100% {
            color: #fff;
            transform: translate(-50%, 0)
        }
    }


</style>
