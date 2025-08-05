import { _decorator, Component, director, Node } from 'cc';
import { GameManager } from "../GameManager"
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends Component {
    @property(GameManager)
    gameManager:GameManager = null
    onGameStartButtonClick() {
        this.gameManager.changeSceneToBattle()
    }
    onRankButtonClick() {
        this.gameManager.changeSceneToRank()
    }
}


