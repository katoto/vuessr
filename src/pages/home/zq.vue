<template>

    <div class="l-full l-flex-column">
        <div class="in-tab responsive l-relative" style="z-index: 11">
            <a class="wfqh" :class="{'cur': isNav}" v-tap="{methods: tapNav}">
                {{curNavName}}
                <i class="toggle-arrow" :class="{'rotate180': showNav}"></i>
                <i class="tab-arrow"></i>
                <!--<i class="tab-arrow"></i>-->
            </a>
            <router-link to="/home/zq/hot/cur" :class="{'cur': ~$route.path.indexOf('/hot/')}" replace>精选<i
                    class="tab-arrow"></i></router-link>
            <a :class="{'cur': ~$route.path.indexOf('/my/')}">我的比赛<i class="tab-arrow"></i></a>
        </div>

        <div v-if="showNav">
            <div class="l-relative" style="z-index: 11;">
                <div class="ui-navbox-item">
                    <ul>
                        <li :class="{'select': ~$route.path.indexOf('/jczq/')}">
                            <router-link to="/home/zq/jczq/cur" replace><span>竞彩足球</span></router-link>
                        </li>
                        <li :class="{'select': ~$route.path.indexOf('/sfc/')}">
                            <router-link to="/home/zq/sfc/cur" replace><span>胜负彩</span></router-link>
                        </li>
                        <li :class="{'select': ~$route.path.indexOf('/bjdc/')}">
                            <router-link to="/home/zq/bjdc/cur" replace><span>北京单场</span></router-link>
                        </li>
                        <li :class="{'select': ~$route.path.indexOf('/all/')}">
                            <router-link to="/home/zq/all/cur" replace><span>全部</span></router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="ui-alert-layer" v-tap="{methods: toggleNav}" style="z-index: 10"></div>
        </div>

        <div class="l-flex-1 l-relative">

            <router-view/>


        </div>

    </div>


