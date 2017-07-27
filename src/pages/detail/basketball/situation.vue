<template>
   <div>
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
</template>

<style scoped>
    a {
        color: inherit;
    }
</style>
