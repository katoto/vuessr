<template>
    <div>
        <div class="l-full" v-tap="{methods: onClose}"></div>
        <div class="alert-report" style="position: absolute;z-index: 100; animation: none;-webkit-animation:none">
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
