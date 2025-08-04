import MD5 from "crypto-js/md5";
import { Skills } from "./Skill/SkillList";
import {Faction} from "./Faction"
import { Skill } from "d:/微信记录/WeChat Files/wxid_cjyi2j61iro22/FileStorage/File/2025-08/Skills";



export class User {

    userName:string

    blood: number//血量
    normalAttackHurt: number//普攻伤害
    toEnemyHurt: number//对敌人技能伤害
    criticalStrikeProbability:number//暴击概率
    criticalStrikeHurt:number//暴击伤害
    dodgeProbability: number//闪避概率
    reflectProbability: number//反弹概率
    reflectRatio: number//反弹比例
    faction:string
    skillList:Skills

    private _userNameMD5: string

    //初始化函数调用一次即可，直接写入构造函数
    constructor(userName: string, UserFaction:Faction = Faction.Su ) {
        
        this._userNameMD5 = MD5(userName).toString();
        
        switch (UserFaction){
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
        }

        this.skillList = Skills();

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


