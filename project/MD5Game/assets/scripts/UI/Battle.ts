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

    setMyName(name:string){
        this.battleIndexManager.myStatueBarIndex.id.string = name
    }

    setMyGrow(grow:string){
        this.battleIndexManager.myStatueBarIndex.growRate.string = grow
    }

    setMyBattle(battle:string){
        this.battleIndexManager.myStatueBarIndex.battleRate.string = battle
    }

    // 敌人相关方法
    setEnemyName(name:string){
        this.battleIndexManager.emeyStatueBarIndex.id.string = name
    }

    setEnemyGrow(grow:string){
        this.battleIndexManager.emeyStatueBarIndex.growRate.string = grow
    }

    setEnemyBattle(battle:string){
        this.battleIndexManager.emeyStatueBarIndex.battleRate.string = battle
    }

    setBlood(percentage:number){
        this.battleIndexManager.myStatueBarIndex.blood.progress = percentage
    }

    setEnemyBlood(percentage:number){
        this.battleIndexManager.emeyStatueBarIndex.blood.progress = percentage
    }

    setBlue(percentage:number){
        this.battleIndexManager.myStatueBarIndex.blue.progress = percentage
    }

    setEnemyBlue(percentage:number){
        this.battleIndexManager.emeyStatueBarIndex.blue.progress = percentage
    }

    setEnergy(percentage:number){
        this.battleIndexManager.myStatueBarIndex.energy.progress = percentage
    }

    setEnemyEnergy(percentage:number){
        this.battleIndexManager.emeyStatueBarIndex.energy.progress = percentage
    }
}


