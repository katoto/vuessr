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
</style>
