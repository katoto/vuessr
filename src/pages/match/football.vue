<template>
    <section class="hot-match l-flex-1 l-relative">
        <div class="l-full l-scroll-y ">
            <h1 class="hot-match-tit">热门</h1>
            <ul class="hot-match-list" v-for="list in footMatch">
                <li class="hot-match-item">
                    <a class="link-all-match" :href=" '#/football-league/integral/'+list.seasonid">
                        <em class="match-icon">
                            <img :src="list['matchlogo']">
                        </em>
                        <em class="match-tit">{{list['matchgbname']}}</em>
                    </a>
                </li>
            </ul>

            <div class="all-match">
                <!--<a href="#/match/football" class="link-all-match">全部赛事<i class="icon-more"></i></a>-->
                <router-link :to="{name:'center-football-europe'}">
                    <span class="link-all-match">全部赛事<i class="icon-more"></i></span>
                </router-link>
            </div>

        </div>
    </section>

</template>

<script>
    import {mTypes, aTypes} from '~store/center'
    export default{
        async asyncData ({store}) {
            await store.dispatch(aTypes.getFootballHot)
        },
        computed: {
            footMatch () {
                return this.$store.state.center.zqhot
            }
        },

        methods: {
            async fetchData () {
                let match = this.$store.state.center.zqhot
                if (!match) { await this.$store.dispatch(aTypes.getFootballHot) }
            }
        },
        mounted () {
            this.fetchData()
        }
    }

</script>
