<template>
    <div>
        <div class="zhedie-box" v-if="leagueRank && leagueRank.hometeam && leagueRank.hometeam.home">
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
                        <td>{{leagueRank.hometeam.leaguename||'--'}}</td>
                        <td>{{leagueRank.hometeam.all&&leagueRank.hometeam.all.matches_count || '--'}}</td>
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
                        <td>{{leagueRank.awayteam.leaguename || '--'}}</td>
                        <td>{{leagueRank.awayteam.all&&leagueRank.awayteam.all.matches_count || '--'}}</td>
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
                        <td>{{leagueRank.hometeam.home&&leagueRank.hometeam.home.matches_count}}</td>
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
                        <td>{{leagueRank.awayteam.away&&leagueRank.awayteam.away.matches_count}}</td>
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



        <div class="inte-look zhedie" v-if="leagueRank && leagueRank.issame === '1'" v-tap="{methods: ()=>{$router.push('/center/footballmatch/'+match.seasonid+'/integral')}}">完整积分榜></div>

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
            <div class="inte-look zhedie" v-tap="{methods: ()=>{$router.push('/center/footballmatch/'+match.seasonid+'/integral')}}">完整积分榜&gt;</div>
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
                        <td>{{FIFARank.home[0]&&FIFARank.home[0].rank}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.homelogo">{{match.homesxname}}</div>
                        </td>
                        <td>{{FIFARank.home[0]&&FIFARank.home[0].rankchange > 0 ? '+' :
                            ''}}{{FIFARank.home[0]&&FIFARank.home[0].rankchange}}
                        </td>
                        <td>{{FIFARank.home[0]&&FIFARank.home[0].point}}</td>
                        <td>{{FIFARank.home[0]&&FIFARank.home[0].pointchange > 0 ? '+' :
                            ''}}{{FIFARank.home[0]&&FIFARank.home[0].pointchange}}
                        </td>
                        <td>{{FIFARank.home[0]&&FIFARank.home[0].date}}</td>
                    </tr>
                    <tr>
                        <td>{{FIFARank.away[0]&&FIFARank.away[0].rank}}</td>
                        <td>
                            <div class="rank-team"><img :src="match.awaylogo">{{match.awaysxname}}</div>
                        </td>
                        <td>{{FIFARank.away[0]&&FIFARank.away[0].rankchange > 0 ? '+' :
                            ''}}{{FIFARank.away[0]&&FIFARank.away[0].rankchange}}
                        </td>
                        <td>{{FIFARank.away[0]&&FIFARank.away[0].point}}</td>
                        <td>{{FIFARank.away[0]&&FIFARank.away[0].pointchange > 0 ? '+' :
                            ''}}{{FIFARank.away[0]&&FIFARank.away[0].pointchange}}
                        </td>
                        <td>{{FIFARank.away[0]&&FIFARank.away[0].date}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>


        <div class="zhedie-box" v-if="fightingInfo">
            <div class="zj-nav">
            <span class="saixuan" v-tap="{methods: beginFilter, type: 'his'}" data-p2="zq_detail"
                  data-p4="analysis_zj_ls"
                  >筛选</span>
                历史交战
            </div>
            <div class="zhedie" v-if="fightingInfo.matches">
                <div class="zd-detail" v-if="fightingInfo.all_matches">
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
                            data-p2="zq_detail"  data-p4="analysis_zj_ls2"
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
            <feed-back-no-data v-else></feed-back-no-data>
        </div>


        <div class="zhedie-box" v-if="recentRecord">
            <div class="zj-nav">
                <span class="saixuan" v-tap="{methods: beginFilter, type: 'recent'}">筛选</span>
                近期战绩
            </div>

            <div class="zhedie" v-if="recentRecord.home && recentRecord.home.all_matches">
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

                <div class="box-arrow" v-if="recentRecord.home.matches && recentRecord.home.matches.length > 6"
                     v-tap="{methods: ()=> homeRecentRecordShowAll =! homeRecentRecordShowAll}">
                    <div class="zd-arrow" :class="{rotate180: homeRecentRecordShowAll}"></div>
                </div>
                <!--<widget-prompt-view src="widget/prompt.html" v-if="!isRequesting && !recentRecordHidden && (!recentRecord.home.matches || !recentRecord.home.matches.length || recentRecord.home.matches == 0)"
                                    message="很抱歉，没有数据" type="no-data" text-type>
                </widget-prompt-view>-->

                <div class="zd-detail" v-if="recentRecord.away.all_matches">
                    <div class="gaik clear">
                        <span class="f30 color3 fl">近{{recentRecord.away.all_matches.all_count||0}}场 {{match.awaysxname}}</span>

                        <span class="f30 fl">
                            <i class="win tcell">{{recentRecord.away.all_matches.win_count||'0'}}胜</i>
                            <i class="tie tcell">{{recentRecord.away.all_matches.draw_count||'0'}}平</i>
                            <i class="lose tcell">{{recentRecord.away.all_matches.lost_count||'0'}}负</i>
                        </span>

                        <span class="f30 color3 fl">胜率{{recentRecord.away.all_matches.win_rate||'0'}}%</span>
                    </div>
                    <div class="total-tips">
                        场均进{{recentRecord.away.all_matches.avar_get||0}}球，场均失{{recentRecord.away.all_matches.avar_lost||0}}球，
                        大球{{recentRecord.away.all_matches.big_ball||0}}次，小球{{recentRecord.away.all_matches.small_ball||0}}次
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
                <div class="box-arrow" v-if="recentRecord.away.matches && recentRecord.away.matches.length > 6"
                     v-tap="{methods: ()=> awayRecentRecordShowAll = !awayRecentRecordShowAll}">
                    <div class="zd-arrow" :class="{rotate180: awayRecentRecordShowAll}"></div>
                </div>
                <!--<widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !recentRecordHidden && (!recentRecord.away.matches || !recentRecord.away.matches.length ||
            recentRecord.away.matches == 0)" message="很抱歉，没有数据" type="no-data" text-type>
                </widget-prompt-view>-->
            </div>
            <feed-back-no-data v-else></feed-back-no-data>

        </div>

        <div class="zhedie-box zhedie-box-wl" v-if="futureMatch">
            <div class="zj-nav">
                未来赛事
            </div>
            <div class="zhedie">

                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                    <tbody>
                    <tr>
                        <th width="22%"><span class="color3 f28">{{match.homesxname}}</span></th>
                        <th width="20%">日期</th>
                        <th width="17%">
                            <div class="textright">主队</div>
                        </th>
                        <th width="7%"></th>
                        <th width="17%">
                            <div class="textleft">客队</div>
                        </th>
                        <th>相隔</th>
                    </tr>
                    <tr v-for="futureMatchInfo in futureMatch.home">
                        <td>{{futureMatchInfo.simpleleague| truncate(4)}}</td>
                        <td>{{futureMatchInfo.matchdate}}</td>
                        <td>
                            <div class="textright">{{futureMatchInfo.homesxname|truncate(4)}}</div>
                        </td>
                        <td>vs</td>
                        <td>
                            <div class="textleft">{{futureMatchInfo.awaysxname|truncate(4)}}</div>
                        </td>
                        <td>{{futureMatchInfo.xdays}}</td>
                    </tr>

                    </tbody>
                </table>
                <div class="ui-empty-font"  v-if="!futureMatch.home || !futureMatch.home.length">
                    暂无数据
                </div>
                <!--<widget-prompt-view
                        src="widget/prompt.html"
                        text-type
                        drunk-if="!isRequesting && !(futureMatch.home && futureMatch.home.length > 0)"
                        extra-text="很抱歉，没有数据"
                        type="no-data">
                </widget-prompt-view>-->

                <table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
                    <tbody>
                    <tr>
                        <th width="22%"><span class="color3 f28">{{match.awaysxname}}</span></th>
                        <th width="20%">日期</th>
                        <th width="17%">
                            <div class="textright">主队</div>
                        </th>
                        <th width="7%"></th>
                        <th width="17%">
                            <div class="textleft">客队</div>
                        </th>
                        <th>相隔</th>
                    </tr>
                    <tr v-for="futureMatchInfo in futureMatch.away">
                        <td>{{futureMatchInfo.simpleleague| truncate(4)}}</td>
                        <td>{{futureMatchInfo.matchdate}}</td>
                        <td>
                            <div class="textright">{{futureMatchInfo.homesxname| truncate(4)}}</div>
                        </td>
                        <td>vs</td>
                        <td>
                            <div class="textleft">{{futureMatchInfo.awaysxname |truncate(4)}}</div>
                        </td>
                        <td>{{futureMatchInfo.xdays}}</td>
                    </tr>

                    </tbody>

                </table>
                <div class="ui-empty-font"  v-if="!futureMatch.away || !futureMatch.away.length">暂无数据</div>
            </div>


        </div>

        <div class="zhedie-box" v-if="macauNews">
            <div class="zj-nav">
                澳门心水推荐
            </div>
            <template v-if="macauNews.name">
                <div class="zhedie show" v-if="macauNews && macauNews.stars !== undefined">
                    <div class="pm-namel">
                        <span>{{macauNews.name}}</span>&nbsp;
                        <span class="suggest-status">{{macauNews.result}}</span>
                        <span class="suggest-power">信心指数</span>
                        <span class="suggest-stars">
            <i v-for="i in macauNews.stars" class="ico-star ico-star-active"></i>
            <i v-for="i in (5 - macauNews.stars)" class="ico-star"></i>
            </span>
                    </div>
                    <div class="macao-txt">
                        <p>{{macauNews.description}}</p>
                    </div>
                </div>
            </template>
            <div class="ui-empty-font"  v-else>
                暂无数据
            </div>
        </div>
        <skbtips v-if="leagueRank"></skbtips>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'

    import Filter from '~components/detail/football/analysis/filter.vue'
    import skbtips from '~components/detail/skbtips.vue'
    import feedBackNoData from '~components/detail/feedBackNoData.vue'
    export default {
        async asyncData ({store, route: {params}}) {
            const {stageid, matchtime, homeid, awayid, matchgroup} = store.state.zqdetail.baseInfo
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
        components: {
            skbtips, feedBackNoData
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
                    leagueid: -1,
                    limit: 10,
                    hoa: 0
                },
                jzOption: {
                    leagueid: -1,
                    limit: 6,
                    hoa: 0
                }

            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                const {stageid, matchtime, homeid, awayid, matchgroup} = this.$store.state.zqdetail.baseInfo
                const matchdate = matchtime.substr(0, 10)
                await this.$store.dispatch(aTypes.getAnalysisZj, {
                    homeid,
                    awayid,
                    stid: stageid,
                    matchdate,
                    matchgroup,
                    fid: this.$route.params.fid,
                    rleagueid: this.rcOption.leagueid,
                    rlimit: this.rcOption.limit,
                    rhoa: this.rcOption.hoa,
                    jzleagueid: this.jzOption.leagueid,
                    jzlimit: this.jzOption.limit,
                    jzhoa: this.jzOption.hoa
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
            },
            beginFilter ({type}) {
                if (type === 'his') {
                    this.$store.commit(mTypes.setDialog, {
                        component: Filter,
                        params: {
                            initOptions: this.jzOption,
                            type: 'his',
                            leagueid: this.match.league_id,
                            onOk: (option) => {
                                this.jzOption = option
                            }
                        }
                    })
                } else {
                    this.$store.commit(mTypes.setDialog, {
                        component: Filter,
                        params: {
                            initOptions: this.rcOption,
                            type: 'recent',
                            leagueid: this.match.league_id,
                            onOk: (option) => {
                                this.rcOption = option
                            }
                        }
                    })
                }
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
            async jzOption (jzOption) {
                const {matchtime, homeid, awayid} = this.match
                const matchdate = matchtime.substr(0, 10)
                await this.$store.dispatch(aTypes.getAnalysisZjHis, {
                    homeid,
                    awayid,
                    matchdate,
                    jzleagueid: jzOption.leagueid,
                    jzlimit: jzOption.limit,
                    jzhoa: jzOption.hoa
                })
                this.$store.commit(mTypes.updateScTime)
            },
            rcOption (rcOption) {
                const {matchtime, homeid, awayid, stageid} = this.match
                const matchdate = matchtime.substr(0, 10)
                this.$store.dispatch(aTypes.getAnalysisZjR, {
                    homeid,
                    awayid,
                    stid: stageid,
                    matchdate,
                    rleagueid: rcOption.leagueid,
                    rlimit: rcOption.limit,
                    rhoa: rcOption.hoa
                })
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
            },
            futureMatch () {
                return this.zj.futureMatch
            },
            macauNews () {
                return this.zj.macauNews
            }

        },
        filters: {
            truncate: (val, num) => {
                if (val.length > num) {
                    // return val.substr(0, num) + '...'
                    return val.substr(0, num)
                } else {
                    return val
                }
            }
        }
    }
</script>
<style scoped>
    .zhedie-box {
        background: #fff
    }

    /*over*/
    .volumeTab {
        float: right
    }

    .volumeTab li {
        float: left;
        color: #aab5bd;
        display: inline-block;
        text-align: center;
        height: .613333rem;
        line-height: .613333rem;
        background: #efefef;
        border: 1px solid #dadee4;
        margin-left: .24rem;
        border-radius: .306667rem;
        padding: 0 .24rem
    }

    .volumeTab li.cur,
    .volumeTab li:active {
        color: #333;
        background: #fff
    }
    .show{
        display: block;}
    .fx-table {
        margin-top: .053333rem
    }

    .fx-table tr th {
        background: #fff;
        border-bottom: 1px solid #f4f4f4;
        height: .8rem;
        line-height: .8rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .fx-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .fx-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .fx-table tr th {
        font-size: 33px
    }

    .fx-table tr td {
        line-height: 1.066667rem;
        color: #242c35;
        text-align: center
    }

    [data-dpr="1"] .fx-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .fx-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .fx-table tr td {
        font-size: 36px
    }
    .fx-table tr .win {
        color: #d3553d
    }

    .fx-table tr .lose {
        color: #437ba8
    }

    .fx-table tr td .color9,
    .fx-table tr td .colorc {
        color: #aab5bd
    }

    .fx-table tr td:first-child,
    .fx-table tr th:first-child {
        padding-left: .4rem;
        text-align: left;
        position: relative
    }

    .fx-table tr td:last-child,
    .fx-table tr th:last-child {
        padding-right: .4rem;
        text-align: right
    }

    .fx-table tr:last-child td {
        padding-bottom: .25rem
    }

    .fx-table tr td:first-child span {
        display: block;
        height: .426667rem;
        line-height: .426667rem
    }

    [data-dpr="1"] .fx-table tr td:first-child span {
        font-size: 10px
    }

    [data-dpr="2"] .fx-table tr td:first-child span {
        font-size: 20px
    }

    [data-dpr="3"] .fx-table tr td:first-child span {
        font-size: 30px
    }

    [data-dpr="1"] .fx-table tr td:first-child span.f23 {
        font-size: 11.5px
    }

    [data-dpr="2"] .fx-table tr td:first-child span.f23 {
        font-size: 23px
    }

    [data-dpr="3"] .fx-table tr td:first-child span.f23 {
        font-size: 34.5px
    }
    .rank-team {
        text-align: left
    }

    .rank-team img {
        width: .533333rem;
        height: .533333rem;
        vertical-align: middle;
        margin-right: .08rem;
        position: relative;
        top: -.026667rem
    }
    .ui-empty-font {
        height: 1.333333rem;
        line-height: 1.333333rem;
        background: #fff
    }

    .ui-empty-font:active {
        background: #fff!important
    }
    .zd-detail {
        background: #fff;
        height: 1.84rem
    }
    .tcell{display:table-cell}
    .win{color:#d3553d}
    .tie{color:#36a171}
    .lose{color:#437ba8}
    .gaik {
        margin: 0 .4rem;
        height: .84rem;
        line-height: .84rem;
        padding: .293333rem 0 0
    }
    /*清除浮动*/
    .clear {
        zoom: 1
    }
    .clear:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }
    /*over*/
    .gaik .fl {
        margin-right: .32rem
    }
    .color3 {
        color: #333
    }
    [data-dpr="1"] .gaik .f30 {
        font-size: 14px
    }

    [data-dpr="2"] .gaik .f30 {
        font-size: 28px
    }

    [data-dpr="3"] .gaik .f30 {
        font-size: 42px
    }
    .total-tips {
        margin: 0 .4rem;
        color: #aab5bd
    }

    [data-dpr="1"] .total-tips {
        font-size: 11px
    }

    [data-dpr="2"] .total-tips {
        font-size: 22px
    }

    [data-dpr="3"] .total-tips {
        font-size: 33px
    }
    .fx-table {
        margin-top: .053333rem
    }
    .fx-table tr th {
        background: #fff;
        border-bottom: 1px solid #f4f4f4;
        height: .8rem;
        line-height: .8rem;
        color: #aab5bd;
        font-weight: 400
    }

    [data-dpr="1"] .fx-table tr th {
        font-size: 11px
    }

    [data-dpr="2"] .fx-table tr th {
        font-size: 22px
    }

    [data-dpr="3"] .fx-table tr th {
        font-size: 33px
    }

    .fx-table tr td {
        line-height: 1.066667rem;
        color: #242c35;
        text-align: center
    }

    [data-dpr="1"] .fx-table tr td {
        font-size: 12px
    }

    [data-dpr="2"] .fx-table tr td {
        font-size: 24px
    }

    [data-dpr="3"] .fx-table tr td {
        font-size: 36px
    }

    .fx-table tr .win {
        color: #d3553d
    }

    .fx-table tr .lose {
        color: #437ba8
    }

    .fx-table tr td .color9,
    .fx-table tr td .colorc {
        color: #aab5bd
    }

    .fx-table tr td:first-child,
    .fx-table tr th:first-child {
        padding-left: .4rem;
        text-align: left;
        position: relative
    }

    .fx-table tr td:last-child,
    .fx-table tr th:last-child {
        padding-right: .4rem;
        text-align: right
    }

    .fx-table tr:last-child td {
        padding-bottom: .25rem
    }

    .fx-table tr td:first-child span {
        display: block;
        height: .426667rem;
        line-height: .426667rem
    }

    [data-dpr="1"] .fx-table tr td:first-child span {
        font-size: 10px
    }

    [data-dpr="2"] .fx-table tr td:first-child span {
        font-size: 20px
    }

    [data-dpr="3"] .fx-table tr td:first-child span {
        font-size: 30px
    }

    [data-dpr="1"] .fx-table tr td:first-child span.f23 {
        font-size: 11.5px
    }

    [data-dpr="2"] .fx-table tr td:first-child span.f23 {
        font-size: 23px
    }

    [data-dpr="3"] .fx-table tr td:first-child span.f23 {
        font-size: 34.5px
    }
    .textright {
        text-align: right
    }
    .blue-k,
    .gray-k,
    .green-k,
    .red-k {
        width: 1.28rem;
        height: .533333rem;
        line-height: .533333rem;
        padding-right: .106667rem;
        color: #fff;
        float: right
    }

    [data-dpr="1"] .blue-k,
    [data-dpr="1"] .gray-k,
    [data-dpr="1"] .green-k,
    [data-dpr="1"] .red-k {
        font-size: 11px
    }

    [data-dpr="2"] .blue-k,
    [data-dpr="2"] .gray-k,
    [data-dpr="2"] .green-k,
    [data-dpr="2"] .red-k {
        font-size: 22px
    }

    [data-dpr="3"] .blue-k,
    [data-dpr="3"] .gray-k,
    [data-dpr="3"] .green-k,
    [data-dpr="3"] .red-k {
        font-size: 33px
    }
    .green-k {
        background: #36a171
    }
    .red-k {
        background: #d25138
    }
    .blue-k {
        background: #437ba8
    }
    .gray-k {
        background: #c2c2c2
    }
    .saixuan {
        color: #333;
        display: inline-block;
        text-align: center;
        height: .613333rem;
        line-height: .613333rem;
        background: #fff;
        border: .013333rem solid #dadee4;
        border-radius: .306667rem;
        padding: 0 .24rem;
        position: absolute;
        right: .4rem;
        top: .333333rem
    }

    .saixuan:active {
        background: #efefef
    }
    .pm-namel {
        background: #fff;
        line-height: 1.066667rem;
        padding: .213333rem .4rem 0;
        color: #333
    }

    [data-dpr="1"] .pm-namel {
        font-size: 14px
    }

    [data-dpr="2"] .pm-namel {
        font-size: 28px
    }

    [data-dpr="3"] .pm-namel {
        font-size: 42px
    }
    .suggest-power {
        padding-left: .266667rem
    }

    [data-dpr="1"] .suggest-power {
        font-size: 12px
    }

    [data-dpr="2"] .suggest-power {
        font-size: 24px
    }

    [data-dpr="3"] .suggest-power {
        font-size: 36px
    }

    .suggest-stars {
        vertical-align: middle;
        padding-left: .266667rem;
        height: .4rem;
        line-height: .4rem;
        position: relative
    }

    .ico-star {
        display: none;
        width: .386667rem;
        height: .386667rem;
        background: url(~assets/style/images/detail/star.png) no-repeat center -.533333rem;
        background-size: .386667rem
    }

    .ico-star-active {
        display: inline-block
    }
    .macao-txt {
        color: #787878;
        padding: 0 .4rem .48rem;
        text-align: justify
    }

    [data-dpr="1"] .macao-txt {
        font-size: 13px
    }

    [data-dpr="2"] .macao-txt {
        font-size: 26px
    }

    [data-dpr="3"] .macao-txt {
        font-size: 39px
    }


    .inte-look{height:1.066667rem;line-height:1.066667rem;background:#fff;color:#515e6d;position:relative;text-align:right;border-top:1px solid #ededed;padding-right:.4rem}
    [data-dpr="1"] .inte-look{font-size:12px}
    [data-dpr="2"] .inte-look{font-size:24px}
    [data-dpr="3"] .inte-look{font-size:36px}

    .box-arrow{height:1.066667rem;position:relative}
    .box-arrow:active{background:#f4f4f4}
    .zd-arrow{width:.533333rem;height:.177rem;position:absolute;top:50%;left:50%;margin:-.2rem 0 0 -.266667rem;background-position:center -10.84rem}
    .rotate180{-webkit-animation:all .2s linear;animation:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}


</style>
