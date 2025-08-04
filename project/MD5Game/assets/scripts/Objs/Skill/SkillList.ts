import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { Skill } from './Skill';
import { Faction } from '../Faction';

@ccclass('Skills')
export class Skills extends Component {
    constructor(Camp:Faction, SkillHurt:number, ) {
        super()
        this.Attack = 

    }

    // 普通攻击
    public Attack: Skill
    // 小技能
    public GeneralSkills: Array<Skill>
    // 必杀技
    public UniqueSkill: Skill
}


