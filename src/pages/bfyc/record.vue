<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/record.html-->
<template>
    <div class="v124-wrap l-flex-column l-full">
        <section class="record-header">
            <ul>
                <li :class="{cur: ~$route.path.indexOf('/result')}" v-tap="{methods: onTab, tab: 'result'}">胜平负</li>
                <li :class="{cur: ~$route.path.indexOf('/asian')}" v-tap="{methods: onTab, tab: 'asian'}">亚盘</li>
                <li :class="{cur: ~$route.path.indexOf('/bigsmall')}" v-tap="{methods: onTab, tab: 'bigsmall'}">大小球</li>
            </ul>
        </section>
        <router-view></router-view>
    </div>
</template>

<script>
    export default{
        methods: {
            onTab ({tab}) {
                this.$router.replace(`/bfyc/record/${tab}`)
            }
        }
    }
</script>
<style scoped>
    .v124-wrap{width:100%;height:100%;background:#efefef}
    .record-header{box-sizing:border-box;width:100%;height:1.173333rem;border-bottom:1px solid #eaeaea;background:#fff;line-height:1.173333rem}
    .record-header ul{clear:both;margin:0 auto;width:6.8rem;zoom:1}
    .record-header ul li{float:left;box-sizing:border-box;width:1.333333rem;height:1.173333rem;color:rgba(36,44,53,.8);text-align:center;font-size:.4rem}
    .record-header ul li:nth-child(2){margin:0 1.333333rem}
    .record-header ul .cur{border-bottom:.04rem solid #242c35;color:#242c35}

</style>
