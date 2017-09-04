<template>
    <div class="main-box">
        <div class="box-tit">
            <h2> 球队实力 <em class="score">综合<i>{{score}}</i></em></h2> </div>
        <div class="score-cont" id="score-cont" style="height:4.5rem" >

        </div>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/radar'
export default {
    props: {
        strength: {
            type: Object,
            required: true
        },
        score: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            strengthType: {
                shoot: '投篮命中率',
                attack: '得分',
                rebound: '篮板',
                assist: '助攻',
                defense: '失分'
            }
        }
    },
    mounted () {
        // this.initEchart()
    },
    methods: {
        initEchart () {
            let myChart = echarts.init(document.getElementById('score-cont'))
            myChart.setOption(this.getOptions())
            window.onresize = () => {
                myChart.resize()
                myChart.setOption(this.getOptions())
            }
        },
        getOptions () {
            let indicatorArr = Object.keys(this.strengthType).map((type) => {
                return {
                    text: this.strengthType[type] + ' ' + this.strength[type][1] + (type === 'shoot' ? '%' : ''),
                    max: 1
                }
            })

            let valueArr = Object.keys(this.strengthType).map((type) => {
                return this.strength[type][0]
            })

            let fontSize = window.lib.flexible.rem2px(0.375)

            return {
                radar: {
                    indicator: indicatorArr,
                    center: ['50%', '50%'],
                    splitNumber: 3,
                    lineStyle: {
                        normal: {
                            width: 10,
                            color: '#ed6d86'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: '#fff',
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#fae1e6',
                            width: 2
                        }
                    },
                    name: {
                        textStyle: {
                            color: 'rgb(120, 120, 120)',
                            fontSize: fontSize,
                            fontFamily: 'Microsoft YaHei'
                        }
                    }

                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value: valueArr,
                            symbol: 'circle',
                            symbolSize: 15,
                            lineStyle: {
                                normal: {
                                    type: 'solid',
                                    width: 4,
                                    color: '#ed6d86'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    opacity: 0.2,
                                    color: '#ed6d86'
                                }
                            },
                        }
                    ]
                }]
            }
        }
    },
    watch: {
        strength () {
            this.initEchart()
        }
    }
}
</script>

<style lang="css" scoped>
    .main-box{width:100%;margin-bottom:.266667rem;background:#fff;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1}
    .box-tit{height:1.066667rem;border-bottom:1px solid #f1f1f1}
    .box-tit h2{font-size:.4rem;padding-left:.533333rem;line-height:1.066667rem}
    .score{float:right;font-size: 0.32rem;margin-right: 0.533333rem}
    .score i{font-size: 0.426667rem;color: #f63f3f;}
    .score-cont{ width:100%;text-align: center; padding-top: 0.266667rem}

</style>
