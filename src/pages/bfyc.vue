<template>
    <div class="v124-wrap l-full l-flex-column">
        <!--head begin-->
        <header id="uiHead" class="ui-head">
            <div class="ui-head-in">
                <div class="ui-head-l">
                    <span class="ui-head-btn1" v-tap="{methods: back}"></span>
                </div>
                <div class="ui-head-m">
                    <h2 class="ui-head-tit">{{title}}</h2>
                </div>
            </div>
        </header>


        <!--顶部的tab-->
        <div class="l-flex-1 l-relative">

            <router-view/>

        </div>

    </div>

</template>

<script>
export default{
    computed: {
        title () {
            switch (this.$route.path.substring(this.$route.path.lastIndexOf('/'))) {
            case '/predict': return '精选预测'
            case '/result': // 战绩特征3个tab
            case '/asian':
            case '/bigsmall': return '战绩特征'
            case '/strength': return '实力对比'
            case '/hotcool': return '冷热分布'
            default: return '比分预测'
            }
        }

    },
    methods: {
        back () {
            if (window.EsApp && this.$route.query.from === 'nav') {
                window.EsApp.invoke('close')
            } else {
                history.back()
            }
        }
    }

}
</script>
<style scoped>
    .v124-wrap{width:100%;height:100%;background:#efefef}
    .hotc-header ul{float:right;clear:both;zoom:1}
    .hotc-header ul li{float:left;box-sizing:border-box;width:.773333rem;height:1.173333rem;line-height:1.173333rem}
    .hotc-header ul li:nth-child(2){margin:0 .533333rem}
    .ui-head a{text-decoration:none}
    .ui-head li,.ui-head ul{list-style:none}
    .ui-head button,.ui-head li,.ui-head ul{margin:0;padding:0}
    .ui-head{width:100%;height:1.173333rem}
    .ui-head-in{position:relative;width:100%;height:1.173333rem;background:#242c35}
    .ui-head-l,.ui-head-r{position:absolute;top:0;height:100%}
    .ui-head-l{left:0}
    .ui-head-m{height:100%;text-align:center;line-height:1.173333rem}
    .ui-head-tit{display:inline-block;margin:0;padding:0;color:#fff;font-weight:700;font-size:.48rem}
    .ui-head-tit img{vertical-align:middle}
    .ui-head-tit .ui-head-arrow{transition:all .2s linear}
    .ui-head-tit-on .ui-head-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}
    .ui-head-r{right:0}
    .ui-head-l span,.ui-head-r span{padding:0 0 0 .133333rem;height:100%}
    .ui-head-l span:active,.ui-head-r span:active{background-color:#5c788f}
    .ui-head-l span:after{left:.4rem}
    .ui-head-r span:after{right:.4rem}
    .ui-head-btn1:after{position:absolute;top:50%;width:.306667rem;height:.48rem;background:url('~assets/images/bfyc/return.png') no-repeat;background-size:cover;content:'';-webkit-transform:translateY(-50%);transform:translateY(-50%)}

</style>
