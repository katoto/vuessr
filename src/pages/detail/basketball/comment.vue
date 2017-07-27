<template>
    <div id="comment-content">
        <snap v-if="vote" :baseinfo="baseinfo" :online="online" :vote="vote"></snap>

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

<script>
import {mTypes, aTypes} from '~store/lqdetail/mchao'
import snap from '~components/detail/basketball/comment/snap.vue'
export default {
    components: {
        snap
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
    computed: {
        refreshTime () { // 用户点击刷新按钮时间戳
            return this.$store.state.refreshTime
        },
        loaded () {
            return this.$store.state.refreshing === 0
        },
        reachEndTime () {
            return this.$store.state.mchao.reachEndTime
        },
        baseinfo () {
            return this.$store.state.mchao.baseinfo
        },
        comment () {
            return this.$store.state.mchao.comment
        },
        vote () {
            return this.comment.vote
        },
        online () {
            return this.comment.online
        },
        total () {
            return this.comment.total
        }
    },
    methods: {
        async fetchData () {
            this.$store.commit('startOneRefresh')
            let [{commentlist}] = await Promise.all([
                this.$store.dispatch(aTypes.getCommentList, {vtype: '2', fid: this.$route.params.fid, pageNo: 0, tab: 'time'}),
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
                type: '2',
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
    mounted() {
        this.fetchData()
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
}
</script>

<style lang="css">
.ui-empty-font {
    color: #b3b3b3;
    font-size: 0.4rem;
    padding: 0.22rem 0;
    text-align: center;
}
</style>
