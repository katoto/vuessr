<template>
    <div class="switch-box" v-tap="{methods: switchView}">
        <div class="switch-cont switch-icon" v-if="view === '0'"></div>
        <div class="switch-cont switch-zt" v-if="view === '1'">状态</div>
        <div class="switch-cont switch-pl" v-if="view === '2' && tab">赔率</div>
    </div>
</template>
<script>
    import {mTypes, aTypes} from '~store/home'
    export default {
        mounted () {
            this.initView()
        },
        computed: {
            view () {
                return this.$store.state.home.view
            }
        },
        data:{
            tab:true
        },
        methods: {
            switchView(){
                if(~this.$route.path.indexOf('zq')){
                    this.$store.dispatch(aTypes.switchView)
                    this.tab=true
                }
                else{
                    this.$store.dispatch(aTypes.switchLqView)
                    this.tab=false
                }
            },
            initView () {
                this.$store.commit(mTypes.setView, sessionStorage.getItem('view') || '0')
                /*if(~this.$route.path.indexOf('zq')){
                    this.$store.dispatch(aTypes.switchView)
                    this.tab=true
                }
                else{
                    this.$store.dispatch(aTypes.switchLqView)
                    this.tab=false
                }*/
            }
        }
    }
</script>
<style scoped>

    .switch-cont {
        width: 1.066667rem;
        height: 1.066667rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1.066667rem;
        color: #fff;
        font-size: .346667rem;
        position: absolute;
        left: 50%;
        margin-left: -.533333rem;
        top: 50%;
        margin-top: -.533333rem;
        background: #d55c45
    }

    .switch-icon {
        background: url(~assets/style/images/home/enchange.png) no-repeat;
        background-size: cover
    }



    .switch-box {
        width: 1.066667rem;
        height: 1.066667rem;
        border-radius: 50%;
        position: fixed;
        bottom: 2.533333rem;
        right: .4rem;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        z-index: 9;
        box-shadow: 0 0 .133333rem rgba(210,81,56,.36)
    }

    .refresh-icon-rorate,.switch-icon-rotate {
        -webkit-animation: rotatestyle 1.2s linear 0s infinite forwards;
        animation: rotatestyle 1.2s linear 0s infinite forwards
    }

    @keyframes rotatestyle {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0)
        }

        100% {
            -webkit-transform: rotate(720deg);
            transform: rotate(720deg)
        }
    }

    @-webkit-keyframes rotatestyle {
        0% {
            -webkit-transform: rotate(0)
        }

        100% {
            -webkit-transform: rotate(720deg)
        }
    }

</style>
