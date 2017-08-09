<template>
    <section class="hot-match l-flex-1 l-relative">
        <div class="l-full l-scroll-y ">
            <h1 class="hot-match-tit">热门</h1>
            <ul class="hot-match-list" v-for="list in footMatch">
                <li class="hot-match-item">
                    <a class="link-all-match" :href=" '/center/footballmatch/'+list.seasonid + '/integral'">
                        <em class="match-icon">
                            <img :src="list['matchlogo']">
                        </em>
                        <em class="match-tit">{{list['matchgbname']}}</em>
                    </a>
                </li>
            </ul>

            <div class="all-match">
                <!--<a href="#/match/football" class="link-all-match">全部赛事<i class="icon-more"></i></a>-->
                <router-link :to="{name:'center-football-league'}">
                    <span class="link-all-match">全部赛事<i class="icon-more"></i></span>
                </router-link>
            </div>

        </div>
    </section>

</template>

<script>
    import {aTypes} from '~store/center'
    export default{
        async asyncData ({store}) {
            await store.dispatch(aTypes.getFootballHot)
        },
        computed: {
            footMatch () {
                return this.$store.state.center.zqhot
            }
        },

        methods: {
            async fetchData () {
                let match = this.$store.state.center.zqhot
                if (!match) { await this.$store.dispatch(aTypes.getFootballHot) }
            }
        },
        mounted () {
            this.fetchData()
        }
    }
</script>

<style scoped>
    body,html{height:100%;-webkit-user-select:none;user-select:none;outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-moz-tap-highlight-color:rgba(0,0,0,0);-ms-tap-highlight-color:rgba(0,0,0,0);tap-highlight-color:rgba(0,0,0,0)}
    body,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,label,li,ol,p,ul{margin:0;padding:0;font-weight:400}
    body{font-size:15px;-webkit-text-size-adjust:none;font-family:Microsoft YaHei,Arial; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
    a{text-decoration:none}
    em,i,s{font-style:normal}
    li,ul{list-style:none}
    table{border-collapse:collapse}
    td{empty-cells:show;color:#333; padding:0;}
    button{border:0}
    cite,i{font-style:normal}
    .l-flex-1{ -webkit-box-flex: 1; flex:1;overflow: hidden}
    .l-scroll-y{overflow: auto;-webkit-overflow-scrolling:touch;}
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .l-relative{ position:relative;}
    .hot-match-tit{ height: 0.8rem; line-height:0.8rem;font-size: 0.373333rem; color: #666666; padding-left: 0.533333rem;}
    .hot-match-list{ background: #fff; border-top: 1px solid #f1f1f1;width: 100%; color: #333; font-size: 0.373333rem;}
    .hot-match-item{ height: auto; line-height:1.33333rem;border-bottom: 1px solid #f1f1f1;  position:relative; }
    .link-all-match{font-size:0.373333rem; color: #333; display: block; padding-left: 0.533333rem;  position: relative;height:1.333333rem}
    .match-icon{width: 0.586667rem; height: 0.586667rem; line-height:0.586667rem;display: inline-block; position:relative;  top:11%;text-align: center;}
    .match-icon img{ max-width: 100%; height: 100%;}
    .match-tit{margin-left:0.266667rem;}
    .all-match{height: 1.333333rem; width: 100%; background: #fff;  line-height: 1.33333rem;
        margin-top: 0.266667rem;margin-bottom: 0.266667rem;}
    .link-all-match{font-size:0.373333rem; color: #333; display: block; padding-left: 0.533333rem;
        position: relative;height:1.333333rem}
    .icon-more{content:'';display:inline-block;width:0.16rem; height:0.266667rem; background: url('~assets/images/match/link-to.png');  background-size:cover;position: absolute; right: 0.533333rem; top: 50%; margin-top: -0.13333rem;}
</style>
