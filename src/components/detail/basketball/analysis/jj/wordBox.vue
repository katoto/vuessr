<template>
	<div class="l-full l-flex-column">
		<div class="popTopbar" v-tap="{methods: closeDialog}">
		</div>
		<div class="popInner box-yc">
			<div class="full-scroll">
				<div class="mcjs-cont">
					<ul class="mcjs-list">
						<li :class="{'cur': tab === type}" v-for="(item, type) in params.wordData" v-tap="{methods: () => tab = type}">{{item.name}}</li>
					</ul>
				</div>
				<div class="mcjs-detail">
					<div class="mcjs-tit">
						{{params.wordData[tab].tit}}
					</div>
					<p>
						{{params.wordData[tab].desc}}
					</p>
				</div>
			</div>
		</div>
		<div class="popFooter" v-tap="{methods: closeDialog}">
			<span class="arrow"></span>
			<h2 class="f30">{{params.title}}</h2>
		</div>
	</div>
</template>

<script>
import {mTypes} from '~store/lqdetail'
export default {
    props: ['params'],
    data () {
        return {
            tab: this.params.cur
        }
    },
    methods: {
        closeDialog () {
            this.$store.commit(mTypes.setDialog, {})
        },
        noEmpty (obj) {
            if (obj) { return !!Object.keys(obj).length }
            return false
        }
    }
}
</script>

<style scoped>
	.popTopbar {
		height: 1.173333rem;
		width: 100%
	}
	.popInner {
		background: #fff;
		display: block;
		border-radius: .186667rem .186667rem 0 0;
		width: 100%;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		position: relative;
		overflow: hidden
	}
	.full-scroll {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		overflow: auto;
		-webkit-overflow-scrolling: touch
	}
	.popInner .full-scroll {
		overflow-x: hidden;
		border-radius: .186667rem .186667rem 0 0
	}


	.popFooter {
		border-top: 1px solid #e8e8e8;
		background: #fff;
		width: 100%;
		height: 1.32rem;
		text-align: center;
		position: relative
	}

	.popFooter:active {
		background: #eee
	}

	.popFooter h2 {
		display: inline-block;
		margin: 0 auto;
		padding: 0 .133333rem;
		white-space: nowrap;
		line-height: 1.32rem;
		color: #242c35
	}
	.arrow {
		overflow: hidden;
		height: .333333rem;
		width: .6rem;
		position: absolute;
		left: .4rem;
		top: .493333rem
	}

	.arrow:before {
		content: '';
		height: .16rem;
		width: .16rem;
		display: block;
		border: .053333rem solid #333;
		border-right-width: 0;
		border-top-width: 0;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		position: absolute;
		bottom: .093333rem;
		left: .093333rem
	}

	.mcjs-list{clear:both;padding:.533333rem .266667rem;overflow:hidden}
	.mcjs-list li{width:2.133333rem;height:.853333rem;float:left;background:#ebf1f5;color:#242c35;font-size:.373333rem;line-height:.853333rem;text-align:center;margin:.133333rem .106667rem;border-radius:.133333rem}
	.mcjs-list .cur{background:#5c788f;color:#fff}
	.mcjs-detail{padding:0 .4rem;font-size:.373333rem;color:#515e6d}
	.mcjs-tit{font-size:.426667rem;color:#242c35;font-weight:700;height:.8rem;line-height:.8rem}
	.mcjs-detail p{line-height:.666667rem}




</style>
