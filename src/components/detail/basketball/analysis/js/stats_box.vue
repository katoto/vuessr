<template>
<div class="popBox plxqBox plxqBoxer slide-bottom-to-top drunk-created" style="animation-fill-mode: both;" v-if="stats">
    <div class="popLayer "></div>
    <div class="l-full l-flex-column  slide-bottom-to-top drunk-created">
        <div class="popTopbar" v-tap="{methods: closeDialog}"></div>
        <div class="popInner box-yc">
            <div class="full-scroll">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="plxq-table  jcsj-table">
                    <tbody>
                        <tr>
                            <th width="30%"></th>
                            <th width="35%" colspan="2" v-for="hoa in ['away', 'home']">
                                <span class="jcsj-img">
                    				<img :src="baseinfo[hoa + 'logo']">
                    			</span>
                                <em>{{baseinfo[hoa + 'sxname']}}</em>
                            </th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>场均</td>
                            <td>联盟排名</td>
                            <td>场均</td>
                            <td>联盟排名</td>
                        </tr>
                        <tr v-for="(name, type) in statsType">
                            <td>{{name}}</td>
                            <td v-if="noEmptyFlag">{{stats[type].home_per}}</td>
                            <td v-if="noEmptyFlag">{{stats[type].home_rank}}</td>
                            <td v-if="noEmptyFlag">{{stats[type].away_per}}</td>
                            <td v-if="noEmptyFlag">{{stats[type].away_rank}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="popFooter" v-tap="{methods: closeDialog}">
            <span class="arrow"></span>
            <h2 class="f30">基础数据</h2>
        </div>
    </div>
</div>
</template>

<script>
import {
    mTypes
} from '~store/lqdetail/mchao'
export default {
    props: ['params'],
    data() {
        return {
            statsType: {
                'points_per_game': '得分',
                'assists': '助攻',
                'rebounds': '篮板',
                'steals': '抢断',
                'cap': '盖帽',
                'mistakes': '失误',
                'foul': '犯规',
                'hit': '命中',
                'shots': '出手',
                'rate': '命中率',
                '3hit': '3分命中',
                '3shots': '3分出手',
                '3rate': '3分命中率',
                '2hit': '2分命中',
                '2shots': '2分出手',
                '2rate': '2分命中率',
                'penalty_hit': '罚篮命中',
                'penalty_num': '罚篮数',
                'penalty_rate': '罚篮命中率',
                'off_rebounds': '进攻篮板',
                'def_rebounds': '防守篮板',
            }
        }
    },
    computed: {
        baseinfo() {
            return this.params.baseinfo
        },
        stats() {
            return this.params.stats
        },
        noEmptyFlag() {
            return this.noEmpty(this.stats)
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit(mTypes.setDialog, {})
        },
        noEmpty(obj) {
            if(obj)
                return !!Object.keys(obj).length
            return false
        }
    }
}
</script>

<style lang="css">
</style>
