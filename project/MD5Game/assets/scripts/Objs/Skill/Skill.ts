import { _decorator, Component, Node } from 'cc';
import { Faction } from '../Faction';
import { SkillType } from './SkillType';
const { ccclass, property } = _decorator;

@ccclass('Skill')
export class Skill extends Component {

    @property
    SpecialEffect = null

    constructor(Cmap:Faction, Type:SkillType, Hurt:number){
        super()
        this.skillHurt = Hurt
        this.skillName = "普通攻击"
        this.skillType = SkillType.Attack
    }
    constructor
    skillType:SkillType    
    skillName:string
    skillHurt:number

}