<template>
	<div class="zhedie" v-if="matchesObj">
		<div class="zd-detail">
			<div class="gaik clear">
				<span class="f30 color3 fl">近{{matchesObj.all_count}}场<span v-if="isJz">交战</span>&nbsp;&nbsp;&nbsp;{{baseInfo[hoa]}}</span>
                <span class="f30 fl"><i class="win tcell">{{matchesObj.win_count}}胜</i><i class="lose tcell">{{matchesObj.lost_count}}负</i></span>
                <span class="f30 color3 fl">胜率{{matchesObj.winrate}}%</span>
			</div>
			<div class="total-tips" v-if="isJz">
				{{matchesObj | allResultFmt}}
			</div>
			<div class="total-tips" v-else>
                {{matchesObj | avgResultFmt}}
			</div>

		</div>
		<table width="100%" cellpadding="0" cellspacing="0" class="fx-table">
			<colgroup>
			                <col width="24%">
			                <col width="15%">
			                <col width="23%">
			                <col width="15%">
			                <col width="">
			            </colgroup>
		<tbody>
			<tr>
                    <th>赛事</th>
                    <th>
                        <div class="textright">客队</div>
                    </th>
                    <th>比分[总分]</th>
                    <th>
                        <div class="textleft">主队</div>
                    </th>
                    <th>{{tabs[key-1]}}</th>
                </tr>
			<tr v-for="(match, idx) in matches">
				<td>
					<span class="color9">{{match.simpleleague}}</span><span class="colorc f20">{{match.date.slice(2, 10)}}</span>
					<em class="bkb-icon" v-if="bkbStatus[idx]"></em>
				</td>
				<td>
					<div class="textright" :class="awayTeamClass[idx]">
						<span class="color9" v-if="match.awaystanding > 0">[{{match.awaystanding}}]</span>
						{{match.awaysxname}}
					</div>
				</td>
				<td>
					{{match.ascore}}:{{match.hscore}}<span class="color9">[{{match.total}}]</span>
				</td>
				<td>
					<div class="textleft" :class="homeTeamClass[idx]">
						{{match.homesxname}}
						<span class="color9" v-if="match.homestanding > 0">[{{match.homestanding}}]</span>
					</div>
				</td>
				<td v-tap='{methods: switchResult}'>
					<div :class="resultClass[idx]">
						{{match | resultFmt(key)}}
					</div>
				</td>
			</tr>
		</tbody>
		</table>
	</div>
</template>

<script>
export default {
    props: {
        matchesObj: {
            type: Object,
            required: true
        },
        isJz: {
            type: Boolean,
            default: false
        },
        hoa: {
            type: String,
            default: 'homesxname'
        }
    },
    data () {
        return {
            key: 1,
            tabs: [
                '[分差]赛果',
                '让分',
                '大小'
            ],
            teamClassMap: [
                'win',
                'tie',
                'lose'
            ]
        }
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        matches () {
            return this.matchesObj.matches
        },
        bkbStatus () {
            return this.matches && this.matches.map((item, idx, arr) => {
                if (idx === arr.length - 1) return false
                let dt1 = new Date(item.date)
                dt1.setDate(dt1.getDate()) // 处理为相同日期

                let dt2 = new Date(arr[idx + 1].date)
                dt2.setDate(dt2.getDate() + 1) // 处理为相同日期
                return +dt1 === +dt2
            })
        },
        homeTeamClass () {
            return this.matches && this.matches.map((item) => {
                return this.makeTeamClass(item, item.homesxname)
            })
        },
        awayTeamClass () {
            return this.matches && this.matches.map((item) => {
                return this.makeTeamClass(item, item.awaysxname)
            })
        },
        resultClass () {
            return this.matches.map((match) => {
                return this.makeResultClass(match)
            })
        }

    },
    methods: {
        switchResult () {
            this.key = ((this.key + 1) % 4) || 1
        },
        makeResultClass (match) {
            let result = match['result' + this.key]
            switch (result) {
            case '胜':
            case '大':
            case '赢': return 'red-k'

            case '平':
            case '走': return 'green-k'

            case '负':
            case '小':
            case '输': return 'blue-k'

            default: return 'gray-k'
            }
        },
        makeTeamClass (match, name) {
            let result = match.result1
            let key = 0
            switch (result) {
            case '胜': key = 0; break
            case '平': key = 1; break
            case '负': key = 2; break
            }
            return name === this.baseInfo[this.hoa] ? this.teamClassMap[key] : ''
        }
    },
    filters: {
        avgResultFmt (input) {
            return `场均得分${input.avar_get}分，场均失${input.avar_lost}分， 大分${input.big_ball}次，小分${input.small_ball}次`
        },
        allResultFmt (input) {
            return `场均分差${input.avar_sub}分，场均总分${input.avar_all}， 大分${input.big_ball}次，小分${input.small_ball}次`
        },
        resultFmt (input, key) {
            let result = input['result' + key]
            let preStr = ''
            if (result === '') return '-'

            switch (key) {
            case 1: preStr = `[${(input.sub - 0).toFixed(1)}]`; break
            case 2: preStr = (input.rangfen - 0).toFixed(1); break
            case 3: preStr = (input.zongfen - 0).toFixed(1); break
            }
            return preStr + ' ' + result
        }
    }
}
</script>

