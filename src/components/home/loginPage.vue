<template>
    <div class="ui-empty"><img src="http://tccache.500.com/mobile/widget/empty/images/10.png" class="w240">

        <p class="ui-empty-gfont">登录后即可关注你喜欢的比赛</p>
        <button class="ui-empty-btn" style="margin-top: 25px;" v-tap="{methods: doLogin}">点我登录</button></div>
</template>
<script>
    export default {
        methods: {
            doLogin () {
                this.$store.dispatch('login')
            }
        }
    }
</script>
<style scoped>
    .ui-empty {
        padding: 2.72rem 0;
        text-align: center;
    }
    .ui-empty .w240 {
        width: 3.2rem;
    }
    .ui-empty img {
        margin-bottom: 0.933333rem;
    }
    .ui-empty-dfont {
        font-size: 0.453333rem;
        color: #333;
        height: 0.893333rem;
        line-height: 0.893333rem;
    }
    .ui-empty-gfont {
        font-size: 0.4rem;
        color: #b3b3b3;
        margin-bottom: 0.773333rem;
        padding: 0 0.5rem;
    }
    .ui-empty-btn {
        font-size: 0.426667rem;
        color: #333;
        height: 1.12rem;
        border: 1px solid #c3c3c3;
        border-radius: 0.106667rem;
        background: #fff;
        width: 4.666667rem;
    }
</style>