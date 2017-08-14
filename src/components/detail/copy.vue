<template>
    <div>
        <div class="l-full" style="z-index: 1" v-tap="{methods: doClose}"></div>
        <div class="alert-report" style="position: absolute;z-index: 100; animation: none;-webkit-animation:none">
            <p>长按复制下方链接，去粘贴给好友吧：</p>

            <p class="c-share-copytip-linkwr"><a class="c-share-copytip-link" :href="url" target="_blank" v-tap="{methods: clickLink}">{{url}}</a></p>

            <p v-tap="{methods: doClose}">取消</p>
        </div>
    </div>

</template>
<style scoped>
    .c-share-copytip-linkwr {
        padding: .2rem .2rem;
        border: 1px dotted #d9d9d9;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .c-share-copytip-link{
        text-decoration: none;
        color: #333
    }
    .alert-report{position:absolute;left:0;bottom:0;right:0;background:#f4f4f4;z-index:100;}
    .alert-report p{height:1.333333rem;line-height:1.333333rem;background:#fff;font-size:.426667rem;text-align:center;margin-bottom:.266667rem}
    .alert-report p:last-child{margin-bottom:0}
    .alert-report p:nth-child(1){margin-bottom:0;border-bottom:2px solid #eaeaea}
    .alert-report p:active{background:#eee}

</style>
<script>
    export default {
        props: ['params'],
        methods: {
            doClose () {
                if (typeof this.params.onClose === 'function') {
                    this.params.onClose()
                }
            },
            clickLink ({event}) {
                event.preventDefault()
                event.stopPropagation()
            }
        },
        computed: {
            url () {
                return location.href
            }
        }
    }
</script>
