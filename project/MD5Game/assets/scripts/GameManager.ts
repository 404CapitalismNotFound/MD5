import { _decorator, Component, director, find, Node } from 'cc';
// import { AudioMgr } from "./AudioPlayer";
import { Engine } from './Engine/Engine';
import { User } from './Objs/User/User';
import { Battle } from './UI/Battle';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //@property(AudioMgr)
    //audioPlayer:AudioMgr = null
    engine = new Engine()

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node)
    }

    protected start(): void {
        
    }

    changeSceneToBattle(){
        director.loadScene("Battle",()=>{
            this.engine.initBattle(new User("q"),new User("w"),find("Canvas").getComponent(Battle))
            this.engine.startBattle()
        })
    }

    changeSceneToRank(){
        director.loadScene("RankList")
    }

}