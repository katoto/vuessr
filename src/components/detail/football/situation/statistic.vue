
<template>
    <div>
        <div class="sk-nav">统计</div>

       <!-- <widget-prompt-view
                src="widget/prompt.html"
                v-if="!isRequesting && (!statistic || statistic.h_ballcontrol_rate == null)"
                extra-text="很抱歉，没有数据"
                text-type
                type="no-data">
        </widget-prompt-view>-->

        <div class="tongji-box" v-if="statistic && statistic.h_ballcontrol_rate">
            <div class="zhzl-box">
                <div class="zhzl-title">控球率</div>
                <div class="zhzl-vs">
                    <div class="zhzl-l"  :class="{'zhzl-green':statistic.h_ballcontrol_rate>statistic.a_ballcontrol_rate,'zhzl-gray':statistic.h_ballcontrol_rate<statistic.a_ballcontrol_rate}"
                         :style="{width: statistic.h_ballcontrol_rate + '%'}">
                        <div class="wua">
                            <div class="hh"></div>
                        </div>
                    </div>
                    <div class="zhzl-r" :class="{'zhzl-green':statistic.h_ballcontrol_rate<statistic.a_ballcontrol_rate,'zhzl-gray':statistic.h_ballcontrol_rate>statistic.a_ballcontrol_rate}"
                         :style="{width: statistic.a_ballcontrol_rate + '%'}">
                        <div class="wua">
                            <div class="hh"></div>
                        </div>
                    </div>
                </div>
                <div class="zhzl-bfb-left">{{parseInt(statistic.h_ballcontrol_rate)}}<i>%</i></div>
                <div class="zhzl-bfb-right">{{parseInt(statistic.a_ballcontrol_rate)}}<i>%</i></div>
            </div>
            <div class="zhedie">
                <ul class="zhzl-list">
                    <li class="responsive" v-for="name,type in StatisticType">
                        <div class="zhzl-left">{{statistic['h' + type]}}</div>
                        <div class="each-resone">
                            <div class="zhzl-classify">{{name}}</div>
                            <div class="responsive">
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-left " :class="{'green-bg': statistic['h' + type]-0>statistic['a' + type]-0, 'gray-bg':statistic['h' + type]-0<=statistic['a' + type]-0}"
                                         :style="statistic['h' + type], statistic['a' + type]|getWidth"></div>
                                         <!--:style="{width:(((statistic['h' + type] + statistic['a' + type])==0?0.02:(statistic['h' + type] / (statistic['h' + type]-0 - (-statistic['a' + type])))) * 100)+'%'}"></div>-->
                                </div>
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-right " :class="{'green-bg': statistic['h' + type]-0<statistic['a' + type]-0, 'gray-bg':statistic['h' + type]-0>=statistic['a' + type]-0}"
                                         :style="statistic['a' + type], statistic['h' + type]|getWidth"></div>
                                    <!--:style="{width:(((statistic['h' + type] + statistic['a' + type])==0?0.02:(statistic['h' + type] / (statistic['h' + type]-0 - (-statistic['a' + type])))) * 100)+'%'}"></div>-->
                                </div>
                            </div>
                        </div>
                        <div class="zhzl-right">{{statistic['a' + type]}}</div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="ui-empty-font" v-else>暂无数据</div>
    </div>


</template>
<script>
    import {FootBallEventType as EventType, FootballStatusCode as StatusCode} from '~common/constants'
    export default {
        props: ['statistic'],
        data () {
            return {
                EventType,
                StatusCode,
                StatisticType: {
                    _shot_count: '射门',
                    _shotin_count: '射正',
                    _danger_attack_count: '危险进攻',
                    _attack_count: '进攻次数',
                    // _scrambling_count: '救球',
                    // _passing_count: '传球',
                    // _steals_count: '抢球',
                    _red_count: '红牌',
                    _yellow_count: '黄牌',
                    _foul_count: '犯规',
                    _offset_count: '越位',
                    _corner_count: '角球',
                    _freekick_count: '任意球'
                }
            }
        },
        filters: {
            getWidth (data1, data2) { // 横条比例显示的数据处理
                data1 = Number(data1)
                data2 = Number(data2)
                // let tmp = data1 + data2
                if (data1 === 0) { return 'width:3%' }
                // if (data1 === tmp) { return 'width:3%' }
                return {width: data1 / (data1 + data2) * 100 + '%'}
            }
        }

    }
