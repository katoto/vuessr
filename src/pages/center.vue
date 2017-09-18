
<template>
    <div class="match-wrap wrapper l-full l-flex-column">
        <!--头部-->
        <div class="pl-head-box" v-if="$route.query.from!=='app_bet'">
            <div class="pl-head">
                <a class="back-icon pl-back"  v-tap="{methods: back}">返回</a>
                {{tab=='football'?'足球赛事中心':'篮球赛事中心'}}
            </div>
        </div>

        <nav class="match-tab">
            <router-link :to="{path:'/center/football',query:$route.query}" replace>
                <span class="match-tab-itm" :class="{'cur':tab=='football'}">足球</span>
            </router-link>

            <router-link :to="{path:'/center/basketball',query:$route.query}" replace>
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
        },
        methods: {
            back () {
                if (window.EsApp && this.$route.query.from === 'app_bet') {
                    window.EsApp.invoke('close')
                } else {
                    history.back()
                }
            }
        },
        mounted () {
            if (this.$route.query.from === 'app_bet') {
                window.EsApp && window.EsApp.invoke('titleBar', {isShow: '1', title: '赛事中心'})
            }
        },
        head: {
            title: '赛事中心'
        }
    }
</script>

<style scoped>
    .wrapper {background: #f4f4f4;width: 100%;height: 100%;  }
    .l-full {position: absolute;top: 0;left: 0;right: 0;bottom: 0;}
    .l-flex-column {display: -webkit-box;-webkit-box-orient: vertical;display: flex;flex-flow: column;height: 100%;}
    .pl-head-box{height:1.12rem}
    .pl-head{background:#f63f3f;height:1.12rem;line-height:1.12rem;width:100%;font-size:.48rem;  color:#fff;text-align:center;z-index:2}
    .match-tab {background: #fff;height: 1.066667rem;line-height: 1.066667rem;width: 100%; overflow: hidden;}
    .match-tab .cur {border-bottom: 3px solid #ff0000;color: #ff0000;height: 1.053333rem;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);  }
    .match-tab-itm {float: left;width: 50%; text-align: center;color: #333;font-size: 0.4rem;border-bottom: 1px solid #f1f1f1;  }
    .back-icon:before{background:url('~assets/images/match/detail-icon.png') no-repeat;background-size:.533333rem 13.333333rem}
    .back-icon{width:1.066667rem;height:1.173333rem;display:inline-block;text-indent:-999px;position:absolute;left:0;z-index:6}
    .back-icon:before{width:.32rem;height:.493333rem;content:'';position:absolute;left:.266667rem;top:0.24rem;background-position:center 0}
    .pl-head-box{height:1.12rem}
    .pl-head{background:#f63f3f;height:1.12rem;line-height:1.12rem;width:100%;font-size:.48rem;color:#fff;text-align:center;z-index:2}
    .pl-back:after{top:.266667rem}
</style>
