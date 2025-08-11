import { _decorator, Component, Node } from 'cc';
import {WECHAT} from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('Opentext')
export class Opentext extends Component {
 
    private OpenContext:any;
    
    start() {
        if (WECHAT) {
            this.OpenContext = wx.getSharedCanvas;
            let testLevel = 5
            this._reportUserLevel(testLevel, () => {
                this.OpenContext.postMessage({type:'engine', event:'level'})
            })
        }
    }

    update(deltaTime: number) {}

    private _reportUserLevel(level:number, listener?:Function, target?:any) {
        if (!WECHAT) {
            return;
        }

        wx.setUserCloudStorage({
            KVDataList: [
                {key: 'level', value: `${level}`}
            ],

            success: () => {
                listener?.apply(target)
            },

            fail: (err:any) => {
                console.log('report level error', err)
            }
        })
    }
}
