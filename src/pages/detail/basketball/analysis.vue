<template>
<div>
    <div class="sk-detail-tap-box">
        <ul class="sk-detail-tap three">
            <li data-type="zq_detail" data-tab="analysis_zj" data-event="click" :class="{cur: ~$route.path.indexOf('/zj')}">
                <router-link :to="{name: 'basketball-detail-analysis-zj'}" replace>战绩</router-link>
            </li>
            <li :class="{cur: ~$route.path.indexOf('/js')}">
                <router-link :to="{name: 'basketball-detail-analysis-js'}" replace>技术</router-link>
            </li>

            <li :class="{cur: ~$route.path.indexOf('/zr')}">
                <router-link :to="{name: 'basketball-detail-analysis-zr'}" replace>阵容</router-link>
            </li>
            <li :class="{cur: ~$route.path.indexOf('/jj')}">
                <router-link :to="{name: 'basketball-detail-analysis-jj'}" replace>进阶</router-link>
            </li>
        </ul>
    </div>
    <div>
        <router-view></router-view>
        <div class="sk-btips">
            500彩票网提示：<br>以上数据仅供参考，请以官方公布的数据为准
        </div>
    </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="css">
    .sk-detail-tap-box a:-webkit-any-link {
        color: inherit;
    }
    .sk-detail-tap-box a {
        display: block;
    }
    .color3 {
        color: #333
    }
    .fl{float: left }
    .clear:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }
    .clear {
        zoom: 1
    }

    .textleft {
        text-align: left
    }

    .textright {
        text-align: right
    }
    .textcenter {
        text-align: center
    }
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }

/*底部提示*/
    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
    }
    /*over*/
    .main-inner {
        min-height: 15.44rem;
        width: 100%;
        overflow-x: hidden;
        color: #242c35
    }
    /*二级tab*/
    .sk-detail-tap-box {
        text-align: center;
        height: 1.173333rem;
        padding: 0 .4rem;
        background: #fff
    }
    .sk-detail-tap {
        border-bottom: 1px solid #e8e8e8;
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 1.173333rem;
        line-height: 1.173333rem
    }

    [data-dpr="1"] .sk-detail-tap {
        font-size: 12px
    }

    [data-dpr="2"] .sk-detail-tap {
        font-size: 24px
    }

    [data-dpr="3"] .sk-detail-tap {
        font-size: 36px
    }
    .sk-detail-tap li {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #aab5bd;
        height: 1.173333rem
    }

    .sk-detail-tap li:active {
        background: #f4f4f4
    }

    .sk-detail-tap li.cur,
    .sk-detail-tap li:active {
        color: #242c35
    }
    /*over*/
    .time-item {
        float: right;
        font-size: .293333rem
    }

    .time-item li {
        background: #efefef;
        color: #aab5bd;
        height: .613333rem;
        line-height: .613333rem;
        padding: 0 .2rem;
        margin-left: .133333rem;
        text-align: center;
        border-radius: .306667rem;
        border: 1px solid #dadee4;
        float: left;
        box-sizing: border-box
    }

    .time-item .time-item-cur {
        color: #242c35;
        background: #fff;
        border: 1px solid #dadee4
    }
    .zhedie-box {
        background: #fff
    }
    .zhedie-box:last-child {
        margin-bottom: 0
    }
    .ui-empty-font{color:#b3b3b3;font-size:0.4rem;padding:0.22rem 0;
        text-align:center;height: 1.33rem; line-height: 1.33rem; background: #fff;}
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
    [data-dpr="1"] .f24 {
        font-size: 12px
    }

    [data-dpr="2"] .f24 {
        font-size: 24px
    }
    [data-dpr="3"] .f24 {
        font-size: 36px
    }
    .gl-box,
    .zr-box {
        background: #fff
    }
    .gl-zjBox {
        margin-top: .066667rem
    }



</style>
