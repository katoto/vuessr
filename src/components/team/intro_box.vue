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
    .main-box{width:100%;margin-bottom:.266667rem;background:#fff;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .box-cont{padding:.266667rem .4rem .266667rem .533333rem}
    .introduction{font-size:0.346667rem;color:#787878;line-height:.666667rem}
    .introduction header{font-weight:700;margin-bottom:.4rem}
    .introduction p{margin-bottom:.4rem;}
    .member-list{padding:0.106667rem .533333rem}
    .member-list td{height:1.413333rem}
    .member-list td:nth-child(2){ text-indent: 0.1333rem;}
    .member-list td strong{font-size:.346667rem;font-weight:400}
    .member-list td p{font-size:.266667rem;height:.346667rem;line-height:.346667rem;color:#999}
    .member-empty {height:1.013333rem;color:#999;font-size:.373333rem;text-align:center; line-height: 1.01333rem;}
</style>
