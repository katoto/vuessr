<template>
    <div id="comment-content">
        <snap v-if="vote" :eventlist="eventlist" :statistic="statistic" :match="match" :online="online" :vote="vote"></snap>


        <div class="zj-nav"> 评论
            <ul class="volumeTab" id="tabBefore">
                <li :class="{'cur':tab=='time'}" v-tap="{methods: ()=>tab='time'}">最新</li>
                <li :class="{'cur':tab=='like'}" v-tap="{methods: ()=>tab='like'}">最热</li>
            </ul>
        </div>

        <ul class="comm-list" v-if="commentList.length>0">
            <li v-for="comment,idx in commentList">
                <span class="list-face">  <img :src="comment.photo.thumbnail||'http://tccache.500.com/mobile/touch/images/bifen/face.png'"></span>
                <div class="list-box">
                    <p class="list-box-tl" drunk-on="click:onReport(comment._id,comment.nickname)"><span class="name">{{comment.nickname}}</span>
                        <span class="time">{{comment.date.substring(5,10)}}<em>{{comment.date.substring(10,16)}}</em><em
                                v-if="comment.label">({{comment.label}})</em></span></p>
                    <div class="list-box-tr">
                        <!--点赞修改170630-->
                        <div class="dianz-cont" :class="{'dianzh-cont':comment.liked==='1'}"
                             v-tap="{methods: onLike, status: comment.liked, id: comment._id, index: idx}"
                             drunk-on="click:onLike(idx)">
                            <span class="dianz-icon"></span>
                            <em>{{comment.likes}}</em>
                        </div>
                        <!--评论-->
                        <div class="pingl-icon" v-tap="{methods:onReply, commentReplyId: comment._id, replyName: comment.nickname}" drunk-on="click:onReply(comment._id,comment.nickname)"><span></span>
                        </div>
                    </div>
                </div>
                <div class="list-cont" v-tap="{methods: clickComment, commentReplyId: comment._id, replyName:comment.nickname }" drunk-on="click:onReport(comment._id,comment.nickname)">{{comment.content}}</div>
                <div class="list-cont floors-cont" v-if="comment.r_content">
                    <ul class="comm-list">
                        <li>
                            <div class="list-cont">@{{comment.r_nickname}}:{{comment.r_content}}</div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="ui-empty-font" v-if="end&&commentList.length===0">暂无评论</div>

        <div class="item-loader" v-if="$store.state.refreshing">
            <div class="la-ball-pulse la-2x">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <p v-if="commentList.length!==0&&end" style="padding-bottom: 1.5555rem;" class="no-more">
        暂无更多评论…</p>
    </div>
