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
    import {aTypes} from '~store/bfyc'
    import dataBox from '~components/bfyc/record/dataBox.vue'

    export default{
        async asyncData ({store}) {
            return store.dispatch(aTypes.getRecord)
        },
        methods: {
            onTab({tab}) {
                this.$router.push(`/bfyc/record/${tab}`)
            }
        },
        mounted () {
            this.$store.dispatch(aTypes.getRecord)
        }

    }
</script>
