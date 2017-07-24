<template>
    <div>
        <div v-if="statistic && statistic.length">

            <div class="zhedie-box">
                <div class="gl-nav">球队统计</div>

                <div class="zhedie">
                    <ul class="zhzl-list">
                        <li class="responsive" drunk-repeat="name,type in StatisticType">
                            <div class="zhzl-left">{{statistic.away.zj[type] | default: 0}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">{{name}}</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left " drunk-class="+statistic.away.zj[type] < +statistic.home.zj[type] ? 'zhzl-gray' : 'zhzl-green'" style="width:{{statistic.away.zj[type]|widthPer:statistic.home.zj[type]}}%;"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" drunk-class="+statistic.away.zj[type] < +statistic.home.zj[type] ? 'zhzl-green' : 'zhzl-gray'"  style="width:{{statistic.home.zj[type]|widthPer:statistic.away.zj[type]}}%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{statistic.home.zj[type] | default: 0}}</div>
                        </li>

                    </ul>
                </div>
            </div>


            <div class="zhedie-box" drunk-repeat="awayorhome,i in [statistic.away, statistic.home]">

                <div class="gl-nav">{{[match.awaysxname, match.homesxname][i]}}统计</div>


                <div class="gl-box fx-zr-box">
                    <div class="dataBox">
                        <div class="zr-detail">
                            <ul class="zr-detail-left">
                                <li class="zr-detail-tit">首发球员</li>
                                <li drunk-repeat="info in awayorhome.sf">{{info.player|default:''|truncate:12}}</li>

                                <li class="zr-detail-tit">替补球员</li>
                                <li drunk-repeat="info in awayorhome.tb">{{info.player|default:''|truncate:12}}</li>

                            </ul>
                            <div class="scroll-cont ">
                                <ul class=" zr-detail-right table-tj">
                                    <li class="zr-detailer zr-detail-tit">
                                        <ul>
                                            <li>时间</li>
                                            <li>得分</li>
                                            <li>投篮</li>
                                            <li>篮板</li>
                                            <li>助攻</li>
                                            <li>抢断</li>
                                            <li>盖帽</li>
                                            <li>失误</li>
                                            <li>犯规</li>
                                        </ul>
                                    </li>

                                    <li class="zr-detailer" drunk-repeat="info in awayorhome.sf">
                                        <ul>

                                            <li>{{info.time}}</li>
                                            <li>{{info.score}}</li>
                                            <li>{{info.shoot}}</li>
                                            <li>{{info.rebs}}</li>
                                            <li>{{info.assists}}</li>
                                            <li>{{info.steals}}</li>
                                            <li>{{info.block_shot}}</li>
                                            <li>{{info.fehlpass}}</li>
                                            <li>{{info.foul}}</li>
                                        </ul>
                                    </li>

                                    <li class="zr-detailer zr-detail-tit">
                                        <ul>
                                            <li>时间</li>
                                            <li>得分</li>
                                            <li>投篮</li>
                                            <li>篮板</li>
                                            <li>助攻</li>
                                            <li>抢断</li>
                                            <li>盖帽</li>
                                            <li>失误</li>
                                            <li>犯规</li>

                                        </ul>
                                    </li>
                                    <li class="zr-detailer" drunk-repeat="info in awayorhome.tb">
                                        <ul>
                                            <li>{{info.time}}</li>
                                            <li>{{info.score}}</li>
                                            <li>{{info.shoot}}</li>
                                            <li>{{info.rebs}}</li>
                                            <li>{{info.assists}}</li>
                                            <li>{{info.steals}}</li>
                                            <li>{{info.block_shot}}</li>
                                            <li>{{info.fehlpass}}</li>
                                            <li>{{info.foul}}</li>

                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div class="sk-btips">
                500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
            </div>
        </div>

        <div v-else>
            <div class="ui-empty" style="padding: 1.54rem 0;">
                <img class="w240" src="http://tccache.500.com/mobile/widget/empty/images/12.png">
                <!--<if: message />--><div class="ui-empty-dfont">很抱歉，没有数据</div>
                <!--<if: extraText />-->
            </div>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/lqdetail'
    import meSports from '~components/detail/basketball/situation/meSports.vue'
    import {BasketballStatusCode as StatusCode} from '~common/constants'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getSituation, {
                fid: params.fid,
            })
        },
    }
</script>