
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

<style>
    a {
        color: inherit;
    }
    .sk-detail-tap-box {
        text-align: center;
        height: 1.173333rem;
        padding: 0 .4rem;
    }
    .sk-detail-tap {
        border-bottom: 1px solid #e8e8e8;
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 1.173333rem;
        line-height: 1.173333rem
    }

    [data-dpr="1"] .sk-detail-tap {
        font-size: 12px
    }

    [data-dpr="2"] .sk-detail-tap {
        font-size: 24px
    }

    [data-dpr="3"] .sk-detail-tap {
        font-size: 36px
    }
    .sk-detail-tap li {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #aab5bd;
        height: 1.173333rem
    }

    .sk-detail-tap li:active {
        background: #f4f4f4
    }

    .sk-detail-tap li.cur,
    .sk-detail-tap li:active {
        color: #242c35
    }
</style>
