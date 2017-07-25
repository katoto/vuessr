<template>
    <div>
        <div class="dataBox" v-if="noEmpty(members)">
            <div class="zr-detail">
                <ul class="zr-detail-left">
                    <li class="zr-detail-tit">球员</li>
                    <li v-for="item in members.slice(0, cutLen)">{{item.player | truncate(4)}}<em v-if="item.isinjury === '1'">伤</em></li>
                </ul>
                <div class="scroll-cont table-sslfz">
                    <ul class="zr-detail-right">
                        <li class="zr-detailer zr-detail-tit">
                            <ul>
                                <li v-for="(name, type) in membersType">{{name}}</li>
                            </ul>
                        </li>
                        <li class="zr-detailer" v-for="item in members.slice(0, cutLen)">
                            <ul>
                                <li v-for="(name, type) in membersType">{{item[type]}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
        <div class="box-arrow noborder" v-if="members" v-tap="{methods: collap, lenght: members.length}">
            <div class="zd-arrow" :class="{'rotate180': moreFlag}">
            </div>
        </div>

    </div>
</template>

<script>
import {
    mTypes,
    aTypes
} from '~store/lqdetail/mchao'

export default {
    props: {
        members: {
            required: true
        },
        membersType: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            moreFlag: false,
            cutLen: 5
        }
    },
    methods: {
        collap({length}) {
            this.moreFlag = !this.moreFlag
            this.cutLen = this.moreFlag ? length : 5
            this.$store.commit(mTypes.updateScTime)
        },
        noEmpty(obj) {
            if(obj)
            return !!Object.keys(obj).length
            return false
        },
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

<style lang="css">
</style>
