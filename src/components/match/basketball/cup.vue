<template>
    <section class="hot-match" >
        <ul class="hot-match-list" v-for="(item,index) in match">
            <li class="hot-match-item">
                <a class="link-all-match" @click="collap(index)">
                    <em class="match-icon">
                        <img :src="item['countrylogo']"/></em>
                    <em class="match-tit">{{item['countryname']}}</em>
                    <i class="icon-open" :class="{'icon-close':isActive[index]}"></i>
                </a>

                <!--各国联赛详细-->
                <ul class="hot-match-list match-list-detail" v-if="isActive[index]" v-for="detail in item.leaguelist">
                    <li class="hot-match-item">
                        <!--<a :href=" '#/basketball-league/rank/'+ detail.leagueid" class="link-all-match">-->
                        <router-link :to="{name: 'center-basketball-match-rank',params:{seasonid:list.seasonid}}">
                            <span class="link-all-match">
                                <em class="match-icon">
                                    <img :src="detail['matchlogo']"/></em>
                                <em class="match-tit">{{detail['matchgbname']}}</em>
                            </span>
                        </router-link>
                    </li>
                </ul>

            </li>
        </ul>
    </section>
</template>

<script>
    export default{
        props: [
            'match'
        ],
        data () {
            return {
                isActive: {}
            }
        },
        methods: {
            collap: function (index) {
                this.$set(this.isActive, index, !this.isActive[index])
            }
        }
    }
</script>
