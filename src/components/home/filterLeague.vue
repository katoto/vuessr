<template>
    <div class="filter-league"><span></span>
        筛选
    </div>
</template>
<style scoped>
    .filter-league:active,.filter-time .next-day:active,.filter-time .prev-day:active,.filter-time .today:active {
        background: #f4f4f4
    }

    .filter-league {
        width: 2.066667rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        border: 1px solid #eaeaea;
        border-radius: .106667rem;
        text-align: left;
        padding-left: 1.013333rem;
        box-sizing: border-box;
        position: relative;
        /*float: right*/
    }

    .filter-league span {
        display: inline-block;
        width: .426667rem;
        height: .426667rem;
        position: absolute;
        top: 50%;
        margin-top: -.213333rem;
        background: url(~assets/style/images/home/select.png) no-repeat;
        background-size: cover;
        left: .333333rem
    }

</style>
