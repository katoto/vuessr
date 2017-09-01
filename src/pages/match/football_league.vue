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
    import {aTypes, mTypes} from '~store/center'
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
        destroyed () {
            this.$store.commit(mTypes.reset)
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

<style scoped>
    .pl-head-box{height:1.12rem}
    .pl-head{background:#f63f3f;height:1.12rem;line-height:1.12rem;width:100%;font-size:.48rem;color:#fff;text-align:center;z-index:2}
    .pl-back:before{top:.266667rem}
    .back-icon:before{background:url('~assets/images/match/detail-icon.png') no-repeat;background-size:.533333rem 13.333333rem}
    .back-icon{width:1.066667rem;height:1.173333rem;display:inline-block;text-indent:-999px;position:absolute;left:0;z-index:6}
    .back-icon:before{width:.32rem;height:.493333rem;content:'';position:absolute;left:.266667rem;top:0.24rem;background-position:center 0}
    .match-tab{ background:#fff;height: 1.066667rem; line-height:1.066667rem;width: 100%;overflow: hidden;}
    .match-tab-itm{float:left;width: 50%; text-align: center; color: #333; font-size: 0.4rem; border-bottom: 1px solid #f1f1f1;}
    .match-tab .cur{ border-bottom: 3px solid #ff0000; color: #ff0000; height: 1.053333rem; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
    .hot-match-tit{ height: 0.8rem; line-height:0.8rem;font-size: 0.373333rem; color: #666666; padding-left: 0.533333rem;}
    .hot-match-list{ background: #fff; border-top: 1px solid #f1f1f1;width: 100%; color: #333; font-size: 0.373333rem;}
    .hot-match-item{ height: auto; line-height:1.33333rem;border-bottom: 1px solid #f1f1f1;  position:relative; }
    .match-icon{width: 0.586667rem; height: 0.586667rem; line-height:0.586667rem;display: inline-block; position:relative;  top:11%;text-align: center;}
    .match-icon img{ max-width: 100%; height: 100%;}
    .match-tit{margin-left:0.266667rem;}
    .link-all-match{font-size:0.373333rem; color: #333; display: block; padding-left: 0.533333rem;  position: relative;height:1.333333rem}
    .match-list-detail{ margin-bottom: 0;}
    .match-list-detail .hot-match-item{ padding-left: 0.96rem; border-top: none; height: 1.066667rem; line-height: 1.066667rem}
    .match-list-detail .hot-match-item:last-child{border-bottom: 0;}
    .match-list-tab .match-tab-itm{ width: 20%;}
    .icon-open{ width: 0.266667rem; height:0.16rem; display: inline-block; background: url('~assets/images/match/click-to-open.png'); position: absolute; right: 0.533333rem; top: 50%; margin-top: -0.13333rem; background-size: cover}
    .icon-close{background: url('~assets/images/match/click-to-close.png') no-repeat;background-size: cover }
    .hide{ display: none;}
</style>
