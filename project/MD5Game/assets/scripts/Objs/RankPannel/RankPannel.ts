import { _decorator, Component, Node } from 'cc';
import { WECHAT } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('OpenContext')
export class OpenContext extends Component {

    private _openContext: any; // 子域对象

    start() {
        if (WECHAT) { //判断微信环境
            // @ts-ignore
            this._openContext = wx.getOpenDataContext(); // 调用微信接口获取子域句柄，使用时需要检查
            this._openContext.postMessage({ type: 'engine', event: 'level' })

            // let testLevel = 5; // 测试数据

            // this._reportUserLevel(testLevel, () => {
            //     this._openContext.postMessage({ type: 'engine', event: 'level' }); // level为自定义key，如果没有特殊需求，建议直接用。否则你的变动比较大，调整wx-sub-project/index.js的对应的key和this._reportUserLevel的key都需要对齐
            // });
        }
    }

}
