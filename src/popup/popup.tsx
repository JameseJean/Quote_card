import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { useTemplate } from '../hooks/useTemplate';
import { useHistory } from '../hooks/useHistory';
import { Toast } from '../components/Toast';
import { Loading } from '../components/Loading';
import { useToast } from '../hooks/useToast';
import { ExportSettings } from './components/ExportSettings';
import { History } from './components/History';

function Popup() {
  const [texts, setTexts] = useState(['']);
  const { templates, currentTemplate, setCurrentTemplate } = useTemplate();
  const {
    history,
    addRecord,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
  } = useHistory();
  const [loading, setLoading] = useState(false);
  const { toasts, showToast, closeToast } = useToast();
  const [exportCallback, setExportCallback] = useState<((url: string) => void) | null>(null);

  useEffect(() => {
    const messageListener = (request: any) => {
      if (request.type === 'SELECTED_TEXT') {
        setTexts(request.texts.length > 0 ? request.texts : ['']);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // 获取当前标签页的选中文字
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab?.id) {
        chrome.tabs.sendMessage(currentTab.id, { type: 'GET_SELECTED_TEXT' });
      }
    });

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && canUndo) {
          e.preventDefault();
          const record = undo();
          if (record) {
            setTexts(record.texts);
            setCurrentTemplate(record.template);
          }
        } else if (e.key === 'y' && canRedo) {
          e.preventDefault();
          const record = redo();
          if (record) {
            setTexts(record.texts);
            setCurrentTemplate(record.template);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo]);

  const handleExport = async (dataUrl: string) => {
    try {
      setLoading(true);
      
      // 下载文件
      await chrome.downloads.download({
        url: dataUrl,
        filename: '金句卡片.png', // 默认使用PNG格式
        saveAs: true
      });

      // 保存到历史记录
      await addRecord(texts, currentTemplate, dataUrl);
      showToast('导出成功', 'success');
    } catch (error) {
      console.error('导出失败:', error);
      showToast('导出失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Loading fullscreen text="正在导出..." />}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => closeToast(toast.id)}
        />
      ))}
      <div className="flex">
        <Editor
          texts={texts}
          onChange={setTexts}
          templates={templates}
          currentTemplate={currentTemplate}
          onTemplateSelect={setCurrentTemplate}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
        />
        <div className="w-1/2">
          <Preview
            texts={texts}
            template={currentTemplate}
            onExport={handleExport}
          />
          <History
            records={history.records}
            currentIndex={history.currentIndex}
            onRecordSelect={(record) => {
              setTexts(record.texts);
              setCurrentTemplate(record.template);
            }}
            onClear={clearHistory}
          />
        </div>
      </div>
    </Layout>
  );
}

// 确保root元素存在
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(<Popup />); 