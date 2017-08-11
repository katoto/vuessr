<template>
    <div class="l-full l-flex-column" style="overflow: hidden">
        <!--head begin-->
        <div class="headernav">
            <div class="headernavL"><a onclick="home.back()" class="home-icon">返回</a></div>
            <ul class="toggle-cz">
                <li :class="{'cur': ~$route.path.indexOf('/zq/')}">
                    <router-link to="/home/zq/jczq/cur" replace>足球</router-link>
                </li>
                <li :class="{'cur': ~$route.path.indexOf('/lq/')}">
                    <router-link to="/home/lq/jclq/cur" replace>篮球</router-link>
                </li>
            </ul>
            <div class="headernavR">
                <a href="/center/football" class="league-icon"></a>
                <a class="sx-icon" v-tap="{methods: triggerFilter}"></a>
            </div>
        </div>


        <!--顶部的tab-->
        <div class="l-flex-1 l-relative">

            <router-view/>

        </div>
        <refresh/>
        <transition name="slide">
            <league v-if="filter.show"
                    :matches="filter.matches"
                    :inited="filter.inited"
                    @ok="filter.onOk($event)"
                    @cancel="filter.onCancel($event)"></league>
        </transition>

    </div>

</template>
<style scoped>
    .headernav {
        position: relative;
    }
    .slide-enter-active, .slide-leave-active {
        -webkit-transition: -webkit-transform .3s ease;
        transition: transform .3s ease;
    }
    .slide-enter-active, .slide-leave {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }

    .slide-leave-active, .slide-enter {
        -webkit-transform: translate(0, 100%);
        transform: translate(0, 100%);
    }
    .headernav{width:100%;height:1.173333rem;line-height:1.173333rem;position:fixed;left:0;top:0;z-index:9;text-align:center;background:url(/mobile/touch/images/bifen/index-header.jpg);background-size:100%}
    .headernavL{position:absolute;left:0}
    .headernavR{position:absolute;right:0;top:0}
    .guanzhu,.gz-fly,.gz-tips-icon,.home-icon:before,.league-icon:before,.qi-arrow,.sx-icon:before,.toggle-arrow{background:url(/mobile/touch/images/bifen/s-icon.png) no-repeat;background-size:.533333rem 3.6rem}
    .exchange,.refresh-icon,.sx-list li.cur:after,.ui-navbox-item li.select span:after{background:url(/mobile/touch/images/bifen/m-icon.png) no-repeat;background-size:.906667rem 2.533333rem}
    .home-icon,.league-icon,.sx-icon{width:1.066667rem;height:1.173333rem;display:inline-block;text-indent:-13.32rem;position:relative}
    .home-icon:before,.league-icon:before,.sx-icon:before{position:absolute;content:' ';width:.533333rem;height:.533333rem;display:block}
    .home-icon:before{width:.4rem;height:.493333rem;left:.266667rem;top:.366667rem;background-position:center 0}
    .sx-icon:before{background-position:center -.58rem;right:.266667rem;top:.4rem}
    .league-icon:before{background-position:center -3.093333rem;right:.266667rem;top:.4rem}
    .home-icon:active,.league-icon:active,.sx-icon:active{opacity:.6}
    .toggle-cz{border:1px solid #f7e3e3;line-height:.76rem;height:.76rem;border-radius:.106667rem;color:#fff;display:inline-block;position:relative;top:.25rem}
    [data-dpr="1"] .toggle-cz{font-size:16.5px}
    [data-dpr="2"] .toggle-cz{font-size:33px}
    [data-dpr="3"] .toggle-cz{font-size:49.5px}
    .toggle-cz li{display:inline-block;padding:0 .72rem;float:left}
    .toggle-cz li.cur,.toggle-cz li:active{background:#d46e6f;font-weight:700}
    .toggle-cz li:first-child.cur{border-radius:.106667rem 0 0 .106667rem}
    .toggle-cz li:last-child.cur{border-radius:0 .106667rem .106667rem 0}
    .saixuan-box{background:#f4f4f4;height:100%;width:100%}
    .saix-h{height:4rem}
</style>

<script>
    import league from '~components/league.vue'
    import refresh from '~components/refresh.vue'
    import {mTypes} from '~store/home'

    export default{

        components: {league, refresh},
        computed: {
            filter () {
                return this.$store.state.home.filter
            }
        },
        methods: {
            triggerFilter () {
                this.$store.commit(mTypes.filterTime)
            }
        },
        mounted () {
        //            入口
        }

    }
</script>
