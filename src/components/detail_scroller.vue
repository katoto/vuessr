<template>
    <div class="l-full _scroll_container">
        <slot name="navigator"></slot>
        <div class="_scroll_content">
            <slot>

            </slot>
        </div>
    </div>

</template>

<script>
    import {Scroller} from 'scroller'

    export default {
        data () {
            return {
                stop: false, //
                container: null, // 组件包含框
                content: null, // 组件内容框
                navigator: null, // 导航栏
                headPartHeight: 0, // 头部高度
                width: 0, // 头部宽度
                containerHeight: 0, // 包含框高度
                contentHeight: 0, // 包含框宽度
                scrollerObj: null // scroller对象
            }
        },
        mounted () {
            this.initConfig()
        },
        methods: {
            raf: (cb) => window.requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(() => cb(), 16.7),
            update () {
                this.raf(() => {
                    this.contentHeight = this.content.offsetHeight
                    this.scrollerObj.setDimensions(this.width, this.containerHeight, this.width, this.contentHeight)
                })
            },
            scrollTo (top, isAnimate) {
                this.raf(() => {
                    this.raf(() => {
                        this.scrollerObj.scrollTo(0, top, isAnimate)
                    })
                })
            },
            switchStop (status) {
                this.stop = !!status
            },
            initConfig () {
                this.container = this.$el
                this.content = this.$el.querySelector('._scroll_content')
                this.navigator = this.$el.querySelector('.navigator.hide')
                this.navigator.style.position = 'absolute'
                //                this.navigator.style.zIndex = 'auto'
                this.navigator.style.top = '0'
                this.navigator.style.left = '0'
                this.navigator.style.right = '0'
                this.width = this.container.offsetWidth
                this.headPartHeight = this.$el.querySelector('._header').offsetHeight
                this.head = this.$el.querySelector('._header')
                this.containerHeight = this.container.offsetHeight
                this.contentHeight = this.content.offsetHeight
                let status = 0
                const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
                const transformOrigin = typeof document.body.style.transform !== 'undefined' ? 'transformOrigin' : 'webkitTransformOrigin'
                this.head.style[transformOrigin] = '50% 100%'
                let latestTop = 0
                let outTouch = true
                this.scrollerObj = new Scroller((left, top, zoom) => {
                    this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
                    if (top < 0) {
                        this.head.style[transform] = 'scale(' + (1 - (top / (this.headPartHeight))) + ')'
                    } else {
                        this.head.style[transform] = 'scale(1)'
                    }

                    if (latestTop === top && top && outTouch) {
                        if (top < this.headPartHeight) {
                            if (top < this.headPartHeight / 2) {
                                this.scrollTo(0, true)
                            } else {
                                this.scrollTo(this.headPartHeight, true)
                            }
                        }
                    }
                    latestTop = top
                    if (top >= this.headPartHeight) {
                        if (!status) {
                            status = 1
                            this.navigator.style[transform] = 'translate3d(0, 0, 0) scale(1)'
                            this.$emit('switch', status)
                        }
                    } else {
                        if (status) {
                            status = 0
                            this.$emit('switch', status)
                        }
                        this.navigator.style[transform] = 'translate3d(0,' + (-top + this.headPartHeight) + 'px,0) scale(1)'
                    }
                    if (top === this.contentHeight - this.containerHeight && top && outTouch) {
                        this.$emit('end')
                    } else if (this.contentHeight < this.containerHeight && outTouch) {
                        this.$emit('end')
                    }
                }, {
                    bouncing: false,
                    scrollingX: false,
                    scrollingY: true
                })
                this.scrollerObj.setDimensions(this.width, this.containerHeight, this.width, this.contentHeight)
                this.container.addEventListener('touchstart', (e) => {
                    outTouch = false
                    // Don't react if initial down happens on a form element
                    if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
                        return
                    }
                    /* let a = findA(e.touches[0].target)
                    if (a && a.getAttribute('href')) {
                        return
                    } */
                    if (this.stop) {
                        e.preventDefault()
                        return
                    }
                    this.scrollerObj.doTouchStart(e.touches, e.timeStamp)
                    e.preventDefault()
                }, false)

                this.container.addEventListener('touchmove', (e) => {
                    outTouch = false
                    this.scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
                }, false)

                this.container.addEventListener('touchend', (e) => {
                    outTouch = true
                    this.scrollerObj.doTouchEnd(e.timeStamp)
                }, false)

                this.container.addEventListener('touchcancel', (e) => {
                    outTouch = true
                    this.scrollerObj.doTouchEnd(e.timeStamp)
                }, false)
                this.navigator.style.display = 'block'
            }
        }
    }
</script>
