<template>
    <div class="l-full l-flex-column">
        <div class="qi-list-box">
            <div class="qi-list">
                <ul class="responsive">
                    <li class="" v-if="preAndNextExpect.pre">
                        <router-link :to="{path: '/home/'+ type +'/'+ $route.params.tab + '/' + preAndNextExpect.pre}"
                                     replace>{{($route.params.tab === 'all')?'前一天':'前一期'}}
                        </router-link>
                    </li>
                    <li class="qi-gray" v-else>{{($route.params.tab === 'all')?'前一天':'前一期'}}</li>
                    <li class="qiqh" v-tap="{methods: toggleExpectList}">{{curExpect|expectFmt}}<i class="qi-arrow"></i>
                    </li>
                    <li class="" v-if="preAndNextExpect.next">
                        <router-link :to="{path: '/home/'+ type +'/'+ $route.params.tab + '/' + preAndNextExpect.next}"
                                     replace>{{($route.params.tab === 'all')?'后一天':'后一期'}}
                        </router-link>
                    </li>
                    <li class="qi-gray" v-else>{{($route.params.tab === 'all')?'后一天':'后一期'}}</li>
                </ul>
            </div>
        </div>
        <div class="qi-pop-box" style="position: relative;top:0" v-if="showExpectList">
            <div class="ui-navbox-item">
                <ul>
                    <li v-tap="{methods: selectExpect, expect: expect}" :class="{'select': expect === curExpect}"
                        v-for="expect in expectList"><span>{{expect}}</span></li>
                </ul>
            </div>
        </div>
        <div class="ui-alert-layer" style="z-index: 8" v-if="showExpectList" v-tap="{methods: toggleExpectList}"></div>
        <div class="l-flex-1 l-relative">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            expectList: {
                required: true,
                type: Array
            },
            curExpect: {
                required: true,
                type: String
            }
        },
        data () {
            return {
                showExpectList: false
            }
        },
        computed: {
            type () {
                if (this.$route.path.indexOf('/zq/')) {
                    return 'zq'
                } else {
                    return 'lq'
                }
            },
            preAndNextExpect () {
                let result = {}
                let index = 0
                this.expectList.some((expect, idx) => {
                    if (expect === this.curExpect) {
                        index = idx
                    }
                })
                result.next = this.expectList[index - 1]
                result.pre = this.expectList[index + 1]
                return result
            }
        },
        methods: {
            toggleExpectList () {
                this.showExpectList = !this.showExpectList
            }
        },
        filters: {
            expectFmt: function (expect) {
                if (!expect || !expect.match(/\d{4}-\d{2}-\d{2}/)) {
                    return expect + ' 期'
                }
                return expect + ' ' + ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(expect).getDay()]
            }
        }
    }
</script>
