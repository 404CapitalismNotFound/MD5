import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { User } from '../Objs/User';

@ccclass('Engine')
export class Engine extends Component {
        @property(Number)//单位：秒
        private battleInterval:number = 5
        private userList:User[] = [new User("1"),new User("2")]//索引是我自己，1是敌人
        private turn:number = 1  
        private thisTurnIndex:number = NaN//主动攻击方
        constructor(){
            super()//初始化父类
            setInterval(this.battleCallBack,this.battleInterval*1000)

            if (this.userList[0]<this.userList[1]){//！！！待修改当第1个战力值小的时候，第二位先手，否则第一位
                this.thisTurnIndex = 1
            }else{
                this.thisTurnIndex = 0
            }
        }

        battleCallBack(){
            console.log(`start turn:${this.turn}`)
            //判断攻击类型

            this.turn++
        }
}


