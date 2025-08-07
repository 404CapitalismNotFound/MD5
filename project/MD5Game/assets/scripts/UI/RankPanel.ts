import { _decorator, Button, Component, director, find, Node, Prefab } from 'cc';
import { TransformSchema } from 'XrFrame/xrFrameSystem';
import { Battle } from './Battle';
import { StartMenu } from './StartMenu';
import { GameManager } from '../GameManager';
import { DataTypes } from '../../openDataContext/src/DataTypes';

const { ccclass, property } = _decorator;

@ccclass('RankPanel')
export class RankPanel extends Component {

    @property(Prefab)
    RankPrefab:Prefab = null
    @property(Node)
    RankListView = null

    Manager:GameManager = null;

    UserDataListTest:Array<DataTypes>

    createDataList() {
        for (let i = 0; i < 30; i++) {
            let temp = new DataTypes(i, null, "测试", 99999 )
            this.UserDataListTest.push(temp)
        }
    }

    protected onLoad(): void {
        this.UserDataListTest = new Array<DataTypes>();
        this.Manager = find("Manager").getComponent(GameManager)        
    }

    protected start(): void {

    }

    protected update(dt: number): void {
        
    }

    onReturnButtonChlick(){
        director.loadScene("StartMenu")
        this.node.destroy();
    }

    onStartButtonChlick(){
        this.node.destroy();
        this.Manager.changeSceneToBattle()
    }
    
}
