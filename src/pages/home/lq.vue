<template>

        <div class="l-full l-flex-column">
            <div class="in-tab responsive">
                <a class="wfqh cur">竞彩篮球<i class="toggle-arrow"></i>
                    <i class="tab-arrow"></i><i class="tab-arrow"></i></a>
                <a href="#/basketball/concern">我的比赛
                    <i class="tab-arrow"></i></a>
            </div>

            <div class="l-flex-1 l-relative">
                <div class="main-index">
                    <div class="loading hide">
                        <div class="icon"></div>
                        <div class="icon-shadow"></div>
                    </div>
                    <div class="list">    <!--为了便于后边跳转瞎写的-->
                        <router-link :to="{name:'basketball-detail-situation-event',params:{fid:112871}}">
                            <div class="list-item">
                                <div class="list-tit">
                                    <span class="list-day">周三301&nbsp;&nbsp;WNBA</span>
                                    <span class="list-state color3">完场</span>
                                    <span class="list-time">07-19&nbsp;&nbsp;23:00</span>
                                </div>
                                <div class="list-team">
                                    <div class="team team-l f30">
                                        <img src="http://odds.500.com/static/soccerdata/images/BasketBallTeamPic/f0357d1c242ca642e1d21a7350cec8e5.gif"> 太阳
                                    </div>
                                    <div class="team-c color3">
                                        <p class="score">
                                            <em class="score-itm"><i>80</i> <i>80</i></em>
                                            <span class="score-c">:</span>
                                            <em class="score-itm"><i>96</i> <i>96</i></em>
                                        </p>
                                    </div>
                                    <div class="team team-r f30">自由人
                                        <img src="http://odds.500.com/static/soccerdata/images/BasketBallTeamPic/4a79989056c9906a07833669bd2c8171.gif">
                                    </div>
                                </div>
                            </div>
                        </router-link>

                    </div>
                </div>
            </div>
        </div>



</template>
<style>
    .in-tab {
        padding-top: 0;
        position: relative;
        top: 0

    }
</style>
<script>
    export default {
        head: {
            title: '篮球比分-500彩票网'
        }
    }

</script>
