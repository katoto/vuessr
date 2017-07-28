<template>
    <div class="main-inner">
        <!--<if: tab === TabMap.ODDS />-->
        <div class="sk-detail-tap-box">
            <ul class="sk-detail-tap five">
                <li :class="{cur: ~$route.path.indexOf('/europe')}"><router-link :to="{name: 'football-detail-odds-europe'}" replace>欧赔</router-link></li>
                <li :class="{cur: ~$route.path.indexOf('/asian')}"><router-link :to="{name: 'football-detail-odds-asian'}" replace>亚盘</router-link></li>
                <li :class="{cur: ~$route.path.indexOf('/rangqiu')}"><router-link :to="{name: 'football-detail-odds-rangqiu'}" replace>让球</router-link></li>
                <li :class="{cur: ~$route.path.indexOf('/daxiaopan')}"><router-link :to="{name: 'football-detail-odds-daxiaopan'}" replace>大小盘</router-link></li>
                <li :class="{cur: ~$route.path.indexOf('/bifa')}"><router-link :to="{name: 'football-detail-odds-bifa'}" replace>必发</router-link></li>
            </ul>

        </div>
        <div class="zj-nav noborder" v-if="!~$route.path.indexOf('bifa')"> 赔率列表
            <ul class="time-item">
                <li class="time-item-cur" onclick="_hmt.push(['_trackEvent','zq_detail','click','odds_opdz'])"
                    v-tap="{methods: edit}">编辑
                </li>
            </ul>
        </div>
        <div>

            <router-view></router-view>
        </div>

    </div>
</template>
<script>
    import customodds from '~components/detail/football/odds/customodds.vue'
    import {mTypes} from '~store/zqdetail'
    export default {
        components: {
            customodds
        },
        methods: {
            edit () {
                this.$store.dispatch('ensureLogin')
                this.$store.commit(mTypes.setDialog, {component: customodds, params: {ptype: this.ptype}})
            }
        },
        computed: {
            ptype () {
                return this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1)
            }
        }
    }
</script>
<style scoped>
    a:-webkit-any-link {
        color: inherit;
    }
    a {
        display: block;
    }
</style>
<style>
    .main-inner {
        min-height: 15.44rem;
        width: 100%;
        overflow-x: hidden;
        color: #242c35
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
    .pl-cont .red {
        color: #d3553d
    }
    .pl-cont .green {
        color: #36a171
    }
</style>
