import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { User } from '../Objs/User/User';
import { SkillType } from '../Objs/Skill/SkillType';
import { HitMessage, ResponceMessage } from "./Message"
import { Battle } from '../UI/Battle';

@ccclass('Engine')
export class Engine extends Component {
    @property//单位：秒
    battleInterval: number = 1//默认值，战斗间隔
    battleTimerId:number
    battleUI: Battle = null
    private userList: User[] = []//索引是我自己，1是敌人
    private turn: number = 1
    private thisTurnIndex: number = NaN//主动攻击方
    private thisUser: User = null //主攻方对象
    private anotherUser: User = null //主攻方对象

    // 单例实例
    private static _instance: Engine = null;

    constructor() {
        super()//初始化父类
        // 确保只有一个实例
        if (Engine._instance) {
            return Engine._instance;
        }
        Engine._instance = this;
    }

    // 初始化战斗数据
    initBattle(thisUser: User, anotherUser: User, battleUI: Battle) {
        //持有对界面管理类的引用
        if (!battleUI) {
            console.error("Engine中获取UI组件失败！")
        }
        this.battleUI = battleUI
        //将两对象装入数组
        this.userList[0] = thisUser
        this.userList[1] = anotherUser
        //当第1个先手值小的时候，第二位先手，否则第一位
        if (this.userList[0].priority < this.userList[1].priority) {
            this.thisTurnIndex = 1
        } else {
            this.thisTurnIndex = 0
        }
        // 重置回合数
        this.turn = 1;
        this.initUI()
    }

    initUI(){
        this.battleUI.setMyName(this.userList[0].userName)
        this.battleUI.setEnemyName(this.userList[1].userName)
    }

    startBattle(interval?: number) {
        if (interval) this.battleInterval = interval
        this.battleTimerId=setInterval(() => this.battleCallBack(), this.battleInterval * 1000)
    }

    stopBattle(){
        clearInterval(this.battleTimerId)
    }

    //判斷是哪種攻擊類型
    private judgeAttackType() {
        if (this.thisUser.banzaiCoolDown === 0) {
            this.thisUser.banzaiCoolDown = 10 // 重置冷却时间
            return SkillType.UniqueSkill
        }
        if (Math.random() <= this.thisUser.skillRatio) {//用技能概率
            return SkillType.GeneralSkills
        }
        return SkillType.Attack//普通攻击
    }

    //判斷是否暴击
    private judegStrike() {
        if (Math.random() <= this.thisUser.criticalStrikeProbability) {
            return true
        }
        return false
    }

    private hit() {
        let hitMsg = new HitMessage()
        hitMsg.from = this.thisUser; hitMsg.to = this.anotherUser
        const attackType = this.judgeAttackType()

        hitMsg.attackType = attackType  // 设置攻击类型

        switch (attackType) {
            case SkillType.Attack:
                hitMsg.skill = this.thisUser.skillList.Attack
                hitMsg.hurt = this.thisUser.skillList.Attack.skillHurt
                break;

            case SkillType.GeneralSkills:
                //一共三个，范围取0-2
                const thisTurnSkill = this.thisUser.skillList.GeneralSkills[Math.floor(Math.random() * 3)]
                hitMsg.skill = thisTurnSkill
                //有概率暴击
                if (this.judegStrike()) {
                    hitMsg.hurt = thisTurnSkill.skillHurt * 1.5
                    hitMsg.isCritical = true  // 标记为暴击
                } else {
                    hitMsg.hurt = thisTurnSkill.skillHurt
                }
                break;

            case SkillType.UniqueSkill:
                hitMsg.hurt = this.thisUser.skillList.UniqueSkill.skillHurt
                hitMsg.skill = this.thisUser.skillList.UniqueSkill
                break
        }

        // 处理大招冷却
        if (this.thisUser.banzaiCoolDown > 0) {
            this.thisUser.banzaiCoolDown--
        }

        return hitMsg
    }

    private responce(hitMsg: HitMessage) {
        //反弹处理 - 被攻击者有概率反弹伤害给攻击者
        if (Math.random() <= this.anotherUser.reflectProbability) {
            this.thisUser.blood -= hitMsg.hurt * this.anotherUser.reflectRatio
            return ResponceMessage.reflect(hitMsg.hurt * this.anotherUser.reflectRatio, this.anotherUser, this.thisUser)
        }
        //闪避处理 - 被攻击者有概率闪避攻击
        if (Math.random() <= this.anotherUser.dodgeProbability) {
            return ResponceMessage.dodge(this.anotherUser, this.thisUser)
        }
        //正常受到伤害
        this.anotherUser.blood -= hitMsg.hurt
        return ResponceMessage.normal(hitMsg.hurt, this.thisUser, this.anotherUser)
    }

    private die(user: User) {
        console.log(`${user} die`)
        this.stopBattle()
        this.battleUI.showGameOverLayer()
    }

    private getPercentage(part: number, all: number) {
        return part / all
    }

    private updateUIFromHitMsg(Msg: HitMessage) {
        this.battleUI.addBattleInfo(Msg.toString())

    }

    private updateUIFromRspMsg(Msg: ResponceMessage) {
        this.battleUI.addBattleInfo(Msg.toString())

        this.battleUI.setMyBlood(this.getPercentage(this.userList[0].blood, this.userList[0].originBlood))
        this.battleUI.setEnemyBlood(this.getPercentage(this.userList[1].blood, this.userList[1].originBlood))

        this.battleUI.setMyEnergy(this.getPercentage(this.userList[0].banzaiTurn - this.userList[0].banzaiCoolDown, this.userList[0].banzaiTurn))
        this.battleUI.setEnemyEnergy(this.getPercentage(this.userList[1].banzaiTurn - this.userList[1].banzaiCoolDown, this.userList[1].banzaiTurn))
    }

    private battleCallBack() {
        console.log(`start turn:${this.turn}`)

        this.thisUser = this.userList[this.thisTurnIndex]
        this.anotherUser = this.userList[this.thisTurnIndex === 1 ? 0 : 1]

        //攻击
        const hitMsg = this.hit()
        console.log(hitMsg.toString())
        this.updateUIFromHitMsg(hitMsg)

        //响应攻击，扣血
        const rspMsg = this.responce(hitMsg)
        console.log(rspMsg.toString())
        this.updateUIFromRspMsg(rspMsg)

        console.log(`end turn:${this.turn} user1:${this.userList[0].blood} user2:${this.userList[1].blood}`)
        if (this.userList[0].blood < 0) this.die(this.userList[0])
        if (this.userList[1].blood < 0) this.die(this.userList[1])

        //增加轮数
        this.turn++
        //切换主场
        this.thisTurnIndex = this.thisTurnIndex === 1 ? 0 : 1
    }
}


