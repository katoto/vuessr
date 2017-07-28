<template>
    <div class="s-container">
        <div class="s-content" style="width: 9rem">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {Scroller} from 'scroller'
    export default{
        methods: {
            initConfig: function () {
                this.container = this.$el
                this.content = this.$el.querySelector('.s-content')
                const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
                this.scrollerObj = new Scroller((left, top, zoom) => {
                    this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
                }, {
                    bouncing: false,
                    scrollingX: true,
                    Locking: false,
                    scrollingY: false,
                    animationDuration: 150
                })
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
        },
        mounted () {
            this.initConfig()
        }
    }
</script>
