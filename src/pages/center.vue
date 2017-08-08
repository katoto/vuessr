<template>
    <div class="match-wrap wrapper l-full l-flex-column">
        <!--头部-->
        <div class="pl-head-box">
            <div class="pl-head">
                <a class="back-icon pl-back"  onClick="history.back()">返回</a>
                {{tab=='football'?'足球赛事中心':'篮球赛事中心'}}
            </div>
        </div>

        <nav class="match-tab">
            <router-link to="/center/football" replace>
                <span class="match-tab-itm" :class="{'cur':tab=='football'}">足球</span>
            </router-link>

            <router-link to="/center/basketball" replace>
                <span class="match-tab-itm" :class="{'cur':tab=='basketball'}">篮球</span>
            </router-link>

        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
    export default{
        computed: {
            tab () {
                if (~this.$route.path.indexOf('/football')) {
                    return 'football'
                } else {
                    return 'basketball'
                }
            }
        }
    }
</script>

<style scoped>
    .match-tab {
        background: #fff;
        height: 1.066667rem;
        line-height: 1.066667rem;
        width: 100%;
        overflow: hidden;
    }
    .match-tab .cur {
        border-bottom: 3px solid #ff0000;
        color: #ff0000;
        height: 1.053333rem;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .match-tab-itm {
        float: left;
        width: 50%;
        text-align: center;
        color: #333;
        font-size: 0.4rem;
        border-bottom: 1px solid #f1f1f1;
    }


</style>
