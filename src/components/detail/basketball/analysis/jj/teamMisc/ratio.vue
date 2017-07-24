<template>
    <div class="tContent" style="display:block">
    	<div class="zj-nav">
    		球队进阶
    		<ul class="time-item">
    			<li class="time-item-cur">名词解释</li>
    		</ul>
    	</div>
    	<div class="gl-box">
            <data-box :data="team_misc.ratio" :dataType="ratioType"></data-box>
    		<div class="infoTips" v-if="team_misc.ratio.desc">
    			<i class="icon"></i>
    			<p class="f24">
    				{{team_misc.ratio.desc}}
    			</p>
    		</div>
    	</div>
        <div class="gl-box gl-zjBox">
            <data-box :data="data" :dataType="combatType"></data-box>
            <div class="infoTips" v-if="team_misc.combat.desc">
                <i class="icon"></i>
                <p class="f24">
                    {{team_misc.combat.desc}}
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
        team_misc: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            ratioType: {
                pace: {
                    zn: '节奏',
                    en: 'Pace'
                },
                offrtg: {
                    zn: '进攻效率',
                    en: 'Off Rtg'
                },
                defrtg: {
                    zn: '防守效率',
                    en: 'Def Rtg'
                }
            },
            combatType: {
                expect: {
                    zn: '实际战绩',
                    en: 'Win-Lost'
                },
                real: {
                    zn: '期望战绩',
                    en: 'Expected W-L'
                },
                sos: {
                    zn: '赛程强度',
                    en: 'SOS'
                }
            }
        }
    },
    computed: {
        data() {
            return {
                expect: this.team_misc.combat.expect,
                real: this.team_misc.combat.real,
                sos: this.team_misc.degree.sos
            }
        }
    }
}
</script>

<style lang="css">
</style>
