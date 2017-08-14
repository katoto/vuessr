<template>

    <div class="l-full" style="z-index: 100">
        <div class="l-full" style="background-color: rgba(0,0,0,.6);z-index: 1"></div>
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
<style scoped>
    .alert-comm{left:.4rem;right:.4rem;transform:translateY(0);-webkit-transform:translateY(0);top:1.24rem;padding-bottom:1.28rem}
    .alert-comm .alert-comm-txt{border-top:1px solid #eaeaea;position:relative;height:2.133333rem;padding:.266667rem .266667rem .933333rem .266667rem}
    .alert-comm .comm-txt{border:0;width:100%;height:100%;outline:0 none;color:#333}
    [data-dpr="1"] .alert-comm .comm-txt{font-size:14px}
    [data-dpr="2"] .alert-comm .comm-txt{font-size:28px}
    [data-dpr="3"] .alert-comm .comm-txt{font-size:42px}
    .alert-comm .comm-num{position:absolute;right:.266667rem;bottom:.133333rem;color:#b9b9b9;display:block;width:1.066667rem;text-align:right}
    [data-dpr="1"] .alert-comm .comm-num{font-size:12px}
    [data-dpr="2"] .alert-comm .comm-num{font-size:24px}
    [data-dpr="3"] .alert-comm .comm-num{font-size:36px}
    .alert-comm .ui-alert-btn{color:#333}
    .alert-comm .share-wrap{height:.933333rem}
    .alert-comm .share{position:absolute;left:.266667rem;bottom:.133333rem;min-width:4.533333rem;width:auto;text-align:left;color:#333}
    [data-dpr="1"] .alert-comm .share{font-size:12px}
    [data-dpr="2"] .alert-comm .share{font-size:24px}
    [data-dpr="3"] .alert-comm .share{font-size:36px}
    .alert-comm .share .icon{display:inline-block;width:.4rem;height:.4rem;vertical-align:middle;position:relative;top:-.053333rem;margin-right:.133333rem;background:url(/mobile/touch/images/main_icon.png) no-repeat -.426667rem -1.586667rem;background-size:1.466667rem}
    .alert-comm .share .icon-no{background-position:-.88rem -1.586667rem}
    .ui-alert-btn:active{background:#eee}
    .alert-comm-layer{z-index:99}
    .alert-report{position:fixed;left:0;bottom:0;right:0;background:#f4f4f4;z-index:100;-webkit-animation:reportMove .2s linear;animation:reportMove .2s linear}
    @-webkit-keyframes reportMove{0%{-webkit-transform:translateY(100%)}
        100%{-webkit-transform:translateY(0)}
    }
    @keyframes reportMove{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}
        100%{-webkit-transform:translateY(0);transform:translateY(0)}
    }
    .alert-report p{height:1.333333rem;line-height:1.333333rem;background:#fff;font-size:.426667rem;text-align:center;margin-bottom:.266667rem}
    .alert-report p:last-child{margin-bottom:0}
    .alert-report p:nth-child(1){margin-bottom:0;border-bottom:2px solid #eaeaea}
    .alert-report p:active{background:#eee}

    .ui-alert{position:absolute;z-index:100;background:#fff;border-radius:.08rem;box-sizing:border-box;}
    .ui-alert-tit{margin-top:.266667rem;text-align:center;color:#000;font-size:.48rem;line-height:.786667rem}
    .ui-alert-ft{display:table;width:100%;position:absolute;left:0;bottom:0;background:#F6F6F6;border-radius:0 0 .08rem .08rem;border-top:1px solid #ddd}
    .ui-alert-btn{display:table-cell;height:1.28rem;text-align:center;color:#36c;line-height:1.28rem}
    [data-dpr="1"] .ui-alert-btn{font-size:15px}
    [data-dpr="2"] .ui-alert-btn{font-size:30px}
    [data-dpr="3"] .ui-alert-btn{font-size:45px}
    .ui-alert-btn:nth-child(2){border-left:1px solid #ddd}

</style>
