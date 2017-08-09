/**
 * Created by guxiaojuan on 2017/8/8.
 */
export default {
    bind: function (el, binding) {
        if (binding.value) {
            el.setAttribute('style', 'color:#fff;background:' + binding.value)
        }
    }
}
