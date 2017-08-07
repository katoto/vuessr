<template>
    <div class="main-box">
        <div class="box-tit">
            <h2> 球队简介 </h2> </div>
        <article class="box-cont introduction" v-if="introStr">
            <section>
                <p v-html="introStr">
                </p>
            </section>
        </article>
        <div class="member-list member-empty" v-else>暂无数据</div>
    </div>
</template>

<script>
export default {
    props: {
        introStr: String,
        required: true
    }
}
</script>

<style lang="css">
</style>
