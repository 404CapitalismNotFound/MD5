import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { User } from '../Objs/User/User';
import { SkillType } from '../Objs/Skill/SkillType';
import {HitMessage, ResponceMessage} from "./Message"

@ccclass('Engine')
export class Engine extends Component {
    @property(Number)//单位：秒
    private battleInterval: number = 5
    private userList: User[] = [new User("1"), new User("2")]//索引是我自己，1是敌人
    private turn: number = 1
    private thisTurnIndex: number = NaN//主动攻击方
    private thisUser: User = null //主攻方对象
    private anotherUser: User = null //主攻方对象
    constructor() {
        super()//初始化父类
        //当第1个先手值小的时候，第二位先手，否则第一位
        if (this.userList[0].priority < this.userList[1].priority) {
            this.thisTurnIndex = 1
        } else {
            this.thisTurnIndex = 0
        }
    }

    startBattle(){
        setInterval(() => this.battleCallBack(), this.battleInterval * 1000)
    }
    //判斷是哪種攻擊類型
    judgeAttackType() {
        if (this.thisUser.banzaiCoolDown === 0){
            this.thisUser.banzaiCoolDown = 10 // 重置冷却时间
            return SkillType.UniqueSkill
        }
        if (Math.random() <= this.thisUser.skillRatio) {//用技能概率
            return SkillType.GeneralSkills
        }
        return SkillType.Attack//普通攻击
    }
    //判斷是否暴击
    judegStrike() {
        if (Math.random() <= this.thisUser.criticalStrikeProbability) {
            return true
        }
        return false
    }

    hit() {
        let hitMsg = new HitMessage()

        switch (this.judgeAttackType()) {
            case SkillType.Attack:
                hitMsg.hurt = this.thisUser.normalAttackHurt
                break;

            case SkillType.GeneralSkills:
                //有概率暴击
                if (this.judegStrike()) {
                    hitMsg.hurt = this.thisUser.criticalStrikeHurt
                } else {
                    hitMsg.hurt = this.thisUser.toEnemyHurt
                }
                break;

            case SkillType.UniqueSkill:
                hitMsg.hurt = this.thisUser.banzaiHurt
                break
        }
        return hitMsg
    }

    responce(hitMsg) {
        //反弹处理 - 被攻击者有概率反弹伤害给攻击者
        if (Math.random() <= this.anotherUser.reflectProbability) {
            this.thisUser.blood -= hitMsg.hurt * this.anotherUser.reflectRatio
            return
        }
        //闪避处理 - 被攻击者有概率闪避攻击
        if (Math.random() <= this.anotherUser.dodgeProbability) {
            return
        }
        //正常受到伤害
        this.anotherUser.blood -= hitMsg.hurt
    }


    battleCallBack() {
        console.log(`start turn:${this.turn}`)

        this.thisUser = this.userList[this.thisTurnIndex]
        this.anotherUser = this.userList[this.thisTurnIndex === 1 ? 0 : 1]

        //攻击
        const hitMsg = this.hit()
        //响应攻击，扣血
        this.responce(hitMsg)

        // 处理大招冷却
        if (this.thisUser.banzaiCoolDown > 0) {
            this.thisUser.banzaiCoolDown--
        }

        console.log(`end turn:${this.turn} user1:${this.userList[0].blood} user2:${this.userList[1].blood}`)
        if (this.userList[0].blood<0) console.log("u1 die")
        if (this.userList[1].blood<0) console.log("u2 die")

        //增加轮数
        this.turn++
        //切换主场
        this.thisTurnIndex = this.thisTurnIndex === 1 ? 0 : 1
    }
}


