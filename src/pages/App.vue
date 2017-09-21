<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import '~assets/style/public/reset.css'
    import Vue from 'vue'
    import vueTap from '~directives/v-tap'
    import '~assets/style/base.css'
    Vue.use(vueTap)
    export default {
        mounted () {
            this.$store.dispatch('initWebsocket')
            if (this.$route.query.render !== 'local' && this.$route.query.from !== 'app_home' && this.$route.query.from !== 'app_bet' && process.env.VUE_ENV !== 'server' && process.env.NODE_ENV === 'production') {
                this.$router.replace({query: {
                    render: 'local'
                }})
            }
            const findP = (e) => {
                if (e.tagName === 'BODY' || !e) return
                if (e.dataset.p2) {
                    return e
                } else {
                    return findP(e.parentNode)
                }
            }

            let initTime = 0
            this.$el.addEventListener('touchstart', (e) => {
                const ele = findP(e.target)
                if (ele) {
                    initTime = e.timeStamp
                }
            }, true)
            this.$el.addEventListener('touchend', (e) => {
                const ele = findP(e.target)
                if (ele) {
                    if (e.timeStamp - initTime < 500) this.summery(ele.dataset.p2, ele.dataset.p4, ele.dataset.p1, ele.dataset.p3)
                }
            }, true)

            if (window && (window.EsApp)) {
                this.$store.commit('setIsApp', true)
            }
        },
        methods: {
            summery (p2, p4, p1 = '_trackEvent', p3 = 'click') {
                if (window._hmt && process.env.NODE_ENV === 'production') {
                    window._hmt.push([p1, p2, p3, p4])
                }
                // console.log([p1, p2, p3, p4])
            }
        }
    }
</script>
<style>
    /*-------------------------------------------*/
    /*
    下面是部分android手机不兼容， 并且vue-loader里面的一个bug， 全部是animate相关的，
    注意，下面的命名都是全局的， 确保全局唯一
    */
    /*-------------------------------------------*/
    /*src/components/home/filterTime.vue*/
    @keyframes c-h-ft-appear {
        0% {
            /*transform: translate(-2.32rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 6.88rem
        }

        51% {
            /*transform: translate(0rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 9.2rem
        }

        86% {
            /*transform: translate(0rem,1rem);*/
            height: 5.333333rem
        }

        100% {
            /*transform: translate(0, 0);*/
            height: 4.56rem;
            width: 9.2rem
        }
    }

    @keyframes c-h-ft-disappear {
        0% {
            /*transform: translate(0, 0);*/
            height: 4.56rem;
            width: 9.2rem
        }

        13% {
            /*transform: translate(0rem,1rem);*/
            height: 5.333333rem
        }

        49% {
            /*transform: translate(0rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 9.2rem
        }

        100% {
            /*transform: translate(-2.32rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 6.88rem
        }
    }
    .c-h-ft-enter-active {
        animation: c-h-ft-appear .8s 0s 1 ease both
    }

    .c-h-ft-leave-active {
        animation: c-h-ft-disappear 1s 0s 1 cubic-bezier(.5, .25, .075, .805) normal forwards
    }
    /*-----------------------end--------------------*/

    /*-------------------------------------------*/
    /*src/components/home/filterTimeB.vue*/
    @keyframes c-h-ftb-appear {
        0% {
            /*transform: translate(-2.32rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 6.88rem
        }

        51% {
            /*transform: translate(0rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 9.2rem
        }

        86% {
            /*transform: translate(0rem,1rem);*/
            height: 5.333333rem
        }

        100% {
            /*transform: translate(0, 0);*/
            height: 4.56rem;
            width: 9.2rem
        }
    }

    @keyframes c-h-ftb-disappear {
        0% {
            /*transform: translate(0, 0);*/
            height: 4.56rem;
            width: 9.2rem
        }

        13% {
            /*transform: translate(0rem,1rem);*/
            height: 5.333333rem
        }

        49% {
            /*transform: translate(0rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 9.2rem
        }

        100% {
            /*transform: translate(-2.32rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 6.88rem
        }
    }

    .c-h-ftb-enter-active {
        animation: c-h-ftb-appear .8s 0s 1 ease both
    }

    .c-h-ftb-leave-active {
        animation: c-h-ftb-disappear 1s 0s 1 cubic-bezier(.5, .25, .075, .805) normal forwards
    }

/*-------------------------------------------*/
    /*src/components/home/filterLeague.vue*/
    @keyframes c-h-fl-league-open {
        0% {
            width: 2.066667rem;
            height: 1.066667rem
        }

        51% {
            width: 9.2rem;
            height: 1.066667rem
        }

        86% {
            width: 9.2rem;
            height: 10.333333rem
        }

        100% {
            width: 9.2rem;
            height: 9.6rem
        }
    }

    @keyframes c-h-fl-league-close {
        0% {
            width: 9.2rem;
            height: 9.6rem
        }

        30% {
            width: 9.2rem;
            height: 10.333333rem
        }

        60% {
            width: 9.2rem;
            height: 1.066667rem
        }

        100% {
            width: 2.066667rem;
            height: 1.066667rem
        }
    }


    .c-h-fl-enter-active {
        animation: c-h-fl-league-open .8s 0s 1 cubic-bezier(.5, .25, 0, .75) normal forwards
    }

    .c-h-fl-leave-active {
        animation: c-h-fl-league-close 1s 0s 1 ease both
    }
    /*---------------------end----------------------*/
    /*-------------------------------------------*/
    /*src/components/home/expectSelect.vue*/
    @keyframes c-h-es-appear {
        0% {
            /*transform: translate(-2.32rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 6.88rem
        }
        51% {
            /*transform: translate(0rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 9.2rem
        }
        86% {
            /*transform: translate(0rem,1rem);*/
            height: 9.5rem
        }
        100% {
            /*transform: translate(0, 0);*/
            height: 8.5rem;
            width: 9.2rem
        }
    }
    @keyframes c-h-es-disappear {
        0% {
            /*transform: translate(0, 0);*/
            height: 8.5rem;
            width: 9.2rem
        }

        13% {
            /*transform: translate(0rem,1rem);*/
            height: 9.5rem
        }

        49% {
            /*transform: translate(0rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 9.2rem
        }

        100% {
            /*transform: translate(-2.32rem,-3.49333rem);*/
            height: 1.066667rem;
            width: 6.88rem
        }
    }

    .c-h-es-enter-active {
        animation: c-h-es-appear .8s 0s 1 ease both
    }

    .c-h-es-leave-active {
        animation: c-h-es-disappear 1s 0s 1 cubic-bezier(.5, .25, .075, .805) normal forwards
    }
    /*---------------------end----------------------*/

    /*-------------------------------------------*/
    /*src/components/home/filterCsl.vue*/
    @keyframes c-h-fc-league-open {
        0% {
            width: 9.2rem;
            height: 1.066667rem
        }

        86% {
            width: 9.2rem;
            height: 10rem
        }

        100% {
            width: 9.2rem;
            height: 9rem
        }
    }

    @keyframes c-h-fc-league-close {
        0% {
            width: 9.2rem;
            height: 9rem
        }

        30% {
            width: 9.2rem;
            height: 10rem
        }

        60% {
            width: 9.2rem;
            height: 1.066667rem
        }

        100% {
            width: 9.2rem;
            height: 1.066667rem
        }
    }

    .c-h-fc-enter-active {
        animation: c-h-fc-league-open .5s 0s 1 cubic-bezier(.5, .25, 0, .75) normal forwards
    }

    .c-h-fc-leave-active {
        animation: c-h-fc-league-close .5s 0s 1 ease both
    }
</style>
