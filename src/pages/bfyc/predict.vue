<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/predict.html-->
<template>
    <div class="v124-wrap l-full l-flex-column" v-if="predict">

        <!--顶部的时间-->
        <section class="hotc-header">
            {{cur|fdate}}
            <!-- 我也不想这么写，谁叫服务端没数据时连expect_list都没有-->
            <ul>
                <li :class="{'cur':  currExpect && currExpect === (expect_list && expect_list[0])}"
                    v-tap="{methods: changeExpect , expect: expect_list && expect_list[0]}">昨日
                </li>
                <li :class="{'cur':  currExpect && currExpect === (expect_list && expect_list[1])}"
                    v-tap="{methods: changeExpect , expect: expect_list && expect_list[1]}">今日
                </li>
                <li :class="{'cur':  currExpect && currExpect === (expect_list && expect_list[2])}"
                    v-tap="{methods: changeExpect , expect: expect_list && expect_list[2]}">明日
                </li>
            </ul>
        </section>
        <div class="hot-cool-wrap l-flex-1 l-relative">
            <div class="l-full l-scroll-y">
                <!--比赛列表-->
                <section class="hotc-list">
                    <!--预测广告-->
                    <div class="notice-predict" v-if="good_news">
                        <p v-html="good_news">
                        </p>
                    </div>
                    <template v-if="matches && matches.length">
                        <template v-if="matches.length">
                            <ul>
                                <template v-for="match,idx in matches" v-if="match.status !== '4'">
                                    <!--未完场-->
                                    <li class="hotc-item hotc-item-going" v-tap="{methods: goAnalysis, fid: match.fid}"
                                        v-if="idx!==1">
                                        <div class="hotc-left">
                                            <div class="hotc-info-tit">{{match.homesxname}} VS {{match.awaysxname}}
                                            </div>
                                            <div class="hotc-info-time">{{match.order}} {{match.simpleleague}}
                                                {{match.matchtime.substr(5)}}
                                            </div>
                                        </div>
                                        <div class="hotc-right">
                                            <div class="left-statue" v-if="match.cell.on_target === '0'">未<br/>中</div>
                                            <div class="left-statue" v-else>命<br/>中</div>
                                            <div class="right-predict">
                                                <p>{{match.cell.probability}}<em>%</em></p>
                                                <p>{{match.cell.predict_result|predictResult}}
                                                    {{match.cell.predict_reback}}</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="hotc-item hotc-item-going" v-tap="{methods: goAnalysis, fid: match.fid}"
                                        v-if="idx===1" style="position: -webkit-sticky">
                                        <div class="hotc-left">
                                            <div class="hotc-info-tit">{{match.homesxname}} VS {{match.awaysxname}}
                                            </div>
                                            <div class="hotc-info-time">{{match.order}} {{match.simpleleague}}
                                                {{match.matchtime.substr(5)}}
                                            </div>
                                        </div>
                                        <div class="hotc-right">
                                            <div class="left-statue" v-if="match.cell.on_target === '0'">未<br/>中</div>
                                            <div class="left-statue" v-else>命<br/>中</div>
                                            <div class="right-predict">
                                                <p>{{match.cell.probability}}<em>%</em></p>
                                                <p>{{match.cell.predict_result|predictResult}}
                                                    {{match.cell.predict_reback}}</p>
                                            </div>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <!--已完场-->
                            <div class="tag-game-over" v-if="curStatus.history&&curStatus.latest">已完场</div>

                                <ul>
                                    <template v-for="match in matches" v-if="match.status === '4'">
                                        <li class="hotc-item" v-tap="{methods: goAnalysis, fid: match.fid}">
                                            <div class="hotc-left">
                                                <div class="hotc-info-tit">{{match.homesxname}}
                                                    {{match.homescore}}:{{match.awayscore}} {{match.awaysxname}}
                                                </div>
                                                <div class="hotc-info-time">
                                                    {{match.order}} {{match.simpleleague}}
                                                    {{match.matchtime.substr(5)}}
                                                </div>
                                            </div>

                                            <!--未中 加上statue-hit-no-->
                                            <div class="hotc-right" :class="{'statue-hit-no': match.cell.on_target === '0'}">
                                                <div class="left-statue" v-if="match.cell.on_target === '0'">未<br/>中</div>
                                                <div class="left-statue" v-else>命<br/>中</div>
                                                <div class="right-predict">
                                                    <p>{{match.cell.probability}}<em>%</em></p>
                                                    <p>{{match.cell.predict_result|predictResult}}
                                                        {{match.cell.predict_reback}}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </template>
                                </ul>

                            <p class="txt-predict">
                                赛前随赔率变化，预测概率也将有所变化。

                                <br/>离开赛时间越近预测概率准确性也就越高哦。

                            </p>
                        </template>
                    </template>
                    <prompt v-else type="no-data" tip0="暂无数据"/>

                </section>

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mTypes, aTypes} from '~store/bfyc.js'
    import Prompt from '~components/prompt.vue'
    export default {
        async asyncData ({store}) {
            if (store.state.bfyc.predict) {
                return {
                    cur: store.state.bfyc.predict.currExpect
                }
            } else {
                let predict = await store.dispatch(aTypes.getPredict)
                return {
                    cur: predict.currExpect
                }
            }
        },
        components: {
            Prompt
        },
        computed: {
            cur () {
                return this.$store.state.bfyc.currExpect
            },
            predict () {
                return this.$store.state.bfyc.predict
            },
            good_news () {
                return this.predict && this.predict.good_news
            },
            expect_list () {
                return this.$store.state.bfyc.expectList
            },
            currExpect () {
                return this.$store.state.bfyc.currExpect
            },
            matches () {
                return this.predict && this.predict.matches
            },
            curStatus () {
                let curStatus = {
                    latest: false,
                    history: false
                }
                if (this.matches) {
                    this.matches.forEach(match => {
                        if (match.status !== '4') {
                            curStatus.latest = true
                        } else {
                            curStatus.history = true
                        }
                    })
                }
                return curStatus
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            changeExpect ({expect}) {
                this.$store.commit(mTypes.setCurrExpect, expect)
                this.$store.dispatch(aTypes.getPredict, this.cur)
            },
            goAnalysis ({fid}) {
                this.$router.push({path: `/detail/football/${fid}/predict`, query: this.$route.query})
            },
            async fetchData () {
                await this.$store.dispatch(aTypes.getPredict, this.$store.state.bfyc.currExpect)
                if (!this.$store.state.bfyc.currExpect) {
                    this.$store.commit(mTypes.setCurrExpect, this.$store.state.bfyc.predict.curr_expect)
                    this.$store.commit(mTypes.setExpectList, this.$store.state.bfyc.predict.expect_list)
                }
            }
        },
        filters: {
            predictResult (pr) {
                //                3-主胜 1-平局 0-主负
                switch (pr) {
                case '1':
                    return '平局'
                case '0':
                    return '主负'
                case '3':
                    return '主胜'
                }
            },
            fdate (cur) {
                return cur && cur.replace('-', '年').replace('-', '月') + '日'
            }
        }
    }
</script>
<style scoped>
    .v124-wrap{width:100%;height:100%;background:#efefef}
    .hotc-header{box-sizing:border-box;padding:0 .4rem;height:1.173333rem;border-bottom:1px solid #eaeaea;background:#fff;color:#aab5bd;font-size:.346667rem;line-height:1.173333rem}
    .hotc-header ul{float:right;clear:both;zoom:1}
    .hotc-header ul li{float:left;box-sizing:border-box;width:.773333rem;height:1.173333rem;line-height:1.173333rem}
    .hotc-header ul li:nth-child(2){margin:0 .533333rem}
    .hotc-header ul .cur{border-bottom:3px solid #242c35;color:#242c35}
    .hot-cool-wrap .gl-nav:first-child{border-top:none}
    .hotc-list{padding-top:.266667rem;background:#fff}
    .hotc-item{clear:both;overflow:hidden;padding:.4rem .4rem;border-bottom:1px solid #eaeaea;background:#fff;zoom:1}
    .notice-predict{margin:0 auto;padding:.36rem 0;width:9.2rem;height:.333333rem;border:1px solid #eaeaea;border-radius:.08rem;box-shadow:.013333rem .013333rem .026667rem .013333rem rgba(239,239,239,.5)}
    .notice-predict p{padding-left:.133333rem;height:.333333rem;border-left:.053333rem solid #d25138;color:#515e6d;font-size:.373333rem;line-height:.333333rem}
    .notice-predict p >>> em{color:#d25138}
    .hotc-item-going .left-statue{display:none}
    .hotc-left{float:left;padding-top:.24rem;width:5.6rem;height:.933333rem}
    .hotc-info-tit{margin-bottom:.266667rem;height:.4rem;color:#242c35;font-size:.426667rem}
    .hotc-info-time{height:.293333rem;color:#aab5bd;font-size:.293333rem}
    .hotc-right{float:right;padding:.226667rem 0;height:1rem;border-radius:.053333rem;background:#d25138;box-shadow:.026667rem .026667rem .106667rem #e8a89b;color:#fff;text-align:center}
    .left-statue{float:left;box-sizing:border-box;width:.72rem;height:1rem;border-right:1px solid rgba(255,255,255,.5);color:rgba(255,255,255,.8);font-size:.373333rem;line-height:140%}
    .right-predict{float:left;width:2.213333rem}
    .right-predict p{height:.64rem;font-size:.64rem}
    .right-predict p:nth-child(1){text-indent:.12rem;line-height:.506667rem}
    .right-predict p:nth-child(2){margin-top:.026667rem;height:.373333rem;font-size:.373333rem;line-height:.373333rem}
    .right-predict p em{font-size:.293333rem}
    .tag-game-over{position:relative;width:100%;height:.8rem;border-bottom:1px solid #eaeaea;background:#efefef;color:#aab5bd;text-align:center;font-size:.293333rem;line-height:.8rem}
    .tag-game-over:before{position:absolute;top:50%;left:50%;display:inline-block;margin-left:-1rem;width:.4rem;height:1px;background:#aab5bd;content:""}
    .tag-game-over:after{position:absolute;top:50%;right:50%;display:inline-block;margin-right:-1rem;width:.4rem;height:1px;background:#aab5bd;content:""}
    .statue-hit-no{background:#bcd0de;box-shadow:.026667rem .026667rem .106667rem #dde7ee}
    .txt-predict{padding:.533333rem 0;background:#efefef;color:#aab5bd;text-align:center;font-size:.293333rem}


</style>
