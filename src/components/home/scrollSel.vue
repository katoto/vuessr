<template>
    <div class="item-tab">
        <ul>
            <li data-p4="jigncai" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/jczq')}" v-tap="{methods: switchTab, path: '/home/zq/jczq/cur'}"><router-link to="/home/zq/jczq/cur" replace>竞彩</router-link></li>
            <li data-p4="quanbu" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/all')}" v-tap="{methods: switchTab, path: '/home/zq/all/cur'}"><router-link to="/home/zq/all/cur" replace>全部</router-link></li>
            <li data-p4="caiqiu" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/crazybet')}" v-tap="{methods: switchTab, path: '/home/zq/crazybet/cur'}"><router-link to="/home/zq/crazybet/cur" replace>猜球</router-link></li>
            <li data-p4="remen" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/hot')}" v-tap="{methods: switchTab, path: '/home/zq/hot/cur'}"><router-link to="/home/zq/hot/cur" replace>热门</router-link></li>
            <li data-p4="zhishu" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/zs')}" v-tap="{methods: switchTab, path: '/home/zq/zs'}"><router-link to="/home/zq/zs" replace>指数</router-link></li>
            <li data-p4="guanzhu" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/concern')}" v-tap="{methods: switchTab, path: '/home/zq/concern'}"><router-link to="/home/zq/concern" replace>关注</router-link></li>
            <li data-p4="zucai" :class="{'cur': ~$route.path.indexOf('/sfc')}" v-tap="{methods: switchTab, path: '/home/zq/sfc/cur'}"><router-link to="/home/zq/sfc/cur" replace>足彩</router-link></li>
            <li data-p4="zhongchao" data-p2="zq" :class="{'cur': ~$route.path.indexOf('/csl')}" v-tap="{methods: switchTab, path: '/home/zq/csl/cur'}"><router-link to="/home/zq/csl/cur" replace>中超</router-link></li>
            <li data-p4="danchang" data-p2="zq" :class="{'cur': ~$route.path.indexOf('bjdc')}" v-tap="{methods: switchTab, path: '/home/zq/bjdc/cur'}"><router-link to="/home/zq/bjdc/cur" replace>单场</router-link></li>
        </ul>
    </div>
</template>
<script>
    import {Scroller} from 'scroller'
    export default {
        data () {
            return {
                tabLeft: {
                    jczq: 0,
                    all: 0,
                    crazybet: 0,
                    hot: 0,
                    zs: 1,
                    concern: 2,
                    sfc: 2,
                    csl: 2,
                    bjdc: 2
                },
                liw: 173
            }
        },
        async mounted () {
            await this.config()
            this.initLeft()
        },
        methods: {
            async switchTab ({path}) {
                await this.$router.replace(path)
                await this.initLeft()
            },
            async initLeft () {
                const tab = this.$route.params.tab || this.$route.meta.tab
                setTimeout(() => {
                    this.scrollerObj.scrollTo((this.tabLeft[tab] * this.liw), 0, true)
                }, 0)
            },
            config () {
                this.content = this.$el.children[0]
                let liw = this.$el.querySelector('li').offsetWidth
                this.liw = liw
                const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'
                this.scrollerObj = new Scroller((left, top, zoom) => {
                    this.content.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
                }, {
                    bouncing: true,
                    snapping: true,
                    scrollingX: true,
                    scrollingY: false
                })
                // this.scrollerObj.scrollTo(this.tabLeft[this.$route.params.tab] * liw, 0, false)
                // this.initLeft(liw) // 移动导航栏tab位置
                this.scrollerObj.setSnapSize(liw)
                this.scrollerObj.setDimensions(this.$el.offsetWidth, this.$el.offsetHeight, this.content.offsetWidth, this.content.offsetHeight)
                this.$el.addEventListener('touchstart', (e) => {
                    this.scrollerObj.doTouchStart(e.touches, e.timeStamp)
                    /* if (e.target.tagName !== 'A') {
                        e.preventDefault()
                    }
                    */
                    e.preventDefault()
                }, false)

                this.$el.addEventListener('touchmove', (e) => {
                    this.scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
                }, false)

                this.$el.addEventListener('touchend', (e) => {
                    this.scrollerObj.doTouchEnd(e.timeStamp)
                }, false)

                this.$el.addEventListener('touchcancel', (e) => {
                    this.scrollerObj.doTouchEnd(e.timeStamp)
                }, false)
            }
        }
    }
</script>
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
        width: 14rem;
        /*overflow-x: scroll*/
    }

    .item-tab li {
        float: left;
        position: relative;
        padding: 0 .36rem
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
