<template>
    <div>
        <div class="sk-detail-tap-box">
            <ul class="sk-detail-tap three">
                <li data-type="zq_detail" data-tab="analysis_zj" data-event="click"
                    :class="{cur: ~$route.path.indexOf('/zj')}">
                    <router-link2 :to="{name: 'football-detail-analysis-zj', query: $route.query}" replace  data-p2="zq_detail" data-p4="analysis_zj">战绩</router-link2>
                </li>
                <li
                    :class="{cur: ~$route.path.indexOf('/js')}">
                    <router-link2 :to="{name: 'football-detail-analysis-js', query: $route.query}" replace data-p2="zq_detail" data-p4="analysis_js">技术</router-link2>
                </li>

                <li
                    :class="{cur: ~$route.path.indexOf('/pm')}">
                    <router-link2 :to="{name: 'football-detail-analysis-pm', query: $route.query}" replace data-p2="zq_detail" data-p4="analysis_pm">盘面</router-link2>
                </li>
                <li
                    :class="{cur: ~$route.path.indexOf('/zr')}">
                    <router-link2 :to="{name: 'football-detail-analysis-zr', query: $route.query}" replace data-p2="zq_detail" data-p4="analysis_zr">阵容</router-link2>
                </li>
            </ul>
        </div>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import routerLink2 from '~components/routerLink2.vue'
    export default {
        components: {
            routerLink2
        }
    }
</script>

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
