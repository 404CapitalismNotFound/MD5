import { MD5 } from "./MD5";
import { SkillList } from "../Skill/SkillList";
import { Faction } from "../Faction"
import { Skill } from "../Skill/Skill";



export class User {
    userName: string
    blood: number//血量
    readonly originBlood: number//原始（没扣血）血量
    priority: number//优先值
    normalAttackHurt: number//普攻伤害
    skillRatio: number//用技能概率
    toEnemyHurt: number//对敌人技能伤害
    criticalStrikeProbability: number//暴击概率
    // criticalStrikeHurt:number//暴击伤害(弃用，在引擎中处理，*1.5)
    readonly banzaiTurn: number = 10//大招冷却剩余轮数
    banzaiCoolDown: number = 10//大招冷却剩余轮数
    dodgeProbability: number//闪避概率
    reflectProbability: number//反弹概率
    reflectRatio: number//反弹比例
    faction: string//阵营
    skillList: SkillList//技能表

    private _userNameMD5: string

    //初始化函数调用一次即可，直接写入构造函数
    constructor(userName: string, UserFaction: Faction = Faction.Su) {

        this.userName = userName
        this._userNameMD5 = MD5(userName).toString();

        switch (UserFaction) {
            case Faction.Su:
                this.faction = Faction.Su;
                break
            case Faction.Meng:
                this.faction = Faction.Meng
                break
            case Faction.Yuri:
                this.faction = Faction.Yuri
                break;
            case Faction.FenFeng:
                this.faction = Faction.FenFeng
                break;
            default:
                this.faction = Faction.Su
                break
        };

        this.blood = parseInt(this._userNameMD5.slice(0, 3), 16) % 1000 + 1000
        this.originBlood = this.blood
        this.normalAttackHurt = parseInt(this._userNameMD5.slice(4, 5), 16)
        this.toEnemyHurt = parseInt(this._userNameMD5.slice(5, 6), 16) * 4
        this.criticalStrikeProbability = parseInt(this._userNameMD5.slice(6, 7), 16) / 16
        // this.criticalStrikeHurt = parseInt(this._userNameMD5.slice(7,9), 16) * 4
        this.dodgeProbability = parseInt(this._userNameMD5.slice(9, 11), 16) / 255 * 0.2
        this.reflectProbability = parseInt(this._userNameMD5.slice(11, 13), 16) / 255 * 0.1
        this.reflectRatio = parseInt(this._userNameMD5.slice(13, 15), 16) / 255 * 0.5
        this.skillRatio = parseInt(this._userNameMD5.slice(15, 17), 16) / 255
        this.priority = parseInt(this._userNameMD5.slice(17, 19), 16)

        this.skillList = new SkillList(UserFaction, this.toEnemyHurt, this.normalAttackHurt);
    }


}


