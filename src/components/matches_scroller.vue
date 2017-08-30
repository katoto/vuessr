<template>
    <div class="l-full _scroll_container">
        <div class="_scroll_content">
            <slot>

            </slot>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    let IScroll
    if (process.env.VUE_ENV === 'server') {
        IScroll = () => {}
    } else {
        IScroll = require('iscroll')
    }

    export default {
        props: ['pos'],
        mounted () {
            this.raf(this.config)
        },
        methods: {
            raf (cb) {
                return (window.requestAnimationFrame || (cb => setTimeout(cb, 50 / 3)))(cb)
            },
            update () {
                this.raf(this.config)
            },
            config () {
                const eli = this.$el.querySelector('._scroll_content li')
                const content = this.$el.querySelector('._scroll_content')
                if (!content || !eli) return
                this.itemHeight = eli.offsetHeight
                this.contentHeight = content.offsetHeight
                this.containerHeight = this.$el.offsetHeight
                if (this.myScroll) {
                    this.myScroll.destroy()
                    this.myScroll = null
                }
                let oTop = this.pos
                if (!oTop) {
                    const firstEndEl = this.$el.querySelector('.__first_no_end')
                    oTop = firstEndEl && firstEndEl.offsetTop ? -(firstEndEl.offsetTop - this.itemHeight) : 0
                }
                if (this.contentHeight + oTop < this.containerHeight) {
                    oTop = this.containerHeight - this.contentHeight
                }
                if (this.contentHeight <= this.containerHeight) {
                    oTop = 0
                }
                this.myScroll = new IScroll(this.$el, {
                    deceleration: 0.0025,
                    mouseWheel: true,
                    startY: oTop
                })
                this.scrollEndHandler()
                this.myScroll.on('scrollEnd', this.scrollEndHandler)
            },
            scrollToMatch () {
                const firstEndEl = this.$el.querySelector('.__first_no_end')
                let oTop = firstEndEl && firstEndEl.offsetTop ? -(firstEndEl.offsetTop - this.itemHeight) : 0
                this.myScroll.scrollTo(0, oTop)
            },
            scrollEndHandler () {
                this.raf(() => {
                    const imgs = []
                    let nth = Math.floor(-this.myScroll.y / this.itemHeight)
                    if (nth > 3) {
                        nth = nth - 3
                    }
                    let oneScreenNums = Math.floor(this.containerHeight / this.itemHeight)
                    oneScreenNums = oneScreenNums + 5
                    const lis = document.querySelectorAll('._scroll_content li')
                    const maxNums = lis.length
                    for (let i = 0; i < oneScreenNums && (nth + i < maxNums); i++) {
                        if (lis[nth + i]) {
                            const tmpImg = lis[nth + i].querySelectorAll('img')
                            if (tmpImg && tmpImg.length === 2) {
                                imgs.push(tmpImg[0])
                                imgs.push(tmpImg[1])
                            }
                        }
                    }
                    imgs.forEach(img => {
                        if (img.dataset.inited === '0') {
                            img.src = img.dataset.src
                            img.dataset.inited = '1'
                        }
                    })
                })
            }
        },
        beforeDestroy () {
            this.myScroll && this.$emit('position', this.myScroll.y)
        }
    }
</script>
