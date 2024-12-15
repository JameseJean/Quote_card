// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GENERATE_CARD") {
    // 打开卡片生成器弹窗
    chrome.runtime.sendMessage({
      type: "OPEN_POPUP",
      text: request.text
    });
  }
});

// 监听文字选择
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // 可以在这里添加自定义UI提示
  }
}); 