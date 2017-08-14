/**
 * Created by guxiaojuan on 2017/8/4.
 */
export default {
    bind (el, binding) {
        let defaultUrl = 'http://tccache.500.com/mobile/touch/images/bifen/face.png'
        el.src = binding.value
        el.addEventListener('error', () => {
            el.src = defaultUrl
        })
    }
}
