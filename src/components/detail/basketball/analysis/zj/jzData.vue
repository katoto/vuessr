<template>
    <div>
        <div class="zhedie-box">
            <div class="zj-nav">
                 历史交战
            </div>
            <fight-box :matchesObj='jzData' :isJz='isJz' v-if="noEmptyFlag"></fight-box>
            <div class="feed-back" v-else>
                <div class="feed-box">
                    <em>暂无数据</em>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fightBox from '~components/detail/basketball/analysis/zj/fightBox.vue'
export default {
    data () {
        return {
            isJz: true
        }
    },
    components: {
        fightBox
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.jzData)
        }
    },
    props: {
        jzData: {
            type: Object,
            required: true
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
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

    .feed-back {
        width: 100%;
        height: 1.733333rem;
        background: #fff;
        border-top: 1px solid #eaeaea
    }
    .feed-box {
        color: #787878;
        line-height: 1.733333rem;
        text-align: center
    }
    [data-dpr="1"] .feed-box {
        font-size: 13px
    }
    [data-dpr="2"] .feed-box {
        font-size: 26px
    }
    [data-dpr="3"] .feed-box {
        font-size: 39px
    }
</style>
