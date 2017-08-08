<template>
    <div class="main-box">
        <div class="box-tit">
            <h2> 球队实力 <em class="score">综合<i>{{score}}</i></em></h2> </div>
        <div class="score-cont" style="height:4.5rem">
            <iframe class="chartjs-hidden-iframe" tabindex="-1" style="width: 100%; display: block; border: 0px; height: 0px; margin: 0px; position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px;"></iframe>
            <canvas id="canvas" class="rader" height="1677" width="3726" style="display: block; width: 1242px; height: 559px;">
            </canvas>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        strength: {
            type: Object,
            required: true
        },
        score: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="css">
    .main-box{width:100%;margin-bottom:.266667rem;background:#fff;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .score{float:right;font-size: 0.32rem;margin-right: 0.533333rem}
    .score i{font-size: 0.426667rem;color: #f63f3f;}
    .score-cont{ width:100%;text-align: center; padding-top: 0.266667rem}

</style>
