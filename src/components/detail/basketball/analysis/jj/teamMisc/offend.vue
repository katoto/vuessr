<template>
    <div class="tContent" style="display:block">
        <div class="zj-nav">
            进攻四要素
            <ul class="time-item">
                <li class="time-item-cur">名词解释</li>
            </ul>
        </div>
        <div class="gl-box">
            <data-box :data="offend" :dataType="offendType"></data-box>
            <div class="infoTips" v-if="offend.desc">
                <i class="icon"></i>
                <p class="f24">
                    {{offend.desc}}
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
        offend: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            offendType: {
                efg: {
                    zn: '有效命中率',
                    en: 'eFG%'
                },
                tov: {
                    zn: '失误率',
                    en: 'TOV%'
                },
                orb: {
                    zn: '前场篮板率',
                    en: 'ORB%'
                },
                ftfga: {
                    zn: '造罚球',
                    en: 'FT/FGA'
                }
            }
        }
    }
}
</script>

<style lang="css">
</style>
