import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function Popup() {
  const [selectedText, setSelectedText] = useState('');
  const [template, setTemplate] = useState('default');
  
  // 处理卡片生成
  const generateCard = async () => {
    // 创建canvas并绘制卡片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 绘制背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制文字
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.fillText(selectedText, 20, 40);
    
    // 导出为图片
    const dataUrl = canvas.toDataURL('image/png');
    
    // 触发下载
    chrome.downloads.download({
      url: dataUrl,
      filename: '金句卡片.png'
    });
  };

  return (
    <div className="p-4">
      <textarea 
        value={selectedText}
        onChange={(e) => setSelectedText(e.target.value)}
        className="w-full h-32 p-2 border rounded"
      />
      <button 
        onClick={generateCard}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        生成卡片
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Popup />); 