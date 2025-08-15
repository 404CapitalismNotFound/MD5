import { _decorator, Component, Node, Prefab, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillImageContronel')
export class SkillImageContronel extends Component {

    @property([Sprite])
    Value:Sprite[] = []


    @property([Sprite])
    ImageMap:Sprite[] = [];

    start() {
        console.log("ewqewrdsfadsafdsa")
    }

    update(deltaTime: number) {
        
    }

    select(Name:string){
        console.log("正在选择技能图片")
        var a = this.ImageMap[3]
        a.node.active = true
        a.node.setSiblingIndex(this.node.parent.children.length - 1)
        
    }
}


