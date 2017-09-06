<template>

    <div class="refresh-box">
        <div class="refresh-icon" v-tap="{methods: emitRefresh}" :class="{'refresh-rotate': refreshing}"></div>

    </div>
   <!-- <div class="refresh-box">
        <i id="sx" class="refresh-icon" :class="{'refresh-rotate': refreshing}" v-tap="{methods: emitRefresh}"></i>
    </div>-->
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
        z-index: 11;
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


    /*.refresh-icon {*/
        /*width: 1.066667rem;*/
        /*height: 1.066667rem;*/
        /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAq1BMVEX2Pz8AAAD2Pz/2Pz//+fn+8PD90tL2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/+8vL7q6v4YWH3S0v2Pz/2Pz/6ior5e3v2Pz/8w8P5hIT5fX32Pz//9/f+4eH8t7f6kpL4b2/4amr3XV32Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/2Pz/8xcX/+/v+6en+5eX9y8v4cXH2RET2Pz/2Pz/2Pz/2Pz/8wsL///8dBChgAAAAOHRSTlPZAAi//vv1yDwb0LSE/O3f3GVd5+S68uXkzf348Oji4d6poZ2OTBHCfk5EE/L++vn04tp6QiMP8qyEnYEAAAKKSURBVFjDrNPZdqpAEIXhnUZlTEAUCQ44mxgznQxr5f2f7HQHMkhV04L57tTml0ILF/V2Tny78m0Pnp34q9vY2RkuqAuKt1cfhP/6JloFnY0HDW/jNA2K2EItKxYNgqJvw8jui1ODWwsnsbYnBd01TrZ2zcF9hgayvSEoAjQUiLrgYYnGlgd90E3QQuLqgu83aOXmnQ+6qteu6HLBXYLWkh0NiiXOsBQkGOAsQTW4x5n2x0E3w5ky9yi4hlZEXvDWv4Nb6AzvO91rlK67nfshdLY/QWGBl04+pC5KXfVqkoJnie9gH6xFTwWOg0pvAVb/KyhscNJx2fsZuSyOB+DYogzG4FwVF49y/JKPinevwInLoAXGtJguREVYPIcpGFYRdLT315mBMeto79H5DG5ADdQ1l3Ow5pfq0wGojQoKD8RirHohNEJVHC9AeEIG70D11Lw5tHI1dQ/UnQwGIFI10gw1ZupECiKQwQTEhHw/O8MERHKBA4jhhxSiVqjODEEc4IAYqf8zOOZDDugeR+qJ/4NBrn63iO4zAnbiRxg9sjMHWLFLMoXRlF2XFXxUPXNrwC/TM6p82Kh6kifnMJrLY0+ospGhSu1VBKNIbSddPlAP8uQLjF7ksQdQ3l8H7b8e+X9zZowDIAhDUWMHo4wuHoEQFwfw/jczjhooUt4gB+hC+/v/q8CfgrcN3tj46OHi0CVfe0a+ugR2ywgsvQLwJYWvUXzR01aEN0u8nasbzsfMHKdqOHVLvBosMW/a+VjBBx8+mvHhkY+3fADnEQEPMXjMcr8otnoSi6jKWeq5uQzTkgWmJRX3+dZ6fqwAydAGJAONTGGoS2NnGIyz6P4Px4XX+WNYpk/njwuTZnCjF4SGqAAAAABJRU5ErkJggg==) center center no-repeat;*/
        /*background-size: 1.066667rem;*/
        /*display: inline-block*/
    /*}*/
    .refresh-rotate{animation:rotatestyle 1.2s linear 0s infinite forwards;-webkit-transform:rotate(45deg);transform:rotate(45deg)}
    @keyframes rotatestyle{0%{-webkit-transform:rotate(0);transform:rotate(0)}
        100%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}
    }
</style>
