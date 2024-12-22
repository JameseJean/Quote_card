// 保存选中的文字集合
let selectedTexts = new Set();

// 监听文字选择
document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  
  // 按住Shift键可以多选
  if (text && window.event.shiftKey) {
    selectedTexts.add(text);
  } else if (text) {
    selectedTexts.clear();
    selectedTexts.add(text);
  }
});

// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  if (request.type === 'GET_SELECTED_TEXT') {
    const texts = Array.from(selectedTexts);
    console.log('Selected texts:', texts);
    sendResponse({ texts });
  }
});

console.log('Content script loaded'); 