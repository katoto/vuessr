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
</style>
