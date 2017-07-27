
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

        <div class="tongji-box" v-if="statistic">
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
                <div class="zhzl-bfb-left">{{statistic.h_ballcontrol_rate}}<i>%</i></div>
                <div class="zhzl-bfb-right">{{statistic.a_ballcontrol_rate}}<i>%</i></div>
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
                                         :style="{width:(((statistic['h' + type] + statistic['a' + type])==0?0.02:(statistic['h' + type] / (statistic['h' + type]-0 - (-statistic['a' + type])))) * 100)+'%'}"></div>
                                </div>
                                <div class="each-resone l-relative">
                                    <div class="zhzl-vs-right" :class="{'green-bg':statistic['h' + type]-0<statistic['a' + type]-0, 'gray-bg':statistic['h' + type]-0>=statistic['a' + type]-0}"
                                         :style="{width: (((statistic['h' + type] + statistic['a' + type])==0?0.02:(statistic['a' + type] / (statistic['h' + type]-0 - (-statistic['a' + type])))) * 100) + '%'}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="zhzl-right">{{statistic['a' + type]}}</div>
                    </li>

                </ul>
            </div>
        </div>
    </div>


</template>
<script>
    import {FootBallEventType as EventType, FootballStatusCode as StatusCode} from '~common/constants'
    export default {
        props: {
            statistic: {
                type: Object,
                required: true
            }
        },
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
        }

    }

</script>
