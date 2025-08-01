import { _decorator, Component, director, Node } from 'cc';
import { AudioMgr } from "./AudioPlayer";
import { User } from "./Objs/User";
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
class GameManager extends Component {
    user:User;
    audioPlayer:AudioMgr

}