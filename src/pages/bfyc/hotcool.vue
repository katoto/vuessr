<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/record.html-->
<template>
    <div class="l-full l-flex-column">
        <!--顶部的时间-->
        <section class="pre-header">
            <ul>
                <li>比赛</li>
                <li v-for="(name, type) in dataType">{{name}}</li>
            </ul>
        </section>


        <div class="hotc-box l-flex-1 l-relative" v-if="hotcool">
            <div v-if="hotcool.matches.length" class="l-full l-scroll-y">
                <!--冷热列表-->
                <section class="hotc-cont" v-for="(match, idx) in hotcool.matches" v-if="match.status !== '4'"
                         v-tap="{methods: goAnalysis, fid: match.fid}">
                    <div class="hotc-tab-tit ">{{match | makeTitle}}<em :class="descClass[idx]">{{match.tag.desc}}</em>
                    </div>
                    <ul class="hotc-tab-list">
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.homesxname}}<em v-if="match.result==='3'">赢</em></li>
                                <li v-for="(name, type) in dataType">{{match.cell.win[type] | dataFmt(type)}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>平局<em v-if="match.result==='1'">赢</em></li>
                                <li v-for="(name, type) in dataType">{{match.cell.draw[type] | dataFmt(type)}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.awaysxname}}<em v-if="match.result==='0'">赢</em></li>
                                <li v-for="(name, type) in dataType">{{match.cell.lost[type] | dataFmt(type)}}</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <!--已完场-->
                <div class="tag-game-over" v-if="curStatus.history&&curStatus.latest">已完场</div>
                <section class="hotc-cont" v-for="(match, idx) in hotcool.matches" v-if="match.status === '4'"
                         v-tap="{methods: goAnalysis, fid: match.fid}">
                    <div class="hotc-tab-tit ">{{match | makeTitle}}<em :class="descClass[idx]">{{match.tag.desc}}</em>
                    </div>
                    <ul class="hotc-tab-list">
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.homesxname}}<em v-if="match.result==='3'">赢</em></li>
                                <li v-for="(name, type) in dataType">{{match.cell.win[type] | dataFmt(type)}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>平局<em v-if="match.result==='1'">赢</em></li>
                                <li v-for="(name, type) in dataType">{{match.cell.draw[type] | dataFmt(type)}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.awaysxname}}<em v-if="match.result==='0'">赢</em></li>
                                <li v-for="(name, type) in dataType">{{match.cell.lost[type] | dataFmt(type)}}</li>
                            </ul>
                        </li>
                    </ul>
                </section>

            </div>

            <prompt v-else type="no-data" tip0="暂无数据"/>
        </div>
        <prompt v-else type="loading" tip0="正在加载中..."/>
    </div>


</template>

<script type="text/javascript">
    import {aTypes} from '~store/bfyc.js'
    import Prompt from '~components/prompt.vue'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getHotcool)
        },
        components: {
            Prompt
        },
        data () {
            return {
                dataType: {
                    avrodds: '百家欧赔',
                    europe: '欧赔概率',
                    betfair: '必发交易',
                    exp: '冷热'
                }
            }
        },
        computed: {
            hotcool () {
                return this.$store.state.bfyc.hotcool
            },
            curStatus () {
                let curStatus = {
                    latest: false,
                    history: false
                }
                if (this.hotcool && this.hotcool.matches) {
                    this.hotcool.matches.forEach(match => {
                        if (match.status !== '4') {
                            curStatus.latest = true
                        } else {
                            curStatus.history = true
                        }
                    })
                }
                return curStatus
            },
            descClass () {
                return this.hotcool.matches.map((match) => {
                    return this.makeDescClass(match.tag.desc)
                })
            },
            noEmptyFlag () {
                return this.noEmpty(this.hotcool.matches)
            }
        },
        methods: {
            goAnalysis ({fid}) {
                this.$router.push({path: `/detail/football/${fid}/odds/europe`, query: this.$route.query})
            },
            makeDescClass (desc) {
                switch (desc) {
                case '胜过冷':
                case '负过冷':
                case '平局过冷':
                    return 'too-cold'
                case '胜过热':
                case '负过热':
                case '平局过热':
                    return ''
                case '规模较小':
                case '规模适中':
                    return 'too-draw'
                default:
                    return ''
                }
            },
            noEmpty (obj) {
                if (obj) { return !!Object.keys(obj).length }
                return false
            }
        },
        mounted () {
            if (this.$route.query.from === 'app_bet') {
                window.EsApp && window.EsApp.invoke('titleBar', {isShow: '1', title: '冷热分布'})
            }
            this.$store.dispatch(aTypes.getHotcool)
        },
        filters: {
            score (match) {
                if (match.homescore && match.awayscore) {
                    return `${match.homescore}:${match.awayscore}`
                } else {
                    return 'VS'
                }
            },
            makeTitle (item) {
                return item.order + ' ' + item.simpleleague + ' ' + item.matchtime.slice(5)
            },
            dataFmt (input, type) {
                let tail = ''
                if (type === 'europe' || type === 'betfair') tail = '%'
                return input === '' ? '--' : (input + tail)
            }
        },
        head: {
            title: '冷热分布-足球比分-500彩票网',
            appTitle: '冷热分布'
        }

    }
