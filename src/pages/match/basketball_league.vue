<template>
    <div class="match-wrap l-full l-flex-column">
        <!--头部-->
        <div class="pl-head-box">
            <div class="pl-head">
                <a class="back-icon pl-back" onClick="history.back()">返回</a>
                篮球赛事列表
            </div>
        </div>
        <!--菜单切换区-->
        <nav class="match-tab match-list-tab match-list-b">
            <div class="match-tab-itm" :class="{cur:~$route.path.indexOf('/europe')}">
                <router-link :to="{name:'center-basketball-league-europe'}" replace>欧洲</router-link>
            </div>
            <div class="match-tab-itm" :class="{cur:~$route.path.indexOf('/asian')}">
                <router-link :to="{name:'center-basketball-league-asian'}" replace>亚洲</router-link>
            </div>
            <div class="match-tab-itm" :class="{cur:~$route.path.indexOf('/america')}">
                <router-link :to="{name:'center-basketball-league-america'}" replace>美洲</router-link>
            </div>
            <div class="match-tab-itm" :class="{cur:~$route.path.indexOf('/cups')}">
                <router-link :to="{name:'center-basketball-league-cups'}" replace>杯赛</router-link>
            </div>
        </nav>

        <div class="l-flex-1 l-relative baseketball-cont">
            <div class="l-full l-scroll-y ">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
    import {aTypes} from '~store/center'
    export default{
        data () {
            return {
                tab: 'Europe',
                isActive: {}
            }
        },
        computed: {
            match () {
                return this.$store.state.center.lqAll
            }
        },

        methods: {
            onTab: type => {
                this.tab = type
                this.fetchData()
            }
        }
    }
</script>

<style scoped>
    a{
        color:inherit;
    }
    body,html{height:100%;-webkit-user-select:none;user-select:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-moz-tap-highlight-color:rgba(0,0,0,0);-ms-tap-highlight-color:rgba(0,0,0,0);tap-highlight-color:rgba(0,0,0,0)}
    body,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,label,li,ol,p,ul{margin:0;padding:0;font-weight:400}
    body{font-size:15px;-webkit-text-size-adjust:none;font-family:Microsoft YaHei,Arial; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
    a{text-decoration:none}
    em,i,s{font-style:normal}
    li,ul{list-style:none}
    table{border-collapse:collapse}
    td{empty-cells:show;color:#333; padding:0;}
    button{border:0}
    cite,i{font-style:normal}
     .l-flex-column{ display:-webkit-box; -webkit-box-orient: vertical; display:flex; flex-flow: column;height: 100% }
    .l-flex-1{ -webkit-box-flex: 1; flex:1;overflow: hidden}
    .l-scroll-y{overflow: auto;-webkit-overflow-scrolling:touch;}
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .l-relative{ position:relative;}
    .pl-head-box{height:1.12rem}
    .pl-head{background:#f63f3f;height:1.12rem;line-height:1.12rem;width:100%;font-size:.48rem;color:#fff;text-align:center;z-index:2}
    .pl-back:before{top:.266667rem}
    .back-icon:before{background:url('~assets/images/match/detail-icon.png') no-repeat;background-size:.533333rem 13.333333rem}
    .back-icon{width:1.066667rem;height:1.173333rem;display:inline-block;text-indent:-999px;position:absolute;left:0;z-index:6}
    .back-icon:before{width:.32rem;height:.493333rem;content:'';position:absolute;left:.266667rem;top:0.24rem;background-position:center 0}
    .match-tab{ background:#fff;height: 1.066667rem; line-height:1.066667rem;width: 100%;overflow: hidden;}
    .match-tab-itm{float:left;width: 50%; text-align: center; color: #333; font-size: 0.4rem; border-bottom: 1px solid #f1f1f1;}
    .match-tab .cur{ border-bottom: 3px solid #ff0000; color: #ff0000; height: 1.053333rem; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
    .match-icon img{ max-width: 100%; height: 100%;}
    .baseketball-cont{ margin-bottom: 0.333333rem}
    .match-list-tab .match-tab-itm{ width: 20%;}
    .match-list-b .match-tab-itm{ width: 25%;}
    .match-list-b { margin-bottom:0.333333rem}
</style>