</template>
<style scoped>
    .in-tab {
        padding-top: 0;
        position: relative;
        top: 0

    }
    .in-tab{padding-top:.146667rem;height:.933333rem;background:url(/mobile/touch/images/bifen/index-header.jpg) no-repeat 0 bottom;background-size:100%;position:fixed;left:0;top:1.16rem;z-index:9;-webkit-transform:translateZ(0);transform:translateZ(0)}
    .in-tab a{-webkit-box-flex:1;box-flex:1;-ms-flex:1;flex:1;display:block;width:.2rem;color:rgba(255,255,255,.8);position:relative;text-align:center;height:.933333rem;line-height:.933333rem}
    [data-dpr="1"] .in-tab a{font-size:14.5px}
    [data-dpr="2"] .in-tab a{font-size:29px}
    [data-dpr="3"] .in-tab a{font-size:43.5px}
    .in-tab a:first-child .tab-arrow{margin-left:-.27rem}
    .in-tab a .tab-arrow{margin-left:-.1rem}
    .in-tab a.cur,.in-tab a:active{color:rgba(255,255,255,1)}
    .toggle-arrow{width:.32rem;height:.253333rem;background-position:center -1.133333rem;display:inline-block;margin-left:.05rem;-webkit-transition:all .2s linear;transition:all .2s linear}
    .rotate180,.rotateborder{-webkit-transition:all .2s linear;transition:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}
    .qiqh .rotateborder{vertical-align:.04rem}
    .tab-arrow{border:.133333rem solid;border-color:rgba(255,255,255,0) rgba(255,255,255,0) rgba(255,255,255,1) rgba(255,255,255,0);position:absolute;bottom:-.013333rem;left:49%;display:none}
    .in-tab a.cur .tab-arrow{display:block}

    .ui-navbox-weebox{position:fixed;left:0;width:100%;top:2.18rem;z-index:10}
    .ui-navbox-item{background:#fff;position:relative;z-index:2}
    .ui-navbox-item ul{padding:0 .373333rem .373333rem .453333rem;overflow:hidden}
    [data-dpr="1"] .ui-navbox-item ul{font-size:15px}
    [data-dpr="2"] .ui-navbox-item ul{font-size:30px}
    [data-dpr="3"] .ui-navbox-item ul{font-size:45px}
    .ui-navbox-item li{float:left;width:33.3%;list-style:none}
    .ui-navbox-item li span{display:block;height:1.066667rem;line-height:1.066667rem;border:1px solid #dedede;border-radius:.106667rem;text-align:center;position:relative;color:#333;text-decoration:none}
    .ui-navbox-item li.select span:after{position:absolute;bottom:-.013333rem;right:-.013333rem;width:.906667rem;height:.76rem;content:"";background-position:center 0}
    .ui-navbox-item li.select span{border-color:#f63f3f;color:#f63f3f}
    .ui-navbox-item li:nth-child(3n-2) span{margin:.266667rem .133333rem 0 0}
    .ui-navbox-item li:nth-child(3n-1) span{margin:.266667rem .133333rem 0}
    .ui-navbox-item li:nth-child(3n) span{margin:.266667rem 0 0 .133333rem}
    .qi-list-box{height:.933333rem;width:100%;position:fixed;left:0;top:2.24rem;z-index:9;-webkit-transform:translateZ(0);transform:translateZ(0)}
    .qi-list{width:100%;line-height:.933333rem;height:.933333rem;background:#fff;text-align:center;border-bottom:1px solid #e2e2e2}
    [data-dpr="1"] .qi-list{font-size:13.5px}
    [data-dpr="2"] .qi-list{font-size:27px}
    [data-dpr="3"] .qi-list{font-size:40.5px}
    .qi-list li{-webkit-box-flex:1;box-flex:1;-ms-flex:1;flex:1;display:block;width:.2rem;color:#999}
    .qi-list li:first-child{text-align:left;padding-left:.4rem}
    .qi-list li:last-child{text-align:right;padding-right:.4rem}
    .qi-list li:active{color:#000}
    .qi-list li.qiqh{-webkit-box-flex:2;box-flex:2;-ms-flex:2;flex:2}
    .qi-arrow{border-style:solid;border-color:#999 #fff #fff #fff;border-width:.133333rem .106667rem;display:inline-block;margin-left:.05rem;vertical-align:-.053333rem;content:''}
    .qi-pop-box{top:3.173333rem;z-index:10;position:fixed;left:0;width:100%}
    .qi-list li.qi-gray{color:#ccc}
    .gz-tips{text-align:center;color:#999;line-height:.933333rem;height:.933333rem;background:#fff;width:100%;border-bottom:1px solid #e2e2e2}
    [data-dpr="1"] .gz-tips{font-size:11.5px}
    [data-dpr="2"] .gz-tips{font-size:23px}
    [data-dpr="3"] .gz-tips{font-size:34.5px}
    .gz-tips-icon{width:.366667rem;height:.366667rem;background-position:center -2.693333rem;display:inline-block;vertical-align:middle}
    .w-nm{width:.333333rem;display:inline-block}
    .main-index{padding-top:3.186667rem}
    .list{background:#fff}
    .list-item{text-align:center;padding:.5rem .266667rem .2rem;border-bottom:1px solid #e2e2e2;height:1.88rem;position:relative}
    .list-item:after{content:'';clear:both;display:block;height:0;visibility:hidden}
    .list-item:active{-webkit-tap-highlight-color:rgba(244,244,244,.6)}
    .list-tit{height:.5333rem;line-height:.5333rem;color:#ccc;display:table;width:100%}
    .list-tit .list-day,.list-tit .list-state,.list-tit .list-time{display:table-cell}
    .list-tit .list-day{text-align:left;width:3.4rem}
    .list-tit .list-time{text-align:right;width:3.4rem}
    .list-tit .list-state .dian{animation:dianstyle 1s ease-out 0s infinite alternate;-webkit-animation:dianstyle 1s ease-out 0s infinite alternate}
    @keyframes dianstyle{0%{opacity:1}
        100%{opacity:0}
    }
    @-webkit-keyframes dianstyle{0%{opacity:1}
        100%{opacity:0}
    }
</style>
<script>
    export default {
        data () {
            return {
                showNav: false
            }
        },
        computed: {
            curNavName () {
                if (~this.$route.path.indexOf('/jczq/')) {
                    return '竞彩足球'
                } else if (~this.$route.path.indexOf('/bjdc/')) {
                    return '北京单场'
                } else if (~this.$route.path.indexOf('/sfc/')) {
                    return '胜负彩'
                } else if (~this.$route.path.indexOf('/all/')) {
                    return '全部'
                } else {
                    return '竞彩足球'
                }
            },
            isNav () {
                return !!(~this.$route.path.indexOf('/jczq/') || ~this.$route.path.indexOf('/bjdc/') || ~this.$route.path.indexOf('/sfc/') || ~this.$route.path.indexOf('/all/'))
            }
        },
        methods: {
            tapNav () {
                if (~this.$route.path.indexOf('/jczq/') || ~this.$route.path.indexOf('/bjdc/') || ~this.$route.path.indexOf('/sfc/') || ~this.$route.path.indexOf('/all/')) {
                    this.showNav = !this.showNav
                } else {
                    this.$router.replace('/home/zq/jczq/')
                }
            },
            toggleNav () {
                this.showNav = !this.showNav
            }
        },
        watch: {
            '$route.path' () {
                this.showNav = false
            }
        },
        head: {
            title: '足球比分-500彩票网'
        }
    }
</script>
