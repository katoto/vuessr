<template>
    <div class="sk-btips">
        共{{all}}家公司为你提供数据，其中主流公司{{main}}家<br>
        <span>500彩票网提示：以上数据仅供参考，请以官方公布的数据为准</span>
    </div>
</template>
<script>
    export default {
        props: ['all', 'main']
    }
</script>
<style scoped>
    .sk-btips {
        color: #999;
        text-align: center;
        height: 1rem;
        padding: .533333rem 0;
        background: #efefef;
        line-height: .506667rem
    }

    [data-dpr="1"] .sk-btips {
        font-size: 11px
    }

    [data-dpr="2"] .sk-btips {
        font-size: 22px
    }

    [data-dpr="3"] .sk-btips {
        font-size: 33px
    }
    .colorc {
        color: #ccc
    }
</style>
