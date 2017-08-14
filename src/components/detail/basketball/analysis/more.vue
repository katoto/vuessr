<template>
    <div class="box-arrow noborder" v-tap="{methods: collap}">
        <div class="zd-arrow" :class="{'rotate180': moreFlag}">
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            moreFlag: false
        }
    },
    methods: {
        collap () {
            this.moreFlag = !this.moreFlag
            this.$emit('collap', this.moreFlag)
        }
    }
}
</script>

<style scoped>
.box-arrow{height:1.066667rem;position:relative}
.box-arrow:active{background:#f4f4f4}
.list-yuce .box-arrow{height:.8rem;padding-top:0;margin-top:-.026667rem;background:#fff}
.noborder{border:0}
.popDetail .more .zd-arrow{display:inline-block}
.popDetail .more-up .zd-arrow{transform:rotate(180deg);-webkit-transform:rotate(180deg)}
.back-icon:before,.black-ball,.dian-ball,.gl-tico:after,.green-arrow,.green-pl:after,.ipt-icon,.jiaohuan,.person-mr,.red-arrow,.red-ball,.red-pl:after,.saixuan:after,.sh-arrow,.sk-gz:after,.wuxiao-ball,.zan-icon,.zd-arrow,.zj-nav .cur:after{background:url(~assets/style/images/detail/detail-icon.png) no-repeat;background-size:.533333rem 13.333333rem}
.zd-arrow{width:.533333rem;height:.177rem;position:absolute;top:50%;left:50%;margin:-.2rem 0 0 -.266667rem;background-position:center -10.84rem}
.rotate180{-webkit-animation:all .2s linear;animation:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}
.rotate180,.rotateborder{-webkit-transition:all .2s linear;transition:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}
</style>
