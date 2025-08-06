import { _decorator, Button, Component, director, Node } from 'cc';
import { TransformSchema } from 'XrFrame/xrFrameSystem';
import { Battle } from './Battle';
const { ccclass, property } = _decorator;

@ccclass('RankPanel')
export class RankPanel extends Component {

    StartButton = null

    protected start(): void {

    }

    onReturnButtonChlick(){
        // this.node.destroy();
         console.log("返回按钮点击成功")

    }

    onStartButtonChlick(){
        // this.node.destroy();
        // director.loadScene("Battle")
        console.log("开始按钮点击成功")

    }
    
}


