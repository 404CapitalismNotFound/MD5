import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {
    @property(GameManager)
    gameManager: GameManager = null
}


