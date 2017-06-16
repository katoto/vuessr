<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner">
            <div class="plleft">
                <div class="scroller">
                    <ul class="plleft-list">
                        <li v-for="info,index in params.odds"
                            v-tap="{methods: changeComp, cid: info.cid}"
                            :class="{cur: info.cid == cid}">{{info.name}}

                        </li>
                    </ul>
                </div>
            </div>
            <!--<div class="plright"></div>-->
          <div class="plright" drunk-init-data="oddsVisibleType = 'europe'"
                 v-if="params.type === 'europe' || params.type === 'rangqiu'">
                <ul class="popTab clear">
                    <li :class="{cur: tab === 0}" drunk-on="click: oddsVisibleType = 'europe'">
                        赔率变化
                    </li>
                    <li :class="{cur: tab === 1}"
                        drunk-on="click:oddsVisibleType = 'sameEurope'">历史同赔
                    </li>
                </ul>
                <div class="pl-cont" v-if="tab === 0"
                     drunk-odd-pox-iscroll="oddsInfo">
                    <div class="scroller">
                        <div class="plcontent">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table"
                                   v-if="oddsInfo && oddsInfo.length">
                                <tr>
                                    <th width="20%">胜</th>
                                    <th>平</th>
                                    <th width="20%">负</th>
                                    <th width="36%"
                                        drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">更新时间<em
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
                                    <td drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">
                                        <span class="color9" drunk-if="!isOddsTimeNormal">{{info.updatetime}}</span>
                                        <span class="color9" drunk-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <!--<widget-prompt-view src="widget/prompt.html"
                                        drunk-if="!isRequesting && !oddsInfo || !oddsInfo.length" extra-text="很抱歉，没有数据"
                                        type="no-match-fball">
                    </widget-prompt-view>-->
                </div>
                <div class="pl-cont" v-if="tab === 1"
                     drunk-odd-pox-iscroll="sameOddsInfo">
                    <div class="scroller">
                        <div class="plcontent">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                   class="plxq-table firstleft plxq-table-lspt"
                                   v-if="sameOddsInfo && sameOddsInfo.all_count != null">
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
                                <tr drunk-init-data="isSameEuropeAllMore=false"
                                    v-for="match,idx in sameOddsInfo.all_matches">
                                    <td>{{match.simpleleague}} {{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                        {{match.homescore}}:{{match.awayscore}}
                                        {{match.awaysxname}}
                                    </td>
                                    <td>
                                        <p class=" disc">
                                            <em>{{sameOddsInfo.win}}</em><em>{{sameOddsInfo.draw}}</em><em>{{sameOddsInfo.lost}}</em>
                                        </p>

                                        <p class=" disc"><em>{{match.win || '&#45;&#45;'}}</em><em>{{match.draw ||
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
                                    <th class="textleft" width="43%"><em class="color3">{{sameOddsInfo.leaguename}}</em>
                                        近{{sameOddsInfo.league_matches.length}}场
                                    </th>
                                    <th width="47%">初赔/终赔</th>
                                    <th width="10%">赛果</th>
                                </tr>
                                <tr drunk-init-data="isSameEuropeLeagueMore=false"
                                    v-for="match,idx in sameOddsInfo.league_matches">
                                    <td>{{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                        {{match.homescore}}:{{match.awayscore}}
                                        {{match.awaysxname}}
                                    </td>
                                    <td>
                                        <p class=" disc">
                                            <em>{{sameOddsInfo.win}}</em><em>{{sameOddsInfo.draw}}</em><em>{{sameOddsInfo.lost}}</em>
                                        </p>

                                        <p class=" disc"><em>{{match.win || '&#45;&#45;'}}</em><em>{{match.draw ||
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

                    <widget-prompt-view src="widget/prompt.html"
                                        drunk-if="!isRequesting && sameOddsInfo.all_count == null" extra-text="很抱歉，没有数据"
                                        type="no-match-fball">
                    </widget-prompt-view>
                </div>
            </div>

            <!--

           <div class="plright" drunk-init-data="oddsVisibleType = 'asian'" v-if="params.type === 'asian'">
               <ul class="popTab clear">
                   <li drunk-class="{cur: oddsVisibleType == 'asian'}" drunk-on="click: oddsVisibleType = 'asian'">
                       赔率变化
                   </li>
                   <li drunk-class="{cur: oddsVisibleType == 'sameAsian'}"
                       drunk-on="click: oddsVisibleType = 'sameAsian'">历史同赔
                   </li>
               </ul>
               <widget-prompt-view src="widget/prompt.html" drunk-if="!isRequesting && !oddsInfo || !oddsInfo.length"
                                   extra-text="很抱歉，没有数据"
                                   type="no-match-fball">
               </widget-prompt-view>
               <div class="pl-cont" drunk-if="oddsVisibleType == 'asian'"
                    drunk-odd-pox-iscroll="oddsInfo">
                   <div class="scroller">
                       <div class="plcontent">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table mtop40"
                                  drunk-if="oddsInfo && oddsInfo.length">
                               <tr>
                                   <th width="20%">水</th>
                                   <th>让球</th>
                                   <th width="20%">水</th>
                                   <th width="36%"
                                       drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">更新时间<em
                                           class="gxsj"></em></th>
                               </tr>
                               <tr drunk-repeat="info,index in oddsInfo">
                                   <td><span class="f24" drunk-class="{'red': info.s1 == 1, 'green': info.s1 == -1}">{{info.home}}</span>
                                   </td>
                                   <td><span class="color6 f24">{{info.handi}}</span></td>
                                   <td><span class="f24" drunk-class="{'red': info.s2 == 1, 'green': info.s2 == -1}">{{info.away}}</span>
                                   </td>
                                   <td drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">
                                       <span class="color9" drunk-if="!isOddsTimeNormal">{{info.time}}</span>
                                       <span class="color9" drunk-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                   </td>
                           </table>
                       </div>
                   </div>
               </div>
               <div class="pl-cont" drunk-if="oddsVisibleType == 'sameAsian'"
                    drunk-odd-pox-iscroll="sameOddsInfo">
                   <div class="scroller">

                       <div class="plcontent">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                  class="plxq-table firstleft plxq-table-lspt"
                                  drunk-if="sameOddsInfo && sameOddsInfo.all_count != null">
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
                               <tr class="plxq-lspt-td130" drunk-if="sameOddsInfo.league_counts != null">
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
                                  drunk-if="sameOddsInfo.all_matches && sameOddsInfo.all_matches.length>0">
                               <tbody>
                               <tr>
                                   <th class="textleft" width="43%"><em class="color3">全部赛事</em>
                                       近{{sameOddsInfo.all_matches.length}}场
                                   </th>
                                   <th width="47%">初赔/终赔</th>
                                   <th width="10%">盘路</th>
                               </tr>
                               <tr drunk-init-data="isSameEuropeAllMore=false"
                                   drunk-repeat="match,idx in sameOddsInfo.all_matches">
                                   <td>{{match.simpleleague}} {{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                       {{match.homescore}}:{{match.awayscore}} {{match.awaysxname}}
                                   </td>
                                   <td>
                                       <p class=" disc  disc-yp">
                                           <em>{{parseFloat(sameOddsInfo.s1).toFixed(2)}}</em><em>{{sameOddsInfo.handi}}</em><em>{{parseFloat(sameOddsInfo.s2).toFixed(2)}}</em>
                                       </p>
                                       <p class=" disc disc-yp"><em>{{match.s1 || '&#45;&#45;'}}</em><em>{{match.cp ||
                                           '&#45;&#45;'}}</em><em>{{match.s2 || '&#45;&#45;'}}</em></p>
                                   </td>
                                   <td class=" result-last"
                                       drunk-class="{'result-win':match.result=='赢','result-level':match.result=='走','result-lose':match.result=='输'}">
                                       <span>{{match.result}}</span>
                                   </td>
                               </tr>
                               </tbody>
                           </table>


                           <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                  class="plxq-table-f firstleft "
                                  drunk-if="sameOddsInfo.all_matches && sameOddsInfo.league_matches.length>0">
                               <tbody>
                               <tr>
                                   <th class="textleft" width="43%"><em class="color3">{{sameOddsInfo.leaguename}}</em>
                                       近{{sameOddsInfo.league_matches.length}}场
                                   </th>
                                   <th width="47%">初赔/终赔</th>
                                   <th width="10%">盘路</th>
                               </tr>
                               <tr drunk-init-data="isSameEuropeLeagueMore=false"
                                   drunk-repeat="match,idx in sameOddsInfo.league_matches">
                                   <td>{{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                       {{match.homescore}}:{{match.awayscore}}
                                       {{match.awaysxname}}
                                   </td>
                                   <td>
                                       <p class=" disc  disc-yp">
                                           <em>{{parseFloat(sameOddsInfo.s1).toFixed(2)}}</em><em>{{sameOddsInfo.handi}}</em><em>{{parseFloat(sameOddsInfo.s2).toFixed(2)}}</em>
                                       </p>
                                       <p class=" disc  disc-yp"><em>{{match.s1 || '&#45;&#45;'}}</em><em>{{match.cp ||
                                           '&#45;&#45;'}}</em><em>{{match.s2 || '&#45;&#45;'}}</em></p>
                                   </td>
                                   <td class=" result-last result-level"
                                       drunk-class="{'result-win':match.result=='赢','result-level':match.result=='走','result-lose':match.result=='输'}">
                                       <span>{{match.result}}</span>
                                   </td>
                               </tr>
                               </tbody>
                           </table>

                           <widget-prompt-view src="widget/prompt.html"
                                               drunk-if="!isRequesting && sameOddsInfo.all_count == null"
                                               extra-text="很抱歉，没有数据"
                                               type="no-match-fball">
                           </widget-prompt-view>
                       </div>
                   </div>
               </div>
           </div>

           <div class="plright" drunk-init-data="oddsVisibleType = 'daxiaopan'" drunk-if="params.type === 'daxiaopan'">

               <ul class="popTab clear">
                   <li drunk-on="click:oddsVisibleType='daxiaopan'"
                       drunk-class="{'cur': oddsVisibleType == 'daxiaopan'}">赔率变化
                   </li>
                   <li drunk-on="click:oddsVisibleType='sameDaxiaopan'"
                       drunk-class="{'cur': oddsVisibleType == 'sameDaxiaopan'}">历史同赔
                   </li>
               </ul>
               <div class="pl-cont" drunk-if="oddsVisibleType == 'daxiaopan'"
                    drunk-odd-pox-iscroll="oddsInfo">
                   <div class="scroller">
                       <div class="plcontent">
                           <table width="100%" cellspacing="0" cellpadding="0" border="0" class="plxq-table"
                                  drunk-if="oddsInfo && oddsInfo.length > 0">
                               <tbody>
                               <tr>
                                   <th width="20%">大</th>
                                   <th>盘口</th>
                                   <th width="20%">小</th>
                                   <th width="36%"
                                       drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">更新时间<em
                                           class="gxsj"></em></th>
                               </tr>
                               <tr drunk-repeat="info in oddsInfo">
                                   <td>
                                       <span class="f24" drunk-class="{'red': info.b == 1, 'green': info.b == -1}">
                           {{info.big}}
                       </span>
                                   </td>
                                   <td>
                                       <span class="f24">
                           {{info.handi}}
                       </span>
                                   </td>
                                   <td>
                                       <span class="f24" drunk-class="{'red': info.s == 1, 'green': info.s == -1}">
                           {{info.small}}
                       </span>
                                   </td>
                                   <td drunk-on="tap:isOddsTimeNormal=!isOddsTimeNormal,updateCustomOddsInfo()">
                                       <span class="color9" drunk-if="!isOddsTimeNormal">{{info.time}}</span>
                                       <span class="color9" drunk-if="isOddsTimeNormal">{{info.realtime.substring(5,16)}}</span>
                                   </td>
                               </tr>
                               </tbody>
                           </table>

                       </div>

                   </div>
                   <widget-prompt-view src="widget/prompt.html"
                                       drunk-if="!isRequesting && (!oddsInfo || oddsInfo.length == 0)"
                                       extra-text="很抱歉，没有数据"
                                       type="no-match-fball">
                   </widget-prompt-view>
               </div>

               <div class="pl-cont" drunk-if="oddsVisibleType == 'sameDaxiaopan'"
                    drunk-odd-pox-iscroll="sameOddsInfo">
                   <div class="scroller">

                       <div class="plcontent">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                  class="plxq-table firstleft  plxq-table-lspt"
                                  drunk-if="sameOddsInfo.all_count != null">
                               <tbody>
                               <tr>
                                   <th></th>
                                   <th width="20%">大</th>
                                   <th width="34%">盘口</th>
                                   <th width="16%">小</th>
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
                               <tr class="plxq-lspt-td130" drunk-if="sameOddsInfo.league_counts != null">
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
                               </tbody>
                           </table>

                           <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                  class="plxq-table-f firstleft"
                                  drunk-if="sameOddsInfo.all_matches && sameOddsInfo.all_matches.length>0">
                               <tbody>
                               <tr>
                                   <th class="textleft" width="43%"><em class="color3">全部赛事</em>
                                       近{{sameOddsInfo.all_matches.length}}场
                                   </th>
                                   <th width="47%">初赔/终赔</th>
                                   <th width="10%">盘路</th>
                               </tr>
                               <tr drunk-init-data="isSameEuropeAllMore=false"
                                   drunk-repeat="match,idx in sameOddsInfo.all_matches">
                                   <td>{{match.simpleleague}} {{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                       {{match.homescore}}:{{match.awayscore}}
                                       {{match.awaysxname}}
                                   </td>
                                   <td>
                                       <p class=" disc  ">
                                           <em>{{sameOddsInfo.big}}</em><em>{{sameOddsInfo.handi}}</em><em>{{sameOddsInfo.small}}</em>
                                       </p>
                                       <p class=" disc "><em>{{match.big || '&#45;&#45;'}}</em><em>{{match.handi || '&#45;&#45;'}}</em><em>{{match.small
                                           || '&#45;&#45;'}}</em></p>
                                   </td>
                                   <td class=" result-last"
                                       drunk-class="{'result-win':match.result=='大','result-lose':match.result=='小'}">
                                       <span>{{match.result}}</span>
                                   </td>
                               </tr>
                               </tbody>
                           </table>


                           <table cellpadding="0" cellspacing="0" border="0" width="100%"
                                  class="plxq-table-f firstleft"
                                  drunk-if="sameOddsInfo.all_matches && sameOddsInfo.league_matches.length>0">
                               <tbody>
                               <tr>
                                   <th class="textleft" width="43%"><em class="color3">{{sameOddsInfo.leaguename}}</em>
                                       近{{sameOddsInfo.league_matches.length}}场
                                   </th>
                                   <th width="47%">初赔/终赔</th>
                                   <th width="10%">盘路</th>
                               </tr>
                               <tr drunk-init-data="isSameEuropeLeagueMore=false"
                                   drunk-repeat="match,idx in sameOddsInfo.league_matches">
                                   <td>{{match.matchdate.substring(2,10)}}<br>{{match.homesxname}}
                                       {{match.homescore}}:{{match.awayscore}}
                                       {{match.awaysxname}}
                                   </td>
                                   <td>
                                       <p class=" disc ">
                                           <em>{{sameOddsInfo.big}}</em><em>{{sameOddsInfo.handi}}</em><em>{{sameOddsInfo.small}}</em>
                                       </p>
                                       <p class=" disc "><em>{{match.big || '&#45;&#45;'}}</em><em>{{match.handi || '&#45;&#45;'}}</em><em>{{match.small
                                           || '&#45;&#45;'}}</em></p>
                                   </td>
                                   <td class=" result-last"
                                       drunk-class="{'result-win':match.result=='大','result-lose':match.result=='小'}">
                                       <span>{{match.result}}</span>
                                   </td>
                               </tr>
                               </tbody>
                           </table>


                       </div>
                   </div>
                   <widget-prompt-view src="widget/prompt.html"
                                       drunk-if="!isRequesting && sameOddsInfo.all_count == null" extra-text="很抱歉，没有数据"
                                       type="no-match-fball">
                   </widget-prompt-view>
               </div>

           </div>-->
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">赔率详情</h2>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
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
                sameOddsInfo: null
            }
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
                switch (this.params.type) {
                case 'europe': {
                    let currentInfo = null
                    this.params.odds.some((info) => {
                        if (info.cid === cid) {
//                            console.log(JSON.parse(JSON.stringify(info)))
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
                        this.sameOddsInfo = sameOddsInfo
                        this.oddsInfo = oddsInfo
                    }

                    /*this.oddsInfo = await this.$store.dispatch(aTypes.getOddsDetailEurope, {
                        fid: this.$route.params.fid,
                        cid

                    })*/
                    break
                }
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
