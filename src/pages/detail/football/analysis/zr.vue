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
            let baseInfo = store.state.zqdetail.baseInfo
            if (!baseInfo || store.state.zqdetail.baseInfo.fid !== params.fid) {
                baseInfo = await store.dispatch(aTypes.getBaseInfo, params.fid)
            }
            const {homeid, awayid} = baseInfo
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
                let baseInfo = this.$store.state.zqdetail.baseInfo
                if (!baseInfo || this.$store.state.zqdetail.baseInfo.fid !== this.$route.params.fid) {
                    baseInfo = await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                }
                const {homeid, awayid} = baseInfo
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
