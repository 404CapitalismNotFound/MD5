import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends Component {
    onGameStartButtonClick(){
        director.loadScene("Battle")
    }
    onRankButtonClick(){
        director.loadScene("Rank")
    }
}


