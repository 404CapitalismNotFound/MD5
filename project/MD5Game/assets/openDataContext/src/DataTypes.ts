import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class DataTypes {
    
    UserRank:number
    UserAvatar:number
    UserName:string
    UserCombatPower:number
    /**
     * @param userRank 用户排名
     * @param userAvatar 用户微信头像ID
     * @param userName 用户名
     * @param userCombatPower 用户战力
     */
    constructor(userRank:number, userAvatar:number, userName:string, userCombatPower:number){
        this.UserAvatar = userAvatar
        this.UserCombatPower = userCombatPower
        this.UserName = userName
        this.UserRank = userRank
    }

}


