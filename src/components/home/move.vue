<template>
    <em class="second-half">
        <em class="score-itm" :class="{'itmMove': change}">
            <i>{{old}}</i>
            <i>{{score}}</i>
        </em>
    </em>

</template>
<script>
    export default {
        props: ['ready', 'score'],
        data () {
            return {
                old: 0,
                change: false
            }
        },
        mounted () {
            this.old = this.score
        },
        watch: {
            score () {
                if (this.ready) {
                    this.change = true
                    setTimeout(() => {
                        this.change = false
                        this.old = this.score
                    }, 2000)
                } else {
                    this.old = this.score
                }
            }
        }

    }
</script>
<style scoped>
    i {
        display: block;
        white-space: nowrap
    }
    .score-itm {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%;
        text-align: right
    }

    .second-half {
        color: #36a171;
        display: inline-block;
        height: .64rem;
        line-height: .64rem;
        width: 1rem;
        text-align: right;

        font-size: .453333rem;
        overflow: hidden
    }

    [data-dpr="1"] .second-half {
        font-size: 17px
    }

    [data-dpr="2"] .second-half {
        font-size: 34px
    }

    [data-dpr="3"] .second-half {
        font-size: 51px
    }


    .itmMove {
        -webkit-animation: itmMove4 .8s ease-in-out forwards;
        animation: itmMove4 .8s ease-in-out forwards
    }

    .itmMove i:last-child {
        -webkit-animation: itmMove3 2s ease-in-out forwards;
        animation: itmMove3 2s ease-in-out forwards
    }

    @-webkit-keyframes itmMove4 {
        0% {
            -webkit-transform: translate(0,0);
            transform: translate(0,0)
        }

        100% {
            -webkit-transform: translate(0,-50%);
            transform: translate(0,-50%)
        }
    }

    @keyframes itmMove4 {
        0% {
            -webkit-transform: translate(0,0);
            transform: translate(0,0)
        }

        100% {
            -webkit-transform: translate(0,-50%);
            transform: translate(0,-50%)
        }
    }

    @-webkit-keyframes itmMove3 {
        0% {
            color: #309b56
        }

        30% {
            color: #27e1e1
        }

        50% {
            color: #27e1e1
        }

        80% {
            color: #27e1e1
        }

        100% {
            color: #309b56
        }
    }

    @keyframes itmMove3 {
        0% {
            color: #309b56
        }

        30% {
            color: #27e1e1
        }

        50% {
            color: #27e1e1
        }

        80% {
            color: #27e1e1
        }

        100% {
            color: #309b56
        }
    }

</style>
