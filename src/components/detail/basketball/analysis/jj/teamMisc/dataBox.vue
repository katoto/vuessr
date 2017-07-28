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

<style lang="css">
</style>
