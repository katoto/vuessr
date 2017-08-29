<template>
    <div class="exit-cont" v-if="metro">
        <ul>
            <li class="exit-pre" v-tap="{methods: goBfyc, page: 'predict'}">
                <p>精选预测</p>
                <template v-if="metro.awesome_predict.homesxname">
                    <p>{{metro.awesome_predict.homesxname}}</p>
                    <p>{{metro.awesome_predict.cell.predict_result|predictResult}} {{metro.awesome_predict.cell.probability}}%</p>
                </template>
                <template v-else>
                    <p> </p>
                    <p>暂无推荐</p>
                </template>

            </li>
            <li class="exit-hotc"  v-tap="{methods: goBfyc, page: 'hotcool'}">
                <p>冷热分布</p>
                <template v-if="metro.coldhot_distribute.order">
                    <p>{{metro.coldhot_distribute.order}}</p>
                    <em>{{metro.coldhot_distribute.tag.desc}}</em>
                </template>
                <template v-else>
                    <p> </p>
                    <p>暂无推荐</p>
                </template>

            </li>
            <li class="exit-stre" v-tap="{methods: goBfyc, page: 'strength'}">
                <p>实力对比</p>
                <template v-if="metro.strength_compare.homesxname">
                    <p>{{metro.strength_compare.homesxname}}</p>
                    <p>{{metro.strength_compare.awaysxname}}</p>
                </template>
                <template v-else>
                    <p> </p>
                    <p>暂无推荐</p>
                </template>

            </li>
            <li class="exit-recod" v-tap="{methods: goBfyc, page: 'record'}">
                <p>战绩特征</p>
                <template v-if="metro.combat_feature.awaysxname">
                    <p>{{metro.combat_feature.cell.teamsxname}}</p>
                    <p>{{metro.combat_feature.cell|combatDesc}}</p>
                </template>
                <template v-else>
                    <p></p>
                    <p>暂无推荐</p>
                </template>

            </li>
        </ul>
    </div>
