<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner">
            <div class="l-full l-flex-row">
                <div class="l-scroll-y" style="width: 2rem;color: #242c35;overflow-y: scroll">
                    <ul class="plleft-list">
                        <li v-for="info,index in params.odds"
                            v-tap="{methods: changeComp, cid: info.cid}"
                            :class="{cur: info.cid == cid}" v-if="info.cid!=='-1'">{{info.name}}
                        </li>
                    </ul>
                </div>
                <div class="l-flex-1 l-flex-column" style="width:0;border-radius: 0 .186667rem 0 0">

                    <ul class="popTab clear">
                        <li :class="{cur: tab === 0}" v-tap="{methods: () => tab = 0}">
                            赔率变化
                        </li>
                        <li :class="{cur: tab === 1}"
                            v-tap="{methods: () => tab = 1}">历史同赔
                        </li>
                    </ul>
                    <div class="l-flex-1 l-relative">
                        <template v-if="params.type === 'europe' || params.type === 'rangqiu'">
                            <div class="l-full l-scroll-y" v-if="tab === 0 && oddsInfo && oddsInfo.length">
                                <div class="plcontent">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table">
                                        <tr>
                                            <th width="20%">胜</th>
                                            <th>平</th>
                                            <th width="20%">负</th>
                                            <th width="36%"
                                                v-tap="{methods: ()=> isOddsTimeNormal=!isOddsTimeNormal}">
                                                更新时间<em
                                                    class="gxsj"></em></th>
                                        </tr>
                                        <tr v-for="info,index in oddsInfo">
                                            <td><span class="f24"
                                                      :class="{'red': info.win_change == 1, 'green': info.win_change == -1}">{{parseFloat(info.win).toFixed(2)}}</span>
                                            </td>
                                            <td><span class="f24"
                                                      :class="{'red': info.draw_change == 1, 'green': info.draw_change == -1}">{{parseFloat(info.draw).toFixed(2)}}</span>
                                            </td>
                                            <td><span class="f24"
                                                      :class="{'red': info.lost_change == 1, 'green': info.lost_change == -1}">{{parseFloat(info.lost).toFixed(2)}}</span>
                                            </td>
                                            <td v-tap="{methods: ()=> isOddsTimeNormal=!isOddsTimeNormal}">
                                                <span class="color9"
                                                      v-if="!isOddsTimeNormal">{{info.updatetime}}</span>
                                                <span class="color9" v-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <no-match v-if="tab === 0 && oddsInfo && !oddsInfo.length"></no-match>
                            <div class="l-full l-scroll-y" v-if="tab === 1 && sameOddsInfo && sameOddsInfo.all_count">
                                <div class="plcontent">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table firstleft plxq-table-lspt">
                                        <tr>
                                            <th></th>
                                            <th width="20%">胜</th>
                                            <th width="34%">平</th>
                                            <th width="16%">负</th>
                                        </tr>
                                        <tr>
                                            <td>相同初盘</td>
                                            <td>{{sameOddsInfo.win}}</td>
                                            <td>{{sameOddsInfo.draw}}</td>
                                            <td>{{sameOddsInfo.lost}}</td>
                                        </tr>
                                        <tr class="plxq-lspt-td130">
                                            <td>全部赛事
                                                <p class="colora">{{sameOddsInfo.all_count}}场</p>
                                            </td>
                                            <td class="win-c">
                                                <p>{{sameOddsInfo.win_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.win_count}}场</p>
                                            </td>
                                            <td class="level-c">
                                                <p>{{sameOddsInfo.draw_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.draw_count}}场</p>
                                            </td>
                                            <td class="lose-c">
                                                <p>{{sameOddsInfo.lost_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.lost_count}}场</p>
                                            </td>
                                        </tr>
                                        <tr class="plxq-lspt-td130" v-if="sameOddsInfo.league_counts != null">
                                            <td>{{match.simpleleague}}
                                                <p class="colora">{{sameOddsInfo.league_counts}}场</p>
                                            </td>
                                            <td class="win-c">
                                                <p>{{sameOddsInfo.lwin_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.lwin_count}}场</p>
                                            </td>
                                            <td class="level-c">
                                                <p>{{sameOddsInfo.ldraw_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.ldraw_count}}场</p>
                                            </td>
                                            <td class="lose-c">
                                                <p>{{sameOddsInfo.llost_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.llost_count}}场</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table-f firstleft "
                                           v-if="sameOddsInfo.all_matches && sameOddsInfo.all_matches.length>0">
                                        <tbody>
                                        <tr>
                                            <th class="textleft" width="43%"><em class="color3">全部赛事</em>
                                                近{{sameOddsInfo.all_matches.length}}场
                                            </th>
                                            <th width="47%">初赔/终赔</th>
                                            <th width="10%">赛果</th>
                                        </tr>
                                        <tr
                                                v-for="match,idx in sameOddsInfo.all_matches">
                                            <td>{{match.simpleleague}} {{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                                {{match.homescore}}:{{match.awayscore}}
                                                {{match.awaysxname}}
                                            </td>
                                            <td>
                                                <p class=" disc">
                                                    <em>{{sameOddsInfo.win}}</em><em>{{sameOddsInfo.draw}}</em><em>{{sameOddsInfo.lost}}</em>
                                                </p>

                                                <p class=" disc"><em>{{match.win || '&#45;&#45;'}}</em><em>{{match.draw
                                                    ||
                                                    '&#45;&#45;'}}</em><em>{{match.lost
                                                    || '&#45;&#45;'}}</em></p>
                                            </td>
                                            <td class=" result-last"
                                                :class="{'result-win':match.result=='胜','result-level':match.result=='平','result-lose':match.result=='负'}">
                                                <span>{{match.result}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table-f firstleft"
                                           v-if="sameOddsInfo.all_matches && sameOddsInfo.league_matches.length>0">
                                        <tbody>
                                        <tr>
                                            <th class="textleft" width="43%"><em
                                                    class="color3">{{sameOddsInfo.leaguename}}</em>
                                                近{{sameOddsInfo.league_matches.length}}场
                                            </th>
                                            <th width="47%">初赔/终赔</th>
                                            <th width="10%">赛果</th>
                                        </tr>
                                        <tr v-for="match,idx in sameOddsInfo.league_matches">
                                            <td>{{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                                {{match.homescore}}:{{match.awayscore}}
                                                {{match.awaysxname}}
                                            </td>
                                            <td>
                                                <p class=" disc">
                                                    <em>{{sameOddsInfo.win}}</em><em>{{sameOddsInfo.draw}}</em><em>{{sameOddsInfo.lost}}</em>
                                                </p>

                                                <p class=" disc"><em>{{match.win || '&#45;&#45;'}}</em><em>{{match.draw
                                                    ||
                                                    '&#45;&#45;'}}</em><em>{{match.lost
                                                    || '&#45;&#45;'}}</em></p>
                                            </td>
                                            <td class=" result-last"
                                                :class="{'result-win':match.result=='胜','result-level':match.result=='平','result-lose':match.result=='负'}">
                                                <span>{{match.result}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                            <no-match v-if="tab === 1 && sameOddsInfo && !sameOddsInfo.all_count"></no-match>
                        </template>
                        <template v-if="params.type === 'asian'">
                            <div class="l-full l-scroll-y" v-if="tab === 0 && oddsInfo && oddsInfo.length">
                                <div class="plcontent">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table mtop40">
                                        <tr>
                                            <th width="20%">水</th>
                                            <th>让球</th>
                                            <th width="20%">水</th>
                                            <th width="36%"
                                                v-tap="{methods: ()=> isOddsTimeNormal = !isOddsTimeNormal}">
                                                更新时间<em
                                                    class="gxsj"></em></th>
                                        </tr>
                                        <tr v-for="info,index in oddsInfo">
                                            <td><span class="f24"
                                                      :class="{'red': info.s1 == 1, 'green': info.s1 == -1}">{{info.home}}</span>
                                            </td>
                                            <td><span class="color6 f24">{{info.handi}}</span></td>
                                            <td><span class="f24"
                                                      :class="{'red': info.s2 == 1, 'green': info.s2 == -1}">{{info.away}}</span>
                                            </td>
                                            <td v-tap="{methods: ()=> isOddsTimeNormal = !isOddsTimeNormal}">
                                                <span class="color9" v-if="!isOddsTimeNormal">{{info.time}}</span>
                                                <span class="color9" v-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <no-match v-if="tab === 0 && oddsInfo && !oddsInfo.length"></no-match>
                            <div class="l-full l-scroll-y" v-if="tab === 1 && sameOddsInfo && sameOddsInfo.all_count">
                                <div class="plcontent">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table firstleft plxq-table-lspt">
                                        <tr>
                                            <th></th>
                                            <th width="20%">赢盘</th>
                                            <th width="34%">走盘</th>
                                            <th width="16%">盘路</th>
                                        </tr>
                                        <tr>
                                            <td>相同初盘</td>
                                            <td>{{sameOddsInfo.s1}}</td>
                                            <td>{{sameOddsInfo.handi}}</td>
                                            <td>{{sameOddsInfo.s2}}</td>
                                        </tr>
                                        <tr class="plxq-lspt-td130">
                                            <td>全部赛事
                                                <p class="colora">{{sameOddsInfo.all_count}}场</p>
                                            </td>
                                            <td class="win-c">
                                                <p>{{sameOddsInfo.win_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.win_count}}场</p>
                                            </td>
                                            <td class="level-c">
                                                <p>{{sameOddsInfo.draw_percent}}%</p>

                                                <p class="colora">{{sameOddsInfo.draw_count}}场</p>
                                            </td>
                                            <td class="lose-c">
                                                <p>{{sameOddsInfo.lost_percent}}%</p>

                                                <p class="colora">{{sameOddsInfo.lost_count}}场</p>
                                            </td>
                                        </tr>
                                        <tr class="plxq-lspt-td130" v-if="sameOddsInfo.league_counts">
                                            <td>{{match.simpleleague}}
                                                <p class="colora">{{sameOddsInfo.league_counts}}场</p>
                                            </td>
                                            <td class="  win-c">
                                                <p>{{sameOddsInfo.lwin_percent}}%</p>

                                                <p class="colora">{{sameOddsInfo.lwin_count}}场</p>
                                            </td>
                                            <td class="level-c">
                                                <p>{{sameOddsInfo.ldraw_percent}}%</p>

                                                <p class="colora">{{sameOddsInfo.ldraw_count}}场</p>
                                            </td>
                                            <td class="lose-c">
                                                <p>{{sameOddsInfo.llost_percent}}%</p>

                                                <p class="colora">{{sameOddsInfo.llost_count}}场</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table-f firstleft"
                                           v-if="sameOddsInfo.all_matches && sameOddsInfo.all_matches.length>0">
                                        <tbody>
                                        <tr>
                                            <th class="textleft" width="43%"><em class="color3">全部赛事</em>
                                                近{{sameOddsInfo.all_matches.length}}场
                                            </th>
                                            <th width="47%">初赔/终赔</th>
                                            <th width="10%">盘路</th>
                                        </tr>
                                        <tr
                                                v-for="match,idx in sameOddsInfo.all_matches">
                                            <td>{{match.simpleleague}} {{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                                {{match.homescore}}:{{match.awayscore}} {{match.awaysxname}}
                                            </td>
                                            <td>
                                                <p class=" disc  disc-yp">
                                                    <em>{{parseFloat(sameOddsInfo.s1).toFixed(2)}}</em><em>{{sameOddsInfo.handi}}</em><em>{{parseFloat(sameOddsInfo.s2).toFixed(2)}}</em>
                                                </p>
                                                <p class=" disc disc-yp"><em>{{match.s1 || '&#45;&#45;'}}</em><em>{{match.cp
                                                    ||
                                                    '&#45;&#45;'}}</em><em>{{match.s2 || '&#45;&#45;'}}</em></p>
                                            </td>
                                            <td class=" result-last"
                                                :class="{'result-win':match.result=='赢','result-level':match.result=='走','result-lose':match.result=='输'}">
                                                <span>{{match.result}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table-f firstleft "
                                           v-if="sameOddsInfo.all_matches && sameOddsInfo.league_matches.length>0">
                                        <tbody>
                                        <tr>
                                            <th class="textleft" width="43%"><em class="color3">{{sameOddsInfo.leaguename}}</em>
                                                近{{sameOddsInfo.league_matches.length}}场
                                            </th>
                                            <th width="47%">初赔/终赔</th>
                                            <th width="10%">盘路</th>
                                        </tr>
                                        <tr v-for="match,idx in sameOddsInfo.league_matches">
                                            <td>{{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                                {{match.homescore}}:{{match.awayscore}}
                                                {{match.awaysxname}}
                                            </td>
                                            <td>
                                                <p class=" disc  disc-yp">
                                                    <em>{{parseFloat(sameOddsInfo.s1).toFixed(2)}}</em><em>{{sameOddsInfo.handi}}</em><em>{{parseFloat(sameOddsInfo.s2).toFixed(2)}}</em>
                                                </p>
                                                <p class=" disc  disc-yp"><em>{{match.s1 || '&#45;&#45;'}}</em><em>{{match.cp
                                                    ||
                                                    '&#45;&#45;'}}</em><em>{{match.s2 || '&#45;&#45;'}}</em></p>
                                            </td>
                                            <td class=" result-last result-level"
                                                :class="{'result-win':match.result=='赢','result-level':match.result=='走','result-lose':match.result=='输'}">
                                                <span>{{match.result}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <no-match v-if="tab === 1 && sameOddsInfo && !sameOddsInfo.all_count"></no-match>
                        </template>
                        <template v-if="params.type === 'daxiaopan'">
                            <div class="l-full l-scroll-y" v-if="tab === 0 && oddsInfo && oddsInfo.length">
                                <div class="plcontent">
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="plxq-table">
                                        <tbody>
                                        <tr>
                                            <th width="20%">大</th>
                                            <th>盘口</th>
                                            <th width="20%">小</th>
                                            <th width="36%" v-tap="{methods: ()=> isOddsTimeNormal=!isOddsTimeNormal}">
                                                更新时间<em class="gxsj" id="gxsj"></em></th>
                                        </tr>
                                        <tr v-for="info in oddsInfo">
                                            <td>
                                                <span class="f24" :class="{'red': info.b == 1, 'green': info.b == -1}">{{info.big}}</span>
                                            </td>
                                            <td>
                                                <span class="f24">{{info.handi}}</span>
                                            </td>
                                            <td>
                                                <span class="f24" :class="{'red': info.s == 1, 'green': info.s == -1}">{{info.small}}</span>
                                            </td>
                                            <td v-tap="{methods: ()=> isOddsTimeNormal=!isOddsTimeNormal}">
                                                <span class="color9" v-if="!isOddsTimeNormal">{{info.time}}</span>
                                                <span class="color9" v-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <no-match v-if="tab === 0 && oddsInfo && !oddsInfo.length"></no-match>
                            <div class="l-full l-scroll-y" v-if="tab === 1 && sameOddsInfo && sameOddsInfo.all_count">
                                <div class="plcontent">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table firstleft plxq-table-lspt">
                                        <tr>
                                            <th></th>
                                            <th width="20%">赢盘</th>
                                            <th width="34%">走盘</th>
                                            <th width="16%">盘路</th>
                                        </tr>
                                        <tr>
                                            <td>相同初盘</td>
                                            <td>{{sameOddsInfo.big}}</td>
                                            <td>{{sameOddsInfo.handi}}</td>
                                            <td>{{sameOddsInfo.small}}</td>
                                        </tr>
                                        <tr class="plxq-lspt-td130">
                                            <td>全部赛事
                                                <p class="colora">{{sameOddsInfo.all_count}}场</p>
                                            </td>
                                            <td class=" win-c">
                                                <p>{{sameOddsInfo.big_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.big_count}}场</p>
                                            </td>
                                            <td class="level-c">

                                            </td>
                                            <td class=" lose-c">
                                                <p>{{sameOddsInfo.small_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.small_count}}场</p>
                                            </td>
                                        </tr>

                                        <tr class="plxq-lspt-td130" v-if="sameOddsInfo.league_counts">
                                            <td>{{match.simpleleague}}
                                                <p class="colora">{{sameOddsInfo.league_counts}}场</p>
                                            </td>
                                            <td class="win-c">
                                                <p>{{sameOddsInfo.lbig_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.lbig_count}}场</p>
                                            </td>
                                            <td class="level-c">

                                            </td>
                                            <td class="lose-c">
                                                <p>{{sameOddsInfo.lsmall_percent}}%</p>
                                                <p class="colora">{{sameOddsInfo.lsmall_count}}场</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table-f firstleft"
                                           v-if="sameOddsInfo.all_matches && sameOddsInfo.all_matches.length>0">
                                        <tbody>
                                        <tr>
                                            <th class="textleft" width="43%"><em class="color3">全部赛事</em>
                                                近{{sameOddsInfo.all_matches.length}}场
                                            </th>
                                            <th width="47%">初赔/终赔</th>
                                            <th width="10%">盘路</th>
                                        </tr>
                                        <tr v-for="match,idx in sameOddsInfo.all_matches">
                                            <td>{{match.simpleleague}} {{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                                {{match.homescore}}:{{match.awayscore}}
                                                {{match.awaysxname}}
                                            </td>
                                            <td>
                                                <p class=" disc  "><em>{{sameOddsInfo.big}}</em><em>{{sameOddsInfo.handi}}</em><em>{{sameOddsInfo.small}}</em>
                                                </p>
                                                <p class=" disc "><em>{{match.big || '--'}}</em><em>{{match.handi ||
                                                    '--'}}</em><em>{{match.small || '--'}}</em></p>
                                            </td>
                                            <td class=" result-last"
                                                :class="{'result-win':match.result=='大','result-lose':match.result=='小'}">
                                                <span>{{match.result}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


                                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                           class="plxq-table-f firstleft "
                                           v-if="sameOddsInfo.all_matches && sameOddsInfo.league_matches.length">
                                        <tbody>
                                        <tr>
                                            <th class="textleft" width="43%"><em class="color3">{{sameOddsInfo.leaguename}}</em>
                                                近{{sameOddsInfo.league_matches.length}}场
                                            </th>
                                            <th width="47%">初赔/终赔</th>
                                            <th width="10%">盘路</th>
                                        </tr>
                                        <tr v-for="match,idx in sameOddsInfo.league_matches">
                                            <td>{{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                                {{match.homescore}}:{{match.awayscore}}
                                                {{match.awaysxname}}
                                            </td>
                                            <td>
                                                <p class=" disc "><em>{{sameOddsInfo.big}}</em><em>{{sameOddsInfo.handi}}</em><em>{{sameOddsInfo.small}}</em>
                                                </p>
                                                <p class=" disc "><em>{{match.big || '--'}}</em><em>{{match.handi ||
                                                    '--'}}</em><em>{{match.small || '--'}}</em></p>
                                            </td>
                                            <td class=" result-last"
                                                :class="{'result-win':match.result=='大','result-lose':match.result=='小'}">
                                                <span>{{match.result}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <no-match v-if="tab === 1 && sameOddsInfo && !sameOddsInfo.all_count"></no-match>
                        </template>
                    </div>
                </div>


            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">赔率详情</h2>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import noMatch from '~components/detail/football/odds/noMatch.vue'
    export default {
        props: {
            params: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.odds && value.cid && value.type
                }
            }
        },
        data () {
            return {
                tab: 0,
                cid: -1,
                oddsInfo: null,
                sameOddsInfo: null,
                loading: false,
                error: false,
                isOddsTimeNormal: false
            }
        },
        components: {
            noMatch
        },
        mounted () {
            this.cid = this.params.cid
        },
        methods: {
            async changeComp ({cid}) {
                this.cid = cid
            },
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            }
        },
        watch: {
            async cid (cid) {
                this.loading = true
                try {
                    switch (this.params.type) {
                        case 'europe': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailEurope, {
                                    fid: this.$route.params.fid,
                                    cid,
                                    win: currentInfo.first.win,
                                    draw: currentInfo.first.draw,
                                    lost: currentInfo.first.lost,
                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime
                                })
                                sameOddsInfo.win = currentInfo.first.win
                                sameOddsInfo.draw = currentInfo.first.draw
                                sameOddsInfo.lost = currentInfo.first.lost
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                        case 'rangqiu': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailRq, {
                                    fid: this.$route.params.fid,
                                    cid,
                                    win: currentInfo.first.win,
                                    draw: currentInfo.first.draw,
                                    lost: currentInfo.first.lost,
                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime,
                                    handicapline: currentInfo.end.handicapline
                                })
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                        case 'asian': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailAsian, {
                                    fid: this.$route.params.fid,
                                    cid,

                                    s1: currentInfo.first.home,
                                    s2: currentInfo.first.away,
                                    cp: currentInfo.first.handi,

                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime
                                })
                                sameOddsInfo.s1 = currentInfo.first.home
                                sameOddsInfo.s2 = currentInfo.first.away
                                sameOddsInfo.handi = currentInfo.first.handi
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                        case 'daxiaopan': {
                            this.sameOddsInfo = null
                            this.oddsInfo = null
                            let currentInfo = null
                            this.params.odds.some((info) => {
                                if (info.cid === cid) {
                                    currentInfo = info
                                }
                            })
                            if (currentInfo) {
                                const [sameOddsInfo, oddsInfo] = await this.$store.dispatch(aTypes.getOddsDetailDaxiaoqiu, {
                                    fid: this.$route.params.fid,
                                    cid,

                                    big: currentInfo.first.big,
                                    small: currentInfo.first.small,
                                    handi: currentInfo.first.handi,

                                    leagueid: this.match.league_id,
                                    date: this.match.matchtime
                                })

                                //                                sameOddsInfo.s1 = currentInfo.first.home
                                //                                sameOddsInfo.s2 = currentInfo.first.away

                                sameOddsInfo.big = currentInfo.first.big
                                sameOddsInfo.small = currentInfo.first.small
                                sameOddsInfo.handi = currentInfo.first.handi
                                this.sameOddsInfo = sameOddsInfo
                                this.oddsInfo = oddsInfo
                            }
                            break
                        }
                    }
                } catch (e) {
                    this.error = true
                } finally {
                    this.loading = false
                }
            }
        },
        computed: {
            match () {
                return this.$store.state.zqdetail.baseInfo
            }

        }

    }
</script>
<style scoped>
    .popBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 91;
        color: #242c35;
        overflow: hidden
    }

    .popBox .l-flex-column {
        position: relative;
        z-index: 5
    }

    .popTopbar {
        height: 1.173333rem;
        width: 100%
    }

    .popInner {
        background: #fff;
        display: block;
        border-radius: .186667rem .186667rem 0 0;
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        overflow: hidden
    }

    .plleft {
        width: 2rem;
        color: #242c35;
        overflow: hidden;
        float: left;
        height: 100%;
        background: #f4f4f4
    }

    [data-dpr="1"] .plleft {
        font-size: 12px
    }

    [data-dpr="2"] .plleft {
        font-size: 24px
    }

    [data-dpr="3"] .plleft {
        font-size: 36px
    }

    .plright {
        width: 7.733333rem;
        float: right;
        background: #fff;
        position: relative;
        border-radius: 0 .186667rem 0 0
    }

    .plleft-list li {
        line-height: 1.226667rem;
        height: 1.226667rem;
        text-align: center;
        background: #f4f4f4;
        overflow: hidden;
        color: #666a6f
    }

    .plleft-list li.cur {
        background: #fff;
        position: relative;
        color: #242c35
    }

    .plright {
        width: 7.733333rem;
        float: right;
        background: #fff;
        position: relative;
        border-radius: 0 .186667rem 0 0
    }

    .popTab {
        text-align: center;
        border-bottom: 1px solid #f4f4f4
    }

    .popTab li {
        display: inline-block;
        height: 1.066667rem;
        line-height: 1.066667rem;
        color: #666a6f;
        margin: 0 .533333rem
    }

    .popTab li.cur {
        border-bottom: .053333rem solid #242c35;
        color: #242c35
    }

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

    .pl-cont {
        position: relative;
        width: 100%;
        height: 14rem;
        overflow: hidden
    }

    .plcontent {
        padding: 0 .333333rem 0 .266667rem
    }

    .plxq-table {
        text-align: center;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    [data-dpr="1"] .plxq-table {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table {
        font-size: 33px
    }

    .plxq-table tr th {
        line-height: 1.066667rem;
        height: 1.066667rem;
        color: #aab5bd;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 400
    }

    .plxq-table tr td {
        border-bottom: 1px solid #f4f4f4;
        height: 1.066667rem
    }

    [data-dpr="1"] .plxq-table tr td {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table tr td {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table tr td {
        font-size: 33px
    }

    .plxq-table td .color9 {
        color: #aab5bd
    }

    .firstleft tr td:first-child {
        text-align: left
    }

    .gxsj {
        width: .2rem;
        height: .2rem;
        display: inline-block;
        background: url(~assets/style/images/detail/qhsj.png) no-repeat;
        background-size: cover;
        margin-left: .053333rem
    }

    .firstleft tr td:first-child {
        text-align: left
    }

    .plxq-table-lspt tr.plxq-lspt-td130 td {
        height: 1.733333rem
    }

    [data-dpr="1"] .plxq-table-lspt tr td .colora {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table-lspt tr td .colora {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table-lspt tr td .colora {
        font-size: 33px
    }

    .colora {
        color: #aab5bd
    }

    .win-c p:first-child {
        color: #d3553d
    }

    .level-c p:first-child {
        color: #36a171
    }

    .lose-c p:first-child {
        color: #437ba8
    }

    .plxq-table-f {
        margin-top: .533333rem;
        font-size: .2933rem;
        text-align: center;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    .plxq-table-f th {
        line-height: .8rem;
        height: .8rem;
        color: #aab5bd;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 400
    }

    .plxq-table-f th .color3 {
        color: #242c35
    }

    .plxq-table-f td {
        border-bottom: 1px solid #f4f4f4;
        text-align: center;
        word-break: break-all;
        height: 1.733333rem;
        line-height: .6rem
    }

    [data-dpr="1"] .plxq-table-f td {
        font-size: 11px
    }

    [data-dpr="2"] .plxq-table-f td {
        font-size: 22px
    }

    [data-dpr="3"] .plxq-table-f td {
        font-size: 33px
    }

    .plxq-table-f th:last-child,
    .plxq-table-f tr td:last-child {
        text-align: right
    }

    .result-last {
        text-align: right
    }

    .result-last span {
        display: inline-block;
        width: .4267rem;
        height: .4267rem;
        text-align: center;
        line-height: .4267rem;
        color: #fff;
        font-size: .32rem
    }

    .disc em:nth-child(2) {
        width: 1.2rem;
        text-align: center;
    }

    .disc em {
        display: inline-block;
    }

    .result-win span {
        background: #d25138
    }

    .result-level span {
        background: #36a171
    }

    .result-lose span {
        background: #437ba8
    }

    .popFooter {
        border-top: 1px solid #e8e8e8;
        background: #fff;
        width: 100%;
        height: 1.32rem;
        text-align: center;
        position: relative
    }

    .popFooter:active {
        background: #eee
    }

    .popFooter-act:active {
        background: #fff
    }

    .popFooter h2 {
        display: inline-block;
        margin: 0 auto;
        padding: 0 .133333rem;
        white-space: nowrap;
        line-height: 1.32rem;
        color: #242c35
    }

    .arrow {
        overflow: hidden;
        height: .333333rem;
        width: .6rem;
        position: absolute;
        left: .4rem;
        top: .493333rem
    }

    .arrow:before {
        content: '';
        height: .16rem;
        width: .16rem;
        display: block;
        border: .053333rem solid #333;
        border-right-width: 0;
        border-top-width: 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        bottom: .093333rem;
        left: .093333rem
    }

    .pl-table .green,
    .pl-table .pl-num .green {
        color: #36a171
    }

    .pl-table .pl-num .red,
    .pl-table .red {
        color: #d3553d
    }

    .red {
        color: #d3553d
    }

    .green {
        color: #36a171
    }

</style>
