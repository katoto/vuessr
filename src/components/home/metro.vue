<template>
    <div class="exit-cont" v-if="metro">
        <ul>
            <li class="exit-pre" v-tap="{methods: goBfyc, page: 'predict'}">
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
            <li class="exit-hotc"  v-tap="{methods: goBfyc, page: 'hotcool'}">
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
            <li class="exit-stre" v-tap="{methods: goBfyc, page: 'strength'}">
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
            <li class="exit-recod" v-tap="{methods: goBfyc, page: 'record'}">
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
        methods: {
            goBfyc({page}) {
                this.$router.push(`/bfyc/${page}`)
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
