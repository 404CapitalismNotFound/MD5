import { _decorator, Button, Component, director, find, Node } from 'cc';
import { Battle } from './Battle';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('RankPanel')
export class RankPanel extends Component {

    gameManager: GameManager = null

    protected onLoad(): void {
        this.gameManager = find("Manager").getComponent(GameManager)
        if (!this.gameManager) {
            console.error("GameManager在Battle界面未找到引用！！！")
        }   
        
    }

    protected start(): void {

    }

    onReturnButtonChlick() {
        this.gameManager.changeSceneToMainMenu()

    }

    onStartButtonChlick() {
        // this.node.destroy();
        // director.loadScene("Battle")
        console.log("开始按钮点击成功")
        this.gameManager.changeSceneToBattle()

    }

}


