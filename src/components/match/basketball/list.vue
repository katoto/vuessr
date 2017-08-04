<template>
    <section class="hot-match" >
        <ul class="hot-match-list" v-for="list in match">
            <li class="hot-match-item">
                <!--<a :href="'#/basketball-league/rank/'+list['seasonid']" class="link-all-match">-->
                <span class="link-all-match">
                    <em class="match-icon"><img :src="list['matchlogo']"/></em>
                    <em class="match-tit">{{list['matchgbname']}}</em>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
    export default{
        props: {
            match: {
                type: Object,
                required: true
            }
        }
    }
</script>
