<template>
    <div class="zhedie-box">
    	<div class="zhedie-box">
    		<div class="zj-nav noborder">
    			NBA排名
    		</div>
    		<div class="zhedie show" v-if="noEmptyFlag">
    			<table width="100%" cellpadding="0" cellspacing="0" class="fx-table fb-lq">
        			<tbody>
            			<tr>
            				<th width="14%">
            					排名
            				</th>
            				<th>
            					<div class="qiud">
            						球队
            					</div>
            				</th>
            				<th width="15%">
            					胜/负
            				</th>
            				<th width="15%">
            					胜率
            				</th>
            				<th width="15%">
            					胜差
            				</th>
            				<th width="15%">
            					状态
            				</th>
            			</tr>
            			<tr v-for="hoa in ['away', 'home']">
            				<td>
            					{{nbarank[hoa].order}}
            				</td>
            				<td>
            					<div class="lq-img">
            						<img class="simg" :src="nbarank[hoa].teamlogo">
            					</div>
            					{{nbarank[hoa].teamgbname}}
            				</td>
            				<td>
            					{{nbarank[hoa] | resultFmt}}
            				</td>
            				<td>
            					{{nbarank[hoa].winrate}}%
            				</td>
            				<td>
            					{{nbarank[hoa].windiff}}
            				</td>
            				<td :class="status[nbarank[hoa].winstatus].style">
            					{{nbarank[hoa].wintext}}{{status[nbarank[hoa].winstatus].text}}
            				</td>
            			</tr>
        			</tbody>
    			</table>
                <div class="inte-look zhedie" onclick="location.href='match_center/index.html#/basketballleague/rank/366'">完整积分榜&gt;</div>
    		</div>
            <div class="feed-back" v-else>
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
    	</div>
    </div>
</template>

<script>
export default {
    props: {
        nbarank: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            status: {
                '-1': {
                    style: '',
                    text: ''
                },
                '0': {
                    style: 'lose',
                    text: '连败'
                },
                '1': {
                    style: 'win',
                    text: '连胜'
                }

            }
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.nbarank)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    },
    filters: {
        resultFmt (input) {
            return `${input.win}/${input.lost}`
        }
    }
}
</script>

<style lang="css">
</style>
