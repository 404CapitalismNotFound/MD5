import { _decorator, Component, director, Node } from 'cc';
import { GameManager } from "../GameManager"
import { WXManager } from '../WXManager/WXManager';
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends Component {
    @property(GameManager)
    gameManager: GameManager = null
    @property(WXManager)
    wxManager: WXManager = null
    @property(Node)
    loginNode: Node = null
    onGameStartButtonClick() {
        debugger
        if (!this.wxManager.login) {
            this.showLoginTitle()
            return
        }
        this.gameManager.changeSceneToBattle()
    }
    onRankButtonClick() {
        if (!this.wxManager.login) {
            this.showLoginTitle()
            return
        }
        this.gameManager.changeSceneToRank()
    }
    showLoginTitle() {
        this.loginNode.active = true
    }
    hideLoginTitle() {
        this.loginNode.active = false
    }
    onGameStartButtonClickTest() {
        this.gameManager.changeSceneToBattle()
    }
}


