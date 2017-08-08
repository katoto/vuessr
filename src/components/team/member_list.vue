<template>
    <div class="main-box">
        <div class="box-tit">
            <h2> {{name}} </h2> </div>
        <div class="member-list">
            <table width="100%" cellpadding="0" cellspacing="0">
                <colgroup>
                    <col width="10%">
                    <col width="">
                    <col width="18%"> </colgroup>
                <tbody>
                    <tr v-for="(member, idx) in members">
                        <td align="left"> <img class="member-face" :src="member.avatar"> </td>
                        <td align="left"> <strong>{{member.name}}</strong>
                            <p>{{member.nation}}</p>
                        </td>
                        <td align="right"> <strong>{{member.number | number}}</strong>
                            <p>{{goalResult[idx]}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        members: {
            type: Array,
            required: true
        }
    },
    computed: {
        goalResult () {
            return this.members.map((member) => {
                return this.getGoalResult(member)
            })
        }
    },
    methods: {
        getGoalResult (member) {
            let goalStr = member.goals ? member.goals + '球' : member.goals
            let assistsStr = member.assists ? member.assists + '助' : member.assists
            return goalStr + assistsStr
        }
    },
    filters: {
        number (num) {
            return num ? (num + '号') : '--'
        }
    }
}
</script>

<style lang="css" scoped>
    .main-box{width:100%;margin-bottom:.266667rem;background:#fff;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .table th{background:#fbfbfb;height:.8rem;font-size:.293333rem;color:#999;font-weight:400;border-bottom:1px solid #f1f1f1}
    .table td{height:.96rem; font-size: 0.32rem;}
    .table tr td:first-child,.table tr th:first-child{padding-left:.533333rem;color:#999}
    .introduction header{font-weight:700;margin-bottom:.4rem}
    .introduction p{margin-bottom:.4rem;}
    .member-list{padding:0.106667rem .533333rem}
    .member-face{width:.8rem;height:.8rem;border-radius:50% 50%}
    .member-list td{height:1.413333rem}
    .member-list td:nth-child(2){ text-indent: 0.1333rem;}
    .member-list td strong{font-size:.346667rem;font-weight:400}
    .member-list td p{font-size:.266667rem;height:.346667rem;line-height:.346667rem;color:#999}
    .member-face{width:.8rem;height:.8rem;border-radius:50% 50%}
</style>
