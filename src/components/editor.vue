<template>

    <div class="l-full" style="z-index: 100">
        <div class="l-full" style="background-color: rgba(0,0,0,.4);z-index: 1"></div>
        <div class="ui-alert alert-comm" style="position: absolute">
            <div class="ui-alert-tit"> {{replyName?'回复@'+replyName:'评论'}}</div>
            <div class="ui-alert-cont alert-comm-txt">
                <textarea id="content" drunk-on="input:contentChange()" class="comm-txt" maxlength="280" autofocus
                          placeholder="在这里一吐为快吧..."></textarea>
                <p class="share" drunk-if="isApp&&content&&content.length>=10">
                    <span drunk-class="{'icon': true, 'icon-no': !isshare}" drunk-on="click: isshare=!isshare"></span>
                    同时分享至社区 - <em>{{type==='1'?'足球风云':'篮球公园'}}</em>
                </p>

                <span class="comm-num">{{280-(content?content.length:0)}}字</span>
            </div>
            <div class="ui-alert-ft">
                <div class="ui-alert-btn" v-tap="{methods: () => $emit('close')}">取消</div>
                <div class="ui-alert-btn" drunk-on="click:onComment()">发送</div>
            </div>
        </div>
    </div>


</template>
<script>
    export default {
        props: ['replyName', 'type'],
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
