import React from 'react';
import { CardTemplate } from '../../types/template';

interface TemplateManagerProps {
  templates: CardTemplate[];
  onImport: (template: CardTemplate) => void;
  onExport: (templateId: string) => void;
  onDelete: (templateId: string) => void;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  templates,
  onImport,
  onExport,
  onDelete,
}) => {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const template = JSON.parse(e.target?.result as string) as CardTemplate;
        onImport(template);
      } catch (error) {
        console.error('导入模板失败:', error);
        // TODO: 添加错误提示
      }
    };
    reader.readAsText(file);
  };

  const handleExport = (template: CardTemplate) => {
    const data = JSON.stringify(template, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: `template-${template.id}.json`,
      saveAs: true,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">模板管理</h3>
        <label className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          导入模板
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
      </div>

      <div className="space-y-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <span className="text-sm">{template.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleExport(template)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                导出
              </button>
              {template.category === 'custom' && (
                <button
                  onClick={() => onDelete(template.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 