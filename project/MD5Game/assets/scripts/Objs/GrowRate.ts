import { Faction } from "./Faction";
import { sys } from "cc"

/**
 * 成长值系统
 * 构造函数传入user对象，使用user.userName的md5作为localStorage的key
 * 不同阵营对应不同成长函数，最大值归一化为100
 */
export class GrowRate {
    public faction: Faction;
    public addTimes: number = 0;
    public outputGrowRate: number = 0;
    private growFunction: (x: number) => number;
    private storageKey: string;

    /**
     * @param user 需要包含 userName, userNameMD5, faction:string
     */
    constructor(user: { userName: string, userNameMD5: string, faction: string }) {
        this.faction = user.faction as Faction;
        this.storageKey = `GrowRate_${user.userNameMD5}`;
        this.growFunction = this.getGrowFunction(this.faction);
        this.load();
    }

    private getGrowFunction(faction: Faction): (x: number) => number {
        // x范围建议1~10，最大值归一化为100，若因变量超限则取100
        switch (faction) {
            case Faction.Su:
                // 线性 y = 10x
                return (x: number) => Math.min(10 * x, 100);
            case Faction.Meng:
                // 对数 y = 43.43 * ln(x)（x>=1） 若不满足则按10来算
                return (x: number) => x <= 1 ? 10 : Math.min(43.43 * Math.log(x), 100);
            case Faction.Yuri:
                // 指数 y = 6.389 * exp(0.5x)
                return (x: number) => Math.min(6.389 * Math.exp(0.5 * x), 100);
            case Faction.FenFeng:
                // 二次 y = x^2
                return (x: number) => Math.min(x * x, 100);
            default:
                return (x: number) => 0;
        }
    }

    public add() {
        this.addTimes++;
        this.outputGrowRate = this.growFunction(this.addTimes);
    }

    /**
     * 保存当前成长数据到本地
     */
    public save() {
        GrowRate.saveData(this.storageKey, this.addTimes, this.outputGrowRate);
    }

    /**
     * 从本地加载成长数据
     */
    public load() {
        const data = GrowRate.loadData(this.storageKey);
        if (data) {
            this.addTimes = data.addTimes;
            this.outputGrowRate = data.outputGrowRate;
        } else {
            this.addTimes = 0;
            this.outputGrowRate = 0;
        }
    }

    /**
     * 静态方法：保存成长数据
     */
    public static saveData(storageKey: string, addTimes: number, outputGrowRate: number) {
        const data = { addTimes, outputGrowRate };
        sys.localStorage.setItem(storageKey, JSON.stringify(data));
    }

    /**
     * 静态方法：加载成长数据
     */
    public static loadData(storageKey: string): { addTimes: number, outputGrowRate: number } | null {
        const str = sys.localStorage.getItem(storageKey);
        if (str) {
            try {
                const data = JSON.parse(str);
                return {
                    addTimes: data.addTimes || 0,
                    outputGrowRate: data.outputGrowRate || 0
                };
            } catch (e) {
                console.error(e)
                return null;
            }
        } else {
            console.log(`未找到${storageKey}的数据，返回null`)
        }
        return null;
    }
}


