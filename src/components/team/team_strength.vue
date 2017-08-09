<template>
    <div class="main-box">
        <div class="box-tit">
            <h2> 球队实力 <em class="score">综合<i>{{score}}</i></em></h2> </div>
        <div class="score-cont" id="score-cont" style="height:4.5rem" >

        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
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
            echarts,
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
        let myChart = echarts.init(document.getElementById('score-cont'))
        myChart.setOption(this.getOptions())
        let self = this
        window.onresize = function () {
            myChart.resize();
            myChart.setOption(self.getOptions())
        };
    },
    methods: {
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

            let fontSize = lib.flexible.rem2px(0.375)
            console.log(fontSize)

            return {
                radar: {
                    indicator: indicatorArr,
                    center: ['50%', '50%'],
                    name: {
<<<<<<< HEAD
                        textStyle: {
                            color: 'rgb(120, 120, 120)',
                            fontSize: '50',
                            fontFamily: 'Microsoft YaHei'
                        }
                    }
=======
                       textStyle: {
                           color:'rgb(120, 120, 120)',
                           fontSize: fontSize,
                           fontFamily: 'Microsoft YaHei'
                       }
                   },
>>>>>>> team
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value: valueArr,
                            areaStyle: {
                                normal: {
                                    opacity: 0.5,
                                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                                        {
                                            color: '#e4dce3',
                                            offset: 0
                                        },
                                        {
                                            color: '#d18962',
                                            offset: 1
                                        }
                                    ])
                                }
                            }
                        }
                    ]
                }]
            }
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
