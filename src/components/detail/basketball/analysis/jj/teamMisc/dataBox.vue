<template>
    <div class="dataBox">
        <ul class="dataItem" v-for="(item, type) in dataType">
            <li class="itemL"><em class="num">{{data[type].away_value}}</em>
                <div class="dataItem-pm">
                    联盟第{{data[type].away_rank}}
                </div>
            </li>
            <li class="itemC"><span>{{item.zn}}</span>
                <div>
                    {{item.en}}
                </div>
            </li>
            <li class="itemR"><em class="num">{{data[type].home_value}}</em>
                <div class="dataItem-pm">
                    联盟第{{data[type].away_rank}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        dataType: {
            type: Object,
            requried: true
        }
    }
}
</script>

<style scoped>
    .dataBox{padding:.4rem .4rem .266667rem .4rem;border-bottom:1px solid #f4f4f4;text-align:center;}
    .dataItem{display:table;height:1.333333rem;width:100%}
    .dataItem li{display:table-cell;color:#515e6d;vertical-align:middle;height:1.733333rem}
    .dataItem .itemL{text-align:left;width:2.8rem;padding-left:.4rem}
    .dataItem .itemC{text-align:center;color:#aab5bd}
    .dataItem .itemR{text-align:right;width:2.8rem;padding-right:.4rem}
    [data-dpr="1"] .dataItem .num{font-size:23px}
    [data-dpr="2"] .dataItem .num{font-size:46px}
    [data-dpr="3"] .dataItem .num{font-size:69px}
    [data-dpr="1"] .box-yc .dataItem .num{font-size:27px}
    [data-dpr="2"] .box-yc .dataItem .num{font-size:54px}
    [data-dpr="3"] .box-yc .dataItem .num{font-size:81px}
</style>
