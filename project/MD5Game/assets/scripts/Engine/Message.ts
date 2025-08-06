import { SkillType } from '../Objs/Skill/SkillType';
import { User } from '../Objs/User/User';

/**
 * 需要注意，只有HitMsg中的hurt会真正左右游戏逻辑的进行，其他的都只是输出文字的准备
 */
export class HitMessage {
    hurt: number = 0
    attackType: SkillType = SkillType.Attack    // 攻击类型
    isCritical: boolean = false                 // 是否暴击
    from: User = null
    to: User = null

    constructor(hurt?: number, attackType?: SkillType, isCritical?: boolean) {
        if (hurt !== undefined) this.hurt = hurt;
        if (attackType !== undefined) this.attackType = attackType;
        if (isCritical !== undefined) this.isCritical = isCritical;
    }

    toString() {
        return `${this.from.userName}对${this.to.userName}发起${SkillType}攻击${this.isCritical? ",产生暴击":""}`
    }
}

export enum ResponceType {
    REFLECT = '反弹',    // 反弹
    DODGE = '闪避',       // 闪避
    NORMAL = '正常'      // 正常受伤
}
export class ResponceMessage {
    type: ResponceType = ResponceType.NORMAL
    actualDamage: number = 0    // 实际造成的伤害
    reflectDamage: number = 0   // 反弹伤害
    from: User = null
    to: User = null

    constructor(type: ResponceType, actualDamage: number, reflectDamage: number,from:User,to:User) {
        this.type = type;
        this.actualDamage = actualDamage;
        this.reflectDamage = reflectDamage;
        this.from =from
        this.to = to
    }

    static reflect(reflectDamage: number,from:User,to:User): ResponceMessage {
        return new ResponceMessage(ResponceType.REFLECT, 0, reflectDamage,from,to);
    }

    static dodge(from:User,to:User): ResponceMessage {
        return new ResponceMessage(ResponceType.DODGE, 0, 0,from,to);
    }

    static normal(actualDamage: number,from:User,to:User): ResponceMessage {
        return new ResponceMessage(ResponceType.NORMAL, actualDamage, 0,from,to);
    }

    toString() {
        return `${this.from.userName}对${this.to.userName}的攻击${this.type},造成伤害${this.actualDamage},反弹伤害${this.reflectDamage}`
    }
}