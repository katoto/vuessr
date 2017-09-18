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
    import {mTypes, aTypes} from '~store/home'
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
        async mounted () {
            const hasLogin = await this.$store.dispatch(aTypes.checkHasLogin)
            if (hasLogin) {
                this.$store.dispatch(aTypes.getConcernState, '1')
            }
        },
        destroyed () {
            this.$store.commit(mTypes.reset)
        }
    }
</script>
