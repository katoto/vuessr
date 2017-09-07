<template>
    <!-- 实名认证弹窗  start-->
    <div>
        <div class="l-full" style="z-index: 1" v-tap="{methods: onClose}"></div>        
        <div class="ui-alert-layer">
            <div class="ui-alert">
                <div class="ui-alert-tit"> 温馨提示 </div>
                <div class="ui-alert-cont"><span class="ui-alert-txt">根据国家相关规定，发表观点前请先实名认证。 </span> </div>
                <div class="ui-alert-ft">
                    <div class="ui-alert-btn" v-tap="{methods: onClose}">放弃</div>
                    <div class="ui-alert-btn"  v-tap="{methods: onVerify}">去认证</div>
                </div>
            </div>
        </div>
    </div>
    <!-- 实名认证弹窗  over-->
</template>

<script>
export default {
    props: ["params"],
    methods: {
        onClose() {
            if(typeof this.params.onClose === 'function') {
                this.params.onClose()
            }
        },
        onVerify() {
            if(typeof this.params.onVerify === 'function') {
                this.params.onVerify()
            }
        }
    }
}
</script>

<style scoped>
/*.ui-alert-layer {z-index:90; top:0; left:0; width:100%; height:100%; position:fixed; z-index:99; background:rgba(0,0,0,0.6); }*/
.ui-alert {position:fixed; z-index:100; top:50%; margin-top:-2.4rem; padding-bottom:1.707rem; left:0.267rem; right:0.267rem; background:#fff;color:#333; border-radius:0.08rem;  -webkit-border-radius:0.08rem;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:"microsoft yahei"}
.ui-alert-bd {overflow:auto;height:100%;padding-bottom:1.333rem;-webkit-box-sizing:border-box;box-sizing:border-box;}
.ui-alert-tit {margin-top:0.267rem; text-align:center; color:#000; font-size:0.48rem; padding-bottom:0.267rem;}
.ui-alert-cont {color:#666; font-size:0.373rem; padding:0 0.533rem; line-height:0.64rem; text-align:center; min-height:0.8rem;}
.ui-alert-txt {display:inline-block; text-align:left; color:#333;}
.ui-alert-ft {display:table; width:100%; position:absolute; z-index:101; left:0; bottom:0; background:#F6F6F6; border-radius:0 0 0.08rem 0.08rem; -webkit-border-radius:0 0 0.08rem 0.08rem; border-top:1px solid #ddd;}
.ui-alert-btn {display:table-cell; height:1.28rem; text-align:center;color:#3366cc; font-size:0.4rem; line-height:1.28rem;width:1.333rem;}
.ui-alert-btn:nth-child(2) {border-left:1px solid #ddd;}
.ui-alert-btn:active{opacity: 0.75}
</style>
