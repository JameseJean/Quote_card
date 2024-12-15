import React from 'react';
import { CardTemplate } from '../../types/template';

interface TemplateSelectorProps {
  templates: CardTemplate[];
  currentTemplate: CardTemplate;
  onSelect: (template: CardTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  currentTemplate,
  onSelect,
}) => {
  // 按分类分组模板
  const groupedTemplates = templates.reduce((groups, template) => {
    const category = template.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(template);
    return groups;
  }, {} as Record<string, CardTemplate[]>);

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        模板选择
      </label>
      
      {/* 分类列表 */}
      <div className="space-y-4">
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category}>
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
              {category === 'simple' && '简约'}
              {category === 'modern' && '现代'}
              {category === 'classic' && '经典'}
              {category === 'custom' && '自定义'}
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onSelect(template)}
                  className={`
                    p-2 rounded border text-left
                    ${currentTemplate.id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="text-sm font-medium">{template.name}</div>
                  <div 
                    className="mt-1 h-16 rounded"
                    style={{
                      background: template.styles.container.background,
                      border: template.styles.effects?.border,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 