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
        <skbtips></skbtips>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import skbtips from '~components/detail/skbtips.vue'
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
        components: {
            skbtips
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


</style>