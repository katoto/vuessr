<template>
    <div class="match-wrap l-full l-flex-column">
        <!--头部-->
        <div class="pl-head-box">
            <div class="pl-head">
                <a class="back-icon pl-back" onClick="history.back()">返回</a>
                足球赛事列表
            </div>
        </div>
        <!--菜单切换区-->
        <nav class="match-tab match-list-tab">
            <div class="match-tab-itm" :class="{'cur':tab=='Europe'}" v-tap="{methods:onTab, type:'Europe'}">欧洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='Asian'}" v-tap="{methods:onTab, type:'Asian'}">亚洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='America'}" v-tap="{methods:onTab, type:'America'}">美洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='Africa'}" v-tap="{methods:onTab, type:'Africa'}">非洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='Inter'}" v-tap="{methods:onTab, type:'Inter'}">国际</div>
        </nav>
        <div class="l-flex-1 l-relative">
            <div class="l-full l-scroll-y ">
                <section class="hot-match" >
                    <h1 class="hot-match-tit">洲际赛事</h1>
                    <ul class="hot-match-list" v-for="item in cup">
                        <li class="hot-match-item">
                            <router-link :to="{name: 'center-football-match-integral',params:{seasonid:item.seasonid}}">
                            <span class="link-all-match">
                                <em class="match-icon">
                                    <img :src="item['matchlogo']"/></em>
                                <em class="match-tit">{{item['matchgbname']}}</em>
                            </span>
                            </router-link>
                        </li>
                    </ul>
                </section>

                <section class="hot-match" v-if="tab!=='Inter'">
                    <h1 class="hot-match-tit">各国联赛</h1>
                    <ul class="hot-match-list" v-for="(list,index) in league">
                        <li class="hot-match-item">
                            <a class="link-all-match" v-tap="{methods:collap,index:index}">
                                <em class="match-icon">
                                    <img :src="list['countrylogo']"/></em>
                                <em class="match-tit">{{list['countryname']}}</em>
                                <i class="icon-open" :class="{'icon-close':isActive[index]}"></i>
                            </a>
                            <ul class="hot-match-list match-list-detail" :class="{'hide':!isActive[index]}" v-for="detail in list.leaguelist">
                                <li class="hot-match-item">
                                    <router-link :to="{name: 'center-football-match-integral',params:{seasonid:detail.seasonid}}">
                                        <span class="link-all-match">
                                            <em class="match-icon">
                                                <img :src="detail['matchlogo']"/></em>
                                            <em class="match-tit">{{detail['matchgbname']}}</em>
                                        </span>
                                    </router-link>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </section>
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
            cup () {
                return this.$store.state.center.zqAll.cups
            },
            league () {
                return this.$store.state.center.zqAll.leagues
            }
        },
        mounted () {
            this.getCupsData()
        },
        methods: {
            onTab ({type}) {
                this.tab = type
                this.getCupsData()
            },
            getCupsData () {
                switch (this.tab) {
                case 'Europe':
                    return this.$store.dispatch(aTypes.getFootballAll, {'vtype': 1})
                case 'Asian':
                    return this.$store.dispatch(aTypes.getFootballAll, {'vtype': 2})
                case 'America':
                    return this.$store.dispatch(aTypes.getFootballAll, {'vtype': 3})
                case 'Africa':
                    return this.$store.dispatch(aTypes.getFootballAll, {'vtype': 4})
                case 'Inter':
                    return this.$store.dispatch(aTypes.getFootballAll, {'vtype': 5})
                }
            },
            collap ({index}) {
                this.$set(this.isActive, index, !this.isActive[index])
            }

        }
    }

</script>
