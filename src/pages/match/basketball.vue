<template>
    <section class="hot-match l-flex-1 l-relative">
        <div class="l-full l-scroll-y ">
            <h1 class="hot-match-tit">热门</h1>

            <ul class="hot-match-list" v-for="list in match">
                <li class="hot-match-item">
                    <router-link class="link-all-match" :to="{path: '/center/basketballmatch/'+list['seasonid'] + '/rank',query:$route.query}">
                        <em class="match-icon">
                            <img :src="list['matchlogo']">
                        </em>
                        <em class="match-tit">{{list['matchgbname']}}</em>
                    </router-link>
                </li>
            </ul>
            <div class="all-match">
                <!--<a href="#/match/basketball" class="link-all-match">全部赛事<i class="icon-more"></i></a>-->
                <router-link :to="{name:'center-basketball-league-europe',query:$route.query}">
                    <span class="link-all-match">全部赛事<i class="icon-more"></i></span>
                </router-link>
            </div>

        </div>
    </section>

</template>

<script>
    import {aTypes, mTypes} from '~store/center'
    export default{
        async asyncData ({store}) {
            await store.dispatch(aTypes.getBasketballHot)
        },
        computed: {
            match () {
                return this.$store.state.center.lqhot
            }
        },
        methods: {
            async fetchData () {
                let match = this.$store.state.center.lqhot
                if (!match) {
                    await this.$store.dispatch(aTypes.getBasketballHot)
                }
            }
        },
        destroyed () {
            this.$store.commit(mTypes.reset)
        },
        mounted () {
            this.fetchData()
        }
    }
</script>
<style scoped>
    .hot-match-tit{ height: 0.8rem; line-height:0.8rem;font-size: 0.373333rem; color: #666666; padding-left: 0.533333rem;}
    .hot-match-list{ background: #fff; border-top: 1px solid #f1f1f1;width: 100%; color: #333; font-size: 0.373333rem;}
    .hot-match-item{ height: auto; line-height:1.33333rem;border-bottom: 1px solid #f1f1f1;  position:relative; }
    .link-all-match{font-size:0.373333rem; color: #333; display: block; padding-left: 0.533333rem;  position: relative;height:1.333333rem}
    .match-icon{width: 0.586667rem; height: 0.586667rem; line-height:0.586667rem;display: inline-block; position:relative;  top:11%;text-align: center;}
    .match-icon img{ max-width: 100%; height: 100%;}
    .match-tit{margin-left:0.266667rem;}
    .all-match{height: 1.333333rem; width: 100%; background: #fff;  line-height: 1.33333rem;margin-top: 0.266667rem;margin-bottom: 0.266667rem;}
    .link-all-match{font-size:0.373333rem; color: #333; display: block; padding-left: 0.533333rem;  position: relative;height:1.333333rem}
    .icon-more{content:'';display:inline-block;width:0.16rem; height:0.266667rem; background: url('~assets/images/match/link-to.png');  background-size:cover;position: absolute; right: 0.533333rem; top: 50%; margin-top: -0.13333rem;}
</style>
