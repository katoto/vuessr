<template>
    <div class="bifen-list l-full l-flex-column">
        <div class="head-zone">
            <div class="icon-return" onclick="history.back()" v-if="backBtnShow"><span></span></div>
            <ul class="ball-tab">
                <li :class="{cur: ~$route.path.indexOf('/zq/')}" v-tap="{methods: goTab, tab: 'zq'}">足球</li>
                <li :class="{cur: ~$route.path.indexOf('/lq/')}"  v-tap="{methods: goTab, tab: 'lq'}">篮球</li>
            </ul>
            <div class="search-league" v-tap="{methods: goLeague}" data-p2="zq" data-p4="liansai"><span></span>联赛</div>
        </div>


        <!--顶部的tab-->
        <div class="l-flex-1 l-relative">

            <router-view/>

        </div>
        <refresh v-if="!(~this.$route.path.indexOf('/home/zq/zs'))"/>
        <switch-comp v-if="switchShow"></switch-comp>
    </div>

</template>

<script>
    import refresh from '~components/home/refresh.vue'
    import switchComp from '~components/home/switch.vue'
    export default{

        components: {refresh, switchComp},
        computed: {
            switchShow () {
                return this.$store.state.home.switchShow
            },
            backBtnShow () {
                if (!this.$route.query.from) return true
                return this.$route.query.from !== 'app_home'
            }
        },
        methods: {
            goLeague () {
                if (~this.$route.path.indexOf('/zq/')) {
                    this.$router.push({name: 'center-football', query: this.$route.query})
                } else {
                    this.$router.push({name: 'center-basketball', query: this.$route.query})
                }
            },
            goTab ({tab}) {
                if (tab === 'zq') {
                    this.$router.replace({path: `/home/${tab}/jczq/cur`, query: this.$route.query})
                } else {
                    this.$router.replace({path: `/home/${tab}/jclq/cur`, query: this.$route.query})
                }
            }
        }

    }
</script>

<style scoped>
    .bifen-list {
        background: #fff;
        width: 100%;
        height: 100%;
    }
    .head-zone {
        width: 9.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        margin: 0 auto;
        position: relative;
    }
    .icon-return {
        width: .666667rem;
        height: 1.2rem;
        position: relative;
    }

    .icon-return:active,.search-league:active {
        background: #f4f4f4
    }

    .icon-return span {
        display: inline-block;
        width: .306667rem;
        height: .493333rem;
        background: url(~assets/style/images/home/return.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.253333rem;
        left: 0
    }

    .ball-tab {
        width: 3.68rem;
        line-height: .666667rem;
        font-size: .373333rem;
        color: #242c35;
        clear: both;
        overflow: hidden;
        zoom: 1;
        position: absolute;
        left: 50%;
        margin-left: -1.866667rem;
        top: 50%;
        margin-top: -.36rem;
        border-radius: .106667rem
    }

    .ball-tab li {
        width: 50%;
        text-align: center;

        float: left;
        box-sizing: border-box;
    }
    .ball-tab .cur {
        background: #242c35;
        color: #fff;
    }
    .ball-tab  li:first-child{border: 0.04rem solid #242c35; border-right: none;
        border-radius: 0.106667rem 0 0 0.106667rem}
    .ball-tab  li:last-child{border: 0.04rem solid #242c35;border-left: none;
        border-radius: 0 0.106667rem  0.106667rem  0}
    .search-league {
        color: #aab5bd;
        font-size: .346667rem;
        width: 1.866667rem;
        text-align: right;
        position: absolute;
        top: 0;
        right: 0;
        height: 1.2rem;
        line-height: 1.2rem
    }

    .search-league span {
        width: .44rem;
        height: .44rem;
        display: inline-block;
        background: url(~assets/style/images/home/league.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 50%;
        margin-top: -.226667rem;
        left: .533333rem
    }
</style>
