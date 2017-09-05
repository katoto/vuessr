<template>
    <div class="refresh-box">
        <i id="sx" class="refresh-icon" :class="{'refresh-rotate': refreshing}" v-tap="{methods: emitRefresh}"></i>
    </div>
</template>
<script>
    export default {
        computed: {
            refreshing () {
                return this.$store.state.refreshing
            }
        },
        methods: {
            emitRefresh () {
                if (window.EsApp) {
                    location.reload()
                    return
                }
                this.$store.commit('beginRefresh')
            }
        }
    }
</script>

<style scoped>

    .refresh-box {
        width: 1.066667rem;
        height: 1.066667rem;
        border-radius: 50%;
        position: fixed;
        bottom: 1rem;
        right: .4rem;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        z-index: 9;
        overflow: visible;
    }
    .refresh-icon {
        width: 1.066667rem;
        height: 1.066667rem;
        background: url(~assets/style/images/home/refresh.png) no-repeat;
        background-size: contain;
        position: absolute;
        left: 50%;
        margin-left: -.533333rem;
        top: 50%;
        margin-top: -.533333rem;
    }
    .refresh-rotate{-webkit-animation:rotatestyle 1.2s linear 0s infinite forwards;animation:rotatestyle 1.2s linear 0s infinite forwards;-webkit-transform:rotate(45deg);transform:rotate(45deg)}
    @keyframes rotatestyle{0%{-webkit-transform:rotate(0);transform:rotate(0)}
        100%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}
    }
    @-webkit-keyframes rotatestyle{0%{-webkit-transform:rotate(0)}
        100%{-webkit-transform:rotate(720deg)}
    }
</style>
