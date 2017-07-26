<template>
    <div>
        <div class="l-full" style="z-index: 1" v-tap="{methods: doClose}"></div>
        <div class="alert-share hide" style="display: block;">
            <div class="icons-cont">
                <div class="collec-box" v-tap="{methods: doCollect}">
                    <span class="star-cllect" :class="{'star-cllected': params.initFocus === '1'}"></span>
                    <!--收藏成功用 star-cllected-->
                    <p>收藏</p>
                </div>
                <div class="collec-box share-box"  v-tap="{methods: doShare}">
                    <span class="share-icon"></span>
                    <p>分享</p>
                </div>
                <div class="collec-box share-box" v-tap="{methods: doReply}">
                    <img src="http://tccache.500.com/mobile/touch/images/bifen/v124/yjfk.png" alt="意见反馈">
                    <p>意见反馈</p>
                </div>
            </div>
            <div class="icon-close-s" v-tap="{methods: doClose}"><img src="http://tccache.500.com/mobile/touch/images/bifen/v124/close-s.png" alt="关闭"></div>
        </div>
    </div>

</template>
<script>
    export default {
        props: ['params'],
        methods: {
            doClose () {
                if (typeof this.params.onClose === 'function') {
                    this.params.onClose()
                }
            },
            doShare () {
                if (typeof this.params.onShare === 'function') {
                    this.params.onShare()
                }
            },
            doCollect () {
                if (typeof this.params.onCollect === 'function') {
                    this.params.onCollect()
                }
            },
            doReply () {
                if (typeof this.params.onReply === 'function') {
                    this.params.onReply()
                }
            }
        }
    }

</script>
