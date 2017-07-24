import Cookies from 'js-cookie'
import preprocess from './preprocess'

let exports = {}
/*eslint-disable */
if (process.env.VUE_ENV !== 'server') {
    exports = {

        domain: {
            mapi: 'c.m.500.com/mapi',
            touch: 'c.m.500.com',
            wx500: 'wx.500.com',
            ews: 'c.m.500.com/ews'
        },

        cpid: {
            touch: 2114,
            android: 2061,
            ios: 2062,
            wx: 2102,
            wx_cmb: 2106
        },

        /**
         * 配置环境参数
         * @param {Object} options 可设置的字段：touch, wx500, ews, mapi
         */
        initEnv (options) {
            if (!options) {
                return alert('initEnv未接收到参数');
            }
            for (let key in options) {
                exports.domain[key] = options[key];
            }
        },

        /**
         * 注册ready事件
         * @param {Function} callback
         */
        ready (callback) {
            if (isAllReady) {
                callback.call(exports);
            } else {
                if (callbacks.indexOf(callback) < 0) {
                    callbacks.push(callback);
                }
            }
        },

        isLogin () {
            if (!isAllReady) {
                return alert('isLogin方法请确保ready后调用!');
            }
            if (exports.isApp) {
                return !!window.EsApp.getInfo().ck;
            }

            let cookie = document.cookie;
            return !!(cookie.match(/ck_user=/) && cookie.match(/ck_user2=/));
        },

        login (backurl, isReplace) {
            if (!isAllReady) {
                return alert('login方法请确保ready后调用!');
            }
            if (exports.isApp) {
                return window.EsApp.invoke('login');
            }

            backurl = backurl || location.href;

            if (exports.isWeixin) {
                return weixinLogin(backurl);
            }

            let coop_type = Cookies.get('coop_type');
            //        var coop_query  = Cookies.get('coop_query');
            //        coop_query = coop_query && JSON.parse(coop_query) || {};

            if (coop_type) {
                coopLogin(coop_type, backurl);
            } else {
                touchLogin(backurl, isReplace);
            }
        },

        recharge (options) {
            if (!isAllReady) {
                return alert('recharge方法请确保ready后调用!');
            }

            options = options || {};

            if (exports.isApp) {
                if (options.cid) {
                    // 兼容2.0一个 ios和andriod不统一的BUG
                    options.type = options.cid;
                }
                return window.EsApp.invoke('recharge', options);
            }

            location.href = exports.protocol + exports.domain.touch + '/recharge' + (options.money ? '?allmoney=' + options.money : '');
        },
        /**
         * i注册App状态改变后触发的回调事件
         * @param {[[Type]]} callback [[Description]]
         */
        dataChanged (callback) {
            if (isApiReady) {
                window.EsApp.on('datachanged', callback);
            } else {
                dataChanged.push(callback);
            }
        }

    }

    let has500UserAgent = navigator.userAgent.match(/(android|ios)_500cp_500com_/i) != null
    let timerID;

    let isAllReady = false; // DOM和APP api都已经ready
    let isDomReady = false; // DOM ready
    let isApiReady = false; // APP api 已经准备好
    let isInjected = false; // 是否注入了js
    let callbacks = [];    // all ready的回调
    let dataChanged = [];    // datachanged事件的回调

// var userbaseurl = '/user/index.php';
    let userbaseurl = '/login';

    /**
     * 检测平台
     */
    function detectPlatform() {
        let isInEsunApp = (window.EsApp != null) && (typeof (window.EsApp.init) === 'function');

        exports.isApp = isInEsunApp;
        exports.isWeixin = !isInEsunApp && isWeixin();
    }

    /**
     * 注册api ready回调，并注入工具api
     */
    function registerApiReady() {
        if (!isInjected && window.EsApp != null && typeof window.EsApp.init === 'function') {
            isInjected = true;

            if (typeof window.EsApp.onApiReady === 'function') {
                console.warn('EsApp.onApiReady已在esun.util.platform组件内部注册，请使用esun.use("esun.util.platform").ready方法注册ready事件!');
            }

            Object.defineProperty(window.EsApp, 'onApiReady', {
                get: function () {
                    return triggerApiReady;
                },
                set: function (callback) {
                    // console.warn('EsApp.onApiReady已在esun.util.platform组件内部注册，请使用esun.use("esun.util.platform").ready方法注册ready事件!');
                    if (isAllReady) {
                        callback.call(exports);
                    } else {
                        if (callbacks.indexOf(callback) < 0) {
                            callbacks.push(callback);
                        }
                    }
                },
                configurable: true
            });

            window.EsApp.init();
        }
    }

    /**
     * 触发api ready，并注册datachanged，设置登录态
     */
    function triggerApiReady() {
        clearTimeout(timerID);

        if (isApiReady) {
            return;
        }

        isApiReady = true;

        window.EsApp.on('datachanged', setLoginState);


        if (dataChanged.length) {
            dataChanged.forEach(function (callback) {
                window.EsApp.on('datachanged', callback);
            });
        }

        // 设置登录态
        setLoginState();

        if (isDomReady) {
            triggerAllReady();
        }
    }

    /**
     * 触发dom ready，检测api是否已经准备好，如果已经准备好直接触发all ready，
     * 否则再次尝试注入js api,并设置定时器在50ms后触发all ready
     */
    function triggerDomReady() {
        isDomReady = true;

        if (isApiReady) {
            triggerAllReady();
        } else {
            registerApiReady();

            timerID = setTimeout(function () {
                if (has500UserAgent) {
                    if (!window.EsApp) {
                        // 如果没有注入，强制要求注入
                        location.href = 'rabbit://reloadjs';
                    }
                    setTimeout(triggerDomReady, 0);
                } else {
                    triggerAllReady();
                }
            }, 50);
        }
    }

    /**
     * 触发真正的ready
     */
    function triggerAllReady() {
        if (isAllReady) {
            return;
        }

        detectPlatform();

        isAllReady = true;
        callbacks.forEach(function (callback) {
            callback.call(exports);
        });
    }

    /**
     * 保存新的是否登录的状态
     */
    function setLoginState() {
        let info = window.EsApp.getInfo();

        let domain = '.' + document.domain.split('.').slice(-2).join('.');
        // domain = '.500.com';

        function expires(key) {

            Cookies.remove(key, { path: '/' });
            Cookies.remove(key, { domain: domain, path: '/' });
        }

        if (info.ck && info.ck.length > 0) {
            Cookies.set('ck_user', info.username, { domain: domain, path: '/' });
            Cookies.set('ck_user2', info.username, { domain: domain, path: '/', expires: 7200 });
            Cookies.set('usercheck', info.ck, { domain: domain, path: '/', expires: 7200 });
        } else {
            expires('usercheck');
            expires('ck_user2');
            expires('ck_user');
        }


        let cpid = window.EsApp.isAndroid ? exports.cpid.android : exports.cpid.ios;
        Cookies.set('cpid', cpid, { domain: domain, path: '/' });
    }

    function isWeixin() {
        if (typeof WeixinJSBridge !== 'undefined') {
            return true;
        }

        let av = navigator.appVersion && navigator.appVersion.toLowerCase() || '';
        let ua = navigator.userAgent && navigator.userAgent.toLowerCase() || '';

        return !!(~av.indexOf('micromessenger') || ~ua.indexOf('micromessenger'));


    }

    /**
     * 微信登录
     */
    function weixinLogin(backurl) {
        let wx_nextfrom = Cookies.get('wx_nextfrom') || '500.com';

        let gourl = exports.protocol + exports.domain.wx500 + '/coop/wx/hezuoport.php?wfrom=' + wx_nextfrom;
        let tourl = exports.protocol + exports.domain.wx500 + '/coop/wx/coopauth.php?backurl=' +
            encodeURIComponent(backurl) +
            '&bfocus=0';

        location.href = gourl + '&tourl=' + encodeURIComponent(tourl);
    }

    /**
     * 合作登录
     */
    function coopLogin(coop_type, backurl) {
        let query = [
            'c=coop',
            'a=hezuologurl',
            'coop_type=' + encodeURIComponent(coop_type),
            'tourl=' + encodeURIComponent(backurl)
        ].join('&');

        location.href = exports.protocol + exports.domain.touch + userbaseurl + '?' + query;
    }

    /**
     * touch版登录
     */
    function touchLogin(backurl, isReplace) {
        let query;

        if(preprocess.from === 'dxt') {
            query = [
                // 'c=home',
                // 'a=login',
                'backUrl=' + encodeURIComponent(backurl)
            ].join('&');
            if (isReplace) {
                location.replace('http://c.m.500.com/user/login/index.html' + '?' + query);
            } else {
                location.href = 'http://c.m.500.com/user/login/index.html' + '?' + query;
            }
        } else {
            query = [
                'c=home',
                'a=login',
                'backurl=' + encodeURIComponent(backurl)
            ].join('&');
            if (isReplace) {
                location.replace('http://m.500.com/user/index.php' + '?' + query);
            } else {
                location.href = 'http://m.500.com/user/index.php' + '?' + query;
            }
        }
    }

    registerApiReady();

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        triggerDomReady();
    } else {
        document.addEventListener('DOMContentLoaded', triggerDomReady, false);
    }

}
/*eslint-enable */
export default exports
