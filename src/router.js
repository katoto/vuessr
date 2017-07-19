/**
 * Created by lichun on 2017/5/10.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('~pages/home.vue' /* webpackChunkName: "pages/home" */)

const Zq = () => import('~pages/home/zq.vue' /* webpackChunkName: "pages/home-zq" */)

const ZqExpect = () => import('~pages/home/zq/_expect.vue' /* webpackChunkName: "pages/home-zq-jczq-expect" */)

const Lq = () => import('~pages/home/lq.vue' /* webpackChunkName: "pages/home-lq" */)

const LqExpect = () => import('~pages/home/lq/_expect.vue' /* webpackChunkName: "pages/home-zq-jczq-expect" */)

const Bfyc = () => import('~pages/bfyc.vue' /* webpackChunkName: "pages/bfyc" */)

const BfycStrength = () => import('~pages/bfyc/strength.vue' /* webpackChunkName: "pages/bfyc-strength" */)

const BfycPredict = () => import('~pages/bfyc/predict.vue' /* webpackChunkName: "pages/bfyc-predict" */)

const BfycHotcool = () => import('~pages/bfyc/hotcool.vue' /* webpackChunkName: "pages/bfyc-hotcool" */)

const BfycRecord = () => import('~pages/bfyc/record.vue' /* webpackChunkName: "pages/bfyc-record" */)

const FootballDetail = () => import('~pages/detail/football.vue' /* webpackChunkName: "pages/detail-football" */)

const FootballSituation = () => import('~pages/detail/football/situation.vue' /* webpackChunkName: "pages/detail-football-situation" */)

const FootballAnalysis = () => import('~pages/detail/football/analysis.vue' /* webpackChunkName: "pages/detail-football-analysis" */)
const FootballAnalysisZj = () => import('~pages/detail/football/analysis/zj.vue' /* webpackChunkName: "pages/detail-football-analysis-zj" */)
const FootballAnalysisJs = () => import('~pages/detail/football/analysis/js.vue' /* webpackChunkName: "pages/detail-football-analysis-js" */)
const FootballAnalysisPm = () => import('~pages/detail/football/analysis/pm.vue' /* webpackChunkName: "pages/detail-football-analysis-pm" */)
const FootballAnalysisZr = () => import('~pages/detail/football/analysis/zr.vue' /* webpackChunkName: "pages/detail-football-analysis-zr" */)

const FootballPredict = () => import('~pages/detail/football/predict.vue' /* webpackChunkName: "pages/detail-football-predict" */)

const FootballOdds = () => import('~pages/detail/football/odds.vue' /* webpackChunkName: "pages/detail-football-odds" */)
const FootballOddseEurope = () => import('~pages/detail/football/odds/europe.vue' /* webpackChunkName: "pages/detail-football-odds-europe" */)
const FootballOddseAsian = () => import('~pages/detail/football/odds/asian.vue' /* webpackChunkName: "pages/detail-football-odds-asian" */)
const FootballOddseRangqiu = () => import('~pages/detail/football/odds/rangqiu.vue' /* webpackChunkName: "pages/detail-football-odds-rangqiu" */)
const FootballOddseDaxiaopan = () => import('~pages/detail/football/odds/daxiaopan.vue' /* webpackChunkName: "pages/detail-football-odds-daxiaopan" */)
const FootballOddseBifa = () => import('~pages/detail/football/odds/bifa.vue' /* webpackChunkName: "pages/detail-football-odds-bifa" */)

const FootballCrazybet = () => import('~pages/detail/football/crazybet.vue' /* webpackChunkName: "pages/detail-football-odds-bifa" */)
const FootballComment = () => import('~pages/detail/football/comment.vue' /* webpackChunkName: "pages/detail-football-comment" */)

const BasketballDetail = () => import('~pages/detail/basketball.vue' /* webpackChunkName: "pages/detail-basketball" */)

const BasketballSituation = () => import('~pages/detail/basketball/situation.vue' /* webpackChunkName: "pages/detail-basketball-situation" */)
const BasketballSituationEvent = () => import('~pages/detail/basketball/situation/event.vue' /* webpackChunkName: "pages/detail-basketball-situation" */)
const BasketballSituationStatistic = () => import('~pages/detail/basketball/situation/statistic.vue' /* webpackChunkName: "pages/detail-basketball-situation" */)

