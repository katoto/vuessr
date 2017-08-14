<template>
    <div class="zhedie-box">
        <div class="zhedie-box">
            <div class="zj-nav">
                澳门心水推荐
            </div>
            <div class="zhedie show" v-if="noEmptyFlag">
                <div class="pm-namel">
                    <span>{{macauNews.name}}</span><span class="suggest-status"> {{macauNews.result}}</span><span
                        class="suggest-power">信心指数</span><span class="suggest-stars"><i class="ico-star ico-star-active"
                                                                                        v-for="i in macauNews.stars"></i></span>
                </div>
                <div class="macao-txt">
                    <p>
                        {{macauNews.description}}
                    </p>
                </div>
            </div>
            <feed-back-no-data v-else></feed-back-no-data>
        </div>
    </div>
</template>

<script>
    import feedBackNoData from '~components/detail/feedBackNoData.vue'
    export default {
        props: {
            macauNews: {
                type: Object,
                required: true
            }
        },
        components: {
            feedBackNoData
        },
        computed: {
            noEmptyFlag () {
                return this.noEmpty(this.macauNews)
            }
        },
        methods: {
            noEmpty (obj) {
                if (obj) {
                    return !!Object.keys(obj).length
                }
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

    .pm-namel {
        background: #fff;
        line-height: 1.066667rem;
        padding: .213333rem .4rem 0;
        color: #333
    }

    [data-dpr="1"] .pm-namel {
        font-size: 14px
    }

    [data-dpr="2"] .pm-namel {
        font-size: 28px
    }

    [data-dpr="3"] .pm-namel {
        font-size: 42px
    }

    .suggest-power {
        padding-left: .266667rem
    }

    [data-dpr="1"] .suggest-power {
        font-size: 12px
    }

    [data-dpr="2"] .suggest-power {
        font-size: 24px
    }

    [data-dpr="3"] .suggest-power {
        font-size: 36px
    }

    .suggest-stars {
        vertical-align: middle;
        padding-left: .266667rem;
        height: .4rem;
        line-height: .4rem;
        position: relative
    }

    .ico-star {
        display: none;
        width: .386667rem;
        height: .386667rem;
        background: url(~assets/style/images/detail/star.png) no-repeat center -.533333rem;
        background-size: .386667rem
    }

    .ico-star-active {
        display: inline-block
    }

    .macao-txt {
        color: #787878;
        padding: 0 .4rem .48rem;
        text-align: justify
    }

    [data-dpr="1"] .macao-txt {
        font-size: 13px
    }

    [data-dpr="2"] .macao-txt {
        font-size: 26px
    }

    [data-dpr="3"] .macao-txt {
        font-size: 39px
    }
</style>
