<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import '~assets/style/public/reset.css'
    import Vue from 'vue'
    import vueTap from 'v-tap'
    Vue.use(vueTap)
    export default {
        mounted () {
            this.$store.dispatch('initWebsocket')
        }
    }
</script>


<styleq>
    .l-box-center{display:-webkit-box; -webkit-box-align: center; -webkit-box-pack: center;display:flex;justify-content: center;align-items: center;  -webkit-box-orient: vertical;flex-flow: column;}
    .l-box-vertical-center{display: -webkit-box;-webkit-box-align: center;display: flex;align-items: center;-webkit-box-orient: horizontal; flex-flow: row;}
    .l-box-vertical-center-justify{display: -webkit-box;-webkit-box-orient: horizontal; flex-flow: row; -webkit-box-align: center;-webkit-box-pack: justify;display: flex;align-items: center;justify-content: space-between;}
    .l-box-vertical-center-begin{display: -webkit-box;-webkit-box-orient: horizontal; flex-flow: row; -webkit-box-align: center;-webkit-box-pack: start;display: flex;align-items: center;justify-content: flex-start;}
    .l-box-vertical-center-end{display: -webkit-box;-webkit-box-orient: horizontal; flex-flow: row; -webkit-box-align: center;-webkit-box-pack: end;display: flex;align-items: center;justify-content: flex-end;}
    .l-box-horizontal-center{display: -webkit-box;-webkit-box-pack: center;display: flex;justify-content: center;-webkit-box-orient: horizontal; flex-flow: row;}
    .l-flex-column{ display:-webkit-box; -webkit-box-orient: vertical; display:flex; flex-flow: column;height: 100% }
    .l-flex-row{ display:-webkit-box; -webkit-box-orient: horizontal; display:flex; flex-flow: row; width: 100%}
    .l-flex-1{ -webkit-box-flex: 1; flex:1;overflow: hidden}
    .l-scroll-y{overflow: auto;-webkit-overflow-scrolling:touch;}
    .l-full{ position: absolute; top:0; left:0; right:0; bottom:0 }
    .l-relative{ position:relative;}

    a{color:#fff}
    #app {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
    body {
        -webkit-user-select: none;
        user-select: none;
        outline: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -moz-tap-highlight-color: rgba(0, 0, 0, 0);
        -ms-tap-highlight-color: rgba(0, 0, 0, 0);
        tap-highlight-color: rgba(0, 0, 0, 0)
    }
    html, body, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, label, li, ol, p, ul {
        margin: 0;
        padding: 0;
        font-weight: 400
    }
    body {
        font-size: 15px;
        /*no*/
        -webkit-text-size-adjust: none;
        font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
        background: #efefef;
        width: 100%;
        color: #242c34
    }
    a {
        text-decoration: none
    }
    em, i, strong, s {
        font-style: normal
    }
    li, ul {
        list-style: none
    }
    table {
        border-collapse: collapse
    }
    td {
        empty-cells: show;
        color: #242c35;
    }
    button {
        border: 0
    }
    cite, i {
        font-style: normal
    }
    input[type=text], input[type=number], input[type=password] {
        -webkit-appearance: none
    }
    input, textarea {
        outline: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .fl {
        float: left
    }
    .fr {
        float: right
    }
    .clear {
        zoom: 1
    }
    .textleft {
        text-align: left
    }
    .textright {
        text-align: right
    }
    .textcenter {
        text-align: center
    }
    .clear:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }
    .f20{font-size:0.266rem}
    .f24{font-size:0.32rem}
    .f26{font-size:0.346rem}
    .f28{font-size:0.373rem}
    .f30{font-size:0.4rem}
</styleq>
