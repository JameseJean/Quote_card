import React from 'react';
import { CardTemplate } from '../../types/template';
import { TemplateSelector } from './TemplateSelector';
import { StyleEditor } from './StyleEditor';

interface EditorProps {
  texts: string[];
  onChange: (texts: string[]) => void;
  templates: CardTemplate[];
  currentTemplate: CardTemplate;
  onTemplateSelect: (template: CardTemplate) => void;
  onTemplateUpdate: (template: CardTemplate) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const Editor: React.FC<EditorProps> = ({
  texts,
  onChange,
  templates,
  currentTemplate,
  onTemplateSelect,
  onTemplateUpdate,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    onChange(newTexts);
  };

  const handleAddText = () => {
    onChange([...texts, '']);
  };

  const handleRemoveText = (index: number) => {
    const newTexts = texts.filter((_, i) => i !== index);
    onChange(newTexts);
  };

  return (
    <div className="w-1/2 p-4 border-r overflow-y-auto">
      {/* 添加撤销/重做按钮 */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`
            px-2 py-1 rounded text-sm
            ${canUndo
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          撤销
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`
            px-2 py-1 rounded text-sm
            ${canRedo
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          重做
        </button>
      </div>

      {/* 文字编辑区域 */}
      {texts.map((text, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              文字内容 {texts.length > 1 ? `#${index + 1}` : ''}
            </label>
            {texts.length > 1 && (
              <button
                onClick={() => handleRemoveText(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            className="w-full h-32 p-2 border rounded resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="在这里输入或粘贴文字..."
          />
        </div>
      ))}
      
      <button
        onClick={handleAddText}
        className="w-full p-2 border-2 border-dashed rounded text-gray-500 hover:text-gray-700 hover:border-gray-400"
      >
        + 添加文字
      </button>

      {/* 模板选择器 */}
      <TemplateSelector
        templates={templates}
        currentTemplate={currentTemplate}
        onSelect={onTemplateSelect}
      />

      {/* 添加样式���辑器 */}
      <StyleEditor
        template={currentTemplate}
        onUpdate={onTemplateUpdate}
      />

      {/* 快捷键提示 */}
      <div className="mt-4 text-sm text-gray-500">
        <p>快捷键:</p>
        <ul className="mt-1 space-y-1">
          <li>Alt + S: 选择文字</li>
          <li>Alt + C: 清除选择</li>
          <li>Shift + 选择: 多段选择</li>
        </ul>
      </div>
    </div>
  );
}; 