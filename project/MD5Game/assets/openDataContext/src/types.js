import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 定义主域和开放数据域通信的消息类型
export interface IMessage {
    command: 'renderRanking' | 'close' | 'touchEvent';
    data?: {
        width?: number;
        height?: number;
        x?: number;
        y?: number;
  };
}

// 微信云存储数据结构
export interface IUserGameData {
    avatarUrl: string;
    nickname: string;
    KVDataList: Array<{
        key: string;
        value: string;
    }>;
}



