import React from 'react';
import { CardTemplate } from '../../types/template';

interface StyleEditorProps {
  template: CardTemplate;
  onUpdate: (template: CardTemplate) => void;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ template, onUpdate }) => {
  const handleStyleChange = (
    category: 'container' | 'text' | 'effects',
    property: string,
    value: string | number
  ) => {
    const updatedTemplate = {
      ...template,
      styles: {
        ...template.styles,
        [category]: {
          ...template.styles[category],
          [property]: value,
        },
      },
    };
    onUpdate(updatedTemplate);
  };

  return (
    <div className="space-y-6">
      {/* 背景设置 */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-3">背景设置</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">背景类型</label>
            <select
              className="w-full p-2 border rounded"
              value={template.styles.container.background.includes('gradient') ? 'gradient' : 'solid'}
              onChange={(e) => {
                const value = e.target.value;
                handleStyleChange(
                  'container',
                  'background',
                  value === 'gradient'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#ffffff'
                );
              }}
            >
              <option value="solid">纯色</option>
              <option value="gradient">渐变</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              {template.styles.container.background.includes('gradient') ? '渐变色' : '背景色'}
            </label>
            {template.styles.container.background.includes('gradient') ? (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="color"
                  className="w-full"
                  value="#667eea"
                  onChange={(e) => {
                    const color1 = e.target.value;
                    const color2 = template.styles.container.background.match(/#[a-f\d]{6}/gi)?.[1] || '#764ba2';
                    handleStyleChange(
                      'container',
                      'background',
                      `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
                    );
                  }}
                />
                <input
                  type="color"
                  className="w-full"
                  value="#764ba2"
                  onChange={(e) => {
                    const color2 = e.target.value;
                    const color1 = template.styles.container.background.match(/#[a-f\d]{6}/gi)?.[0] || '#667eea';
                    handleStyleChange(
                      'container',
                      'background',
                      `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
                    );
                  }}
                />
              </div>
            ) : (
              <input
                type="color"
                className="w-full"
                value={template.styles.container.background}
                onChange={(e) =>
                  handleStyleChange('container', 'background', e.target.value)
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* 字体设置 */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-3">字体设置</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">字体</label>
            <select
              className="w-full p-2 border rounded"
              value={template.styles.text.fontFamily}
              onChange={(e) =>
                handleStyleChange('text', 'fontFamily', e.target.value)
              }
            >
              <option value='"PingFang SC", sans-serif'>苹方</option>
              <option value='"Source Han Sans CN", sans-serif'>思源黑体</option>
              <option value='"Noto Serif SC", serif'>思源宋体</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">字号</label>
            <input
              type="range"
              min="12"
              max="48"
              value={parseInt(template.styles.text.fontSize)}
              onChange={(e) =>
                handleStyleChange('text', 'fontSize', `${e.target.value}px`)
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">颜色</label>
            <input
              type="color"
              value={template.styles.text.color}
              onChange={(e) =>
                handleStyleChange('text', 'color', e.target.value)
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">对齐方式</label>
            <select
              className="w-full p-2 border rounded"
              value={template.styles.text.textAlign}
              onChange={(e) =>
                handleStyleChange(
                  'text',
                  'textAlign',
                  e.target.value as 'left' | 'center' | 'right'
                )
              }
            >
              <option value="left">左对齐</option>
              <option value="center">居中</option>
              <option value="right">右对齐</option>
            </select>
          </div>
        </div>
      </section>

      {/* 特效设置 */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-3">特效设置</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">阴影</label>
            <select
              className="w-full p-2 border rounded"
              value={template.styles.effects?.shadow || 'none'}
              onChange={(e) =>
                handleStyleChange('effects', 'shadow', e.target.value)
              }
            >
              <option value="none">无</option>
              <option value="0 2px 4px rgba(0,0,0,0.1)">浅阴影</option>
              <option value="0 4px 6px rgba(0,0,0,0.1)">中阴影</option>
              <option value="0 10px 15px rgba(0,0,0,0.1)">深阴影</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">边框</label>
            <select
              className="w-full p-2 border rounded"
              value={template.styles.effects?.border || 'none'}
              onChange={(e) =>
                handleStyleChange('effects', 'border', e.target.value)
              }
            >
              <option value="none">无</option>
              <option value="1px solid #e2e8f0">细边框</option>
              <option value="2px solid #e2e8f0">粗边框</option>
              <option value="1px dashed #e2e8f0">虚线边框</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}; 