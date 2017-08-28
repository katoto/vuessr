<template>

    <div class="l-full l-flex-column">
        <scroll-sel></scroll-sel>

        <div class="l-flex-1 l-relative">

            <router-view/>


        </div>

    </div>


</template>
<style scoped>
</style>
<script>
    import scrollSel from '~components/home/scrollSel.vue'
    export default {
        data () {
            return {
                showNav: false
            }
        },
        components: {
            scrollSel
        },
        methods: {
        },
        watch: {
        },
        head: {
            title: '足球比分-500彩票网'
        }
    }
</script>
