/**
 * Created by lichun on 2017/6/1.
 */
export const pushEvents = {
    FOOTBALL_INFO: 0, // 足球对阵信息的推送
    BASKETBALL_INFO: 1, // 篮球对阵信息的推送
    FOOTBALL_EVENT: 2, // 足球事件列表的推送
    BASKETBALL_EVENT: 3 // 篮球事件列表的推送
}
export const FootballStatusCode = {
    NOT_STARTED: '0',
    FIRST_HALF: '1',
    MID: '2',
    LAST_HALF: '3',
    ENDED: '4',
    CANCELED: '5',
    CHANGED: '6',
    REMOVED: '7',
    PAUSED: '8',
    UNSURE: '9',
    EXTRA_STARTED: '10',
    EXTRA_ENDED: '11',
    SPOT_KICK_STARTED: '12',
    SPOT_KICK_ENDED: '13'
}

export const BasketballStatusCode = {
    EMPTY: '0', // 空
    NOT_STARTED: '1', // 未开始
    SECTION_1: '2', // 第一节
    SECTION_2: '3', // 第二节
    MID: '4', // 中场
    SECTION_3: '5', // 第三节
    SECTION_4: '6', // 第四节
    OVERTIME_1: '7', // 加时1
    OVERTIME_2: '8', // 加时2
    OVERTIME_3: '9', // 加时3
    OVERTIME_4: '10', // 加时4
    ENDED: '11', // 已结束
    CHANGED: '12', // 改期
    BREAK_TIME: '13' // 休息时间
}

export const FootBallEventType = {
    NONE: 0,
    JIN_QIU: 1,
    WU_LONG: 2,
    DIAN_QIU: 3,
    HUANG_PAI: 4,
    HONG_PAI: 5,
    LIANG_HUANG_BIAN_HONG: 6,
    WU_XIAO: 7,
    HUAN_REN: 8,
    HUAN_RU: 9,
    HUAN_CHU: 10
}
export const BasketballMemberType = {
    '1': {
        'position': '位置',
        'play_count': '场次',
        'first_count': '首发',
        'upfield_time': '上场时间',
        'points_per_game': '得分',
        'assists': '助攻',
        'rebounds': '篮板',
        'off_rebounds': '进攻篮板',
        'def_rebounds': '防守篮板',
        'steals': '抢断',
        'cap': '盖帽',
        'shots': '出手',
        'rate': '命中率',
        '2rate': '2分%',
        '2hit': '2分命中',
        '2shots': '2分出手',
        '3rate': '3分%',
        '3hit': '3分命中',
        '3shots': '3分出手',
        'penalty_rate': '罚球%',
        'penalty_hit': '罚球命中',
        'penalty_num': '罚球数',
        'effective_rate': '有效%',
        'mistakes': '失误',
        'foul': '犯规'
        // 'player': '球员',
        // 'off_efficiency': '进攻效率',
        // 'def_efficiency': '防守效率',
        // 'hit': '命中'
    },
    '2': {
        'position': '位置',
        // 'play_count': '场次',
        // 'first_count': '首发',
        'upfield_time': '上场时间',
        'points_per_game': '得分',
        'assists': '助攻',
        'rebounds': '篮板',
        'off_rebounds': '进攻篮板',
        'def_rebounds': '防守篮板',
        'steals': '抢断',
        'cap': '盖帽',
        'shots': '出手',
        'rate': '命中率',
        '2rate': '2分%',
        '2hit': '2分命中',
        '2shots': '2分出手',
        '3rate': '3分%',
        '3hit': '3分命中',
        '3shots': '3分出手',
        'penalty_rate': '罚球%',
        'penalty_hit': '罚球命中',
        'penalty_num': '罚球数',
        'effective_rate': '有效%',
        'mistakes': '失误',
        'foul': '犯规'
        // 'player': '球员',
        // 'off_efficiency': '进攻效率',
        // 'def_efficiency': '防守效率',
        // 'hit': '命中'
    },
    '3': {
        'position': '位置',
        // 'play_count': '场次',
        // 'first_count': '首发',
        // 'upfield_time': '上场时间',
        'off_efficiency': '进攻效率',
        'def_efficiency': '防守效率',
        'points_per_game': '得分',
        'assists': '助攻',
        'rebounds': '篮板',
        'off_rebounds': '进攻篮板',
        'def_rebounds': '防守篮板',
        'steals': '抢断',
        'cap': '盖帽',
        'shots': '出手',
        'rate': '命中率',
        '2rate': '2分%',
        '2hit': '2分命中',
        '2shots': '2分出手',
        '3rate': '3分%',
        '3hit': '3分命中',
        '3shots': '3分出手',
        'penalty_rate': '罚球%',
        'penalty_hit': '罚球命中',
        'penalty_num': '罚球数',
        // 'effective_rate': '有效%',
        'mistakes': '失误',
        'foul': '犯规'
        // 'player': '球员',
        // 'hit': '命中'
    },
    '4': {
        'position': '位置',
        // 'play_count': '场次',
        // 'first_count': '首发',
        // 'upfield_time': '上场时间',
        'points_per_game': '得分',
        'assists': '助攻',
        'rebounds': '篮板',
        'off_rebounds': '进攻篮板',
        'def_rebounds': '防守篮板',
        'steals': '抢断',
        'cap': '盖帽',
        'shots': '出手',
        'rate': '命中率',
        '2rate': '2分%',
        '2hit': '2分命中',
        '2shots': '2分出手',
        '3rate': '3分%',
        '3hit': '3分命中',
        '3shots': '3分出手',
        'penalty_rate': '罚球%',
        'penalty_hit': '罚球命中',
        'penalty_num': '罚球数',
        // 'effective_rate': '有效%',
        'mistakes': '失误',
        'foul': '犯规'
        // 'player': '球员',
        // 'off_efficiency': '进攻效率',
        // 'def_efficiency': '防守效率',
        // 'hit': '命中'
    }

}

export const BasketballMemberAdvType = {
    position: '位置',
    play_count: '场次',
    effective_rate: '效率值',
    true_hit_rate: '真实%',
    '3rate': '三分率',
    penalty_rate: '罚球率',
    rebounds_rate: '篮板率',
    off_rebounds_rate: '前板率',
    def_rebounds_rate: '后板率',
    assists_rate: '助攻率',
    steals_rate: '抢断率',
    mistakes_rate: '失误率',
    usage_rate: '球权指数',
    win_shares: '贡献值',
    off_win_shares: '进攻贡献',
    def_win_shares: '防守贡献'
    // first_count: '首发场次',
}

/*
export default {
    'BBallStatusName':{
        [BBallStatusCode.MID]: '中场休息',
        [BBallStatusCode.ENDED]: '完场',
        [BBallStatusCode.CHANGED]: '改期'
    },
    BBallStatusCode:BBallStatusCode
}
*/
export const FootballStatusDesc = {
    [FootballStatusCode.UNSURE]: '本场比赛待定',
    [FootballStatusCode.CANCELED]: '本场比赛被取消',
    [FootballStatusCode.REMOVED]: '本场比赛腰斩',
    [FootballStatusCode.CHANGED]: '本场比赛改期进行',
    [FootballStatusCode.PAUSED]: '本场比赛已中断',
    [FootballStatusCode.ENDED]: '本场比赛已完场'
}

export const BasketballStatusDesc = {
    [BasketballStatusCode.CHANGED]: '本场比赛改期进行',
    [BasketballStatusCode.ENDED]: '本场比赛已完场'
}