const BasketballAnalysis = () => import('~pages/detail/basketball/analysis.vue' /* webpackChunkName: "pages/detail-basketball-analysis" */)
const BasketballAnalysisZj = () => import('~pages/detail/basketball/analysis/zj.vue' /* webpackChunkName: "pages/detail-basketball-analysis-zj" */)
const BasketballAnalysisJs = () => import('~pages/detail/basketball/analysis/js.vue' /* webpackChunkName: "pages/detail-basketball-analysis-js" */)
const BasketballAnalysisZr = () => import('~pages/detail/basketball/analysis/zr.vue' /* webpackChunkName: "pages/detail-basketball-analysis-zr" */)
const BasketballAnalysisJj = () => import('~pages/detail/basketball/analysis/jj.vue' /* webpackChunkName: "pages/detail-basketball-analysis-pm" */)
//
// const BasketballPredict = () => import('~pages/detail/basketball/predict.vue' /* webpackChunkName: "pages/detail-basketball-predict" */)
//
const BasketballOdds = () => import('~pages/detail/basketball/odds.vue' /* webpackChunkName: "pages/detail-basketball-odds" */)
const BasketballOddsRangfen = () => import('~pages/detail/basketball/odds/rangfen.vue' /* webpackChunkName: "pages/detail-basketball-odds-rangqiu" */)
const BasketballOddsDaxiaofen = () => import('~pages/detail/basketball/odds/daxiaofen.vue' /* webpackChunkName: "pages/detail-basketball-odds-daxiaopan" */)
const BasketballOddsShengfu = () => import('~pages/detail/basketball/odds/shengfu.vue' /* webpackChunkName: "pages/detail-basketball-odds-daxiaopan" */)

// const BasketballCrazybet = () => import('~pages/detail/basketball/crazybet.vue' /* webpackChunkName: "pages/detail-basketball-odds-bifa" */)
const BasketballComment = () => import('~pages/detail/basketball/comment.vue' /* webpackChunkName: "pages/detail-basketball-comment" */)

const TeamFootball = () => import('~pages/team/football.vue')
const TeamFootballGl = () => import('~pages/team/football/gl.vue')
const TeamFootballSc = () => import('~pages/team/football/sc.vue')
const TeamFootballZr = () => import('~pages/team/football/zr.vue')

