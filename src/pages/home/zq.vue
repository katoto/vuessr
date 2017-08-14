<template>

    <div class="l-full l-flex-column">
        <scroll-sel></scroll-sel>

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
        overflow-x: scroll
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
</style>
<script>
    import scrollSel from '~components/home/scrollSel.vue'
    export default {
        data () {
            return {
                showNav: false
            }
        },
        components: {
            scrollSel
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
