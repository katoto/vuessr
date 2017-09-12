<template>
    <div class="snap-container swiper-container">
        <div class="snap-content swiper-wrapper">
            <div v-if="match.status === '0' && expertRecommend && expertRecommend.shortcontent" data-p2="zq_detail" data-p4="comment_zjgd" v-tap="{methods: goRec}"
                 class="com-slide-box swiper-slide l-relative">
                <div class="prof-cont">
                    <div class="prof-cont-l">
                        <div class="point-icon"></div>
                        <div class="point-txt">{{expertRecommend.publishtime|recommendAt(match.matchtime)}}</div>
                    </div>
                    <div class="prof-cont-r">
                        <div class="pro-info news-info">
                                <span class="news-info-pro">
                                    <img alt="小头像"  :src="expertRecommend.headimg">
                                  {{expertRecommend.nickname}}
                                </span>
                            <em class="zj-mzl" v-if="expertRecommend.threereturnrate">3天回报{{expertRecommend.threereturnrate|percentFormat}}</em>
                            <em class="zj-mzl" v-if="expertRecommend.tenprojecthits">近10中{{expertRecommend.tenprojecthits}}</em>
                            <em class="zj-mzl" v-if="expertRecommend.rednum">{{expertRecommend.rednum}}连红</em>
                        </div>
                        <p>{{expertRecommend.shortcontent|cutStr}}</p>
                    </div>
                </div>

            </div>
            <div v-if="statistic&&eventlist&&(match.status=='1'||match.status=='2'||match.status=='3'||match.status=='4')" class="com-slide-box swiper-slide">
                <h1 class="com-slide-tit" v-if="!(match.status=='4'&&online=='0')">
                    {{match.status=='4'?'共':'与'}}<em><span
                        class="score-itm" :class="{'itmMove': inmove}"><i>{{online0}}</i><i>{{online1}}</i></span></em>{{match.status=='4'?'人看了这场比赛！':'人一起观看比赛！'}}
                </h1>
                <h1 class="com-slide-tit" v-if="match.status=='4'&&online=='0'">有球有朋友，红单大家有</h1>

                <div class="zhud-jq">
                    主
                    <span class="jiaoq-qz">
                            <img src="~assets/style/images/detail/jiaoq.png" alt="角球图标">
                            <em>{{statistic.h_corner_count}}</em>
                        </span>
                </div>

                <!--动态赛况详情-->
                <div class="comm-sk">
                    <!--主队赛况图标-->
                    <div class="zud-sk-icon">
                        <span v-for="e in eventlist" v-if="e.is_team === 1" :class="classHas[e.eventtype]"
                              :style="{'left': e.timing_point<91?((e.timing_point/9) * 10 + '%'):0}"></span>
                    </div>
                    <div class="ked-bg">
                        <!--这里分为3层，0层淡蓝色背景，1层深蓝色背景，2层刻度层-->
                        <div class="deep-blue" :style="{width: progWidth}"></div>
                        <div class="keg-img"></div>
                    </div>
                    <!--客队赛况图标-->
                    <div class="ked-sk-icon">
                        <span v-for="e in eventlist" v-if="e.is_team === 0" :class="classHas[e.eventtype]"
                              :style="{'left': e.timing_point<91?((e.timing_point/9) * 10 + '%'):0}"></span>
                    </div>
                </div>

                <!--客队角球-->
                <div class="zhud-jq ked-jq">
                        <span class="jiaoq-qz">
                            <img src="~assets/style/images/detail/jiaoq.png" alt="角球图标">
                            <em>{{statistic.a_corner_count}}</em>
                        </span>
                    客
                </div>
                <div class="swiper-slide-shadow-left"></div>
                <div class="swiper-slide-shadow-right"></div>
            </div>
            <div v-tap="{methods: goRec}" data-p2="zq_detail" data-p4="comment_zjgd" v-if="expertRecommend && expertRecommend.shortcontent && (match.status=='1'||match.status=='2'||match.status=='3'||match.status=='4')"
                 class="com-slide-box swiper-slide l-relative">
                <div class="prof-cont">
                    <div class="prof-cont-l">
                        <div class="point-icon"></div>
                        <div class="point-txt">{{expertRecommend.publishtime|recommendAt(match.matchtime)}}</div>
                    </div>
                    <div class="prof-cont-r">
                        <div class="pro-info news-info">
                                <span class="news-info-pro">
                                    <img alt="小头像"  :src="expertRecommend.headimg">
                                  {{expertRecommend.nickname}}
                                </span>
                            <em class="zj-mzl" v-if="expertRecommend.threereturnrate">3天回报{{expertRecommend.threereturnrate|percentFormat}}</em>
                            <em class="zj-mzl" v-if="expertRecommend.tenprojecthits">近10中{{expertRecommend.tenprojecthits}}</em>
                            <em class="zj-mzl" v-if="expertRecommend.rednum">{{expertRecommend.rednum}}连红</em>
                        </div>
                        <p>{{expertRecommend.shortcontent|cutStr}}</p>
                    </div>
                </div>

            </div>
            <!--投票模块-->
            <div class="com-slide-box swiper-slide">


                <h1 class="com-slide-tit">{{(match.status === '4' ||
                    vote.voted=='1')?(vote.ticket[0]+vote.ticket[1]+vote.ticket[2])+'人已投票':'本场比赛看好哪队获胜?'}}</h1>


                <div class="comm-slide-cont" v-if="vote.voted === '0' && match.status !== '4'">
                    <ul>
                        <li v-tap="{methods: onVote, opt: '3', idx: 0}">
                            <div class="support-icon"></div>
                            <div class="support-name">{{match.homesxname}}</div>
                        </li>
                        <li v-tap="{methods: onVote, opt: '1', idx: 1}">
                            <div class="support-icon"></div>
                            <div class="support-name">平局</div>
                        </li>
                        <li v-tap="{methods: onVote, opt: '0', idx: 2}">
                            <div class="support-icon"></div>
                            <div class="support-name">{{match.awaysxname}}</div>
                        </li>
                    </ul>
                </div>

                <div class="touph-box" v-if="vote.voted==='1'||(match.status === '4')">
                    <!--数据条-->
                    <div class="data-line">
                        <ul>
                            <li :style="{width: tzbl.winW+'%'}"
                                :class="{'data-hight':vote.myoption==='3'}"></li>
                            <li :style="{width: tzbl.drawW+'%'}"
                                :class="{'data-hight':vote.myoption==='1'}"></li>
                            <li :style="{width: tzbl.lostW+'%'}"
                                :class="{'data-hight':vote.myoption==='0'}"></li>
                        </ul>
                    </div>
                    <!--数据统计-->
                    <div class="data-detail">
                        <ul>
                            <li>
                                <p>{{tzbl.winPer}}%</p>
                                <p>{{match.homesxname}}</p>
                            </li>
                            <li>
                                <p>{{tzbl.drawPer}}%</p>
                                <p>平局</p>
                            </li>
                            <li>
                                <p>{{tzbl.lostPer}}%</p>
                                <p>{{match.awaysxname}}</p>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
    import {aTypes} from '~store/zqdetail'
    let Swiper = () => {}
    if (process.env.VUE_ENV !== 'server') {
        Swiper = require('swiper/dist/js/swiper')
    }
    export default {
        props: ['eventlist', 'statistic', 'match', 'online', 'vote', 'expertRecommend'],
        data () {
            return {
                online0: 0,
                online1: 0,
                inmove: false,
                classHas: {
                    '1': 'jinq-icon',
                    '2': 'wul-icon',
                    '3': 'dianq-icon',
                    '4': 'huangp-icon',
                    '5': 'hongp-icon ',
                    '6': 'lianghbh-icon',
                    '7': 'jinqwx-icon',
                    '8': 'jiaoh-icon',
                    '9': '',
                    '10': ''
                }
            }
        },
        beforeMount () {
            this.online0 = this.online
            this.online1 = this.online
        },
        watch: {
            online () {
                this.online1 = this.online
                this.inmove = true
                setTimeout(() => {
                    this.inmove = false
                    this.online0 = this.online
                }, 1000)
            },
            tWidth () {
                setTimeout(() => this.updateSnap(), 100)
            }
        },
        methods: {
            /**
             * 投票接口， 投完后立马获取投票数
             * @param opt
             * @param idx
             * @returns {Promise.<void>}
             */
            async onVote ({opt, idx}) {
                if (this.match.status === '4') {
                    return
                }
                this.$store.dispatch('ensureLogin')
                await this.$store.dispatch(aTypes.onVote, {
                    opt, id: this.vote._id, fid: this.$route.params.fid
                })
                await this.$store.dispatch(aTypes.getVote, {fid: this.$route.params.fid})
            },
            goRec () {
                location.href = this.expertRecommend.touch_url
            },
            updateSnap () {
                this.mySwiper.update()
            }
        },
        mounted () {
            this.mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                effect: 'slide',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflow: {
                    rotate: 50,
                    stretch: 50,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }
            })
            /**/
        },
        computed: {
            tWidth () {
                if (this.match.status === '0') {
                    if (this.expertRecommend && this.expertRecommend.shortcontent) {
                        return '19.0rem'
                    } else {
                        return 'auto'
                    }
                } else if (this.match.status === '1' || this.match.status === '2' || this.match.status === '3' || this.match.status === '4') {
                    if (this.expertRecommend && this.expertRecommend.shortcontent) {
                        return '28.6rem'
                    } else {
                        return '19.0rem'
                    }
                } else {
                    return 'auto'
                }
            },
            progWidth () {
                if (this.match.status === '4') {
                    return '100%'
                }
                if (this.match.status === '2') {
                    return '50%'
                }
                if (this.match.status === '1' || this.match.status === '3') {
                    let minute = Math.ceil(Number(this.match.match_at) / 60)
                    if (this.match.status === '1' && minute > 44) {
                        minute = 45
                    }
                    if (this.match.status === '3') {
                        minute = minute + 45
                    }
                    return (minute / 90) * 100 + '%'
                } else {
                    return '1%'
                }
            },
            tzbl () {
                if (this.vote && this.vote.ticket) {
                    let result = {
                        winPer: 0,
                        drawPer: 0,
                        lostPer: 0,
                        winW: 0,
                        drawW: 0,
                        lostW: 0
                    }
                    let totalVote = (this.vote.ticket[0] - 0) + (this.vote.ticket[2] - 0) + (this.vote.ticket[1] - 0)
                    if (totalVote) {
                        result.winPer = (this.vote.ticket[0] / totalVote * 100).toFixed(0)
                        result.drawPer = (this.vote.ticket[1] / totalVote * 100).toFixed(0)
                        result.lostPer = 100 - result.winPer - result.drawPer

                        result.winW = result.winPer
                        result.drawW = result.drawPer
                        result.lostW = result.lostPer

                        if (this.vote.ticket[0] === 0) {
                            result.winW = 3
                        }
                        if (this.vote.ticket[1] === 0) {
                            result.drawW = 3
                        }
                        if (this.vote.ticket[2] === 0) {
                            result.lostW = 3
                        }

                        if (this.vote.ticket[0] === 0 && this.vote.ticket[1] === 0) {
                            result.winW = 3
                            result.drawW = 3
                            result.lostW = 94
                        }
                        if (this.vote.ticket[0] === 0 && this.vote.ticket[2] === 0) {
                            result.winW = 3
                            result.drawW = 94
                            result.lostW = 3
                        }
                        if (this.vote.ticket[1] === 0 && this.vote.ticket[2] === 0) {
                            result.winW = 94
                            result.drawW = 3
                            result.lostW = 3
                        }

                        if (this.vote.ticket[0] === 0 && this.vote.ticket[1] !== 0 && this.vote.ticket[2] !== 0) {
                            result.winW = 3
                            result.drawW = 97 - parseInt(result.lostW)
                        }
                        if (this.vote.ticket[1] === 0 && this.vote.ticket[0] !== 0 && this.vote.ticket[2] !== 0) {
                            result.drawW = 3
                            result.winW = 97 - parseInt(result.lostW)
                        }
                        if (this.vote.ticket[2] === 0 && this.vote.ticket[0] !== 0 && this.vote.ticket[1] !== 0) {
                            result.lostW = 3
                            result.winW = 97 - parseInt(result.drawW)
                        }
                    } else {
                        result.winPer = 0
                        result.drawPer = 0
                        result.lostPer = 0
                        result.winW = 33
                        result.drawW = 33
                        result.lostW = 33
                    }
                    return result
                }
                return {}
            }
        },
        filters: {
            percentFormat: (val) => {
                return `${(100 * val).toFixed(0)}%`
            },
            cutStr: (str) => {
                if (str.length > 30) {
                    return str.substr(0, 30) + '...'
                } else {
                    return str
                }
            },
            recommendAt: (t, matchAt) => {
                let matchMillTime = new Date(matchAt.replace(/-/g, '/')).getTime()
                let articleMillTime = new Date(t.replace(/-/g, '/')).getTime()
                let difference = matchMillTime - articleMillTime
                if (difference < 0) {
                    return t.substring(5, 11)
                }
                if (difference < 60 * 1000) {
                    return '赛前1分钟'
                }
                if (difference < 60 * 60 * 1000) {
                    let m = parseInt(difference / (60 * 1000))
                    return '赛前' + m + '分钟'
                }
                if (difference < 24 * 60 * 60 * 1000) {
                    let h = parseInt(difference / (60 * 60 * 1000))
                    return '赛前' + h + '小时'
                }
                if (difference > 24 * 60 * 60 * 1000) {
                    let d = parseInt(difference / (24 * 60 * 60 * 1000))
                    return '赛前' + d + '天'
                }
            }
        }
    }
