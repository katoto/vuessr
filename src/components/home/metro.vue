<template>
    <div class="exit-cont" v-if="metro">
        <ul>
            <li class="exit-pre" onclick="_hmt.push(['_trackEvent','zq','click','predict'])" @click="goBfyc('/score/bfyc/index.html#/predict')">
                <p>精选预测</p>
                <template v-if="metro.awesome_predict.homesxname">
                    <p>{{metro.awesome_predict.homesxname}}</p>
                    <p>{{metro.awesome_predict.cell.predict_result|predictResult}} {{metro.awesome_predict.cell.probability}}%</p>
                </template>
                <template v-else>
                    <p> </p>
                    <p>暂无推荐</p>
                </template>

            </li>
            <li class="exit-hotc" onclick="_hmt.push(['_trackEvent','zq','click','hotcool'])"  @click="goBfyc('/score/bfyc/index.html#/hotcool')">
                <p>冷热分布</p>
                <template v-if="metro.coldhot_distribute.order">
                    <p>{{metro.coldhot_distribute.order}}</p>
                    <p>{{metro.coldhot_distribute.tag.desc}}</p>
                </template>
                <template v-else>
                    <p> </p>
                    <p>暂无推荐</p>
                </template>

            </li>
            <li class="exit-stre" onclick="_hmt.push(['_trackEvent','zq','click','strength'])" @click="goBfyc('/score/bfyc/index.html#/strength')">
                <p>实力对比</p>
                <template v-if="metro.strength_compare.homesxname">
                    <p>{{metro.strength_compare.homesxname}}</p>
                    <p>{{metro.strength_compare.awaysxname}}</p>
                </template>
                <template v-else>
                    <p> </p>
                    <p>暂无推荐</p>
                </template>

            </li>
            <li class="exit-recod" onclick="_hmt.push(['_trackEvent','zq','click','record'])" @click="goBfyc('/score/bfyc/index.html#/record')">
                <p>战绩特征</p>
                <template v-if="metro.combat_feature.awaysxname">
                    <p>{{metro.combat_feature.cell.teamsxname}}</p>
                    <p>{{metro.combat_feature.cell|combatDesc}}</p>
                </template>
                <template v-else>
                    <p></p>
                    <p>暂无推荐</p>
                </template>

            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        computed: {
            metro () {
                return this.$store.state.home.zq.metro
            }
        },
        filters: {
            combatDesc: (cell) => {
                switch (cell.result) {
                case '3':
                    return `${cell.continous}连胜`
                case '1':
                    return `${cell.continous}连平`
                case '0':
                    return `${cell.continous}连负`
                default:
                    return ''
                }
            },
            predictResult: (code) => {
                switch (code) {
                case '3':
                    return '主胜'
                case '1':
                    return '平局'
                case '0':
                    return '主负'
                default:
                    return ''
                }
            }
        }
    }
</script>
