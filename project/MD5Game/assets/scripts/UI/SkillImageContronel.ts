import { _decorator, Component, Node, Prefab, Sprite } from 'cc';
import { SkillList } from '../Objs/Skill/SkillList';
import { User } from '../Objs/User/User';
import { Faction } from '../Objs/Faction';
import { MINIGAME } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('SkillImageContronel')
export class SkillImageContronel extends Component {

    @property([Node])
    Value: Node[] = []


    @property([Node])
    ImageMap: Node[] = [];

    start() {
        console.log("ewqewrdsfadsafdsa")
    }

    update(deltaTime: number) {

    }

    select(user: User) {
        console.log(user.faction)
        console.log(Faction.Su)
        if(user !== null) {
            var min_index = 0;
            var max_index = 0;
            switch(user.faction){
                case Faction.Su:
                    min_index = 0;
                    max_index = 6;
                    break;
                case Faction.Meng:
                    min_index = 7;
                    max_index = 12;
                    break;
                case Faction.Yuri:
                    min_index = 13;
                    max_index = 18;
                    break;
                case Faction.FenFeng:
                    min_index = 19;
                    max_index = 24;
                    break;
                default:
                    console.log("没有正确识别阵营")
            }
            
        }   
    }
}