</script>

<style scoped>
    .snap-container{
        height: 3.4rem;overflow: hidden;position: relative;
    }
    .snap-content {
        /*height: 2.906667rem;*/
        height: 3.4rem;
        margin-right: .125rem
    }
    .snap-container{
        padding: .25rem .25rem;
    }
    .swiper-slide {
        /*width: 9.2rem*/
    }

    .swiper-wrapper .swiper-slide:not(:first-child) {
        margin-left: .123rem;
    }
    .com-slide-box {
        /*width: 9.2rem;*/
        height: 2.906667rem;
        border-radius: .16rem;
        background: #fff;
        margin: 0 auto;
        padding-top: .28rem;
        box-sizing: border-box;

    }
    .com-slide-tit {
        color: #515e6d;
        width: 100%;
        text-align: center
    }

    [data-dpr="1"] .com-slide-tit {
        font-size: 14px
    }

    [data-dpr="2"] .com-slide-tit {
        font-size: 28px
    }

    [data-dpr="3"] .com-slide-tit {
        font-size: 42px
    }

    .com-slide-tit em {
        font-size: .48rem;
        color: #309b56;
        height: .48rem;
        display: inline-block;
        overflow: hidden;
        margin: 0 .093333rem
    }

    .com-slide-tit em span {
        display: inline-block
    }

    .com-slide-tit em i {
        display: block;
        white-space: nowrap
    }
    .comm-slide-cont {
        padding-top: .35rem
    }

    .comm-slide-cont ul {
        overflow: hidden;
        clear: both;
        width: 8.16rem;
        margin: 0 auto
    }

    .comm-slide-cont ul li {
        float: left;
        width: 2.72rem
    }

    .support-icon {
        width: .586667rem;
        height: .586667rem;
        border: .053333rem solid #aab5bd;
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 auto
    }

    .support-iconer {
        background: #aab5bd
    }

    .support-name {
        width: 100%;
        text-align: center;
        color: #515e6d;
        font-size: .373333rem;
        margin-top: .17rem
    }

    .comm-sk{width:8.133333rem;margin:0 auto;height:.933333rem;position:relative}
    .ked-bg{width:8.133333rem;height:.16rem;background:#bcd0de;position:relative}
    .deep-blue{width:62%;height:.16rem;background:#5c788f}
    .keg-img{width:7.253333rem;height:.16rem;background:url(~assets/style/images/detail/ked.png) no-repeat;background-size:cover;position:absolute;left:50%;margin-left:-3.626667rem;bottom:0;z-index:9}
    .zhud-jq{padding-left:.533333rem;font-size:.32rem;color:#515e6d}
    .jiaoq-qz img{width:.16rem;height:.226667rem}
    .ked-jq{padding-right:.533333rem;text-align:right;height:.32rem;line-height:.32rem}
    .ked-jq .jiaoq-qz{margin-right:.133333rem}

    .data-detail ul li p:nth-child(1){color:#515e6d;font-size:.4rem}
    .data-detail ul li p:nth-child(2){font-size:.32rem;color:rgba(81,94,109,.5)}
    .zud-sk-icon{width:8.133333rem;height:.38rem;position:relative}
    .ked-sk-icon{width:8.133333rem;height:.4rem;position:relative}
    .zud-sk-icon span{display:inline-block;position:absolute;bottom:.053333rem;background-size:cover}
    .ked-sk-icon span{display:inline-block;position:absolute;top:.04rem;background-size:cover}
    .jiaoh-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/jiaoh-icon.png) no-repeat;left:15%}
    .huangp-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/huangp-icon.png) no-repeat;left:20%}
    .hongp-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/hongp-icon.png) no-repeat;left:50%}
    .lianghbh-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/lianghbh-icon.png) no-repeat;left:12%}
    .jinq-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/jinq-icon.png) no-repeat;left:0}
    .dianq-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/dianq-icon.png) no-repeat;left:70%}
    .wul-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/wul-icon.png) no-repeat;left:78%}
    .jinqwx-icon{width:.266667rem;height:.266667rem;background:url(~assets/style/images/detail/jinqwx-icon.png) no-repeat;left:36%}



    .data-line{width:8.133333rem;height:.853333rem;margin:0 auto;position:relative}
    .data-line ul{overflow:hidden;clear:both;height:.16rem;width:100%;position:absolute;left:0;top:50%;margin-top:-.08rem}
    .data-line ul li{height:.16rem;float:left;box-sizing:border-box;background:#bcd0de}
    .data-line ul li:nth-child(1){width:22%;border-right:.053333rem solid #fff}
    .data-line ul li:nth-child(2){width:58%}
    .data-line ul li:nth-child(3){width:20%;border-left:.053333rem solid #fff}
    .base-box .data-line ul li{height:.16rem;float:left;box-sizing:border-box;background:#bcd0de}
    .base-box .data-line ul li:nth-child(1){width:78%;border-right:.053333rem solid #fff}
    .base-box .data-line ul li:nth-child(2){width:22%}
    .base-box .data-line ul .data-hight,.data-line ul .data-hight{background:#5c788f}
    .data-detail{width:8.133333rem;margin:0 auto}
    .data-detail ul{overflow:hidden;clear:both;zoom:1}
    .data-detail ul li{float:left;width:33.3%;box-sizing:border-box}
    .data-detail ul li:nth-child(1){text-align:left}
    .data-detail ul li:nth-child(2){text-align:center}
    .data-detail ul li:nth-child(3){text-align:right}
    .base-box .data-detail ul li{float:left;width:50%;box-sizing:border-box}
    .base-box .data-detail ul li:nth-child(1){text-align:left}
    .base-box .data-detail ul li:nth-child(2){text-align:right}
    .data-detail ul li p:nth-child(1){color:#515e6d;font-size:.4rem}
    .data-detail ul li p:nth-child(2){font-size:.32rem;color:rgba(81,94,109,.5)}

    .itmMove{-webkit-animation:itmMove4 .8s ease-in-out forwards;animation:itmMove4 .8s ease-in-out forwards}
    .itmMove i{display: block; height: 0.64rem; line-height: 0.64rem;}
    .itmMove i:last-child{-webkit-animation:itmMove3 2s ease-in-out forwards;animation:itmMove3 2s ease-in-out forwards}
    @-webkit-keyframes itmMove4{0%{-webkit-transform:translate(0,0);transform:translate(0,0)}
        100%{-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}
    }
    @keyframes itmMove4{0%{-webkit-transform:translate(0,0);transform:translate(0,0)}
        100%{-webkit-transform:translate(0,-50%);transform:translate(0,-50%)}
    }
    @-webkit-keyframes itmMove3{0%{color:#309b56}
        30%{color:#27e1e1}
        50%{color:#27e1e1}
        80%{color:#27e1e1}
        100%{color:#309b56}
    }
    @keyframes itmMove3{0%{color:#309b56}
        30%{color:#27e1e1}
        50%{color:#27e1e1}
        80%{color:#27e1e1}
        100%{color:#309b56}
    }

    .prof-cont {
        height: 1.76rem;
        overflow: hidden;
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -.88rem
    }

    .prof-cont-l {
        float: left;
        height: 1.76rem;
        border-right: 1px solid #eaeaea;
        width: 2.133333rem;
        text-align: center;
        padding-top: .266667rem;
        box-sizing: border-box
    }

    .point-icon {
        width: .813333rem;
        height: .666667rem;
        margin: 0 auto;
        background: url(~assets/style/images/detail/zjgd.png) no-repeat;
        background-size: cover
    }

    .point-txt {
        color: #aab5bd;
        width: 100%;
        text-align: center;
        margin-top: .4rem
    }

    [data-dpr="1"] .point-txt {
        font-size: 11px
    }

    [data-dpr="2"] .point-txt {
        font-size: 22px
    }

    [data-dpr="3"] .point-txt {
        font-size: 33px
    }

    .prof-cont-r {
        padding: 0 .373333rem;
        float: left
    }

    .pro-info {
        height: .6rem;
        line-height: .6rem
    }

    .prof-cont-r p {
        margin-top: .2rem;
        color: #515e6d;
        font-size: .373333rem;
        width: 6.266667rem;
        line-height: .533333rem
    }
    .zj-mzl {
        font-size: .24rem;
        padding: .026667rem .106667rem;
        border: 1px solid rgba(210,81,56,.4);
        color: rgba(210,81,56,1);
        border-radius: .053333rem;
        margin-left: 0.106rem;
    }
    .pro-info span {
        position: relative;
        display: inline-block;
        white-space: nowrap
    }

    .pro-info:after {
        content: '';
        display: table;
        visibility: hidden;
        height: 0;
        clear: both
    }

    .pro-info .news-info-pro {
        box-sizing: border-box;
        margin-right: 0;
        float: left;
        padding-right: .133333rem;
        color: #515e6d;
        padding-left: .533rem;
        box-sizing: border-box;
        width: 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    [data-dpr="1"] .pro-info .news-info-pro {
        font-size: 11px
    }

    [data-dpr="2"] .pro-info .news-info-pro {
        font-size: 22px
    }

    [data-dpr="3"] .pro-info .news-info-pro {
        font-size: 33px
    }

    .pro-info .news-info-pro img {
        display: inline-block;
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        top: 50%;
        margin-top: -.2rem;
        left: 0;
        position: absolute
    }



    .swiper-container-no-flexbox .swiper-slide {
        float: left
    }
    .swiper-container-vertical>.swiper-wrapper {
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column
    }
    .swiper-wrapper {
        position: relative;
        z-index: 1;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-transition-property: -webkit-transform;
        -moz-transition-property: -moz-transform;
        -o-transition-property: -o-transform;
        -ms-transition-property: -ms-transform;
        transition-property: transform;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box
    }
    .swiper-container-android .swiper-slide, .swiper-wrapper {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -o-transform: translate(0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0)
    }
    .swiper-container-multirow>.swiper-wrapper {
        -webkit-box-lines: multiple;
        -moz-box-lines: multiple;
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap
    }
    .swiper-container-free-mode>.swiper-wrapper {
        -webkit-transition-timing-function: ease-out;
        -moz-transition-timing-function: ease-out;
        -ms-transition-timing-function: ease-out;
        -o-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
        margin: 0 auto
    }
    .swiper-slide {
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative
    }
    .swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
        height: auto
    }
    .swiper-container-autoheight .swiper-wrapper {
        -webkit-box-align: start;
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
        -webkit-transition-property: -webkit-transform, height;
        -moz-transition-property: -moz-transform;
        -o-transition-property: -o-transform;
        -ms-transition-property: -ms-transform;
        transition-property: transform, height
    }
    .swiper-container .swiper-notification {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        opacity: 0;
        z-index: -1000
    }
    .swiper-wp8-horizontal {
        -ms-touch-action: pan-y;
        touch-action: pan-y
    }
    .swiper-wp8-vertical {
        -ms-touch-action: pan-x;
        touch-action: pan-x
    }
    .swiper-button-next, .swiper-button-prev {
        position: absolute;
        top: 50%;
        width: 27px;
        height: 44px;
        margin-top: -22px;
        z-index: 10;
        cursor: pointer;
        -moz-background-size: 27px 44px;
        -webkit-background-size: 27px 44px;
        background-size: 27px 44px;
        background-position: center;
        background-repeat: no-repeat
    }
    .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
        opacity: .35;
        cursor: auto;
        pointer-events: none
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
        left: 10px;
        right: auto
    }
    .swiper-button-prev.swiper-button-black, .swiper-container-rtl .swiper-button-next.swiper-button-black {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")
    }
    .swiper-button-prev.swiper-button-white, .swiper-container-rtl .swiper-button-next.swiper-button-white {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")
    }
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
        right: 10px;
        left: auto
    }
    .swiper-button-next.swiper-button-black, .swiper-container-rtl .swiper-button-prev.swiper-button-black {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E")
    }
    .swiper-button-next.swiper-button-white, .swiper-container-rtl .swiper-button-prev.swiper-button-white {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")
    }
    .swiper-pagination {
        position: absolute;
        text-align: center;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
        -webkit-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: 10
    }
    .swiper-pagination.swiper-pagination-hidden {
        opacity: 0
    }
    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        bottom: 10px;
        left: 0;
        width: 100%
    }
    .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: .2
    }
    button.swiper-pagination-bullet {
        border: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -webkit-appearance: none;
        appearance: none
    }
    .swiper-pagination-clickable .swiper-pagination-bullet {
        cursor: pointer
    }
    .swiper-pagination-white .swiper-pagination-bullet {
        background: #fff
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #007aff
    }
    .swiper-pagination-white .swiper-pagination-bullet-active {
        background: #fff
    }
    .swiper-pagination-black .swiper-pagination-bullet-active {
        background: #000
    }
    .swiper-container-vertical>.swiper-pagination-bullets {
        right: 10px;
        top: 50%;
        -webkit-transform: translate3d(0, -50%, 0);
        -moz-transform: translate3d(0, -50%, 0);
        -o-transform: translate(0, -50%);
        -ms-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0)
    }
    .swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 5px 0;
        display: block
    }
    .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 5px
    }
    .swiper-pagination-progress {
        background: rgba(0, 0, 0, .25);
        position: absolute
    }
    .swiper-pagination-progress .swiper-pagination-progressbar {
        background: #007aff;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        -webkit-transform: scale(0);
        -ms-transform: scale(0);
        -o-transform: scale(0);
        transform: scale(0);
        -webkit-transform-origin: left top;
        -moz-transform-origin: left top;
        -ms-transform-origin: left top;
        -o-transform-origin: left top;
        transform-origin: left top
    }
    .swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar {
        -webkit-transform-origin: right top;
        -moz-transform-origin: right top;
        -ms-transform-origin: right top;
        -o-transform-origin: right top;
        transform-origin: right top
    }
    .swiper-container-horizontal>.swiper-pagination-progress {
        width: 100%;
        height: 4px;
        left: 0;
        top: 0
    }
    .swiper-container-vertical>.swiper-pagination-progress {
        width: 4px;
        height: 100%;
        left: 0;
        top: 0
    }
    .swiper-pagination-progress.swiper-pagination-white {
        background: rgba(255, 255, 255, .5)
    }
    .swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar {
        background: #fff
    }
    .swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar {
        background: #000
    }
    .swiper-container-3d {
        -webkit-perspective: 1200px;
        -moz-perspective: 1200px;
        -o-perspective: 1200px;
        perspective: 1200px
    }
    .swiper-container-3d .swiper-cube-shadow, .swiper-container-3d .swiper-slide, .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-wrapper {
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d
    }
    .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10
    }
    .swiper-container-3d .swiper-slide-shadow-left {
        background-image: -webkit-gradient(linear, left top, right top, from(rgba(255,255,255,0.2)), to(rgba(255,255,255,1)));
        background-image: -webkit-linear-gradient(right, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -moz-linear-gradient(right, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -o-linear-gradient(right, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: linear-gradient(to left, rgba(255,255,255,0.2), rgba(255,255,255,0.2))
    }
    .swiper-container-3d .swiper-slide-shadow-right {
        background-image: -webkit-gradient(linear, right top, left top, from(rgba(255,255,255,0.2)), to(rgba(255,255,255,1)));
        background-image: -webkit-linear-gradient(left, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -moz-linear-gradient(left, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -o-linear-gradient(left, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.2))
    }
    .swiper-container-3d .swiper-slide-shadow-top {
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,0.2)), to(rgba(255,255,255,1)));
        background-image: -webkit-linear-gradient(bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -moz-linear-gradient(bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -o-linear-gradient(bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: linear-gradient(to top, rgba(255,255,255,0.2), rgba(255,255,255,0.2))
    }
    .swiper-container-3d .swiper-slide-shadow-bottom {
        background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(255,255,255,0.2)), to(rgba(255,255,255,1)));
        background-image: -webkit-linear-gradient(top, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -moz-linear-gradient(top, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: -o-linear-gradient(top, rgba(255,255,255,0.2), rgba(255,255,255,0.2));
        background-image: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.2))
    }
    .swiper-container-coverflow .swiper-wrapper, .swiper-container-flip .swiper-wrapper {
        -ms-perspective: 1200px
    }
    .swiper-container-cube, .swiper-container-flip {
        overflow: visible
    }
    .swiper-container-cube .swiper-slide, .swiper-container-flip .swiper-slide {
        pointer-events: none;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 1
    }
    .swiper-container-cube .swiper-slide .swiper-slide, .swiper-container-flip .swiper-slide .swiper-slide {
        pointer-events: none
    }
    .swiper-container-cube .swiper-slide-active, .swiper-container-cube .swiper-slide-active .swiper-slide-active, .swiper-container-flip .swiper-slide-active, .swiper-container-flip .swiper-slide-active .swiper-slide-active {
        pointer-events: auto
    }
    .swiper-container-cube .swiper-slide-shadow-bottom, .swiper-container-cube .swiper-slide-shadow-left, .swiper-container-cube .swiper-slide-shadow-right, .swiper-container-cube .swiper-slide-shadow-top, .swiper-container-flip .swiper-slide-shadow-bottom, .swiper-container-flip .swiper-slide-shadow-left, .swiper-container-flip .swiper-slide-shadow-right, .swiper-container-flip .swiper-slide-shadow-top {
        z-index: 0;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden
    }
    .swiper-container-cube .swiper-slide {
        visibility: hidden;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        transform-origin: 0 0;
        width: 100%;
        height: 100%
    }
    .swiper-container-cube.swiper-container-rtl .swiper-slide {
        -webkit-transform-origin: 100% 0;
        -moz-transform-origin: 100% 0;
        -ms-transform-origin: 100% 0;
        transform-origin: 100% 0
    }
    .swiper-container-cube .swiper-slide-active, .swiper-container-cube .swiper-slide-next,
    .swiper-container-cube .swiper-slide-next+.swiper-slide, .swiper-container-cube .swiper-slide-prev {
        pointer-events: auto;
        visibility: visible
    }
    .swiper-container-cube .swiper-cube-shadow {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .6;
        -webkit-filter: blur(50px);
        filter: blur(50px);
        z-index: 0
    }
    .swiper-container-fade.swiper-container-free-mode .swiper-slide {
        -webkit-transition-timing-function: ease-out;
        -moz-transition-timing-function: ease-out;
        -ms-transition-timing-function: ease-out;
        -o-transition-timing-function: ease-out;
        transition-timing-function: ease-out
    }
    .swiper-container-fade .swiper-slide {
        pointer-events: none;
        -webkit-transition-property: opacity;
        -moz-transition-property: opacity;
        -o-transition-property: opacity;
        transition-property: opacity
    }
    .swiper-container-fade .swiper-slide .swiper-slide {
        pointer-events: none
    }
    .swiper-container-fade .swiper-slide-active, .swiper-container-fade .swiper-slide-active .swiper-slide-active {
        pointer-events: auto
    }
    .swiper-zoom-container {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        text-align: center
    }
    .swiper-zoom-container>canvas, .swiper-zoom-container>img, .swiper-zoom-container>svg {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain
    }
    .swiper-scrollbar {
        border-radius: 10px;
        position: relative;
        -ms-touch-action: none;
        background: rgba(0, 0, 0, .1)
    }
    .swiper-container-horizontal>.swiper-scrollbar {
        position: absolute;
        left: 1%;
        bottom: 3px;
        z-index: 50;
        height: 5px;
        width: 98%
    }
    .swiper-container-vertical>.swiper-scrollbar {
        position: absolute;
        right: 3px;
        top: 1%;
        z-index: 50;
        width: 5px;
        height: 98%
    }
    .swiper-scrollbar-drag {
        height: 100%;
        width: 100%;
        position: relative;
        background: rgba(0, 0, 0, .5);
        border-radius: 10px;
        left: 0;
        top: 0
    }
    .swiper-scrollbar-cursor-drag {
        cursor: move
    }
    .swiper-lazy-preloader {
        width: 42px;
        height: 42px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -21px;
        margin-top: -21px;
        z-index: 10;
        -webkit-transform-origin: 50%;
        -moz-transform-origin: 50%;
        transform-origin: 50%;
        -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;
        -moz-animation: swiper-preloader-spin 1s steps(12, end) infinite;
        animation: swiper-preloader-spin 1s steps(12, end) infinite
    }
    .swiper-lazy-preloader:after {
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: 50%;
        -webkit-background-size: 100%;
        background-size: 100%;
        background-repeat: no-repeat
    }
    .swiper-lazy-preloader-white:after {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    }
    @-webkit-keyframes swiper-preloader-spin {
        100% {
            -webkit-transform: rotate(360deg)
        }
    }
    @keyframes swiper-preloader-spin {
        100% {
            transform: rotate(360deg)
        }
    }
</style>
