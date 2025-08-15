import { _decorator, Component, find, Label, Node, ProgressBar, RichText, Sprite, SpriteFrame,assetManager, ImageAsset, Texture2D } from 'cc';
import { GameManager } from '../GameManager';
import { BattleIndexManager } from './BattleIndexManager';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {
    battleInfoString:string = ""

    @property(BattleIndexManager)
    battleIndexManager:BattleIndexManager =null
    gameManager: GameManager = null
    @property(Label)
    nameLabel:Label= null
    @property(Sprite)
    avatar:Sprite =null

    protected onLoad(): void {
        this.gameManager = find("Manager").getComponent(GameManager)
        if (!this.gameManager) {
            console.error("GameManager在Battle界面未找到引用！！！")
        }   
        
    }

    setMyName(name:string){
        this.battleIndexManager.myStatueBarIndex.id.string = name
    }

    setMyGrow(grow:string){
        this.battleIndexManager.myStatueBarIndex.growRate.string = grow
    }

    setMyBattle(battle:string){
        this.battleIndexManager.myStatueBarIndex.battleRate.string = battle
    }

    // 敌人相关方法
    // setEnemyName(name:string){
    //     this.battleIndexManager.emeyStatueBarIndex.id.string = name
        
    //     }

    // setEnemyGrow(grow:string){
    //     this.battleIndexManager.emeyStatueBarIndex.growRate.string = grow
        
    //     }

    // setEnemyBattle(battle:string){
    //     this.battleIndexManager.emeyStatueBarIndex.battleRate.string = battle
        
    //     }

    setMyBlood(percentage:number){
        this.battleIndexManager.myStatueBarIndex.blood.progress = percentage
    }

    // setEnemyBlood(percentage:number){
    //     this.battleIndexManager.emeyStatueBarIndex.blood.progress = percentage
        
    //     }

    setMyBlue(percentage:number){
        this.battleIndexManager.myStatueBarIndex.blue.progress = percentage
    }

    // setEnemyBlue(percentage:number){
    //     this.battleIndexManager.emeyStatueBarIndex.blue.progress = percentage
        
    //     }

    setMyEnergy(percentage:number){
        this.battleIndexManager.myStatueBarIndex.energy.progress = percentage
    }

    // setEnemyEnergy(percentage:number){
    //     this.battleIndexManager.emeyStatueBarIndex.energy.progress = percentage
        
    //     }

    private setBattleInfo(){
        if (this.battleInfoString.length>200) {
            this.battleInfoString = this.battleInfoString.slice(-200)
        }
        this.battleIndexManager.battleInfo.string = this.battleInfoString
    }

    addBattleInfo(add:string){
            this.battleInfoString+=(add+"\n")
            this.setBattleInfo()
    }

    showGameOverLayer(){
        this.battleIndexManager.gameOverLayer.active = true
    }

    setUiInit(faceUrl:string,name:string){
        this.nameLabel.getComponent(Label).string = name
        let spire = this.avatar.getComponent(Sprite);
        assetManager.loadRemote<ImageAsset>(faceUrl + "?aaa=aa.jpg", { ext: '.jpg' }, (err, imageAsset) => {
            if (err) {
                return console.error(err.message);
            }

            let sp = new SpriteFrame();
            let texture = new Texture2D();
            texture.image = imageAsset;
            sp.texture = texture
            spire.spriteFrame = sp;
        })
    }
}
