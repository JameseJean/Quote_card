// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  console.log('金句卡片生成器已安装');
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateCard") {
    chrome.tabs.sendMessage(tab.id, {
      type: "GENERATE_CARD",
      text: info.selectionText
    });
  }
}); 