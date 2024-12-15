import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="w-[800px] h-[600px] bg-white">
      <header className="h-12 px-4 border-b flex items-center justify-between">
        <h1 className="text-lg font-medium">金句卡片生成器</h1>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          设置
        </button>
      </header>
      <main className="flex h-[calc(100%-48px)]">
        {children}
      </main>
    </div>
  );
}; 