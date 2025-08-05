import { _decorator, Component, director, Node } from 'cc';
import { AudioMgr } from "./AudioPlayer";
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
class GameManager extends Component {
    audioPlayer:AudioMgr
    protected onLoad(): void {
        director.addPersistRootNode(this.node)
    }
}