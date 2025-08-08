import { _decorator, Component, director, find, Node } from 'cc';
// import { AudioMgr } from "./AudioPlayer";
import { Engine } from './Engine/Engine';
import { User } from './Objs/User/User';
import { Battle } from './UI/Battle';
import { StartMenu } from './UI/StartMenu';
import { WXManager } from './WXManager/WXManager';
import { RandomName } from './Objs/RandomName/RandomName';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(StartMenu)
    startMenu:StartMenu=null
    @property(WXManager)
    wxManager:WXManager = null
    battleUI:Battle=null

    engine = new Engine()

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node)
    }

    showLoginTitle(){
        this.startMenu.showLoginTitle()
    }

    changeSceneToBattle(){
        director.loadScene("Battle",()=>{
            this.engine.initBattle(new User(!this.wxManager.nickName?"q":this.wxManager.nickName),new User(!RandomName.getName()?"w":RandomName.getName()),find("Canvas").getComponent(Battle))
            this.engine.startBattle()
            this.battleUI = find("Canvas").getComponent(Battle)
            this.battleUI.setUiInit(this.wxManager.faceIcon,this.wxManager.nickName)
        })
    }

    changeSceneToRank(){
        director.loadScene("RankList")
    }

}