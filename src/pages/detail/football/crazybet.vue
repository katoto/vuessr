<template>
    <div id="crazybetframe" style="overflow: hidden; height: 2000px;">
        <iframe id="_crazybet_frame" style="padding: 0;margin: 0;height: 0;width: 100%;border: 0"></iframe>
    </div>
</template>
<script>
    import Cookies from 'js-cookie'
    export default {
        mounted () {
            let detailTop = document.querySelector('.detailTop')
            let navigator = document.querySelector('.navigator')
            let crazybetframe = document.querySelector('#_crazybet_frame')
            crazybetframe.style.height = (innerHeight - detailTop.offsetHeight - navigator.offsetHeight) + 'px'
            crazybetframe.src = `http://crazybet.choopaoo.com/500bf/crazy/index.html#/h5/home/${this.$route.params.fid}`
            window.addEventListener('message', (e) => this.msgHandler(e), false)
        },
        methods: {
            msgHandler (e) {
                if (e.data === 'doLogin') {
                    this.$store.dispatch('login')
                    return
                }
                if (typeof e.data === 'string' && ~e.data.indexOf('jumpMy__')) {
                    let url = e.data.split('__')[1] + '?ck_user=' + encodeURIComponent(Cookies.get('ck_user'))
                    if (window.EsApp) {
                        window.EsApp.invoke('webview', {
                            url: encodeURIComponent(url),
                            hiddenTitle: 1
                        })
                    } else {
                        location.href = url
                    }
                }
            }

        }
    }

</script>
