import { _decorator, Component, director, find, Node } from 'cc';
import { GameManager } from "../GameManager"
import { WXManager } from '../WXManager/WXManager';
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends Component {

    @property(GameManager)
    gaaameManager: GameManager = null
    @property(WXManager)
    wxManager: WXManager = null
    @property(Node)
    loginNode: Node = null

    onGameStartButtonClick() {
        if (!this.wxManager.login) {
            this.showLoginTitle()
            return
        }
        // this.gameManager.changeSceneToBattle()
    }

    constructor() {
        super()
        console.log("StartMenu初始化")
        // this.gameManager = find("Manager").getComponent(GameManager)
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


