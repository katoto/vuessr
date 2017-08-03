<template>
    <div class="popBox l-full l-flex-column ">
        <div class="popTopbar"  v-tap="{methods: closeDialog}"></div>
        <div class="popInner">
            <div class="full-scroll l-full l-scroll-y">
                <div class="popDetail" v-for="item,index in probability.detail">
                    <h4 class="popTit">{{item.company}}</h4>
                    <ul class="dataItem dataItem-tit">
                        <li class="itemL">近10场</li>
                        <li class="itemC">对阵</li>
                        <li class="itemR">初赔/终赔</li>
                    </ul>
                    <ul class="dataItem" v-for="info,idx in item.table" v-if="shouldShowAll[index]||idx<5">
                        <li class="itemL">
                            <div>{{info.simpleleague}}</div>
                            <div>{{info.matchdate.substring(2,10)}}</div>
                        </li>
                        <li class="itemC">
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                <tr>
                                    <td width="40%">{{info.homesxname|truncate(4,'')}}</td>
                                    <td width="10%" class="textcenter">{{info.homescore}}</td>
                                    <td><span class="state" :class="{'red': info.result == 0, 'green': info.result == 1, 'blue': info.result == 2}"> {{['主胜', '平', '主负'][info.result]||'--'}}</span></td>
                                </tr>
                                <tr>
                                    <td>{{info.awaysxname|truncate(4,'')}}</td>
                                    <td class="textcenter">{{info.awayscore}}</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </li>
                        <li class="itemR">
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                <tr>
                                    <td>{{item.first[0]&&(item.first[0]-0).toFixed(2)||'--'}}</td>
                                    <td>{{item.first[1]&&(item.first[1]-0).toFixed(2)||'--'}}</td>
                                    <td>{{item.first[2]&&(item.first[2]-0).toFixed(2)||'--'}}</td>
                                </tr>

                                <tr>
                                    <td>{{info.win&&(info.win-0).toFixed(2)||'--'}}</td>
                                    <td>{{info.draw&&(info.draw-0).toFixed(2)||'--'}}</td>
                                    <td>{{info.lost&&(info.lost-0).toFixed(2)||'--'}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                    <div class="more" :class="{'more-up': shouldShowAll[index]}" v-tap="{methods: () => shouldShowAll[index] = !shouldShowAll[index]}"><i class="zd-arrow"></i></div>
                </div>

                <div class="sk-btips">500彩票网提示：<br> 以上数据仅供参考，请以官方公布的数据为准
                </div>
            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">历史样本详情</h2>
        </div>
    </div>
</template>
<script>
    import {mTypes} from '~store/zqdetail'
    export default {
        props: ['params'],
        data () {
            return {
                shouldShowAll: {}
            }
        },
        methods: {
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            },
            switchTab ({tab}) {
                this.tab = tab
            }
        },
        created () {
            let showAll = {}
            Object.keys(this.probability.detail).forEach(key => {
                showAll[key] = false
            })
            this.shouldShowAll = showAll
        },
        computed: {
            probability () {
                return this.params.probability
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            }
        },
        filters: {
            truncate: (val, num, tail) => {
                if (val.length > num) {
                    return val.substr(0, num) + (tail || '...')
                } else {
                    return val
                }
            }
        }

    }
</script>

