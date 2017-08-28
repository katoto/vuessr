<template>
    <div>
        <div class="strengh-cont " v-for="(match, idx) in data" v-if="match.status !== '4'"
        v-tap="{methods: goAnalysis, fid: match.fid}">
        <div class="strengh-time">{{match | timeFmt}}<em>{{match.cell.currodds | curroddsFmt}}</em>
        </div>
        <div class="zhzl-box strengh-item">
            <div class="strengh-tit"><em>{{match.homesxname}}</em><em>VS</em><em>{{match.awaysxname}}</em></div>
            <div class="each-resone-all">
                <div class="zhzl-vs-left"
                :class="leftColorClass[idx]"
                :style="{width:match.cell.away_percent + '%'}"></div>
                <div class="zhzl-vs-right"
                :class="rightColorClass[idx]"
                :style="{width:match.cell.home_percent + '%'}"></div>
            </div>
            <div class="zhzl-bfb-left"><span>{{match.cell.home_percent}}</span><i>%</i></div>
            <div class="zhzl-bfb-right"><span>{{match.cell.away_percent}}</span><i>%</i></div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    computed: {
        leftColorClass () {
            return this.data.map((match) => {
                return match.cell.home_percent < match.cell.away_percent ? 'green-bg' : 'gray-bg'
            })
        },
        rightColorClass () {
            return this.data.map((match) => {
                return match.cell.home_percent > match.cell.away_percent ? 'green-bg' : 'gray-bg'
            })
        }

    },
    methods: {
        goAnalysis ({fid}) {
            this.$router.push(`/detail/football/${fid}/analysis/js`)
        }
    },
    filters: {
        score (match) {
            if (match.homescore && match.awayscore) {
                return `${match.homescore}:${match.awayscore}`
            } else {
                return 'VS'
            }
        },
        timeFmt (match) {
            return match.order + ' ' + match.simpleleague + ' ' + match.matchtime.substr(5)
        },
        curroddsFmt (currodds) {
            return currodds && currodds.join('/')
        }
    }
}
</script>

<style lang="css" scoped>
    .strengh-cont{box-sizing:border-box;padding:.266667rem .4rem .666667rem;height:3.173333rem;border-bottom:1px solid #eaeaea}
    .strengh-time{margin-bottom:.533333rem;color:#aab5bd;font-size:.293333rem}
    .strengh-time em{float:right}
    .strengh-tit em{float:left;display:inline-block;width:4.133333rem}
    .strengh-tit em:nth-child(2){display:inline-block;width:.933333rem;text-align:center}
    .strengh-tit em:nth-child(1){text-align:right}
    .strengh-tit em:nth-child(3){text-align:left}
    .strengh-item .zhzl-bfb-left,.strengh-item .zhzl-bfb-right{top:inherit;bottom:.293333rem;color:#515e6d;font-size:.346667rem}
    .strengh-item .zhzl-vs-left,.strengh-item .zhzl-vs-right{height:.16rem}
    .strengh-item{box-sizing:border-box;margin:0;padding-top:.666667rem;height:1.333333rem}
    .strengh-cont{box-sizing:border-box;padding:.266667rem .4rem .666667rem;height:3.173333rem;border-bottom:1px solid #eaeaea}
    .strengh-time{margin-bottom:.533333rem;color:#aab5bd;font-size:.293333rem}
    .strengh-time em{float:right}
    .strengh-tit{position:absolute;top:0;overflow:hidden;width:100%;height:.426667rem;color:#242c35;text-align:center;font-size:.426667rem;line-height:.426667rem}
    .strengh-item .zhzl-bfb-left,.strengh-item .zhzl-bfb-right{top:inherit;bottom:.293333rem;color:#515e6d;font-size:.346667rem}
    .strengh-item .zhzl-vs-left,.strengh-item .zhzl-vs-right{height:.16rem}
    .each-resone-all{position:absolute;bottom:.106667rem;width:100%}
    .each-resone-all .zhzl-vs-left{margin-right:-.0533rem}
    .zhzl-box {
        height: .973333rem;
        position: relative;
        margin: .4rem .4rem 0;
    }
    .gray-bg, .zhzl-gray {
        background: #bcd0de;
    }
    .green-bg, .zhzl-green {
        background: #5c788f;
    }
    .zhzl-vs-left {
        right: 0;
        margin-right: .04rem;
    }
    .zhzl-vs-left, .zhzl-vs-right {
        height: .106667rem;
        position: absolute;
        top: 0;
    }
    .zhzl-bfb-left, .zhzl-bfb-right {
        position: absolute;
        top: .066667rem;
        color: #333;
    }
    .zhzl-bfb-right {
        right: 0;
    }
    .strengh-item {
        box-sizing: border-box;
        margin: 0;
        padding-top: .666667rem;
        height: 1.333333rem;
    }
</style>
