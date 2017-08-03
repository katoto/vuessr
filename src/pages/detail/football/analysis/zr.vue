<template>

    <div>
        <div class="zr-box">
            <div class="zj-nav">
                阵容概览
            </div>
            <div v-if="teamworth&&teamworth.coach" class="dataBox">
                <ul class="dataItem">
                    <li class="itemL">
                        <em class="num">{{teamworth.coach&&teamworth.coach.hcoach||'--'|truncate(6)}}</em>
                    </li>
                    <li class="itemC">
                        <span class="item-info">主教练</span>
                    </li>
                    <li class="itemR">
                        <em class="num">{{teamworth.coach&&teamworth.coach.acoach||'--'|truncate(6)}}</em>
                    </li>
                </ul>
                <ul class="dataItem">
                    <li class="itemL">
                        <em class="num">{{teamworth.worth&&teamworth.worth.hworth ? ('€' + teamworth.worth.hworth) :
                            '--'}}</em>
                    </li>
                    <li class="itemC">
                        <span class="item-info">球队身价</span>
                    </li>
                    <li class="itemR">
                        <em class="num">{{teamworth.worth&&teamworth.worth.aworth ? ('€' + teamworth.worth.aworth) :
                            '--'}}</em>
                    </li>
                </ul>
                <ul class="dataItem">
                    <li class="itemL">
                        <em class="num">{{teamworth.superstar&&teamworth.superstar.hsuperstar||'--'|truncate(6)}}</em>
                        <span class="item-info">{{teamworth.superstar&&teamworth.superstar.hvalue ? ('€' + teamworth.superstar.hvalue) : '--'}} {{teamworth.superstar&&teamworth.superstar.hpostion}}</span>
                    </li>
                    <li class="itemC">
                        <span class="item-info">头牌</span>
                        <em class="num">&nbsp;</em>
                    </li>
                    <li class="itemR">
                        <em class="num"> {{teamworth.superstar&&teamworth.superstar.asuperstar||'--'|truncate(6)}}</em>
                        <span class="item-info">{{teamworth.superstar&&teamworth.superstar.avalue ? ('€' + teamworth.superstar.avalue) : '--'}} {{teamworth.superstar&&teamworth.superstar.apostion}}</span>
                    </li>
                </ul>
            </div>
            <div class="feed-back" v-if="teamworth&&!teamworth.coach">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <div class="item-loader" v-if="!teamworth">
                <div class="la-ball-pulse la-2x">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="zhedie-box" v-if="formation&&formation.alineup">
            <div class="zj-nav">
                {{formation.ispre == -1 ?'上场首发' : '本场首发' }}
            </div>
            <div class="zhedie" v-if="formation.alineup">
                <div class="zuqiuc">
                    <table cellspacing="0" cellpadding="0" border="0" class="zx-table" width="100%">
                        <tbody>
                        <tr v-for="row in formation.hlineup">
                            <td>
                                <ul class="zx-ul responsive">
                                    <li class="each-resone" v-for="player in row">
                                        <span v-if="player.playernum == '' || player.playernum == null"
                                              class="person-mr"></span>
                                        <span class="person"
                                              v-if="!(player.playernum == '' || player.playernum == null)">
                                            {{player.playernum}}
                                            <img v-if="player.characterpic1" :src="player.characterpic1">
                                        </span>
                                        <br> {{player.playernum}} {{(player.playername || '')|truncate(8)}}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <table cellspacing="0" cellpadding="0" border="0" class="zx-table" width="100%">
                        <tbody>
                        <tr v-for="row in formation.alineup">
                            <td>
                                <ul class="zx-ul responsive">
                                    <li class="each-resone" v-for="player in row">
                                        <span v-if="player.playernum == null" class="person-mr"></span>
                                        <span class="person" v-if="player.playernum != null">
                                            {{player.playernum}}
                                            <img v-if="player.characterpic1" :src="player.characterpic1">
                                        </span>
                                        <br> {{player.playernum}} {{(player.playername || '')|truncate(8)}}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div class="zhu-zx">{{match.homesxname}}阵型 {{formation.hformation.split('').join('-')}}</div>
                    <div class="ke-zx">{{formation.aformation.split('').join('-')}} {{match.awaysxname}}阵型</div>
                </div>
            </div>
        </div>


        <div class="zhedie-box" v-if="lineup"
             v-for="name,type in {shoufa: '预测首发', houbei: '替补阵容', shangbing: '伤停阵容'}">
            <div class="zj-nav">
                {{name}}
            </div>
            <div class="feed-back"
                 v-if="!lineup[type] || !lineup[type].length">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <div class="zhedie" v-if="lineup[type] && lineup[type].length">
                <table width="100%" cellpadding="0" cellspacing="0" class="lq-zr">
                    <tbody>
                        <tr v-for="info in lineup[type]">
                            <td width="50%">
                                <span class="qiuhao">{{info.home.playernum}}</span>&nbsp;{{info.home.playername||''|truncate(8)}}
                                <span class="gangwei">{{info.home.rolegbname}}</span>
                            </td>
                            <td width="50%">
                                <span class="qiuhao">{{info.away.playernum}}</span>&nbsp;{{info.away.playername||''|truncate(8)}}
                                <span class="gangwei">{{info.away.rolegbname}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="sk-btips">
            500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'

    export default {
        async asyncData ({store, route: {params}}) {
            const {homeid, awayid} = store.state.zqdetail.baseInfo
            await store.dispatch(aTypes.getAnalysisZr, {
                homeid,
                awayid,
                fid: params.fid
            })
        },
        data () {
            return {
                strengthInfoContentVisible: false
            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                const {homeid, awayid} = this.$store.state.zqdetail.baseInfo
                await this.$store.dispatch(aTypes.getAnalysisZr, {
                    homeid,
                    awayid,
                    fid: this.$route.params.fid
                })
                this.$store.commit('endOneRefresh')
            }
        },
        mounted () {
            this.fetchData()
        },
        watch: {
            refreshTime () {
                this.fetchData()
            },
            loaded (loaded) {
                if (loaded) {
                    this.$store.commit(mTypes.updateScTime)
                }
            },
            strengthInfoContentVisible () {
                this.$store.commit(mTypes.updateScTime)
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            },
            zr () {
                return this.$store.state.zqdetail.analysis.zr
            },
            teamworth () {
                return this.zr.teamworth
            },
            formation () {
                return this.zr.formation
            },
            lineup () {
                return this.zr.lineup
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
<style scoped>
    .gl-box,
    .zr-box {
        background: #fff
    }
    /*小标题 start*/
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }
    /*over*/
    .dataBox {
        padding: .4rem .4rem .266667rem .4rem;
        border-bottom: 1px solid #f4f4f4;
        text-align: center
    }
    .dataItem {
        display: table;
        height: 1.333333rem;
        width: 100%
    }

    .dataItem li {
        display: table-cell;
        color: #515e6d;
        vertical-align: middle;
        height: 1.733333rem
    }

    .dataItem .itemL {
        text-align: left;
        width: 2.8rem;
        padding-left: .4rem
    }

    .dataItem .itemC {
        text-align: center;
        color: #aab5bd
    }

    .dataItem .itemR {
        text-align: right;
        width: 2.8rem;
        padding-right: .4rem
    }

    [data-dpr="1"] .dataItem .num {
        font-size:   23px
    }

    [data-dpr="2"] .dataItem .num {
        font-size: 46px
    }

    [data-dpr="3"] .dataItem .num {
        font-size: 69px
    }
    .dataItem .item-info {
        display: block;
        color: #aab5bd
    }
    .zr-box .dataItem .item-info {
        color: #aab5bd;
        display: block;
        padding-top: .026667rem
    }

    [data-dpr="1"] .zr-box .dataItem .item-info {
        font-size: 12px
    }

    [data-dpr="2"] .zr-box .dataItem .item-info {
        font-size: 24px
    }

    [data-dpr="3"] .zr-box .dataItem .item-info {
        font-size: 36px
    }
    .zr-box .dataItem,
    .zr-box .dataItem li {
        height: 1.066667rem
    }
    .zr-box .dataItem .num {
        color: #242c35
    }

    [data-dpr="1"] .zr-box .dataItem .num {
        font-size: 13px
    }

    [data-dpr="2"] .zr-box .dataItem .num {
        font-size: 26px
    }

    [data-dpr="3"] .zr-box .dataItem .num {
        font-size: 39px
    }

    .zr-box .dataItem:last-child {
        padding-top: .106667rem
    }
    .zhedie-box {
        background: #fff
    }
    .feed-back {
        width: 100%;
        height: 1.733333rem;
        background: #fff;
        border-top: 1px solid #eaeaea
    }

    .feed-box {
        color: #787878;
        line-height: 1.733333rem;
        text-align: center
    }

    [data-dpr="1"] .feed-box {
        font-size: 13px
    }

    [data-dpr="2"] .feed-box {
        font-size: 26px
    }

    [data-dpr="3"] .feed-box {
        font-size: 39px
    }
    [data-dpr="1"] .lq-zr {
        font-size: 13px
    }

    [data-dpr="2"] .lq-zr {
        font-size: 26px
    }

    [data-dpr="3"] .lq-zr {
        font-size: 39px
    }
    .lq-zr tr th {
        background: #fbfbfb;
        line-height: .8rem;
        color: #999;
        padding-left: .75rem;
        border: solid #f1f1f1;
        border-width: 1px 0;
        text-align: left;
        font-weight: 400
    }

    [data-dpr="1"] .lq-zr tr th {
        font-size: 13px
    }

    [data-dpr="2"] .lq-zr tr th {
        font-size: 26px
    }

    [data-dpr="3"] .lq-zr tr th {
        font-size: 39px
    }

    .lq-zr tr td {
        padding-left: .266667rem;
        line-height: 1.066667rem;
        height: 1.066667rem
    }

    .lq-zr tr td:first-child {
        border-right: 1px solid #f1f1f1
    }

    .lq-zr tr:first-child td {
        padding-top: .4rem
    }

    .lq-zr tr:last-child td {
        padding-bottom: .4rem
    }
    .qiuhao {
        width: .4rem;
        text-align: center;
        display: inline-block
    }

    [data-dpr="1"] .qiuhao {
        font-size: 10.5px
    }

    [data-dpr="2"] .qiuhao {
        font-size: 21px
    }

    [data-dpr="3"] .qiuhao {
        font-size: 31.5px
    }
    .gangwei {
        color: #aab5bd;
        padding-right: .266667rem;
        float: right
    }

    [data-dpr="1"] .gangwei {
        font-size: 10.5px
    }

    [data-dpr="2"] .gangwei {
        font-size: 21px
    }

    [data-dpr="3"] .gangwei {
        font-size: 31.5px
    }
    /*底部文字 start*/

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
    /*over*/
    .refresh-box {
        width: 1.066667rem;
        height: 1.066667rem;
        position: fixed;
        bottom: 1.706667rem;
        right: .533333rem;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: .9;
        z-index: 9;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg)
    }
    .refresh-icon {
        width: 1.066667rem;
        height: 1.066667rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAq1BMVEX2Pz8AAAD2Pz/2Pz//+fn+8PD90tL2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/+8vL7q6v4YWH3S0v2Pz/2Pz/6ior5e3v2Pz/8w8P5hIT5fX32Pz//9/f+4eH8t7f6kpL4b2/4amr3XV32Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/8xcX/+/v+6en+5eX9y8v4cXH2RET2Pz/2Pz/2Pz/2Pz/8wsL///8dBChgAAAAOHRSTlPZAAi//vv1yDwb0LSE/O3f3GVd5+S68uXkzf348Oji4d6poZ2OTBHCfk5EE/L++vn04tp6QiMP8qyEnYEAAAKKSURBVFjDrNPZdqpAEIXhnUZlTEAUCQ44mxgznQxr5f2f7HQHMkhV04L57tTml0ILF/V2Tny78m0Pnp34q9vY2RkuqAuKt1cfhP/6JloFnY0HDW/jNA2K2EItKxYNgqJvw8jui1ODWwsnsbYnBd01TrZ2zcF9hgayvSEoAjQUiLrgYYnGlgd90E3QQuLqgu83aOXmnQ+6qteu6HLBXYLWkh0NiiXOsBQkGOAsQTW4x5n2x0E3w5ky9yi4hlZEXvDWv4Nb6AzvO91rlK67nfshdLY/QWGBl04+pC5KXfVqkoJnie9gH6xFTwWOg0pvAVb/KyhscNJx2fsZuSyOB+DYogzG4FwVF49y/JKPinevwInLoAXGtJguREVYPIcpGFYRdLT315mBMeto79H5DG5ADdQ1l3Ow5pfq0wGojQoKD8RirHohNEJVHC9AeEIG70D11Lw5tHI1dQ/UnQwGIFI10gw1ZupECiKQwQTEhHw/O8MERHKBA4jhhxSiVqjODEEc4IAYqf8zOOZDDugeR+qJ/4NBrn63iO4zAnbiRxg9sjMHWLFLMoXRlF2XFXxUPXNrwC/TM6p82Kh6kifnMJrLY0+ospGhSu1VBKNIbSddPlAP8uQLjF7ksQdQ3l8H7b8e+X9zZowDIAhDUWMHo4wuHoEQFwfw/jczjhooUt4gB+hC+/v/q8CfgrcN3tj46OHi0CVfe0a+ugR2ywgsvQLwJYWvUXzR01aEN0u8nasbzsfMHKdqOHVLvBosMW/a+VjBBx8+mvHhkY+3fADnEQEPMXjMcr8otnoSi6jKWeq5uQzTkgWmJRX3+dZ6fqwAydAGJAONTGGoS2NnGIyz6P4Px4XX+WNYpk/njwuTZnCjF4SGqAAAAABJRU5ErkJggg==) center center no-repeat;
        background-size: 1.066667rem;
        display: inline-block
    }


</style>