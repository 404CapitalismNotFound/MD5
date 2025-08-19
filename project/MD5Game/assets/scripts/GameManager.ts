import { _decorator, Component, director, find, Game, Node, Prefab } from 'cc';
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

    public static engine = null

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node)
        // GameManager._Engine = this.engine
        console.log("GameManager的onLaad")
    }

    constructor(){
        super()
        if(GameManager.engine != null) {
            GameManager.engine = new Engine()
        }else{
            GameManager.engine = GameManager.engine
        }

        console.log("GameManager初始化")
    }

    showLoginTitle(){
        this.startMenu.showLoginTitle()
    }

    changeSceneToBattle(){
        director.loadScene("Battle",()=>{
            GameManager.engine.initBattle(new User(!this.wxManager.nickName?"q":this.wxManager.nickName),new User(!RandomName.getName()?"w":RandomName.getName()),find("Canvas").getComponent(Battle))
            GameManager.engine.startBattle()
            this.battleUI = find("Canvas").getComponent(Battle)
            this.battleUI.setUiInit(this.wxManager.faceIcon,this.wxManager.nickName)
        })
    }

    changeSceneToRank(){
        director.loadScene("RankList")
    }

}