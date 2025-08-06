import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
// var wx = require()

// let wx = window["wx"];
@ccclass('RankPanel')
export class RankPanel extends Component {

    @property(Node)
    private main:Node = null;

    @property(Node)
    private closeBtnNode:Node = null;

    private static instance: RankPanel = null;

    protected onLoad() {
        RankPanel.instance = this;

        this.closeBtnNode.on('touchend', RankPanel.hide, this);
    }

    protected onDestroy() {
        this.closeBtnNode.off('touchend', RankPanel.hide, this);
    }

    public static show() {
        this.instance.main.active = true;
        this.getRank();
    }

    public static hide() {
        this.instance.main.active = false;
    }

    /**
     * 设置用户的分数
     * @param value
     */
    public static setScore(value: number) {
        wx.postMessage({
            event: 'setScore',
            score: value
        });
    }

    /**
     * 获取排行榜
     */
    public static getRank() {
        wx.postMessage({
            event: 'getRank'
        });
    }




    
}