</template>
<style>



    .ui-empty-font{color:#b3b3b3;font-size:0.4rem;padding:0.22rem 0;text-align:center;}
</style>

<script>
    import snap from '~components/snap.vue'
    import report from '~components/detail/report.vue'
    import {aTypes, mTypes} from '~store/zqdetail'
    export default {
        async asyncData ({store, route: {params}}) {
            await Promise.all([
                store.dispatch(aTypes.getEventAndStatistics, {fid: params.fid}),
                store.dispatch(aTypes.getTotal, {fid: params.fid})
            //                store.dispatch(aTypes.getVote, {fid: params.fid})
            //                store.dispatch(aTypes.getCommentList, {type: '1', fid: params.fid, pageNo: 0, tab: 'time'})
            ])
        },
        data () {
            return {
                tab: 'time',
                commentList: [],
                pageNo: 0,
                end: false,
                interval: null
            }
        },
        mounted () {
            this.fetchData()
            this.fetchCountAndEventAndStatisticsInterval()
        },
        components: {
            snap
        },
        watch: {
            loaded () {
                this.$store.commit(mTypes.updateScTime)
            },
            refreshTime () {
                this.pageNo = 0
                this.commentList = []
                this.fetchData()
            },
            tab () {
                this.end = false
                this.pageNo = 0
                this.commentList = []
                this.fetchCommentData()
            },
            replyTime () {
                this.end = false
                this.pageNo = 0
                this.commentList = []
                this.fetchCommentData()
            },

            reachEndTime () {
                if (this.end || !this.loaded) return
                this.pageNo++
                this.fetchCommentData(this.pageNo)
            }
        },
        methods: {
            async fetchData () {
                this.$store.commit('startOneRefresh')
                let [{commentlist}] = await Promise.all([
                    this.$store.dispatch(aTypes.getCommentList, {type: '1', fid: this.$route.params.fid, pageNo: 0, tab: 'time'}),
                    this.$store.dispatch(aTypes.getEventAndStatistics, {fid: this.$route.params.fid}),
                    this.$store.dispatch(aTypes.getTotal, {fid: this.$route.params.fid}),
                    this.$store.dispatch(aTypes.getVote, {fid: this.$route.params.fid})
                ])
                if (!commentlist.length) {
                    this.end = true
                }
                this.commentList = commentlist
                this.$store.commit('endOneRefresh')
            },
            async fetchCommentData (pageNo = 0) {
                this.$store.commit('startOneRefresh')
                let {commentlist} = await this.$store.dispatch(aTypes.getCommentList, {
                    type: '1',
                    fid: this.$route.params.fid,
                    pageNo: pageNo,
                    tab: this.tab
                })
                if (!commentlist.length) {
                    this.end = true
                }
                let commentList = [...this.commentList]
                commentList.push(...commentlist)
                this.commentList = commentList
                this.$store.commit('endOneRefresh')
            },
            fetchCountAndEventAndStatisticsInterval () {
                if (this.match.status === '1' || this.match.status === '2' || this.match.status === '3') {
                    if (this.interval) {
                        clearInterval(this.interval)
                        this.interval = null
                    }
                    this.interval = setInterval(() => {
                        this.$store.dispatch(aTypes.getEventAndStatistics, {fid: this.$route.params.fid})
                        this.$store.dispatch(aTypes.getTotal, {fid: this.$route.params.fid})
                    }, 1000 * 10)
                }
            },
            onReply ({commentReplyId, replyName}) {
                this.$store.dispatch('ensureLogin')
                this.$store.commit(mTypes.showEditorDialog, {commentReplyId, replyName})
            },
            async onLike ({status, id, index}) {
                this.$store.dispatch('ensureLogin')
                await this.$store.dispatch(aTypes.onLike, {status, id})
                let info = this.commentList[index]
                info.liked = (info.liked === '0' ? '1' : '0')
                info.likes = info.likes + (info.liked === '0' ? -1 : 1)
            },
            clickComment ({commentReplyId, replyName}) {
                this.$store.commit(mTypes.setDialog, {
                    component: report,
                    params: {
                        onClose: () => {
                            this.$store.commit(mTypes.setDialog, {})
                        },
                        onReply: () => {
                            this.$store.dispatch('ensureLogin')
                            this.onReply({commentReplyId, replyName})
                            this.$store.commit(mTypes.setDialog, {})
                        },
                        onReport: async () => {
                            this.$store.dispatch('ensureLogin')
                            await this.$store.dispatch(aTypes.onReport, commentReplyId)
                            await this.$store.commit(mTypes.setDialog, {})
                            this.$store.dispatch('showToast', '举报成功')
                        }
                    }
                })
            }
        },
        destroyed () {
            if (this.interval) {
                clearInterval(this.interval)
                this.interval = null
            }
        },
        computed: {
            refreshTime () { // 用户点击刷新按钮时间戳
                return this.$store.state.refreshTime
            },
            loaded () {
                return this.$store.state.refreshing === 0
            },
            reachEndTime () {
                return this.$store.state.zqdetail.reachEndTime
            },
            match () {
                return this.$store.state.zqdetail.baseInfo
            },
            comment () {
                return this.$store.state.zqdetail.comment
            },
            eventlist () {
                return this.comment.eventlist
            },
            statistic () {
                return this.comment.statistic
            },
            vote () {
                return this.comment.vote
            },
            online () {
                return this.comment.online
            },
            total () {
                return this.comment.total
            },
            replyTime () {
                return this.comment.replyTime
            }
        }

    }
</script>
<style scoped>
    .main-inner {
        min-height: 15.44rem;
        width: 100%;
        overflow-x: hidden;
        color: #242c35
    }


    /*小标题 start*/
    .gl-nav,
    .sk-nav,
    .zj-nav {
        height: .706667rem;
        line-height: .706667rem;
        background: #efefef;
        color: #242c35;
        position: relative;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        border-top: 1px solid #eaeaea;
        padding: .333333rem .4rem 0 .6133rem
    }

    [data-dpr="1"] .gl-nav,
    [data-dpr="1"] .sk-nav,
    [data-dpr="1"] .zj-nav {
        font-size: 12px
    }

    [data-dpr="2"] .gl-nav,
    [data-dpr="2"] .sk-nav,
    [data-dpr="2"] .zj-nav {
        font-size: 24px
    }

    [data-dpr="3"] .gl-nav,
    [data-dpr="3"] .sk-nav,
    [data-dpr="3"] .zj-nav {
        font-size: 36px
    }

    .gl-nav:before,
    .sk-nav:before,
    .zj-nav:before {
        content: '';
        position: absolute;
        left: .4rem;
        top: .533333rem;
        display: block;
        width: .053333rem;
        height: .3067rem;
        overflow: hidden;
        background: #242c35;
        border-radius: .026667rem .026667rem
    }
    /*over*/
    .new-comm-info {
        padding-top: .266667rem
    }
    .zhud-jq {
        padding-left: .533333rem;
        font-size: .32rem;
        color: #515e6d
    }
    .jiaoq-qz img {
        width: .16rem;
        height: .226667rem
    }

    .ked-jq {
        padding-right: .533333rem;
        text-align: right;
        height: .32rem;
        line-height: .32rem
    }

    .ked-jq .jiaoq-qz {
        margin-right: .133333rem
    }
    .comm-sk {
        width: 8.133333rem;
        margin: 0 auto;
        height: .933333rem;
        position: relative
    }
    .zud-sk-icon {
        width: 8.133333rem;
        height: .38rem;
        position: relative
    }
    .zud-sk-icon span {
        display: inline-block;
        position: absolute;
        bottom: .053333rem;
        background-size: cover
    }

    .ked-sk-icon span {
        display: inline-block;
        position: absolute;
        top: .04rem;
        background-size: cover
    }
    .jiaoh-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/jiaoh-icon.png) no-repeat;
        left: 15%
    }

    .huangp-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/huangp-icon.png) no-repeat;
        left: 20%
    }

    .hongp-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/hongp-icon.png) no-repeat;
        left: 50%
    }

    .lianghbh-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/lianghbh-icon.png) no-repeat;
        left: 12%
    }

    .jinq-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/jinq-icon.png) no-repeat;
        left: 0
    }

    .dianq-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/dianq-icon.png) no-repeat;
        left: 70%
    }

    .wul-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/wul-icon.png) no-repeat;
        left: 78%
    }

    .jinqwx-icon {
        width: .266667rem;
        height: .266667rem;
        background: url(~assets/style/images/detail/jinqwx-icon.png) no-repeat;
        left: 36%
    }
    .deep-blue {
        width: 62%;
        height: .16rem;
        background: #5c788f
    }
    .ked-bg {
        width: 8.133333rem;
        height: .16rem;
        background: #bcd0de;
        position: relative
    }
    .keg-img {
        width: 7.253333rem;
        height: .16rem;
        background: url(~assets/style/images/detail/ked.png) no-repeat;
        background-size: cover;
        position: absolute;
        left: 50%;
        margin-left: -3.626667rem;
        bottom: 0;
        z-index: 9
    }
    .ked-sk-icon {
        width: 8.133333rem;
        height: .4rem;
        position: relative
    }
    .ked-sk-icon span {
        display: inline-block;
        position: absolute;
        top: .04rem;
        background-size: cover
    }
    .touph-box {
        -webkit-animation: fadeIn .7s 0s ease both;
        -moz-animation: fadeIn .7s 0s ease both
    }

    @-webkit-keyframes fadeInIn {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }

    @keyframes fadeInIn {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    .data-line {
        width: 8.133333rem;
        height: .853333rem;
        margin: 0 auto;
        position: relative
    }

    .data-line ul {
        overflow: hidden;
        clear: both;
        height: .16rem;
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -.08rem
    }

    .data-line ul li {
        height: .16rem;
        float: left;
        box-sizing: border-box;
        background: #bcd0de
    }

    .data-line ul li:nth-child(1) {
        width: 22%;
        border-right: .053333rem solid #fff
    }

    .data-line ul li:nth-child(2) {
        width: 58%
    }

    .data-line ul li:nth-child(3) {
        width: 20%;
        border-left: .053333rem solid #fff
    }
    .data-detail {
        width: 8.133333rem;
        margin: 0 auto
    }

    .data-detail ul {
        overflow: hidden;
        clear: both;
        zoom: 1
    }

    .data-detail ul li {
        float: left;
        width: 33.3%;
        box-sizing: border-box
    }

    .data-detail ul li:nth-child(1) {
        text-align: left
    }

    .data-detail ul li:nth-child(2) {
        text-align: center
    }

    .data-detail ul li:nth-child(3) {
        text-align: right
    }

    .base-box .data-detail ul li {
        float: left;
        width: 50%;
        box-sizing: border-box
    }

    .base-box .data-detail ul li:nth-child(1) {
        text-align: left
    }

    .base-box .data-detail ul li:nth-child(2) {
        text-align: right
    }

    .data-detail ul li p:nth-child(1) {
        color: #515e6d;
        font-size: .4rem
    }

    .data-detail ul li p:nth-child(2) {
        font-size: .32rem;
        color: rgba(81, 94, 109, .5)
    }
    .volumeTab {
        float: right
    }

    .volumeTab li {
        float: left;
        color: #aab5bd;
        display: inline-block;
        text-align: center;
        height: .613333rem;
        line-height: .613333rem;
        background: #efefef;
        border: 1px solid #dadee4;
        margin-left: .24rem;
        border-radius: .306667rem;
        padding: 0 .24rem
    }

    .volumeTab li.cur,
    .volumeTab li:active {
        color: #333;
        background: #fff
    }
    .comm-list li {
        border-bottom: .013333rem solid #f4f4f4;
        padding-left: 1.59rem;
        position: relative;
        padding-top: .36rem;
        padding-bottom: .32rem;
        background: #fff
    }
    .comm-list .list-face {
        position: absolute;
        display: block;
        left: .346667rem;
        top: .32rem
    }

    .comm-list .list-face img {
        width: .853333rem;
        height: .853333rem;
        border-radius: 50% 50%
    }
    .comm-list .list-box {
        overflow: hidden;
        padding-right: .4rem
    }
    .comm-list .list-box-tl {
        float: left
    }

    .comm-list .list-box-tl .name {
        display: block;
        color: #515e6d
    }

    [data-dpr="1"] .comm-list .list-box-tl .name {
        font-size: 12px
    }

    [data-dpr="2"] .comm-list .list-box-tl .name {
        font-size: 24px
    }

    [data-dpr="3"] .comm-list .list-box-tl .name {
        font-size: 36px
    }

    .comm-list .list-box-tl .time {
        display: block;
        color: #aab5bd
    }

    [data-dpr="1"] .comm-list .list-box-tl .time {
        font-size: 9px
    }

    [data-dpr="2"] .comm-list .list-box-tl .time {
        font-size: 18px
    }

    [data-dpr="3"] .comm-list .list-box-tl .time {
        font-size: 27px
    }

    .comm-list .list-box-tr {
        float: right;
        height: .75rem;
        line-height: .75rem;
        overflow: hidden
    }

    .comm-list .list-box-tr .zan-num {
        color: #787878
    }

    .comm-list .list-box-tr .zan-icon {
        display: inline-block;
        width: .533333rem;
        height: .48rem;
        background-position: 0 -11.67rem;
        vertical-align: middle;
        position: relative;
        top: -.08rem
    }

    .comm-list .list-box-tr .zan-icon-red {
        background-position: 0 -12.266667rem;
        -webkit-animation: zanRed .3s linear;
        animation: zanRed .3s linear
    }

    @-webkit-keyframes zanRed {
        0% {
            -webkit-transform: scale(1);
            opacity: 1
        }
        50% {
            -webkit-transform: scale(1.5);
            opacity: .2
        }
        100% {
            -webkit-transform: scale(1);
            opacity: 1
        }
    }

    @keyframes zanRed {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1
        }
        50% {
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            opacity: .2
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1
        }
    }
    .comm-list .list-box-tl .time em {
        margin: 0 .133333rem
    }
    .dianz-cont {
        width: .8rem;
        height: .746667rem;
        position: relative;
        padding-left: .56rem;
        float: left
    }

    .dianz-cont .dianz-icon {
        width: .426667rem;
        height: .386667rem;
        display: inline-block;
        background: url(~assets/style/images/detail/dianz.png) no-repeat;
        position: absolute;
        left: .133333rem;
        top: 50%;
        margin-top: -.186667rem;
        background-size: contain
    }

    .dianz-cont em {
        color: #aab5bd;
        margin-left: .133333rem
    }

    [data-dpr="1"] .dianz-cont em {
        font-size: 12px
    }

    [data-dpr="2"] .dianz-cont em {
        font-size: 24px
    }

    [data-dpr="3"] .dianz-cont em {
        font-size: 36px
    }

    .dianzh-cont .dianz-icon {
        background: url(~assets/style/images/detail/dianz-h.png) no-repeat;
        background-size: contain
    }

    .pingl-icon {
        float: right;
        height: .746667rem;
        position: relative;
        width: .426667rem;
        height: .746667rem
    }

    .pingl-icon span {
        width: .426667rem;
        height: .386667rem;
        display: inline-block;
        background: url(~assets/style/images/detail/pingl.png) no-repeat;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -.186667rem;
        background-size: contain
    }

    .comm-list .list-cont {
        clear: both;
        padding-top: .266667rem;
        word-wrap: break-word;
        word-break: break-all
    }

    [data-dpr="1"] .comm-list .list-cont {
        font-size: 15px
    }

    [data-dpr="2"] .comm-list .list-cont {
        font-size: 30px
    }

    [data-dpr="3"] .comm-list .list-cont {
        font-size: 45px
    }

    .comm-list .list-cont:active {
        background: #eee
    }
    .comm-list .floors-cont {
        padding: 0;
        background: #fff;
        padding-top: .267rem
    }
    .floors-cont .comm-list {
        width: 8rem
    }

    .floors-cont .comm-list li {
        background: #f4f4f4
    }

    .floors-cont .comm-list li {
        padding-left: 0;
        border-bottom: .013333rem solid #eaeaea;
        padding-top: 0
    }

    .floors-cont .comm-list li:nth-child(2) {
        border-bottom: none
    }

    .floors-cont .comm-list li .list-box {
        padding-left: 1.067rem
    }

    .floors-cont .list-cont-down {
        background: #fff
    }

    .floors-cont .comm-list .list-face {
        color: #ccc;
        font-size: .933rem;
        width: 1.067rem;
        text-align: right;
        top: .3rem;
        left: 0;
        padding-right: .133rem;
        box-sizing: border-box
    }

    .floors-cont .comm-list .list-cont {
        padding-left: .266667rem;
        text-align: left;
        color: #515e6d
    }

    [data-dpr="1"] .floors-cont .comm-list .list-cont {
        font-size: 15px
    }

    [data-dpr="2"] .floors-cont .comm-list .list-cont {
        font-size: 30px
    }

    [data-dpr="3"] .floors-cont .comm-list .list-cont {
        font-size: 45px
    }

    .floors-cont .comm-list .ui-empty-font {
        padding: 0;
        width: 100%;
        text-align: center;
        border: none
    }
    .main:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
        visibility: hidden
    }

    .comm-list .list-cont {
        clear: both;
        word-wrap: break-word;
        word-break: break-all;
        padding-top: .23rem;
        color: #242c35;
        padding-right: .4rem
    }

    [data-dpr="1"] .comm-list .list-cont {
        font-size: 15px
    }

    [data-dpr="2"] .comm-list .list-cont {
        font-size: 30px
    }

    [data-dpr="3"] .comm-list .list-cont {
        font-size: 45px
    }




</style>