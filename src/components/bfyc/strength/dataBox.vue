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
        leftColorClass() {
            return this.data.map((match) => {
                return match.cell.home_percent < match.cell.away_percent ? 'green-bg' : 'gray-bg'
            })
        },
        rightColorClass() {
            return this.data.map((match) => {
                return match.cell.home_percent > match.cell.away_percent ? 'green-bg' : 'gray-bg'
            })
        }

    },
    methods: {
        goAnalysis({fid}) {
            this.$router.push(`/detail/football/${fid}/analysis/js`)
        }
    },
    filters: {
        score(match) {
            if (match.homescore && match.awayscore) {
                return `${match.homescore}:${match.awayscore}`
            } else {
                return 'VS'
            }
        },
        timeFmt(match) {
            return match.order + ' ' + match.simpleleague + ' ' + match.matchtime.substr(5)
        },
        curroddsFmt(currodds) {
            return currodds && currodds.join('/')
        }
    }
}
</script>

<style lang="css">
</style>
