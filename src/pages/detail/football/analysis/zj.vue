<template>
    <div>
        <div class="zhedie-box"
             v-if="leagueRank && leagueRank.hometeam && leagueRank.hometeam.home && leagueRank.hometeam.home.matches_count">
            <div class="zj-nav">
                {{ leagueRank.issame == '1'?leagueRank.title:''}} 联赛积分排名
                <ul class="volumeTab" id="tabBefore">
                    <li :class="{'cur':leagueRankTan==='all'}" v-tap="{methods: ()=>leagueRankTan='all'}">全部</li>
                    <li :class="{'cur':leagueRankTan==='sab'}" v-tap="{methods: ()=>leagueRankTan='sab'}">主客</li>
                </ul>
            </div>
            <div class="zhedie show" v-if="leagueRankTan==='all'">
                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb">
                    <tbody>
                    <tr>
                        <th colspan="2">排名</th>
                        <th width="18%">赛事</th>
                        <th width="10%">赛</th>
                        <th width="15%">胜/平/负</th>
                        <th width="12%">进/失</th>
                        <th width="12%">积分</th>
                    </tr>
                    <tr>
                        <td>{{leagueRank.hometeam.all&&leagueRank.hometeam.all.standing}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.homelogo">{{match.homesxname}}</div>
                        </td>
                        <td>{{leagueRank.hometeam.leaguename}}</td>
                        <td>{{leagueRank.hometeam.all&&leagueRank.hometeam.all.matches_count||'--'}}</td>
                        <td>
                            {{leagueRank.hometeam.all&&[leagueRank.hometeam.all.win,leagueRank.hometeam.all.draw,leagueRank.hometeam.all.lost].join('/')||'--'}}
                        </td>

                        <td>{{leagueRank.hometeam.all&&[leagueRank.hometeam.all.innum,
                            leagueRank.hometeam.all.lostnum].join('/')||'--'}}
                        </td>
                        <td>
                            <p class="textcenter">{{leagueRank.hometeam.all&&leagueRank.hometeam.all.score||'--'}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>{{leagueRank.awayteam.all&&leagueRank.awayteam.all.standing}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.awaylogo">{{match.awaysxname}}</div>
                        </td>
                        <td>{{leagueRank.awayteam.leaguename}}</td>
                        <td>{{leagueRank.awayteam.all&&leagueRank.awayteam.all.matches_count||'--'}}</td>
                        <td>
                            {{leagueRank.awayteam.all&&[leagueRank.awayteam.all.win,leagueRank.awayteam.all.draw,leagueRank.awayteam.all.lost].join('/')||'--'}}
                        </td>
                        <td>{{leagueRank.awayteam.all&&[leagueRank.awayteam.all.innum,
                            leagueRank.awayteam.all.lostnum].join('/')||'--'}}
                        </td>
                        <td>
                            <p class="textcenter">{{leagueRank.awayteam.all&&leagueRank.awayteam.all.score||'--'}}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="zhedie show" v-if="leagueRankTan==='sab'">
                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb">
                    <tbody>
                    <tr>
                        <th colspan="2">排名</th>

                        <th width="18%">赛事</th>
                        <th width="10%">赛</th>
                        <th width="15%">胜/平/负</th>
                        <th width="12%">进/失</th>
                        <th width="12%">积分</th>
                    </tr>
                    <tr>
                        <td>{{leagueRank.hometeam.home&&leagueRank.hometeam.home.standing}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.homelogo">{{match.homesxname}}</div>
                        </td>
                        <td>{{leagueRank.hometeam.leaguename}}</td>
                        <td>{{leagueRank.hometeam.home&&leagueRank.hometeam.home.matches_count||'--'}}</td>
                        <td>
                            {{leagueRank.hometeam.home&&[leagueRank.hometeam.home.win,leagueRank.hometeam.home.draw,leagueRank.hometeam.home.lost].join('/')||'--'}}
                        </td>
                        <td>
                            {{leagueRank.hometeam.home&&[leagueRank.hometeam.home.innum,leagueRank.hometeam.home.lostnum].join('/')||'--'}}
                        </td>
                        <td>
                            <p class="textcenter">{{leagueRank.hometeam.home&&leagueRank.hometeam.home.score||'--'}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>{{leagueRank.awayteam.away&&leagueRank.awayteam.away.standing}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.awaylogo">{{match.awaysxname}}</div>
                        </td>
                        <td>{{leagueRank.awayteam.leaguename}}</td>
                        <td>{{leagueRank.awayteam.away&&leagueRank.awayteam.away.matches_count||'--'}}</td>
                        <td>
                            {{leagueRank.awayteam.away&&[leagueRank.awayteam.away.win,leagueRank.awayteam.away.draw,leagueRank.awayteam.away.lost].join('/')||'--'}}
                        </td>
                        <td>
                            {{leagueRank.awayteam.away&&[leagueRank.awayteam.away.innum,leagueRank.awayteam.away.lostnum].join('/')||'--'}}
                        </td>
                        <td>
                            <p class="textcenter">{{leagueRank.awayteam.away&&leagueRank.awayteam.away.score||'--'}}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>


        <div class="inte-look zhedie" v-if="leagueRank && leagueRank.issame === '1'">完整积分榜&gt;</div>
        <!--<div class="inte-look zhedie" v-if="leagueRank.issame == '1'" onclick="location.href='match_center/index.html#/footballleague/integral/{{match.seasonid}}'">完整积分榜&gt;</div>-->

        <div class="zhedie-box zhedie-box-wl" v-if="cupRank && cupRank.length && match.stagemode==='2'">
            <div class="zj-nav">
                {{match.simpleleague}}{{match.stagename}}-{{match.matchgroup}}组-赛前积分排名
            </div>

            <div class="zhedie show">
                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb">
                    <tbody>
                    <tr>
                        <th colspan="2"></th>
                        <th width="12%">赛</th>
                        <th width="15%">胜/平/负</th>
                        <th width="15%">进/失</th>
                        <th width="12%">净</th>
                        <th width="10%">积分</th>
                    </tr>
                    <tr :class="{'vs-ing': info.teamid == match.homeid || info.teamid == match.awayid}"
                        v-for="info in cupRank">
                        <td>{{info.standing}}</td>
                        <td>
                            <div class="rank-team"><img :src="info.teamlogo">{{info.sxname}}</div>
                        </td>
                        <td>{{info.matches_count}}</td>
                        <td>{{info.win_count}}/{{info.draw_count}}/{{info.lost_count}}</td>
                        <td>{{info.innum}}/{{info.lostnum}}</td>
                        <td>{{info.diff}}</td>
                        <td><p class="textcenter">{{info.score}}</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="inte-look zhedie">完整积分榜&gt;</div>
            <!--<div class="inte-look zhedie"  onclick="location.href='match_center/index.html#/footballleague/integral/{{match.seasonid}}'">完整积分榜&gt;</div>-->

        </div>

        <div class="zhedie-box zhedie-box-wl" v-if="FIFARank && FIFARank.home && FIFARank.away">
            <div class="zj-nav">
                国际足联排名
            </div>
            <div class="zhedie show">
                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                    <tbody>
                    <tr>
                        <th colspan="2"></th>

                        <th width="14%">排名变化</th>
                        <th width="14%">积分</th>
                        <th width="14%">积分变化</th>
                        <th width="18%">日期</th>
                    </tr>
                    <tr>
                        <td>{{FIFARank.home[0].rank}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.homelogo">{{match.homesxname}}</div>
                        </td>
                        <td>{{FIFARank.home[0].rankchange > 0 ? '+' : ''}}{{FIFARank.home[0].rankchange}}</td>
                        <td>{{FIFARank.home[0].point}}</td>
                        <td>{{FIFARank.home[0].pointchange > 0 ? '+' : ''}}{{FIFARank.home[0].pointchange}}</td>
                        <td>{{FIFARank.home[0].date}}</td>
                    </tr>
                    <tr>
                        <td>{{FIFARank.away[0].rank}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.awaylogo">{{match.awaysxname}}</div>
                        </td>
                        <td>{{FIFARank.away[0].rankchange > 0 ? '+' : ''}}{{FIFARank.away[0].rankchange}}</td>
                        <td>{{FIFARank.away[0].point}}</td>
                        <td>{{FIFARank.away[0].pointchange > 0 ? '+' : ''}}{{FIFARank.away[0].pointchange}}</td>
                        <td>{{FIFARank.away[0].date}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>


        <div class="zhedie-box" v-if="fightingInfo">
            <div class="zj-nav" drunk-init-data="fightingInfoHidden = false">
            <span class="saixuan"
                  onclick="_hmt.push(['_trackEvent','zq_detail','click','analysis_zj_ls'])"
                  drunk-on="click: filterVisible = true, currFilterOptions = fightingFilterOptions, $event.stopPropagation()">筛选</span>
                历史交战
            </div>

            <div class="zhedie" v-if="fightingInfo && fightingInfo.matches">
                <div class="zd-detail">
                    <div class="gaik clear">
                        <span class="f30 color3 fl">近{{fightingInfo.all_matches.all_count||0}}场交战&nbsp;&nbsp;&nbsp;{{match.homesxname}}</span>

                        <span class="f30 fl">
                        <i class="win tcell">{{fightingInfo.all_matches.win_count||'0'}}胜</i>
                        <i class="tie tcell">{{fightingInfo.all_matches.draw_count||'0'}}平</i>
                        <i class="lose tcell">{{fightingInfo.all_matches.lost_count||'0'}}负</i>
                    </span>
                        <span class="f30 color3 fl">
                        胜率{{fightingInfo.all_matches.win_rate||'0'}}%
                    </span>
                    </div>

                    <div class="total-tips">
                        场均净胜{{fightingInfo.all_matches.avar_gd||0}}球，场均总进{{fightingInfo.all_matches.avar_all||0}}球，
                        大球{{fightingInfo.all_matches.big_ball||0}}次，小球{{fightingInfo.all_matches.small_ball||0}}次
                    </div>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                    <colgroup>
                        <col width="20%">
                        <col width="22%">
                        <col width="18%">
                        <col width="22%">
                        <col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>赛事</th>
                        <th>
                            <div class="textright">主队</div>
                        </th>
                        <th>比分</th>
                        <th>
                            <div class="textleft">客队</div>
                        </th>
                        <th>{{ {'result1': '赛果', 'result2': '盘路', 'result3': '大小'}[fightingInfoResultType] }}</th>
                    </tr>
                    <tr v-for="info in fightingInfo.matches">
                        <td>
                            <span class="color9">{{info.simplegbname}}</span><span class="colorc f20">{{info.matchdate.slice(2)}}</span>
                        </td>
                        <td>
                            <div class="textright"
                                 :class="{win: info.homeid == match.homeid && info.result1 == '胜', lose: info.homeid == match.homeid && info.result1 == '负', tie: info.homeid == match.homeid && info.result1 == '平'}">
                                <span class="color9" v-if="info.homestanding && info.homestanding != 0">[{{info.homestanding}}]</span>{{info.homesxname|truncate(4)}}
                            </div>
                        </td>
                        <td>{{info.homescore}}:{{info.awayscore}}<span class="color9">({{info.homehalfscore}}:{{info.awayhalfscore}})</span>
                        </td>
                        <td>
                            <div class="textleft"
                                 :class="{win: info.awayid== match.homeid && info.result1 == '胜', lose: info.awayid== match.homeid && info.result1 == '负', tie: info.awayid== match.homeid && info.result1 == '平'}">
                                {{info.awaysxname|truncate(4)}}
                                <span class="color9" v-if="info.awaystanding && info.awaystanding != 0">[{{info.awaystanding}}]</span>
                            </div>
                        </td>
                        <td onclick="_hmt.push(['_trackEvent','zq_detail','click','analysis_zj_ls2'])"
                            v-tap="{methods:toggleFightingInfoResultType}">
                            <div v-if="fightingInfoResultType == 'result1'"
                                 :class="{'red-k': info.result1 == '胜', 'blue-k': info.result1 == '负', 'green-k': info.result1 == '平', 'gray-k': !info.result1}">
                                {{info.result1||'--'}}
                            </div>
                            <div v-if="fightingInfoResultType == 'result2'"
                                 :class="{'red-k': info.result2 == '赢', 'blue-k': info.result2 == '输', 'green-k': info.result2 == '走', 'gray-k': !info.result2}">
                                {{(info.handicapline > 0 ? '+' : '') + info.handicapline}}&nbsp;{{info.result2||'--'}}
                            </div>
                            <div v-if="fightingInfoResultType == 'result3'"
                                 :class="{'red-k': info.result3 == '大', 'blue-k': info.result3 == '小', 'gray-k': !info.result3}">
                                {{info.result3||'--'}}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="zhedie-box" v-if="recentRecord">
            <div class="zj-nav" drunk-init-data="recentRecordHidden = false">
                <span class="saixuan"
                      drunk-on="click: filterVisible = true, currFilterOptions = recentRecordFilterOptions, $event.stopPropagation()">筛选</span>
                近期战绩
            </div>

            <!--<widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !recentRecordHidden && recentRecordNoData" message="很抱歉，没有数据"
                                type="no-data" text-type>
            </widget-prompt-view>-->

            <div class="zhedie">
                <div class="zd-detail">
                    <div class="gaik clear">
                        <span class="f30 color3 fl">近{{recentRecord.home.all_matches.all_count||0}}场 {{match.homesxname}}</span>

                        <span class="f30 fl">
                            <i class="win tcell">{{recentRecord.home.all_matches.win_count||'0'}}胜</i>
                            <i class="tie tcell">{{recentRecord.home.all_matches.draw_count||'0'}}平</i>
                            <i class="lose tcell">{{recentRecord.home.all_matches.lost_count||'0'}}负</i>
                        </span>

                        <span class="f30 color3 fl">
                            胜率{{recentRecord.home.all_matches.win_rate||'0'}}%
                        </span>
                    </div>
                    <div class="total-tips">
                        场均进{{recentRecord.home.all_matches.avar_get||0}}球，场均失{{recentRecord.home.all_matches.avar_lost||0}}球，
                        大球{{recentRecord.home.all_matches.big_ball||0}}次，小球{{recentRecord.home.all_matches.small_ball||0}}次
                    </div>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                    <colgroup>
                        <col width="20%">
                        <col width="22%">
                        <col width="18%">
                        <col width="22%">
                        <col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>赛事</th>
                        <th>
                            <div class="textright">主队</div>
                        </th>
                        <th>比分</th>
                        <th>
                            <div class="textleft">客队</div>
                        </th>
                        <th>{{ {'result1': '赛果', 'result2': '盘路', 'result3': '大小'}[recentRecordResultType_home] }}</th>
                    </tr>
                    <!--<tr v-for="info in recentRecord.home.matches|filterBy:recentRecordFilterOptions,homeRecentRecordShowAll">-->
                    <tr v-for="info,idx in recentRecord.home.matches" v-if="homeRecentRecordShowAll || idx < 6">
                        <td>
                            <span class="color9">{{info.simplegbname}}</span><span class="colorc f20">{{info.matchdate.slice(2)}}</span>
                        </td>
                        <td>
                            <div class="textright"
                                 :class="{win: info.homeid == match.homeid && info.result1 == '胜', lose: info.homeid == match.homeid && info.result1 == '负', tie: info.homeid == match.homeid && info.result1 == '平'}">
                                <span class="color9" v-if="info.homestanding && info.homestanding != 0">[{{info.homestanding}}]</span>{{info.homesxname|truncate(4)}}
                            </div>
                        </td>
                        <td>{{info.homescore}}:{{info.awayscore}}<span class="color9">({{info.homehalfscore}}:{{info.awayhalfscore}})</span>
                        </td>
                        <td>
                            <div class="textleft"
                                 :class="{win: info.awayid == match.homeid && info.result1 == '胜', lose: info.awayid == match.homeid && info.result1 == '负', tie: info.awayid == match.homeid && info.result1 == '平'}">
                                {{info.awaysxname|truncate(4)}}<span class="color9"
                                                                     v-if="info.awaystanding && info.awaystanding != 0">[{{info.awaystanding}}]</span>
                            </div>
                        </td>
                        <td v-tap="{methods: toggleRecentRecordResultType_home}">
                            <div v-if="recentRecordResultType_home == 'result1'"
                                 :class="{'red-k': info.result1 == '胜', 'blue-k': info.result1 == '负', 'green-k': info.result1 == '平', 'gray-k': !info.result1}">
                                {{info.result1||'--'}}
                            </div>
                            <div v-if="recentRecordResultType_home == 'result2'"
                                 :class="{'red-k': info.result2 == '赢', 'blue-k': info.result2 == '输', 'green-k': info.result2 == '走', 'gray-k': !info.result2}">
                                {{(info.handicapline > 0 ? '+' : '') + info.handicapline}}&nbsp;{{info.result2||'--'}}
                            </div>
                            <div v-if="recentRecordResultType_home == 'result3'"
                                 :class="{'red-k': info.result3 == '大', 'blue-k': info.result3 == '小', 'gray-k': !info.result3}">
                                {{info.result3||'--'}}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="box-arrow" v-if="recentRecord.home.matches.length > 6"
                     v-tap="{methods: ()=> homeRecentRecordShowAll =! homeRecentRecordShowAll}">
                    <div class="zd-arrow" :class="{rotate180: homeRecentRecordShowAll}"></div>
                </div>
                <!--<widget-prompt-view src="widget/prompt.html" v-if="!isRequesting && !recentRecordHidden && (!recentRecord.home.matches || !recentRecord.home.matches.length || recentRecord.home.matches == 0)"
                                    message="很抱歉，没有数据" type="no-data" text-type>
                </widget-prompt-view>-->

                <div class="zd-detail">
                    <div class="gaik clear">
                        <span class="f30 color3 fl">近{{recentRecord.away.all_matches.all_count||0}}场 {{match.awaysxname}}</span>

                        <span class="f30 fl">
                <i class="win tcell">{{recentRecord.away.all_matches.win_count||'0'}}胜</i>
                <i class="tie tcell">{{recentRecord.away.all_matches.draw_count||'0'}}平</i>
                <i class="lose tcell">{{recentRecord.away.all_matches.lost_count||'0'}}负</i>
            </span>

                        <span class="f30 color3 fl">
                胜率{{recentRecord.away.all_matches.win_rate|default:'0'}}%
            </span>
                    </div>
                    <div class="total-tips">
                        场均进{{recentRecord.away.all_matches.avar_get|default:0}}球，场均失{{recentRecord.away.all_matches.avar_lost|default:0}}球，
                        大球{{recentRecord.away.all_matches.big_ball|default:0}}次，小球{{recentRecord.away.all_matches.small_ball|default:0}}次
                    </div>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                    <colgroup>
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>赛事</th>
                        <th>
                            <div class="textright">主队</div>
                        </th>
                        <th>比分</th>
                        <th>
                            <div class="textleft">客队</div>
                        </th>
                        <th>{{ {'result1': '赛果', 'result2': '盘路', 'result3': '大小'}[recentRecordResultType_away] }}</th>
                    </tr>
                    <!--<tr drunk-repeat="info in recentRecord.away.matches|filterBy:recentRecordFilterOptions,awayRecentRecordShowAll,true">-->
                    <tr v-for="info,idx in recentRecord.away.matches" v-if="awayRecentRecordShowAll || idx < 6">
                        <td>
                            <span class="color9">{{info.simplegbname}}</span><span class="colorc f20">{{info.matchdate.slice(2)}}</span>
                        </td>
                        <td>
                            <div class="textright"
                                 :class="{win: info.homeid == match.awayid && info.result1 == '胜', lose: info.homeid == match.awayid && info.result1 == '负', tie: info.homeid == match.awayid && info.result1 == '平'}">
                                <span class="color9" v-if="info.homestanding && info.homestanding != 0">[{{info.homestanding}}]</span>{{info.homesxname|truncate(4)}}
                            </div>
                        </td>
                        <td>{{info.homescore}}:{{info.awayscore}}<span class="color9">({{info.homehalfscore}}:{{info.awayhalfscore}})</span>
                        </td>
                        <td>
                            <div class="textleft"
                                 :class="{win: info.awayid == match.awayid && info.result1 == '胜', lose: info.awayid == match.awayid && info.result1 == '负', tie: info.awayid == match.awayid && info.result1 == '平'}">
                                {{info.awaysxname|truncate(4)}}<span class="color9"
                                                                     v-if="info.awaystanding && info.awaystanding != 0">[{{info.awaystanding}}]</span>
                            </div>
                        </td>
                        <td v-tap="{methods: toggleRecentRecordResultType_away}">
                            <div v-if="recentRecordResultType_away == 'result1'"
                                 :class="{'red-k': info.result1 == '胜', 'blue-k': info.result1 == '负', 'green-k': info.result1 == '平', 'gray-k': !info.result1}">
                                {{info.result1||'--'}}
                            </div>
                            <div v-if="recentRecordResultType_away == 'result2'"
                                 :class="{'red-k': info.result2 == '赢', 'blue-k': info.result2 == '输', 'green-k': info.result2 == '走', 'gray-k': !info.result2}">
                                {{(info.handicapline > 0 ? '+' : '') + info.handicapline}}&nbsp;{{info.result2||'--'}}
                            </div>
                            <div v-if="recentRecordResultType_away == 'result3'"
                                 :class="{'red-k': info.result3 == '大', 'blue-k': info.result3 == '小', 'gray-k': !info.result3}">
                                {{info.result3||'--'}}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="box-arrow" v-if="recentRecord.away.matches.length > 6"
                     v-tap="{methods: ()=> awayRecentRecordShowAll = !awayRecentRecordShowAll}">
                    <div class="zd-arrow" :class="{rotate180: awayRecentRecordShowAll}"></div>
                </div>
                <!--<widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !recentRecordHidden && (!recentRecord.away.matches || !recentRecord.away.matches.length ||
            recentRecord.away.matches == 0)" message="很抱歉，没有数据" type="no-data" text-type>
                </widget-prompt-view>-->
            </div>


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
            const {stageid, matchtime, homeid, awayid, matchgroup} = baseInfo
            const matchdate = matchtime.substr(0, 10)
            await store.dispatch(aTypes.getAnalysisZj, {
                homeid,
                awayid,
                stid: stageid,
                matchdate,
                matchgroup,
                fid: params.fid,
                rleagueid: -1,
                rlimit: 10,
                rhoa: 0,
                jzleagueid: -1,
                jzlimit: 6,
                jzhoa: 0
            })
        },
        data () {
            return {
                leagueRankTan: 'all',
                fightingInfoResultType: 'result1',
                homeRecentRecordShowAll: false,
                awayRecentRecordShowAll: false,

                recentRecordResultType_home: 'result1',
                recentRecordResultType_away: 'result1',
                rcOption: {
                    rleagueid: -1,
                    rlimit: 10,
                    rhoa: 0
                },
                jzOption: {
                    jzleagueid: -1,
                    jzlimit: 6,
                    jzhoa: 0
                }

            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let baseInfo = this.$store.state.zqdetail.baseInfo
                if (!baseInfo || this.$store.state.zqdetail.baseInfo.fid !== this.$route.params.fid) {
                    baseInfo = await this.$store.dispatch(aTypes.getBaseInfo, this.$route.params.fid)
                }
                const {stageid, matchtime, homeid, awayid, matchgroup} = baseInfo
                const matchdate = matchtime.substr(0, 10)
                await this.$store.dispatch(aTypes.getAnalysisZj, {
                    homeid,
                    awayid,
                    stid: stageid,
                    matchdate,
                    matchgroup,
                    fid: this.$route.params.fid,
                    rleagueid: this.rcOption.rleagueid,
                    rlimit: this.rcOption.rlimit,
                    rhoa: this.rcOption.rhoa,
                    jzleagueid: this.jzOption.jzleagueid,
                    jzlimit: this.jzOption.jzlimit,
                    jzhoa: this.jzOption.jzhoa
                })
                this.$store.commit('endOneRefresh')
            },
            toggleFightingInfoResultType () {
                const arr = ['result1', 'result2', 'result3']
                let idx = arr.indexOf(this.fightingInfoResultType)
                this.fightingInfoResultType = arr[(idx + 1) % 3]
            },
            toggleRecentRecordResultType_away () {
                const arr = ['result1', 'result2', 'result3']
                let idx = arr.indexOf(this.recentRecordResultType_away)
                this.recentRecordResultType_away = arr[(idx + 1) % 3]
            },
            toggleRecentRecordResultType_home () {
                const arr = ['result1', 'result2', 'result3']
                let idx = arr.indexOf(this.recentRecordResultType_home)
                this.recentRecordResultType_home = arr[(idx + 1) % 3]
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
            homeRecentRecordShowAll () {
                this.$store.commit(mTypes.updateScTime)
            },
            awayRecentRecordShowAll () {
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
            zj () {
                return this.$store.state.zqdetail.analysis.zj
            },
            leagueRank () {
                return this.zj.leaguerank
            },
            cupRank () {
                return this.zj.cuprank
            },
            FIFARank () {
                return this.zj.fifarank
            },
            fightingInfo () {
                return this.zj.jzdata
            },
            recentRecord () {
                return this.zj.recentRecord
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
