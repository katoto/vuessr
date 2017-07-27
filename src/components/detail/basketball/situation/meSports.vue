<template>
    <div class="v124-wrap" v-if="news&&news.length">
        <section class="news-cont">
            <div class="gl-nav">相关新闻</div>
            <ul class="news-list">
                <li class="news-item" v-for="item, $index in items"  v-tap="{methods: jumpUrl, url: item.staticurl}">
                    <div class="left-info">
                        <div class="info-tit">{{item.title|ftitle}}</div>
                        <!--<div class="info-time">2016-01-15 16:01:28</div>-->
                        <div class="info-time">{{item.pubtime|fpubtime}}</div>
                    </div>
                    <div class="news-pic"><img v-attr="{'src': item.indeximages}" alt="新闻配图"></div>
                </li>
            </ul>
            <div class="zhzl-tips " v-if="nums >= news.length">资讯新闻由ME体育提供，不代表500彩票观点</div>
            <div class="box-arrow noborder"   v-tap="{methods: toggleAll}" v-if="initSize<news.length">
                <!--展开后加上rotate180-->
                <div class="zd-arrow "  :class="{'rotate180': nums === news.length}"></div>
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
