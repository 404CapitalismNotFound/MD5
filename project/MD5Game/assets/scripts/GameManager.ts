import { _decorator, Component, director, find, Node } from 'cc';
// import { AudioMgr } from "./AudioPlayer";
import { Engine } from './Engine/Engine';
import { User } from './Objs/User/User';
import { Battle } from './UI/Battle';
import { StartMenu } from './UI/StartMenu';
import { WXManager } from './WXManager/WXManager';
import { RandomName } from './Objs/RandomName/RandomName';
import { WECHAT } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(StartMenu)
    startMenu: StartMenu = null
    @property(WXManager)
    wxManager: WXManager = null
    battleUI: Battle = null

    engine = new Engine()

    protected onLoad(): void {
        //注册为常驻节点
        director.addPersistRootNode(this.node)
        //将本地和排行榜数据初始化
        if (localStorage.getItem('user_level') === "") {
            debugger
            localStorage.setItem('user_level', '0');
            this._reportUserLevel(0)
        }
    }

    private _reportUserLevel(level: number, listener?: Function, target?: any) {
        if (!WECHAT) {
            return;
        }

        // @ts-ignore
        wx.setUserCloudStorage({ //调用微信接口上报关卡等级信息，用于好友圈排行
            KVDataList: [
                { key: 'level', value: `${level}` }
            ],

            success: () => {
                listener?.apply(target);
            },

            fail: (err: any) => {
                console.log('report level error:', err);
            }
        });
    }

    protected start(): void {
        this._reportUserLevel(1)
    }

    showLoginTitle() {
        this.startMenu.showLoginTitle()
    }

    changeSceneToBattle() {
        director.loadScene("Battle", () => {
            this.engine.initBattle(new User(!this.wxManager.nickName ? "q" : this.wxManager.nickName), new User(!RandomName.getName() ? "w" : RandomName.getName()), find("Canvas").getComponent(Battle))
            this.engine.startBattle()
            this.battleUI = find("Canvas").getComponent(Battle)
            this.battleUI.setUiInit(this.wxManager.faceIcon, this.wxManager.nickName)
        })
    }

    changeSceneToRank() {
        director.loadScene("RankList")
    }

    changeSceneToMainMenu() {
        director.loadScene("StartMenu")
    }

    gameOverMarkProcess() {
        if (this.engine.win) {
            debugger
            localStorage.setItem("user_level", (Number(localStorage.getItem("user_level")) + 1).toString())
            this._reportUserLevel(Number(localStorage.getItem("user_level")))
        }
    }

}