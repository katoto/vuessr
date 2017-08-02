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
            <div class="match-tab-itm" :class="{'cur':tab=='Europe'}" @click="onTab('Europe')">欧洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='Asian'}" @click="onTab('Asian')">亚洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='America'}" @click="onTab('America')">美洲</div>
            <div class="match-tab-itm" :class="{'cur':tab=='Cup'}" @click="onTab('Cup')">杯赛</div>
        </nav>
        <div class="l-flex-1 l-relative baseketball-cont">
            <div class="l-full l-scroll-y ">
                <section class="hot-match" >
                    <ul v-if="tab!='Cup'" class="hot-match-list" v-for="list in match">
                        <li class="hot-match-item">
                            <a :href="'#/basketball-league/rank/'+list['seasonid']" class="link-all-match">
                                <em class="match-icon"><img :src="list['matchlogo']"/></em>
                                <em class="match-tit">{{list['matchgbname']}}</em>
                            </a>
                        </li>
                    </ul>

                    <ul v-if="tab=='Cup'" class="hot-match-list" v-for="(item,index) in match">
                        <li class="hot-match-item">
                            <a class="link-all-match" @click="collap(index)">
                                <em class="match-icon">
                                    <img :src="item['countrylogo']"/></em>
                                <em class="match-tit">{{item['countryname']}}</em>
                                <i class="icon-open" :class="{'icon-close':isActive[index]}"></i>
                            </a>

                            <!--各国联赛详细-->
                            <ul class="hot-match-list match-list-detail" v-if="isActive[index]" v-for="detail in item.leaguelist">
                                <li class="hot-match-item">
                                    <a :href=" '#/basketball-league/rank/'+ detail.leagueid" class="link-all-match">
                                        <em class="match-icon">
                                            <img :src="detail['matchlogo']"/></em>
                                        <em class="match-tit">{{detail['matchgbname']}}</em>
                                    </a>
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
    import {mTypes, aTypes} from '~store/center'
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
            },

            collap: function (index) {
                this.$set(this.isActive, index, !this.isActive[index])
            },
            async fetchData () {
                if (!this.match) {
                    switch (this.tab) {
                    case 'Europe': {
                        await this.$store.dispatch(aTypes.getBasketballAll, 1)
                        break
                    }
                    case 'America': {
                        await this.$store.dispatch(aTypes.getBasketballAll, 2)
                        break
                    }
                    case 'Asian': {
                        await this.$store.dispatch(aTypes.getBasketballAll, 3)
                        break
                    }
                    case 'Cup': {
                        await this.$store.dispatch(aTypes.getBasketballAll, 5)
                        break
                    }
                    }
                }
            },

            mounted () {
                this.fetchData()
            }
        }
    }

</script>
