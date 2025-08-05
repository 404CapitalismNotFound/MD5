import { _decorator, Component, director, Node } from 'cc';
import { AudioMgr } from "./AudioPlayer";
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //@property(AudioMgr)
    //audioPlayer:AudioMgr = null

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node)
    }

    changeSceneToBattle(){
        director.loadScene("Battle")
    }

    changeSceneToRank(){
        director.loadScene("Rank")
    }

}