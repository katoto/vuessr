<template>
    <div>
        <div class="dataBox" v-if="noEmptyFlag">
            <div class="zr-detail">
                <ul class="zr-detail-left">
                    <li class="zr-detail-tit">球员</li>
                    <li v-for="item in membersFmt">{{item.player | truncate(4)}}<em v-if="item.isinjury === '1'">伤</em></li>
                </ul>
                <div class="scroll-cont table-sslfz">
                    <ul class="zr-detail-right" :style="{width: liW}">
                        <li class="zr-detailer zr-detail-tit">
                            <ul>
                                <li v-for="(name, type) in membersType">{{name}}</li>
                            </ul>
                        </li>
                        <li class="zr-detailer zr-detailer-box" v-for="item in membersFmt">
                            <ul>
                                <li v-for="(name, type) in membersType">{{item[type]}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
        <div class="box-arrow noborder" v-if="members" v-tap="{methods: collap, lenght: members.length}">
            <div class="zd-arrow" :class="{'rotate180': moreFlag}">
            </div>
        </div>

    </div>
</template>

<script>
import {
    mTypes,
    aTypes
} from '~store/lqdetail'
import {Scroller} from 'scroller'

export default {
    props: {
        members: {
            required: true
        },
        membersType: {
            type: Object,
            required: true
        },
        liW: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            moreFlag: false,
            cutLen: 5
        }
    },
    computed: {
        noEmptyFlag() {
            return this.noEmpty(this.members)
        },
        membersFmt() {
            return this.members.slice(0, this.cutLen)
        }
    },
    methods: {
        collap({length}) {
            this.moreFlag = !this.moreFlag
            this.cutLen = this.moreFlag ? length : 5
            this.$store.commit(mTypes.updateScTime)
        },
        noEmpty(obj) {
            if(obj)
            return !!Object.keys(obj).length
            return false
        },
        scrollTo (left, isAnimate) {
            this.raf(() => {
                this.raf(() => {
                    this.scrollerObj.scrollTo(left, 0, isAnimate)
                })
            })
        },
        raf: (cb) => window.requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(() => cb(), 16.7),
    },
    mounted () {
        if(!this.noEmptyFlag) return
        this.container = this.$el.querySelector('.scroll-cont')
        this.content = this.$el.querySelector('.zr-detail-right')
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
    },
    filters: {
        truncate (input, length, tail) {
            if (input.length <= length) {
                return input
            }
            return input.slice(0, length) + (tail || '...')
        }
    }
}
</script>

<style lang="css">
</style>
