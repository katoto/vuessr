<template>

    <div class="l-full" style="z-index: 100">
        <div class="l-full" style="background-color: rgba(0,0,0,.4);z-index: 1"></div>
        <div class="ui-alert alert-comm" style="position: absolute">
            <div class="ui-alert-tit"> {{replyName?'回复@'+replyName:'评论'}}</div>
            <div class="ui-alert-cont alert-comm-txt">
                <textarea class="comm-txt" maxlength="280" autofocus v-model="content"
                          placeholder="在这里一吐为快吧..."></textarea>
                <p class="share" v-if="isApp&&content.length>=10">
                    <span class="icon" :class="{'icon-no': !isShare}" v-tap="{methods: () => isShare =! isShare}"></span>
                    同时分享至社区 - <em>{{type === '1' ? '足球风云' : '篮球公园'}}</em>
                </p>

                <span class="comm-num">{{280-content.length}}字</span>
            </div>
            <div class="ui-alert-ft">
                <div class="ui-alert-btn" v-tap="{methods: () => $emit('close')}">取消</div>
                <div class="ui-alert-btn" v-tap="{methods: () => $emit('send', {content, isShare})}">发送</div>
            </div>
        </div>
    </div>


</template>
<script>
    export default {
        props: ['replyName', 'type'],
        data () {
            return {
                content: '',
                isShare: false
            }
        },
        computed: {
            isApp () {
                return !!window.EsApp
            }
        },
        mounted () {
            this.$el.querySelector('.comm-txt').focus()
            this.$el.addEventListener('touchmove', (e) => {
                console.log('move')
                e.stopPropagation()
                e.preventDefault()
            })
        }

    }
</script>
