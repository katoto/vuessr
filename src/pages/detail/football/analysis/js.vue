<template>
    <div>

        <div class="gl-box">
            <div class="gl-nav">战力特征对比</div>
            <template v-if="strengthInfo&&strengthInfo.total_info">
                <div class="zhzl-box" v-tap="{methods: ()=>strengthInfoContentVisible = !strengthInfoContentVisible}">
                    <div class="zhzl-title">综合战力</div>
                    <div class="zhzl-vs">
                        <div class="zhzl-l" :class="{'zhzl-green': strengthInfo.total_info.home_percent >= strengthInfo.total_info.away_percent, 'zhzl-gray':strengthInfo.total_info.home_percent < strengthInfo.total_info.away_percent}"
                             :style="{width: strengthInfo.total_info.home_percent+'%'}">
                            <div class="wua">
                                <div class="hh"></div>
                            </div>
                        </div>
                        <div class="zhzl-r" :class="{'zhzl-green': strengthInfo.total_info.home_percent < strengthInfo.total_info.away_percent, 'zhzl-gray': strengthInfo.total_info.home_percent >= strengthInfo.total_info.away_percent}"
                             :style="{width: strengthInfo.total_info.away_percent +'%'}">
                            <div class="wua">
                                <div class="hh"></div>
                            </div>
                        </div>
                    </div>
                    <div class="zhzl-bfb-left"><span>{{strengthInfo.total_info.home_percent}}</span><i>%</i></div>
                    <div class="zhzl-bfb-right"><span>{{strengthInfo.total_info.away_percent}}</span><i>%</i></div>
                </div>
                <div class="zhedie" :class="{show: strengthInfoContentVisible, hide: !strengthInfoContentVisible}">
                    <ul class="zhzl-list">
                        <li class="responsive" v-if="strengthInfo.confrontation">
                            <div class="zhzl-left">{{strengthInfo.confrontation.home_win}}胜{{strengthInfo.confrontation.home_draw}}平{{strengthInfo.confrontation.home_lost}}负</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">交锋</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left" :class="{'green-bg':strengthInfo.confrontation.home_percent > strengthInfo.confrontation.away_percent,'gray-bg':strengthInfo.confrontation.home_percent <= strengthInfo.confrontation.away_percent}"
                                             :style="{width:strengthInfo.confrontation.home_percent+ '%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':strengthInfo.confrontation.home_percent < strengthInfo.confrontation.away_percent,'gray-bg':strengthInfo.confrontation.home_percent >= strengthInfo.confrontation.away_percent}"
                                             :style="{width:strengthInfo.confrontation.away_percent+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{strengthInfo.confrontation.away_win}}胜{{strengthInfo.confrontation.away_draw}}平{{strengthInfo.confrontation.away_lost}}负</div>
                        </li>
                        <li class="responsive" v-if="strengthInfo.recent_record">
                            <div class="zhzl-left">{{strengthInfo.recent_record.home_win}}胜{{strengthInfo.recent_record.home_draw}}平{{strengthInfo.recent_record.home_lost}}负</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">近况</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left" :class="{'green-bg':strengthInfo.recent_record.home_percent > strengthInfo.recent_record.away_percent,'gray-bg':strengthInfo.recent_record.home_percent <= strengthInfo.recent_record.away_percent}"
                                             :style="{width:strengthInfo.recent_record.home_percent+ '%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':strengthInfo.recent_record.home_percent < strengthInfo.recent_record.away_percent,'gray-bg':strengthInfo.recent_record.home_percent >= strengthInfo.recent_record.away_percent}"
                                             :style="{width:strengthInfo.recent_record.away_percent+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{strengthInfo.recent_record.away_win}}胜{{strengthInfo.recent_record.away_draw}}平{{strengthInfo.recent_record.away_lost}}负</div>
                        </li>
                        <li class="responsive" v-if="strengthInfo.same_home_away">
                            <div class="zhzl-left">{{strengthInfo.same_home_away.home_win}}胜{{strengthInfo.same_home_away.home_draw}}平{{strengthInfo.same_home_away.home_lost}}负</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">主客</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left" :class="{'green-bg':strengthInfo.same_home_away.home_percent > strengthInfo.same_home_away.away_percent,'gray-bg':strengthInfo.same_home_away.home_percent <= strengthInfo.same_home_away.away_percent}"
                                             :style="{width:strengthInfo.same_home_away.home_percent+ '%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':strengthInfo.same_home_away.home_percent < strengthInfo.same_home_away.away_percent,'gray-bg':strengthInfo.same_home_away.home_percent >= strengthInfo.same_home_away.away_percent}"
                                             :style="{width:strengthInfo.same_home_away.away_percent+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{strengthInfo.same_home_away.away_win}}胜{{strengthInfo.same_home_away.away_draw}}平{{strengthInfo.same_home_away.away_lost}}负</div>
                        </li>
                        <li class="responsive" v-if="strengthInfo.attack_info">
                            <div class="zhzl-left">场均进{{strengthInfo.attack_info.home_avg_score}}球</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">攻击</div>
                                <div class="responsive">

                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left" :class="{'green-bg':strengthInfo.attack_info.home_percent > strengthInfo.attack_info.away_percent,'gray-bg':strengthInfo.attack_info.home_percent <= strengthInfo.attack_info.away_percent}"
                                             :style="{width:strengthInfo.attack_info.home_percent+ '%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':strengthInfo.attack_info.home_percent < strengthInfo.attack_info.away_percent,'gray-bg':strengthInfo.attack_info.home_percent >= strengthInfo.attack_info.away_percent}"
                                             :style="{width:strengthInfo.attack_info.away_percent+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">场均进{{strengthInfo.attack_info.away_avg_score}}球</div>
                        </li>
                        <li class="responsive" v-if="strengthInfo.defense_info">
                            <div class="zhzl-left">场均失{{strengthInfo.defense_info.home_avg_score}}球</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">防守</div>
                                <div class="responsive">

                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left" :class="{'green-bg':strengthInfo.defense_info.home_percent > strengthInfo.defense_info.away_percent,'gray-bg':strengthInfo.defense_info.home_percent <= strengthInfo.defense_info.away_percent}"
                                             :style="{width:strengthInfo.defense_info.home_percent+ '%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':strengthInfo.defense_info.home_percent < strengthInfo.defense_info.away_percent,'gray-bg':strengthInfo.defense_info.home_percent >= strengthInfo.defense_info.away_percent}"
                                             :style="{width:strengthInfo.defense_info.away_percent+'%'}"></div>
                                    </div>

                                </div>
                            </div>
                            <div class="zhzl-right">场均失{{strengthInfo.defense_info.away_avg_score}}球</div>
                        </li>
                        <li class="responsive" v-if="strengthInfo.team_worth">
                            <div class="zhzl-left">€{{strengthInfo.team_worth.home_worth}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">身价</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left" :class="{'green-bg':strengthInfo.team_worth.home_percent > strengthInfo.team_worth.away_percent,'gray-bg':strengthInfo.team_worth.home_percent <= strengthInfo.team_worth.away_percent}"
                                             :style="{width:strengthInfo.team_worth.home_percent+ '%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':strengthInfo.team_worth.home_percent < strengthInfo.team_worth.away_percent,'gray-bg':strengthInfo.team_worth.home_percent >= strengthInfo.team_worth.away_percent}"
                                             :style="{width:strengthInfo.team_worth.away_percent+'%'}"></div>
                                    </div>

                                </div>
                            </div>
                            <div class="zhzl-right">€{{strengthInfo.team_worth.away_worth}}</div>
                        </li>
                    </ul>
                    <div class="zhzl-tips">数据来自主客队战绩{{strengthInfo.team_worth?'及球队身价':''}}统计</div>
                </div>
                <div class="box-arrow noborder" onclick="_hmt.push(['_trackEvent','zq_detail','click','analysis_js_zl'])" v-tap="{methods: ()=>strengthInfoContentVisible = !strengthInfoContentVisible}">
                    <div class="zd-arrow" :class="{rotate180: strengthInfoContentVisible}"></div>
                </div>
            </template>
            <div class="feed-back" v-if="strengthInfo&&!strengthInfo.total_info">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <item-loader v-if="!strengthInfo"></item-loader>

        </div>
        <div class="gl-box">
            <div class="gl-nav"> <span class="i-po">场面控制（场均）</span> </div>

            <template v-if="compareInfo&&compareInfo.scene_ctrl">
                <div class="dataBox">
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.scene_ctrl.ballcontral_rate.home}}</em>
                            <span class="numSub">%</span>
                        </li>
                        <li class="itemC">
                            <span>控球率</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.scene_ctrl.ballcontral_rate.away}}</em>
                            <span class="numSub">%</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.scene_ctrl.attack_times.home}}</em>
                            <span class="numSub">次</span>
                        </li>
                        <li class="itemC">
                            <span>进攻次数</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.scene_ctrl.attack_times.away}}</em>
                            <span class="numSub">次</span>
                        </li>
                    </ul>
                </div>
                <div class="infoTips" v-if="compareInfo.scene_ctrl.presentations">
                    <i class="icon"></i>
                    <p class="f24">{{compareInfo.scene_ctrl.presentations}}</p>
                </div>
            </template>
            <div class="feed-back" v-if="compareInfo&&!compareInfo.scene_ctrl">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <item-loader v-if="!compareInfo"></item-loader>

        </div>


        <div class="gl-box" >
            <div class="gl-nav"> <span class="i-po">攻防特征（场均）</span> </div>
            <template v-if="compareInfo&&compareInfo.attack_defense">
                <div class="dataBox">
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.attack_defense.attack_efficiency.home}}</em>
                            <span>次/球</span>
                        </li>
                        <li class="itemC">
                            <span>进攻效率</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.attack_defense.attack_efficiency.away}}</em>
                            <span>次/球</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.attack_defense.shoot_times.home}}</em>
                            <span>次</span>
                        </li>
                        <li class="itemC">
                            <span>射门次数</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.attack_defense.shoot_times.away}}</em>
                            <span>次</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.attack_defense.defense_efficiency.home}}</em>
                            <span>次/球</span>
                        </li>
                        <li class="itemC">
                            <span>防守效率</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.attack_defense.defense_efficiency.away}}</em>
                            <span>次/球</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.attack_defense.shootby_times.home}}</em>
                            <span>次</span>
                        </li>
                        <li class="itemC">
                            <span>被射门次数</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.attack_defense.shootby_times.away}}</em>
                            <span>次</span>
                        </li>
                    </ul>
                </div>
                <div class="infoTips" v-if="compareInfo.attack_defense.presentations">
                    <i class="icon"></i>
                    <p class="f24">{{compareInfo.attack_defense.presentations}}</p>
                </div>
            </template>


            <div class="feed-back" v-if="compareInfo&&!compareInfo.attack_defense">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <item-loader v-if="!compareInfo"></item-loader>
        </div>
        <div class="gl-box" >
            <div class="gl-nav"> <span class="i-po">半全场</span> </div>
            <template v-if="compareInfo&&compareInfo.full_half">
                <div class="dataBox">
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.full_half.upper_goals.home}}</em>
                            <span>球</span>
                        </li>
                        <li class="itemC">
                            <span>上半场进球</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.full_half.upper_goals.away}}</em>
                            <span>球</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.full_half.upper_losts.home}}</em>
                            <span>球</span>
                        </li>
                        <li class="itemC">
                            <span>上半场失球</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.full_half.upper_losts.away}}</em>
                            <span>球</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.full_half.lower_goals.home}}</em>
                            <span>球</span>
                        </li>
                        <li class="itemC">
                            <span>下半场进球</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.full_half.lower_goals.away}}</em>
                            <span>球</span>
                        </li>
                    </ul>
                    <ul class="dataItem">
                        <li class="itemL">
                            <em class="num">{{compareInfo.full_half.lower_losts.home}}</em>
                            <span>球</span>
                        </li>
                        <li class="itemC">
                            <span>下半场失球</span>
                        </li>
                        <li class="itemR">
                            <em class="num">{{compareInfo.full_half.lower_losts.away}}</em>
                            <span>球</span>
                        </li>
                    </ul>
                </div>
                <div class="infoTips" v-if="compareInfo.full_half.presentations">
                    <i class="icon"></i>
                    <p class="f24">{{compareInfo.full_half.presentations}}</p>
                </div>
            </template>


            <div class="feed-back" v-if="compareInfo&&!compareInfo.full_half">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <item-loader v-if="!compareInfo"></item-loader>
        </div>
        <div class="gl-box jishu-sjtj" >
            <div class="gl-nav">事件统计</div>
            <template v-if="compareInfo&&compareInfo.evt_statistic">
                <div class="zhedie">
                    <ul class="zhzl-list">
                        <li class="responsive">
                            <div class="zhzl-left">{{compareInfo.evt_statistic.foul_times.home}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">场均犯规</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left"
                                             :class="{'green-bg':compareInfo.evt_statistic.foul_times.hper>compareInfo.evt_statistic.foul_times.aper,'gray-bg':compareInfo.evt_statistic.foul_times.hper<compareInfo.evt_statistic.foul_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.foul_times.hper+'%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':compareInfo.evt_statistic.foul_times.hper<compareInfo.evt_statistic.foul_times.aper,'gray-bg':compareInfo.evt_statistic.foul_times.hper>compareInfo.evt_statistic.foul_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.foul_times.aper+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{compareInfo.evt_statistic.foul_times.away}}</div>
                        </li>
                        <li class="responsive">
                            <div class="zhzl-left">{{compareInfo.evt_statistic.red_yellow_times.home}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">场均红黄牌</div>
                                <div class="responsive">

                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left"
                                             :class="{'green-bg':compareInfo.evt_statistic.red_yellow_times.hper>compareInfo.evt_statistic.red_yellow_times.aper,'gray-bg':compareInfo.evt_statistic.red_yellow_times.hper<compareInfo.evt_statistic.red_yellow_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.red_yellow_times.hper+'%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':compareInfo.evt_statistic.red_yellow_times.hper<compareInfo.evt_statistic.red_yellow_times.aper,'gray-bg':compareInfo.evt_statistic.red_yellow_times.hper>compareInfo.evt_statistic.red_yellow_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.red_yellow_times.aper+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{compareInfo.evt_statistic.red_yellow_times.away}}</div>
                        </li>
                        <li class="responsive">
                            <div class="zhzl-left">{{compareInfo.evt_statistic.corner_times.home}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">场均角球</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left"
                                             :class="{'green-bg':compareInfo.evt_statistic.corner_times.hper>compareInfo.evt_statistic.corner_times.aper,'gray-bg':compareInfo.evt_statistic.corner_times.hper<compareInfo.evt_statistic.corner_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.corner_times.hper+'%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':compareInfo.evt_statistic.corner_times.hper<compareInfo.evt_statistic.corner_times.aper,'gray-bg':compareInfo.evt_statistic.corner_times.hper>compareInfo.evt_statistic.corner_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.corner_times.aper+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{compareInfo.evt_statistic.corner_times.away}}</div>
                        </li>
                        <li class="responsive">
                            <div class="zhzl-left">{{compareInfo.evt_statistic.free_times.home}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">场均任意球</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left"
                                             :class="{'green-bg':compareInfo.evt_statistic.free_times.hper>compareInfo.evt_statistic.free_times.aper,'gray-bg':compareInfo.evt_statistic.free_times.hper<compareInfo.evt_statistic.free_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.free_times.hper+'%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':compareInfo.evt_statistic.free_times.hper<compareInfo.evt_statistic.free_times.aper,'gray-bg':compareInfo.evt_statistic.free_times.hper>compareInfo.evt_statistic.free_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.free_times.aper+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{compareInfo.evt_statistic.free_times.away}}</div>
                        </li>
                        <li v-if="compareInfo.evt_statistic.jz_red_yellow_times || compareInfo.evt_statistic.jz_foul_times">
                            <div class="jiaozhanX"></div>
                        </li>
                        <li class="responsive" v-if="compareInfo.evt_statistic.jz_foul_times">
                            <div class="zhzl-left">{{compareInfo.evt_statistic.jz_foul_times.home}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">交战场均犯规</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left"
                                             :class="{'green-bg':compareInfo.evt_statistic.jz_foul_times.hper>compareInfo.evt_statistic.jz_foul_times.aper,'gray-bg':compareInfo.evt_statistic.jz_foul_times.hper<compareInfo.evt_statistic.jz_foul_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.jz_foul_times.hper+'%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':compareInfo.evt_statistic.jz_foul_times.hper<compareInfo.evt_statistic.jz_foul_times.aper,'gray-bg':compareInfo.evt_statistic.jz_foul_times.hper>compareInfo.evt_statistic.jz_foul_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.jz_foul_times.aper+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{compareInfo.evt_statistic.jz_foul_times.away}}</div>
                        </li>
                        <li class="responsive" v-if="compareInfo.evt_statistic.jz_red_yellow_times">
                            <div class="zhzl-left">{{compareInfo.evt_statistic.jz_red_yellow_times.home}}</div>
                            <div class="each-resone">
                                <div class="zhzl-classify">交战场均红黄牌</div>
                                <div class="responsive">
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-left"
                                             :class="{'green-bg':compareInfo.evt_statistic.jz_red_yellow_times.hper>compareInfo.evt_statistic.jz_red_yellow_times.aper,'gray-bg':compareInfo.evt_statistic.jz_red_yellow_times.hper<compareInfo.evt_statistic.jz_red_yellow_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.jz_red_yellow_times.hper+'%'}"></div>
                                    </div>
                                    <div class="each-resone l-relative">
                                        <div class="zhzl-vs-right" :class="{'green-bg':compareInfo.evt_statistic.jz_red_yellow_times.hper<compareInfo.evt_statistic.jz_red_yellow_times.aper,'gray-bg':compareInfo.evt_statistic.jz_red_yellow_times.hper>compareInfo.evt_statistic.jz_red_yellow_times.aper}"
                                             :style="{width:compareInfo.evt_statistic.jz_red_yellow_times.aper+'%'}"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="zhzl-right">{{compareInfo.evt_statistic.jz_red_yellow_times.away}}</div>
                        </li>
                    </ul>
                </div>
                <div class="infoTips" v-if="compareInfo.evt_statistic.presentations">
                    <i class="icon"></i>
                    <p class="f24">{{compareInfo.evt_statistic.presentations}}</p>
                </div>
            </template>

            <div class="feed-back" v-if="compareInfo&&!compareInfo.evt_statistic">
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
            <item-loader v-if="!compareInfo"></item-loader>
        </div>
        <skbtips></skbtips>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import skbtips from '~components/detail/skbtips.vue'
    import itemLoader from '~components/detail/itemLoader.vue'
    export default {
        async asyncData ({store, route: {params}}) {
            const {stageid, matchtime, homeid, awayid, league_id} = store.state.zqdetail.baseInfo
            const matchdate = matchtime.substr(0, 10)
            await store.dispatch(aTypes.getAnalysisJs, {
                homeid,
                awayid,
                stid: stageid,
                matchdate,
                fid: params.fid,
                leagueid: league_id
            })
        },
        data () {
            return {
                strengthInfoContentVisible: false
            }
        },
        components: {
            skbtips, itemLoader
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let baseInfo = this.$store.state.zqdetail.baseInfo
                if (!baseInfo || this.$store.state.zqdetail.baseInfo.fid !== this.$route.params.fid) {
                    baseInfo = await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                }
                const {stageid, matchtime, homeid, awayid, league_id} = baseInfo
                const matchdate = matchtime.substr(0, 10)
                await this.$store.dispatch(aTypes.getAnalysisJs, {
                    homeid,
                    awayid,
                    stid: stageid,
                    matchdate,
                    fid: this.$route.params.fid,
                    leagueid: league_id
                })
                this.$store.commit('endOneRefresh')
            },
            toggleFightingInfoResultType () {
                const arr = ['result1', 'result2', 'result3']
                let idx = arr.indexOf(this.fightingInfoResultType)
                this.fightingInfoResultType = arr[(idx + 1) % 3]
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
            js () {
                return this.$store.state.zqdetail.analysis.js
            },
            strengthInfo () {
                return this.js.strength
            },
            compareInfo () {
                return this.js.compare
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

    .zhzl-vs div:first-child.zhzl-green .hh {
        border-top: .16rem solid #5c788f;
        border-right: .16rem solid transparent;
        right: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        z-index: 1
    }

    .zhzl-vs div:last-child.zhzl-green .hh {
        border-top: .17rem solid #5c788f;
        border-left: .16rem solid transparent;
        left: -.13rem;
        position: absolute;
        content: '';
        width: 0;
        height: 0
    }

    .zhzl-gray .hh {
        border: 0
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
    .wua {
        position: relative;
        width: 100%;
        height: .16rem
    }
.show{
    display: block;}
    .zhzl-list {
        margin: .533333rem .4rem 0
    }

    .zhzl-list li {
        height: 1.08rem
    }

    .responsive {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
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
    .green-bg,
    .zhzl-green {
        background: #5c788f
    }

    .zhzl-vs-left,.zhzl-vs-right{height:.106667rem;position:absolute;top:0;}
    .zhzl-vs-left{right:0;margin-right:.04rem}


    .gray-bg,
    .zhzl-gray {
        background: #bcd0de
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
    .zhzl-tips {
        color: rgba(170, 181, 189, .5);
        text-align: center
    }

    [data-dpr="1"] .zhzl-tips {
        font-size: 10px
    }

    [data-dpr="2"] .zhzl-tips {
        font-size: 20px
    }

    [data-dpr="3"] .zhzl-tips {
        font-size: 30px
    }

    .box-arrow {
        height: 1.066667rem;
        position: relative
    }

    .box-arrow:active {
        background: #f4f4f4
    }
    .zd-arrow {
        background: url(~assets/style/images/detail/detail-icon.png) no-repeat;
        background-size: .533333rem 13.333333rem
    }
    .zd-arrow {
        width: .533333rem;
        height: .177rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -.2rem 0 0 -.266667rem;
        background-position: center -10.84rem
    }
    .rotate180{
        transition: all .2s linear;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
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
        font-size: 23px
    }

    [data-dpr="2"] .dataItem .num {
        font-size: 46px
    }

    [data-dpr="3"] .dataItem .num {
        font-size: 69px
    }
    .infoTips {
        padding: .266667rem .4rem;
        line-height: .533333rem;
        color: #515e6d;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-top: 1px solid #f4f4f4
    }

    .infoTips .icon {
        display: block;
        width: .88rem;
        height: .293333rem;
        background: url(~assets/style/images/detail/icon_sprite.png) no-repeat -.613333rem 0;
        background-size: 1.92rem;
        margin-top: .106667rem
    }
    .infoTips p {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding-left: .213333rem
    }
    .jishu-sjtj .zhzl-left,
    .jishu-sjtj .zhzl-right,
    .tongji-box .zhzl-left,
    .tongji-box .zhzl-right {
        width: 1.066667rem
    }

    [data-dpr="1"] .jishu-sjtj .zhzl-left,
    [data-dpr="1"] .jishu-sjtj .zhzl-right,
    [data-dpr="1"] .tongji-box .zhzl-left,
    [data-dpr="1"] .tongji-box .zhzl-right {
        font-size: 13px
    }

    [data-dpr="2"] .jishu-sjtj .zhzl-left,
    [data-dpr="2"] .jishu-sjtj .zhzl-right,
    [data-dpr="2"] .tongji-box .zhzl-left,
    [data-dpr="2"] .tongji-box .zhzl-right {
        font-size: 26px
    }

    [data-dpr="3"] .jishu-sjtj .zhzl-left,
    [data-dpr="3"] .jishu-sjtj .zhzl-right,
    [data-dpr="3"] .tongji-box .zhzl-left,
    [data-dpr="3"] .tongji-box .zhzl-right {
        font-size: 39px
    }


</style>
