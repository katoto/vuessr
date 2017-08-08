<template>
    <div class="tContent" style="display:block">
        <div class="zj-nav">
            防守四要素
            <ul class="time-item">
                <li class="time-item-cur" v-tap="{methods: openWordBox}">名词解释</li>
            </ul>
        </div>
        <div class="gl-box" v-if="noEmptyFlag">
            <data-box :data="defense" :dataType="defenseType"></data-box>
            <div class="infoTips" v-if="defense.desc">
                <i class="icon"></i>
                <p class="f24">
                    {{defense.desc}}
                </p>
            </div>
        </div>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
    </div>
</template>

<script>
import {mTypes} from '~store/lqdetail'
import wordBox from '~components/detail/basketball/analysis/jj/wordBox.vue'
import dataBox from '~components/detail/basketball/analysis/jj/teamMisc/dataBox.vue'

export default {
    components: {
        dataBox
    },
    props: {
        defense: {
            required: true
        }
    },
    data () {
        return {
            defenseType: {
                efg: {
                    zn: '防投篮',
                    en: 'eFG%'
                },
                tov: {
                    zn: '造误率',
                    en: 'TOV%'
                },
                orb: {
                    zn: '后场篮板率',
                    en: 'DRB%'
                },
                ftfga: {
                    zn: '防罚球',
                    en: 'FT/FGA'
                }
            },
            wordData: {
                efg: {
                    name: '防投篮',
                    tit: '防投篮eFG%',
                    desc: '防投篮，本赛季对手球队的有效命中率（将三分球算作1.5个进球来计算命中率）。'
                },
                tov: {
                    name: '造误率',
                    tit: '造误率TOV%',
                    desc: '造误率，本赛季对手球队在每100个回合中以失误结束的比重'
                },
                orb: {
                    name: '后场篮板率',
                    tit: '后场篮板率DRB%',
                    desc: '后场篮板率，用来描述球队在每100回合中将对方投失球转化为防守篮板的比重'
                },
                ftfga: {
                    name: '防罚球',
                    tit: '防罚球FT/FGA',
                    desc: '防罚球，本赛季对手球队罚球命中数/投篮出手数'
                }
            }
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.defense)
        }
    },
    methods: {
        openWordBox () {
            this.$store.commit(mTypes.setDialog, {
                component: wordBox,
                params: {
                    wordData: this.wordData,
                    cur: 'efg',
                    title: '防守四要素'
                }
            })
        },
        noEmpty (obj) {
            if (obj) return !!Object.keys(obj).length
            return false
        }
    }
}
</script>

<style scoped>
    .gl-box{background:#fff}
    .time-item{float:right;font-size:.293333rem}
    .time-item li{background:#efefef;color:#aab5bd;height:.613333rem;line-height:.613333rem;padding:0 .2rem;margin-left:.133333rem;text-align:center;border-radius:.306667rem;border:1px solid #dadee4;float:left;box-sizing:border-box}
    .time-item .time-item-cur{color:#242c35;background:#fff;border:1px solid #dadee4}

    .infoTips{padding:.266667rem .4rem;line-height:.533333rem;color:#515e6d;display:-webkit-box;display:-ms-flexbox;display:flex;border-top:1px solid #f4f4f4}
    .infoTips .icon{display:block;width:.88rem;height:.293333rem;background:url(~assets/style/images/detail/icon_sprite.png) no-repeat -.613333rem 0;background-size:1.92rem;margin-top:.106667rem}
    .infoTips p{-webkit-box-flex:1;-ms-flex:1;flex:1;padding-left:.213333rem}

    .feed-back{width:100%;height:1.733333rem;background:#fff;border-top:1px solid #eaeaea}
    .feed-box{color:#787878;line-height:1.733333rem;text-align:center}
</style>