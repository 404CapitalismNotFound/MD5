import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { User } from '../Objs/User/User';
import { SkillType } from '../Objs/Skill/SkillType';
import { HitMessage, ResponceMessage } from "./Message"

@ccclass('Engine')
export class Engine extends Component {
    @property//单位：秒
    battleInterval: number = 5//默认值
    private userList: User[] = []//索引是我自己，1是敌人
    private turn: number = 1
    private thisTurnIndex: number = NaN//主动攻击方
    private thisUser: User = null //主攻方对象
    private anotherUser: User = null //主攻方对象

    constructor(thisUser: User, anotherUser: User) {
        super()//初始化父类
        //将两对象装入数组
        this.userList[0] = thisUser
        this.userList[1] = anotherUser
        //当第1个先手值小的时候，第二位先手，否则第一位
        if (this.userList[0].priority < this.userList[1].priority) {
            this.thisTurnIndex = 1
        } else {
            this.thisTurnIndex = 0
        }
    }

    startBattle(interval?: number) {
        if (interval) this.battleInterval = interval
        setInterval(() => this.battleCallBack(), this.battleInterval * 1000)
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
        hitMsg.from = this.thisUser;hitMsg.to = this.anotherUser
        const attackType = this.judgeAttackType()
        
        hitMsg.attackType = attackType  // 设置攻击类型

        switch (attackType) {
            case SkillType.Attack:
                hitMsg.hurt = this.thisUser.normalAttackHurt
                break;

            case SkillType.GeneralSkills:
                //有概率暴击
                if (this.judegStrike()) {
                    hitMsg.hurt = this.thisUser.criticalStrikeHurt
                    hitMsg.isCritical = true  // 标记为暴击
                } else {
                    hitMsg.hurt = this.thisUser.toEnemyHurt
                }
                break;

            case SkillType.UniqueSkill:
                hitMsg.hurt = this.thisUser.banzaiHurt
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
            return ResponceMessage.reflect(hitMsg.hurt * this.anotherUser.reflectRatio,this.anotherUser,this.thisUser)
        }
        //闪避处理 - 被攻击者有概率闪避攻击
        if (Math.random() <= this.anotherUser.dodgeProbability) {
            return ResponceMessage.dodge(this.anotherUser,this.thisUser)
        }
        //正常受到伤害
        this.anotherUser.blood -= hitMsg.hurt
        return ResponceMessage.normal(hitMsg.hurt,this.thisUser,this.anotherUser)
    }

    die(user: User) {
        console.log(`${user} die`)
    }


    private battleCallBack() {
        console.log(`start turn:${this.turn}`)

        this.thisUser = this.userList[this.thisTurnIndex]
        this.anotherUser = this.userList[this.thisTurnIndex === 1 ? 0 : 1]

        //攻击
        const hitMsg = this.hit()
        //响应攻击，扣血
        const rspMsg = this.responce(hitMsg)

        console.log(`end turn:${this.turn} user1:${this.userList[0].blood} user2:${this.userList[1].blood}`)
        if (this.userList[0].blood < 0) this.die(this.userList[0])
        if (this.userList[1].blood < 0) this.die(this.userList[1])

        //增加轮数
        this.turn++
        //切换主场
        this.thisTurnIndex = this.thisTurnIndex === 1 ? 0 : 1
    }
}


