<template>
    <div class="l-full l-scroll-y">
        <div class="mark-cont" v-if="metro">
            <!-- 精选预测 -->
            <router-link class="one-mark jxyc" to="/bfyc/predict">
                <div class="mark-tit">精选预测</div>
                <div class="mark-demo">
                    <template v-if="metro.awesome_predict.homesxname">
                        {{metro.awesome_predict.homesxname}} VS {{metro.awesome_predict.awaysxname}}
                        <div class="mark-demo-r">{{metro.awesome_predict.cell.predict_result|combatDesc}} <em>{{metro.awesome_predict.cell.probability}}</em>%</div>
                    </template>
                    <template v-else>
                        暂无推荐
                    </template>

                </div>
            </router-link>
            <!-- 冷热分布 -->
            <router-link class="one-mark lrfb" to="/bfyc/hotcool">
                <div class="mark-tit">冷热分布</div>
                <div class="mark-demo">
                    <template v-if="metro.coldhot_distribute.order">
                        {{metro.coldhot_distribute.homesxname}} VS {{metro.coldhot_distribute.awaysxname}}
                        <!--{{metro.coldhot_distribute.order}}-->
                        <div class="mark-demo-r"><em>{{metro.coldhot_distribute.tag.desc}}</em></div>
                    </template>
                    <template v-else>
                        暂无推荐
                    </template>
                </div>
            </router-link>
            <!-- 实力对比 -->
            <router-link class="one-mark sldb" to="/bfyc/strength">
                <div class="mark-tit">实力对比</div>
                <div class="mark-demo">
                    <template v-if="metro.strength_compare.homesxname">
                        {{metro.strength_compare.homesxname}} VS {{metro.strength_compare.awaysxname}}
                    </template>
                    <template v-else>
                        暂无推荐
                    </template>
                </div>
            </router-link>
            <!-- 战绩特征 -->
            <router-link class="one-mark zjtz" to="/bfyc/record/result">
                <div class="mark-tit">战绩特征</div>
                <div class="mark-demo">
                    <template v-if="metro.combat_feature.awaysxname">
                        {{metro.combat_feature.order}}
                        {{metro.combat_feature.cell.teamsxname}}
                        <div class="mark-demo-r"><em>{{metro.combat_feature.cell.continous}}</em>{{metro.combat_feature.cell.result|combatDesc}}</div>
                    </template>

                    <template v-else>
                        暂无推荐
                    </template>
                </div>
            </router-link>
        </div>

    </div>


</template>
<script>
    import {aTypes} from '~store/home'
    export default {
        async asyncData ({store}) {
            await store.dispatch(aTypes.getZqMetro)
        },
        data () {
            return {
            }
        },
        watch: {
            refreshTime () {
                this.fetchData()
            }
        },
        components: {
        },

        computed: {
            metro () {
                return this.$store.state.home.zq.metro
            },
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            }
        },

        mounted () {
            this.fetchData()
        },

        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                await this.$store.dispatch(aTypes.getZqMetro)
                this.$store.commit('endOneRefresh')
            }
        },
        filters: {
            combatDesc: (result) => {
                switch (result) {
                case '3':
                    return `主胜`
                case '1':
                    return `平局`
                case '0':
                    return `主负`
                default:
                    return ''
                }
            }
        }

    }
</script>
<style scoped>
    a{
        display: block;
    }

    .mark-cont {
        padding-top: .133333rem
    }

    .one-mark {
        width: 9.2rem;
        margin: 0 auto;
        height: 2.266667rem;
        border-radius: .106667rem;
        box-sizing: border-box;
        padding: .4rem .266667rem .533333rem .266667rem;
        margin-top: .4rem
    }

    .mark-tit {
        font-weight: bolder;
        color: #fff;
        font-size: .4rem;
        margin-bottom: .24rem
    }

    /*[data-dpr="1"] .mark-tit {
        font-size: 15px
    }

    [data-dpr="2"] .mark-tit {
        font-size: 30px
    }

    [data-dpr="3"] .mark-tit {
        font-size: 45px
    }*/

    .mark-demo {
        color: rgba(255,255,255,.5);
        height: .666667rem;
        line-height: .666667rem
    }

    [data-dpr="1"] .mark-demo {
        font-size: 16px
    }

    [data-dpr="2"] .mark-demo {
        font-size: 32px
    }

    [data-dpr="3"] .mark-demo {
        font-size: 48px
    }

    .mark-demo-r {
        float: right;
        height: .666667rem;
        line-height: .666667rem
    }

    [data-dpr="1"] .mark-demo-r {
        font-size: 11px
    }

    [data-dpr="2"] .mark-demo-r {
        font-size: 22px
    }

    [data-dpr="3"] .mark-demo-r {
        font-size: 33px
    }

    .mark-demo-r em {
        margin-left: .133333rem
    }

    [data-dpr="1"] .mark-demo-r em {
        font-size: 20px
    }

    [data-dpr="2"] .mark-demo-r em {
        font-size: 40px
    }

    [data-dpr="3"] .mark-demo-r em {
        font-size: 60px
    }

    [data-dpr="1"] .jxyc .mark-demo-r em,[data-dpr="1"] .zjtz .mark-demo-r em {
        font-size: 24px
    }

    [data-dpr="2"] .jxyc .mark-demo-r em,[data-dpr="2"] .zjtz .mark-demo-r em {
        font-size: 48px
    }

    [data-dpr="3"] .jxyc .mark-demo-r em,[data-dpr="3"] .zjtz .mark-demo-r em {
        font-size: 72px
    }

    .jxyc {
        background: -webkit-gradient(linear,0 0,right bottom,from(#e65539),to(#e67239));
        background: gradient(linear,0 0,right bottom,from(#e65539),to(#e67239));
        box-shadow: .026667rem .026667rem .106667rem #e8a89b
    }

    .lrfb {
        background: -webkit-gradient(linear,0 0,right bottom,from(#3e8dcc),to(#3ea6cc));
        background: gradient(linear,0 0,right bottom,from(#3e8dcc),to(#3ea6cc));
        box-shadow: .026667rem .026667rem .106667rem #729cbd
    }

    .sldb {
        background: -webkit-gradient(linear,0 0,right bottom,from(#28b158),to(#28b174));
        background: gradient(linear,0 0,right bottom,from(#28b158),to(#28b174));
        box-shadow: .026667rem .026667rem .106667rem #68b894
    }

    .zjtz {
        background: -webkit-gradient(linear,0 0,right bottom,from(#587c9a),to(#58889a));
        background: gradient(linear,0 0,right bottom,from(#587c9a),to(#58889a));
        box-shadow: .026667rem .026667rem .106667rem #adbbc7
    }


</style>
