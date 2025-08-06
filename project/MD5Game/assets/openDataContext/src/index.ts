import { IMessage, IUserGameData } from './types';
import 'miniprogram-api-typings'

// 获取共享画布
const sharedCanvas = wx.getSharedCanvas();
const ctx = sharedCanvas.getContext('2d');


/**
 * 画布位置大概位于0,750处，每生成一个新的画布位置-200
 * 
 */
// 初始化画布尺寸
sharedCanvas.width = 1067;
sharedCanvas.height = 2000;

// 监听主域消息
wx.onMessage((message: IMessage) => {
  switch (message.command) {
    case 'renderRanking':
      renderRanking(message.data?.width, message.data?.height);
      break;
    case 'touchEvent':
      handleTouchEvent(message.data?.x, message.data?.y);
      break;
    case 'close':
      clearCanvas();
      break;
  }
});

// 渲染排行榜
function renderRanking(width = 720, height = 1280) {
  // 更新画布尺寸
  sharedCanvas.width = width;
  sharedCanvas.height = height;
  
  // 清空画布
  ctx.clearRect(0, 0, width, height);
  
  // 绘制背景
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, width, height);
  
  // 获取好友数据
  wx.getFriendCloudStorage({
    keyList: ['score'],
    success: (res) => {
      const data = res.data as IUserGameData[];
      renderFriendList(data, width, height);
    }
  });
}

// 渲染好友列表（带类型检查）
function renderFriendList(list: IUserGameData[], width: number, height: number) {
  // 绘制标题
  ctx.font = 'bold 40px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('好友排行榜', width / 2, 80);
  
  // 绘制列表
  list.slice(0, 10).forEach((item, index) => {
    const yPos = 150 + index * 70;
    
    // 绘制头像
    const avatarImg = wx.createImage();
    avatarImg.src = item.avatarUrl;
    avatarImg.onload = () => {
      ctx.drawImage(avatarImg, 60, yPos - 25, 50, 50);
    };
    
    // 绘制昵称
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      item.nickname.length > 8 ? 
        item.nickname.substring(0, 7) + '...' : 
        item.nickname,
      120,
      yPos
    );
    
    // 绘制分数
    const score = item.KVDataList.find(kv => kv.key === 'score')?.value || '0';
    ctx.textAlign = 'right';
    ctx.fillText(`分数: ${score}`, width - 60, yPos);
  });
}

// 处理触摸事件
function handleTouchEvent(x?: number, y?: number) {
  if (x === undefined || y === undefined) return;
  
  // 检查是否点击关闭按钮区域（右上角）
  if (x > sharedCanvas.width - 80 && y < 80) {
    // 通知主域关闭排行榜
    wx.getOpenDataContext().postMessage({
      command: 'closeRanking'
    } as IMessage);
  }
}

// 清空画布
function clearCanvas() {
  ctx.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
}