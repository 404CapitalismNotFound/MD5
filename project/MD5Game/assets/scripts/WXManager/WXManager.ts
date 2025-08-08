import { _decorator, Component, director, log, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('WXManager')
export class WXManager extends Component {
    @property(GameManager)
    gameManager: GameManager = null
    login: boolean = false
    faceIcon: string
    nickName: string
    protected onLoad(): void {
        director.addPersistRootNode(this.node)
    }
    protected onDestroy(): void {
        console.error("就是这样！")
    }
    protected start(): void {
        const wxLoginButton: any = {
            // 按钮类型： text可设置背景色和文本 image仅能设置背景贴图
            type: "text",
            // 按钮文本，仅对type为text有效
            text: "登录",
            // 按钮样式
            style: {
                left: 100,
                top: 350,
                width: 200,
                height: 80,
                backgroundColor: "#66CC00",
                color: "#FFFFFF",
                textAlign: 'center',
                borderWidth: 20,
                lineHeight: 40,
                fontSize: 50,
            }
        }
        const loginButton = wx.createUserInfoButton(wxLoginButton);
        loginButton.onTap((res) => {
            if (res && res.userInfo) {
                console.log("用户同意授权");
                this.faceIcon = res.userInfo.avatarUrl
                this.nickName = res.userInfo.nickName
                this.login = true
                // loginButton.destroy();
            } else {
                this.gameManager.showLoginTitle()
            }
        }
        )
    }
}


