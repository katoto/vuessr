<template>
<section class="l-full l-flex-column" v-if="teamInfo">
    <div class="l-full l-flex-column">
        <header class="header">
            <div class="info"><a class="back-icon" onclick="history.back()">返回</a>
                <div class="info-c">
                    <div class="info-pic"><img :src="teamInfo.teamlogo"></div>
                    <div class="info-itm">
                        <h1>{{teamInfo.teamgbname}}</h1>
                        <p>{{capTip}}</p>
                    </div>
                </div>
            </div>
            <nav class="sk-tab">
                <router-link :class="{'cur': ~$route.path.indexOf('/gl')}" :to="{name: 'team-basketball-gl'}" replace>概览<i class="sktab-arrow"></i></router-link>
                <router-link :class="{'cur': ~$route.path.indexOf('/sc')}" :to="{name: 'team-basketball-sc'}" replace>赛程<i class="sktab-arrow"></i></router-link>
            </nav>
        </header>
        <div class="l-flex-1 l-relative">
            <router-view></router-view>
        </div>
    </div>
</section>
</template>
<script>
import {
    aTypes
} from '~store/team/lq'

export default {
    async asyncData ({store, route: {params: {tid, sid}}}) {
        await store.dispatch(aTypes.getTeamInfo, {tid})
    },
    computed: {
        teamInfo () {
            return this.$store.state.teamLq.teamInfo
        },
        capTip () {
            if (this.teamInfo) {
                return this.teamInfo.homefieldcap ? (this.teamInfo.teamhomefield + '-容纳' + this.teamInfo.homefieldcap + '人') : ''
            }
        }
    },
    mounted () {
        this.$store.dispatch(aTypes.getTeamInfo, {tid: this.$route.params.tid})
    }
}
</script>

<style>
    .top_0 {
        margin-top: 0;
    }

    .back-icon:before {
        margin-top: auto;
    }
    .matches .list-view-wrapper {
        background: #fff;
        margin-top: .266667rem;
    }
</style>
