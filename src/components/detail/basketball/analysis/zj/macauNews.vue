<template>
    <div class="zhedie-box">
  	<div class="zhedie-box">
  		<div class="zj-nav">
  			澳门心水推荐
  		</div>
  		<div class="zhedie show" v-if="noEmptyFlag">
  			<div class="pm-namel">
  				<span>{{macauNews.name}}</span><span class="suggest-status"> {{macauNews.result}}</span><span class="suggest-power">信心指数</span><span class="suggest-stars"><i class="ico-star ico-star-active" v-for="i in macauNews.stars"></i></span>
  			</div>
  			<div class="macao-txt">
  				<p>
  					{{macauNews.description}}
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
        macauNews: {
            type: Object,
            required: true
        }
    },
    computed: {
        noEmptyFlag () {
            return this.noEmpty(this.macauNews)
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
