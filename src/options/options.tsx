import React from 'react';
import { createRoot } from 'react-dom/client';

function Options() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-medium mb-4">金句卡片生成器 - 设置</h1>
      
      {/* TODO: 添加设置选项 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-2">常规设置</h2>
          <div className="space-y-2">
            {/* 设置项将在这里添加 */}
          </div>
        </div>
      </div>
    </div>
  );
}

// 确保root元素存在
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(<Options />); 