const TeamBasketBall = () => import('~pages/team/basketball.vue')
const TeamBasketBallGl = () => import('~pages/team/basketball/gl.vue')
const TeamBasketBallSc = () => import('~pages/team/basketball/sc.vue')
// const TeamBasketBallZr = () => import('~pages/team/football/zr.vue')
console.log()
export function createRouter () {
    return new VueRouter({
        mode: 'history',
        base: '/',
        routes: [
            {
                path: '/home',
                component: Home,
                name: 'home',
                children: [
                    {
                        path: 'zq',
                        component: Zq,
                        name: 'home-zq',
                        children: [
                            {
                                path: ':tab/:expect',
                                component: ZqExpect,
                                name: 'home-zq-sfc-expect'
                            },
                            {
                                path: '*',
                                redirect: 'jczq/cur'
                            }
                        ]
                    },
                    {
                        path: 'lq',
                        component: Lq,
                        name: 'home-lq',
                        children: [
                            {
                                path: ':tab/:expect?',
                                component: LqExpect,
                                name: 'home-lq-jclq-expect'
                            },
                            {
                                path: '*',
                                redirect: 'jclq/cur'
                            }
                        ]
                    }
                ]
            },
            {
                path: '/bfyc',
                component: Bfyc,
                name: 'bfyc',
                children: [
                    {
                        path: 'strength',
                        component: BfycStrength,
                        name: 'bfyc-strength'
                    },
                    {
                        path: 'predict',
                        component: BfycPredict,
                        name: 'bfyc-predict'
                    },
                    {
                        path: 'hotcool',
                        component: BfycHotcool,
                        name: 'bfyc-hotcool'
                    },
                    {
                        path: 'record',
                        component: BfycRecord,
                        name: 'bfyc-record'
                    }
                ]
            },
            {
                path: '/detail/football/:fid',
                component: FootballDetail,
                name: 'detail-football',
                children: [
                    {
                        path: 'situation',
                        component: FootballSituation,
                        name: 'football-detail-situation'
                    },
                    {
                        path: 'analysis',
                        component: FootballAnalysis,
                        name: 'football-detail-analysis',
                        children: [
                            {
                                path: 'zj',
                                component: FootballAnalysisZj,
                                name: 'football-detail-analysis-zj'
                            },
                            {
                                path: 'js',
                                component: FootballAnalysisJs,
                                name: 'football-detail-analysis-js'
                            },
                            {
                                path: 'pm',
                                component: FootballAnalysisPm,
                                name: 'football-detail-analysis-pm'
                            },
                            {
                                path: 'zr',
                                component: FootballAnalysisZr,
                                name: 'football-detail-analysis-zr'
                            }
                        ]
                    },
                    {
                        path: 'predict',
                        component: FootballPredict,
                        name: 'football-detail-predict'
                    },
                    {
                        path: 'odds',
                        component: FootballOdds,
                        name: 'football-detail-odds',
                        children: [
                            {
                                path: 'europe',
                                component: FootballOddseEurope,
                                name: 'football-detail-odds-europe'
                            },
                            {
                                path: 'asian',
                                component: FootballOddseAsian,
                                name: 'football-detail-odds-asian'
                            },
                            {
                                path: 'rangqiu',
                                component: FootballOddseRangqiu,
                                name: 'football-detail-odds-rangqiu'
                            },
                            {
                                path: 'daxiaopan',
                                component: FootballOddseDaxiaopan,
                                name: 'football-detail-odds-daxiaopan'
                            },
                            {
                                path: 'bifa',
                                component: FootballOddseBifa,
                                name: 'football-detail-odds-bifa'
                            },
                            {
                                path: '*',
                                redirect: 'europe'
                            }
                        ]
                    },
                    {
                        path: 'comment',
                        component: FootballComment,
                        name: 'football-detail-comment'
                    },
                    {
                        path: 'crazybet',
                        component: FootballCrazybet,
                        name: 'football-detail-crazybet'
                    }
                ]
            },
            {
                path: '/detail/basketball/:fid',
                component: BasketballDetail,
                name: 'detail-basketball',
                children: [
                    {
                        path: 'situation',
                        component: BasketballSituation,
                        name: 'basketball-detail-situation',
                        children: [
                            {
                                path: 'event',
                                component: BasketballSituationEvent,
                                name: 'basketball-detail-situation-event'
                            },
                            {
                                path: 'statistic',
                                component: BasketballSituationStatistic,
                                name: 'basketball-detail-situation-statistic'
                            }
                        ]
                    },
                    {
                        path: 'analysis',
                        component: BasketballAnalysis,
                        name: 'basketball-detail-analysis',
                        children: [
                            {
                                path: 'zj',
                                component: BasketballAnalysisZj,
                                name: 'basketball-detail-analysis-zj'
                            },
                            {
                                path: 'js',
                                component: BasketballAnalysisJs,
                                name: 'basketball-detail-analysis-js'
                            },
                            {
                                path: 'zr',
                                component: BasketballAnalysisZr,
                                name: 'basketball-detail-analysis-zr'
                            },
                            {
                                path: 'jj',
                                component: BasketballAnalysisJj,
                                name: 'basketball-detail-analysis-jj'
                            }
                        ]
                    },
                    {
                        path: 'odds',
                        component: BasketballOdds,
                        name: 'basketball-detail-odds',
                        children: [
                            {
                                path: 'shengfu',
                                component: BasketballOddsShengfu,
                                name: 'basketball-detail-odds-shengfu'
                            },
                            {
                                path: 'rangfen',
                                component: BasketballOddsRangfen,
                                name: 'basketball-detail-odds-rangfen'
                            },
                            {
                                path: 'daxiaofen',
                                component: BasketballOddsDaxiaofen,
                                name: 'basketball-detail-odds-daxiaofen'
                            },
                            {
                                path: '*',
                                redirect: 'shengfu'
                            }
                        ]
                    },
                    {
                        path: 'comment',
                        component: BasketballComment,
                        name: 'basketball-detail-comment'
                    }
                    // {
                    //     path: 'crazybet',
                    //     component: BasketballCrazybet,
                    //     name: 'basketball-detail-crazybet'
                    // }
                ]
            },
            {
                path: '/team/football/:tid',
                component: TeamFootball,
                name: 'team-football',
                children: [
                    {
                        path: 'sc',
                        component: TeamFootballSc,
                        name: 'team-football-sc'
                    },
                    {
                        path: 'gl',
                        component: TeamFootballGl,
                        name: 'team-football-gl'
                    },
                    {
                        path: 'zr',
                        component: TeamFootballZr,
                        name: 'team-football-zr'
                    },
                    {
                        path: '*',
                        redirect: 'sc'
                    }
                ]
            },
            {
                path: '/team/basketball/:tid/:sid',
                component: TeamBasketBall,
                name: 'team-basketball',
                children: [
                    {
                        path: 'sc',
                        component: TeamBasketBallSc,
                        name: 'team-basketball-sc'
                    },
                    {
                        path: 'gl',
                        component: TeamBasketBallGl,
                        name: 'team-basketball-gl'
                    },
                    {
                        path: '*',
                        redirect: 'sc'
                    }
                ]
            },
            {
                path: '*',
                redirect: '/home/zq/jczq/cur'
            }

        ]
    })
}
