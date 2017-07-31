<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/record.html-->
<template>



</template>

<script type="text/javascript">
    import {aTypes} from '~store/bfyc.js'
    import Prompt from '~components/prompt.vue'
    export default{
        async asyncData ({store, route: {params}}) {
            await store.dispatch(aTypes.getHotcool)
        },
        components: {
            Prompt
        },
        data() {
            return {
                dataType: {
                    avrodds: '百家欧赔',
                    europe: '欧赔概率',
                    betfair: '必发交易',
                    exp: '冷热'
                }
            }
        },
        computed: {
            hotcool() {
                return this.$store.state.bfyc.hotcool
            },
            curStatus() {
                let curStatus = {
                    latest: false,
                    history: false
                }
                if (this.hotcool && this.hotcool.matches) {
                    this.hotcool.matches.forEach(match => {
                        if (match.status !== '4') {
                            curStatus.latest = true
                        } else {
                            curStatus.history = true
                        }
                    })
                }
                return curStatus
            },
            descClass() {
                return this.hotcool.matches.map((match) => {
                    return this.makeDescClass(match.tag.desc)
                })
            },
            noEmptyFlag() {
                return this.noEmpty(this.hotcool.matches)
            }
        },
        methods: {
            goAnalysis({fid}) {
                this.$router.push(`/detail/football/${fid}/odds/europe`)
            },
            makeDescClass (desc) {
                switch (desc) {
                case '胜过冷':
                case '负过冷':
                case '平局过冷':
                    return 'too-cold'
                case '胜过热':
                case '负过热':
                case '平局过热':
                    return ''
                case '规模较小':
                case '规模适中':
                    return 'too-draw'
                default:
                    return ''
                }
            },
            noEmpty (obj) {
                if (obj) { return !!Object.keys(obj).length }
                return false
            }
        },
        mounted () {
            this.$store.dispatch(aTypes.getHotcool)
        },
        filters: {
            score(match) {
                if (match.homescore && match.awayscore) {
                    return `${match.homescore}:${match.awayscore}`
                } else {
                    return 'VS'
                }
            },
            makeTitle(item) {
                return item.order + ' ' + item.simpleleague + ' ' + item.matchtime.slice(5)
            }
        }

    }
</script>