</script>
<style scoped>
    .tongji-box {
        background: #fff;
        padding: .266667rem 0 0;
        text-align: center;
        color: #333
    }
    .tongji-box .zhzl-box {
        margin-top: 0
    }
    .zhzl-box {
        height: .973333rem;
        position: relative;
        margin: .4rem .4rem 0
    }
    .zhzl-title {
        color: #999;
        padding-top: .186667rem;
        text-align: center;
        width: 100%;
        line-height: .626667rem
    }

    [data-dpr="1"] .zhzl-title {
        font-size: 13px
    }

    [data-dpr="2"] .zhzl-title {
        font-size: 26px
    }

    [data-dpr="3"] .zhzl-title {
        font-size: 39px
    }
    .zhzl-l,
    .zhzl-r {
        position: absolute;
        bottom: 0;
        transition: all .5s ease-in-out 0s;
        -webkit-transition: all .5s ease-in-out 0s;
        height: .16rem;
        width: 0
    }

    .zhzl-l {
        left: 0
    }

    .zhzl-r {
        right: 0
    }
    .zhzl-vs-left,
    .zhzl-vs-right {
        height: .106667rem;
        position: absolute;
        top: 0;
        background: #bcd0de
    }

    .wua{position:relative;width:100%;height:.16rem}
    .zhzl-vs div:first-child.zhzl-green .hh{border-top:.16rem solid #5c788f;border-right:.16rem solid transparent;right:-.13rem;position:absolute;content:'';width:0;height:0;z-index:1}
    .zhzl-vs div:last-child.zhzl-green .hh{border-top:.17rem solid #5c788f;border-left:.16rem solid transparent;left:-.13rem;position:absolute;content:'';width:0;height:0}
    .zhzl-gray .hh{border:0}


    .zhzl-vs-left {
        right: 0;
        margin-right: .04rem
    }
    .gray-bg,
    .zhzl-gray {
        background: #bcd0de
    }
    .green-bg,
    .zhzl-green {
        background: #5c788f
    }
    .zhzl-bfb-left,
    .zhzl-bfb-right {
        position: absolute;
        top: .066667rem;
        color: #333
    }

    [data-dpr="1"] .zhzl-bfb-left,
    [data-dpr="1"] .zhzl-bfb-right {
        font-size: 23px
    }

    [data-dpr="2"] .zhzl-bfb-left,
    [data-dpr="2"] .zhzl-bfb-right {
        font-size: 46px
    }

    [data-dpr="3"] .zhzl-bfb-left,
    [data-dpr="3"] .zhzl-bfb-right {
        font-size: 69px
    }

    .zhzl-bfb-right {
        right: 0
    }

    [data-dpr="1"] .zhzl-box i {
        font-size: 12px
    }

    [data-dpr="2"] .zhzl-box i {
        font-size: 24px
    }

    [data-dpr="3"] .zhzl-box i {
        font-size: 36px
    }
    .zhzl-list {
        margin: .533333rem .4rem 0
    }

    .zhzl-list li {
        height: 1.08rem
    }

    .zhzl-left,
    .zhzl-right {
        color: #333;
        width: 2.106667rem;
        line-height: 1.066667rem
    }

    [data-dpr="1"] .zhzl-left,
    [data-dpr="1"] .zhzl-right {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-left,
    [data-dpr="2"] .zhzl-right {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-left,
    [data-dpr="3"] .zhzl-right {
        font-size: 33px
    }

    .zhzl-left {
        text-align: left
    }

    .zhzl-right {
        text-align: right
    }
    .each-resone {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 100%
    }
    .zhzl-classify {
        color: #aab5bd;
        line-height: .466667rem;
        text-align: center
    }

    [data-dpr="1"] .zhzl-classify {
        font-size: 11px
    }

    [data-dpr="2"] .zhzl-classify {
        font-size: 22px
    }

    [data-dpr="3"] .zhzl-classify {
        font-size: 33px
    }

</style>
