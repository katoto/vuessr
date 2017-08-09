<template>
    <div class="v124-wrap" v-if="news&&news.length">
        <section class="news-cont">
            <div class="gl-nav">相关新闻</div>
            <ul class="news-list">
                <li class="news-item" v-for="item, $index in items" v-tap="{methods: jumpUrl, url: item.staticurl}">
                    <div class="left-info">
                        <div class="info-tit">{{item.title|ftitle}}</div>
                        <!--<div class="info-time">2016-01-15 16:01:28</div>-->
                        <div class="info-time">{{item.pubtime|fpubtime}}</div>
                    </div>
                    <div class="news-pic"><img :src="item.indeximages" alt="新闻配图"></div>
                </li>
            </ul>
            <div class="zhzl-tips " v-if="nums >= news.length">资讯新闻由ME体育提供，不代表500彩票观点</div>
            <div class="box-arrow noborder" v-tap="{methods: toggleAll}" v-if="initSize<news.length">
                <!--展开后加上rotate180-->
                <div class="zd-arrow " :class="{'rotate180': nums === news.length}"></div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        props: {
            news: {
                type: Array,
                required: true
            },
            initSize: {
                type: Number
            }
        },
        data () {
            return {
                nums: 0
            }
        },
        computed: {
            items () {
                return this.news.slice(0, this.nums)
            }
        },
        beforeMount () {
            this.nums = this.initSize
        },
        methods: {
            jumpUrl ({url}) {
                location.href = url
            },
            toggleAll () {
                if (this.nums === this.initSize) {
                    this.nums = this.news.length
                } else {
                    this.nums = this.initSize
                }
                this.$emit('rs')
            }
        },
        filters: {
            fpubtime: function (tstamp) {
                let date = new Date(parseInt(tstamp + '000'))
                return [date.getFullYear(), (date.getMonth() + 1), date.getDate()].join('-') +
                    ' ' +
                    [date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours(), date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes(), date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()].join(':')
            },
            ftitle: function (title) {
                if (title.length > 28) {
                    return title.substr(0, 28) + '...'
                } else {
                    return title
                }
            }
        }

    }
</script>
<style scoped>
    .v124-wrap{background:#efefef;width:100%;height:100%;}
    .news-cont{background:#fff}
    .news-item {
        overflow: hidden;
        padding: .32rem .4rem;
        height: 1.6rem;
        position: relative;
        border-bottom: 1px solid #eaeaea
    }

    .news-list .news-item:last-child {
        border-bottom: none
    }

    .left-info {
        width: 6.266667rem;
        float: left;
        color: #242c35;
        font-size: .373333rem
    }

    .info-tit {
        line-height: .466667rem;
        margin-top: .133333rem
    }

    .info-time {
        font-size: .293333rem;
        color: #aab5bd;
        height: .293333rem;
        line-height: .293333rem;
        position: absolute;
        left: .4rem;
        bottom: .373333rem
    }

    .news-pic {
        width: 2.346667rem;
        height: 1.6rem;
        float: right;
        text-align: right
    }

    .news-pic img {
        width: 100%;
        height: 100%
    }
    .box-arrow{height:1.066667rem;position:relative}
    .box-arrow:active{background:#f4f4f4}
    .zd-arrow{width:.533333rem;height:.177rem;position:absolute;top:50%;left:50%;margin:-.2rem 0 0 -.266667rem;background-position:center -10.84rem}
    .rotate180{-webkit-animation:all .2s linear;animation:all .2s linear;-webkit-transform:rotate(180deg);transform:rotate(180deg)}

    .zhzl-tips{color:rgba(170,181,189,.5);text-align:center}
    [data-dpr="1"] .zhzl-tips{font-size:10px}
    [data-dpr="2"] .zhzl-tips{font-size:20px}
    [data-dpr="3"] .zhzl-tips{font-size:30px}
</style>