</template>
<style scoped>
    .mark-demo-r {
        font-size: .293333rem;
        float: right;
        height: .666667rem;
        line-height: .666667rem;
    }
    .mark-demo-r em {
        font-size: .533333rem;
        margin-left: .133333rem;
    }
    .ui-head a{text-decoration:none}.ui-head li,.ui-head ul{list-style:none}.ui-head button,.ui-head li,.ui-head ul{margin:0;padding:0}.ui-head{width:100%;height:1.173333rem}.ui-head-in{width:100%;height:1.173333rem;background:#242c35;position:relative}.ui-head-l,.ui-head-r{position:absolute;top:0;height:100%}.ui-head-l{left:0}.ui-head-m{height:100%;line-height:1.173333rem;text-align:center}.ui-head-tit{display:inline-block;margin:0;padding:0;font-size:.48rem;font-weight:700;color:#fff}.ui-head-tit img{vertical-align:middle}.ui-head-tit .ui-head-arrow{transition:all .2s linear}.ui-head-tit-on .ui-head-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ui-head-r{right:0}.ui-head-l span,.ui-head-r span{height:100%;padding:0 0 0 .133333rem}.ui-head-l span:active,.ui-head-r span:active{background-color:#5c788f}.ui-head-l span:after{left:.4rem}.ui-head-r span:after{right:.4rem}.ui-head-btn1:after{position:absolute;top:50%;background:url(/mobile/touch/images/bifen/v124/return.png) no-repeat;width:.306667rem;height:.48rem;background-size:cover;content:'';-webkit-transform:translateY(-50%);transform:translateY(-50%)}.v124-wrap{background:#efefef;width:100%;height:100%}.hotc-header{height:1.173333rem;line-height:1.173333rem;padding:0 .4rem;color:#aab5bd;font-size:.346667rem;border-bottom:1px solid #eaeaea;background:#fff;box-sizing:border-box}.hotc-header ul{float:right;clear:both;zoom:1}.hotc-header ul li{height:1.173333rem;line-height:1.173333rem;box-sizing:border-box;width:.773333rem;float:left}.hotc-header ul li:nth-child(2){margin:0 .533333rem}.hotc-header ul .cur{color:#242c35;border-bottom:3px solid #242c35}.notice-predict{height:.333333rem;width:9.2rem;margin:0 auto;padding:.36rem 0;box-shadow:.013333rem .013333rem .026667rem .013333rem rgba(239,239,239,.5);border:1px solid #eaeaea;border-radius:.08rem}.notice-predict p{color:#515e6d;font-size:.373333rem;height:.333333rem;line-height:.333333rem;border-left:.053333rem solid #d25138;padding-left:.133333rem}.notice-predict p em{color:#d25138}.hotc-list{padding-top:.266667rem;background:#fff}.hotc-item{clear:both;zoom:1;padding:.4rem .4rem;border-bottom:1px solid #eaeaea;overflow:hidden;background:#fff}.hotc-cont:active,.hotc-item:active,.news-item:active,.strengh-cont:active{background:#f4f4f4}.hotc-left{width:5.6rem;float:left;height:.933333rem;padding-top:.24rem}.hotc-info-tit{font-size:.426667rem;color:#242c35;height:.4rem;margin-bottom:.266667rem}.hotc-info-time{color:#aab5bd;font-size:.293333rem;height:.293333rem}.hotc-right{float:right;height:1rem;padding:.226667rem 0;background:#d25138;color:#fff;text-align:center;border-radius:.053333rem;box-shadow:.026667rem .026667rem .106667rem #e8a89b}.statue-hit-no{background:#bcd0de;box-shadow:.026667rem .026667rem .106667rem #dde7ee}.left-statue{float:left;width:.72rem;box-sizing:border-box;color:rgba(255,255,255,.8);height:1rem;border-right:1px solid rgba(255,255,255,.5);font-size:.373333rem;line-height:140%}.right-predict{width:2.213333rem;float:left}.right-predict p{font-size:.64rem;height:.64rem}.right-predict p:nth-child(1){line-height:.506667rem;text-indent:.12rem}.right-predict p:nth-child(2){font-size:.373333rem;height:.373333rem;line-height:.373333rem;margin-top:.026667rem}.right-predict p em{font-size:.293333rem}.txt-predict{text-align:center;color:#aab5bd;font-size:.293333rem;padding:.533333rem 0;background:#efefef}.tag-game-over{height:.8rem;line-height:.8rem;background:#efefef;font-size:.293333rem;color:#aab5bd;width:100%;text-align:center;position:relative;border-bottom:1px solid #eaeaea}.tag-game-over:before{content:"";display:inline-block;width:.4rem;height:1px;background:#aab5bd;position:absolute;top:50%;left:50%;margin-left:-1rem}.tag-game-over:after{content:"";display:inline-block;width:.4rem;height:1px;background:#aab5bd;position:absolute;top:50%;right:50%;margin-right:-1rem}.hotc-item-going .left-statue{display:none}.strengh-item{box-sizing:border-box;margin:0;padding-top:.666667rem;height:1.333333rem}.strengh-cont{height:3.173333rem;box-sizing:border-box;padding:.266667rem .4rem .666667rem;border-bottom:1px solid #eaeaea}.strengh-time{font-size:.293333rem;color:#aab5bd;margin-bottom:.533333rem}.strengh-time em{float:right}.strengh-tit{font-size:.426667rem;color:#242c35;position:absolute;top:0;text-align:center;width:100%;overflow:hidden;height:.426667rem;line-height:.426667rem}.strengh-tit em{display:inline-block;width:4.133333rem;float:left}.strengh-tit em:nth-child(2){display:inline-block;width:.933333rem;text-align:center}.strengh-tit em:nth-child(1){text-align:right}.strengh-tit em:nth-child(3){text-align:left}.strengh-item .zhzl-bfb-left,.strengh-item .zhzl-bfb-right{top:inherit;bottom:.293333rem;font-size:.346667rem;color:#515e6d}.strengh-item .zhzl-vs-left,.strengh-item .zhzl-vs-right{height:.16rem}.record-header{height:1.173333rem;line-height:1.173333rem;width:100%;border-bottom:1px solid #eaeaea;background:#fff;box-sizing:border-box}.record-header ul{clear:both;zoom:1;width:6.8rem;margin:0 auto}.record-header ul li{width:1.333333rem;text-align:center;float:left;font-size:.4rem;color:rgba(36,44,53,.8);height:1.173333rem;box-sizing:border-box}.record-header ul li:nth-child(2){margin:0 1.333333rem}.record-header ul .cur{color:#242c35;border-bottom:.04rem solid #242c35}.record-item{padding:.6rem .4rem}.record-item .hotc-right{float:left}.record-item .hotc-left{margin-left:.533rem;padding-top:0;width:6.906667rem}.record-item .hotc-right{height:.64rem;padding:.213333rem 0;line-height:.64rem}.record-item .right-predict{width:1.68rem;font-size:.8rem}.record-item .right-predict em{font-size:.293333rem;margin-left:.04rem}.record-item .right-predict i{width:.88rem;text-align:center;display:inline-block}.record-item .hotc-info-time em{margin-left:.533333rem}.always-fail{background:#437ba8;box-shadow:.026667rem .026667rem .106667rem #729cbd}.always-draw{background:#36a171;box-shadow:.026667rem .026667rem .106667rem #68b894}.pre-header{height:.8rem;line-height:.8rem;color:#aab5bd;font-size:.293333rem;background:#fff;border-bottom:1px solid #eaeaea;padding:0 .4rem;box-sizing:border-box}.pre-header ul{overflow:hidden}.pre-header ul li{width:1.36rem;text-align:center;margin-left:.4rem;float:left}.pre-header ul li:first-child{margin-left:0;text-align:left;width:3.133333rem}.pre-header ul li:last-child{text-align:right;margin-left:0;float:right;width:1.173333rem}.pre-header ul li:nth-child(2){margin-left:0}.hotc-cont{padding-top:.266667rem;background:#fff;border-bottom:1px solid #eaeaea}.hotc-tab-tit{font-size:.293333rem;color:#aab5bd;margin-bottom:.266667rem;height:.533333rem;line-height:.533333rem;padding-left:.4rem}.hotc-tab-tit em{color:#d25138;font-size:.266667rem;color:#fff;text-align:center;width:1.333333rem;height:.533333rem;display:inline-block;background:#d25138;float:right;border-top-left-radius:.053333rem;border-bottom-left-radius:.053333rem;box-shadow:.013333rem .013333rem .04rem rgba(210,81,56,.7)}.hotc-tit-red{color:#d25138}.hotc-tab-tit .too-cold{background:#437ba8;box-shadow:.013333rem .013333rem .04rem rgba(67,123,168,.7)}.hotc-tab-tit .too-draw{background:#5c788f;box-shadow:.013333rem .013333rem .04rem rgba(92,120,143,.7)}.hotc-tab-list{padding:0 .4rem;color:#242c35;font-size:.346667rem}.hotc-tab-item{margin-bottom:.533333rem}.hotc-tab-item ul{overflow:hidden;height:.373333rem;line-height:.373333rem}.hotc-tab-item ul li{width:1.2rem;text-align:center;margin-left:.533333rem;float:left;position:relative}.hotc-tab-item ul li em{display:inline-block;width:.346667rem;height:.346667rem;font-size:.266667rem;color:#fff;text-align:center;line-height:.346667rem;background:#d25138;margin-left:.053333rem;border-radius:.026667rem;position:absolute;top:50%;margin-top:-.173333rem}.hotc-tab-item ul li:last-child{text-align:right;margin-left:0;float:right}.hotc-tab-item ul li:nth-child(2){margin-left:0}.hotc-tab-item ul li:first-child{font-size:.373333rem;margin-left:0;text-align:left;width:3.133333rem}.each-resone-all{width:100%;position:absolute;bottom:.106667rem}.each-resone-all .zhzl-vs-left{margin-right:-.0533rem}.news-cont{background:#fff}.news-item{overflow:hidden;padding:.32rem .4rem;height:1.6rem;position:relative;border-bottom:1px solid #eaeaea}.news-list .news-item:last-child{border-bottom:none}.left-info{width:6.266667rem;float:left;color:#242c35;font-size:.373333rem}.info-tit{line-height:.466667rem;margin-top:.133333rem}.info-time{font-size:.293333rem;color:#aab5bd;height:.293333rem;line-height:.293333rem;position:absolute;left:.4rem;bottom:.373333rem}.news-pic{width:2.346667rem;height:1.6rem;float:right;text-align:right}.news-pic img{width:100%;height:100%}.alert-bg{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);z-index:99}.alert-share{height:4.266667rem;background:#fff;width:100%;position:fixed;bottom:0;left:0;z-index:100;box-sizing:border-box;padding-top:1.013333rem}.icons-cont{color:#aab5bd;font-size:.32rem;overflow:hidden;width:6.666667rem;margin:0 auto}.collec-box{width:1.333333rem;float:left;text-align:center;height:1.333333rem;position:relative}.collec-box:nth-child(1){float:left}.collec-box:nth-child(2){float:left;margin:0 1.2rem 0 1.333333rem}.collec-box:nth-child(3){float:right}.collec-box:nth-child(1) img{width:.72rem;height:.68rem}.collec-box:nth-child(2) img{width:.56rem;height:.626667rem}.collec-box:nth-child(3) img{width:.76rem;height:.626667rem}.star-cllect{width:.64rem;height:.6rem;display:inline-block;background:url(/mobile/touch/images/bifen/v124/collect.png) no-repeat;background-size:cover}.star-cllected{width:.64rem;height:.6rem;display:inline-block;background:url(/mobile/touch/images/bifen/v124/collected.png) no-repeat;background-size:cover}.share-icon{width:.56rem;height:.626667rem;display:inline-block;background:url(/mobile/touch/images/bifen/v124/share.png) no-repeat;background-size:cover}.collec-box p{height:.32rem;line-height:.32rem;margin-top:.133333rem;position:absolute;bottom:0;width:1.333333rem;text-align:center;left:0}.icon-close-s{width:1.333333rem;height:1.333333rem;position:absolute;bottom:0;left:50%;margin-left:-.666667rem;text-align:center;line-height:1.333333rem}.btn-share-notice{width:2.32rem;height:1.16rem;background:url(/mobile/touch/images/bifen/v124/click-s.png) no-repeat;background-size:cover;font-size:.373333rem;color:#fff;text-align:center;line-height:1rem;position:fixed;bottom:.186667rem;left:50%;margin-left:-1.16rem}.icon-close-s img{width:.293333rem;height:.306667rem}.btn-notice-anim{-webkit-animation:bounce 2s .2s ease infinite;-moz-animation:bounce 1s .2s ease infinite}@-webkit-keyframes bounce{0%{-webkit-transform:translateY(0)}20%{-webkit-transform:translateY(0)}40%{-webkit-transform:translateY(-.2rem)}50%{-webkit-transform:translateY(0)}60%{-webkit-transform:translateY(-.093333rem)}80%{-webkit-transform:translateY(0)}100%{-webkit-transform:translateY(0)}}.exit-cont{padding:.133333rem .266667rem;border-bottom:1px solid #eaeaea;background:#fff;overflow:hidden}.exit-cont ul li{width:1.893333rem;padding:.4rem 0 .4rem .266667rem;text-align:left;border-radius:.08rem;float:left;margin-right:.266667rem}.exit-cont ul .exit-pre{background:#d25138;box-shadow:.026667rem .026667rem .106667rem #e8a89b}.exit-cont ul .exit-hotc{background:#437ba8;box-shadow:.026667rem .026667rem .106667rem #729cbd}.exit-cont ul .exit-stre{background:#36a171;box-shadow:.026667rem .026667rem .106667rem #68b894}.exit-cont ul .exit-recod{background:#5c788f;box-shadow:.026667rem .026667rem .106667rem #adbbc7}.exit-cont ul li:last-child{margin-right:0}.exit-cont ul li p{color:rgba(255,255,255,.5);font-size:.293333rem}.exit-cont ul li p:first-child{color:rgba(255,255,255,1);font-size:.4rem;height:.4rem;line-height:.4rem}.exit-cont ul li p:nth-child(2){height:.293333rem;line-height:.293333rem;margin:.373333rem 0 .133333rem 0}.exit-cont ul li p:nth-child(3){height:.293333rem;line-height:.293333rem}.sk-point{position:relative;width:1.333333rem;height:1.333333rem;display:inline-block}.sk-point:after{content:"";display:inline-block;background:url(/mobile/touch/images/bifen/v124/share-point.png) no-repeat;width:.48rem;height:.106667rem;background-size:cover;position:absolute;top:50%;margin-top:-.053333rem;left:50%;margin-left:-.24rem}.zhzl-tips{padding:.133333rem 0}.gl-nav-nobor{border-top:0}.hot-cool-wrap .gl-nav:first-child{border-top:none}.jie-detail-nomb{margin-bottom:0}
</style>
<script>
    export default {
        computed: {
            metro () {
                return this.$store.state.home.zq.metro
            }
        },
        methods: {
            goBfyc ({page}) {
                this.$router.push(`/bfyc/${page}`)
            }
        },
        filters: {
            combatDesc: (cell) => {
                switch (cell.result) {
                case '3':
                    return `${cell.continous}连胜`
                case '1':
                    return `${cell.continous}连平`
                case '0':
                    return `${cell.continous}连负`
                default:
                    return ''
                }
            },
            predictResult: (code) => {
                switch (code) {
                case '3':
                    return '主胜'
                case '1':
                    return '平局'
                case '0':
                    return '主负'
                default:
                    return ''
                }
            }
        }
    }
</script>
