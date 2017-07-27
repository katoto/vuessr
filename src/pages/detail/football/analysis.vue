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
<style>
    .sk-detail-tap-box a:-webkit-any-link {
        color: inherit;
    }
    .sk-detail-tap-box a {
        display: block;
    }
</style>
