<template>
   <div>
       <div v-if="!noData">
           <div class="sk-detail-tap-box sk-detail-tap-box2">
               <ul class="sk-detail-tap">
                   <li :class="{cur:~$route.path.indexOf('/event')}">
                       <router-link :to="{name: 'basketball-detail-situation-event'}" replace>事件</router-link>
                   </li>
                   <li :class="{cur:~$route.path.indexOf('/statistic')}">
                       <router-link :to="{name: 'basketball-detail-situation-statistic'}" replace>统计</router-link>
                   </li>
               </ul>
           </div>
           <div>
               <router-view></router-view>
           </div>
       </div>
       <div class="ui-empty" v-if="noData">
           <img src="http://tccache.500.com/mobile/widget/empty/images/07.png" class="w240">
           <div class="ui-empty-dfont">比赛时间 {{match.matchtime.substr(5, 11)}}</div>
           <div class="ui-empty-gfont">先去分析栏目看看吧</div>
       </div>

   </div>
</template>

<script>
    import {FootballStatusCode as StatusCode} from '~common/constants'
</script>

<style scoped>
    a {
        color: inherit;
    }
</style>
