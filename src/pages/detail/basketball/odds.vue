
<template>
    <div>
        <div class="sk-detail-tap-box sk-detail-tap-box2">
            <ul class="sk-detail-tap three">
                <li :class="{cur:~$route.path.indexOf('/shengfu')}">
                    <router-link :to="{name: 'basketball-detail-odds-shengfu'}" replace>胜负</router-link>
                </li>
                <li :class="{cur:~$route.path.indexOf('/rangfenpan')}">
                    <router-link :to="{name: 'basketball-detail-odds-rangfenpan'}" replace>让分盘</router-link>
                </li>
                <li :class="{cur:~$route.path.indexOf('/daxiaofen')}">
                    <router-link :to="{name: 'basketball-detail-odds-daxiaofen'}" replace>大小分</router-link>
                </li>
            </ul>
        </div>

        <div class="zj-nav noborder"> 赔率列表
            <ul class="time-item">
                <li class="time-item-cur" v-tap="{methods: edit}">编辑</li>
            </ul>
        </div>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import customodds from '~components/detail/basketball/odds/customodds.vue'
    import {mTypes} from '~store/lqdetail'
    export default{
        methods:{
            edit () {
                this.$store.dispatch('ensureLogin')
                this.$store.commit(mTypes.setDialog, {component: customodds, params: {ptype: this.ptype}})
            },
        },
        computed: {
            ptype () {
                let tmp=this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1)
                switch(tmp){
                    case 'shengfu':{ return 'europe'; break }
                    case 'rangfenpan':{ return 'rangfen';break }
                    case 'daxiaofen':{ return 'zongfen';break }
                }
            }
        }
    }
</script>

<style scoped>
    a {
        color: inherit;
    }
</style>
