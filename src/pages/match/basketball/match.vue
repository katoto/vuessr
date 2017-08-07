<template>
    <div class="wrapper l-full l-flex-column">
        <basketballHeader></basketballHeader>
        <router-view></router-view>
    </div>
</template>

<script>
    import basketballHeader from '~components/match/basketball/basketball_header.vue'
    export default{
        components:{
            basketballHeader
        }

    }
</script>