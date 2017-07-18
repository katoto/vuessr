/**
 * Created by lichun on 2017/7/18.
 */
let from = 'm'
if (process.env.VUE_ENV !== 'server') {
    if (document.referrer && ~document.referrer.indexOf('c.m.500')) {
        sessionStorage.setItem('_come_from', 'dxt')
        from = 'dxt'
    } else {
        from = sessionStorage.getItem('_come_from') || from
    }
}
export default {
    from
}
