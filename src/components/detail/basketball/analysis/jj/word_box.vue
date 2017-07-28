<template>
    <div class="popBox slide-bottom-to-top drunk-created" style="animation-fill-mode:both">
    	<div class="popLayer">
    	</div>
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

<style lang="css">
</style>
