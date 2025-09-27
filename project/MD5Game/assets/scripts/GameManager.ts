import { _decorator, Component, director, find, Node, Prefab } from 'cc';
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

    public static engine:Engine = new Engine();
    public static _instrenst:GameManager = null;

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node);
        // 将engine注册为常驻节点
        if(!GameManager.engine){
            GameManager.engine = new Engine();
        }
        director.addPersistRootNode(GameManager.engine.node);
        GameManager._instrenst = this
    }

    showLoginTitle(){
        this.startMenu.showLoginTitle()
    }

    changeSceneToBattle(){
        director.loadScene("Battle",()=>{
            // 初始化两个玩家，一个根据玩家名进行设置，另一个则随机用户名
            GameManager.engine.initBattle(new User( !this.wxManager.nickName?"q":this.wxManager.nickName), new User(!RandomName.getName()?"w":RandomName.getName()), find("Canvas").getComponent(Battle))
            let PlayerName:string = this.wxManager.nickName;
            GameManager.engine.startBattle()
            this.battleUI = find("Canvas").getComponent(Battle)
            // this.battleUI.setUiInit(this.wxManager.faceIcon, this.wxManager.nickName)
            console.log("**********此处为GameManager中的changeSceneToBattle")
            console.log(PlayerName)
            this.battleUI.setUiInit(this.wxManager.faceIcon, PlayerName)
        })
    }

    changeSceneToRank(){
        director.loadScene("RankList")
    }

}