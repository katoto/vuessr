
<template>
    <div class="popBox l-full l-flex-column  slide-bottom-to-top">
        <div class="popTopbar" v-tap="{methods: showTips}"></div>
        <div class="popInner box-yc" style="z-index: 2">
            <div class="full-scroll">
                <!--顶部标题切换tab-->
                <div class="gsdz-list-box">
                    <ul class="gsdz-list">
                        <li class="wddz " :class="{'cur':customMy}" v-tap="{methods: ()=>customMy=true}">我的定制</li>
                        <li class="gslb" :class="{'cur':!customMy}" v-tap="{methods: ()=>customMy=false}">公司列表</li>
                    </ul>
                </div>
                <!--“我的定制”内容区-->
                <div class="my-companys" v-if="customMy && customOdds">
                    <ul class="company-items">
                        <li class="company-item" v-for="item,idx in customOdds.company.custom">
                            <span class="com-name"><em v-tap="{methods: deleteCustomOdd, idx}"></em>{{item.name}}</span>
                            <span class="com-zd" :class="{'had-zd':idx===0}"  v-tap="{methods: setCustomTop, idx}">置顶</span>
                        </li>
                    </ul>
                    <div class="company-notice">可前往公司列表添加赔率公司，最多可添加30家</div>
                </div>
                <!--“公司列表”内容区-->
                <div class="companys-list " v-if="!customMy && customKeyList">
                    <div class="ques-item" v-for="key in customKeyList">
                        <h1 class="zmpx">{{key}}</h1>
                        <ul class="company-items">
                            <li class="company-item" v-for="odd,index in customOdds.company.all[key]">
                                <span class="com-name">{{odd.name}}<i class="zlgs" v-if="odd.type=='1'">主</i><i v-if="odd.type=='3'" class="jys">E</i></span>
                                <span v-tap="{methods: addCustomOdd, key, idx: index}" :class="{'had-zd':odd.ischeck=='1'}" class="com-zd">{{odd.ischeck=='1'?'已添加':'添加'}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="company-notice">最多可添加30家
                        <i class="zlgs">主</i>主流公司
                        <i class="jys">E</i>交易所
                    </div>
                </div>
            </div>


        </div>
        <div class="popFooter popFooter-act">
            <span class="qx"  v-tap="{methods: closeDialog}">取消</span>
            <h2 class="f30">定制赔率公司</h2>
            <!--如果不可以保存，则bc加上class：had-bc-->
            <span class="bc had-bc" v-tap="{methods: updateCustomOdds}">保存</span>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/zqdetail'
    import noMatch from '~components/detail/football/odds/noMatch.vue'
    export default {
        props: {
            params: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.ptype
                }
            }
        },
        data () {
            return {
                customMy: true,
                customOdds: null,
                customKeyList: null
            }
        },
        components: {
            noMatch
        },
        async mounted () {
            let customOdds = await this.$store.dispatch(aTypes.getCustomOdds, {ptype: this.params.ptype === 'daxiaopan' ? 'daxiaoqiu' : this.params.ptype})
            this.customOdds = customOdds
            this.customKeyList = []
            for (let p in this.customOdds.company.all) {
                this.customKeyList.push(p)
            }
            this.customKeyList.sort()
        },
        methods: {
            deleteCustomOdd ({idx}) {
                if (!this.customOdds.company.custom || this.customOdds.company.custom.length < 2) {
                    return this.$store.dispatch('showToast', '至少选择一家公司')
                }
                // 更新总列表对应的状态
                let isBreak = false
                for (let j = 0, k = this.customKeyList.length; j < k; j++) {
                    let list = this.customOdds.company.all[this.customKeyList[j]]
                    for (let a = 0, b = list.length; a < b; a++) {
                        let item = list[a]
                        if (item.cid === this.customOdds.company.custom[idx].cid) {
                            this.customOdds.company.all[this.customKeyList[j]][a].ischeck = '0'
                            isBreak = true
                            break
                        }
                    }
                    if (isBreak) {
                        break
                    }
                }
                this.customOdds.company.custom.splice(idx, 1)
            },
            setCustomTop ({idx}) {
                console.log(idx)
                if (idx > 0) {
                    console.log(this.customOdds.company.custom)
                    this.customOdds.company.custom.unshift(this.customOdds.company.custom[idx])
                    this.customOdds.company.custom.splice(idx + 1, 1)
                }
            },
            addCustomOdd ({key, idx}) {
                if (!this.customOdds.company.custom || this.customOdds.company.custom.length > 29) {
                    return this.$store.dispatch('showToast', '最多可添加30家赔率公司')
                }
                let item = this.customOdds.company.all[key][idx]
                if (item.ischeck === '1') {
                    return
                }
                item.ischeck = '1'
                this.customOdds.company.all[key].splice(idx, 1, item)
                this.customOdds.company.custom.push({
                    cid: item.cid,
                    name: item.name,
                    type: item.type
                })
            },
            async updateCustomOdds () {
                let items = []
                this.customOdds.company.custom.forEach(function (item) {
                    items.push(item.cid)
                })
                await this.$store.dispatch(aTypes.updateCustomOdds, {ptype: this.params.ptype, items})
                this.$store.dispatch('showToast', '保存成功')
                //                this.$store.commit('beginRefresh')
                this.closeDialog()
            },
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            },
            showTips () {
                this.$store.dispatch('showToast', '底部选择‘保存’或‘取消’')
            }
        },
        computed: {
            match () {
                return this.$store.state.zqdetail.baseInfo
            }

        }

    }
