<template>

    <div class="comm-enter">
        <div class="enter-ipt" v-tap="{methods: beginEdit}">
            <i class="ipt-icon"></i>
            <p class="ipt-txt">我来说两句…</p>
            <span class="ipt-count">{{total}}评</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['total'],
        methods: {
            beginEdit () {
                this.$emit('edit')
            }
        }
    }
</script>
<style scoped>
    .comm-enter{background:#fff;width:100%;height:1.133333rem;padding-top:.2rem;text-align:center;position:fixed;left:0;bottom:0;z-index:10;-webkit-transform:translateZ(0);transform:translateZ(0)}
    .comm-enter .enter-ipt{height:.906667rem;border:1px solid #f1f1f1;border-radius:.08rem;width:9.2rem;margin:0 auto;text-align:left;background:#f4f4f4;position:relative}
    .comm-enter .enter-ipt .ipt-icon{display:inline-block;vertical-align:middle;width:.64rem;height:.44rem;margin:.266667rem;background-position:.053333rem -12.906667rem;float:left}
    .comm-enter .enter-ipt .ipt-txt{display:inline-block;vertical-align:middle;color:#ccc;height:.906667rem;line-height:.906667rem}
    .comm-enter .ipt-count{display:inline-block;position:absolute;right:.666667rem;top:.026667rem;height:.906667rem;line-height:.906667rem;color:#787878}
    .comm-enter:active .enter-ipt .ipt-txt{color:#787878}
</style>
