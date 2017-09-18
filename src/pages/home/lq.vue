<template>

    <div class="l-full l-flex-column">
        <div class="item-tab item-tab-base">
            <ul>
                <li data-p4="jingcai" data-p2="lq" :class="{'cur': ~$route.path.indexOf('/jclq')}" v-tap="{methods: switchTab, path: '/home/lq/jclq/cur'}"><router-link to="/home/lq/jclq/cur" replace>竞彩</router-link></li>
                <li data-p4="quanbu" data-p2="lq" :class="{'cur': ~$route.path.indexOf('/all')}" v-tap="{methods: switchTab, path: '/home/lq/all/cur'}"><router-link to="/home/lq/all/cur" replace>全部</router-link></li>
                <li data-p4="guanzhu" data-p2="lq" :class="{'cur': ~$route.path.indexOf('/concern')}" v-tap="{methods: switchTab, path: '/home/lq/concern'}"><router-link to="/home/lq/concern" replace>关注</router-link></li>
            </ul>
        </div>

        <div class="l-flex-1 l-relative">

            <router-view/>


        </div>

    </div>


</template>
<style scoped>

    .item-tab {
        color: #242c35;
        height: .933333rem;
        line-height: .933333rem;
        line-height: .933333rem;
        width: 100%;
        overflow: hidden
    }

    [data-dpr="1"] .item-tab {
        font-size: 15px
    }

    [data-dpr="2"] .item-tab {
        font-size: 30px
    }

    [data-dpr="3"] .item-tab {
        font-size: 45px
    }

    .item-tab ul {
        width: 12rem;
    }

    .item-tab li {
        float: left;
        position: relative;
        padding: 0 .333333rem
    }

    .item-tab li:nth-child(1) {
        margin-left: .066667rem
    }

    .item-tab li:last-child {
        margin-right: .066667rem
    }

    .item-tab li:active {
        background: #f4f4f4
    }
    .item-tab li a{text-decoration: none;}
    .item-tab .cur {
        color: #d25138
    }

    .item-tab .cur:after {
        content: "";
        display: inline-block;
        height: .053333rem;
        border-radius: .026667rem;
        background: #d25138;
        position: absolute;
        width: 40%;
        left: 50%;
        margin-left: -20%;
        bottom: 0
    }

    .item-tab .cur:after {
        -webkit-animation: arrowMove .4s ease-in-out both;
        animation: arrowMove .4s ease-in-out both
    }

    @-webkit-keyframes arrowMove {
        0% {
            -webkit-transform: scaleX(0);
            transform: scaleX(0)
        }

        50% {
            -webkit-transform: scaleX(1.2);
            transform: scaleX(1.2)
        }

        100% {
            -webkit-transform: scaleX(1);
            transform: scaleX(1)
        }
    }

    @keyframes arrowMove {
        0% {
            -webkit-transform: scaleX(0);
            transform: scaleX(0)
        }

        50% {
            -webkit-transform: scaleX(1.2);
            transform: scaleX(1.2)
        }

        100% {
            -webkit-transform: scaleX(1);
            transform: scaleX(1)
        }
    }

    .item-tab-base ul li {
        padding: 0 1.04rem
    }

    .item-tab-base li:nth-child(1) {
        margin-left: .6rem
    }

    .item-tab-base .cur:after {
        width: 20%;
        margin-left: -10%
    }
    a{
        color: inherit;
        display: block;
    }
</style>
<script>
    import {mTypes, aTypes} from '~store/home'
    export default {
        data () {
            return {
                showNav: false
            }
        },
        components: {
        },
        computed: {
        },
        methods: {
            switchTab ({path}) {
                this.$router.replace({path: path, query: this.$route.query})
            }
        },
        async mounted () {
            const hasLogin = await this.$store.dispatch(aTypes.checkHasLogin)
            if (hasLogin) {
                this.$store.dispatch(aTypes.getConcernState, '2')
            }
        },
        destroyed () {
            this.$store.commit(mTypes.reset)
        },
        watch: {
        },
        head: {
            title: '【篮球比分直播】精彩无限_篮球即时比分网_nba比分直播-500彩票网',
            description: '【500彩票网免费提供全网效率最高篮球比分直播】包括篮球即时比分、篮彩完场比分、竞彩篮球未来赛事等服务，绝对是竞彩篮球投注的神器！'

        }
    }
</script>
