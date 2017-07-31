
<template>
    <div>
        <div class="sk-detail-tap-box sk-detail-tap-box2">
            <ul class="sk-detail-tap three">
                <li :class="{cur:~$route.path.indexOf('/shengfu')}">
                    <router-link :to="{name: 'basketball-detail-odds-shengfu'}" replace>胜负</router-link>
                </li>
                <li :class="{cur:~$route.path.indexOf('/rangfenpan')}">
                    <router-link :to="{name: 'basketball-detail-odds-rangfenpan'}" replace>让分盘</router-link>
                </li>
                <li :class="{cur:~$route.path.indexOf('/daxiaofen')}">
                    <router-link :to="{name: 'basketball-detail-odds-daxiaofen'}" replace>大小分</router-link>
                </li>
            </ul>
        </div>

        <div class="zj-nav noborder"> 赔率列表
            <ul class="time-item">
                <li class="time-item-cur" v-tap="{methods: edit}">编辑</li>
            </ul>
        </div>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import customodds from '~components/detail/basketball/odds/customodds.vue'
    import {mTypes} from '~store/lqdetail'
    export default{
        methods: {
            edit () {
                this.$store.dispatch('ensureLogin')
                this.$store.commit(mTypes.setDialog, {component: customodds, params: {ptype: this.ptype}})
            }
        },
        computed: {
            ptype () {
                let tmp = this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1)
                switch (tmp) {
                case 'shengfu': { return 'europe' }
                case 'rangfenpan': { return 'rangfen' }
                case 'daxiaofen': { return 'zongfen' }
                }
            }
        }
    }
</script>

<style scoped>
    a {
        color: inherit;
    }
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
    .color6{color: #666}


</style>
