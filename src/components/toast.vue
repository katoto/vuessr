<template>
    <div class="widget-toast-view">{{msg}}</div>
</template>
<script>
    export default {
        props: ['msg']
    }
</script>
<style scoped>
    .widget-toast-view {
        padding: 40px;
        top: 50%;
        left: 50%;
        color: #fff;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        position: absolute;
        z-index: 999;
        text-align: center;
    }
</style>
