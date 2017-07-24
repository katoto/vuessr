<template>
    <div class="zr-detail">
        <ul class="zr-detail-left">
            <li class="zr-detail-tit">球员</li>
            <li v-for="item in members">{{item.player | truncate(4)}}<em v-if="item.isinjury === '1'">伤</em></li>
        </ul>
        <div class="scroll-cont table-sslfz">
            <ul class="zr-detail-right">
                <li class="zr-detailer zr-detail-tit">
                    <ul>
                        <li v-for="(name, type) in BasketballMemberType">{{name}}</li>
                    </ul>
                </li>
                <li class="zr-detailer" v-for="item in members">
                    <ul>
                        <li v-for="(name, type) in BasketballMemberType">{{item[type]}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {BasketballMemberType} from '~common/constants'
export default {
    props: {
        members: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            BasketballMemberType
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

<style lang="css">
</style>
