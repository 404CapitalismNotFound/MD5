import { _decorator, Component, Label, labelAssembler, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    /**
     * @param Ranking 排名
     * @param Avatark 头像
     */
    
    @property(Label)
    Ranking:Label = null
    @property(Node)
    Avatar:Node = null
    @property(Label)
    PlayerName:Label = null
    @property(Label)
    CompatPower:Label = null

    protected start(): void {}

    public SetAvatar(node:Node){
        this.Avatar = 
    }

}


