<template>
    <div class="bifen-list l-full l-flex-column">
        <div class="head-zone">
            <div class="icon-return"><span></span></div>
            <ul class="ball-tab">
                <li :class="{cur: ~$route.path.indexOf('/zq/')}" v-tap="{methods: goTab, tab: 'zq'}">足球</li>
                <li :class="{cur: ~$route.path.indexOf('/lq/')}"  v-tap="{methods: goTab, tab: 'lq'}">篮球</li>
            </ul>
            <div class="search-league" v-tap="{methods: goLeague}"><span></span>联赛</div>
        </div>


        <!--顶部的tab-->
        <div class="l-flex-1 l-relative">

            <router-view/>

        </div>
        <refresh/>
        <switch-comp v-if="switchShow"></switch-comp>
    </div>

</template>

<script>
    import refresh from '~components/home/refresh.vue'
    import switchComp from '~components/home/switch.vue'
    import {aTypes, mTypes} from '~store/home'
    export default{

        components: {refresh, switchComp},
        computed: {
            switchShow () {
                return this.$store.state.home.switchShow
            },

            lqPath () {
                if(this.lqMatches){
                    return '/home/lq/jclq/cur'
                }else{
                    return '/home/lq/all/cur'
                }
            },
            zqPath () {
                if(this.zqMatches) {
                    return '/home/zq/jczq/cur'
                }else{
                    return '/home/zq/all/cur'
                }

            },
            zqMatches () {
                return this.$store.state.home.zq && this.$store.state.home.zq.matches
            },
            lqMatches () {
                return this.$store.state.home.lq && this.$store.state.home.lq.matches
            }
        },
        mounted () {
            if (~this.$route.path.indexOf('/zq/')) {
                this.$store.dispatch(aTypes.fetchZqMatches,{tab:'jczq'} )
            }else{
                this.$store.dispatch(aTypes.fetchLqMatches, {tab:'jclq'})
            }
        },
        methods: {
            goLeague () {
                if (~this.$route.path.indexOf('/zq/')) {
                    this.$router.push({name: 'center-football'})
                } else {
                    this.$router.push({name: 'center-basketball'})
                }
            },
            goTab ({tab}) {
                if (tab === 'zq') {
                    console.log(this.zqPath)
                    this.$router.replace(this.zqPath)
                } else {
//                    this.$router.replace(`/home/${tab}/jclq/cur`)
                    this.$router.replace(this.lqPath)
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
        height: .666667rem;
        border: .026667rem solid #242c35;
        color: #242c35;
        border-radius: .133333rem;
        clear: both;
        overflow: hidden;
        zoom:1;position: absolute;
        left: 50%;
        margin-left: -1.866667rem;
        top: 50%;
        margin-top: -.36rem
    }

    [data-dpr="1"] .ball-tab {
        font-size: 14px
    }

    [data-dpr="2"] .ball-tab {
        font-size: 28px
    }

    [data-dpr="3"] .ball-tab {
        font-size: 42px
    }

    .ball-tab li {
        width: 50%;
        text-align: center;
        height: .666667rem;
        line-height: .666667rem;
        float: left
    }

    .ball-tab .cur {
        background: #242c35;
        color: #fff
    }

    .search-league {
        color: #aab5bd;
        width: 1.333333rem;
        text-align: right;
        position: absolute;
        top: 0;
        right: 0;
        height: 1.2rem;
        line-height: 1.2rem
    }

    [data-dpr="1"] .search-league {
        font-size: 13px
    }

    [data-dpr="2"] .search-league {
        font-size: 26px
    }

    [data-dpr="3"] .search-league {
        font-size: 39px
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
        left: 0
    }


</style>
