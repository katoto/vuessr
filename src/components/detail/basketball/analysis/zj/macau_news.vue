<template>
    <div class="zhedie-box">
  	<div class="zhedie-box">
  		<div class="zj-nav">
  			澳门心水推荐
  		</div>
  		<div class="zhedie show" v-if="noEmptyFlag">
  			<div class="pm-namel">
  				<span>{{macau_news.name}}</span><span class="suggest-status"> {{macau_news.result}}</span><span class="suggest-power">信心指数</span><span class="suggest-stars"><i class="ico-star ico-star-active" v-for="i in macau_news.stars"></i></span>
  			</div>
  			<div class="macao-txt">
  				<p>
  					{{macau_news.description}}
  				</p>
  			</div>
  		</div>
        <div class="feed-back" v-else>
            <div class="feed-box">
                <em>暂无数据</em>
            </div>
        </div>
  	</div>
  </div>
</template>

<script>
export default {
    props: {
        macau_news: {
            type: Object,
            required: true
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.macau_news)
        }
    },
    methods: {
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    }
}
</script>

<style lang="css">
</style>
