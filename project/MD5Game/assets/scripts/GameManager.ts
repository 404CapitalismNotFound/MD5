import { _decorator, Component, director, Node } from 'cc';
// import { AudioMgr } from "./AudioPlayer";
import { Engine } from './Engine/Engine';
import { User } from './Objs/User/User';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //@property(AudioMgr)
    //audioPlayer:AudioMgr = null
    engine = new Engine(new User("1"),new User("2"))

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node)
    }

    protected start(): void {
        
    }

    changeSceneToBattle(){
        director.loadScene("Battle")
        this.engine.startBattle()
    }

    changeSceneToRank(){
        director.loadScene("Rank")
    }

}