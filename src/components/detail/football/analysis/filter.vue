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
