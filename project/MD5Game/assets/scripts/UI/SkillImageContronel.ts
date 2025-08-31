import { _decorator, Component, Node, Prefab, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillImageContronel')
export class SkillImageContronel extends Component {

    @property([Node])
    Value:Node[] = []


    @property([Node])
    ImageMap:Node[] = [];

    start() {
        console.log("ewqewrdsfadsafdsa")
    }

    update(deltaTime: number) {
        
    }

    select(Name:string){
        console.log("正在选择技能图片")
        var a = this.ImageMap[3]
        a.active = true
        const b = a.getComponent(Sprite)
        console.log(b.spriteFrame.name)
        
        // a.setSiblingIndex(this.node.parent.children.length - 1)
        
    }
}

