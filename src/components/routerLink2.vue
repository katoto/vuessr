<template>
    <router-link :to="to" :replace="replace" v-tap="{methods: goPage}">
        <slot>
        </slot>
    </router-link>
</template>
<script>
    export default {
        props: {
            to: {
                required: false
            },
            replace: {
                required: false,
                type: Boolean
            }
        },
        methods: {
            goPage () {
                if (this.replace) {
                    this.$router.replace(this.to)
                } else {
                    this.$router.push(this.to)
                }
            }
        }
    }
</script>
