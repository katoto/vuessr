<template>
    <div>
        <div class="l-full" style="z-index: 1" v-tap="{methods: doClose}"></div>
        <div class="alert-share hide" style="display: block;">
            <div class="icons-cont">
                <div class="collec-box" v-tap="{methods: doCollect}">
                    <span class="star-cllect" :class="{'star-cllected': params.match.isfocus === '1'}"></span>
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

<style scoped>

    .alert-share {
        height: 4.266667rem;
        background: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        box-sizing: border-box;
        padding-top: 1.013333rem;
    }
    .icons-cont {
        color: #aab5bd;
        font-size: .32rem;
        overflow: hidden;
        width: 6.666667rem;
        margin: 0 auto;
    }
    .collec-box:nth-child(1) {
        float: left;
    }
    .collec-box:nth-child(2) {
        float: left;
        margin: 0 1.2rem 0 1.333333rem;
    }
    .collec-box:nth-child(3) {
        float: right;
    }
    .collec-box:nth-child(3) img {
        width: .76rem;
        height: .626667rem;
    }
    .collec-box {
        width: 1.333333rem;
        float: left;
        text-align: center;
        height: 1.333333rem;
        position: relative;
    }
    .star-cllect {
        width: .64rem;
        height: .6rem;
        display: inline-block;
        background: url(~assets/style/images/detail/collect.png) no-repeat;
        background-size: cover;
    }
    .star-cllected{width:.64rem;height:.6rem;display:inline-block;background:url(~assets/style/images/detail/collected.png) no-repeat;background-size:cover}

    .share-icon {
        width: .56rem;
        height: .626667rem;
        display: inline-block;
        background: url(~assets/style/images/detail/share.png) no-repeat;
        background-size: cover;
    }
    .icon-close-s {
        width: 1.333333rem;
        height: 1.333333rem;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -.666667rem;
        text-align: center;
        line-height: 1.333333rem;
    }



</style>
