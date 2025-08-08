import { _decorator, Component, Label, Node } from 'cc';
import { UserData } from '../Objs/Types';
const { ccclass, property } = _decorator;

@ccclass('RankPerfab')
export class RankPerfab extends Component {

    @property(Label)
    UserRankNum:Label = null
    @property(Node)
    UserImage = null
    @property(Label)
    UserName:Label = null
    @property(Label)
    CombatPowerPanel:Label = null

    start() {}

    update(deltaTime: number) {}
    
    /**
     * @param cilckNum 玩家排名
     * @param userName 玩家名
     * @param userCombatPower 玩家战力
     * @param userImage 玩家头像信息
     */

    init(userData:UserData){
        this.UserRankNum.string = userData.getUserRankNum().toString()
        this.UserName.string = userData.getUserName()
        this.CombatPowerPanel.string = userData.getUserCombatPower().toString()
        this.UserImage = userData.getUserAvatar()
        
    }
    // public createRankUnit(cilckNum:number, userName:string, userCombatPower:number,userImage?:number = null ) {
    public createRankUnit (userData:UserData) {
        // this.ScorePanle.string = cilckNum.toString()
        // this.UserName.string = userName
        // this.CombatPowerPanel.string = userCombatPower.toString()

        this.UserRankNum.string = userData.getUserRankNum().toString()
        this.UserName.string = userData.getUserName()
        this.CombatPowerPanel.string = userData.getUserCombatPower().toString()
        this.UserImage = userData.getUserAvatar()
        
    }

}


