import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RankPerfab')
export class RankPerfab extends Component {

    @property(Node)
    ScorePanle = null
    @property(Node)
    UserImage = null
    @property(Node)
    UserName = null
    @property(Node)
    CombatPowerPanel = null

    start() {

    }

    update(deltaTime: number) {
        
    }
}


