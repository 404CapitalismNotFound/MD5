import { _decorator, Component, Node } from 'cc';
import { Faction } from '../Faction';
import { SkillType } from './SkillType';
const { ccclass, property } = _decorator;

@ccclass('Skill')
export class Skill extends Component {

    @property
    SpecialEffect:

    constructor(Cmap:Faction, Type:SkillType){
        if (Cmap === Faction.Su ){
            if(Type = SkillType.Attack)

        }
        super()

    }

}