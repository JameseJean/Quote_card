import { useState, useEffect } from 'react';
import { CardTemplate } from '../types/template';
import { presetTemplates } from '../templates/presets';

export const useTemplate = () => {
  const [templates, setTemplates] = useState<CardTemplate[]>(presetTemplates);
  const [currentTemplate, setCurrentTemplate] = useState<CardTemplate>(templates[0]);
  const [customTemplates, setCustomTemplates] = useState<CardTemplate[]>([]);

  // 从storage加载自定义模板
  useEffect(() => {
    chrome.storage.local.get('customTemplates', (result) => {
      if (result.customTemplates) {
        setCustomTemplates(result.customTemplates);
        setTemplates([...presetTemplates, ...result.customTemplates]);
      }
    });
  }, []);

  // 保存自定义模板
  const saveCustomTemplate = async (template: CardTemplate) => {
    const newCustomTemplates = [...customTemplates, template];
    await chrome.storage.local.set({ customTemplates: newCustomTemplates });
    setCustomTemplates(newCustomTemplates);
    setTemplates([...presetTemplates, ...newCustomTemplates]);
  };

  // 删除自定义模板
  const deleteCustomTemplate = async (templateId: string) => {
    const newCustomTemplates = customTemplates.filter(t => t.id !== templateId);
    await chrome.storage.local.set({ customTemplates: newCustomTemplates });
    setCustomTemplates(newCustomTemplates);
    setTemplates([...presetTemplates, ...newCustomTemplates]);
  };

  return {
    templates,
    currentTemplate,
    setCurrentTemplate,
    saveCustomTemplate,
    deleteCustomTemplate,
  };
}; 