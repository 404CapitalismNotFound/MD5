import { _decorator, Component, Node } from 'cc';
import { Faction } from '../Faction';
import { SkillType } from './SkillType';
const { ccclass, property } = _decorator;

@ccclass('Skill')
export class Skill extends Component {

    @property
<<<<<<< HEAD
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
=======
    SpecialEffect:

    constructor(Cmap:Faction, Type:SkillType){
        if (Cmap === Faction.Su ){
            if(Type = SkillType.Attack)

        }
        super()

    }
>>>>>>> dev

}