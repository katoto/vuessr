<template>
    <div id="comment-content">
        <snap v-if="vote" :eventlist="eventlist" :statistic="statistic" :match="match" :online="online" :vote="vote"></snap>


        <div class="zj-nav"> 评论{{commentList.length}}
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
                        <div class="dianz-cont" :class="{'dianzh-cont':comment.liked=='1'}"
                             drunk-on="click:onLike(idx)">
                            <span class="dianz-icon"></span>
                            <em>{{comment.likes}}</em>
                        </div>
                        <!--评论-->
                        <div class="pingl-icon" v-tap="{methods:onReply, commentReplyId: comment._id, replyName: comment.nickname}" drunk-on="click:onReply(comment._id,comment.nickname)"><span></span>
                        </div>
                    </div>
                </div>
                <div class="list-cont" drunk-on="click:onReport(comment._id,comment.nickname)">{{comment.content}}</div>
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
    import {aTypes, mTypes} from '~store/zqdetail'

    export default {
        async asyncData ({store, route: {params}}) {
            await Promise.all([
                store.dispatch(aTypes.getEventAndStatistics, {fid: params.fid}),
                store.dispatch(aTypes.getTotal, {fid: params.fid}),
                store.dispatch(aTypes.getVote, {fid: params.fid})
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
                this.$store.commit(mTypes.showEditorDialog, {commentReplyId, replyName})
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
