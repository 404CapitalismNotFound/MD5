import { _decorator, Button, Component, director, find, instantiate, Node, Prefab, UITransform } from 'cc';
import { Battle } from './Battle';
import { StartMenu } from './StartMenu';
import { GameManager } from '../GameManager';
import { UserData } from '../Objs/Types';

const { ccclass, property } = _decorator;

@ccclass('ListView')
export class ListView extends Component {

    @property(Prefab)
    RankPrefab:Prefab = null
    @property(Node)
    RankListView = null

    // RankUnitCreater = new 

    Manager:GameManager

    UserDataListTest:Array<UserData>

    protected start(): void {
        
    }

    protected update(dt: number): void {
        
    }

    createDataList() {
        for (let i = 0; i < 30; i++) {
            let temp = new UserData("测试", 0, 99999, i )
            this.UserDataListTest.push(temp)
        }
    }

    protected onLoad(): void {
        this.UserDataListTest = new Array<UserData>();
        this.Manager = find("Manager").getComponent(GameManager)        
    }

    onReturnButtonChlick(){
        director.loadScene("StartMenu")
        this.node.destroy();
    }

    onStartButtonChlick(){
        this.node.destroy();
        this.Manager.changeSceneToBattle()
    }

    generateRankList(data:Array<UserData>) {
        const content = this.RankListView.content;
        content.removeAllChildren(); // 清空旧内容

        // 设置Content高度（确保可以滚动）
        content.getComponent(UITransform).height = data.length * 200;

        // 遍历data数组，得到每一个对象
        data.forEach((itemData, index) => {
            const item = instantiate(this.RankPrefab);
            
            content.addChild(item);

            // 设置位置（Y从顶部开始向下排列）
            item.setPosition(0, -index * 200, 0);

            // 传递数据给单项
            const rankItem = item.getComponent('ListView');
            if (rankItem) rankItem.init
        });
    }
    
}
