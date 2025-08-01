import MD5 from "crypto-js/md5";

enum Faction {//阵营
    Su,      // 苏联
    Meng,    // 盟军
    Yuri,    // 尤里
    FenFeng  // 焚风
}

export class User {
    blood: number//血量
    normalAttackHurt: number//普攻伤害
    toEnemyHurt: number//对敌伤害
    criticalStrikeProbability:number//暴击概率
    criticalStrikeHurt:number//暴击伤害
    dodgeProbability: number//闪避概率
    reflectProbability: number//反弹概率
    reflectRatio: number//反弹比例

    private _userNameMD5: string

    constructor(userName: string) {
        this._userNameMD5 = MD5("hello").toString();
        this.init()
    }

    init() {
        this.blood = parseInt(this._userNameMD5.slice(0, 3), 16) % 1000 + 1000
        this.normalAttackHurt = parseInt(this._userNameMD5.slice(4, 5), 16)
        this.toEnemyHurt = parseInt(this._userNameMD5.slice(5, 6), 16) * 4
        this.criticalStrikeProbability = parseInt(this._userNameMD5.slice(6,7), 16) /16
        this.criticalStrikeHurt = parseInt(this._userNameMD5.slice(7,9), 16) * 4
        this.dodgeProbability = parseInt(this._userNameMD5.slice(9, 11), 16) / 255 * 0.2
        this.reflectProbability = parseInt(this._userNameMD5.slice(11, 13), 16) / 255 * 0.1
        this.reflectRatio = parseInt(this._userNameMD5.slice(13, 15), 16) / 255 * 0.5
    }


}


