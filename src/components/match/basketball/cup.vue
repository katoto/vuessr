<template>
    <section class="hot-match" >
        <ul class="hot-match-list" v-for="(item,index) in match">
            <li class="hot-match-item">
                <a class="link-all-match" @click="collap(index)">
                    <em class="match-icon">
                        <img :src="item['countrylogo']"/></em>
                    <em class="match-tit">{{item['countryname']}}</em>
                    <i class="icon-open" :class="{'icon-close':isActive[index]}"></i>
                </a>

                <!--各国联赛详细-->
                <ul class="hot-match-list match-list-detail" v-if="isActive[index]" v-for="detail in item.leaguelist">
                    <li class="hot-match-item">
                        <router-link :to="{name: 'center-basketball-match-rank',params:{seasonid:detail.seasonid},query:$route.query}">
                            <span class="link-all-match">
                                <em class="match-icon">
                                    <img :src="detail['matchlogo']"/></em>
                                <em class="match-tit">{{detail['matchgbname']}}</em>
                            </span>
                        </router-link>
                    </li>
                </ul>

            </li>
        </ul>
    </section>
</template>

<script>
    export default{
        props: [
            'match'
        ],
        data () {
            return {
                isActive: {}
            }
        },
        methods: {
            collap: function (index) {
                this.$set(this.isActive, index, !this.isActive[index])
            }
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
    .hot-match-list{ background: #fff; border-top: 1px solid #f1f1f1;width: 100%; color: #333; font-size: 0.373333rem;}
    .hot-match-item{ height: auto; line-height:1.33333rem;border-bottom: 1px solid #f1f1f1;  position:relative; }
    .match-icon{width: 0.586667rem; height: 0.586667rem; line-height:0.586667rem;display: inline-block; position:relative;  top:11%;text-align: center;}
    .match-icon img{ max-width: 100%; height: 100%;}
    .match-tit{margin-left:0.266667rem;}
    .link-all-match{font-size:0.373333rem; color: #333; display: block; padding-left: 0.533333rem;  position: relative;height:1.333333rem}
    .match-list-tab .match-tab-itm{ width: 20%;}
    .match-list-b .match-tab-itm{ width: 25%;}
    .icon-open{ width: 0.266667rem; height:0.16rem; display: inline-block;background: url('~assets/images/match/click-to-open.png'); position: absolute; right: 0.533333rem;  top: 50%; margin-top: -0.13333rem; background-size: cover}
    .icon-close{background: url('~assets/images/match/click-to-close.png') no-repeat;background-size: cover }
    .match-list-detail{ margin-bottom: 0;}
    .match-list-detail .hot-match-item{ padding-left: 0.96rem; border-top: none; height: 1.066667rem; line-height: 1.066667rem}
    .match-list-detail .hot-match-item:last-child{border-bottom: 0;}
</style>
