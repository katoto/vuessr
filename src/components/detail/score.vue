<template>
    <div class="wrap">
        <div class="fen-bf" :class="{'fen-bf-active': homeChange}">
            <span class="score">{{homescore}}</span>
            <span class="score">{{newHomescore}}</span>
        </div>
        <div class="fen-ld">:</div>
        <div class="fen-bf" :class="{'fen-bf-active': awayChange}">
            <span class="score">{{awayscore}}</span>
            <span class="score">{{newAwayscore}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['homescore', 'newHomescore', 'awayscore', 'newAwayscore'],
        data () {
            return {
                homeChange: false,
                awayChange: false
            }
        },
        watch: {
            homescore () {
                this.homeChange = false
            },
            newHomescore () {
                this.homeChange = true
                setTimeout(() => {
                    this.$emit('update')
                }, 2000)
            },
            awayscore () {
                this.awayChange = false
            },
            newAwayscore () {
                this.awayChange = true
                setTimeout(() => {
                    this.$emit('update')
                }, 2000)
            }
        }

    }

</script>
<style>
    .wrap {
        display: inline-block;
    }
</style>
