<template>
    <section class="hot-match" >
        <ul class="hot-match-list" v-for="list in match">
            <li class="hot-match-item">
                <!--<a :href="'#/basketball-league/rank/'+list['seasonid']" class="link-all-match">-->
                <router-link :to="{name: 'center-basketball-match-rank',params:{seasonid:list.seasonid}}">
                    <span class="link-all-match">
                    <em class="match-icon"><img :src="list['matchlogo']"/></em>
                    <em class="match-tit">{{list['matchgbname']}}</em>
                </span>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    export default{
        props: ['match']
    }
</script>
