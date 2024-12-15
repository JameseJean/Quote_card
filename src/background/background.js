// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateCard",
    title: "生成金句卡片",
    contexts: ["selection"]
  });
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