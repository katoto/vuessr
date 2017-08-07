<template>
    <div class="zhedie-box zhedie-box-wl">
    	<div>
    		<div class="zj-nav">
    			未来赛事
    		</div>
    		<div class="zhedie show">
                <template v-if="noEmptyFlag">
                    <table width="100%" cellpadding="0" cellspacing="0" class="fx-table" v-for="hoa in ['away', 'home']">
                        <tbody>
                            <tr>
                                <th width="22%">
                                    <span class="color3 f28">{{baseInfo[hoa + 'sxname']}}</span>
                                </th>
                                <th width="20%">
                                    日期
                                </th>
                                <th width="17%">
                                    <div class="textright">
                                        主队
                                    </div>
                                </th>
                                <th width="7%">
                                </th>
                                <th width="17%">
                                    <div class="textleft">
                                        客队
                                    </div>
                                </th>
                                <th>
                                    相隔
                                </th>
                            </tr>
                            <tr v-for="list in futureMatch[hoa]">
                                <td>
                                    <span class="color9">{{list.simpleleague}}</span>
                                </td>
                                <td>
                                    {{list.matchdate}}
                                </td>
                                <td>
                                    <div class="textright">
                                        {{list.homesxname}}
                                    </div>
                                </td>
                                <td>
                                    vs
                                </td>
                                <td>
                                    <div class="textleft">
                                        {{list.awaysxname}}
                                    </div>
                                </td>
                                <td>
                                    {{list.xdays}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <div class="feed-back" v-else>
                    <div class="feed-box">
                        <em>暂无数据</em>
                    </div>
                </div>
    		</div>
    	</div>
    </div>
</template>

<script>
export default {
    props: {
        futureMatch: {
            type: Object,
            required: true
        }
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        noEmptyFlag () {
            return this.noEmpty(this.futureMatch.home) && this.noEmpty(this.futureMatch.away)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) return !!Object.keys(obj).length
            return false
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


    .fx-table tr td .color9,
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


    .zhedie-box-wl .fx-table tr th:first-child span {
        color: #5c788f
    }
    [data-dpr="1"] .zhedie-box-wl .fx-table tr td:first-child span{font-size:12px}
    [data-dpr="2"] .zhedie-box-wl .fx-table tr td:first-child span{font-size:24px}
    [data-dpr="3"] .zhedie-box-wl .fx-table tr td:first-child span{font-size:36px;}
    .zhedie-box-wl .fx-table tr th:first-child span{color:#5c788f}
</style>