<style scoped>
    .popBox .popLayer{z-index:2}
    .popBox{position:fixed;left:0;top:0;right:0;bottom:0;z-index:91;color:#242c35;overflow:hidden}
    .popBox .l-flex-column{position:relative;z-index:5}
    .popTopbar{height:1.173333rem;width:100%}
    .popInner{background:#fff;display:block;border-radius:.186667rem .186667rem 0 0;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;overflow:hidden}
    .popInner .full-scroll{overflow-x:hidden;border-radius:.186667rem .186667rem 0 0}
    .popBox .popTit{color:#a9abad;margin-top:.533333rem}

    .popDetail{padding:0 .4rem}
    .box-yc .popDetail .dataItem .itemC,.popDetail .dataItem li{color:#242c35}
    .popDetail .dataItem .itemL{padding-left:0;width:2.933333rem}
    .popDetail .dataItem .itemC{text-align:left}
    .popDetail .dataItem .itemR{padding-right:0;width:2.4rem;position:relative}
    .popDetail .fx-table tr:nth-child(2) td{padding-top:0}
    .popDetail .dataItem td{height:.666667rem}
    .popDetail .dataItem td .state{display:inline-block;width:.666667rem;height:.346667rem;line-height:.346667rem;color:#fff;border-radius:.04rem;text-align:center;margin-left:.266667rem;position:relative;top:-.026667rem}
    [data-dpr="1"] .popDetail .dataItem td .state{font-size:10px}
    [data-dpr="2"] .popDetail .dataItem td .state{font-size:20px}
    [data-dpr="3"] .popDetail .dataItem td .state{font-size:30px}
    .popDetail .dataItem td .state.red{background:#d25138}
    .popDetail .dataItem td .state.green{background:#36a171}
    .popDetail .dataItem td .state.blue{background:#437ba8}
    .popDetail .dataItem td .state.gray{background:#efefef;color:#acaeb0}
    .popDetail .dataItem .itemL div{height:.666667rem;line-height:.666667rem}
    .popDetail .dataItem li{height:1.733333rem}
    .popDetail .dataItem-tit{height:.8rem;margin-bottom:-.266667rem}
    .popDetail .dataItem-tit li{color:#aab5bd;height:.8rem}
    [data-dpr="1"] .popDetail .dataItem-tit li{font-size:11px}
    [data-dpr="2"] .popDetail .dataItem-tit li{font-size:22px}
    [data-dpr="3"] .popDetail .dataItem-tit li{font-size:33px}
    .box-yc .popDetail .dataItem-tit .itemC{color:#aab5bd}
    .popDetail .chart-similar{height:100%;margin-left:.266667rem}
    .popDetail .fx-table{margin-top:.4rem}
    .popFooter{border-top:1px solid #e8e8e8;background:#fff;width:100%;height:1.32rem;text-align:center;position:relative}
    .popFooter:active{background:#eee}
    .popFooter h2{display:inline-block;margin:0 auto;padding:0 .133333rem;white-space:nowrap;line-height:1.32rem;color:#242c35}

    .popBox .sk-btips{background:#fff}

    .popDetail .more{height:.8rem;text-align:center;position:relative}
    .popDetail .more .zd-arrow{display:inline-block}
    .popDetail .more-up .zd-arrow{transform:rotate(180deg);-webkit-transform:rotate(180deg)}
    .arrow{overflow:hidden;height:.333333rem;width:.6rem;position:absolute;left:.4rem;top:.493333rem}
    .arrow:before{content:'';height:.16rem;width:.16rem;display:block;border:.053333rem solid #333;border-right-width:0;border-top-width:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);position:absolute;bottom:.093333rem;left:.093333rem}

    .dataItem{display:table;height:1.333333rem;width:100%}
    .dataItem li{display:table-cell;color:#515e6d;vertical-align:middle;height:1.733333rem}
    .dataItem .itemL{text-align:left;width:2.8rem;padding-left:.4rem}
    .dataItem .itemC{text-align:center;color:#aab5bd}
    .dataItem .itemR{text-align:right;width:2.8rem;padding-right:.4rem}
    [data-dpr="1"] .dataItem .num{font-size:23px}
    [data-dpr="2"] .dataItem .num{font-size:46px}
    [data-dpr="3"] .dataItem .num{font-size:69px}
    [data-dpr="1"] .box-yc .dataItem .num{font-size:27px}
    [data-dpr="2"] .box-yc .dataItem .num{font-size:54px}
    [data-dpr="3"] .box-yc .dataItem .num{font-size:81px}
    .dataItem .blue{color:#437ba8}
    /*网站说明*/
    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
    }


</style>
