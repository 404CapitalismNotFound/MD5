import { _decorator, Component, find, Label, Node, ProgressBar, RichText, Sprite, SpriteFrame } from 'cc';
import { GameManager } from '../GameManager';
import { BattleIndexManager } from './BattleIndexManager';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {
    @property(BattleIndexManager)
    battleIndexManager:BattleIndexManager =null

    gameManager: GameManager = null
    protected onLoad(): void {
        this.gameManager = find("Manager").getComponent(GameManager)
        if (!this.gameManager) {
            console.error("GameManager在Battle界面未找到引用！！！")
        }
        
    }

    protected update(deltaTime: number): void {

        
    }
}


