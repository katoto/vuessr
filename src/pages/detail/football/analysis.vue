<template>
    <div>
        <div class="sk-detail-tap-box">
            <ul class="sk-detail-tap three">
                <li data-type="zq_detail" data-tab="analysis_zj" data-event="click"
                    :class="{cur: ~$route.path.indexOf('/zj')}">
                    <router-link :to="{name: 'football-detail-analysis-zj'}" replace  data-p2="zq_detail" data-p4="analysis_zj">战绩</router-link>
                </li>
                <li
                    :class="{cur: ~$route.path.indexOf('/js')}">
                    <router-link :to="{name: 'football-detail-analysis-js'}" replace data-p2="zq_detail" data-p4="analysis_js">技术</router-link>
                </li>

                <li
                    :class="{cur: ~$route.path.indexOf('/pm')}">
                    <router-link :to="{name: 'football-detail-analysis-pm'}" replace data-p2="zq_detail" data-p4="analysis_pm">盘面</router-link>
                </li>
                <li
                    :class="{cur: ~$route.path.indexOf('/zr')}">
                    <router-link :to="{name: 'football-detail-analysis-zr'}" replace data-p2="zq_detail" data-p4="analysis_zr">阵容</router-link>
                </li>
            </ul>
        </div>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
    .sk-detail-tap-box a:-webkit-any-link {
        color: inherit;
    }
    .sk-detail-tap-box a {
        display: block;
    }
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

</style>