</script>
<style scoped>
    .pre-header{box-sizing:border-box;padding:0 .4rem;height:.8rem;border-bottom:1px solid #eaeaea;background:#fff;color:#aab5bd;font-size:.293333rem;line-height:.8rem}
    .pre-header ul{overflow:hidden}
    .pre-header ul li{float:left;margin-left:.4rem;width:1.36rem;text-align:center}
    .pre-header ul li:first-child{margin-left:0;width:3.133333rem;text-align:left}
    .pre-header ul li:last-child{float:right;margin-left:0;width:1.173333rem;text-align:right}
    .pre-header ul li:nth-child(2){margin-left:0}
    .hotc-cont{padding-top:.266667rem;border-bottom:1px solid #eaeaea;background:#fff}
    .hotc-tab-tit{margin-bottom:.266667rem;padding-left:.4rem;height:.533333rem;color:#aab5bd;font-size:.293333rem;line-height:.533333rem}
    .hotc-tab-tit em{float:right;display:inline-block;width:1.333333rem;height:.533333rem;border-bottom-left-radius:.053333rem;border-top-left-radius:.053333rem;background:#d25138;box-shadow:.013333rem .013333rem .04rem rgba(210,81,56,.7);color:#d25138;color:#fff;text-align:center;font-size:.266667rem}
    .hotc-tab-tit .too-cold{background:#437ba8;box-shadow:.013333rem .013333rem .04rem rgba(67,123,168,.7)}
    .hotc-tab-tit .too-draw{background:#5c788f;box-shadow:.013333rem .013333rem .04rem rgba(92,120,143,.7)}
    .hotc-tab-list{padding:0 .4rem;color:#242c35;font-size:.346667rem}
    .hotc-tab-item{margin-bottom:.533333rem}
    .hotc-tab-item ul{overflow:hidden;height:.373333rem;line-height:.373333rem}
    .hotc-tab-item ul li{position:relative;float:left;margin-left:.533333rem;width:1.2rem;text-align:center}
    .hotc-tab-item ul li em{position:absolute;top:50%;display:inline-block;margin-top:-.173333rem;margin-left:.053333rem;width:.346667rem;height:.346667rem;border-radius:.026667rem;background:#d25138;color:#fff;text-align:center;font-size:.266667rem;line-height:.346667rem}
    .hotc-tab-item ul li:last-child{float:right;margin-left:0;text-align:right}
    .hotc-tab-item ul li:nth-child(2){margin-left:0}
    .hotc-tab-item ul li:first-child{margin-left:0;width:3.133333rem;text-align:left;font-size:.373333rem}
    .hotc-tab-list{padding:0 .4rem;color:#242c35;font-size:.346667rem}
    .hotc-tab-item{margin-bottom:.533333rem}
    .hotc-tab-item ul{overflow:hidden;height:.373333rem;line-height:.373333rem}
    .hotc-tab-item ul li{position:relative;float:left;margin-left:.533333rem;width:1.2rem;text-align:center}
    .hotc-tab-item ul li em{position:absolute;top:50%;display:inline-block;margin-top:-.173333rem;margin-left:.053333rem;width:.346667rem;height:.346667rem;border-radius:.026667rem;background:#d25138;color:#fff;text-align:center;font-size:.266667rem;line-height:.346667rem}
    .hotc-tab-item ul li:last-child{float:right;margin-left:0;text-align:right}
    .hotc-tab-item ul li:nth-child(2){margin-left:0}
    .hotc-tab-item ul li:first-child{margin-left:0;width:3.133333rem;text-align:left;font-size:.373333rem}
</style>
