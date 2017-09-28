/**
 * Created by lichun on 2017/9/28.
 */
function isTap (self) {
    if (self.disabled) {
        return false
    }
    let tapObj = self.tapObj
    return self.time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10
}

function touchstart (e, self) {
    let touches = e.touches[0]
    let tapObj = self.tapObj
    tapObj.pageX = touches.pageX
    tapObj.pageY = touches.pageY
    tapObj.clientX = touches.clientX
    tapObj.clientY = touches.clientY
    self.time = +new Date()
}

function touchend (e, self) {
    let touches = e.changedTouches[0]
    let tapObj = self.tapObj
    self.time = +new Date() - self.time
    tapObj.distanceX = tapObj.pageX - touches.pageX
    tapObj.distanceY = tapObj.pageY - touches.pageY

    if (!isTap(self)) return
    if (window.EsApp) {
        window.EsApp.invoke('back')
    } else {
        history.back()
    }
}
module.exports = {
    install (Vue) {
        Vue.directive('back', {
            bind (el, binding) {
                el.tapObj = {}
                el.addEventListener('touchstart', function (e) {
                    if (binding.modifiers.stop) {
                        e.stopPropagation()
                    }
                    if (binding.modifiers.prevent) {
                        e.preventDefault()
                    }
                    touchstart(e, el)
                }, false)
                el.addEventListener('touchend', function (e) {
                    e.preventDefault()
                    return touchend(e, el)
                }, false)
            }
        })
    }
}