</script>
<style scoped>
    .popBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 91;
        color: #242c35;
        overflow: hidden
    }
    .popBox .l-flex-column {
        position: relative;
        z-index: 5
    }
    .popTopbar {
        height: 1.173333rem;
        width: 100%
    }

    .popInner {
        background: #fff;
        display: block;
        border-radius: .186667rem .186667rem 0 0;
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        position: relative;
        overflow: hidden
    }

    .popInner .full-scroll{overflow-x:hidden;border-radius:.186667rem .186667rem 0 0}
    .full-scroll{position:absolute;top:0;right:0;left:0;bottom:0;overflow:auto;-webkit-overflow-scrolling:touch}


    .popFooter .bc,.popFooter .qx{color:#242c35;font-size:.4rem;height:1.32rem;line-height:1.32rem;width:1.066667rem}
    .popFooter .qx{float:left;padding-left:.4rem}
    .popFooter .bc{float:right;padding-right:.4rem;opacity:.5}
    .popFooter .had-bc{color:#d76650;opacity:1}

    .popFooter{border-top:1px solid #e8e8e8;background:#fff;width:100%;height:1.32rem;text-align:center;position:relative}
    .popFooter:active{background:#eee}
    .popFooter-act:active{background:#fff}
    .popFooter h2{display:inline-block;margin:0 auto;padding:0 .133333rem;white-space:nowrap;line-height:1.32rem;color:#242c35}


    .gsdz-list-box{border-bottom:1px solid #f4f4f4}
    .gsdz-list{color:#242c35;font-size:.4rem;overflow:hidden;width:5.6rem;margin:0 auto}
    .gsdz-list li{width:1.733333rem;margin:0 .533333rem;text-align:center;float:left;height:1.2rem;line-height:1.2rem;border-bottom:.04rem solid #fff;opacity:.8}
    .gsdz-list .cur{border-bottom:.04rem solid #242c35;opacity:1}
    .my-companys{padding:0 .4rem}
    .company-item{border-bottom:1px solid #eaeaea;height:1.066667rem;line-height:1.066667rem}
    .com-name em{display:inline-block;width:.373333rem;height:.373333rem;border-radius:50%;border:1px solid #d76650;color:#d76650;position:relative;top:.093333rem;margin-right:.333333rem}
    .com-name em:before{content:"";display:inline-block;width:.186667rem;height:1px;background:#d76650;position:absolute;top:50%;margin-top:-1px;left:50%;margin-left:-.093333rem}
    .com-zd{float:right;color:#5c788f}
    .had-zd{color:#5c788f;opacity:.5}
    .company-notice{font-size:.32rem;color:#aab5bd;text-align:center;margin:.533333rem 0}
    .zlgs{width:.346667rem;height:.346667rem;border-radius:.066667rem;display:inline-block;background:#d76650;color:#fff;font-size:.24rem;line-height:.346667rem;text-align:center;margin-left:.266667rem;margin-right:.053333rem;position:relative;bottom:.02rem}
    .jys{background:#36a171;width:.346667rem;height:.346667rem;border-radius:.066667rem;display:inline-block;color:#fff;font-size:.24rem;line-height:.346667rem;text-align:center;margin-left:.266667rem;margin-right:.053333rem;position:relative;bottom:.02rem}
    .zmpx{height:.666667rem;line-height:.666667rem;font-size:.32rem;color:rgba(36,44,53,.5);background:#f4f4f4;padding:0 .4rem;border:1px solid #eaeaea}
    .company-items{width:9.2rem;margin:0 auto}

</style>
