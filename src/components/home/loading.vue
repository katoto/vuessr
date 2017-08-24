<template>
    <div class="loading">
        <div class="icon"></div>
        <div class="icon-shadow"></div>
    </div>
</template>
<style scoped>
    .loading {
        width: 100%;
        height: 2.5rem;
        text-align: center;
        position: relative
    }

    .loading .icon {
        display: inline-block;
        width: .72rem;
        height: .72rem;
        border-radius: 50% 50%;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAMAAABMOI/cAAAAVFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////8wXzyWAAAAG3RSTlMA+YX8+vQb7dbNpnlvYkQ7FwzhuLOgj4xIQQXn8XA9AAAAgElEQVQoz+WPSRKEIBAEBQX3GZ19rP//08JWxCD05sm8kNVFEE1ywK0wv82gebbusAp49OFFAB+eXUap1/lQML+cfSnG+qIGuTvrc1q1zK1heou3ckeo6Hk3h5KhFP2DNJNqhQilWaSUuNktdp7KdBIA4sP5xTU+6Ellyxitwi1HmooaqKw566UAAAAASUVORK5CYII=) no-repeat center center #ffba00;
        background-size: .32rem .373333rem;
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
        -webkit-animation: jump 1s infinite;
        animation: jump 1s infinite;
        position: absolute;
        left: 50%;
        margin-left: -.36rem;
        z-index: 2;
        margin-top: .3rem
    }

    @-webkit-keyframes jump {
        0% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: .933333rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        55% {
            top: 1.066667rem;
            height: .6rem;
            border-radius: .36rem .3rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        65% {
            top: .8rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        95% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        100% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }

    @keyframes jump {
        0% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: .933333rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        55% {
            top: 1.066667rem;
            height: .6rem;
            border-radius: .36rem .3rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        65% {
            top: .8rem;
            height: .72rem;
            border-radius: .36rem .36rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        95% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        100% {
            top: 0;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }

    .loading .icon-shadow {
        position: absolute;
        left: 50%;
        margin-left: -.08rem;
        width: .16rem;
        height: .213333rem;
        background: rgba(20, 20, 20, .08);
        box-shadow: 0 0 .16rem .24rem rgba(20, 20, 20, .05);
        border-radius: .08rem/.106667rem;
        -webkit-transform: scaleY(.1);
        transform: scaleY(.1);
        -webkit-animation: shrink 1s infinite;
        animation: shrink 1s infinite;
        z-index: 1;
        top: 2rem
    }

    @-webkit-keyframes shrink {
        0% {
            top: 1.8rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: 1.925rem;
            margin-left: -.025rem;
            width: .06rem;
            height: .02rem;
            background: rgba(20, 20, 20, .3);
            box-shadow: 0 0 .06rem .12rem rgba(20, 20, 20, .1);
            border-radius: .06rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        100% {
            top: 1.8rem;
            margin-left: -.08rem;
            width: .16rem;
            height: .213333rem;
            background: rgba(20, 20, 20, .05);
            box-shadow: 0 0 .16rem .24rem rgba(20, 20, 20, .05);
            border-radius: .08rem/.106667rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }

    @keyframes shrink {
        0% {
            top: 1.8rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
        50% {
            top: 1.925rem;
            margin-left: -.025rem;
            width: .06rem;
            height: .02rem;
            background: rgba(20, 20, 20, .3);
            box-shadow: 0 0 .06rem .12rem rgba(20, 20, 20, .1);
            border-radius: .06rem;
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out
        }
        100% {
            top: 1.8rem;
            margin-left: -.08rem;
            width: .16rem;
            height: .213333rem;
            background: rgba(20, 20, 20, .05);
            box-shadow: 0 0 .16rem .24rem rgba(20, 20, 20, .05);
            border-radius: .08rem/.106667rem;
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }
    }
</style>