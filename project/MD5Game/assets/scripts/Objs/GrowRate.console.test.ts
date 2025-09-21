import { GrowRate } from "./GrowRate";
import { User } from "./User/User";
import { Faction } from "./Faction";

// 创建测试用户
const user = new User("测试玩家", Faction.Meng);

// 创建成长值实例
const grow = new GrowRate({
    userName: user.userName,
    userNameMD5: user.userNameMD5,
    faction: user.faction
});

// 连续调用 add 方法
for (let i = 0; i < 5; i++) {
    grow.add();
    console.log(`第${grow.addTimes}次成长，成长值:`, grow.outputGrowRate);
}

// 保存（键为用户名md5值，换言之，成长值系统依据用户名区分用户身份）
grow.save();

// 加载
const grow2 = new GrowRate({
    userName: user.userName,
    userNameMD5: user.userNameMD5,
    faction: user.faction
});
grow2.load();
console.log("重新加载后的 addTimes:", grow2.addTimes);
console.log("重新加载后的 outputGrowRate:", grow2.outputGrowRate);
