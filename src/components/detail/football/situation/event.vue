<template>
    <div>

        <div class="sk-nav bge6">事件</div>

        <!--<widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !(eventlist && eventlist.length)" extra-text="很抱歉，没有数据"
                            text-type type="no-data">
        </widget-prompt-view>-->

        <div class="shikuang-box" v-if="eventlist && eventlist.length">
            <ul class="shikuang-line">
                <li class="d-zt-box" v-if="(status && status == StatusCode.ENDED)"><span class="d-zt">结束</span></li>

                <li v-for="event,index in eventlist"
                    :class="{
                'shikuang-lineRight': event.is_team != 1,
                'shikuang-lineLeft': event.is_team == 1,
                'jh-box': event.eventtype == EventType.HUAN_REN,
                'hide': event.isUnavailable
                }">

                    <span class="sk-time">{{event.timing_point}}'</span>
                    <span class="shikuang-ball">
                    <i :class="{
                        'black-ball': event.eventtype == EventType.JIN_QIU,
                        'dian-ball': event.eventtype == EventType.DIAN_QIU,
                        'jiaohuan': event.eventtype == EventType.HUAN_REN,
                        'yellow-card': event.eventtype == EventType.HUANG_PAI,
                        'red-card': event.eventtype == EventType.HONG_PAI,
                        'red-ball': event.eventtype == EventType.WU_LONG,
                        'red-yellow-card': event.eventtype == EventType.LIANG_HUANG_BIAN_HONG,
                        'wuxiao-ball': event.eventtype == EventType.WU_XIAO,
                    }">
                        <em v-if="event.eventtype == EventType.LIANG_HUANG_BIAN_HONG"></em>
                    </i>
                </span>

                    <div class="ren-name" v-if="event.is_team == 1 && event.eventtype != EventType.HUAN_REN">{{event.cdata?event.cdata:(event.eventtype != EventType.HUAN_REN?'【'+(event.is_team == 1?match.homesxname:match.awaysxname)+'】':'')}}</div>

                    <code class="jinqiu" v-if="event.eventtype == EventType.JIN_QIU">进球</code>
                    <code class="dianqiu" v-if="event.eventtype == EventType.DIAN_QIU">点球</code>
                    <code class="wuxiao" v-if="event.eventtype == EventType.WU_XIAO">无效</code>
                    <code class="wulong" v-if="event.eventtype == EventType.WU_LONG">乌龙</code>

                    <span class="shikuang-ball" v-if="event.eventtype == EventType.HUAN_REN">
                    <i class="jiaohuan"></i>
                </span>
                    <!--服务端的数据太恶心，只能使用如此龌龊的三元表达式：服务没有数据，且进球的情况下，展示球队-->
                    <div class="ren-name" v-if="event.is_team != 1 && event.eventtype != EventType.HUAN_REN">{{event.cdata?event.cdata:(event.eventtype != EventType.HUAN_REN?'【'+(event.is_team == 1?match.homesxname:match.awaysxname)+'】':'')}}</div>

                    <dl class="jh" v-if="event.eventtype == EventType.HUAN_REN">
                        <dd>
                            {{(event.exchange_player[0]||'')|truncate(8)}}
                            <i class="green-arrow"></i>
                        </dd>
                        <dd>
                            {{(event.exchange_player[1]||'')|truncate(8)}}
                            <i class="red-arrow"></i>
                        </dd>
                    </dl>
                    <!--<span class="s-bf">1:3</span>-->
                </li>

                <li class="d-zt-box" v-if="(status && status == StatusCode.NOT_STARTED)"><span class="d-zt">未开始</span></li>
                <li class="d-zt-box" v-if="status != null && status != StatusCode.NOT_STARTED"><span class="d-zt">开始</span></li>
            </ul>
        </div>

        <div class="sk-intro">
            <img src="http://tccache.500.com/mobile/touch/images/bifen/intro.png" width="100%">
        </div>


    </div>



</template>
<script>
    import {FootBallEventType as EventType, FootballStatusCode as StatusCode} from '~common/constants'
    export default {
        props: {
            eventlist: {
                type: Array,
                required: true
            },
            status: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                EventType,
                StatusCode
            }
        },
        computed: {
            match () {
                return this.$store.state.zqdetail.baseInfo
            }
        },
        filters: {
            truncate: (val, num) => {
                if (val.length > num) {
                    return val.substr(0, num) + '...'
                } else {
                    return val
                }
            }
        }

    }
</script>