<style scoped>
	.zhedie-box {
		background: #fff
	}

	.zhedie-box:last-child {
		margin-bottom: 0
	}
	.zd-detail {
		background: #fff;
		height: 1.84rem
	}
	.gaik {
		margin: 0 .4rem;
		height: .84rem;
		line-height: .84rem;
		padding: .293333rem 0 0
	}
	.gaik .fl {
		margin-right: .32rem
	}
	[data-dpr="1"] .gaik .f30 {
		font-size: 14px
	}

	[data-dpr="2"] .gaik .f30 {
		font-size: 28px
	}

	[data-dpr="3"] .gaik .f30 {
		font-size: 42px
	}
	.wins {
		color: #d3553d
	}
	.tie {
		color: #36a171
	}

	.lose {
		color: #437ba8
	}
	.tcell {
		display: table-cell
	}
	.gaik .fl {
		margin-right: .32rem
	}
	.total-tips {
		margin: 0 .4rem;
		color: #aab5bd
	}

	[data-dpr="1"] .total-tips {
		font-size: 11px
	}

	[data-dpr="2"] .total-tips {
		font-size: 22px
	}

	[data-dpr="3"] .total-tips {
		font-size: 33px
	}
	.fx-table {
		margin-top: .053333rem
	}

	.fx-table tr th {
		background: #fff;
		border-bottom: 1px solid #f4f4f4;
		height: .8rem;
		line-height: .8rem;
		color: #aab5bd;
		font-weight: 400
	}

	[data-dpr="1"] .fx-table tr th {
		font-size: 11px
	}

	[data-dpr="2"] .fx-table tr th {
		font-size: 22px
	}

	[data-dpr="3"] .fx-table tr th {
		font-size: 33px
	}

	.fx-table tr td {
		line-height: 1.066667rem;
		color: #242c35;
		text-align: center
	}

	[data-dpr="1"] .fx-table tr td {
		font-size: 12px
	}

	[data-dpr="2"] .fx-table tr td {
		font-size: 24px
	}

	[data-dpr="3"] .fx-table tr td {
		font-size: 36px
	}

	.fx-table tr .win {
		color: #d3553d
	}

	.fx-table tr .lose {
		color: #437ba8
	}

	.fx-table tr td .color9
	.fx-table tr td .colorc {
		color: #aab5bd
	}

	.fx-table tr td:first-child,
	.fx-table tr th:first-child {
		padding-left: .4rem;
		text-align: left;
		position: relative
	}

	.fx-table tr td:last-child,
	.fx-table tr th:last-child {
		padding-right: .4rem;
		text-align: right
	}

	.fx-table tr:last-child td {
		padding-bottom: .25rem
	}

	.fx-table tr td:first-child span {
		display: block;
		height: .426667rem;
		line-height: .426667rem
	}

	[data-dpr="1"] .fx-table tr td:first-child span {
		font-size: 10px
	}

	[data-dpr="2"] .fx-table tr td:first-child span {
		font-size: 20px
	}

	[data-dpr="3"] .fx-table tr td:first-child span {
		font-size: 30px
	}

	[data-dpr="1"] .fx-table tr td:first-child span.f23 {
		font-size: 11.5px
	}

	[data-dpr="2"] .fx-table tr td:first-child span.f23 {
		font-size: 23px
	}

	[data-dpr="3"] .fx-table tr td:first-child span.f23 {
		font-size: 34.5px
	}
	.blue-k,
	.gray-k,
	.green-k,
	.red-k {
		width: 1.28rem;
		height: .533333rem;
		line-height: .533333rem;
		padding-right: .106667rem;
		color: #fff;
		float: right
	}

	[data-dpr="1"] .blue-k,
	[data-dpr="1"] .gray-k,
	[data-dpr="1"] .green-k,
	[data-dpr="1"] .red-k {
		font-size: 11px
	}

	[data-dpr="2"] .blue-k,
	[data-dpr="2"] .gray-k,
	[data-dpr="2"] .green-k,
	[data-dpr="2"] .red-k {
		font-size: 22px
	}

	[data-dpr="3"] .blue-k,
	[data-dpr="3"] .gray-k,
	[data-dpr="3"] .green-k,
	[data-dpr="3"] .red-k {
		font-size: 33px
	}
	.green-k {
		background: #36a171
	}
	.red-k {
		background: #d25138
	}
	.blue-k {
		background: #437ba8
	}
	.gray-k {
		background: #c2c2c2
	}
	.fx-table tr td .color9,.fx-table tr td .colorc{color:#aab5bd;}

	.bkb-icon{width:.546667rem;height:1.093333rem;display:inline-block;background:url(~assets/style/images/detail/bkb.png) no-repeat;background-size:cover;position:absolute;top:.76rem;left:1.52rem}


</style>
