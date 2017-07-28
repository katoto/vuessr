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
                            <tr v-for="list in future_match[hoa]">
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
        future_match: {
            type: Object,
            required: true
        }
    },
    computed: {
        baseInfo () {
            return this.$store.state.lqdetail.baseInfo
        },
        noEmptyFlag () {
            return this.noEmpty(this.future_match.home) && this.noEmpty(this.future_match.away)
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

<style lang="css">
</style>
