import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { CardTemplate } from '../../types/template';
import { ExportSettings } from './ExportSettings';
import { Loading } from '../../components/Loading';

interface PreviewProps {
  texts: string[];
  template: CardTemplate;
  onExport: (dataUrl: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ texts, template, onExport }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showExportSettings, setShowExportSettings] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async (settings: {
    format: 'png' | 'jpg' | 'webp';
    quality: number;
    scale: number;
  }) => {
    if (!previewRef.current) return;
    
    try {
      setExporting(true);

      // 创建一个新的div用于导出
      const exportDiv = document.createElement('div');
      exportDiv.style.position = 'absolute';
      exportDiv.style.left = '-9999px';
      exportDiv.style.top = '-9999px';
      document.body.appendChild(exportDiv);

      // 克隆预览元素
      const clone = previewRef.current.cloneNode(true) as HTMLElement;
      exportDiv.appendChild(clone);

      // 确保所有字体都已加载
      await document.fonts.ready;

      // 使用html2canvas生成图片
      const canvas = await html2canvas(clone, {
        scale: settings.scale,
        useCORS: true, // 允许跨域图片
        allowTaint: true, // 允许跨域图片
        backgroundColor: null,
        logging: false, // 禁用日志
        imageTimeout: 0, // 禁用超时
        onclone: (clonedDoc) => {
          // 在克隆的文档中应用所有样式
          const clonedElement = clonedDoc.body.firstChild as HTMLElement;
          if (clonedElement) {
            // 应用计算后的样式
            const styles = window.getComputedStyle(previewRef.current!);
            Object.values(styles).forEach(key => {
              try {
                clonedElement.style[key as any] = styles.getPropertyValue(key);
              } catch (e) {
                // 忽略无效的样式属性
              }
            });
          }
        }
      });

      // 根据格式导出
      let dataUrl: string;
      if (settings.format === 'jpg') {
        // JPG需要白色背景
        const ctx = canvas.getContext('2d')!;
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        dataUrl = canvas.toDataURL('image/jpeg', settings.quality);
      } else if (settings.format === 'webp') {
        dataUrl = canvas.toDataURL('image/webp', settings.quality);
      } else {
        dataUrl = canvas.toDataURL('image/png');
      }

      // 清理临时元素
      document.body.removeChild(exportDiv);

      // 调用导出回调
      onExport(dataUrl);
      setShowExportSettings(false);
    } catch (error) {
      console.error('导出失败:', error);
      throw error; // 让上层处理错误
    } finally {
      setExporting(false);
    }
  };

  const { container, text, effects } = template.styles;

  return (
    <div className="w-1/2 p-4 bg-gray-50">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700">预览</h2>
        <button 
          onClick={() => setShowExportSettings(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={exporting}
        >
          {exporting ? '导出中...' : '导出'}
        </button>
      </div>
      
      {showExportSettings && (
        <div className="mb-4">
          <ExportSettings onExport={handleExport} />
        </div>
      )}

      {exporting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <Loading text="正在生成图片..." />
        </div>
      )}
      
      <div 
        ref={previewRef}
        style={{
          width: `${template.styles.container.width ?? 300}px`,
          height: `${template.styles.container.height ?? 200}px`,
          background: template.styles.container.background,
          padding: template.styles.container.padding,
          borderRadius: template.styles.container.borderRadius,
          boxShadow: template.styles.effects?.shadow,
          border: template.styles.effects?.border,
          opacity: template.styles.effects?.opacity,
        }}
        className="mx-auto"
      >
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          {texts.map((text, index) => (
            <p
              key={index}
              style={{
                fontSize: template.styles.text.fontSize,
                fontFamily: template.styles.text.fontFamily,
                color: template.styles.text.color,
                lineHeight: template.styles.text.lineHeight,
                letterSpacing: template.styles.text.letterSpacing,
                textAlign: template.styles.text.textAlign,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}; 