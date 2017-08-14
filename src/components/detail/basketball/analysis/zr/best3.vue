<template>
    <div class="tContent">
    	<div class="zj-nav">
    		球员-数据王
    	</div>
    	<div class="gl-box fx-zr-box"  v-if="noEmptyFlag">
            <template  v-for="(name, type) in Best3Type">
                <div class="qy-databox"  v-tap="{methods: collap, type: type}">
                    <ul class="dataItem">
                        <li class="itemL">
                            <div class="qy-icon">
                                <img alt="球员头像" :src="best3[type].away[0].photo">
                            </div>
                            <div class="qy-info">
                                <p>
                                    {{best3[type].away[0].number}}号
                                </p>
                                <p>
                                    {{best3[type].away[0].player | truncate(4)}}
                                </p>
                            </div>
                        </li>
                        <li class="itemC"><span class="qy-score">{{best3[type].away[0].value}}</span><span>{{name}}</span><span class="qy-score">{{best3[type].home[0].value}}</span></li>
                        <li class="itemR">
                            <div class="qy-info">
                                <p>
                                    {{best3[type].home[0].number}}号
                                </p>
                                <p>
                                    {{best3[type].home[0].player | truncate(4)}}
                                </p>
                            </div>
                            <div class="qy-icon">
                                <img alt="球员头像" :src="best3[type].home[0].photo">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="other-qy" v-if="Best3TypeStatus[type]">
                    <ul class="dataItem" v-for="idx in (best3[type].home.length - 1)">
                        <li class="itemL">
                            <div class="qy-info">
                                <p>{{best3[type].away[idx].player | truncate(4)}}</p>
                            </div>
                        </li>
                        <li class="itemC">
                            <span class="qy-score">{{best3[type].away[idx].value}}</span>
                            <span class="qy-score">{{best3[type].home[idx].value}}</span>
                        </li>
                        <li class="itemR">
                            <div class="qy-info">
                                <p>{{best3[type].home[idx].player | truncate(4)}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
    	</div>
        <feed-back-no-data v-else></feed-back-no-data>
    </div>
</template>

<script>
import {mTypes} from '~store/lqdetail'
import feedBackNoData from '~components/detail/feedBackNoData.vue'
export default {
    props: {
        best3: {
            type: Object,
            required: true
        }
    },
    components: {
        feedBackNoData
    },
    data () {
        return {
            Best3Type: {
                points: '得分',
                rebounds: '篮板',
                assists: '助攻',
                steals: '抢断',
                cap: '盖帽'
            },
            Best3TypeStatus: {
                points: false,
                rebounds: false,
                assists: false,
                steals: false,
                cap: false
            }
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.best3)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        },
        collap ({type}) {
            this.Best3TypeStatus[type] = !this.Best3TypeStatus[type]
            this.$store.commit(mTypes.updateScTime)
        }
    },
    filters: {
        truncate (input, length, tail) {
            if (input.length <= length) {
                return input
            }
            return input.slice(0, length) + (tail || '...')
        }
    }
}
</script>

<style scoped>
    .tContent {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    .gl-box,
    .zr-box {
        background: #fff
    }
    .qy-databox {
        padding: 0 .4rem 0 .4rem
    }
    .dataItem {
        display: table;
        height: 1.333333rem;
        width: 100%
    }

    .dataItem li {
        display: table-cell;
        color: #515e6d;
        vertical-align: middle;
        height: 1.733333rem
    }

    .dataItem .itemL {
        text-align: left;
        width: 2.8rem;
        padding-left: .4rem
    }

    .dataItem .itemC {
        text-align: center;
        color: #aab5bd
    }

    .dataItem .itemR {
        text-align: right;
        width: 2.8rem;
        padding-right: .4rem
    }

    [data-dpr="1"] .dataItem .num {
        font-size:   23px
    }

    [data-dpr="2"] .dataItem .num {
        font-size: 46px
    }

    [data-dpr="3"] .dataItem .num {
        font-size: 69px
    }

    .dataItem .red2 {

        color: #d3553d
    }
    .dataItem .green2 {
        color: #36a171
    }

    .dataItem .blue {
        color: #437ba8
    }

    .dataItem .item-info {
        display: block;
        color: #aab5bd
    }

    [data-dpr="1"] .dataItem .item-info {
        font-size: 11px
    }

    [data-dpr="2"] .dataItem .item-info {
        font-size: 22px
    }

    [data-dpr="3"] .dataItem .item-info {
        font-size: 33px
    }

    .dataItem .item-tit {
        color: #242c35;
        display: block;
        height: .72rem;
        line-height: .72rem
    }

    [data-dpr="1"] .dataItem .item-tit {
        font-size: 16px
    }

    [data-dpr="2"] .dataItem .item-tit {
        font-size: 32px
    }

    [data-dpr="3"] .dataItem .item-tit {
        font-size: 48px
    }
    .qy-icon {
        width: 1.2rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -.56rem
    }

    .qy-icon img {
        max-width: 1.2rem
    }
    .qy-info {
        color: #aab5bd;
        font-size: .293333rem
    }
    .fx-zr-box .itemR .qy-icon {
        right: 0;
        left: inherit
    }

    .fx-zr-box .itemC {
        width: 3.466667rem;
        height: 1.733333rem;
        line-height: 1.733333rem;
        overflow: hidden;
        clear: both
    }
    .fx-zr-box .itemL{padding-left:1.4rem;width:1.533333rem}
    .fx-zr-box .itemR{padding-right:1.4rem;width:1.533333rem}
    .fx-zr-box .itemL,.fx-zr-box .itemR{position:relative}


    .itemC .qy-score {
        font-size: .56rem;
        color: #515e6d;
        float: left;
        width: 1.2rem;
        text-align: right
    }

    .itemC .qy-score:last-child {
        float: right;
        text-align: left
    }
    .other-qy {
        padding: 0 .4rem
    }
    .other-qy {
        border-bottom: 1px solid #efefef;
        padding-bottom: .266667rem
    }
    .other-qy .dataItem,
    .other-qy li {
        height: .8rem
    }

    .other-qy .itemC {
        height: .8rem;
        line-height: .8rem
    }

    .other-qy .itemC .qy-score {
        font-size: .346667rem;
        color: #515e6d
    }
</style>
