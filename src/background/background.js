// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "generateCard",
      title: "生成金句卡片",
      contexts: ["selection"]
    });
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Context menu clicked:', info);
  if (info.menuItemId === "generateCard") {
    chrome.tabs.sendMessage(tab.id, {
      type: "GET_SELECTED_TEXT"
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log('Response from content script:', response);
      }
    });
  }
}); 