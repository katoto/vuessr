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

                    <span class="sk-time">{{event.timing_point|time}}'</span>
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
        <div class="ui-empty-font" v-else>暂无数据</div>
        <div class="sk-intro">
            <img src="http://tccache.500.com/mobile/touch/images/bifen/intro.png" width="100%">
        </div>


    </div>



</template>
<script>
    import {FootBallEventType as EventType, FootballStatusCode as StatusCode} from '~common/constants'
    export default {
        props: ['eventlist', 'status'],
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
            },
            time: time => {
                if (time > 90) {
                    return '90+'
                } else {
                    return time
                }
            }
        }

    }
</script>
<style scoped>

    .shikuang-box {
        text-align: center;
        font-size: .173333rem;
        background: #f4f4f4;
        padding-bottom: .84rem
    }

    .shikuang-line {
        background: #e2e2e2;
        width: 1px;
        margin: .533333rem auto 0;
        height: 100%;
        display: inline-block
    }

    .shikuang-line li {
        width: 3.906667rem;
        line-height: .933333rem;
        margin-bottom: .64rem;
        background: #fff;
        border: 1px solid #e2e2e2;
        position: relative;
        border-radius: .053333rem
    }
    .shikuang-line li:last-child,
    .shikuang-line li:last-child.d-zt-box {
        margin-bottom: 0
    }

    .shikuang-lineLeft {
        float: right;
        text-align: right;
        padding-right: .533333rem
    }

    .shikuang-lineRight {
        float: left;
        text-align: left;
        padding-left: .533333rem
    }
    .shikuang-lineLeft .mtop {
        margin: .093333rem 0 0 .053333rem
    }

    .shikuang-lineRight .mtop {
        margin: .093333rem .053333rem 0 0
    }

    .shikuang-ball {
        width: .8rem;
        height: .8rem;
        border-radius: 100%;
        display: inline-block;
        background: #fff;
        text-align: center;
        border: 1px solid #d0d0d0;
        position: absolute;
        top: 0
    }
    .shikuang-lineLeft .shikuang-ball {
        margin: -.4rem -.4rem 0 0;
        right: 0
    }

    .shikuang-lineRight .shikuang-ball {
        margin: -.4rem 0 0 -.933333rem
    }

    .ren-name {
        position: relative;
        top: 0;
        color: #333;
        display: inline-block
    }

    [data-dpr="1"] .ren-name {
        font-size: 13px
    }

    [data-dpr="2"] .ren-name {
        font-size: 26px
    }

    [data-dpr="3"] .ren-name {
        font-size: 39px
    }

    .sk-time {
        position: absolute;
        top: 0;
        width: .933333rem;
        color: #999
    }

    [data-dpr="1"] .sk-time {
        font-size: 14px
    }

    [data-dpr="2"] .sk-time {
        font-size: 28px
    }

    [data-dpr="3"] .sk-time {
        font-size: 42px
    }

    .shikuang-lineLeft .sk-time {
        right: -1.4rem;
        top: -.4rem;
        text-align: left
    }

    .shikuang-lineRight .sk-time {
        margin: -.4rem 0 0 -1.933333rem;
        text-align: right
    }

    .shikuang-line li.jh-box {
        min-height: 1.466667rem
    }

    .shikuang-lineRight .jh {
        margin: 0 .293333rem 0 0
    }

    .shikuang-lineLeft .jh {
        margin: 0 0 0 .293333rem
    }

    [data-dpr="1"] .jh {
        font-size: 13px
    }

    [data-dpr="2"] .jh {
        font-size: 26px
    }

    [data-dpr="3"] .jh {
        font-size: 39px
    }

    .black-ball,
    .dian-ball,
    .jiaohuan,
    .red-ball,
    .wuxiao-ball {
        width: .8rem;
        height: .8rem;
        display: inline-block
    }
    .wuxiao-ball {
        background-position: center -5.186667rem
    }
    .black-ball {
        background-position: center -1.72rem
    }

    .dian-ball {
        background-position: center -2.586667rem
    }

    .red-ball {
        background-position: center -4.32rem
    }

    .wuxiao-ball {
        background-position: center -5.186667rem
    }

    .lineH30 {
        line-height: .266667rem;
        display: inline-block
    }

    .jiaohuan {
        background-position: center -3.453333rem
    }

    .red-yellow-card {
        position: relative;
        top: .2rem
    }

    .shikuang-line li.d-zt-box {
        margin-bottom: .746667rem;
        height: 1.066667rem;
        background: 0 0;
        border: none;
        width: 1.06667rem;
        clear: both
    }

    .shikuang-line li.d-zt-box:first-child {
        margin-top: -1.066666rem
    }

    .green-arrow,
    .red-arrow {
        width: .8rem;
        height: .733333rem;
        display: inline-block;
        position: absolute;
        top: 0
    }

    .shikuang-lineLeft .green-arrow,
    .shikuang-lineLeft .red-arrow {
        right: 0
    }

    .shikuang-lineRight .green-arrow,
    .shikuang-lineRight .red-arrow {
        left: 0
    }

    .green-arrow {
        background-position: center -5.986667rem
    }

    .red-arrow {
        background-position: center -6.72rem
    }
    .dianqiu,
    .jinqiu,
    .wulong,
    .wuxiao {
        width: .746667rem;
        height: .33rem;
        padding-top: .03rem;
        line-height: .36rem;
        border-radius: .053333rem;
        color: #fff;
        text-align: center;
        display: inline-block;
        position: relative;
        top: 0
    }

    [data-dpr="1"] .dianqiu,
    [data-dpr="1"] .jinqiu,
    [data-dpr="1"] .wulong,
    [data-dpr="1"] .wuxiao {
        font-size: 11px
    }

    [data-dpr="2"] .dianqiu,
    [data-dpr="2"] .jinqiu,
    [data-dpr="2"] .wulong,
    [data-dpr="2"] .wuxiao {
        font-size: 22px
    }

    [data-dpr="3"] .dianqiu,
    [data-dpr="3"] .jinqiu,
    [data-dpr="3"] .wulong,
    [data-dpr="3"] .wuxiao {
        font-size: 33px
    }

    .shikuang-lineLeft code {
        margin-left: .213333rem
    }

    .shikuang-lineRight code {
        margin-right: .213333rem
    }

    .jinqiu {
        background: #0bcd0b
    }

    .dianqiu {
        background: #ff9000
    }

    .wuxiao {
        background: #b5b5b5
    }

    .wulong {
        background: #f54141
    }


    .jh dd {
        border-bottom: 1px solid #e2e2e2;
        line-height: .733333rem;
        position: relative
    }

    .jh dd:last-child {
        border-bottom: 0;
        color: #8c96a0
    }
    .shikuang-lineLeft .jh dd {
        padding-right: .8rem
    }

    .shikuang-lineRight .jh dd {
        padding-left: .8rem
    }

    .red-yellow-card em,
    .yellow-card {
        background: #ffe91f
    }
    .red-card,
    .red-yellow-card,
    .yellow-card {
        margin: 0 auto;
        width: .293333rem;
        height: .346667rem;
        display: block; position: relative;
        top: .24rem
    }
    .sk-intro {
        background: #fff;
        padding: .28rem 1.293333rem;
        text-align: center
    }
    .d-zt {
        width: 1.066667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #d0d0d0;
        text-align: center;
        border-radius: .503333rem .503333rem;
        color: #333;
        display: inline-block;
        background: #fff;
        position: relative;
        left: -.533333rem
    }

    [data-dpr="1"] .d-zt {
        font-size: 13px
    }

    [data-dpr="2"] .d-zt {
        font-size: 26px
    }

    [data-dpr="3"] .d-zt {
        font-size: 39px
    }
    .red-card,.red-yellow-card{background:#ff3d10}

</style>
