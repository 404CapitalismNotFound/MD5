import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { Skill } from './Skill';
import { Faction } from '../Faction';
import { SkillType } from './SkillType';

@ccclass('Skills')
/**
 * 
 * @param Attack    `   普通攻击
 * @param GeneralSkills 普通技能列表
 * @param UniqueSkill   大招
 */
export class SkillList extends Component {

    public Attack: Skill
    public GeneralSkills: Skill[]
    // 大招双倍技能伤害
    public UniqueSkill: Skill
    
    
    /**
     * @param Camp          阵营
     * @param SkillHurt     技能伤害
     * @param AttackHurt    普攻伤害
     */
    constructor(Camp:Faction, SkillHurt:number, AttackHurt:number) {
        super()
        this.Attack = new Skill(Camp, SkillType.Attack, AttackHurt, 0);
        for (let i = 0; i < 3; i++) {
            let a:number[]=[0, 0, 0, 0, 0, 0, 0, 0, 0];
            let temp = Math.floor(Math.random()*10) % 5
            while(true){
                temp = Math.floor(Math.random()*10) % 5
                if(a[temp] === 0){
                    break;
                }
            }
            a[temp]++;
            this.GeneralSkills.push(new Skill(Camp, SkillType.GeneralSkills, SkillHurt, temp));
        }
        this.UniqueSkill = new Skill(Camp, SkillType.UniqueSkill, SkillHurt*2, 5)

    }

}