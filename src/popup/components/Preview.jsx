import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export const Preview = ({ texts = [] }) => {
  const previewRef = useRef(null);

  const handleExport = async () => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      
      chrome.downloads.download({
        url: dataUrl,
        filename: '金句卡片.png',
        saveAs: true
      });
    } catch (error) {
      console.error('导出失败:', error);
    }
  };

  return (
    <div className="w-1/2 p-4 bg-gray-50">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700">预览</h2>
        <button 
          onClick={handleExport}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          导出
        </button>
      </div>
      
      <div 
        ref={previewRef}
        className="w-full h-[400px] bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center space-y-4"
      >
        {texts.map((text, index) => (
          <p key={index} className="text-lg text-center">{text}</p>
        ))}
      </div>
    </div>
  );
}; 