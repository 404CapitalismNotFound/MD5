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
        if (!(user instanceof User)) {
            console.log("user 不是 User 的实例");
            return;
        }
        console.log("正在选择技能图片")
        
        let min_index: number
        let max_index: number
        console.log("正在选择技能图片")
        switch (user.faction) {
            case Faction.Su:
                min_index = 0
                max_index = 5
                break;
            case Faction.Meng:
                min_index = 6
                max_index = 11
                break;
            case Faction.Yuri:
                min_index = 12
                max_index = 17
                break;
            case Faction.FenFeng:
                min_index = 18
                max_index = 23
                break;
            default:
                console.log("未正确识别阵营")
                break;
        }
        
        let SkillName = null
        console.log("大招：")
        console.log(user.skillList.UniqueSkill.skillName)
        for(let i = 0; i < 3 ;i++) {
            console.log(user.skillList.GeneralSkills[i].skillName)
        }
        console.log
        for (var i = 0; i < 4; i++) {
            for (var j = min_index; j < max_index; j++) {
                var a = this.ImageMap[i]
                const b = a.getComponent(Sprite)
                if (i == 0 && b.spriteFrame.name == user.skillList.UniqueSkill.skillName) {
                    a.active = true
                    continue
                }else if (b.spriteFrame.name == SkillName) {
                    a.active = true
                }
            }
        }
    }
}

