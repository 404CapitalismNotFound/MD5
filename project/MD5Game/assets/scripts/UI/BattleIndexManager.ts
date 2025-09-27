import { _decorator, Animation, Component, director, Label, Node, ParticleSystem, ParticleSystem2D, Prefab, ProgressBar, RichText, Script, Sprite, SpriteFrame } from 'cc';
import { SkillImageContronel } from './SkillImageContronel';
import { GameManager } from '../GameManager';
import { Engine } from '../Engine/Engine';
const { ccclass, property } = _decorator;


class StatueIndex {
    faceIcon: SpriteFrame = null
    id: Label = null
    growRate: Label = null
    battleRate: Label = null
    blood: ProgressBar = null
    blue: ProgressBar = null
    energy: ProgressBar = null
    

    normalSkills: SpriteFrame[] = []

    constructor(StatueNode: Node) {
        this.faceIcon = StatueNode.getChildByName("FaceIconMask").getChildByName("FaceIcon").getComponent(Sprite).spriteFrame

        this.id = StatueNode.getChildByName("UserInfoModel").getChildByName("Name").getComponent(Label)
        this.growRate = StatueNode.getChildByName("UserInfoModel").getChildByName("GrowNum").getComponent(Label)
        this.battleRate = StatueNode.getChildByName("UserInfoModel").getChildByName("BattleNum").getComponent(Label)

        this.blood = StatueNode.getChildByName("PrgoressBars").getChildByName("Blood").getChildByName("Progess").getComponent(ProgressBar)
        this.blue = StatueNode.getChildByName("PrgoressBars").getChildByName("Blue").getChildByName("Progess").getComponent(ProgressBar)
        this.energy = StatueNode.getChildByName("PrgoressBars").getChildByName("Energy").getChildByName("Progess").getComponent(ProgressBar)

        // 最终校验组件是否获取成功
        if (!this.id || !this.growRate || !this.battleRate ||
            !this.blood || !this.blue || !this.energy) {
            console.error("Battle界面初始化失败：组件获取失败！");
            console.error({
                id: !!this.id,
                growRate: !!this.growRate,
                battleRate: !!this.battleRate,
                blood: !!this.blood,
                blue: !!this.blue,
                energy: !!this.energy
            });
            return;
        }

        const skills = StatueNode.getChildByName("Skills")
        // const skills1 = director.;
        if (skills) {
            for (let i = 0; i < skills.children.length; i++) {
                const skillNode = skills.children[i]
                const spriteComponent = skillNode.getComponent(Sprite)
                if (spriteComponent && spriteComponent.spriteFrame) {
                    this.normalSkills.push(spriteComponent.spriteFrame)
                } else console.error("Battle界面初始化技能图片节点失败！！！")
            }
        } else console.error("Battle界面初始化技能图片节点失败！！！")
    }
}

@ccclass('BattleIndexManager')
export class BattleIndexManager extends Component {

    @property(Node)
    private myStatueNode: Node = null
    // @property(Node)
    // private emeyStatueNode: Node = null
    @property(Node)
    gameOverLayer: Node = null
    @property(RichText)
    battleInfo: RichText = null
    @property([ParticleSystem2D])
    myPaticleIndex = []
    @property([Node])
    SkillPanel:Node[] = [];
    @property([Node])
    Skill1:Node[] = []
    // @property([Node])
    // Skill2:Node[] = []
    // @property([Node])
    // Skill3:Node[] = []
    // @property([Node])
    // Skill4:Node[] = []


    // @property([ParticleSystem2D])
    // enemyPaticleIndex = []
    @property(Animation)
    myAnimationIndex:Animation = null
    @property(Animation)
    enemyAnimationIndex = null
    myStatueBarIndex: StatueIndex = null
    emeyStatueBarIndex: StatueIndex = null

    onLoad() {
        console.log("玩家技能名")
        console.log(GameManager.engine.userList[0].skillList.GeneralSkills[0].skillName)
        // this.Skill1[3].active = true
    }
}