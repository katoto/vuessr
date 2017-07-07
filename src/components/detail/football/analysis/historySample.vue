<template>
    <div class="popBox l-full l-flex-column ">
        <div class="popTopbar"  v-tap="{methods: closeDialog}"></div>
        <div class="popInner">
            <div class="full-scroll">
                <div class="popDetail" v-for="item,index in probability.detail">
                    <h4 class="popTit">{{item.company}}</h4>
                    <ul class="dataItem dataItem-tit">
                        <li class="itemL">近10场</li>
                        <li class="itemC">对阵</li>
                        <li class="itemR">初赔/终赔</li>
                    </ul>
                    <ul class="dataItem" v-for="info in item.table">
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
                    <div class="more" :class="{'more-up': true}" drunk-on="click: shouldShowAll.$set(index, !shouldShowAll[index])"><i class="zd-arrow"></i></div>
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
                tab: 'history',
                panTimeMap: ['初赔', '赛前24h', '赛前12h', '赛前6h', '赛前5h', '赛前4h', '赛前3h', '赛前2.5h', '赛前2h', '赛前1.5h', '赛前1h', '赛前0.5h', '终赔']
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
