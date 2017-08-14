<template>
    <div class="ui-alert">
        <div class="ui-alert-tit">筛选</div>
        <div class="sx-nav">赛事筛选</div>
        <ul class="sx-list">
            <li :class="{cur: options.ss===0}" v-tap="{methods: ()=> options.ss = 0}">全部赛事</li>
            <li :class="{cur: options.ss===1}" v-tap="{methods: ()=> options.ss = 1}">仅本赛事</li>
        </ul>
        <div class="sx-nav">主客场筛选</div>
        <ul class="sx-list">
            <li :class="{cur: options.zkc===0}" v-tap="{methods: ()=> options.zkc = 0}">全部</li>
            <li :class="{cur: options.zkc===1}" v-tap="{methods: ()=> options.zkc = 1}">主客场相同</li>
        </ul>
        <div class="sx-nav">场数筛选</div>
        <ul class="sx-list">
            <template v-if="params.type === 'his'">
                <li :class="{cur: options.cs===0}" v-tap="{methods: ()=> options.cs = 0}">6场</li>
                <li :class="{cur: options.cs===1}" v-tap="{methods: ()=> options.cs = 1}">12场</li>
            </template>
            <template v-else>
                <li :class="{cur: options.cs===0}" v-tap="{methods: ()=> options.cs = 0}">10场</li>
                <li :class="{cur: options.cs===1}" v-tap="{methods: ()=> options.cs = 1}">20场</li>
            </template>
        </ul>
        <div class="ui-alert-ft">
            <div class="ui-alert-btn" v-tap="{methods: closeDialog}">取消</div>
            <div class="ui-alert-btn" v-tap="{methods: comfirm}">确定</div>
        </div>
    </div>
</template>
<script>
    import {mTypes} from '~store/zqdetail'
    export default {
        props: ['params'],
        data () {
            return {
                options: {
                    ss: 0,
                    zkc: 0,
                    cs: 0
                }
            }
        },
        created () {
            if (this.params.initOptions.leagueid === -1) {
                this.options.ss = 0
            } else {
                this.options.ss = 1
            }
            this.options.zkc = this.params.initOptions.hoa
            if (this.params.type === 'his') {
                if (this.params.initOptions.limit === 6) {
                    this.options.cs = 0
                } else {
                    this.options.cs = 1
                }
            } else {
                if (this.params.initOptions.limit === 10) {
                    this.options.cs = 0
                } else {
                    this.options.cs = 1
                }
            }
        },
        methods: {
            closeDialog () {
                this.$store.commit(mTypes.setDialog, {})
            },
            comfirm () {
                if (typeof this.params.onOk === 'function') {
                    if (this.params.type === 'his') {
                        this.params.onOk({
                            leagueid: this.options.ss === 0 ? -1 : this.params.leagueid,
                            hoa: this.options.zkc,
                            limit: this.options.cs === 0 ? 6 : 12
                        })
                    } else {
                        this.params.onOk({
                            leagueid: this.options.ss === 0 ? -1 : this.params.leagueid,
                            hoa: this.options.zkc,
                            limit: this.options.cs === 0 ? 10 : 20
                        })
                    }
                }
                this.closeDialog()
            }
        }

    }
</script>

<style scoped>
    /*筛选弹窗*/
    .ui-alert {
        position: absolute;
        z-index: 100;
        top: 50%;
        padding-bottom: 2.026667rem;
        left: 1.306667rem;
        right: 1.306667rem;
        background: #fff;
        border-radius: .08rem;
        box-sizing: border-box;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%)
    }

    .ui-alert-tit {
        margin-top: .266667rem;
        text-align: center;
        color: #000;
        font-size: .48rem;
        line-height: .786667rem
    }
    .sx-nav {
        color: #b3b3b3;
        margin: .186667rem 0 0 .76rem;
        line-height: .96rem
    }

    [data-dpr="1"] .sx-nav {
        font-size: 13px
    }

    [data-dpr="2"] .sx-nav {
        font-size: 26px
    }

    [data-dpr="3"] .sx-nav {
        font-size: 39px
    }
    .sx-list {
        margin-left: .76rem
    }

    [data-dpr="1"] .sx-list {
        font-size: 14px
    }

    [data-dpr="2"] .sx-list {
        font-size: 28px
    }

    [data-dpr="3"] .sx-list {
        font-size: 42px
    }

    .sx-list li {
        display: inline-block;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #dedede;
        border-radius: .106667rem;
        text-align: center;
        position: relative;
        color: #333;
        width: 2.72rem;
        margin-right: .32rem
    }

    .sx-list li.cur {
        color: #f63f3f;
        border: 1px solid #f63f3f
    }

    .sx-list li.cur:after {
        position: absolute;
        bottom: -.013333rem;
        right: -.013333rem;
        width: .906667rem;
        height: .76rem;
        content: "";
        background-position: center 0
    }
    .sx-nav {
        color: #b3b3b3;
        margin: .186667rem 0 0 .76rem;
        line-height: .96rem
    }

    [data-dpr="1"] .sx-nav {
        font-size: 13px
    }

    [data-dpr="2"] .sx-nav {
        font-size: 26px
    }

    [data-dpr="3"] .sx-nav {
        font-size: 39px
    }
    .ui-alert-ft {
        display: table;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #f6f6f6;
        border-radius: 0 0 .08rem .08rem;
        border-top: 1px solid #ddd
    }
    .ui-alert-btn {
        display: table-cell;
        height: 1.28rem;
        text-align: center;
        color: #36c;
        line-height: 1.28rem
    }
    [data-dpr="1"] .ui-alert-btn {
        font-size: 15px
    }
    [data-dpr="2"] .ui-alert-btn {
        font-size: 30px
    }
    [data-dpr="3"] .ui-alert-btn {
        font-size: 45px
    }

    .ui-alert-btn:nth-child(2) {
        border-left: 1px solid #ddd
    }
    .ui-alert-layer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .6);
        z-index: 3
    }
    .popLayer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: 90;
        background: rgba(0, 0, 0, .8)
    }

    .sx-list li.cur:after {
        background: url(~assets/style/images/detail/m-icon.png) no-repeat;
        background-size: .906667rem 2.533333rem
    }
</style>
