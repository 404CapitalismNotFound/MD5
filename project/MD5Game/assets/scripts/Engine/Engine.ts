import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { User } from '../Objs/User';
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
        setInterval(this.battleCallBack, this.battleInterval * 1000)
        //！！！待修改当第1个先手值小的时候，第二位先手，否则第一位
        if (this.userList[0] < this.userList[1]) {
            this.thisTurnIndex = 1
        } else {
            this.thisTurnIndex = 0
        }
    }
    //判斷是哪種攻擊類型
    judgeAttackType() {
        //预留大招！！！待修改
        if (Math.random() <= this.thisUser.criticalStrikeProbability) {//用技能概率，待修改！！！
            return SkillType.GeneralSkills
        }
        return SkillType.Attack//普通攻击
    }
    //判斷是否暴击
    judegStrike() {
        if (Math.random() <= this.thisUser.criticalStrikeProbability) {
            return true
        }
    }

    hit() {
        let hitMsg = new HitMessage()

        switch (this.judgeAttackType()) {
            case SkillType.Attack:
                hitMsg.hurt = this.thisUser.normalAttackHurt
                break;

            case SkillType.GeneralSkills:
                //有概率暴击
                if (this.judegStrike) {

                    hitMsg.hurt = this.thisUser.criticalStrikeHurt
                } else {
                    hitMsg.hurt = this.thisUser.normalAttackHurt//待修改！！！
                }
                break;

            case SkillType.UniqueSkill:
                hitMsg = this.thisUser//待修改！！！大招伤害
                break
        }
        return hitMsg
    }

    responce(hitMsg) {
        //反弹处理
        if (Math.random() <= this.thisUser.reflectProbability) {
            this.thisUser.blood -= hitMsg.hurt * this.anotherUser.reflectRatio
            return
        }
        //闪避处理
        if (Math.random() <= this.thisUser.dodgeProbability) {
            return
        }
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

        console.log(`end turn:${this.turn}`)

        //增加轮数
        this.turn++
        //切换主场
        this.thisTurnIndex = this.thisTurnIndex === 1 ? 0 : 1
    }
}


