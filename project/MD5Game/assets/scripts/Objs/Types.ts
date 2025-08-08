export class UserData{
    private UserName:string
    private UserAvatar:number
    private UserCombatPower:number
    private UserRankNum:number
    
    /**
     * 
     * @param userName 玩家名
     * @param userAvitive 玩家头像
     * @param userCombatPower 玩家战力
     * @param userRankNUm 玩家排名
     */
    constructor(userName:string, userAvatar:number, userCombatPower:number, userRankNUm:number) {
        this.UserName = userName
        this.UserAvatar = userAvatar
        this.UserRankNum = userRankNUm
        this.UserCombatPower = userCombatPower
    }
    
    public getUserName():string {return this.UserName}

    public getUserAvatar():number {return this.UserAvatar}
    
    public getUserCombatPower():number {return this.UserCombatPower}
    
    public getUserRankNum():number {return this.UserRankNum}
    
    public setUserName(Name:string):void {this.UserName = Name}

    public setUserAvatar(Avatar:number):void {this.UserAvatar = Avatar}
    
    public setUserCombatPower(CombatPower:number):void {this.UserCombatPower = CombatPower}
    
    public setUserRankNum(RankNum:number):void {this.UserRankNum = RankNum}


}