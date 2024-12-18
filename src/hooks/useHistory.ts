import { useState, useEffect } from 'react';
import { HistoryRecord, HistoryState } from '../types/history';
import { CardTemplate } from '../types/template';

const MAX_HISTORY = 50; // 最大历史记录数
export const useHistory = () => {
  const [history, setHistory] = useState<HistoryState>({
    records: [],
    currentIndex: -1,
  });

  // 从storage加载历史记录
  useEffect(() => {
    chrome.storage.local.get('history', (result) => {
      if (result.history) {
        setHistory(result.history);
      }
    });
  }, []);

  // 添加新记录
  const addRecord = async (texts: string[], template: CardTemplate, imageUrl?: string) => {
    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      texts,
      template,
      imageUrl,
    };

    const newRecords = [
      ...history.records.slice(0, history.currentIndex + 1),
      newRecord,
    ].slice(-MAX_HISTORY);

    const newState: HistoryState = {
      records: newRecords,
      currentIndex: newRecords.length - 1,
    };

    await chrome.storage.local.set({ history: newState });
    setHistory(newState);
  };

  // 撤销
  const undo = () => {
    if (history.currentIndex > 0) {
      setHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
      return history.records[history.currentIndex - 1];
    }
    return null;
  };

  // 重做
  const redo = () => {
    if (history.currentIndex < history.records.length - 1) {
      setHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
      return history.records[history.currentIndex + 1];
    }
    return null;
  };

  // 清除历史
  const clearHistory = async () => {
    await chrome.storage.local.remove('history');
    setHistory({
      records: [],
      currentIndex: -1,
    });
  };

  return {
    history,
    addRecord,
    undo,
    redo,
    clearHistory,
    canUndo: history.currentIndex > 0,
    canRedo: history.currentIndex < history.records.length - 1,
  };
}; 