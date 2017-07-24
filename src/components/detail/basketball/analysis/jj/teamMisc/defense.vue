<template>
    <div class="tContent" style="display:block">
        <div class="zj-nav">
            防守四要素
            <ul class="time-item">
                <li class="time-item-cur">名词解释</li>
            </ul>
        </div>
        <div class="gl-box">
            <data-box :data="defense" :dataType="defenseType"></data-box>
            <div class="infoTips" v-if="defense.desc">
                <i class="icon"></i>
                <p class="f24">
                    {{defense.desc}}
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import dataBox from '~components/detail/basketball/analysis/jj/teamMisc/data_box.vue'

export default {
    components: {
        dataBox
    },
    props: {
        defense: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            defenseType: {
                efg: {
                    zn: '防投篮',
                    en: 'eFG%'
                },
                tov: {
                    zn: '造误率',
                    en: 'TOV%'
                },
                orb: {
                    zn: '后场篮板率',
                    en: 'DRB%'
                },
                ftfga: {
                    zn: '防罚球',
                    en: 'FT/FGA'
                }
            }
        }
    }
}
</script>

<style lang="css">
</style>
