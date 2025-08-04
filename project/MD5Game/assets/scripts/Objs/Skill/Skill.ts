import { _decorator, Component, Node } from 'cc';
import { Faction } from '../Faction';
import { SkillType } from './SkillType';
const { ccclass, property } = _decorator;

@ccclass('Skill')
export class Skill extends Component {

    // 技能类型（普工，技能，大招）
    skillType:SkillType
    // 技能名称
    skillName:string
    // 技能伤害
    skillHurt:number

    @property
    SpecialEffect = null

    /**
     * @param Cmap  角色阵营
     * @param Type  技能类型 （ 位于SkillStpe中）
     * @param Hurt  技能伤害
     * @param num   0-普攻，1~4小技能，5大招
     * 
    */
    constructor(Cmap:Faction, Type:SkillType, Hurt:number, num:number = 0){
        super()

        this.skillHurt = Hurt;
        this.skillType = Type;

        if(num === 0) {
            this.skillName = "普通攻击";
        }else if(num === 5){
            switch(Cmap){
                case Faction.Su :
                    this.skillName = "核弹攻击";
                    break;
                case Faction.Meng:
                    this.skillName = "气象攻击";
                    break;
                case Faction.Yuri:
                    this.skillName = "心灵震爆";
                    break;
                case Faction.FenFeng:
                    this.skillName = "顶点风暴";
                    break;
                default :
                    this.skillName = "核弹攻击";
                    break;
            }
        }else{
            switch(Cmap){
                case Faction.Su:
                    switch(num){
                        case 1:
                            this.skillName = "铁幕装置"
                            break;
                        case 2:
                            this.skillName = "辐射空袭"
                            break;
                        case 3:
                            this.skillName = "核能奔涌"
                            break;
                        case 4:
                            this.skillName = "电磁风暴"
                            break;
                        default :
                            this.skillName = "钢铁长城"
                            break;
                    };
                    break;

                case Faction.Meng:
                    switch(num){
                        case 1:
                            this.skillName = "狮心王轰炸"
                            break;
                        case 2:
                            this.skillName = "圣骑支援"
                            break;
                        case 3:
                            this.skillName = "冰冻射线"
                            break;
                        case 4:
                            this.skillName = "墨丘利卫星打击"
                            break;
                        default :
                            this.skillName = "激光锁定"
                            break;
                    };
                    break;

                case Faction.Yuri:
                    switch(num){
                        case 1:
                            this.skillName = "基因震爆"
                            break;
                        case 2:
                            this.skillName = "剧毒空袭"
                            break;
                        case 3:
                            this.skillName = "动能屏障"
                            break;
                        case 4:
                            this.skillName = "治疗药剂"
                            break;
                        default :
                            this.skillName = "心灵控制"
                            break;
                    };
                    break;
                case Faction.FenFeng:
                    switch(num){
                        case 1:
                            this.skillName = "造物惩击"
                            break;
                        case 2:
                            this.skillName = "等离子切割"
                            break;
                        case 3:
                            this.skillName = "先锋炮艇"
                            break;
                        case 4:
                            this.skillName = "黄金之风"
                            break;
                        default :
                            this.skillName = "信号截断"
                            break;
                    };
                    break;
                default:
                    switch(num){
                        case 1:
                            this.skillName = "铁幕装置"
                            break;
                        case 2:
                            this.skillName = "辐射空袭"
                            break;
                        case 3:
                            this.skillName = "核能奔涌"
                            break;
                        case 4:
                            this.skillName = "电磁风暴"
                            break;
                        default :
                            this.skillName = "钢铁长城"
                            break;
                    };
                    break;
            }
        }
    }
    
}