<template>
    <div>
        <div class="l-full" v-tap="{methods: onClose}"></div>
        <div class="alert-report">
            <p v-tap="{methods: onReply}">回复</p>

            <p v-tap="{methods: onReport}">举报</p>

            <p v-tap="{methods: onClose}">取消</p>
        </div>
    </div>

</template>
<script>
    export default {
        props: ['params'],
        methods: {
            onClose () {
                if (typeof this.params.onClose === 'function') {
                    this.params.onClose()
                }
            },
            onReport () {
                if (typeof this.params.onReport === 'function') {
                    this.params.onReport()
                }
            },
            onReply () {
                if (typeof this.params.onReply === 'function') {
                    this.params.onReply()
                }
            }
        }
    }
</script>
<style scoped>
    .alert-report{position:absolute;left:0;bottom:0;right:0;background:#f4f4f4;z-index:100;}
    .alert-report p{height:1.333333rem;line-height:1.333333rem;background:#fff;font-size:.426667rem;text-align:center;margin-bottom:.266667rem}
    .alert-report p:last-child{margin-bottom:0}
    .alert-report p:nth-child(1){margin-bottom:0;border-bottom:2px solid #eaeaea}
    .alert-report p:active{background:#eee}

</style>
