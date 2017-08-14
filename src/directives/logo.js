/**
 * Created by guxiaojuan on 2017/8/7.
 */
export default {
    bind (el, binding) {
        let defaultUrl = '~assets/images/match/logo.png'
        el.src = binding.value
        el.addEventListener('error', () => {
            el.src = defaultUrl
        })
    }
}
