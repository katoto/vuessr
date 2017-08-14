<template>
    <div class="item-tab">
        <ul>
            <li class="cur" onclick="window.location.href='index.html'">竞彩</li>
            <li>全部</li>
            <li>猜球</li>
            <li>热门</li>
            <li onclick="window.location.href='zq-mark.html'">指数</li>
            <li>关注</li>
            <li>足球</li>
            <li>篮球</li>
        </ul>
    </div>
</template>
<script>
    import {Scroller} from 'scroller'
    export default {
        mounted () {
            this.config()
        },
        methods: {
            config () {
                this.content = this.$el.children[0]
                let liw = this.$el.querySelector('li').offsetWidth
                const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
                this.scrollerObj = new Scroller((left, top, zoom) => {
                    this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
                }, {
                    bouncing: true,
                    snapping: true,
                    scrollingX: true,
                    scrollingY: false
                })
                this.scrollerObj.setSnapSize(liw)
                this.scrollerObj.setDimensions(this.$el.offsetWidth, this.$el.offsetHeight, this.content.offsetWidth, this.content.offsetHeight)
                this.$el.addEventListener('touchstart', (e) => {
                    this.scrollerObj.doTouchStart(e.touches, e.timeStamp)
                    e.preventDefault()
                }, false)

                this.$el.addEventListener('touchmove', (e) => {
                    this.scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
                }, false)

                this.$el.addEventListener('touchend', (e) => {
                    this.scrollerObj.doTouchEnd(e.timeStamp)
                }, false)

                this.$el.addEventListener('touchcancel', (e) => {
                    this.scrollerObj.doTouchEnd(e.timeStamp)
                }, false)
            }
        }
    }
</script>
<style scoped>
    .item-tab {
        color: #242c35;
        height: .933333rem;
        line-height: .933333rem;
        width: 100%;
        overflow: hidden
    }

    [data-dpr="1"] .item-tab {
        font-size: 15px
    }

    [data-dpr="2"] .item-tab {
        font-size: 30px
    }

    [data-dpr="3"] .item-tab {
        font-size: 45px
    }

    .item-tab ul {
        width: 12rem;
        /*overflow-x: scroll*/
    }

    .item-tab li {
        float: left;
        position: relative;
        padding: 0 .333333rem
    }

    .item-tab li:nth-child(1) {
        margin-left: .066667rem
    }

    .item-tab li:last-child {
        margin-right: .066667rem
    }

    .item-tab li:active {
        background: #f4f4f4
    }

    .item-tab .cur {
        color: #d25138
    }

    .item-tab .cur:after {
        content: "";
        display: inline-block;
        height: .053333rem;
        border-radius: .026667rem;
        background: #d25138;
        position: absolute;
        width: 40%;
        left: 50%;
        margin-left: -20%;
        bottom: 0
    }

    .item-tab .cur:after {
        -webkit-animation: arrowMove .4s ease-in-out both;
        animation: arrowMove .4s ease-in-out both
    }

    @-webkit-keyframes arrowMove {
        0% {
            -webkit-transform: scaleX(0);
            transform: scaleX(0)
        }

        50% {
            -webkit-transform: scaleX(1.2);
            transform: scaleX(1.2)
        }

        100% {
            -webkit-transform: scaleX(1);
            transform: scaleX(1)
        }
    }

    @keyframes arrowMove {
        0% {
            -webkit-transform: scaleX(0);
            transform: scaleX(0)
        }

        50% {
            -webkit-transform: scaleX(1.2);
            transform: scaleX(1.2)
        }

        100% {
            -webkit-transform: scaleX(1);
            transform: scaleX(1)
        }
    }

    .item-tab-base ul li {
        padding: 0 1.04rem
    }

    .item-tab-base li:nth-child(1) {
        margin-left: .6rem
    }

    .item-tab-base .cur:after {
        width: 20%;
        margin-left: -10%
    }



</style>